import React, { useState } from 'react'
import { GiFilmProjector } from 'react-icons/gi'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar'
import { MdOutlineFavoriteBorder } from 'react-icons/md'

const Navbar = () => {

    const navigate = useNavigate()

    const [openSidebar, setOpenSidebar] = useState(false)

    const category = [
        {
            type: 'movie',
            name: 'now playing',
            movietype1: 'now_playing',
            movietype: '/movie/now_playing'
        },

        {
            type: 'movie',
            name: 'top rated',
            movietype1: 'top_rated',
            movietype: '/movie/top_rated'
        },

        {
            type: 'movie',
            name: 'popular',
            movietype1: 'popular',
            movietype: '/movie/popular'
        },

        {
            type: 'movie',
            name: 'upcoming',
            movietype1: 'upcoming',
            movietype: '/movie/upcoming'
        }
    ]

    return (
        <>
            <div
                className='flex items-center justify-between px-6 md:px-16 2xl:px-64 h-[8dvh]'
            >
                <div
                    className='flex text-gray-300 font-bold items-center text-[2.5dvh] md:text-[3dvh] gap-2 cursor-pointer'
                    onClick={() => navigate('/')}
                >
                    <GiFilmProjector className='text-[4dvh] md:text-[5dvh]' />
                    <span className='uppercase'>
                        Movies Hub ™
                    </span>
                </div>
                <div className='hidden md:flex  items-center gap-6 2xl:gap-8'>
                    {
                        category.map((items) => (
                            <Link
                                key={items.name}
                                to={`${items.type}/${items.movietype1}`}
                                className='uppercase text-[2dvh] 2xl:text-[1.3dvh] text-gray-400 hover:text-white transition'
                            >
                                {items.name}
                            </Link>
                        ))
                    }
                    <Link to='/Favorites'>
                        <MdOutlineFavoriteBorder className='text-[3dvh]' />
                    </Link>
                </div>

                <button
                    className='md:hidden text-gray-300 text-3xl'
                    onClick={() => setOpenSidebar(true)}
                >
                    <HiMenuAlt3 />
                </button>
            </div>
            {
                openSidebar && (
                    <div
                        className='fixed inset-0 bg-black/50 z-69'
                        onClick={() => setOpenSidebar(false)}
                    />
                )
            }
            <div
                className={`
          fixed top-0 right-0 h-full w-[70%] bg-[#111] z-70
          transform transition-transform duration-300
          ${openSidebar ? 'translate-x-0' : 'translate-x-full'}
        `}
            >
                <div className='flex items-center justify-between p-6 border-b border-gray-800'>

                    <h1 className='text-white text-xl font-bold'>
                        sidebar
                    </h1>

                    <button
                        className='text-gray-300 text-3xl'
                        onClick={() => setOpenSidebar(false)}
                    >
                        <HiX />
                    </button>
                </div>
                <div className='flex flex-col p-6 gap-6'>
                    {
                        category.map((items) => (

                            <Link
                                key={items.name}
                                to={`${items.type}/${items.movietype1}`}
                                onClick={() => {
                                    console.log('called')
                                    setOpenSidebar(false)
                                }}
                                className='uppercase text-gray-300 text-lg hover:text-white transition'
                            >
                                {items.name}
                            </Link>
                        ))
                    }
                    <Link to='/Favorites '
                        onClick={() => {
                            setOpenSidebar(false)
                        }}
                        className='uppercase text-gray-300 text-lg hover:text-white transition flex items-center gap-2 '>
                        <MdOutlineFavoriteBorder className='text-[3dvh]' /> Favorite
                    </Link>
                </div>
            </div>

            <Searchbar />


        </>
    )
}

export default Navbar