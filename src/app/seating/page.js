'use client';

import { useState } from 'react';
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useAuth } from "@/context/AuthContext"

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
    const [lang, setLang]= useState(true);
        const { logged } = useAuth();
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);

  const pricePerSeat = 15000; // example price

  const handleSeatClick = (seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat || seat.status === 'taken') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
      setSeats((prev) =>
        prev.map((s) =>
          s.id === seatId ? { ...s, status: 'available' } : s
        )
      );
    } else {
      setSelectedSeats((prev) => [...prev, seatId]);
      setSeats((prev) =>
        prev.map((s) =>
          s.id === seatId ? { ...s, status: 'selected' } : s
        )
      );
    }
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

  const totalPrice = selectedSeats.length * pricePerSeat;

  return (
    <div className=" flex flex-col items-center justify-center bg-black font-sans  text-white">
       <Header lang={lang} setLang={setLang} logged={logged} />
       <div className='overflow-hidden  flex flex-col h-180 mb-56 w-2/3 items-center justify-center bg-slate-700 rounded-2xl'>
<h1 className="text-3xl font-bold mb-8">Seat Selection</h1>

      <div className="mb-8">
        {ROWS.map((row) => (
          <div key={row} className="flex items-center gap-2 mb-3">
            <div className="w-6 text-center font-bold">{row}</div>

            <div className="flex gap-2">
              {seats
                .filter((s) => s.row === row)
                .map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={seat.status === 'taken'}
                    className={`w-10 h-10 rounded ${getSeatColor(seat.status)}`}
                    title={seat.id}
                  >
                    <span className="text-xs">{seat.number}</span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white text-black rounded-lg ml-9 p-6 w-2/5">
        <p className="mb-2">
          <strong>Selected Seats:</strong>{' '}
          {selectedSeats.length
            ? selectedSeats.join(', ')
            : 'None'}
        </p>

        <p className="mb-4">
          <strong>Total:</strong>{' '}
          {totalPrice.toLocaleString()}₮
        </p>

        <button
          disabled={!selectedSeats.length}
          className={`w-full py-3 rounded ${
            selectedSeats.length
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Checkout
        </button>
      </div>
       </div>
      
                  <Footer lang={lang} />
    </div>
  );
}
