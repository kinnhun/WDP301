import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = ({ bookingDetails }) => {
  const [qrUrl, setQrUrl] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  const createVietQR = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/create-vietqr?rand=${Date.now()}`, {
        headers: { 'Cache-Control': 'no-cache' },
      });
      setQrUrl(response.data.qrUrl);
      setTransactionId(response.data.transactionId);
      setTransactionStatus('pending');
    } catch (error) {
      console.error('Error creating VietQR:', error.message);
    }
  };

  useEffect(() => {
    createVietQR();
  }, []);

  useEffect(() => {
    const checkTransactionStatus = async () => {
      if (transactionId) {
        try {
          const response = await axios.get(`http://localhost:8080/check-transaction-status/${transactionId}?rand=${Date.now()}`);
          setTransactionStatus(response.data.status);

          if (response.data.status === 'success') {
            await createBooking();
          }
        } catch (error) {
          console.error('Error checking transaction status:', error.message);
        }
      }
    };

    if (transactionStatus === 'pending') {
      const interval = setInterval(checkTransactionStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [transactionId, transactionStatus]);

  const createBooking = async () => {
    try {
      const payload = {
        room_id: bookingDetails.room_id,
        user_id: bookingDetails.user_id,
        start_date: bookingDetails.start_date,
        end_date: bookingDetails.end_date,
        total_amount: bookingDetails.total_amount,
        payment_status: 'Completed',
        booking_status: 'Pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        bed_id: bookingDetails.bed_id,
        semester_name : bookingDetails.semester_name,
      };

      await axios.post('http://localhost:8080/api/booking/create', payload);
      console.log('Booking created successfully');
    } catch (error) {
      console.error('Error creating booking:', error.message);
    }
  };

  useEffect(() => {
    if (transactionStatus === 'success') {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            navigate('/student/bookings');
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [transactionStatus, navigate]);

  // Fake success button click handler
  const handleFakePaymentSuccess = () => {
    setTransactionStatus('success');
    createBooking();
  };

  return (
    <div className="payment-container">
      {qrUrl && (
        <div className="qr-container">
          <h3>Scan to Pay</h3>
          <img src={qrUrl} alt="VietQR" className="qr-code" />
        </div>
      )}

      {transactionStatus && (
        <div>
          <h3>Transaction Status: {transactionStatus}</h3>
          {transactionStatus === 'pending' ? (
            <div>
              <p>Waiting for payment...</p>
              <button onClick={handleFakePaymentSuccess} className="fake-payment-button">
                Fake Payment Success
              </button>
            </div>
          ) : transactionStatus === 'success' ? (
            <div>
              <p>Payment successful!</p>
              <p>Redirecting in {countdown} seconds...</p>
            </div>
          ) : (
            <p>Payment status: {transactionStatus}</p>
          )}
        </div>
      )}
    </div>
  );
};



export default Payment;
