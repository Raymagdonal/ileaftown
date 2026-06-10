import React, { createContext, useContext, useState, useEffect } from 'react';
import { properties as defaultProperties } from '../data/properties';
import defaultTranslations from '../data/translations';

const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('ileaf_properties');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
        console.warn('Saved properties is not an array, falling back to defaults.');
      } catch (e) {
        console.error('Error parsing properties from localStorage:', e);
      }
    }
    return defaultProperties;
  });

  const [translations, setTranslations] = useState(() => {
    const saved = localStorage.getItem('ileaf_translations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
        console.warn('Saved translations is not an object, falling back to defaults.');
      } catch (e) {
        console.error('Error parsing translations from localStorage:', e);
      }
    }
    
    // Apply Thai name correction: Ensure 'iLeaf Town' -> 'ไอลีฟทาวน์' in all TH strings
    const fixedTranslations = JSON.parse(JSON.stringify(defaultTranslations));
    const fixThaiNames = (obj) => {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (obj[key].th && typeof obj[key].th === 'string' && obj[key].th.includes('iLeaf Town')) {
            obj[key].th = obj[key].th.replace(/iLeaf Town/g, 'ไอลีฟทาวน์');
          } else if (Array.isArray(obj[key].th)) {
            obj[key].th = obj[key].th.map(s => typeof s === 'string' ? s.replace(/iLeaf Town/g, 'ไอลีฟทาวน์') : s);
          } else {
            fixThaiNames(obj[key]);
          }
        }
      });
    };
    fixThaiNames(fixedTranslations);
    return fixedTranslations;
  });

  const [loading, setLoading] = useState(false);

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('ileaf_properties', JSON.stringify(properties));
    } catch (err) {
      console.warn('Failed to save properties to localStorage, attempting to trim large images.', err);
      try {
        const trimmed = (Array.isArray(properties) ? properties : []).map(p => {
          const copy = { ...p };
          const trimImage = (img) => {
            if (typeof img === 'string' && img.startsWith('data:') && img.length > 200000) return '';
            return img;
          };
          copy.coverImage = trimImage(copy.coverImage);
          if (Array.isArray(copy.gallery)) copy.gallery = copy.gallery.map(g => trimImage(g));
          return copy;
        });
        localStorage.setItem('ileaf_properties', JSON.stringify(trimmed));
        // update in-memory state to trimmed version to avoid re-saving huge payloads
        setProperties(trimmed);
      } catch (err2) {
        console.error('Could not trim/save properties to localStorage:', err2);
      }
    }
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('ileaf_translations', JSON.stringify(translations));
  }, [translations]);

  const updateProperty = async (id, data) => {
    setProperties(prev => {
      if (!Array.isArray(prev)) return defaultProperties;
      return prev.map(p => {
        const matchId = p.propertyId || p.id;
        if (matchId === id) {
          return { ...p, ...data };
        }
        return p;
      });
    });
  };

  const deleteProperty = async (id) => {
    setProperties(prev => prev.filter(p => {
      const matchId = p.propertyId || p.id;
      return matchId !== id;
    }));
  };

  const addProperty = async (data) => {
    const newId = `residency-${Date.now()}`;
    const newProp = {
      ...data,
      id: newId,
      propertyId: newId,
      views: 0
    };
    setProperties(prev => Array.isArray(prev) ? [...prev, newProp] : [newProp]);
  };

  const updateAllTranslations = async (flattenedData) => {
    setTranslations(prev => {
      const newTrans = JSON.parse(JSON.stringify(prev));
      flattenedData.forEach(item => {
        const keys = item.key.split('.');
        let current = newTrans;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = { th: item.th, en: item.en };
      });
      return newTrans;
    });
  };

  const uploadFile = async (file) => {
    // Try serverless presigned upload first (Vercel function -> S3)
    try {
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_%]/g, '_')}`;
      const key = `uploads/${filename}`;
      const resp = await fetch('/api/getPresignedUploadUrl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, contentType: file.type })
      });
      if (!resp.ok) throw new Error('Presign failed');
      const { url, publicUrl } = await resp.json();

      // PUT file directly to S3 using the presigned URL
      const put = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      });
      if (!put.ok) throw new Error('Upload to S3 failed');
      return publicUrl;
    } catch (err) {
      // Fallback to data URL (existing behavior)
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  };

  const uploadMultipleFiles = async (files) => {
    const fileArray = Array.isArray(files) ? files : Array.from(files || []);
    if (fileArray.length === 0) return [];
    const results = [];
    for (const f of fileArray) {
      // sequential to avoid too many parallel presign requests
      // but could be parallelized if desired
      // eslint-disable-next-line no-await-in-loop
      const url = await uploadFile(f);
      results.push(url);
    }
    return results;
  };

  const incrementView = async (propertyId) => {
    setProperties(prev => prev.map(p => {
      const matchId = p.propertyId || p.id;
      if (matchId === propertyId) {
        return { ...p, views: (p.views || 0) + 1 };
      }
      return p;
    }));
  };

  return (
    <CMSContext.Provider value={{ 
      properties, 
      translations, 
      loading, 
      updateProperty, 
      deleteProperty, 
      addProperty,
      updateAllTranslations,
      uploadFile,
      uploadMultipleFiles,
      incrementView
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
