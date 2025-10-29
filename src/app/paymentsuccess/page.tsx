'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'react-feather';

interface Tour {
  _id: string;
  destination: string;
  price: number;
  image?: string;
  description?: string;
}

export default function PaymentSuccessPage() {
  const [status, setStatus] = useState<'processing' | 'succeeded'>('processing');
  const [tour, setTour] = useState<Tour | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const payment_intent = searchParams.get('payment_intent');
  const tourId = searchParams.get('tourId');

  // Fetch the purchased tour details
  useEffect(() => {
    if (payment_intent) {
      setStatus('succeeded');
    }

    if (tourId) {
  fetch(`http://localhost:4000/tours/${tourId}`)
    .then(res => res.json())
    .then(data => setTour(data))
    .catch(err => console.error('Error fetching tour:', err));
}
  }, [payment_intent, tourId]);

  if (status === 'processing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Processing Your Payment</h1>
          <p className="text-gray-600">Please wait while we confirm your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6">Thank you for booking your tour with us.</p>
        
        {tour && (
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <div className="flex items-center">
              {tour.image && (
                <div className="relative h-16 w-16 mr-4">
                  <Image
                    src={tour.image}
                    alt={tour.destination}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <div className="text-left">
                <h3 className="font-medium text-gray-800">{tour.destination}</h3>
                <p className="text-blue-600 font-bold">₹{tour.price}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600 mb-4">
            A confirmation email has been sent to your registered email address.
          </p>
          <div className="flex justify-end">
            <Link 
              href="/tourist/tours" 
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Explore More Tours
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
