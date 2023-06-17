import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar fixed-top bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand"></span>
          <div className="d-flex text-decoration-none" >

            <Link className='text-decoration-none' to={"/login"}>Logout
              <span className="fa fa-power-off mx-1 my-2"></span></Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
