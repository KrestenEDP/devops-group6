import styles from "./Loading.module.scss";

export function Loading(content: string) {
    return (
        <div className={styles.loadingPage}>
            <div className={styles.loadingContent}>
                <h1 className={styles.loadingTitle} data-testid="loading-title">Loading {content}</h1>
                {LoadingSpinner()}
            </div>
        </div>
    );
}

function LoadingSpinner(size: number = 50, color: string = "#d4a574") {
    return (
        <div className={styles.spinnerWrapper}>
            <svg
                className={styles.spinner}
                width={size}
                height={size}
                viewBox="0 0 50 50"
            >
                <circle
                    className={styles.path}
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke={color}
                    strokeWidth="5"
                />
            </svg>
        </div>
    );
}
