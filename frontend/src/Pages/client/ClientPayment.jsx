import React, { useEffect, useState } from 'react';
import Payment from "../../components/clientComponents/Payment";
import axios from 'axios';

const ClientPayment = () => {
  const [payments, setPayments] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/payment/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPayments(response.data.payments);
      console.log(response.data.payments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {payments.map((payment) => (
        <Payment
          key={payment._id}
          id={payment._id}
          lawyerName={payment.lawyerId.name}
          desc={payment.desc}
          price={payment.amount}
        />
      ))}
    </div>
  );
};

export default ClientPayment;
