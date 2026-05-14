import React from 'react'
import Back from '../components/Back';

const Terms = () => {
 return (
    <div className="min-h-screen pt-36 md:pt-24 bg-gray-50 p-12 flex flex-col justify-center items-center">
     
      <div className="max-w-full text-left bg-white shadow-md rounded-2xl py-10 md:px-30 p-12 border border-gray-300">
         <Back/>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Terms & Conditions 
        </h1>

        <div className="space-y-4 text-gray-600 leading-relaxed w-full">

          <p>
            By using our Grocery Shopping App, you agree to the following terms.
          </p>

          <div>
            <h2 className="font-semibold text-lg text-black">1. Use of Service</h2>
            <p>You agree to use this platform only for lawful purposes.</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-black">2. Account Responsibility</h2>
            <p>You are responsible for maintaining your account credentials.</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-black">3. Orders & Pricing</h2>
            <p>Prices may change without notice. Orders can be canceled if necessary.</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-black">4. Delivery Policy</h2>
            <p>Delivery times are estimated and may vary based on location.</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-black">5. Refund Policy</h2>
            <p>Refunds are processed within 5–7 working days for eligible items.</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-black">6. Changes to Terms</h2>
            <p>We may update these terms anytime. Continued use means acceptance.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Terms
