
import api from "../../api/tmdb";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";


const trendingMovies = async (page) => {
  console.log('called from movies js api file ');
  const response = await api.get(`/trending/all/day`, {
    params: {
      page
    }
  }
  )
  console.log(response.data)
  return {
    page: response.data.page,
    totalPages: response.data.total_pages,
    movies: response.data.results.map((movie) => ({
      id: movie.id,
      type: movie.media_type,
      title: movie.title || movie.name,
      poster: movie.poster_path
        ? IMAGE_BASE + movie.poster_path
        : "https://imgs.search.brave.com/jOk9Hanca1Q1pLVB0H8vbPoqpDobX9UaO5AmutKRQ2k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzI2Lzc1/L2I0LzI2NzViNGY3/YjAyMjJlZjE0Y2Zi/OWEwNzc5MjIxNmM0/LmpwZw"
    })),
  };
}

const fetchPopularMovies = async (page, type, movietype1) => {
  console.log("Service page:", page, type, movietype1);

  const response = await api.get(`/${type}/${movietype1}`,
    {
      params: {
        page
      }
    });
  console.log(response.data.results.media_type)
  return {
    page: response.data.page,
    totalPages: response.data.total_pages,
    movies: response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      type: 'movie',
      rate: movie.vote_average, 
      poster: movie.poster_path
        ? IMAGE_BASE + movie.poster_path
        : "/no-image.png",
    })),
  };
};

const fetchMovieDetails = async ({ id, type }) => {
  console.log(
    "called from movies slice for fetchMovies Details",
    id, type
  );

  const response = await api.get(`/${type}/${id}`);
  return {
    BgImage: response.data.backdrop_path
      ? IMAGE_BASE + response.data.backdrop_path
      : "/no-image.png",

    budget: response.data.budget,

    id: response.data.id,

    title: response.data.title || response.data.name,
    subtitle: response.data.original_title || response.data.original_name ,
    description: response.data.overview,

    poster: response.data.poster_path
      ? IMAGE_BASE + response.data.poster_path
      : "https://imgs.search.brave.com/jOk9Hanca1Q1pLVB0H8vbPoqpDobX9UaO5AmutKRQ2k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzI2Lzc1/L2I0LzI2NzViNGY3/YjAyMjJlZjE0Y2Zi/OWEwNzc5MjIxNmM0/LmpwZw",

    revenue: response.data.revenue,

    runtime: response.data.runtime,

    status: response.data.status,
    releaseDate: response.data.release_date,

    rating: response.data.vote_average,

    tagline: response.data.tagline,

    overview: response.data.overview,

  };
};

const fetchMovieVideos = async ({ id, type }) => {
  const response = await api.get(`/${type}/${id}/videos`);
  const videos = response.data.results;
  const trailer =
    videos.find(
      (video) =>
        video.type === "Trailer" &&
        video.site === "YouTube" &&
        video.official
    ) ||
    videos.find(
      (video) =>
        video.type === "Trailer" &&
        video.site === "YouTube"
    );

  return {
    key: trailer?.key || null,
    name: trailer?.name || null,
  };
};

const fetchMovieImages = async ({ id, type }) => {
  const response = await api.get(`/${type}/${id}/images`)
  const images = response.data?.backdrops
    ?.slice(0, 8)
    ?.map((img) => IMAGE_BASE + img.file_path)
  console.log(images)
  return images
}

const fetchSimilarMovies = async ({ id, type }) => {
  const response = await api.get(`/${type}/${id}/similar`)
  console.log(response.data)
  return response.data.results
}

const search = async ({ query, page }) => {

  const response = await api.get('/search/multi', {
    params: {
      query,
      page
    }
  });
  console.log(response.data)

  return {
    page: response.data.page,
    totalPages: response.data.total_pages,
    movies: response.data.results.map((item) => ({
      id: item.id,
      title: item.title || item.name,
      type: item.media_type,
      poster: item.poster_path
        ? IMAGE_BASE + item.poster_path
        : "https://imgs.search.brave.com/jOk9Hanca1Q1pLVB0H8vbPoqpDobX9UaO5AmutKRQ2k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzI2Lzc1/L2I0LzI2NzViNGY3/YjAyMjJlZjE0Y2Zi/OWEwNzc5MjIxNmM0/LmpwZw",

    }))
  };
}


const moviesServices = { fetchPopularMovies, fetchMovieDetails, fetchMovieVideos, fetchMovieImages, fetchSimilarMovies, search, trendingMovies };
export default moviesServices;  