'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { saveTicket } from "@/components/ticketStorage";
import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import shows from "@/data/shows.json";

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 12;

const TAKEN_SEATS = new Set([
  'C5', 'C6',
  'D7', 'D8',
  'E5', 'E6', 'E7',
  'F4', 'F5', 'F6',
]);

function generateSeats() {
  const seats = [];

  ROWS.forEach((row) => {
    for (let num = 1; num <= SEATS_PER_ROW; num++) {
      const id = `${row}${num}`;
      seats.push({
        id,
        row,
        number: num,
        status: TAKEN_SEATS.has(id) ? 'taken' : 'available',
      });
    }
  });

  return seats;
}

export default function Home() {
  const { id } = useParams();
  const [lang, setLang] = useState(true);
  const { logged,user } = useAuth();

  const [show, setShow] = useState(null);
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('qpay');

  const pricePerSeat = 15000;

  useEffect(() => {
    const selectedShow = shows.find(s => s.id === Number(id));
    setShow(selectedShow);
  }, [id]);

  const handleSeatClick = (seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat || seat.status === 'taken') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
      setSeats(prev =>
        prev.map(s =>
          s.id === seatId ? { ...s, status: 'available' } : s
        )
      );
    } else {
      setSelectedSeats(prev => [...prev, seatId]);
      setSeats(prev =>
        prev.map(s =>
          s.id === seatId ? { ...s, status: 'selected' } : s
        )
      );
    }
  };

  const totalPrice = selectedSeats.length * pricePerSeat;

  const handleCheckout = () => {
    if (selectedSeats.length > 0) {
      setShowPayment(true);
    }
  };

  const handleCancelPayment = () => {
    setShowPayment(false);
  };

  const handleCompletion = () => {
    if (!show || !user) return;

    const ticketData = {
      id: show.id,
      name: show.name,
      date: show.date,
      time: show.time,
      seats: selectedSeats,
      total: totalPrice,
      purchasedAt: new Date().toISOString(),
    };

    // Save ticket by email
    saveTicket(ticketData, user);
    window.location.href = "/";
  };


  const getSeatColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600 cursor-pointer';
      case 'selected':
        return 'bg-blue-500 hover:bg-blue-600 cursor-pointer';
      case 'taken':
        return 'bg-gray-400 cursor-not-allowed';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black font-sans text-white">
      <Header lang={lang} setLang={setLang} logged={logged} />

      {!showPayment && (
        <div className='overflow-hidden flex flex-col py-12 mb-20 w-2/3 items-center justify-center bg-slate-700 rounded-2xl'>
          <h1 className="text-3xl font-bold mb-8">
            {lang ? 'Seat Selection' : 'Суудал сонгох'}
          </h1>

          {ROWS.map((row) => (
            <div key={row} className="flex items-center gap-2 mb-3">
              <div className="w-8 text-center font-bold text-lg">{row}</div>

              <div className="flex gap-2">
                {seats
                  .filter((s) => s.row === row)
                  .map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat.id)}
                      disabled={seat.status === 'taken'}
                      className={`w-10 h-10 rounded transition-all duration-200 ${getSeatColor(seat.status)}`}
                    >
                      <span className="text-xs font-semibold">{seat.number}</span>
                    </button>
                  ))}
              </div>
            </div>
          ))}

          <div className="bg-white text-black rounded-lg p-6 w-2/3 max-w-md shadow-xl mt-8">
            <p className="mb-3 text-lg">
              <strong>{lang ? 'Selected Seats:' : 'Сонгосон суудал:'}</strong>
              <span className="ml-2">
                {selectedSeats.length
                  ? selectedSeats.join(', ')
                  : lang ? 'None' : 'Байхгүй'}
              </span>
            </p>

            <p className="mb-4 text-xl">
              <strong>{lang ? 'Total:' : 'Нийт:'}</strong>
              <span className="ml-2 text-red-500 font-bold">
                {totalPrice.toLocaleString()}₮
              </span>
            </p>

            <button
              onClick={handleCheckout}
              disabled={!selectedSeats.length}
              className="w-full py-3 rounded-lg font-semibold text-lg bg-red-600 text-white"
            >
              {lang ? 'Proceed to Payment' : 'Төлбөр төлөх'}
            </button>
          </div>
        </div>
      )}

      {showPayment && (
      <div className="flex-1 flex items-center justify-center px-4 py-12 w-full">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {lang ? 'Complete Payment' : 'Төлбөр төлөх'}
              </h1>
              <p className="text-gray-600">
                {lang ? 'Concert Tickets' : 'Концертын тасалбар'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {lang ? `Seats: ${selectedSeats.join(', ')}` : `Суудал: ${selectedSeats.join(', ')}`}
              </p>
            </div>

            {/* Total Amount */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
              <p className="text-sm text-gray-600 mb-2 font-medium">
                {lang ? 'Total Amount' : 'Нийт дүн'}
              </p>
              <p className="text-4xl font-bold text-gray-900">{totalPrice.toLocaleString()}₮</p>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {lang ? 'Select Payment Method' : 'Төлбөрийн хэрэгсэл сонгох'}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {/* QPay Option */}
                <button
                  onClick={() => setSelectedMethod('qpay')}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${selectedMethod === 'qpay'
                      ? 'border-red-500 bg-red-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedMethod === 'qpay' ? 'bg-red-500' : 'bg-gray-100'
                      }`}>
                      <svg className={`w-6 h-6 ${selectedMethod === 'qpay' ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">QPay</span>
                  </div>
                </button>

                {/* Card Option */}
                <button
                  onClick={() => setSelectedMethod('card')}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${selectedMethod === 'card'
                      ? 'border-red-500 bg-red-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedMethod === 'card' ? 'bg-red-500' : 'bg-gray-100'
                      }`}>
                      <svg className={`w-6 h-6 ${selectedMethod === 'card' ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {lang ? 'Card' : 'Карт'}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* QPay Details */}
            {selectedMethod === 'qpay' && (
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {lang
                    ? 'QPay is supported by all major banks. Not available in all banks yet. Try Khan Bank, XAS Bank, Trade and Development Bank, etc.'
                    : 'QPay-ээр төлбөл төлснийн дараа бүртгэл баталгаажна. Энэ нь дараах банкуудаар боломжтой: Хаан банк, Хас банк, Төрийн банк гэх мэт.'}
                </p>

                {/* QR Code */}
                <div className="bg-white rounded-xl p-8 flex justify-center border-2 border-gray-200">
                  <div className="w-48 h-48 bg-white flex items-center justify-center">
                    <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                      <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h5v-5zm-2 5h2v2h-2v-2zm-6-2h2v4h2v-4h2v-2h-6v2zm0-9h2v2h-2V7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-800">
                        {lang
                          ? 'Warning: This is a demo payment page. Payment will only be confirmed after scanning the QR code.'
                          : 'Анхааруулга: Энэ нь турших төлбөр юм. QR код уншуулснаар бүртгэл баталгаажна.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card Payment Form */}
            {selectedMethod === 'card' && (
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-sm text-gray-600">
                  {lang ? 'Enter your card details to complete the payment' : 'Картын мэдээллээ оруулна уу'}
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder={lang ? "Card Number" : "Картын дугаар"}
                    className="w-full px-4 py-3 text-gray-900 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-4 py-3 text-gray-900 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-4 py-3 text-gray-900 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button onClick={handleCompletion} className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                {lang ? 'Complete Payment' : 'Төлбөр төлөх'}
              </button>
              <button
                onClick={handleCancelPayment}
                className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                {lang ? 'Back' : 'Буцах'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

      <Footer lang={lang} />
    </div>
  );
}
