import React from 'react';

const ConfirmModal = ({ open, title = 'ยืนยัน', message = 'ยืนยันการกระทำหรือไม่?', onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-5 shadow-xl text-gray-800 font-sans">
        <div className="mb-3">
          <div className="text-base font-bold text-[#122754]">{title}</div>
        </div>
        <div className="mb-5 text-xs text-gray-500">{message}</div>
        <div className="flex justify-end gap-2 text-xs font-semibold">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-transparent border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition animate-pulse-once"
          >
            ลบข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
