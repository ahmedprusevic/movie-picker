import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        password:'',
        password2: ''
    });

    const { name, email, password, password2 } = formData; 

    const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value}); 

    const handleSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            console.log('Passwords do not match');
        } else {
            console.log('Success');
        }
    }
    return(
      <Fragment>
          <div className="form-container">
            <div className="dark-overlay">
                <section className="container">
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

export default Register;