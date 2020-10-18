import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
        if(movie !== ''){
        setFormData({...formData, favourite: [...favourite, movie]});
        setMovie('');
        }
    }

    const updateWatched = (watched) => {
        if(movie !== ''){
        setFormData({...formData, watched: [...watched, movie]});
        setMovie(''); }
    }

    const handleSubmit = e => {
        createProfile(formData, history);
    }
    return (
        <section className="container">
        <h1 className="large text-primary"> Create Your Profile </h1>
        <p className="lead text-white"> Create and Edit profile </p>

        <form className="form" >
            <div className="form-group">
                <input 
                type="text" 
                name='movie'
                required 
                value={movie} 
                onChange={e => onChange(e)} />
                <label>Name a movie</label>
            </div>
        </form>

        <button type='button' className="btn text-center btn-primary my-1" onClick={() => updateFavourite(favourite)}> <i className="fas fa-heart"></i> Add to favourites</button>
        <button type='button' className="btn text-center btn-primary my-1" onClick={() => updateWatched(watched)}> <i className="fas fa-tv"></i> Add to watched</button>
        <button onClick={e => handleSubmit(e)} className="btn text-center btn-primary my-1">Save Changes</button>

        


        <div className="movies">
            <p className="lead text-white my-1">Movies that will be added to list of your favourites</p>

            {favourite.map(movie => {
                return(
                    <div className="chip" key={uuidv4()}>
                        <span>{movie}</span>
                        <button type="button" onClick={()=> setFormData({...formData, favourite: favourite.filter(fil => fil !== movie)})} className="chip-remove">
                        </button>
                    </div>
                );
            })}

            <p  className="lead text-white my-3">Movies that will be added to list of your watched movies</p>


            {watched.map(movie => {
                return(
                    <div className="chip" key={uuidv4()}>
                        <span>{movie}</span>
                        <button type="button" className="chip-remove" onClick={()=> setFormData({...formData, watched: watched.filter(fil => fil !== movie)})}>
                        </button>
                    </div>
                );
            })}
        </div>
    </section>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,

}



export default connect(null, { createProfile })(withRouter(CreateProfile));
