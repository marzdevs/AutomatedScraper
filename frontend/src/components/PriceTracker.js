import React, { useState } from 'react';
import axios from 'axios';

const PriceTracker = () => {
  const [price, setPrice] = useState(null);
  const [product, setProduct] = useState('');

  const fetchPrice = async (productType) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/price/${productType}`);
      setPrice(response.data.price);
      setProduct(productType);
    } catch (error) {
      console.error('Error fetching price', error);
      setPrice('Error fetching price');
    }
  };

  return (
    <div>
      <h1>Automated Price Tracker</h1>
      <button onClick={() => fetchPrice('graphic_card')}>Graphic Card</button>
      <button onClick={() => fetchPrice('motherboard')}>Motherboard</button>
      <button onClick={() => fetchPrice('ram')}>RAM</button>
      {price && <h2>{product} Price: {price}</h2>}
    </div>
  );
};

export default PriceTracker;
