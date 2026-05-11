import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favorite/favoriteSlice";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const favorites = useSelector(
    (state) => state.favorites.favorites
  );

  if (favorites.length === 0) {
    return (
      // <div className="text-white text-center mt-10 text-2xl">
      //   No Favorite Movies Added
      // </div>

      <div
  className="h-[75dvh] bg-no-repeat bg-contain md:bg-auto 2xl:bg-contain bg-center scale-100 md:scale-110 flex items-end justify-center"
        style={{
          backgroundImage:
            "url('https://imgs.search.brave.com/purKN8zsywAveLD-KGKgbFD9xDPhwX37jwcgRbUqBBc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvbm8tcHJv/ZHVjdHMtYW5kLWZh/dm9yaXRlLWluLWZv/bGRlci1pbGx1c3Ry/YXRpb24tZG93bmxv/YWQtc3ZnLXBuZy1n/aWYtZmlsZS1mb3Jt/YXRzLS1lbXB0eS1z/dGF0ZXMtcGFjay1u/ZXR3b3JrLWNvbW11/bmljYXRpb24taWxs/dXN0cmF0aW9ucy0z/MzA5OTI1LnBuZw')",
        }}  
        > 
        <h1 className=" text-gray-400 pb-3 text-md md:text-[3dvh] font-bold tracking-tight ">Nothing in Favorite List !  </h1>
        </div>
    );
  }

  return (
    // <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 p-5">
    //   {favorites.map((movie) => (
    //     <div
    //       key={`${movie.media_type}-${movie.id}`}
    //       className="relative bg-zinc-900 rounded-lg overflow-hidden"
    //     >
    //       <img
    //         src={`${movie.poster}`}
    //         alt={movie.title || movie.name}
    //         className="w-full h-[30dvh] object-cover"
    //       />

    //       <button
    //         onClick={() => dispatch(toggleFavorite(movie))}
    //         className="absolute top-2 right-2 text-red-500 text-2xl"
    //       >
    //         <FaHeart />
    //       </button>

    //       <div className="p-3">
    //         <h2 className="text-white text-sm font-semibold">
    //           {movie.title || movie.name}
    //         </h2>
    //       </div>
    //     </div>
    //   ))}
    // </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full py-6 px-6 md:px-16 2xl:px-64">
      {favorites.map((movie) => (
        <div
          key={`${movie.media_type}-${movie.id}`}
          className="relative h-[22dhv] rounded-lg overflow-hidden"
        >
          <button
            onClick={() => dispatch(toggleFavorite(movie))}
            className="absolute top-2 right-2 text-red-500 text-2xl z-70"
          >
            <FaHeart />
          </button>

          <div
            className="w-full h-full"
            onClick={() => {
              navigate(`/details/${movie.media_type}/${movie.id}`);
            }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover hover:scale-105 transition duration-300 cursor-pointer"
            />

            

            <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black via-black/70 to-transparent">

              <h1 className="text-gray-300 text-sm font-semibold text-center">
                {movie.title}
              </h1>
            </div>
          </div>
        </div>

      ))}
    </div>
  );
};

export default Favorites;