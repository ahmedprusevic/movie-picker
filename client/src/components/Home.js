import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { randomMovies } from '../imdbid';
import axios from 'axios';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { addToFavourites, getProfile } from '../actions/profile';
import Alert from './Alert';


const Home = ({ addToFavourites, getProfile }) => {

    const [movies, setMovies] = useState(randomMovies());
    
    const [showMovies, setShowMovies] = useState([]);

    const [formData, setFormData] = useState({
        favourite: [],
        watched: []
    });

    useEffect(() => {
        const getMovies = () => {
                movies.map(async (m) => {
                    try {
                        const movie = await axios.get(`https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?i=${m}&apikey=753aad9a`);
                        setShowMovies(s => [...s, movie.data]);
                    } catch (err) {
                        console.error(err)
                    }
                    
                })
            }
        getMovies();
    }, [movies]);

    useEffect(() => {
        getProfile();
    }, []);

    const handleClick = () => {
        setShowMovies([]);
        setMovies(randomMovies());
    }

    const addFav = (movie) => {
        setFormData({...formData, favourite: [movie.Title]});
        addToFavourites(formData); 
        setTimeout(() => {
            setFormData({
                favourite: [],
                watched: []
            });
          }, 1000);
    }

    return (
        <section className="home">
        <div className="home-top"> 
            <h1 className="large card-heading text-white">Here are some random recommendations for you</h1>
            <button className="btn btn-primary" onClick={() => handleClick()}><i className="fas fa-sync"></i> More movies</button>
            <Alert />
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
                           <button className="card-button card-button-like" onClick={()=> addFav(movie)} data-tooltip="Add to favourites"> <i className="fas fa-heart"></i></button> 
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

Home.propTypes = {
    addToFavourites: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired
}


export default connect(null, { getProfile, addToFavourites })(Home);
