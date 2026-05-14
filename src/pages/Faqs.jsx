import React from "react";

import { useState } from "react";
import Back from "../components/Back";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Browse products, add to cart, and checkout.",
  },
  {
    question: "What payment methods are available?",
    answer: "UPI, Cards, and Cash on Delivery.",
  },
  {
    question: "Can I cancel my order?",
    answer: "Yes, before it is shipped.",
  },
  { question: "How long does delivery take?", answer: "Usually 24–48 hours" },
  {
    question: "What if I receive damaged items?",
    answer: "Contact support within 24 hours for replacement or refund.",
  },
  { question: "Do you offer refunds?", answer: "Yes, based on eligibility." },
  {
    question: "Is there a minimum order amount?",
    answer: "Yes, ₹100 minimum order value.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto md:pt-32 pt-36 p-16 flex flex-1 flex-col justify-center items-center min-h-screen">
      <div className="w-full bg-white rounded-lg shadow-lg md:p-10 p-10 border border-gray-300">
        <Back/>
        <h1 className="text-3xl font-bold mb-4">FAQs</h1>

        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg mb-3 ">
            <div className="flex justify-between items-center p-4">
              <h1>{faq.question}</h1>
              <button
                className="transition-all duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {openIndex === index ? "➖" : "➕"}
              </button>
            </div>
            <div
            className={`px-4 text-gray-600 transition-all duration-300 ${
              openIndex === index ? "max-h-40 py-2" : "max-h-0 overflow-hidden"
            }`}
          >
            {faq.answer}
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
