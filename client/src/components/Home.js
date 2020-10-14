import React, {useEffect, useState} from 'react';
import { randomMovies } from '../imdbid';
import PropTypes from 'prop-types';
import axios from 'axios';
import Spinner from './Spinner';


const Home = props => {

    const [movies, setMovies] = useState(randomMovies());
    
    const [showMovies, setShowMovies] = useState([]);

    

    useEffect(() => {
        const getMovies = () => {
                movies.map(async (m) => {
                    const movie = await axios.get(`https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?i=${m}&apikey=753aad9a`);
                    setShowMovies(s => [...s, movie.data]);
                })
            }
        getMovies();
    }, [movies]);

    const handleClick = () => {
        setShowMovies([]);
        setMovies(randomMovies());
    }

    return (
        <section className="home">
        <div className="home-top"> 
            <h1 className="large card-heading text-white">Here are some random recommendations for you</h1>
            <button className="btn btn-primary" onClick={() => handleClick()}><i className="fas fa-sync"></i> More movies</button>
            <div className="alert alert-success">Added to favourites</div>
        </div>
        <div className="card-layout">
            {(showMovies.length <= 17) ? <Spinner /> : showMovies.map(movie => {
                return(
                <div className="card" key={movie.imdbID}>
                <div className="card-overlay"></div>
                    <img src={movie.Poster} alt="" className="card-img" />
                    <button className="watch">Watch</button>
                    <div className="card-body text-white">
                        <h5 className="card-title">{movie.Title} ({movie.Year})</h5>
                        <span className="card-icons">
                           <button className="card-button card-button-like" data-tooltip="Add to favourites"> <i className="fas fa-heart"></i></button> 
                           <button className="card-button card-button-watch" data-tooltip="Add to watched"> <i className="fas fa-tv"></i> </button> 
                        </span>
                    </div>
                </div>
                );
            })}
        </div>
    </section>
    )
}



export default Home;
