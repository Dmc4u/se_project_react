import Modal from "../Modal/Modal";

function DeleteConfirmationModal({ isOpen, onConfirm, onCancel, isLoading }) {
  return (
    <Modal isOpen={isOpen} name="delete" onClose={onCancel}>
      <div className="modal__content-delete">
        {
          <button className="modal__close_type_delete" onClick={onCancel}>
            {" "}
          </button>
        }
        <h2 className="modal__delete_type_warning">
          Are you sure you want to delete this card?
          <span className="modal__delete_type_fact">
            The action is irreversible.
          </span>
        </h2>
        <div className="modal__buttons-delete">
          <button
            className="modal__button modal__button_confirm"
            onClick={onConfirm}
          >
            {isLoading ? "Deleting..." : "Yes, Delete Item"}
          </button>
          <button
            className="modal__button modal__button_cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmationModal;
