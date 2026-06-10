import React from 'react';

const ConfirmModal = ({ open, title = 'ยืนยัน', message = 'ยืนยันการกระทำหรือไม่?', onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-lg p-6 shadow-2xl text-white">
        <div className="mb-4">
          <div className="text-lg font-semibold">{title}</div>
        </div>
        <div className="mb-6 text-sm text-gray-300">{message}</div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-transparent border border-white/10 rounded text-gray-300 hover:bg-white/5 transition"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700 transition"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
