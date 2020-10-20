import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfile } from '../actions/profile';
import Spinner from './Spinner';
import Alert from './Alert';

const Profile = ({ getProfile, auth: { user }, profile: { profile, loading } }) => {

    const [movies, setMovies] = useState({
        fav: [],
        wat: []
    });

    const [showMovies, setShowMovies] = useState({
        favourite: [],
        watched: []
    });

    const { fav, wat } = movies;

    const { favourite, watched } = showMovies;

    useEffect(() => {
        getProfile();
        setMovies({
            fav: loading || !profile.favourite ? '' : profile.favourite,
            wat: loading || !profile.watched ? '' : profile.watched
        });
    }, [loading]);

    useEffect(() => {
        const getMovies =  () => {
            const arr1 = [];
            const arr2 = [];
            if(fav.length > 0) {
            fav.map(async (m) => {
                try {
                const movie = await axios.get(`https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?s=${m}&apikey=753aad9a`);
                console.log(movie.data.Search[0]);
                arr1.push(movie.data.Search[0]);
                } catch(err) {
                    console.error(err);
                    }
                });
             }
             if(wat.length > 0) {
                wat.map(async (m) => {
                    try {
                    const movie = await axios.get(`https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?s=${m}&apikey=753aad9a`);
                    console.log(movie.data.Search[0]);
                    arr2.push(movie.data.Search[0]);
                    } catch(err) {
                        console.error(err);
                        }
                    });
                 }
            setShowMovies({...showMovies, favourite: arr1, watched: arr2});
        }
        getMovies();
    }, [movies])

    return (
        loading && profile === null ? <Spinner /> : <Fragment>
        <section className="container">
            <h1 className="large text-primary"> Profile Dashboard </h1>
            <p className="lead text-white"> Welcome { user && user.name }, here you can manage your profile </p>

            {profile !== null ? <Fragment>
                <Alert /> 
                
                <h2 className="my-2 text-white"> Your favourite movies </h2>
                    <table className="table text-white">
                        <thead>
                            <tr>
                                <th>Movie</th>
                                <th className="hide-sm">Year</th>
                                <th className="hide-sm">IMDB Rating</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Guardians of the Galaxy Vol. 2</td>  
                            <td className="hide-sm">2017</td>  
                            <td className="hide-sm">7.6</td>  
                            <td>
                                <button className="btn btn-danger">Remove</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Submerged Queer Spaces</td>  
                            <td className="hide-sm">2012</td>  
                            <td className="hide-sm">N/A</td>  
                            <td>
                                <button className="btn btn-danger">Remove</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </Fragment> : <Fragment>
                <p className='text-white my-1'> You still havent created profile, tell us about your favourite movies and movies you watched </p>

                <div className="dash-buttons">
                <Link to="/create-profile" className="btn">
                    <i className="far fa-user-circle"></i> Create Profile
                </Link>
            </div>
                </Fragment>}
            

            

            <div className="my-2">
                <button className="btn btn-danger">
                    <i className="fas fa-user-times"></i> Delete my Account
                </button>
            </div>
    </section>
        </Fragment>
    );
}

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfile })(Profile);
