import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <section className="landing">
            <div className="dark-overlay">
            <div className="landing-inner">
                <h1 className="x-large">Movie Picker</h1>
                <p className="lead">Not sure which movie to watch? Register and generate random movies to watch. Also get recomendations from other people.</p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">Register</Link>
                    <Link href="/login" className="btn btn-secondary">Login</Link>
                </div>
            </div>
            </div>
    </section>
    );
}

export default Landing;