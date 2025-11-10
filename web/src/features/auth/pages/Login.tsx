import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@context/UserContext.tsx";
import { ROUTES } from "@routes/routes.ts";
import styles from "../styles/Login.module.scss";

export function Login() {
    const navigate = useNavigate();
    const { login } = useUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e?: FormEvent) {
        e?.preventDefault();

        if (!email || !password) {
            setMessage("Please enter both email and password.");
            return;
        }
        setLoading(true);
        setMessage(null);

        try {
            await login(email, password); // use the context login
            setMessage("Successfully logged in. Redirecting to gallery...");
            setTimeout(() => navigate(ROUTES.GALLERY), 800);
        } catch (err: any) {
            setMessage(err.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.loginForm}>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.loginFormGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setMessage(null);
                                }}
                                autoComplete="email"
                            />
                        </div>

                        <div className={styles.loginFormGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setMessage(null);
                                }}
                                autoComplete="current-password"
                            />
                        </div>

                            <button
                                type="submit"
                                className={styles.loginButton}
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                    </form>

                    {message && <p role="status">{message}</p>}

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
