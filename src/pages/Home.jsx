// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearSearch, fetchPopularMovies, search, trendingMovies } from '../features/Movies/moviesSlice';
// import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import Pagination from '../components/Pagination';

// const Home = () => {
//   const {
//     movies,
//     searchMovies,
//     totalPages,
//     searchQuery,
//     isLoading,
//   } = useSelector((state) => state.movies);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { type, movietype1 } = useParams();
//   console.log(type, movietype1)
//   const [searchParams] = useSearchParams();
//   const [currentPage, setCurrentPage] = useState(1);
//   useEffect(() => {
//     setCurrentPage(1);
//     dispatch(clearSearch());
//   }, [movietype1]);

//   useEffect(() => {
//     if (searchQuery) {
//       dispatch(search({ query: searchQuery, page: currentPage }));
//     }
//     else if (type === undefined) {
//       dispatch(trendingMovies(currentPage))
//     }
//     else {
//       dispatch(
//         fetchPopularMovies({
//           page: currentPage,
//           movietype1,
//           type
//         })
//       );
//     }

//   }, [dispatch, currentPage, movietype1, type , searchQuery]);

//   const displayMovies =
//     searchMovies && searchMovies.length > 0
//       ? searchMovies
//       : movies;
//        if (isLoading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-black/90 text-white">
//         <p className="text-xl animate-pulse">
//           Loading movie details...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full py-6 px-6 md:px-16 2xl:px-64">

//         {displayMovies?.map((movie) => (
//           <div
//             key={movie.id}
//             className="relative h-[22dhv] rounded-lg overflow-hidden"
//             onClick={() => {
//               {
//                 navigate(`/details/${movie.type}/${movie.id}`)
//               }
//               console.log(movie.type)
//             }
//             }
//           >
//             <img
//               src={movie.poster}
//               alt={movie.title}
//               className="w-full h-full object-cover hover:scale-105 transition duration-300 cursor-pointer"
//             />
//               {movietype1==='top_rated' ? <p>{movie.rate}</p> : null }
//             <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black via-black/70 to-transparent">
//               <h1 className="text-gray-300 text-sm font-semibold text-center">
//                 {movie.title}
//               </h1>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="w-full px-6 md:px-16 2xl:px-64 pb-8">
//         <Pagination 
//           currentPage={currentPage} 
//           setCurrentPage={setCurrentPage} 
//           totalPages={totalPages} 
//         />
//       </div>
//     </>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   clearSearch,
//   fetchPopularMovies,
//   search,
//   trendingMovies
// } from '../features/Movies/moviesSlice';
// import { toggleFavorite } from '../features/favorite/favoriteSlice';
// import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import Pagination from '../components/Pagination';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { GiFilmProjector } from 'react-icons/gi';

// const Home = () => {

//   const {
//     movies,
//     searchMovies,
//     totalPages,
//     searchQuery,
//     isLoading,
//     page,
//   } = useSelector((state) => state.movies);

//   const favorites = useSelector(
//     (state) => state.favorites.favorites
//   );

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { type, movietype1 } = useParams();

//   // const [searchParams] = useSearchParams();
//   // const [currentPage, setCurrentPage] = useState(1);

//   const [searchParams, setSearchParams] = useSearchParams();

//   const currentPage = Number(searchParams.get('page')) || 1;
//   useEffect(() => {
//     // setCurrentPage(1);
//     dispatch(clearSearch());
//   }, [movietype1]);

//   useEffect(() => {

//     if (searchQuery) {
//       dispatch(
//         search({
//           query: searchQuery,
//           page: currentPage
//         })
//       );
//     }

//     else if (type === undefined) {
//       dispatch(trendingMovies(currentPage));
//     }

//     else {
//       dispatch(
//         fetchPopularMovies({
//           page: currentPage,
//           movietype1,
//           type
//         })
//       );
//     }

//   }, [dispatch, currentPage, movietype1, type, searchQuery]);

//   const displayMovies =
//     searchMovies && searchMovies.length > 0
//       ? searchMovies
//       : movies;

//   const isFavorite = (movie) => {
//     return favorites.some(
//       (item) =>
//         item.id === movie.id &&
//         item.media_type === movie.type
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="flex h-screen flex-col items-center justify-center bg-black/90 text-white">
//         <GiFilmProjector className="text-6xl animate-bounce text-gray-500 mb-4" />

//         <p className="text-2xl font-semibold tracking-wide animate-pulse">
//           Loading movie details...
//         </p>

