import { useEffect, useState } from "react";
import Header from "./Header";
import '../index.css';

function MyOrders() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  return (
    <div>
      <Header />

      <main>
        <div className="container">
          <div className="row">
            {cart.length === 0 ? (
              <p>Кошик порожній</p>
            ) : (
              cart.map((item) => (
                <div className="col-md-3" key={item.id}>
                  <div className="product">
                    <div className="image">
                      <img src={item.image} alt={item.name} height="200px" width="300px" />
                    </div>
                    <div className="info">
                      <h3>{item.name}</h3>
                      <ul className="rating">
                        <li><ion-icon name="star"></ion-icon></li>
                        <li><ion-icon name="star"></ion-icon></li>
                        <li><ion-icon name="star"></ion-icon></li>
                        <li><ion-icon name="star"></ion-icon></li>
                        <li><ion-icon name="star-half"></ion-icon></li>
                      </ul>
                      <div className="price-info">
                        <span className="price">{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyOrders;