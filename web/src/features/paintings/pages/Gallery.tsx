import { AuctionCard } from "../components/AuctionCard";
import styles from "../styles/Gallery.module.scss";
import { useAuctions } from "@context/AuctionsContext";
import {Loading} from "@components/common/Loading/Loading.tsx";

export function Gallery() {
    const { state: { items: auctions, loading, error } } = useAuctions();

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
                    {auctions.map((auction) => (
                        <AuctionCard key={auction.id} auction={auction} />
                    ))}
                </div>
            </main>
        </div>
    );
}
