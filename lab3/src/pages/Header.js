import React from "react"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="header-nav">
                <div className="logo">
                    <Link to="/">
                        <img src="https://img.freepik.com/free-vector/hand-drawn-kitsune-illustration_23-2149364568.jpg?t=st=1741036214~exp=1741039814~hmac=34f52efa8aa3d20606073b9517ffe7f5c4c16971c224edeb1616acb06dc4cee2&w=900"
                            alt="Ubuyashiki Cafe" height="86px" width="86px" />
                    </Link>
                </div>
                <div className="menu">
                    <div className="Menu-item">
                        <Link to="/menu">Меню</Link>
                    </div>

                    <div className="Cart">
                        <Link to="/cart">Кошик</Link>
                    </div>

                    <div className="Orders">
                        <Link to="/my-offer">Мої замовлення</Link>
                    </div>

                </div>

                <div className="Account">
                    <a href="#">
                        <img src="https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?t=st=1741192572~exp=1741196172~hmac=f2bc26fcd040f2c9eec606ba4891145366981d9329107e669b6cca85b8a113f7&w=900" alt="accout-logo"
                            height="70px" width="70px" />
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Header;