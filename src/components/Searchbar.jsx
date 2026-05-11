import React, { useState, useEffect } from 'react' 
import { VscSearchSparkle } from 'react-icons/vsc'
import { search, clearSearch } from '../features/Movies/moviesSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../api/tmdb'

const Searchbar = () => {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [suggesttext, setSuggesttext] = useState([]);
  
  const [showsuggesttext, setShowsuggesttext] = useState(false); 

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (query.trim() === '') {
      setSuggesttext([]);
      setShowsuggesttext(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await api.get('/search/multi', {
          params: { query, page: 1 }
        });
        setSuggesttext(response.data.results.slice(0, 5));
        setShowsuggesttext(true);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    }, 300); 

    return () => clearTimeout(timer);
  }, [query]); 


  const handleSearch = (searchWord) => {
    const finalQuery = typeof searchWord === 'string' ? searchWord : query;

    if (!finalQuery.trim()) {
      dispatch(clearSearch());
      return;
    }
    
    setQuery(finalQuery); 
    setShowsuggesttext(false); 
    dispatch(search({ query: finalQuery, page: 1 })); 
    // navigate('/');
    navigate('/?page=1');
  }

  return (
    <>
      <div className='w-full flex justify-center px-4 md:px-0 relative z-30'>
        <div className='w-full md:w-1/2 relative'>

          <div className='w-full flex items-center gap-2 bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-0 md:py-1 shadow-lg focus-within:border-gray-500 transition-all duration-300 mb-3 md:mb-2'>
            <input  
              type='text'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value === '') {
                  dispatch(clearSearch());
                }
              }}
              onBlur={() => setTimeout(() => setShowsuggesttext(false), 200)}
              onFocus={() => { if(suggesttext.length > 0) setShowsuggesttext(true) }}
              placeholder='Search movies...'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className='w-full bg-transparent text-gray-200 placeholder:text-gray-500 outline-none text-sm md:text-md 2xl:text-[1.5dvh]'
            />

            <button
              onClick={handleSearch}
              className='flex items-center justify-center rounded-lg p-2 text-white'
            >
              <VscSearchSparkle className='text-[2dvh]' />
            </button>
          </div>

          {showsuggesttext && suggesttext.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-[#111] border border-gray-700 rounded-lg mt-1 shadow-2xl overflow-hidden z-50">
              {suggesttext.map((item) => {
                const text = item.title || item.name;
                return (
                  <div 
                    key={item.id}
                    onMouseDown={() => handleSearch(text)} 
                    className="px-4 py-3 hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-800 last:border-b-0 text-gray-200"
                  >
                    <VscSearchSparkle className="text-gray-500 text-xs md:text-[2dvh] 2xl:text-[1.2dvh]" />
                    <span 
                    className='text-xs md:text-[2dvh] 2xl:text-[1.2dvh]'
                    >{text}</span>
                  </div>
                )
              })}
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default Searchbar


// import React, { useState, useEffect } from 'react'
// import { VscSearchSparkle } from 'react-icons/vsc'
// import { useNavigate } from 'react-router-dom'
// import api from '../api/tmdb'

// const Searchbar = () => {

//   const [query, setQuery] = useState('');
//   const [suggesttext, setSuggesttext] = useState([]);
//   const [showsuggesttext, setShowsuggesttext] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {

//     if (!query.trim()) {
//       setSuggesttext([]);
//       setShowsuggesttext(false);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         const res = await api.get('/search/multi', {
//           params: { query, page: 1 }
//         });

//         setSuggesttext(res.data.results.slice(0, 5));
//         setShowsuggesttext(true);

//       } catch (err) {
//         setSuggesttext([]);
//         setShowsuggesttext(false);
//       }

//     }, 300);

//     return () => clearTimeout(timer);

//   }, [query]);

//   const handleSearch = (text) => {

//     const final = (typeof text === "string" ? text : query).trim();

//     if (!final) return;

//     // 🔥 IMPORTANT: fully reset UI state
//     setQuery(final);
//     setSuggesttext([]);
//     setShowsuggesttext(false);

//     navigate(`/?page=1&search=${final}`);
//   };

//   return (
//     <div className='w-full flex justify-center px-4 md:px-0 relative z-30'>
//       <div className='w-full md:w-1/2 relative'>

//         <div className='w-full flex items-center gap-2 bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-0 md:py-1 shadow-lg focus-within:border-gray-500 transition-all duration-300 mb-3 md:mb-2'>

//           <input
//             type='text'
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') handleSearch(query)
//             }}
//             placeholder='Search movies...'
//             className='w-full bg-transparent text-gray-200 placeholder:text-gray-500 outline-none text-sm md:text-md 2xl:text-[1.5dvh]'
//           />

//           {/* ✅ FIX: wrap function to avoid event bug */}
//           <button
//             onClick={() => handleSearch()}
//             className='flex items-center justify-center rounded-lg p-2 text-white'
//           >
//             <VscSearchSparkle className='text-[2dvh]' />
//           </button>

//         </div>

//         {showsuggesttext && suggesttext.length > 0 && (
//           <div className="absolute top-full left-0 w-full bg-[#111] border border-gray-700 rounded-lg mt-1 shadow-2xl overflow-hidden z-50">

//             {suggesttext.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => handleSearch(item.title || item.name)}
//                 className="px-4 py-3 hover:bg-gray-800 cursor-pointer flex items-center gap-3 text-gray-200"
//               >
//                 {item.title || item.name}
//               </div>
//             ))}

//           </div>
//         )}

//       </div>
//     </div>
//   )
// }

// export default Searchbar