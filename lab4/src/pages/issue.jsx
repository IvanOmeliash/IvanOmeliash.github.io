import React, { useState } from "react";
import Header from "./Header";
import '../index.css';

function IssuePage() {

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Готівка");
  const [total, setTotal] = useState(310);

  const handleSubmit = (e) => {
  e.preventDefault();
  localStorage.setItem('timerStart', Date.now());
  window.location.href = 'main-page.html';
};

  return (
    <div>
      <Header />
      <main>
        <div className="container">
          <div className="order-form">
            <h2>Оформлення замовлення</h2>

            <div className="form-group">
              <label>Адреса доставки</label>
              <input
                type="text"
                placeholder="Введіть адресу"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Спосіб оплати</label>
              <select
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
              id="startButton"
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
