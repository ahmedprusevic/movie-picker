import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Home = props => {

    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const getMovies = async () => {
                let count = 0;
                while(count < 5){
                const firstNum = Math.floor(Math.random() * 4);
                const restNums = Math.floor(Math.random() * 1000000);
                const movie = await axios.get(`https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?i=tt${firstNum}${restNums}&apikey=753aad9a`);
                console.log(movie.data);
                setMovies(m => [...m, movie]);
                count += 1;
            }
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
