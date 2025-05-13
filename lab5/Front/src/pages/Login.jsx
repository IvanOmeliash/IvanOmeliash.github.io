import { useState } from "react";
import '../index.css';
import auth from "../auth";
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider 
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();

    const HandleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            alert("Користувач ввійшов: " + userCredential.user.email)
            navigate("/")
        }
        catch (error) {
            alert("Помилка: " + error.message + "Неправильний пароль")
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            alert("Успішний вхід через Google: " + user.email);
            navigate("/");
        } catch (error) {
            alert("Помилка Google Auth: " + error.message);
        }
    };

    return(
        <>
        <div className="container-login">
        <form onSubmit={HandleLogin} className="form-login">
            <h2>Вхід до облікового запису</h2>
            
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
            
            <a href="#" className="forgot-password">Забули пароль?</a>
            
            <button className="btn-login" type="submit">Увійти</button>
            
            <div className="register-link">
            Немає облікового запису? <Link id="link-to-reg" to="/register">Зареєструватися</Link>
            </div>

            {/* Кнопка входу через Google */}
            <button 
                type="button" 
                onClick={handleGoogleLogin}
                className="btn-google"
            >
                Увійти через Google
            </button>
        </form>
        </div>
        </>
    )
}

export default Login;