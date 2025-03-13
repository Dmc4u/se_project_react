function DeleteConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal modal__delete modal_opened">
      <div className="modal__content modal__content_delete">
        { <button className="modal__close modal__close_type_delete" onClick={onCancel}> </button> }
        <h2 className="modal__delete_type_warning">Are you sure you want to delete this card? <span className="modal__delete_type_fact">The action is irreversible.</span></h2>
        <div className="modal__buttons-delete ">
          <button className="modal__button modal__button_confirm" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="modal__button modal__button_cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
