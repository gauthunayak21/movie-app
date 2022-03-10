import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../common/apis/movieApi";
import { apiKey } from "../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async ({page, type, search}) => {
    const response = await movieApi.get(`?apiKey=${apiKey}&s=${search}&page=${page}&type=${type}`);
    return response.data;
  }
);

export const fetchAsyncMovieDetail = createAsyncThunk(
    "movies/fetchAsyncMovieDetail",
    async (id) => {
      const response = await movieApi.get(`?apiKey=${apiKey}&i=${id}&Plot=full`);
      return response.data;
    }
  );


const initialState = {
    movies: {
        isLoading: true,
        page: 1,
        movieList: [],
        totalMovies: null,
    },
    selectedMovie: {}
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies.isLoading = false;
            state.movies.movies = payload;
        },
        removeSelectedMovie: (state) => {
            state.selectedMovie = {}
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: (state, { payload }) => {
            console.log("Pending");
            return { ...state, movies: { ...state.movies, isLoading: true}}
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            return {
              ...state,
              movies: {
                ...state.movies,
                isLoading: false,
                page: state.movies.page + 1,
                movieList: [...state.movies.movieList, ...payload.Search],
                totalMovies: payload.totalResults,
              },
            };
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected");
        },
        [fetchAsyncMovieDetail.fulfilled]: (state, { payload }) => {
            return { ...state, selectedMovie: payload}
        }
    }
})

export const { addMovies, removeSelectedMovie } = movieSlice.actions;
export const getAllMovies = (state) => state.movies?.movies;
export const getSelectedMovie = (state) => state.movies?.selectedMovie;
export default movieSlice.reducer;