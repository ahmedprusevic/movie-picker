import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getProfile } from '../actions/profile';

const EditProfile = ({ profile: {profile, loading}, createProfile, getProfile,  history }) => {

    const [formData, setFormData] = useState({
        favourite: [],
        watched: []
    });

    const [movie, setMovie] = useState('');

    useEffect(() => {
        getProfile();
        setFormData({
            favourite: loading || !profile.favourite ? '' : profile.favourite,
            watched: loading || !profile.watched ? '' : profile.watched
        })
    }, [loading]);

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
        createProfile(formData, history, true);
    }
    return (
        <section className="container">
        <h1 className="large text-primary"> Edit your profile </h1>
        <p className="lead text-white"> Here you can edit profile </p>

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

            {favourite.length > 0 && favourite.map(movie => {
                return(
                    <div className="chip" key={uuidv4()}>
                        <span>{movie}</span>
                        <button type="button" onClick={()=> setFormData({...formData, favourite: favourite.filter(fil => fil !== movie)})} className="chip-remove">
                        </button>
                    </div>
                );
            })}

            <p  className="lead text-white my-3">Movies that will be added to list of your watched movies</p>


            {watched.length > 0 && watched.map(movie => {
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

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getProfile })(withRouter(EditProfile));
