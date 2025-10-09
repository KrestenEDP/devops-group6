import { useNavigate } from "react-router-dom";
import { ROUTES } from "@routes/routes.ts";
import styles from "../styles/Login.module.scss";

export function UserCreation() {
    const navigate = useNavigate();

    return (
        <div className={styles.userCreationPage}>
            <div className={styles.userCreationContainer}>
                <div className={styles.userCreationForm}>
                    <div className={styles.loginFormHeader}>
                        <button
                            className={styles.loginBackButton}
                            onClick={() => navigate(ROUTES.LOGIN)}
                        >
                            ← Back to Login
                        </button>
                        <h1>Create Account</h1>
                    </div>

                    <form>
                        <div className={styles.loginFormGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" />
                        </div>

                        <div className={styles.loginFormGroup}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" placeholder="Choose a username" />
                        </div>

                        <div className={styles.loginFormGroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="Create a password" />
                        </div>

                        <button type="submit" className={styles.createAccountButton}>
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
