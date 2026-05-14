import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen mx-auto flex justify-center items-center px-6 ">
      <div className="flex flex-col justify-center items-center text-center border border-gray-300 shadow-lg rounded-lg px-20 py-8">
        <h1 className="text-6xl font-bold text-amber-600">
        404
      </h1>

      <p className="text-2xl mt-4 text-gray-700">
        Page Not Found
      </p>

      <p className="text-gray-500 mt-2">
        The page you are looking for
        doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-500 transition outline-none"
      >
        Go Back Home
      </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;