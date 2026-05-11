import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMovieDetails,
  fetchMovieImages,
  fetchMovieVideos,
  fetchSimilarMovies,
  resetmovie,

} from "../features/movies/moviesSlice";
import { GiFilmProjector } from "react-icons/gi";
const MovieDetails = () => {
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  const { id, type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { movieDetails, isLoading, error, movieVideos, moviesImages, similarMovies } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovieDetails({ id, type }));
    dispatch(fetchMovieVideos({ id, type }));
    dispatch(fetchMovieImages({ id, type }));
    dispatch(fetchSimilarMovies({ id, type }));
    return () => {
      dispatch(resetmovie());
    };
  }, [dispatch, id]);
  console.log(similarMovies)
  if (isLoading) {
    return (
       <div className="flex h-screen flex-col items-center justify-center bg-black/90 text-white">
        <GiFilmProjector className="text-6xl animate-bounce text-gray-500 mb-4" />
      
        <p className="text-2xl font-semibold tracking-wide animate-pulse">
          Loading movie details...
        </p>
      
        <div className="mt-6 flex gap-2">
          <span className="h-3 w-3 rounded-full bg-gray-500 animate-bounce"></span>
          <span className="h-3 w-3 rounded-full bg-gray-500 animate-bounce delay-150"></span>
          <span className="h-3 w-3 rounded-full bg-gray-500 animate-bounce delay-300"></span>
        </div>
      </div>  
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-black-90 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!movieDetails) return null;

  return (
    <>
      <div
        className="relative w-full min-h-[90dvh] bg-cover bg-no-repeat bg-center flex flex-col justify-end  p-8 md:p-16 text-white"
        style={{
          backgroundImage: `linear-gradient(
          to top,
          rgba(0,0,0,0.95),
          rgba(0,0,0,0.6)
        ), url(${movieDetails.BgImage})`,
        }}
      >
        <div className="max-w-4xl space-y-3">


          <div className="h-[50dvh] w-[60dvw] md:w-1/3 lg:w-[30dvh] 2xl:w-[28dvw] rounded-lg overflow-hidden">
            <img
              src={movieDetails.poster}
              className="w-full h-full object-cover hover:scale-105 transition duration-300 cursor-pointer"
            />
          </div>

          <h1 className="text-sm md:text-xl font-black tracking-tight">
            {movieDetails.title || movieDetails.name}  {movieDetails.title !== movieDetails.subtitle ? `( ${movieDetails.subtitle} )` : null}  .
          </h1>

          {movieDetails.tagline && (
            <p className="text-sm md:text-lg text-gray-300">
              "{movieDetails.tagline}"
            </p>
          )}

          <p className="text-xs md:text-[2dvh] text-gray-200 max-w-2xl">
            {movieDetails.overview}
          </p>

          <div className="flex flex-wrap gap-6 pt-4 border-t border-white/20">
            <div>
              <p className="text-gray-400 text-sm uppercase">
                Rating
              </p>

              <p className="font-semibold text-yellow-400">
                {movieDetails.rating?.toFixed(1)}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm uppercase">
                Runtime
              </p>

              <p className="font-semibold">
                {movieDetails.runtime} min
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm uppercase">
                Budget
              </p>

              <p className="font-semibold text-green-400">
                $
                {movieDetails.budget?.toLocaleString() || 0}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm uppercase">
                Status
              </p>

              <p className="font-semibold">
                {movieDetails.status}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm uppercase">
                release_date
              </p>

              <p className="font-semibold">
                {movieDetails.releaseDate}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="my-3 px-6 md:px-16 2xl:px-64 "
      >
        {
          movieVideos?.key && (
            <div>
              <h1
                className="text-gray-400 text-md md:text-xl uppercase font-bold py-2 w-full text-center"
              >watch online </h1>
              <iframe
                className="w-full h-[50dvh] rounded-xl "
                src={`https://www.youtube.com/embed/${movieVideos.key}?autoplay=0&mute=1`}
                title={movieVideos.name}
                allow="autoplay"
                allowFullScreen
              />
            </div>
          )
        }
      </div>
      <div
        className="my-3 px-6 md:px-16 2xl:px-64  "
      >
        <h1
          className="text-gray-400 text-md md:text-xl uppercase font-bold py-2 w-full text-center"
        >Screen Shorts of {movieDetails.title}  </h1>
        <div
          className="relative flex overflow-x-auto rounded scrollbar-hide scrollbar-hide::-webkit-scrollbar "
        >

          {
            moviesImages?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="movie"
                className="w-full  "
              />
            ))
          }
        </div>
      </div>

      <div>
        {similarMovies && (
          <div
            className="my-3 px-6 md:px-16 2xl:px-64 "
          >
            <h1 className="text-gray-400 text-md md:text-xl uppercase font-bold py-2 w-full ">
              Similar Movies
            </h1>

            <div className="flex overflow-x-auto gap-4 scrollbar-hide py-2">
              {similarMovies?.map((movie) => {
                return (
                  <div
                    key={movie.id}
                    className="relative h-[45dvh] w-[40dvw] md:w-1/3 lg:w-[16dvw] shrink-0 rounded-xl overflow-hidden cursor-pointer"
                    onClick={() =>
                      navigate(`/details/${type}/${movie.id}`)
                      // navigate(`/`)

                    }
                  >
                    <img
                      src={
                        movie.poster_path
                          ? IMAGE_BASE + movie.poster_path
                          : "https://imgs.search.brave.com/jOk9Hanca1Q1pLVB0H8vbPoqpDobX9UaO5AmutKRQ2k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzI2Lzc1/L2I0LzI2NzViNGY3/YjAyMjJlZjE0Y2Zi/OWEwNzc5MjIxNmM0/LmpwZw"
                      }
                      alt={movie.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />

                    <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black via-black/70 to-transparent">
                      <h1 className="text-gray-200 text-sm font-semibold text-center line-clamp-2">
                        {movie.title}
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetails;