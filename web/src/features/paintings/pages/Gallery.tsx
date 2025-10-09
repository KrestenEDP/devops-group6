// src/features/paintings/Gallery.tsx
import { useEffect } from "react";
import { AuctionCard } from "../components/AuctionCard";
import styles from "../styles/Gallery.module.scss";
import { useAuctions } from "@context/AuctionsContext";
import { mockAuctions } from "../mockData/mockAuctions";

export function Gallery() {
    const { auctions, setAuctions } = useAuctions();

    useEffect(() => {
        // Simulate fetching data from API
        setAuctions(mockAuctions);
    }, [setAuctions]);

    return (
        <div className={styles.galleryPage}>
            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <h1 className={styles.heroTitle}>Current Auctions</h1>
                    <p className={styles.heroSubtitle}>
                        Discover exceptional artworks from renowned artists
                    </p>
                </section>

                <div className={styles.auctionsGrid}>
                    {auctions.map((auction) => (
                        <AuctionCard key={auction.id} auction={auction} />
                    ))}
                </div>
            </main>
        </div>
    );
}
