import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncMovies, getAllMovies, setType } from '../../features/movieSlice';
import './Search.scss';
import { useNavigate } from 'react-router-dom';

const movie_types = [
    'movie', 'series', 'episode'
]

const Search = () => {
    const {page} = useSelector(getAllMovies);
    const [searchText, setSearchText] = useState('');
    const [type, setMovieType] = useState(movie_types[0]);
    const dispatch = useDispatch();
    const history = useNavigate()

    const onSearch = (event) => {
        setSearchText(event.target.value);
        // dispatch(setSearchText( event.target.value))
    }

    const onTypeChange = (e) => {
        setMovieType(e.target.value);
        // dispatch(setType({type}));
    }

    const onClick = (e) => {
        if(e?.type === 'click' || e?.keyCode === 13) {
            history(`/movies?search=${searchText}&type=${type}`)
        }
        // history.push('/movies');
        // history('/movies')
        
    }
    return (
        <div className='search-wrapper'>
            <div className='input-wrapper'>
                <select value={type} onChange={(e) => onTypeChange(e)}>
                {
                    movie_types.map(type => <option key={type}>{type}</option>)
                }
                </select>
                <input type="text" value={searchText} onChange={(event) => onSearch(event)} onKeyUp={(e) => onClick(e)} />
                <i className='fa fa-search' onClick={(e) => onClick(e)} />
            </div>
        </div>
    );
};

export default Search;