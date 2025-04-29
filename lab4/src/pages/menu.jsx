import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FaStar, FaStarHalfAlt, FaShoppingCart, FaSortUp } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../auth";
import '../index.css';

const Sort = ({ active, setActive, setCategoryFilter }) => {
  return (
    <>
      <div className="sort-window" onClick={() => setActive(false)}></div>
      <div className="Sort">
        <ul className="sort-item">
          <li onClick={() => { setCategoryFilter('Піца'); setActive(false); }}>Піца</li>
          <li onClick={() => { setCategoryFilter('Суші'); setActive(false); }}>Суші</li>
          <li onClick={() => { setCategoryFilter('Напої'); setActive(false); }}>Напої</li>
          <li onClick={() => { setCategoryFilter('Десерти'); setActive(false); }}>Десерти</li>
          <li onClick={() => { setCategoryFilter(''); setActive(false); }}>Всі страви</li>
        </ul>
      </div>
    </>
  );
};


const MenuPage = () => {
  const [sortActive, setSortActive] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [menu, setMenu] = useState([]);

  const toggleSortWindow = () => {
    setSortActive(!sortActive);
  };

  useEffect(() => {
    async function fetchMenu() {
      try {
        const querySnapshot = await getDocs(collection(db, "menu"));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenu(items);
      } catch (error) {
        console.error("Помилка при завантаженні меню:", error);
      }
    }

    fetchMenu();
  }, []);

  const addToCart = (dish) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === dish.id);

    if (existingItem) {
      existingItem.count += 1;
    } else {
      cart.push({ ...dish, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("✅ Оновлений кошик:", cart);
  };

  const displayMenu = () => {
    const filteredMenu = categoryFilter ? menu.filter(dish => dish.category === categoryFilter) : menu;

    return filteredMenu.map((dish) => (
      <div key={dish.id} className="col-md-3">
        <div className="product">
          <div className="image">
            <img src={dish.image} alt={dish.name} height="200px" width="300px" />
          </div>
          <div className="info">
            <h3>{dish.name}</h3>
            <ul className="rating">
              {dish.rating?.split("").map((star, index) =>
                star === "★" ? (
                  <li key={index}>
                    <FaStar />
                  </li>
                ) : (
                  <li key={index}>
                    <FaStarHalfAlt />
                  </li>
                )
              )}
            </ul>
            <div className="price-info">
              <span className="price">{dish.price}</span>
              <button type="button" className="button-cart" onClick={() => addToCart(dish)}>
                <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <Header />
      <main>
        <button className="sortWindow" onClick={toggleSortWindow}>
          Сортування
          <FaSortUp />
        </button>

        {sortActive && <Sort active={sortActive} setActive={setSortActive} setCategoryFilter={setCategoryFilter} />}

        <div className="container">
          <div className="row">
            {displayMenu()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MenuPage;
