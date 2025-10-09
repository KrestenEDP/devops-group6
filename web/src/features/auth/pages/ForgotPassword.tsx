import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import styles from "../styles/Login.module.scss";

export function ForgotPassword() {
    const navigate = useNavigate();

    return (
        <div className={styles.forgotPasswordPage}>
            <div className={styles.forgotPasswordContainer}>
                <div className={styles.forgotPasswordForm}>
                    <div className={styles.loginFormHeader}>
                        <button
                            className={styles.loginBackButton}
                            onClick={() => navigate(ROUTES.LOGIN)}
                        >
                            ← Back to Login
                        </button>
                        <h1>Forgot Password</h1>
                    </div>

                    <form>
                        <div className={styles.loginFormGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <button type="submit" className={styles.resetPasswordButton}>
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
