
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moviesServices from "./movies";

const initialState = {
  movies: [],
  searchMovies: [],
  searchQuery: '',
  moviesImages: null,
  movieDetails: null,
  movieVideos: null,
  similarMovies: null,
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 1,
};


export const trendingMovies = createAsyncThunk(
  "movies/trending", async (page, thunkAPI) => {
    try {
      return await moviesServices.trendingMovies(page)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
)

export const fetchPopularMovies = createAsyncThunk(
  "movies/PopularMovies",
  async ({ page, type, movietype1 }, thunkAPI) => {
    try {
      console.log(page, type, movietype1)
      return await moviesServices.fetchPopularMovies(page, type, movietype1);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const fetchMovieDetails = createAsyncThunk(
  "movies/Detailmovies",
  async ({ id, type }, thunkAPI) => {
    try {
      console.log(id, type)
      const response = await moviesServices.fetchMovieDetails({ id, type });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "error from backend api"
      );
    }
  }
);

export const fetchMovieVideos = createAsyncThunk(
  "movie/Videos",
  async ({ id, type }, thunkAPI) => {
    try {
      const response = await moviesServices.fetchMovieVideos({ id, type });
      console.log('called from fetchvideos from slice')
      return response
    }
    catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "error from backend api"
      );
    }
  }
)

export const fetchMovieImages = createAsyncThunk(
  "movies/images", async ({ id, type }, thunkAPI) => {
    try {
      const response = await moviesServices.fetchMovieImages({ id, type });
      return response
    }
    catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "error from backend api"
      );
    }
  }
)
export const fetchSimilarMovies = createAsyncThunk(
  "movies/similar", async ({ id, type }, thunkAPI) => {
    try {
      const response = await moviesServices.fetchSimilarMovies({ id, type });
      console.log('called from sllice similar movies ');
      return response
    }
    catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "error from backend api"
      );
    }
  }
)
export const search = createAsyncThunk(
  "movies/search", async ({ query, page }, thunkAPI) => {
    try {
      const response = await moviesServices.search({ query, page });
      return response;
    }
    catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "error from backend api"
      );
    }
  }
)

const movieSlice = createSlice({
  name: "movies",
  initialState,

  reducers: {
    resetmovie: (state) => {
      state.movieDetails = null;
      state.error = null;
      state.isLoading = false;
      state.movieVideos = null;
      state.moviesImages = null;
      state.similarMovies = null;
    },
    clearSearch: (state) => {
      state.searchMovies = [],
        state.searchQuery = ''

    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })

      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchMovieDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieDetails = action.payload;
        state.error = null;
      })

      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchMovieVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchMovieVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieVideos = action.payload;
        state.error = null;
      })
      .addCase(fetchMovieVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchMovieImages.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchMovieImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.moviesImages = action.payload;
      })
      .addCase(fetchMovieImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })

      .addCase(fetchSimilarMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.similarMovies = action.payload;
      })
      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })

      .addCase(search.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.page = action.payload.page
        state.totalPages = action.payload.totalPages
        state.searchMovies = action.payload.movies;
        state.searchQuery = action.meta.arg.query;
      })
      .addCase(search.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })

      .addCase(trendingMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(trendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages
        state.movies = action.payload.movies;
      })
      .addCase(trendingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })
  },
});

export const { resetmovie, clearSearch } = movieSlice.actions;

export default movieSlice.reducer;