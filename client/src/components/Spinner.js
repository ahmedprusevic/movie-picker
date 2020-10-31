import React, { Fragment } from 'react';
import loading from '../img/loading.gif';

const Spinner = () => (
    <Fragment>
        <img
        className='my-4'
        src={loading}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
        />
    </Fragment>
);

export default Spinner;