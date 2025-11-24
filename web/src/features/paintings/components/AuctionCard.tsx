import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import type { Auction } from "@customTypes/auction";
import { ROUTES } from "@routes/routes";
import styles from "../styles/Gallery.module.scss";
import {formatCurrency} from "@data/mockAuctions.ts";

interface AuctionCardProps {
    auction: Auction;
}

export function AuctionCard({ auction }: AuctionCardProps) {
    return (
        <Link
            to={ROUTES.AUCTION_DETAIL(auction.id)}
            className={styles.auctionCardLink}
            data-testid={`auction-card-${auction.id}`}
        >
            <div className={styles.auctionCard}>
                <div className={styles.auctionImageContainer}>
                    <img
                        src={auction.imageUrl}
                        alt={auction.title}
                        className={styles.auctionImage}
                    />
                </div>

                <div className={styles.auctionInfo}>
                    <h3 className={styles.auctionTitle}>{auction.title}</h3>
                    <p className={styles.auctionArtist}>
                        {auction.artistName}
                    </p>

                    <div className={styles.auctionDetails}>
                        <div className={styles.bidInfo}>
                            <span className={styles.bidLabel}>Current Bid</span>
                            <span className={styles.bidAmount}>
                                {formatCurrency(auction.highestBid)}
                            </span>
                        </div>

                        <div className={styles.bidStats}>
                            <div className={styles.statItem}>
                                <Users size={16} strokeWidth={2} />
                                <span>{auction.bidCount} bids</span>
                            </div>
                        </div>

                        <button className={styles.bidButton}>Place Bid</button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
