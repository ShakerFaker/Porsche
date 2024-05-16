import { useState, useEffect } from "react";
import "./Products.css";
import "./ProductManager.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductManager = ({
  theProduct,
  setTheProduct,
  setBoughtProducts,
  boughtProducts,
}) => {
  const navigate = useNavigate();
  console.log(theProduct.Name);

  const [newName, setNewName] = useState();

  const [editState, setEditState] = useState(false);

  const [editedProductName, setEditedProductName] = useState(theProduct.Name);
  const [editedProductPrice, setEditedProductPrice] = useState(
    theProduct.Price
  );
  const [editedProductDescription, setEditedProductDescription] = useState(
    theProduct.Description
  );
  const [editedProductStock, setEditedProductStock] = useState(
    theProduct.Stock
  );
  const [editedProductCategory, setEditedProductCategory] = useState(
    theProduct.Category
  );
  const [editedProductImages, setEditedProductImages] = useState(
    theProduct.Images
  );
  const isAdmin = localStorage.getItem("isAdmin");

  const handleEdit = () => {
    setEditState(!editState);

    fetch(`http://localhost:3000/user/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        _id: theProduct._id,
        updates: {
          Name: editedProductName,
          Price: editedProductPrice,
          Description: editedProductDescription,
          Stock: editedProductStock,
          Category: editedProductCategory,
          Images: editedProductImages,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("product created (or updated) ok");
        setTheProduct(data);
      })
      .catch((error) => {
        console.error("Error creating/updating product:", error);
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/user/products/:productId`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productId: theProduct._id,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("product deleted succesfully");
        navigate("/products");
        //setTheProduct(data);
      })
      .catch((error) => {
        console.error("Error creating/updating product:", error);
        //console.log(error);
      });
  };

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

  const handleBuy = () => {
    if (isAdmin !== "true" && localStorage.getItem("isLogged") === "true") {
      let currentProducts = boughtProducts;
      console.log("Before: " + currentProducts);
      currentProducts.push(theProduct);
      setBoughtProducts(currentProducts);
      console.log("After: " + boughtProducts);
      navigate("/products");
    } else navigate("/login");
  };

  // const BottomBand = () => {
  //   return (
  //     <div className={`bottom-band ${totalItems > 0 ? 'visible' : ''}`}>
  //       <span>{`You have ${totalItems} items in your cart`}</span>
  //       <button onClick={() => alert('Proceed to checkout')}>Checkout</button>
  //     </div>
  //   );
  // };

  const buy =
    !isAdmin && localStorage.getItem("isLogged") ? (
      <Link to="/ProductBuy" className="editProduct">
        {" "}
        <button
          className="more"
          onClick={() => {
            handleOnClick(product);
            console.log(product.Name);
          }}>
          More
        </button>
      </Link>
    ) : (
      <Link to="/login"></Link>
    );

  const edits = (
    <div>
      <div className="inputBox center">
        <div className="border">
          <div>
            <span className="text">Name :</span>
            <input
              className="input-field"
              type="Edits"
              id="editedProductName"
              placeholder="Name"
              value={editedProductName}
              onChange={(e) => setEditedProductName(e.target.value)}
            />
          </div>
          <div>
            <span className="text">Price :</span>
            <input
              className="input-field"
              type="Edits"
              placeholder="Price"
              value={editedProductPrice}
              onChange={(e) => setEditedProductPrice(e.target.value)}
            />
          </div>
          <div>
            <span className="text">Description :</span>
            <input
              className="input-field"
              type="Edits"
              placeholder="Description"
              value={editedProductDescription}
              onChange={(e) => setEditedProductDescription(e.target.value)}
            />
          </div>
          <div>
            <span className="text">Stock :</span>
            <input
              className="input-field"
              type="Edits"
              placeholder="Stock"
              value={editedProductStock}
              onChange={(e) => setEditedProductStock(e.target.value)}
            />
          </div>
          <div>
            <span className="text">Category :</span>
            <input
              className="input-field"
              type="Edits"
              placeholder="Category"
              value={editedProductCategory}
              onChange={(e) => setEditedProductCategory(e.target.value)}
            />
          </div>
          <div>
            <span className="text">Images :</span>
            <input
              className="input-field"
              type="Edits"
              placeholder="Images"
              value={editedProductImages}
              onChange={(e) => setEditedProductImages(e.target.value)}
            />
          </div>
        </div>
        <div className="submit">
          <button className="button-80" onClick={handleEdit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
  console.log(theProduct);
  return (
    <div>
      <div className="product-container">
        {
          <div key={theProduct._id} className="product-box">
            <div className="product-image-container">
              <img
                src={theProduct.Images[0]}
                alt={theProduct.Name}
                className="product-image"
              />
              <div className="product-info">
                <p className="product-name">{theProduct.Name}</p>
                <p className="product-type">Type: {theProduct.Category}</p>
                <p className="product-price">Price: {`${theProduct.Price}$`}</p>
                <p className="product-stock">Stock: {theProduct.Stock}</p>
              </div>
            </div>
            <div className="product-details">
              <p className="description-hidden">
                Description: {theProduct.Description}
              </p>
            </div>
          </div>
        }
        <div className="center">
          {isAdmin !== "true" && (
            <div className="buttons">
              <button className="button-85" onClick={handleBuy}>
                Buy
              </button>
            </div>
          )}
          {isAdmin === "true" && (
            <div className="buttons">
              <button className="button-74" onClick={handleEdit}>
                Edit
              </button>
            </div>
          )}
          {isAdmin === "true" && (
            <div className="buttons">
              <button className="button-74" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
          {isAdmin === "true" && edits}
        </div>
      </div>
    </div>
  );
};

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
