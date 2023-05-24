import React from 'react'
import { Link } from 'react-router-dom'


export default function navbar() {
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ border: "1px solid black" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/searchLawyer">Lawyers</Link>
                            <Link className="nav-link" to="#">Chat</Link>
                            <Link className="nav-link" to="/clientCases">Cases</Link>
                            <Link className="nav-link" to="/clientAppointments">Appointments</Link>
                            <Link className="nav-link" to="/clientPayment">Payment</Link>
                        </div>
                    </div>
                    <form class="d-flex" role="search" >
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <Link to="/searchLawyer">
                        <button class="btn btn-outline-success" type="submit">Search</button></Link>
                    </form>
                </div>
            </nav>
        </div>
    )
}
