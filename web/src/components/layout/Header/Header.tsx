import {Link, useNavigate} from "react-router-dom";
import { User } from "lucide-react";
import { ROUTES } from "@routes/routes.ts";
import styles from "./Header.module.scss";

export function Header() {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <nav className={styles.headerNav}>
                    {/* Left - Logo */}
                    <Link to={ROUTES.GALLERY} className={styles.logoLink}>
                        <img
                            src={`${import.meta.env.BASE_URL || ""}logo.png`}
                            alt="Take The Art And Run Logo"
                            className={styles.logoIcon}
                        />
                        <h1 className={styles.siteTitle}>Take The Art And Run</h1>
                    </Link>

                    {/* Right - Navigation Buttons */}
                    <div className={styles.navLinks}>
                        <button
                            onClick={() => navigate(ROUTES.ARTISTS)}
                            className={`${styles.navButton} ${styles.navButtonGhost}`}
                        >
                            About artists
                        </button>
                        <button
                            onClick={() => navigate(ROUTES.LOGIN)}
                            className={`${styles.navButton} ${styles.navButtonPrimary}`}
                        >
                            <User className={styles.buttonIcon} size={16} strokeWidth={2} />
                            Sign In
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
