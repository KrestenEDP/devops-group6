import { useNavigate } from "react-router-dom";
import { ROUTES } from "@routes/routes.ts";
import styles from "./NotFound.module.scss";

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className={styles.notFoundPage}>
            <div className={styles.notFoundContent}>
                <h1 className={styles.notFoundTitle} data-testid="notfound-title">404</h1>
                <p className={styles.notFoundMessage} data-testid="notfound-message">
                    Page not found
                </p>
                <button
                    className={styles.homeButton}
                    data-testid="return-gallery-button"
                    onClick={() => navigate(ROUTES.GALLERY)}
                >
                    Return to Gallery
                </button>
            </div>
        </div>
    );
}
