const menu = [
  {
    id: 1,
    name: "Паста карбонара",
    image: "https://i.obozrevatel.com/food/recipemain/2018/12/29/item4162.jpg?size=636x424",
    rating: "★★★★☆",
    price: "180₴"
  },
  {
    id: 2,
    name: "Піца Неаполітанська",
    image: "https://firtka.if.ua/media/cache/blog_thumb/data/blog/297810/1a56fd2bf207c26a1d5b28dcd6c9cbb5.jpeg",
    rating: "★★★★☆",
    price: "365₴"
  },
  {
    id: 3,
    name: "Лазанья",
    image: "https://recepty.24tv.ua/resources/photos/recipe/1200x675_DIR/202002/46882482e83-af19-4ce9-abf9-2ac657d35c44.jpg?1580986355000",
    rating: "★★★★☆",
    price: "240₴"
  },
  {
    id: 4,
    name: "Спагетті з беконом",
    image: "https://mammaitaliana.eu/wp-content/uploads/2021/03/869152C6-0140-4F7F-93B5-77B31ECFACA0.jpeg",
    rating: "★★★★☆",
    price: "290₴"
  },
  {
    id: 5,
    name: "Тірамісу",
    image: "https://i.obozrevatel.com/food/recipemain/2019/1/29/tiramisutort.jpg?size=636x424",
    rating: "★★★★☆",
    price: "125₴"
  },
  {
    id: 6,
    name: "Різотто з грибами",
    image: "https://www.vsegdavkusno.ru/assets/images/recipes/2309/rizotto-s-gribami-low.jpg",
    rating: "★★★★☆",
    price: "320₴"
  },
];

const menuContainer = document.getElementById("menu");

for (let i = 0; i < menu.length; i++) {
  let dish = menu[i];

  let block = `
  <div class="product">
    <div class="image">
      <img src="${dish.image}" alt="${dish.name}" height="200px" width="300px">
    </div>

    <div class="info">
      <h3>${dish.name}</h3>
      <ul class="rating">
        <li><ion-icon name="star"></ion-icon></li>
        <li><ion-icon name="star"></ion-icon></li>
        <li><ion-icon name="star"></ion-icon></li>
        <li><ion-icon name="star"></ion-icon></li>
        <li><ion-icon name="star-half"></ion-icon></li>
      </ul>

       <div class="price-info">
         <span class="price">${dish.price}</span>
         <button type="button" class="button-cart" name="add-to-cart" data-id="${dish.id}"><ion-icon name="cart-outline"></ion-icon></button>
       </div>
    </div>
  </div>
  `
  menuContainer.insertAdjacentHTML("beforeend", block);
}

document.querySelectorAll(".button-cart").forEach(button => {
  button.addEventListener("click", function () {
    const dishID = parseInt(this.getAttribute("data-id"), 10);
    const selectedDish = menu.find(dish => dish.id === dishID);

    if (!selectedDish) {
      console.error("🚨 ПОМИЛКА! Страва не знайдена.");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.id === dishID);
    if (existingItem) {
      existingItem.count += 1;
    } else {
      cart.push({ ...selectedDish, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("✅ Оновлений кошик:", cart);

    this.style.backgroundColor = "#1aa33f";
  });
});

console.log(JSON.parse(localStorage.getItem("cart")));

document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart-container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Кошик порожній</p>";
    return;
  }


  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];

    let block = `
    <div class="product">
      <div class="image">
        <img src="${item.image}" alt="${item.name}" height="200px" width="300px">
      </div>

      <div class="info">
        <h3>${item.name}</h3>
        <ul class="rating">
          <li><ion-icon name="star"></ion-icon></li>
          <li><ion-icon name="star"></ion-icon></li>
          <li><ion-icon name="star"></ion-icon></li>
          <li><ion-icon name="star"></ion-icon></li>
          <li><ion-icon name="star-half"></ion-icon></li>
        </ul>

         <div class="price-info">
           <span class="price">${item.price}</span>
           <span class="count">Кількість: ${item.count}</span>  <!-- Виводимо кількість -->
         </div>
      </div>
    </div>
    `;

    cartContainer.insertAdjacentHTML("beforeend", block);
  }
});
