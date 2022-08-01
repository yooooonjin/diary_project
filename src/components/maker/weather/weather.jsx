import React from 'react';
import styles from './weather.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloudSun,
  faCloud,
  faUmbrella,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';

const Weather = ({ weather, onChange }) => {
  return (
    <>
      <input
        className={`${styles.input}`}
        type='radio'
        name='weather'
        id='sun'
        value='sun'
        checked={weather === 'sun'}
        onChange={onChange}
      />
      <label htmlFor='sun'>
        <FontAwesomeIcon icon={faSun} className={styles.weatherIcon} />
      </label>
      <input
        className={`${styles.input}`}
        type='radio'
        name='weather'
        id='cloudSun'
        value='cloudSun'
        checked={weather === 'cloudSun'}
        onChange={onChange}
      />
      <label htmlFor='cloudSun'>
        <FontAwesomeIcon icon={faCloudSun} className={styles.weatherIcon} />
      </label>
      <input
        className={`${styles.input}`}
        type='radio'
        name='weather'
        id='cloud'
        value='cloud'
        checked={weather === 'cloud'}
        onChange={onChange}
      />
      <label htmlFor='cloud'>
        <FontAwesomeIcon icon={faCloud} className={styles.weatherIcon} />
      </label>
      <input
        className={`${styles.input}`}
        type='radio'
        name='weather'
        id='rain'
        value='rain'
        checked={weather === 'rain'}
        onChange={onChange}
      />
      <label htmlFor='rain'>
        <FontAwesomeIcon icon={faUmbrella} className={styles.weatherIcon} />
      </label>
      <input
        className={`${styles.input}`}
        type='radio'
        name='weather'
        id='snow'
        value='snow'
        checked={weather === 'snow'}
        onChange={onChange}
      />
      <label htmlFor='snow'>
        <FontAwesomeIcon icon={faSnowflake} className={styles.weatherIcon} />
      </label>
    </>
  );
};

export default Weather;
