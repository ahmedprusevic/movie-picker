import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../actions/profile';

const CreateProfile = ({ createProfile, history }) => {

    const [formData, setFormData] = useState({
        favourite: [],
        watched: []
    });

    const [movie, setMovie] = useState('');

    const { favourite, watched } = formData;

    const onChange = e => 
    setMovie(e.target.value); 

    const updateFavourite = (favourite) => {
        setFormData({...formData, favourite: [...favourite, movie]});
        setMovie('');
    }

    const updateWatched = (watched) => {
        setFormData({...formData, watched: [...watched, movie]});
        setMovie('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        createProfile(formData, history)
    }
    return (
        <section className="container">
        <h1 className="large text-primary"> Create Your Profile </h1>
        <p className="lead text-white"> Create and Edit profile </p>

        <form className="form" onSubmit={e => handleSubmit(e) }>
            <div className="form-group">
                <input 
                type="text" 
                name='movie'
                required 
                value={movie} 
                onChange={e => onChange(e)} />
                <label>Name a movie</label>
            </div>

            <button type='button' className="btn text-center btn-primary my-1" onClick={() => updateFavourite(favourite)}> <i className="fas fa-heart"></i> Add to favourites</button>
            <button type='button' className="btn text-center btn-primary my-1" onClick={() => updateWatched(watched)}> <i className="fas fa-tv"></i> Add to watched</button>


        </form>
        
        <div className="movies">
            <p className="lead text-white my-1">Movies that will be added to list of your favourites</p>

            <div className="chip">
                <span>Chip chip chip</span>
                <button type="button" className="chip-remove">
                </button>
              </div>

            <p className="lead text-white my-3">Movies that will be added to list of your watched movies</p>

            <div className="chip">
                <span>Chip chip chip</span>
                <button type="button" className="chip-remove">
                </button>
              </div>
        </div>
    </section>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,

}



export default connect(null, { createProfile })(withRouter(CreateProfile));
