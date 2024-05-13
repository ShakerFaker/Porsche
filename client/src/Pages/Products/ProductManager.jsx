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

    const [editedProductName, setEditedProductName] = useState(theProduct.Name);
    const [editedProductPrice, setEditedProductPrice] = useState(theProduct.Price);
    const [editedProductDescription, setEditedProductDescription] = useState(theProduct.Description);
    const [editedProductStock, setEditedProductStock] = useState(theProduct.Stock);
    const [editedProductCategory, setEditedProductCategory] = useState(theProduct.Category);
    const [editedProductImages, setEditedProductImages] = useState(theProduct.Images);


    const handleEdit = () => { 
        setEditState(!editState);
        
         fetch(`http://localhost:3000/user/products`, {
        method: 'PUT',
        headers: {
         'Content-Type': 'application/json',
         'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTU2Mjg3MzV9.CJH7HsPQ2qfQoQYmsVccH_zlGWa6NfsuWc0WJb7iNbY"
        },
        body: JSON.stringify({
            
                _id: "663389ff0f13e865ab4caa09", // Change this to product._id
                updates:{
                    "Name": editedProductName,
                    "Price": editedProductPrice,
                    "Description": editedProductDescription,
                    "Stock": editedProductStock,
                    "Category": editedProductCategory,
                    "Images": editedProductImages
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
    
    /*
    Unused fetch product by ID
    const productId = '663389ff0f13e865ab4caa09';
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
        <div class="inputBox">
        <div class="border">
         
          <div>
          <span className='text'>Name :</span>
          <input className="input-field"
            type="Edits"
            id="editedProductName"
            placeholder="Name"
            value={editedProductName}
            onChange={(e) => setEditedProductName(e.target.value)}
      
           />
           </div>
           <div>
           <span className='text'>Price :</span>
           <input className="input-field"
            type="Edits"
            placeholder="Price"
            value={editedProductPrice}
            onChange={(e) => setEditedProductPrice(e.target.value)}
      
           />
           </div>
           <div>
           <span className='text'>Description :</span>
           <input className="input-field"
            type="Edits"
            placeholder="Description"
            value={editedProductDescription}
            onChange={(e) => setEditedProductDescription(e.target.value)}
      
           />
           </div>
           <div>
           <span className='text'>Stock :</span>
           <input className="input-field"
            type="Edits"
            placeholder="Stock"
            value={editedProductStock}
            onChange={(e) => setEditedProductStock(e.target.value)}
      
           />
           </div>
           <div>
           <span className='text'>Category :</span>
           <input className="input-field"
            type="Edits"
            placeholder="Category"
            value={editedProductCategory}
            onChange={(e) => setEditedProductCategory(e.target.value)}
      
           />
           </div>
           <div>
           <span className='text'>Images :</span>
           <input className="input-field"
            type="Edits"
            placeholder="Images"
            value={editedProductImages}
            onChange={(e) => setEditedProductImages(e.target.value)}
      
           />
           </div>
          </div>
          <button className="button-85" onClick={handleEdit}>Submit</button>
          </div>
   
    
    </div>
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
      <div className='center'>
      <div className="buttons"><button className="button-85">Buy</button></div>
      <div className="buttons"><button className="button-85" onClick={handleEdit}>Edit</button></div>
      <div className="buttons"><button className="button-85">Delete</button></div>
      </div>
         
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