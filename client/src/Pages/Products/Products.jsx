import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Products.css"
import ProductManager from './ProductManager';

const Products = ({theProduct, setTheProduct}) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(''); // State for selected filter type

  useEffect(() => {
    fetch('http://localhost:3000/user/Products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === '' || product.Category === filterType) // Apply filter based on selected type
  );

  const handleFilterChange = (e) => {
    setFilterType(e.target.value); // Update filter type when dropdown value changes
  };

  const handleOnClick = (product) =>{
    setTheProduct(product);
    console.log(product.Name);
  }

  return (
    <div>
      <div className="search-filter-container">
        <input className="search-bar"
          type="text"
          placeholder="Search for products ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select id="type-filter" value={filterType} onChange={handleFilterChange} className="filter-dropdown">
          <option value="">All</option>
          <option value="Apparel">Apparel</option>
          <option value="Cars">Cars</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      <div className="products-container">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-box">
            <div className="product-image-container">
              <img src={product.Images[0]} alt={product.Name} className="product-image" />
              <div className="product-info">
                <p className="product-name">{product.Name}</p>
                <p className="product-type">Type: {product.Category}</p>
                <p className="product-price">Price: {product.Price +"$"}</p>
                <p className="product-stock">Stock: {product.Stock}</p>
                
                <Link to="/ProductManager" className="editProduct"> <button className="more" 
                onClick={() => {
                  handleOnClick(product);
                  console.log(product.Name);
                }
              
              }>
                More</button></Link>
              </div>
            </div>
            <div className="product-details">
              <p className="description-hidden">Description: {product.Description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
