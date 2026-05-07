// src/components/ReservationForm.jsx
import { useState } from 'react';

export default function ReservationForm({ orderItems, onClearOrder }) {
  const [form, setForm] = useState({ name: '', date: '', time: '', guests: 2 });

  const total = orderItems.reduce((sum, item) => sum + Number(item.price), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reserve:', {...form, order: orderItems });
    alert(`Table requested for ${form.guests} guests! Order total: $${total}. We'll confirm via SMS.`);
    onClearOrder();
  };

  return (
    <section id="reserve" className="bg-zinc-100 px-4 py-20 text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center text-4xl font-bold">Reserve Your Table</h2>

        {orderItems.length > 0 && (
          <div className="mb-8 rounded-xl bg-white p-6 shadow dark:bg-zinc-900">
            <h3 className="mb-4 text-xl font-semibold">Your Pre-Order</h3>
            {orderItems.map((item, idx) => (
              <div key={idx} className="flex justify-between py-2 text-sm">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="mt-4 border-t border-zinc-300 pt-4 font-bold dark:border-zinc-700">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-amber-500">${total}</span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="rounded-lg bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 dark:bg-zinc-800"
            onChange={e => setForm({...form, name: e.target.value})}
          />
          <input
            type="date"
            required
            className="rounded-lg bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 dark:bg-zinc-800"
            onChange={e => setForm({...form, date: e.target.value})}
          />
          <input
            type="time"
            required
            className="rounded-lg bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 dark:bg-zinc-800"
            onChange={e => setForm({...form, time: e.target.value})}
          />
          <select
            className="rounded-lg bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 dark:bg-zinc-800"
            onChange={e => setForm({...form, guests: e.target.value})}
            value={form.guests}
          >
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Guests</option>)}
          </select>
          <button
            type="submit"
            className="rounded-lg bg-amber-500 py-3 font-bold text-black transition hover:bg-amber-400 md:col-span-2"
          >
            Request Reservation
          </button>
        </form>
      </div>
    </section>
  );
}