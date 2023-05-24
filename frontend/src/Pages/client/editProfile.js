import React from 'react'

export default function() {
  return (
    <div>
         <section style={{backgroundColor: "#eee;"}}>
  <div className="container py-5">
    <div className="row">
      <div className="col">
        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">User</a></li>
            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>
      </div>
    </div>

    <div className="row">
     
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-9">
              <div class="form-outline">
  <input type="text" id="typeText" class="form-control" />
  
</div>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
              <div class="form-outline">
  <input type="text" id="typeText" class="form-control" />
</div>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Phone</p>
              </div>
              <div className="col-sm-9">
              <div class="form-outline">
  <input type="text" id="typeText" class="form-control" />
</div>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Mobile</p>
              </div>
              <div className="col-sm-9">
              <div class="form-outline">
  <input type="text" id="typeText" class="form-control" />
</div>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-9">
              <div class="form-outline">
  <input type="text" id="typeText" class="form-control" />
</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
    <button type="button" className="btn btn-primary" style={{marginLeft:"55%"}}>Save Details</button>
  </div>
</section>
    </div>
  )
}
