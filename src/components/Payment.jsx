import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Section } from 'react-materialize';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();

  const paymentURL = 'https://ygcapi.azurewebsites.net/api/payment';
  const bookClassURL = 'https://ygcapi.azurewebsites.net/api/learning';

  const token = useSelector((state) => state.user.token);

  const { classId } = useParams();
  const [payments, setPayments] = useState([]);
  const [paymentId, setPaymentId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imagePayment = ["https://images.careerbuilder.vn/employer_folders/lot9/221789/103316momopink-logo.png","https://play-lh.googleusercontent.com/NfFBz1Rxk0nQ7RsOk0kXbi1AEp1ZJ3rzJHbwRlmheZEDPPHh7dscqyxyX-ehxTl7tw","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVofx_lOy37FjukSIEQDNX00qzOcYY2SoAA&usqp=CAU","https://nganhangviet.org/wp-content/uploads/2020/08/internet-banking-la-gi-cach-dang-ky-internet-banking-2.jpg"]

  useEffect(() => {
    const getAllPayments = async () => {
      try {
        const response = await axios.get(paymentURL);
        setPayments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllPayments();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    const payload = {
      classId: classId,
      paymentId: paymentId,
    };

    const headers = {
      Authorization: 'Bearer ' + token,
      accept: '*/*',
    };

    try {
      const response = await axios.post(bookClassURL, payload, { headers });
      if (response.status === 200) {
        alert('Booking successfully');
        navigate('/');
      }
    } catch (error) {
      if (error.message.includes('409')) {
        alert('You are already booking this class');
        navigate('/class');
      } else if (error.message.includes('400')) {
        alert('Please select payment method');
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (e) => {
    setIsModalOpen(false);
    handlePayment(e);
  };

  return (
    <Section>
      <div className="payment-container">
        {payments?.map((payment, index) => (
          <div key={payment.id} className="payment-label">
            <label>
              <input
                className="payment-radio"
                name="group"
                type="radio"
                onChange={() => setPaymentId(payment.id)}
              />
              <span>{payment.name}</span>
              <img src={imagePayment[index]} className="payment-image" alt={payment.name} />
            </label>
          </div>
        ))}
      </div>
      <button onClick={openModal} className="btn">
        Payment
      </button>
      {isModalOpen && (
        <>
          <div
            className="modal"
            style={{
              display: 'block',
              position: 'absolute',
              top: '100px',
            }}
          >
            <div className="modal-content">
              <p>Are you sure you want to do this?</p>
              <div className="modal-action">
                <button className="btn" onClick={handleCancel}>
                  No
                </button>
                <button className="btn" onClick={handleConfirm}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Section>
  );
}
