import React, { useState } from 'react';
import axios from 'axios';

function Main() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (productType) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${productType}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="Main">
      <h1>Amazon Product Tracker</h1>
      <button onClick={() => fetchProducts('graphic_cards')}>Fetch Graphic Cards</button>
      <button onClick={() => fetchProducts('motherboards')}>Fetch Motherboards</button>
      <button onClick={() => fetchProducts('ram')}>Fetch RAM</button>

      {products.length > 0 && (
        <div className="product-list">
          {products.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.image_url} alt={product.title} />
              <div>
                <h2>{product.title}</h2>
                <p>Price: {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;
