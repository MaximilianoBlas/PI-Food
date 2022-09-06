import Modal from './Modal'

const Modals = (props) => {
  return (
      <div>
          <Modal>
            {
                props.state === "opening"?
            
                      <p>
                          Complete the form correctly, name and dish summary
                          must be completed
                      </p>
                      : 
                      <p>Recipe created successfully</p>}
          </Modal>
      </div>
  );
}

export default Modals