import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncMovies, getAllMovies } from "../../features/movieSlice";
import "./MovieListing.scss";
import { Link, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

const MovieListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const type = searchParams.get('type');

    const {movieList, isLoading, totalMovies, page} = useSelector(getAllMovies);
    const dispatch = useDispatch();

    useEffect( () => {
      console.log(page, search, type)
        dispatch(fetchAsyncMovies({page, type, search}));
    },[])

  const loadFunc = () => {
      if(movieList.length < totalMovies && !isLoading) {
        dispatch(fetchAsyncMovies({page, type, search}));
      }
  };

  const renderList =
  movieList?.map((movie) => {
      return (
        <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
          <div className="card">
            <div className="image">
              <img src={movie.Poster} alt={movie.Title} />
              <div className="movieDetails">
                <h3>{movie.Title}</h3>
                <h6>{movie.Year}</h6>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadFunc}
      hasMore={true}
      loader={ isLoading &&
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      <div className="movieList">{renderList}</div>
    </InfiniteScroll>
  );
};

export default MovieListing;
