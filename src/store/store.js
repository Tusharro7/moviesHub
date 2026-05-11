import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './../features/Movies/moviesSlice'
import favoriteReducer from './../features/favorite/favoriteSlice'
export const store = configureStore({
    reducer:{
        movies:moviesSlice ,
        favorites: favoriteReducer,
    }
})