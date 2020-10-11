import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Alert from '../Alert';


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData ] = useState({
        email: '',
        password:''
    });

    const { email, password } = formData; 

    const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value}); 

    const handleSubmit = e => {
        e.preventDefault();
        login(email, password);
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
                                Sign In
                            </h1>
                            <p className="lead text-white"> Sign into your account</p>
                            <form action="home.html" className="form" onSubmit={e => handleSubmit(e) }>
                                <div className="form-group">
                                    <input 
                                    type="text" 
                                    required
                                    name= 'email'
                                    value={email}
                                    onChange={e => onChange(e)} />
                                    <label>Email</label>
                                </div>
                                <div className="form-group">
                                    <input 
                                    type="password" 
                                    required
                                    name= 'password'
                                    value={password}
                                    onChange={e => onChange(e) } />
                                    <label>Password</label>
                                </div>

                                <input type="submit" value="Login" className="btn btn-primary btn-submit my-1" />
                            </form>
                            <p className="my-1 text-secondary">Don't have an Account <Link to="/register" className="text-white">Sign up</Link></p>
                        </div>    
                    </section>
                </div>
            </div>
      </Fragment>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);