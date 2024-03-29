import "./Modal.css"

const Modal = ({children}) => {
  return (
    <article className="modal is-open">
        <div className="modal-container">
            {children}
        </div>
    </article> 
  )
}

export default Modal