import { useState } from 'react';
import { CreditCard, Phone, AlertCircle, Lock } from 'lucide-react';
import QRCode from 'qrcode.react';

interface PhonePePaymentProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

export default function PhonePePayment({ amount, onSuccess, onCancel }: PhonePePaymentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [showQR, setShowQR] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  // Handle card payment
  const handleCardPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Validate card details
      if (!validateCard()) {
        throw new Error('Please check your card details');
      }

      // This would typically make an API call to your backend
      // which would then interact with PhonePe's payment API
      const response = await initiatePhonePeCardPayment();
      
      if (response.success) {
        setPaymentStatus('success');
        onSuccess();
      } else {
        throw new Error(response.message || 'Payment failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  // Validate card details
  const validateCard = () => {
    const { number, expiry, cvv, name } = cardDetails;
    
    // Basic validation
    if (number.replace(/\s/g, '').length !== 16) return false;
    if (expiry.length !== 5) return false;
    if (cvv.length !== 3) return false;
    if (name.trim().length < 3) return false;

    // Validate expiry date
    const [month, year] = expiry.split('/');
    const now = new Date();
    const cardDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    if (cardDate < now) return false;

    return true;
  };

  // Simulate PhonePe API call
  const initiatePhonePeCardPayment = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // This would be replaced with actual PhonePe API integration
    return {
      success: true,
      message: 'Payment successful'
    };
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Details
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Amount to pay: ₹{amount.toLocaleString()}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center text-red-600 dark:text-red-400">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div className="space-y-6">
        {showCardForm ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Card Number
              </label>
              <input
                type="text"
                maxLength={19}
                value={cardDetails.number}
                onChange={(e) => setCardDetails(prev => ({
                  ...prev,
                  number: formatCardNumber(e.target.value)
                }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails(prev => ({
                    ...prev,
                    expiry: formatExpiry(e.target.value)
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
                  placeholder="MM/YY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  maxLength={3}
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails(prev => ({
                    ...prev,
                    cvv: e.target.value.replace(/\D/g, '')
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
                  placeholder="123"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails(prev => ({
                  ...prev,
                  name: e.target.value.toUpperCase()
                }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
                placeholder="JOHN DOE"
              />
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setShowCardForm(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Back
              </button>
              <button
                onClick={handleCardPayment}
                disabled={loading}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Pay ₹{amount.toLocaleString()}
                  </>
                )}
              </button>
            </div>
          </div>
        ) : showQR ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <QRCode
                value={`upi://pay?pa=merchant@phonepe&pn=XKroot&am=${amount}&cu=INR&tn=Job Posting Payment`}
                size={200}
                level="H"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Scan with PhonePe app to pay
            </p>
            <button
              onClick={() => setShowQR(false)}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Try another payment method
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setShowQR(true)}
                className="flex items-center justify-center space-x-2 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
              >
                <Phone className="h-6 w-6 text-indigo-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">PhonePe UPI</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pay using PhonePe app</p>
                </div>
              </button>

              <button
                onClick={() => setShowCardForm(true)}
                className="flex items-center justify-center space-x-2 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
              >
                <CreditCard className="h-6 w-6 text-indigo-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">Card Payment</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pay with credit/debit card</p>
                </div>
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={onCancel}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel Payment
              </button>
            </div>
          </>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-900 dark:text-white">Processing payment...</p>
          </div>
        </div>
      )}
    </div>
  );
}