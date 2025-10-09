import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import styles from "../styles/Login.module.scss";

export function Login() {
    const navigate = useNavigate();

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.loginForm}>
                    <h1>Login</h1>
                    <form>
                        <div className={styles.loginFormGroup}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className={styles.loginFormGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button type="submit" className={styles.loginButton}>
                            Login
                        </button>
                    </form>

                    <div className={styles.loginButtonsContainer}>
                        <button
                            className={styles.loginSecondaryButton}
                            onClick={() => navigate(ROUTES.CREATE_ACCOUNT)}
                        >
                            Create Account
                        </button>
                        <button
                            className={styles.loginSecondaryButton}
                            onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
