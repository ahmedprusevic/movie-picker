import React, { Fragment } from 'react';
import loading from '../img/loading.gif';

const Spinner = () => (
    <Fragment>
        <img
        src={loading}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
        />
    </Fragment>
);

export default Spinner;