import { useEffect, useState } from "react";
import Header from "./Header";
import '../index.css';
import IssueButton from "./Issue-btn";

function CartPage() {
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    }, []);
  
    return (
      <div>
        <Header />
        <main>
          <div className="My-cart">
            <h1>Ваш кошик</h1>
          </div>
  
          <div className="container">
            <div className="row">
              {cart.length === 0 ? (
                <p>Кошик порожній</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="col-md-3">
                    <div className="product">
                      <div className="image">
                        <img src={item.image} alt={item.name} height="200px" width="300px" />
                      </div>
                      <div className="info">
                        <h3>{item.name}</h3>
                        <ul className="rating">
                          <li>⭐</li>
                          <li>⭐</li>
                          <li>⭐</li>
                          <li>⭐</li>
                          <li>⭐</li>
                        </ul>
                        <div className="price-info">
                          <span className="price">{item.price}</span>
                          <span className="count">Кількість: {item.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
  
          <div className="oplata">До сплати:</div>
  
          <IssueButton />
        </main>
      </div>
    );
  }
  
  export default CartPage;