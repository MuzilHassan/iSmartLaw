import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function App({name,price,desc,id}) {
  const publishableKey =
    "pk_test_51M2DTSA6Q8jVDrPBBVdiJ3esH3Nh6OxRAOYniOALYOA0XN8AnExjFuzVHZ2Y5c52LMmp09crhGAGrdqGprlVX0Qe00TMQMPgM5";
  const [product, setProduct] = useState({
    name: "Lawyer Payment",
    price: price,
  });
  const priceForStripe = product.price * 100;

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was successful",
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: "error",
      title: "Payment was not successful",
      time: 4000,
    });
  };
  console.log(id)
  const payNow = async (token) => {
    try {
      const response = await axios.post(`http://localhost:5000/payment/${id}`, {
        amount: product.price * 100,
        token,
      });

      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="container my-4">
        <div className="card text-center">
          <div className="card-header">Pending Payment</div>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
             {desc}
            </p>
           
            <h6
              style={{
                fontSize: "26px",
                textAlign: "center",
                margin: 0,
                color: "#222f3e",
              }}
            >
              Due Amount: PKR{product.price}
            </h6>

            <StripeCheckout
              className="btn btn-success"
              stripeKey={publishableKey}
              label="Pay Now"
              name="Pay With Credit Card"
              billingAddress
              phone_number_collection={true}
              amount={priceForStripe}
              description={`Your total is ${product.price}`}
              token={payNow}
            />
          </div>
          <div className="card-footer text-muted">2 days ago</div>
        </div>
      </div>
    </div>
  );
}

export default App;
