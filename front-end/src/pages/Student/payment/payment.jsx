import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './Payment.css';

const Payment = ({ bookingDetails }) => {
  const [qrUrl, setQrUrl] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');

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
      };

      await axios.post('http://localhost:8080/api/booking/create', payload);
      console.log('Booking created successfully');
    } catch (error) {
      console.error('Error creating booking:', error.message);
    }
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
              <p>Room Type: 6 Bed</p>
              <p>Dorm: B</p>
              <p>Floor: 3</p>
              <p>Room ID: {bookingDetails.room_id}</p>
              <p>Bed ID: {bookingDetails.bed_id}</p>
              <p>User ID: {bookingDetails.user_id}</p>
              <p>Total Amount: {bookingDetails.total_amount} VND</p>
            </div>
          ) : (
            <p>Payment successful!</p>
          )}
        </div>
      )}
    </div>
  );
};

// Định nghĩa prop types cho Payment
Payment.propTypes = {
  bookingDetails: PropTypes.shape({
    room_id: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    total_amount: PropTypes.number.isRequired,
    payment_status: PropTypes.string.isRequired,
    booking_status: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    bed_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Payment;
