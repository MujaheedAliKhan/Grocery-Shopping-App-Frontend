import React from 'react'
import Back from '../components/Back';

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto pt-34 p-12 md:p-6 flex flex-col justify-center items-center min-h-screen">
      <div className='p-16 shadow-lg border border-gray-300 rounded-lg'>
        <Back/>
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>

      <div className="space-y-6 text-gray-700">

        <div>
          <h2 className="text-xl font-semibold">Account Issues</h2>
          <p>Make sure your email and password are correct. Use "Forgot Password" if needed.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Orders & Delivery</h2>
          <p>Track your order in "My Orders". Delivery takes 24–48 hours.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Payments</h2>
          <p>We support UPI, Debit/Credit Cards, and Cash on Delivery.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p>Email: support@groceryapp.com</p>
          <p>☏ +1800-000-000-111</p>
        </div>

      </div>
      </div>
    </div>
  );
}

export default Help
