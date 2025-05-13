import { useState } from "react";
import '../index.css';
import auth from "../auth";
import { 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider 
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();

    const HandleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Паролі не співпадають!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            alert("Користувача успішно створено: " + userCredential.user.email)
            navigate("/")
        }
        catch (error) {
            alert("Помилка: " + error.message)
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            alert("Успішна реєстрація через Google: " + user.email);
            navigate("/");
        } catch (error) {
            alert("Помилка Google Auth: " + error.message);
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
            <label htmlFor="confirm-password">Підтвердіть пароль</label>
            <input 
                id="confirm-password" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Введіть ваш пароль повторно"
                required
            />
            </div>
            
            <button className="btn-login" type="submit">Зареєструватися</button>

            {/* Кнопка реєстрації через Google */}
            <button 
                type="button" 
                onClick={handleGoogleSignUp}
                className="btn-google"
            >
                Зареєструватися через Google
            </button>
            
            <div className="register-link">
            Вже є аккаунт? <Link id="link-to-reg" to="/login">Увійти</Link>
            </div>
        </form>
        </div>
        </>
    )
}

export default Register;