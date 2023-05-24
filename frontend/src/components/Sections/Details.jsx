import React from 'react'

import { Button, Modal } from "react-bootstrap";
function Details(props) {
  console.log(props.selectedLawyer)
  return (
       <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Lawyer Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <img src={props.img} alt="Lawyer Image" className="img-fluid" />
          </div>
          <div className="col-md-6 ">
            <h2 className=' fw-bold'>{props?.name}</h2>

            <p className="text-justify">
              {props?.about}
            </p>
            <p className='mt-2 fw-bold'>Phone: {props?.phone}</p>
            <p  className='mt-2  fw-bold' >Address: {props?.address}</p>

            <div className="row">
              <button
                type="submit"
                className="btn btn-success"
                style={{ width: "200px", margin: "20px" }}
              >
                Request Appointment
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    
  )
}

export default Details
