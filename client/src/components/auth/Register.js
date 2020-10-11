import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../Alert';

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        password:'',
        password2: ''
    });

    const { name, email, password, password2 } = formData; 

    const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value}); 

    const handleSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password });
        }
    }
    // REDIRECT IF LOGGED IN 
    if(isAuthenticated){
        return <Redirect to="/home" />
    }
    return(
      <Fragment>
          <div className="form-container">
            <div className="dark-overlay">
                <section className="container">
                    <Alert />
                    <div className="form-background">
                        <h1 className="large text-white form-heading">
                            Sign Up
                        </h1>
                        <p className="lead text-white"> Create your Account</p>
                        <form className="form" onSubmit={e => handleSubmit(e) }>
                            <div className="form-group">
                                <input 
                                type="text" 
                                required 
                                name= 'name'
                                value={name}
                                onChange={e => onChange(e) } />
                                <label>Name</label>
                            </div>
                            <div className="form-group">
                                <input 
                                type="text" 
                                required
                                name= 'email'
                                value={email}
                                onChange={e => onChange(e) }
                                 />
                                <label>Email</label>
                            </div>
                            <div className="form-group">
                                <input 
                                type="password" 
                                required 
                                name= 'password'
                                value={password}
                                onChange={e => onChange(e) }
                                />
                                <label>Password</label>
                            </div>
                            <div className="form-group">
                                <input 
                                type="password" 
                                required
                                name= 'password2'
                                value={password2}
                                onChange={e => onChange(e) } />
                                <label>Confirm password</label>
                            </div>
        
                            <input type="submit" value="Register" className="btn btn-primary btn-submit my-1" />
                        </form>
                        <p className="my-1 text-secondary">Already have an account <Link to="/login" className="text-white">Sign In</Link></p>
                    </div>    
                </section>
            </div>
        </div>
      </Fragment>
    );
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);