import { AuctionCard } from "../components/AuctionCard";
import styles from "../styles/Gallery.module.scss";
import { useAuctions } from "@context/AuctionsContext";
import {Loading} from "@components/common/Loading/Loading.tsx";
import React from "react";

export function Gallery() {
    const { state: { items: auctions, loading, error }, load } = useAuctions();

    const activeAuctions = auctions.filter(auction => !auction.isSold);

    // Load data on component mount
    React.useEffect(() => {
        load();
    }, [load]);

    if (loading) return Loading("auctions");
    if (error) return <p>Error loading auctions: {error}</p>;

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
                    {activeAuctions.map((auction) => (
                        <AuctionCard key={auction.id} auction={auction} />
                    ))}
                </div>
            </main>
        </div>
    );
}
