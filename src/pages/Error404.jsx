import React from "react";
import { useNavigate } from "react-router-dom";
import { GiFilmProjector } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80dvh] bg-black text-white flex items-center justify-center px-4">
      <div className="text-center">
        
        <GiFilmProjector className="mx-auto text-7xl text-gray-500 animate-bounce mb-6" />

        <h1 className="text-7xl md:text-9xl font-extrabold text-gray-500">
          404
        </h1>

        <h2 className="mt-4 text-2xl md:text-4xl  font-bold">
          Page Not Found
        </h2>

        {/* <p className="mt-4 text-gray-400 max-w-md mx-auto">
          Looks like this movie scene does not exist. 
          The page you are looking for may have been removed
          or the URL is incorrect.
        </p> */}

        <button
          onClick={() => navigate("/")}
          className="mt-8 inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105"
        >
          <FaHome />
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default Error404;