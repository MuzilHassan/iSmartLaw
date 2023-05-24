import React from 'react'

export default function CaseCard() {
    return (
        <div className='container'>
            
            <h3 className='text-center' style={{margin:"3rem"}}>All Cases</h3>
            <div className="card">
                <div className="card-header text-center">
                    High Court
                </div>
                <div className="card-body mx-3">
                    <h5 className="card-title">Muzil Hassan</h5>
                    <p className="card-text">Lawyer Name: Umar</p>
                    <p className="card-text">Hearing Date: 26/05/2023</p>
                    <p className="card-text">Court No: 150</p>
                    <p className="card-text">Remarks: No Remarks</p>
                </div>
                <div className="card-footer text-body-success text-center">
                    Opened
                </div>
            </div>


            
        </div>
    )
}
