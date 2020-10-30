import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile, deleteAcc } from "../actions/profile";
import Spinner from "./Spinner";
import Alert from "./Alert";

const Profile = ({
  getProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAcc,
}) => {
  const [movies, setMovies] = useState({
    fav: [],
    wat: [],
  });

  const [favourite, setFavourite] = useState([]);
  const [watched, setWatched] = useState([]);

  const { fav, wat } = movies;

  useEffect(() => {
    getProfile();
    if (profile !== null) {
      setMovies({
        fav: loading || !profile.favourite ? "" : profile.favourite,
        wat: loading || !profile.watched ? "" : profile.watched,
      });
    }
  }, [loading]);

  useEffect(() => {
    const getMovies = () => {
      if (fav.length > 0) {
        fav.map(async (m) => {
          try {
            const movie = await axios.get(
              `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?s=${m}&apikey=753aad9a`
            );
            if (movie.data.Response === "True") {
              setFavourite((s) => [...s, movie.data.Search[0]]);
            }
          } catch (err) {
            console.error(err);
          }
        });
      }
      if (wat.length > 0) {
        wat.map(async (m) => {
          try {
            const movie = await axios.get(
              `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?s=${m}&apikey=753aad9a`
            );
            if (movie.data.Response === "True") {
              setWatched((s) => [...s, movie.data.Search[0]]);
            }
          } catch (err) {
            console.error(err);
          }
        });
      }
    };
    getMovies();
  }, [movies]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary"> Profile Dashboard </h1>
        <p className="lead text-white">
          {" "}
          Welcome {user && user.name}, here you can manage your profile{" "}
        </p>

        {profile !== null ? (
          <Fragment>
            <Alert />
            <div className="dash-buttons">
              <Link to="/edit-profile" className="btn">
                <i className="far fa-user-circle"></i>
                Edit Profile
              </Link>
            </div>
            <h2 className="my-2 text-white"> Your favourite movies </h2>
            <table className="table text-white">
              <thead>
                <tr>
                  <th>Movie</th>
                  <th className="hide-sm">Year</th>
                  <th className="hide-sm">IMDB id</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {favourite &&
                  favourite.map((m) => (
                    <tr key={m.imdbID}>
                      <td>{m.Title}</td>
                      <td className="hide-sm">{m.Year}</td>
                      <td className="hide-sm">{m.imdbID}</td>
                      <td>
                        <Link to="/edit-profile" className="btn btn-danger">
                          Remove
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <h2 className="my-2 text-white"> Movies you watched </h2>
            <table className="table text-white">
              <thead>
                <tr>
                  <th>Movie</th>
                  <th className="hide-sm">Year</th>
                  <th className="hide-sm">IMDB id</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {watched &&
                  watched.map((m) => (
                    <tr key={m.imdbID}>
                      <td>{m.Title}</td>
                      <td className="hide-sm">{m.Year}</td>
                      <td className="hide-sm">{m.imdbID}</td>
                      <td>
                        <Link to="/edit-profile" className="btn btn-danger">
                          Remove
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Fragment>
        ) : (
          <Fragment>
            <p className="text-white my-1">
              {" "}
              You still havent created profile, tell us about your favourite
              movies and movies you watched{" "}
            </p>

            <div className="dash-buttons">
              <Link to="/create-profile" className="btn">
                <i className="far fa-user-circle"></i> Create Profile
              </Link>
            </div>
          </Fragment>
        )}

        <div className="my-2">
          <button className="btn btn-danger" onClick={() => deleteAcc()}>
            <i className="fas fa-user-times"></i> Delete my Account
          </button>
        </div>
      </section>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAcc: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile, deleteAcc })(Profile);
