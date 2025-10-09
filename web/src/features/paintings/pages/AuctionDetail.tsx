import { useParams, useNavigate } from "react-router-dom";
import { useAuctions } from "@context/AuctionsContext";
import styles from "../styles/AuctionDetail.module.scss";
import {ROUTES} from "@routes/routes.ts";
import {ArrowLeft, Info, User, Users} from "lucide-react";
import {formatCurrency} from "@features/paintings/mockData/mockAuctions.ts";
import {Loading} from "@components/common/Loading/Loading.tsx";

export function AuctionDetail() {
    const { auctionId } = useParams<{ auctionId: string }>();
    const { state: { items: auctions, loading, error } } = useAuctions();
    const navigate = useNavigate();

    if (loading) return Loading("auction");
    if (error) return <p>Error loading auction: {error}</p>;

    const auction = auctions.find(a => a.id === auctionId);

    if (!auction) {
        return (
            <div className={styles.notFound}>
                Auction not found
                <button className={styles.backButton} onClick={() => navigate(ROUTES.GALLERY)}>
                    Return to Gallery
                </button>
            </div>
        );
    }

    return (
        <div className={styles.detailPage}>
            <main className={styles.detailContent}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} /> Back to Auctions
                </button>

                <div className={styles.detailGrid}>
                    {/* Image Section */}
                    <div className={styles.imageSection}>
                        <div className={styles.paintingFrame}>
                            <img
                                src={auction.imageUrl}
                                alt={auction.title}
                                className={styles.paintingFullImage}
                            />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className={styles.infoSection}>
                        <div className={styles.titleSection}>
                            <h1 className={styles.paintingName}>{auction.title}</h1>
                            <p className={styles.artistName}>{auction.artist}</p>
                        </div>

                        {/* Bid Card with primary gradient applied */}
                        <div className={`${styles.bidCard} ${styles.primaryCard}`}>
                            <div className={styles.bidHeader}>
                                <div className={styles.bidCurrent}>
                                    <div className={styles.label}>Highest Bid</div>
                                    <div className={styles.amount}>
                                        {formatCurrency(auction.highestBid)}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.bidCount}>
                                <Users size={16} strokeWidth={2} />
                                {auction.bidCount} bids
                            </div>

                            <div className={styles.bidForm}>
                                <input
                                    className={styles.bidInput}
                                    type="number"
                                    placeholder="Place your bid"
                                />
                                <button className={styles.placeBidButton}>Place Bid</button>
                            </div>
                        </div>

                        {/* Details Card */}
                        <div className={styles.detailsCard}>
                            <h3 className={styles.cardTitle}>
                                <Info size={20} strokeWidth={2} />
                                Artwork Details
                            </h3>
                            <div className={styles.detailsList}>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Medium</span>
                                    <span className={styles.detailValue}>{auction.medium}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Dimensions</span>
                                    <span className={styles.detailValue}>{auction.dimensions}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Condition</span>
                                    <span className={styles.detailValue}>{auction.condition}</span>
                                </div>
                            </div>
                        </div>

                        {/* Artist Card */}
                        <div className={styles.artistCard}>
                            <h3 className={styles.cardTitle}>
                                <User size={20} strokeWidth={2} />
                                About the Artist
                            </h3>
                            <p className={styles.artistBio}>{auction.artistBio}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