//         <div className="mt-6 flex gap-2">
//           <span className="h-3 w-3 rounded-full bg-gray-500 animate-bounce"></span>
//           <span className="h-3 w-3 rounded-full bg-gray-500 animate-bounce delay-150"></span>
//           <span className="h-3 w-3 rounded-full bg-gray-500 animate-bounce delay-300"></span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full py-6 px-6 md:px-16 2xl:px-64">
//         {displayMovies?.map((movie) => (
//           <div
//             key={`${movie.type}-${movie.id}`}
//             className="relative h-[22dhv] rounded-lg overflow-hidden"
//           >
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 dispatch(
//                   toggleFavorite({
//                     ...movie,
//                     media_type: movie.type,
//                   })
//                 );
//               }}
//               className="absolute top-3 right-3 z-20 text-red-500 text-2xl"
//             >

//               {isFavorite(movie) ? (
//                 <FaHeart />
//               ) : (
//                 <FaRegHeart />
//               )}

//             </button>

//             <div
//               className="w-full h-full"
//               onClick={() => {
//                 navigate(`/details/${movie.type}/${movie.id}`);
//               }}
//             >

//               <img
//                 src={movie.poster}
//                 alt={movie.title}
//                 className="w-full h-full object-cover hover:scale-105 transition duration-300 cursor-pointer"
//               />

//               {movietype1 === 'top_rated' ? (
//                 <p className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded">
//                   ⭐ {movie.rate}
//                 </p>
//               ) : null}

//               <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black via-black/70 to-transparent">

//                 <h1 className="text-gray-300 text-sm font-semibold text-center">
//                   {movie.title}
//                 </h1>

//               </div>

//             </div>

//           </div>

//         ))}

//       </div>

//       <div className="w-full px-6 md:px-16 2xl:px-64 pb-8">

//         <Pagination
//           // currentPage={currentPage}
//           // setCurrentPage={setCurrentPage}
//           // totalPages={totalPages}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           setSearchParams={setSearchParams}

//         />

//       </div>
//     </>
//   );
// };

// export default Home;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSearch,
  fetchPopularMovies,
  search,
  trendingMovies
} from '../features/Movies/moviesSlice';
import { toggleFavorite } from '../features/favorite/favoriteSlice';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { GiFilmProjector } from 'react-icons/gi';

const Home = () => {

  const {
    movies,
    searchMovies,
    totalPages,
    searchQuery,
    isLoading,
    page,
  } = useSelector((state) => state.movies);

  const favorites = useSelector(
    (state) => state.favorites.favorites
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type, movietype1 } = useParams();

  // const [searchParams] = useSearchParams();
  // const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  useEffect(() => {
    // setCurrentPage(1);
    dispatch(clearSearch());
  }, [movietype1]);

  useEffect(() => {

    if (searchQuery) {
      dispatch(
        search({
          query: searchQuery,
          page: currentPage
        })
      );
    }

    else if (type === undefined) {
      dispatch(trendingMovies(currentPage));
    }

    else {
      dispatch(
        fetchPopularMovies({
          page: currentPage,
          movietype1,
          type
        })
      );
    }

  }, [dispatch, currentPage, movietype1, type, searchQuery]);

  const displayMovies =
    searchMovies && searchMovies.length > 0
      ? searchMovies
      : movies;

  const isFavorite = (movie) => {
    return favorites.some(
      (item) =>
        item.id === movie.id &&
        item.media_type === movie.type
    );
  };

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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full py-6 px-6 md:px-16 2xl:px-64">
        {displayMovies?.map((movie) => (
          <div
            key={`${movie.type}-${movie.id}`}
            className="relative h-[22dhv] rounded-lg overflow-hidden"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  toggleFavorite({
                    ...movie,
                    media_type: movie.type,
                  })
                );
              }}
              className="absolute top-3 right-3 z-20 text-red-500 text-2xl"
            >

              {isFavorite(movie) ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}

            </button>

            <div
              className="w-full h-full"
              onClick={() => {
                navigate(`/details/${movie.type}/${movie.id}`);
              }}
            >

              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-300 cursor-pointer"
              />

              {movietype1 === 'top_rated' ? (
                <p className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded">
                  ⭐ {movie.rate}
                </p>
              ) : null}

              <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black via-black/70 to-transparent">

                <h1 className="text-gray-300 text-sm font-semibold text-center">
                  {movie.title}
                </h1>

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="w-full px-6 md:px-16 2xl:px-64 pb-8">

        <Pagination
          // currentPage={currentPage}
          // setCurrentPage={setCurrentPage}
          // totalPages={totalPages}
          currentPage={currentPage}
          totalPages={totalPages}
          setSearchParams={setSearchParams}

        />

      </div>
    </>
  );
};

export default Home;


