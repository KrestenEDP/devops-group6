import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Users, Info, User } from "lucide-react";

import { mockPaintings, formatCurrency } from "@features/paintings/mockData/mockPaintings";
import { ROUTES } from "@routes/routes.js";
import styles from "../styles/PaintingDetail.module.scss";

export function PaintingDetail() {
    const { paintingId } = useParams<{ paintingId: string }>();
    const painting = mockPaintings.find(p => p.id === paintingId);
    const [bidAmount, setBidAmount] = useState<string>("");
    const navigate = useNavigate();

    if (!painting) {
        return (
            <div className={styles.detailPage}>
                <div className={styles.notFound}>Painting not found</div>
            </div>
        );
    }

    const handlePlaceBid = () => {
        if (!bidAmount) return;
        alert(`Bid of ${formatCurrency(Number(bidAmount))} placed for ${painting.title}!`);
        setBidAmount(""); // reset input
    };

    return (
        <div className={styles.detailPage}>
            <main className={styles.detailContent}>
                <button
                    className={styles.backButton}
                    onClick={() => navigate(ROUTES.GALLERY)}
                >
                    <ArrowLeft size={20} strokeWidth={2} />
                    Back to Auctions
                </button>

                <div className={styles.detailGrid}>
                    {/* Image Section */}
                    <div className={styles.imageSection}>
                        <div className={styles.paintingFrame}>
                            <img
                                src={painting.imageUrl}
                                alt={painting.title}
                                className={styles.paintingFullImage}
                            />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className={styles.infoSection}>
                        {/* Title */}
                        <div className={styles.titleSection}>
                            <h1 className={styles.paintingName}>{painting.title}</h1>
                            <p className={styles.artistName}>
                                {painting.artist}, {painting.year}
                            </p>
                        </div>

                        {/* Bid Card */}
                        <div className={`${styles.bidCard} ${styles.primaryCard}`}>
                            <div className={styles.bidHeader}>
                                <div className={styles.bidCurrent}>
                                    <p className={styles.label}>Highest Bid</p>
                                    <p className={styles.amount}>
                                        {formatCurrency(painting.highestBid)}
                                    </p>
                                </div>
                            </div>

                            <div className={styles.bidCount}>
                                <Users size={16} strokeWidth={2} />
                                <span>{painting.bidCount} bids</span>
                            </div>

                            <div className={styles.bidForm}>
                                <input
                                    type="number"
                                    placeholder="Place your bid"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    className={styles.bidInput}
                                />
                                <button
                                    onClick={handlePlaceBid}
                                    className={styles.placeBidButton}
                                >
                                    Place Bid
                                </button>
                            </div>
                        </div>

                        {/* Artwork Details */}
                        <div className={styles.detailsCard}>
                            <h2 className={styles.cardTitle}>
                                <Info size={20} strokeWidth={2} />
                                Artwork Details
                            </h2>
                            <dl className={styles.detailsList}>
                                <div className={styles.detailItem}>
                                    <dt className={styles.detailLabel}>Medium</dt>
                                    <dd className={styles.detailValue}>{painting.medium}</dd>
                                </div>
                                <div className={styles.detailItem}>
                                    <dt className={styles.detailLabel}>Dimensions</dt>
                                    <dd className={styles.detailValue}>{painting.dimensions}</dd>
                                </div>
                                <div className={styles.detailItem}>
                                    <dt className={styles.detailLabel}>Condition</dt>
                                    <dd className={styles.detailValue}>{painting.condition}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Artist Info */}
                        <div className={styles.artistCard}>
                            <h2 className={styles.cardTitle}>
                                <User size={20} strokeWidth={2} />
                                About the Artist
                            </h2>
                            <p className={styles.artistBio}>{painting.artistBio}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
