import { useState, useEffect } from 'react'; 
import axios from 'axios';
import './Payment.css'; // Đảm bảo bạn import file CSS

const Payment = () => {
  const [qrUrl, setQrUrl] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');

  const createVietQR = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/create-vietqr?rand=${Date.now() 
      }`,  {  headers: {
        'Cache-Control': 'no-cache'
    }
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
        } catch (error) {
          console.error('Error checking transaction status:', error.message);
        }
      }
    };

    if (transactionStatus === 'pending') {
      const interval = setInterval(checkTransactionStatus, 50000);
      return () => clearInterval(interval);
    }
  }, [transactionId, transactionStatus]);

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
          {transactionStatus === 'pending' ? <p>Waiting for payment...</p> : <p>Payment successfull!</p>}
        </div>
      )}
    </div>
  );
};

export default Payment;
