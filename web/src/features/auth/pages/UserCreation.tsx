import { useNavigate } from "react-router-dom";
import { ROUTES } from "@routes/routes.ts";
import styles from "../styles/Login.module.scss";
import {type FormEvent, useState} from "react";
import {useUser} from "@context/UserContext.tsx";

export function UserCreation() {
    const navigate = useNavigate();
    const { register } = useUser();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || !username || !password) {
            setMessage("Please fill all fields.");
            return;
        }
        setLoading(true);
        setMessage(null);

        try {
            await register(email, password); // your context handles backend call
            setMessage("Account created! Redirecting to login...");
            setTimeout(() => navigate(ROUTES.LOGIN), 1000);
        } catch (err: any) {
            setMessage(err.message || "Failed to create account.");
        } finally {
            setLoading(false);
        }
    };

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
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setMessage(null);
                                }}
                                autoComplete="username"
                            />
                        </div>

                        <div className={styles.loginFormGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setMessage(null);
                                }}
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.createAccountButton}
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>
                    {message &&
                        <p role="status" className={message.includes("successfully") ? styles.success : styles.error}>
                            {message}
                        </p>}
                </div>
            </div>
        </div>
    );
}
