import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
    const [formData, setFormData ] = useState({
        email: '',
        password:''
    });

    const { email, password } = formData; 

    const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value}); 

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Success');
    }
    return(
      <Fragment>
            <div className="form-container">
                <div className="dark-overlay">
                    <section className="container">
                        <div className="alert alert-danger">Invalid Credentials</div>
                        <div className="form-background">
                            <h1 className="large text-white form-heading">
                                Sign In
                            </h1>
                            <p className="lead text-white"> Sign into your account</p>
                            <form action="home.html" className="form">
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


export default Login;