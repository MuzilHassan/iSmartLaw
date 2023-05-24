import React from 'react'
import Navbar from './components/navbar'
export default function SearchLawyers() {
    return (
        <div >
            <Navbar/>
                <h2 style={{marginTop:"5rem", textAlign: 'center'}}>Available Lawyers</h2>
            <div class="container card mb-3" style={{maxWidth: "80%", marginTop:"5rem"}}>
                <div class="row g-0">
                    <div class="col-md-2">
                        <img
                            src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
                            alt="Trendy Pants and Shoes"
                            class="img-fluid rounded-start"
                        />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Lawyer Name</h5>
                            <p class="card-text">
                                Expertise:
                            </p>
                            <p class="card-text">
                                Experience:
                            </p>
                            <p class="card-text">
                                Licence Number:
                            </p>
                            <p class="card-text btn-success">
                                Success Ratio: 80%
                            </p>
                            <p class="card-text">
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </p>
                            <button className='btn btn-success my-2'>Visit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
