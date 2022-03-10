import MovieListing from '../MovieListing/MovieListing';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncMovies, getAllMovies } from '../../features/movieSlice';
import React, { useEffect } from 'react';
import './Home.scss';
import Search from '../Search/Search';

const Home = () => {
    const { page } = useSelector(getAllMovies);
    const dispatch = useDispatch();

    // useEffect( () => {
    //     dispatch(fetchAsyncMovies(page));
    // },[])


    return (
      <div className='wrapper'>
        <div className="banner"></div>
        {/* <MovieListing /> */}
        <Search />
      </div>
    );
};

export default Home;