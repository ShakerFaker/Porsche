import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Products.css"
import ProductManager from './ProductManager';

const Products = ({theProduct, setTheProduct, isLogged, isAdmin, isGuest, userId}) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(''); // State for selected filter type
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [debouncedPriceRange, setDebouncedPriceRange] = useState({ min: 0, max: 10000000 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [priceRange]);
  
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
    product.Name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())&&
    (filterType === '' || product.Category === filterType) &&
    (product.Price >= debouncedPriceRange.min && product.Price <= debouncedPriceRange.max)
  );

  const handleFilterChange = (e) => {
    setFilterType(e.target.value); 
  };

  const handlePriceChange = (e) => {
    const { value, name } = e.target;
    setPriceRange(prevState => ({
      ...prevState,
      [name]: parseInt(value)
    }));
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
      <div className="price-filter-container">
          <label htmlFor="priceScale">Price Range:</label>
          <input
            type="range"
            id="priceScale"
            name="min"
            min="0"
            max="140000"
            value={priceRange.min}
            onChange={handlePriceChange}
          />
          
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
                
                
              </div>
              
            </div>
            
            <div className="product-details">
              <p className="description-hidden">Description: {product.Description}</p>
            </div>
            <Link to="/ProductManager" className="editProduct"> <button className="more" 
                onClick={() => {
                  handleOnClick(product);
                  console.log(product.Name);
                }
              
              }>
                More</button></Link>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Products;
