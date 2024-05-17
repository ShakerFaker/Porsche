import { useState, useEffect } from "react";
import "./Orders.css";

const Orders = ({ boughtProducts, setBoughtProducts }) => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"));
  const [lastOrder, setLastOrder] = useState(null);
 /* useEffect(() => {
    const getOrders = async () => {
      const orders = await fetch("http://localhost:3000/user/getOrders", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          customerID: user._id
        })
      });

      if (orders.ok) return await orders.json();
      throw new Error(orders);
    };
    (async () => {
      const result = await getOrders();
      setOrders(result);
    })();

    console.log(orders);
  }, [lastOrder]);*/

  useEffect(() => {
    const getOrders = async () => {
      const orders = await fetch("http://localhost:3000/user/getOrders", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerID: user._id
        })
      });

      if (orders.ok) return await orders.json();
      throw new Error(orders);
    };

    (async () => {
      const result = await getOrders();
      console.log("The result is: " + result);
      setOrders(result);
    })();
  }, []);

  const makeOrder = async () => {
    const newOrder = await fetch("http://localhost:3000/user/makeOrder", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerID: user._id,
        products: boughtProducts,
      }),
    });
    if (newOrder.ok) {
      //     setOrders([]);
      return await newOrder.json();
    }
    return new Error(newOrder);
  };

  const handleConfirmOrder = async () => {
    const newOrder = await makeOrder();
    setLastOrder(newOrder);
    setBoughtProducts([]);
  };

  let i = 0;
  console.log(`${i++} ${Array.isArray(orders)}`);
  // let orders = [];
  // fetch('http://localhost:3000/user/getOrders', {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTU1OTcwNzZ9.Z0Ul5aLSz-B2Ixdlw7WLODwTtGOubCtrIN99VUFYZWM'
  //   }
  // }).then(res => res.ok ? res.json() : console.log("Failure"))
  // .then(data => orders.push(data))
  // .catch(error => console.log("HELP MEEEEEEEEE"));
  // console.log(orders.length);

  console.log(orders);
  return (
    <div className="trying">
      {localStorage.getItem("isGuest") == 'false' && orders.map((order, index) => (
          <div className="order" key={order._id}>
            <h1>Order {index + 1}</h1>
            <h3>Order by {user.Email}</h3>
            <h3>created at {order.createdAt.substring(0, 10)}</h3>
            <h3>Total price: {order.total}$</h3>
            <h3>Products</h3>
            {order.products.map((product, index) => (
              <h3>{product.Name + " " + product.Price}</h3>
            ))}
          </div>
        ))}
      {localStorage.getItem("isAdmin") !== "true" &&
        localStorage.getItem("isLogged") === "true" &&
        boughtProducts.length > 0 && (
          <div className="order">
            <h1 className="heading-text">Items</h1>
            <div className="images">
              {boughtProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="flex-container">
                    <img
                      src={product.Images[0]}
                      alt={product.Name}
                      className="img-small"
                    />
                    <p className="theProductEsm">{product.Name}</p>
                    <p className="theProductPrice">
                      ${product.Price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="green-button" onClick={handleConfirmOrder}>
              Confirm & Deliver
            </button>
          </div>
        )}
      {lastOrder && (
        <div className="order" key={lastOrder._id}>
          <h1>Successful Order</h1>
          <h3>created at {lastOrder.createdAt.substring(0, 10)}</h3>
          <h3>Total price: {lastOrder.total}$</h3>
          <div className="images">
            {lastOrder.products.map((product, index) => (
              <img
                key={index}
                src={product.Images[0]}
                alt={product.Name}
                className="img-small"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
