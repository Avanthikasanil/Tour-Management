'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '@/components/Booking/paymentForm';
import Image from 'next/image';
import { ArrowLeft, CreditCard, Shield } from 'react-feather';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Tour {
  _id: string;
  destination: string;
  price: number;
  image?: string;
  description?: string;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tourId = searchParams.get('tourId');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch tour details
  useEffect(() => {
    if (!tourId) return;

    fetch(`http://localhost:4000/tours/${tourId}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
      .catch((err) => console.error('Error fetching tour:', err))
      .finally(() => setLoading(false));
  }, [tourId]);

  // 2️⃣ Create Stripe PaymentIntent (after tour is loaded)
  useEffect(() => {
    if (!tour) return;

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: tour.price,
        tourId: tour._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error('Error creating payment intent:', err));
  }, [tour]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-6">
            The tour you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Return to Tours
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
          <button
            onClick={() => router.push('/')}
            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Tours
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tour Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Summary</h2>
                <div className="flex items-center mb-6">
                  {tour.image && (
                    <div className="relative h-24 w-24 mr-4">
                      <Image
                        src={tour.image}
                        alt={tour.destination}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{tour.destination}</h3>
                    {tour.description && (
                      <p className="text-gray-600 text-sm">{tour.description}</p>
                    )}
                    <p className="text-blue-600 font-bold mt-1">₹{tour.price}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{tour.price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium">₹{(tour.price * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-blue-600">₹{(tour.price * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <Shield className="text-green-500 mr-2" />
                <h3 className="text-lg font-medium">Secure Checkout</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Your payment information is encrypted and secure. We never store your credit card details.
              </p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <div className="flex items-center mb-4">
                <CreditCard className="text-blue-600 mr-2" />
                <h3 className="text-lg font-medium">Payment Details</h3>
              </div>

              {clientSecret && tour ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentForm clientSecret={clientSecret} tour={tour} />
                </Elements>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Initializing payment...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
