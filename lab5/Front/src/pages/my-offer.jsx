import { useEffect, useState } from "react";
import Header from "./Header";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../auth";
import '../index.css';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const response = await fetch(`http://localhost:5000/orders?userID=${user.uid}`);
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error("Помилка при завантаженні замовлень: ", error);
        }
      } else {
        console.log("Користувач не авторизований");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Функція для обчислення загальної суми замовлення
  const calculateOrderTotal = (items) => {
    return items.reduce((sum, item) => {
      const numericPrice = parseFloat(
        typeof item.price === "string" ? item.price.replace(/[^\d.]/g, "") : item.price
      );
      return sum + numericPrice * item.count;
    }, 0).toFixed(2);
  };

  return (
    <div>
      <Header />
      <main>
        <div className="container">
          <h2>Мої замовлення</h2>
          {loading ? (
            <p>Завантаження...</p>
          ) : orders.length === 0 ? (
            <p>У вас ще немає замовлень.</p>
          ) : (
            <div className="row">
              {orders.map((order, index) => (
                <div key={index} className="col-md-12 mb-4">
                  <div className="order-block">
                    <h4>Замовлення #{index + 1}</h4>
                    <p><strong>Адреса:</strong> {order.address}</p>
                    <p><strong>Сума:</strong> {calculateOrderTotal(order.items)} ₴</p>
                    <p><strong>Оплата:</strong> {order.paymentMethod}</p>
                    <div className="order-items row">
                      {order.items.map((item, i) => (
                        <div key={i} className="col-md-3">
                          <div className="product-cart">
                            <img src={item.image} alt={item.name} width="100%" />
                            <h5>{item.name}</h5>
                            <p>Ціна: {parseFloat(item.price).toFixed(2)} ₴</p>
                            <p>Кількість: {item.count}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyOrders;
