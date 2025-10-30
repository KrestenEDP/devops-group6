import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@context/UserContext.tsx";
import { ROUTES } from "@routes/routes.ts";
import styles from "../styles/Login.module.scss";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [isArtist] = useState(false);

    const { login } = useUser();

    function handleSubmit(e?: FormEvent) {
        // if called from an event (submit or keydown), prevent default
        try {
            e && (e as FormEvent).preventDefault();
        } catch {
            // ignore if preventDefault isn't available
        }
        // Placeholder behavior: validate basic input and show a message.
        if (!email || !password) {
            setMessage("Please enter both email and password.");
            return;
        } else {
            setMessage("Your email or password is incorrect, try again fool");
        }

        // Simulate success without calling any backend if test and test.
        if (email === "test" && password === "test") {
            const user = { id: "1", name: "Test User", email, isArtist };
            // update global user state (and persist to localStorage)
            login(user);
            setMessage("Succesfully logged in. Redirecting to gallery...");

            // Small timeout to let user see the message, then navigate to gallery route.
            setTimeout(() => {
                navigate(ROUTES.GALLERY);
            }, 800);
            return;
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
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSubmit();
                                    }
                                }}
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
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSubmit();
                                    }
                                }}
                            />
                        </div>

                            <button
                                type="button"
                                className={styles.loginButton}
                                onClick={() => handleSubmit()}
                            >
                                Login
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
