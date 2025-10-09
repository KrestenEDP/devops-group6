import { useState } from "react";
import { mockPaintings } from "@features/paintings/mockData/mockPaintings";
import { PaintingCard } from "../components/PaintingCard";
import type {Painting} from "@customTypes/painting";
import styles from "../styles/Gallery.module.scss";

export function Gallery() {
    // If you later fetch paintings from an API, replace mockPaintings with the API mockData and use setPaintings to update state
    const [paintings] = useState<Painting[]>(mockPaintings);

    return (
        <div className={styles.galleryPage}>
            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <h1 className={styles.heroTitle}>Current Auctions</h1>
                    <p className={styles.heroSubtitle}>
                        Discover exceptional artworks from renowned artists
                    </p>
                </section>

                <div className={styles.paintingsGrid}>
                    {paintings.map((painting) => (
                        <PaintingCard key={painting.id} painting={painting} />
                    ))}
                </div>
            </main>
        </div>
    );
}
