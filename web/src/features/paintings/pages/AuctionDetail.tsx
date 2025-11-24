import { useParams, useNavigate } from "react-router-dom";
import { useAuctionsActions} from "@context/AuctionsContext";
import styles from "../styles/AuctionDetail.module.scss";
import {ROUTES} from "@routes/routes.ts";
import {ArrowLeft, Info, User, Users} from "lucide-react";
import {formatCurrency} from "@data/mockAuctions.ts";
import {Loading} from "@components/common/Loading/Loading.tsx";
import React, {useState} from "react";

export function AuctionDetail() {
    const { auctionId } = useParams<{ auctionId: string }>();
    const navigate = useNavigate();
    const { state: { items: auctions, loading, error }, load, placeBid } = useAuctionsActions();

    const [bidAmount, setBidAmount] = useState<number | "">("");
    const [message, setMessage] = useState<string | null>(null);

    React.useEffect(() => {
        load();
    }, [load]);

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

    const handlePlaceBid = async () => {
        if (!bidAmount || bidAmount <= auction.highestBid) {
            setMessage(`Your bid must be higher than the current highest bid: ${formatCurrency(auction.highestBid)}`);
            return;
        }

        try {
            const sold = await placeBid(auction.id, Number(bidAmount));
            const message = sold ? "Congratulations, you bought the painting!" : "You unfortunately didn't bid enough to get the painting";
            setMessage(message);
            await new Promise(resolve => setTimeout(resolve, 1500));
            if (sold)
                navigate(ROUTES.PROFILE);
        } catch (err: any) {
            setMessage(err.message || "Failed to place bid.");
        }
    };

    return (
        <div className={styles.detailPage}>
            <main className={styles.detailContent}>
                <button
                    className={styles.backButton}
                    onClick={() => navigate(ROUTES.GALLERY)}
                    data-testid={`back-button`}
                >
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
                            <h1
                                className={styles.paintingName}
                                data-testid={`painting-title`}
                            >{auction.title}</h1>
                            <p
                                className={styles.artistName}
                                data-testid={`painting-artist`}
                            >{auction.artistName}</p>
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
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(Number(e.target.value))}
                                    data-testid={`bid-input`}
                                />
                                <button
                                    className={styles.placeBidButton}
                                    onClick={handlePlaceBid}
                                >
                                    Place Bid
                                </button>
                            </div>
                            {message && <p role="status">{message}</p>}
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
