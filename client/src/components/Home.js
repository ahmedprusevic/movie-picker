import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Home = props => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const movie = await axios.get('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?i=tt3896198&apikey=753aad9a');
            console.log(movie.data);
            setMovies(m => [...m, movie.data]);
        }
        getMovies();
    }, [])
    return (
        <div>
            Home
        </div>
    )
}

Home.propTypes = {

}

export default Home
