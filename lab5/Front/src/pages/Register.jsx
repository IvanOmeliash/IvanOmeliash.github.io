import {useState} from "react";
import '../index.css';
import auth from "../auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const HandleSignUp = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            alert("Користувача успішно створено: " + userCredential.user.email)
            navigate("/")
        }
        catch (error) {
            alert("Помилка: " + error.message)
        }
    };

    return(
        <>
        <div className="container-login">
        <form onSubmit={HandleSignUp} className="form-login">
            <h2>Реєстрація</h2>
            
            <div className="form-group">
            <label htmlFor="email-login">Електронна пошта</label>
            <input 
                id="email-login" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Введіть вашу email адресу"
                required
            />
            </div>
            
            <div className="form-group">
            <label htmlFor="password-login">Пароль</label>
            <input 
                id="password-login" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Введіть ваш пароль"
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="password-login">Підтвердіть пароль</label>
            <input 
                id="password-login" 
                type="password" 
                placeholder="Введіть ваш пароль повторно"
                required
            />
            </div>
            
            <button className="btn-login" type="submit">Зареєструватися</button>
            
            <div className="register-link">
            Вже є аккаунт? <Link id="link-to-reg" to="/login">Увійти</Link>
            </div>
        </form>
        </div>
        </>
    )
}

export default Register;