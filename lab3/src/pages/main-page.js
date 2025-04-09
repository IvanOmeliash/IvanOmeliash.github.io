import React from "react"
import Header from "./Header";
import Footer from "./Footer";

function startTimer(durationInSeconds) {
    let timer = durationInSeconds, minutes, seconds;
    const interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      document.getElementById('timerDisplay').textContent = minutes + ":" + seconds;

      document.getElementById('timerDisplay').style.display = 'block';

      if (--timer < 0) {
        clearInterval(interval);
        document.getElementById('timerDisplay').style.display = 'none';
      }
    }, 1000);
  }

  const timerStart = localStorage.getItem('timerStart');
  if (timerStart) {
    const elapsedTime = Math.floor((Date.now() - timerStart) / 1000);
    const remainingTime = 2700 - elapsedTime;

    if (remainingTime > 0) {
      startTimer(remainingTime);
    } else {
      localStorage.removeItem('timerStart');
    }
  }

const Overlay = () => {
    return (
        <><Header /><div className="overlay">
            <div id="timerDisplay">00:00</div>
        </div></>
    )
}

const Main = () => {
    return (<main className="container">
        <section className="hero">
            <div className="hero-overlay">
                <h1>Смачна їжа прямо до ваших дверей</h1>
                <p>Широкий вибір страв від найкращих ресторанів вашого міста з швидкою доставкою</p>
                <form className="search-form">
                    <input type="text" placeholder="Введіть вашу адресу"/>
                    <button type="submit">Замовити</button>
                </form>
            </div>
        </section>

        <section className="categories">
            <h2>Популярні категорії</h2>
            <div className="categories-grid">
                <div className="category-item">
                    <div className="category-img">
                        <img src="https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?t=st=1742328969~exp=1742332569~hmac=a8dfd0e8509fa7aed3be44907a578dc421592405e92db6566fc56313bc140c1e&w=826" alt="Піца"/>
                    </div>
                    <h3>Піца</h3>
                </div>
                <div className="category-item">
                    <div className="category-img">
                        <img src="https://img.freepik.com/free-photo/close-up-shot-stacked-up-sushi-rolls_23-2148259188.jpg?t=st=1742329080~exp=1742332680~hmac=6c532cde0fd6eca698e97113865970b7db34cc047f97f5963a6bc86783b84f00&w=360" alt="Суші"/>
                    </div>
                    <h3>Суші</h3>
                </div>
                <div className="category-item">
                    <div className="category-img">
                        <img src="https://img.freepik.com/free-photo/delicious-burger-studio_23-2151846493.jpg?t=st=1742329114~exp=1742332714~hmac=48e4094f57dabab14f88e813975fd9255c35636ba7be197fb44ed03e5459a290&w=740" alt="Бургери"/>
                    </div>
                    <h3>Бургери</h3>
                </div>
                <div className="category-item">
                    <div className="category-img">
                        <img src="https://img.freepik.com/free-photo/dessert-table_181624-10310.jpg?t=st=1742329186~exp=1742332786~hmac=3565bba791dbd3c3e921e68d7e1d2e6eb17f6935ca531822e9eb250c2176ca89&w=740" alt="Десерти"/>
                    </div>
                    <h3>Десерти</h3>
                </div>
                <div className="category-item">
                    <div className="category-img">
                        <img src="https://img.freepik.com/free-photo/view-tasty-food-assortment_23-2148859562.jpg?t=st=1741868351~exp=1741871951~hmac=c1feb760a4991def976aedde5648791f4be0991aca0c5f9266bfddf4b4bcf1bb&w=1380" alt="Українська"/>
                    </div>
                    <h3>Українська</h3>
                </div>
                <div className="category-item">
                    <div className="category-img">
                        <img src="https://img.freepik.com/free-photo/tuna-salmon-traditional-japanese-cuisine_1203-4281.jpg?t=st=1742329229~exp=1742332829~hmac=bc583dd26f5909e1ae64a51dc32ba4a142348727a43c6d1e1f49d3d5075f070e&w=360" alt="Азійська"/>
                    </div>
                    <h3>Азійська</h3>
                </div>
            </div>
        </section>


        <section className="restaurants">
            <div className="section-header">
                <h2>Популярні ресторани</h2>
                <a href="#" className="view-all">Дивитись усі</a>
            </div>
            <div className="restaurants-grid">

                <div claclassNamess="restaurant-card">
                    <div className="restaurant-img">
                        <img src="https://img.freepik.com/free-vector/pizza-cartoon-set_1284-11714.jpg?t=st=1742329296~exp=1742332896~hmac=dd6a20106d2b810ea8e741144fc9d0ecc6197807655ac76b75a51f07b6644649&w=740" alt="Ресторан 1"/>
                    </div>
                    <div className="restaurant-info">
                        <div className="restaurant-header">
                            <h3>Піца Мрія</h3>
                            <span className="delivery-time">Час доставки: 30 хв</span>
                        </div>
                        <div class="rating">
                            <span className="stars">★★★★☆</span>
                            <span className="rating-count">4.5 (200+)</span>
                        </div>
                        <p className="cuisine">Піца, Італійська</p>
                        <p className="min-order">Мінімальне замовлення: 200 грн</p>
                    </div>
                </div>

                <div className="restaurant-card">
                    <div className="restaurant-img">
                        <img src="https://img.freepik.com/free-vector/sushi-cook-concept-illustration_114360-3036.jpg?t=st=1741868529~exp=1741872129~hmac=08f0eeb077b9511f7363f41618cc01d1b15addcff1619bbd2496e728df7d05b5&w=740" alt="Ресторан 2"/>
                    </div>
                    <div className="restaurant-info">
                        <div className="restaurant-header">
                            <h3>Суші Майстер</h3>
                            <span className="delivery-time">Час доставки: 45 хв</span>
                        </div>
                        <div className="rating">
                            <span className="stars">★★★★★</span>
                            <span className="rating-count">4.8 (350+)</span>
                        </div>
                        <p className="cuisine">Суші, Японська</p>
                        <p className="min-order">Мінімальне замовлення: 300 грн</p>
                    </div>
                </div>

                <div className="restaurant-card">
                    <div className="restaurant-img">
                        <img src="https://img.freepik.com/free-photo/traditional-ukrainian-russian-borscht-red-soup-bowl-top-view_2829-11970.jpg?t=st=1741868625~exp=1741872225~hmac=f4f9bce991902f4d70d9797b8c894faa05ae8eb007fa69da32ca6bf1b171ed4d&w=1380" alt="Ресторан 3"/>
                    </div>
                    <div className="restaurant-info">
                        <div className="restaurant-header">
                            <h3>Борщ і Вареники</h3>
                            <span className="delivery-time">Час доставки: 40 хв</span>
                        </div>
                        <div className="rating">
                            <span className="stars">★★★★☆</span>
                            <span className="rating-count">4.6 (180+)</span>
                        </div>
                        <p className="cuisine">Українська, Домашня</p>
                        <p className="min-order">Мінімальне замовлення: 250 грн</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="offers">
            <h2>Спеціальні пропозиції</h2>
            <div className="offers-grid">
                <div className="offer-card offer-orange">
                    <div className="offer-img">
                        <img src="https://img.freepik.com/free-psd/sparkling-25th-anniversary-celebration_632498-25980.jpg?t=st=1741868682~exp=1741872282~hmac=7072aa85f303ecc15a767ce7233e769eb33ccc38c499f29e24d255dda3a40d78&w=740" alt="Пропозиція 1"/>
                    </div>
                    <div className="offer-info">
                        <h3>Знижка 25% на перше замовлення</h3>
                        <p>Використайте код: ПЕРШЕ25</p>
                        <button className="btn btn-orange">Замовити зараз</button>
                    </div>
                </div>
                <div className="offer-card offer-blue">
                    <div className="offer-img">
                        <img src="https://img.freepik.com/free-vector/delivery-logo-companies_23-2147873005.jpg?t=st=1741869164~exp=1741872764~hmac=e443ff601f33d8e8ab315049c880b5f43f10e545037c8b2ebd7dcc7f34a36e29&w=740" alt="Пропозиція 2"/>
                    </div>
                    <div className="offer-info">
                        <h3>Безкоштовна доставка від 500 грн</h3>
                        <p>Для всіх ресторанів у вашому районі</p>
                        <button className="btn btn-blue">Дізнатися більше</button>
                    </div>
                </div>
            </div>
        </section>

        <section className="how-it-works">
            <h2>Як це працює</h2>
            <div className="steps-grid">
                <div className="step">
                    <div className="step-number">1</div>
                    <h3>Виберіть ресторан</h3>
                    <p>Перегляньте меню доступних ресторанів у вашому районі</p>
                </div>
                <div className="step">
                    <div className="step-number">2</div>
                    <h3>Оформіть замовлення</h3>
                    <p>Додайте свої улюблені страви в кошик та оформіть замовлення</p>
                </div>
                <div className="step">
                    <div className="step-number">3</div>
                    <h3>Отримайте доставку</h3>
                    <p>Ми доставимо ваше замовлення швидко та гаряче прямо до ваших дверей</p>
                </div>
            </div>
        </section>
    </main>)
}

const MainPage = () => {
    return(
        <><Header />
        <Overlay />
        <Main />
        <Footer />
        </>
    )
}

export default MainPage;