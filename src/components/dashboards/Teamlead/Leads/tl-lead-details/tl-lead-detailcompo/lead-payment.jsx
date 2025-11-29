import React, { useState } from "react";
import { toast } from "react-toastify";

export default function TlLeadPayments() {
    // Payment form state
    const [paymentForm, setPaymentForm] = useState({
        paymentLink: 'https://pay.example.com/abc123',
        paymentStatus: 'pending',
        paymentMode: 'full'
    });
    
    const [paymentErrors, setPaymentErrors] = useState({});

    // Payment form validation
    const validatePaymentForm = () => {
        const errors = {};
        
        if (!paymentForm.paymentLink.trim()) {
            errors.paymentLink = 'Payment link is required';
        } else if (!isValidUrl(paymentForm.paymentLink)) {
            errors.paymentLink = 'Please enter a valid URL';
        }
        
        if (!paymentForm.paymentStatus) {
            errors.paymentStatus = 'Payment status is required';
        }
        
        if (!paymentForm.paymentMode) {
            errors.paymentMode = 'Payment mode is required';
        }
        
        setPaymentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    // Handle payment form submission
    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        
        if (validatePaymentForm()) {
            // Here you would typically make an API call to save payment data
            console.log('Payment data submitted:', paymentForm);
            toast.success('Payment information saved successfully!');
            
            // You can add API call here
            // savePaymentData(paymentForm);
        } else {
            toast.error('Please fix the form errors before submitting.');
        }
    };

    // Handle input changes
    const handlePaymentChange = (field, value) => {
        setPaymentForm(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear error when user starts typing
        if (paymentErrors[field]) {
            setPaymentErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    // Copy payment link to clipboard
    const handleCopyPaymentLink = () => {
        navigator.clipboard.writeText(paymentForm.paymentLink)
            .then(() => {
                toast.success('Payment link copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                toast.error('Failed to copy payment link');
            });
    };

    return (
        <>
            <form className="space-y-4" onSubmit={handlePaymentSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Link
                    </label>
                    <div className="flex gap-2 mt-1">
                        <input
                            value={paymentForm.paymentLink}
                            onChange={(e) => handlePaymentChange('paymentLink', e.target.value)}
                            className={`flex-1 p-2 border rounded-xl ${
                                paymentErrors.paymentLink ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="https://example.com/payment/..."
                        />
                        <button
                            type="button"
                            onClick={handleCopyPaymentLink}
                            className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Copy
                        </button>
                    </div>
                    {paymentErrors.paymentLink && (
                        <p className="mt-1 text-sm text-red-600">{paymentErrors.paymentLink}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Status
                    </label>
                    <select
                        value={paymentForm.paymentStatus}
                        onChange={(e) => handlePaymentChange('paymentStatus', e.target.value)}
                        className={`w-full p-2 border rounded-xl mt-1 ${
                            paymentErrors.paymentStatus ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                    >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="sent">Link Sent</option>
                        <option value="partial">Partial Payment</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                    {paymentErrors.paymentStatus && (
                        <p className="mt-1 text-sm text-red-600">{paymentErrors.paymentStatus}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Mode
                    </label>
                    <select
                        value={paymentForm.paymentMode}
                        onChange={(e) => handlePaymentChange('paymentMode', e.target.value)}
                        className={`w-full p-2 border rounded-xl mt-1 ${
                            paymentErrors.paymentMode ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                    >
                        <option value="">Select Payment Mode</option>
                        <option value="full">Full Payment</option>
                        <option value="emi">EMI</option>
                        <option value="loan">Loan</option>
                        <option value="credit">Credit Card</option>
                        <option value="debit">Debit Card</option>
                        <option value="upi">UPI</option>
                        <option value="netbanking">Net Banking</option>
                    </select>
                    {paymentErrors.paymentMode && (
                        <p className="mt-1 text-sm text-red-600">{paymentErrors.paymentMode}</p>
                    )}
                </div>

                {/* Additional Payment Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full p-2 border border-gray-300 rounded-xl"
                            onChange={(e) => handlePaymentChange('amount', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Currency
                        </label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-xl"
                            onChange={(e) => handlePaymentChange('currency', e.target.value)}
                        >
                            <option value="INR">₹ INR</option>
                            <option value="USD">$ USD</option>
                            <option value="EUR">€ EUR</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Notes
                    </label>
                    <textarea
                        placeholder="Additional payment notes..."
                        className="w-full p-2 border border-gray-300 rounded-xl"
                        rows={3}
                        onChange={(e) => handlePaymentChange('notes', e.target.value)}
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white font-semibold rounded-lg transition-colors"
                    >
                        Save Payment Information
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setPaymentForm({
                                paymentLink: '',
                                paymentStatus: '',
                                paymentMode: '',
                                amount: '',
                                currency: 'INR',
                                notes: ''
                            });
                            setPaymentErrors({});
                            toast.info('Form cleared');
                        }}
                        className="px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
                    >
                        Clear Form
                    </button>
                </div>
            </form>
        </>
    );
}