import React, { useState, useEffect } from 'react';
import './Products.css'
import './ProductManager.css'

const ProductManager = ({theProduct, setTheProduct}) => {

    console.log(theProduct.Name);
    const [ name, setName ] = useState('loza');
    const [ newName, setNewName ] = useState();
    const handleClick = () =>{
        setName('Alaa');
    }
    const [ editState, setEditState ] = useState(false);
    const { Name = "", Category = "", Price = 0, Stock = 0, Images = [] } =  {};

    const [editedProduct, setEditedProduct] = useState(null);

    const handleEdit = () => { 
        setEditState(!editState);
        console.log(editedProduct);
        
         fetch(`http://localhost:3000/user/products`, {
        method: 'PUT',
        headers: {
         'Content-Type': 'application/json',
         'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTU2Mjg3MzV9.CJH7HsPQ2qfQoQYmsVccH_zlGWa6NfsuWc0WJb7iNbY"
        },
        body: JSON.stringify({
            
                _id: "663389ff0f13e865ab4caa09",
                updates:{
                    "Name": editedProduct
                }
                
                
                
           
        }),
        })
        .then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
        })
        .then((data) => {
        console.log('product created (or updated) ok');
        setTheProduct(data);
        })
        .catch((error) => {
        console.error('Error creating/updating product:', error);
        });
        

    }
    const productId = '663389ff0f13e865ab4caa09';
    /*
    useEffect(() => {
        fetch(`http://localhost:3000/user/Products/?id=${productId}`, {
            method: 'GET',
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then((data) => {
            console.log('product fetch ok');
            setTheProduct(data);
          })
          .catch((error) => {
            console.error('Error fetching products:', error);
          });
      }, []);
    */
      
      const edits = 
      <div>
          <input className="input-field"
      type="Edits"
      placeholder="Name"
      value={editedProduct}
      onChange={(e) => setEditedProduct(e.target.value)}
      
    />
    <button className="submit" onClick={handleEdit}>Submit</button>
    
    </div>
    //onChange={(e) => handleEdit(editResult)}
    return ( 
    <div>
    <div className="name">Hello {name}</div>
    <button className="changeName" onClick={handleClick}>Click Me!</button>
    <div className="products-container">
        {   
          
          <div key={theProduct._id} className="product-box">
            <div className="product-image-container">
              <img src={theProduct.Images[0]} alt={theProduct.Name} className="product-image" />
              <div className="product-info">
                <p className="product-name">{theProduct.Name}</p>
                <p className="product-type">Type: {theProduct.Category}</p>
                <p className="product-price">Price: {theProduct.Price +"$"}</p>
                <p className="product-stock">Stock: {theProduct.Stock}</p>
                
              </div>
            </div> 
            <div className="product-details">
              <p className="description-hidden">Description: {theProduct.Description}</p>
            </div>
          </div>
          
        }
      </div>
      <button className="buy">Buy</button>
      <button className="edit" onClick={handleEdit}>Edit</button>
      <button className="delete">Delete</button>
        
        
      {editState &&  edits}
    </div>
    );
}
 
export default ProductManager;
 

/*

    <input className="input-field"
      type="Price"
      placeholder="Search for products ..."
      value={editedProduct.Price}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <input className="input-field"
      type="Description"
      placeholder="Search for products ..."
      value={editedProduct.Description}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <input className="input-field"
      type="Stock"
      placeholder="Search for products ..."
      value={editedProduct.Stock}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <input className="input-field"
      type="Category"
      placeholder="Search for products ..."
      value={editedProduct.Category}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
 Price: editedProduct.Price,
            Description: editedProduct.Description,
            Stock: editedProduct.Stock,
            Category: editedProduct.Category,
*/