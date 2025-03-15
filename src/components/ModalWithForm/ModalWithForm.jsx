import Modal from '../Modal/Modal';

function ModalWithForm({ isOpen, name, onClose, title, children, buttonText, onSubmit, isDisabled }) {
  return (
    <Modal isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} className="modal__form">
        {children}
        <button type="submit" className="modal__submit" disabled={isDisabled}>
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
