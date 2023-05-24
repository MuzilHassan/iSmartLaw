import React from 'react'

export default function appointmentsCard() {
  return (
    <div className='container'>
        <h3 className='text-center' style={{margin:"3rem"}}>All Appointments</h3>
            <div className="card">
                <div className="card-header text-center">
                    Appointmnet
                </div>
                <div className="card-body mx-3">
                    <h5 className="card-title">Lawyer Name: Muzil Hassan</h5>
                    <p className="card-text">Email: muzil@mail.com</p>
                    <p className="card-text">Meeting Date: 26/05/2023</p>
                    <p className="card-text">Meeting Time: 150</p>
                    <div style={{display:'flex', marginLeft: "69%"}}>
                        <a href="#" className="btn btn-primary" style={{display:'flex', margin: "10px"}}>Office Location</a>
                        <a href="#" className="btn btn-success" style={{display:'flex', margin: "10px"}}>Initiate Meeting</a>
                    </div>
                </div>

                <div className="card-footer text-body-success text-center">
                    Online
                </div>
            </div>    
    </div>
  )
}
