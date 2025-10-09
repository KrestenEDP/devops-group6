import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@features/paintings/mockData/mockPaintings";
import styles from "../styles/Gallery.module.scss";
import type {Painting} from "@customTypes/painting";
import { ROUTES } from "@routes/routes";

interface PaintingCardProps {
    painting: Painting;
}

export function PaintingCard({ painting }: PaintingCardProps) {
    const { id, title, artist, year, imageUrl, highestBid, bidCount } = painting;

    return (
        <Link
            to={ROUTES.PAINTING_DETAIL(id)}
            className={styles.paintingCardLink}
        >
            <div className={styles.paintingCard}>
                <div className={styles.paintingImageContainer}>
                    <img src={imageUrl} alt={title} className={styles.paintingImage} />
                </div>

                <div className={styles.paintingInfo}>
                    <h3 className={styles.paintingTitle}>{title}</h3>
                    <p className={styles.paintingArtist}>
                        {artist}, {year}
                    </p>

                    <div className={styles.paintingDetails}>
                        <div className={styles.bidInfo}>
                            <span className={styles.bidLabel}>Current Bid</span>
                            <span className={styles.bidAmount}>{formatCurrency(highestBid)}</span>
                        </div>

                        <div className={styles.bidStats}>
                            <div className={styles.statItem}>
                                <Users className={styles.statIcon} size={16} strokeWidth={2} />
                                <span>{bidCount} bids</span>
                            </div>
                        </div>

                        <button className={styles.bidButton}>Place Bid</button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
