import ReactPortal from "../ReactPortal";

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({ onConfirm, onCancel }: ModalProps) {
  return (
    <ReactPortal containerId="modal">
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 font-[Rubik]">
        <div className="bg-white rounded-lg p-6 max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-700 font-[Rubik]">
            Delete Comment
          </h2>
          <p className="mb-6 text-gray-500">
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div className="flex justify-between gap-4 text-white">
            <button
              className="w-full px-4 py-3 rounded-lg bg-gray-300 bg-gray-700 uppercase opacity-70 hover:opacity-100 cursor-pointer transition delay-150 duration-300 ease-in-out"
              onClick={onCancel}
            >
              No, Cancel
            </button>
            <button
              className="w-full px-4 py-3 rounded-lg bg-red-500 text-white opacity-70 uppercase hover:opacity-100 cursor-pointer transition delay-150 duration-300 ease-in-out"
              onClick={onConfirm}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}
