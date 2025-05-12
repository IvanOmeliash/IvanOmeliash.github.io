import { useEffect, useState } from "react";
import Header from "./Header";
import '../index.css';
import IssueButton from "./Issue-btn";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      const priceString = typeof item.price === 'string' ? item.price : item.price.toString();
      const numericPrice = parseFloat(priceString.replace(/[^\d.]/g, "")); // перетворюємо ціну в число
      return acc + numericPrice * item.count;
    }, 0);
    setTotalAmount(total);
  }, [cart]);
  
  

  const handleQuantityChange = (index, operation) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];

    if (operation === "increase") {
      item.count += 1;
    } else if (operation === "decrease" && item.count > 1) {
      item.count -= 1;
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

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
                      <div className="cart-price-line">
                        <span className="cart-price">{item.price} ₴</span>
                      </div>
                      <div className="cart-quantity-controls">
                        <span>Кількість: </span>
                        <button className="cart-qty-btn" onClick={() => handleQuantityChange(index, "decrease")}>-</button>
                        <span>{item.count}</span>
                        <button className="cart-qty-btn" onClick={() => handleQuantityChange(index, "increase")}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="cart-total">
          До сплати: {totalAmount} ₴
        </div>

        <IssueButton />
      </main>
    </div>
  );
}

export default CartPage;
