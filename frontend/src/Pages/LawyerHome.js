import React from "react";
import BlogBox from "../components/CaseCard";
import LawyersDashboard from "../components/LawyersDashboard";
function LawyerHome() {
  console.log(localStorage.getItem("token"));
  return (
    <div>
      <LawyersDashboard>
        <h1
          style={{
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: "1rem",
          }}
        >
          Ongoing Cases
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <BlogBox
              title="Case Number:1245"
              text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
              tag="Session Court"
              details="case 60, 2 days ago"
              action={() => alert("clicked")}
            />
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <BlogBox
              title="Case Number:1245"
              text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
              tag="Session Court"
              author="case 60, 2 days ago"
              action={() => alert("clicked")}
            />
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <BlogBox
              title="Case Number:1245"
              text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
              tag="Session Court"
              author="case 60, 2 days ago"
              action={() => alert("clicked")}
            />
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <BlogBox
              title="Case Number:1245"
              text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
              tag="Session Court"
              author="case 60, 2 days ago"
              action={() => alert("clicked")}
            />
          </div>
        </div>
      </LawyersDashboard>
    </div>
  );
}

export default LawyerHome;
