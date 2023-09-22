const Modal = () => {
  const closeModal = () => {
    location.reload();
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay"></div>
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Felicidades</p>
              <button
                onClick={closeModal}
                className="modal-close p-2 rounded-lg hover:bg-gray-300"
              >
                X
              </button>
            </div>
            <p>Completaste el desafío.</p>
            <div className="mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
