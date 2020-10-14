import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateProfile = props => {
    const [formData, setFormData] = useState({
        favourite: [],
        watched: []
    });
    const { favourite, watched } = formData
    return (
        <div>
            
        </div>
    )
}

CreateProfile.propTypes = {

}

export default CreateProfile
