import React, {useState } from "react";
import { Modal, Button } from "react-bootstrap";
import './Formulaire.css'
import {withRouter} from 'react-router-dom'
const Formulaire = (props) => {
    const [show, setShow] = useState(false);
  



  return (
    <div >
      <Button variant="primary" onClick={() => setShow(!show)}>
          Go
      </Button>
      <Modal show={show} onHide={() => setShow(!show)}>
      <div className="Bgform">

        <Modal.Header  className="HeadercloseButton"closeButton>
                  
        </Modal.Header>
        <Modal.Body >
          <h1 className="tuni ">Tunilawyer</h1>
          <h2 className="tuni ">20+ Lawyers near you.</h2>
              <p className="tuni ">We're asking you some questions so we can match <br/>you with the right pros.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="Btnext" onClick={()=>props.history.push('/setWizard')} variant="primary">
Next
          </Button>
        </Modal.Footer>
        </div>

      </Modal>
    </div>
  );
};
export default withRouter(Formulaire);