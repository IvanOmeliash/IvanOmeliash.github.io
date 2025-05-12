import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../auth";

const Header = () => {
    const navigate = useNavigate();

    const handleAccountClick = async () => {
        if (auth.currentUser) {
            const confirmLogout = window.confirm("Чи ви дійсно хочете вийти з аккаунту?");
            if (confirmLogout) {
                try {
                    await signOut(auth);
                    alert("Ви успішно вийшли з аккаунту");
                    navigate("/login");
                } catch (error) {
                    console.error("Помилка при виході:", error);
                    alert("Сталася помилка при виході з аккаунту.");
                }
            }
        } else {
            navigate("/login");
        }
    };

    return (
        <header>
            <nav className="header-nav">
                <div className="logo">
                    <a href="/">
                        <img src="https://img.freepik.com/free-vector/hand-drawn-kitsune-illustration_23-2149364568.jpg?t=st=1741036214~exp=1741039814~hmac=34f52efa8aa3d20606073b9517ffe7f5c4c16971c224edeb1616acb06dc4cee2&w=900"
                            alt="Ubuyashiki Cafe" height="86px" width="86px" />
                    </a>
                </div>

                <div className="menu">
                    <div className="Menu-item">
                        <a href="/menu">Меню</a>
                    </div>

                    <div className="Cart">
                        <a href="/cart">Кошик</a>
                    </div>

                    <div className="Orders">
                        <a href="/my-offer">Мої замовлення</a>
                    </div>
                </div>

                <div className="Account">
                    <img
                        src="https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?t=st=1741192572~exp=1741196172~hmac=f2bc26fcd040f2c9eec606ba4891145366981d9329107e669b6cca85b8a113f7&w=900"
                        alt="accout-logo"
                        height="70px"
                        width="70px"
                        onClick={handleAccountClick}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </nav>
        </header>
    );
}

export default Header;
