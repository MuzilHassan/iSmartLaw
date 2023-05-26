import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestAppointment from './RequestAppointment';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Details(props) {
  const [editOpen, setEditOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleEditOpen = () => {
    if (user) {
      setEditOpen(true);
    } else {
      navigate('/clientSignIn');
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  return (
    <>
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
            <div className="col-md-6">
              <h2 className="fw-bold">{props?.name}</h2>
              <p className="text-justify">{props?.about}</p>
              <p className="mt-2 fw-bold">Phone: {props?.phone}</p>
              <p className="mt-2 fw-bold">Address: {props?.address}</p>
              <div className="row">
                <Button
                  type="submit"
                  variant="success"
                  style={{ width: '200px', margin: '20px' }}
                  onClick={handleEditOpen}
                >
                  Request Appointment
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        {editOpen && (
          <Modal.Body>
            <RequestAppointment
              closeEvent={handleEditClose}
              bookingId={props?.id}
            />
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}

export default Details;
