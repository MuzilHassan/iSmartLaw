import React from 'react'

export default function paymentCard() {
  return (
    <div className='container'>
        <h3 className='text-center' style={{margin:"3rem"}}>Pending Payments</h3>
            <div className="card">
                <div className="card-header text-center">
                    Pending Payment
                </div>
                <div className="card-body mx-3">
                    <h5 className="card-title">Lawyer Name: Muzil Hassan</h5>
                    <p className="card-text">Email: muzil@mail.com</p>
                    <p className="card-text">Payment Type: Appointment Fees</p>
                    <p className="card-text">Initiated On: 25/05/2023</p>
                    <div style={{display:'flex', marginLeft: "74%"}}>
                        <a href="#" className="btn btn-secondary" style={{display:'flex', margin: "10px"}}>Pay Manually</a>
                        <a href="#" className="btn btn-success" style={{display:'flex', margin: "10px"}}>Pay Online</a>
                    </div>
                </div>

                <div className="card-footer text-body-success text-center">
                    Unpaid
                </div>
            </div>    
    </div>
  )
}
