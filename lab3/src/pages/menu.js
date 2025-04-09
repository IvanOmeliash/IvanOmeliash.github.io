import { useState } from "react";
import Header from "./Header";
import { FaStar, FaStarHalfAlt, FaShoppingCart, FaSortUp } from "react-icons/fa";
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

  const toggleSortWindow = () => {
    setSortActive(!sortActive);
  };

  const [menu, setMenu] = useState([
    {
      id: 1,
      name: "Паста карбонара",
      image: "https://i.obozrevatel.com/food/recipemain/2018/12/29/item4162.jpg?size=636x424",
      rating: "★★★★☆",
      price: "180₴",
      category: "Паста",
    },
    {
      id: 2,
      name: "Піца Неаполітанська",
      image: "https://firtka.if.ua/media/cache/blog_thumb/data/blog/297810/1a56fd2bf207c26a1d5b28dcd6c9cbb5.jpeg",
      rating: "★★★★☆",
      price: "365₴",
      category: "Піца",
    },
    {
      id: 3,
      name: "Лазанья",
      image: "https://recepty.24tv.ua/resources/photos/recipe/1200x675_DIR/202002/46882482e83-af19-4ce9-abf9-2ac657d35c44.jpg?1580986355000",
      rating: "★★★★☆",
      price: "240₴",
      category: "Паста",
    },
    {
      id: 4,
      name: "Спагетті з беконом",
      image: "https://mammaitaliana.eu/wp-content/uploads/2021/03/869152C6-0140-4F7F-93B5-77B31ECFACA0.jpeg",
      rating: "★★★★☆",
      price: "290₴",
      category: "Паста",
    },
    {
      id: 5,
      name: "Тірамісу",
      image: "https://i.obozrevatel.com/food/recipemain/2019/1/29/tiramisutort.jpg?size=636x424",
      rating: "★★★★★",
      price: "125₴",
      category: "Десерти",
    },
    {
      id: 6,
      name: "Різотто з грибами",
      image: "https://www.vsegdavkusno.ru/assets/images/recipes/2309/rizotto-s-gribami-low.jpg",
      rating: "★★★★☆",
      price: "320₴",
      category: "Рис",
    },
    {id: 7,
      name: "Лимонад",
      image: "https://img.freepik.com/free-photo/front-view-lemonade-wooden-serving-board-lemon-slices-potted-plant-brown-surface_140725-103295.jpg?t=st=1744093737~exp=1744097337~hmac=0703910fe1e245ffda767fdb26cb81d6fafe749f0b88556200c8d216717a186c&w=360",
      rating: "★★★★☆",
      price: "70₴",
      category: "Напої",
    },
    {id: 8,
      name: "Піца чотири сири",
      image: "https://img.freepik.com/free-photo/pizza-four-cheese-table_140725-5392.jpg?t=st=1744093689~exp=1744097289~hmac=1b9607b004597f608d9aa90855acd304f1daba6e463485d9eac0cb487cf5ac47&w=740",
      rating: "★★★★★",
      price: "220₴",
      category: "Піца",
    },
    {id: 9,
      name: "Рол Філадельфія",
      image: "https://img.freepik.com/free-photo/sushi-rolls-with-cream-cheese-grey-background_114579-34486.jpg?t=st=1744093836~exp=1744097436~hmac=27ccd2079e52db32c90ff1fe862f5de0af7fc9290e6110426b2705dd717723a7&w=1060",
      rating: "★★★★☆",
      price: "390₴",
      category: "Суші",
    },
    {id: 10,
      name: "Рол Каліфорнія",
      image: "https://img.freepik.com/free-photo/sushi-rolls-with-sesame-seeds-served-with-sauce-wasabi_141793-995.jpg?t=st=1744093878~exp=1744097478~hmac=9bfacdb1c1e30e0b0f164b0896eae9d4372a5592438eac29008f4957aafc97eb&w=740",
      rating: "★★★★★",
      price: "410₴",
      category: "Суші",
    },
  ]);

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
      <div className="col-md-3">
      <div key={dish.id} className="product">
        <div className="image">
          <img src={dish.image} alt={dish.name} height="200px" width="300px" />
        </div>
        <div className="info">
          <h3>{dish.name}</h3>
          <ul className="rating">
            {dish.rating.split("").map((star, index) =>
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
