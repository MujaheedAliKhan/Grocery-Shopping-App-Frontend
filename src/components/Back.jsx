import React from 'react'
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Back = () => {
    const navigate = useNavigate();
  return (
    <div>
        <button 
        className='mb-4 border text-xl p-1 rounded-full text-white bg-amber-600 hover:bg-white hover:border-amber-600 hover:text-amber-600 transition duration-200'
        onClick={() => navigate("/")}><FiArrowLeft/></button>
    </div>
  )
}

export default Back
