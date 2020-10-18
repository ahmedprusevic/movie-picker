import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfile } from '../actions/profile';
import Spinner from './Spinner';
import Alert from './Alert';

const Profile = ({ getProfile, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => {
        getProfile();
    }, []);

    return (
        
        loading && profile === null ? <Spinner /> : <Fragment>
        <section className="container">
            <h1 className="large text-primary"> Profile Dashboard </h1>
            <p className="lead text-white"> Welcome { user && user.name }, here you can manage your profile </p>

            {profile !== null ? <Fragment><Alert /> </Fragment> : <Fragment>
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
