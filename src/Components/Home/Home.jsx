import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './home.module.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://api.api-ninjas.com/v1/nutrition?query=${searchTerm}`;
      const apiKey = 'VQl8zriVrEFuIv2nCC9l4w==7TXUS4fXli0HN6zs';

      const headers = {
        'x-api-key': apiKey,
      };

      try {
        if (searchTerm) {
          const response = await axios.get(apiUrl, { headers });
          setData(response.data);
        } else {
          setData(null);
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className={`container pt-5 ${styles.container}`}>
      <h5 className='text-start'>Please enter ingredient name</h5>
      <input
        className='form-control w-25'
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className='row mt-5'>
          <div className='col-3 '>
            {data.map((item, index) => (
              <div className="card mb-3 text-start" key={index}>
                <h5 className="card-header">
                  {item.name ? item.name.toUpperCase() : ''}
                </h5>
                <div className="card-body">
                  <p className="card-text">Calories: {item.calories} kcal</p>
                  <p className="card-text">Protein: {item.protein_g} gm</p>
                  <p className="card-text">Fat: {item.fat_total_g} gm</p>
                  <p className="card-text">
                    Carbohydrates: {item.carbohydrates_total_g} gm
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
