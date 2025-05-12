import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import auth from "../auth";
import '../index.css';

function IssuePage() {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Готівка");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userID, setUserID] = useState("guest");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        setUserID("guest");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const totalSum = storedCart.reduce((sum, item) => {
      const priceString = typeof item.price === 'string' ? item.price : item.price.toString();
      const numericPrice = parseFloat(priceString.replace(/[^\d.]/g, ""));
      return sum + numericPrice * item.count;
    }, 0);

    setTotal(totalSum.toFixed(2)); // округлення до 2 знаків
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
    if (totalCount < 1 || totalCount > 10) {
      alert("У замовленні повинно бути від 1 до 10 страв.");
      return;
    }

    if (!userID) {
      alert("Не вдалося отримати ID користувача");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: cart,
          userID: userID,
          paymentMethod,
          address,
          total: parseFloat(total)
        })        
      });

      if (!response.ok) {
        throw new Error("Помилка при надсиланні запиту");
      }

      const data = await response.json();
      alert("Замовлення успішно надіслано!");
      localStorage.removeItem("cart");
      navigate("/");
    } catch (error) {
      console.error("Помилка:", error);
      alert("Не вдалося надіслати замовлення");
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className="container">
          <div className="order-form">
            <h2>Оформлення замовлення</h2>

            <div className="form-group">
              <label htmlFor="address">Адреса доставки</label>
              <input
                id="address"
                type="text"
                placeholder="Введіть адресу"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="payment">Спосіб оплати</label>
              <select
                id="payment"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>Готівка</option>
                <option>Картка онлайн</option>
              </select>
            </div>

            <div className="total">
              <span>Загальна сума:</span>
              <span>{total} ₴</span>
            </div>

            <button
              type="submit"
              className="submit-btn"
              onClick={handleSubmit}
            >
              Підтвердити замовлення
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default IssuePage;
