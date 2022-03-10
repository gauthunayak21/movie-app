import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncMovieDetail, getSelectedMovie, removeSelectedMovie } from '../../features/movieSlice';
import './MovieDetail.scss';

const MovieDetail = () => {
    const { imdbId } = useParams('imdbId');

    const response = useSelector(getSelectedMovie);
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(fetchAsyncMovieDetail(imdbId))
        return () => {
            dispatch(removeSelectedMovie())
        }
    }, [imdbId, dispatch])

    return (
        <div className='movieDetail'>
            {Object.keys(response).length ? 
                <>
                <div className='detail'>
                    <h1>{response.Title}</h1>
                    <div className='sub-detail'>
                        <span>IMDB Rating <i className='fa fa-star'></i> : {response.imdbRating}</span>
                        <span>IMDB Votes <i className='fa fa-thumbs-up'></i> : {response.imdbVotes}</span>
                        <span>Runtime <i className='fa fa-film'></i> : {response.Runtime}</span>
                        <span>Year<i className='fa fa-calendar-o'></i> : {response.Year}</span>
                    </div>
                    <p>{response.Plot}</p>
                    <div className='summary'>
                        <div className='title'>Director</div>
                        <div>{response.Director}</div>
                    </div>
                    <div className='summary'>
                        <div className='title'>Actors</div>
                        <div>{response.Actors}</div>
                    </div>
                    <div className='summary'>
                        <div className='title'>Genre</div>
                        <div>{response.Genre}</div>
                    </div>
                    <div className='summary'>
                        <div className='title'>Language</div>
                        <div>{response.Language}</div>
                    </div>
                    <div className='summary'>
                        <div className='title'>Awards</div>
                        <div>{response.Awards}</div>
                    </div>
                </div>
                <div className='image'>
                    <img src={response.Poster} alt={response.Title} />
                </div>
                </>
            :
                <div className='Loading'>Loading...</div>
            }
        </div>
    );
};

export default MovieDetail;