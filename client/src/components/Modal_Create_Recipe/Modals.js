
import { useState } from 'react'
import Modal from './Modal'

const Modals = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    console.log(props);
    console.log(props.state === "opening");
  return (
  <div>


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
   {/* <div>
   <Modal>
                  <p>Recipe created successfully</p>    
      </Modal>
      </div> */}

          </div>
  );
}

export default Modals