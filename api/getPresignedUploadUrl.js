import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  } : undefined,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { key, contentType } = req.body || {};
    if (!key) return res.status(400).json({ error: 'Missing "key" in request body' });

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: contentType || 'application/octet-stream',
      ACL: 'public-read',
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 120 });
    const publicUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${encodeURIComponent(key)}`;

    return res.status(200).json({ url, key, publicUrl });
  } catch (err) {
    console.error('presign error', err);
    return res.status(500).json({ error: 'Failed to create presigned url', details: String(err) });
  }
}
