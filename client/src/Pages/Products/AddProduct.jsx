import { useState, useEffect, useRef } from "react";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [nameValue, setNameValue] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [priceValue, setPriceValue] = useState("");
  const [priceFocused, setPriceFocused] = useState(false);
  const [stockValue, setStockValue] = useState("");
  const [stockFocused, setStockFocused] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryFocused, setCategoryFocused] = useState(false);
  const [imgValue, setImgValue] = useState("");
  const [imgFocused, setImgFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:3000/user/products",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: {
        Name: nameValue,
        Price: priceValue,
        Description: descriptionValue,
        Stock: stockValue,
        Category: categoryValue,
        Images: [imgValue],
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <p className="catchy-text">ADD A NEW PRODUCT</p>
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-container">
          <label
            className={`input-label ${
              nameFocused || nameValue ? "focused" : ""
            }`}
          >
            Product Name
          </label>
          <input
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label
            className={`input-label ${
              priceFocused || priceValue ? "focused" : ""
            }`}
          >
            Price
          </label>
          <input
            onFocus={() => setPriceFocused(true)}
            onBlur={() => setPriceFocused(false)}
            onChange={(e) => setPriceValue(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label
            className={`input-label ${
              descriptionFocused || descriptionValue ? "focused" : ""
            }`}
          >
            Description
          </label>
          <input
            onFocus={() => setDescriptionFocused(true)}
            onBlur={() => setDescriptionFocused(false)}
            onChange={(e) => setDescriptionValue(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label
            className={`input-label ${
              stockFocused || stockValue ? "focused" : ""
            }`}
          >
            Stock
          </label>
          <input
            onFocus={() => setStockFocused(true)}
            onBlur={() => setStockFocused(false)}
            onChange={(e) => setStockValue(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label
            className={`input-label ${
              categoryFocused || categoryValue ? "focused" : ""
            }`}
          >
            Category
          </label>
          <input
            onFocus={() => setCategoryFocused(true)}
            onBlur={() => setCategoryFocused(false)}
            onChange={(e) => setCategoryValue(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label
            className={`input-label ${imgFocused || imgValue ? "focused" : ""}`}
          >
            Picture URL
          </label>
          <input
            onFocus={() => setImgFocused(true)}
            onBlur={() => setImgFocused(false)}
            onChange={(e) => setImgValue(e.target.value)}
          />
        </div>
        <p className="register-prompt">
          Go back to products? <Link to="/products">Products</Link>
        </p>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
