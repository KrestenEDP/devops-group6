import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/ArtistDetail.module.scss";
import {useArtists} from "@context/ArtistsContext.tsx";
import {useAuctions} from "@context/AuctionsContext.tsx";
import {Loading} from "@components/common/Loading/Loading.tsx";
import React from "react";

export function ArtistDetail() {
    const navigate = useNavigate();
    const { artistId } = useParams<{ artistId: string }>();
    const {
    state: { items: artists, loading: artistsLoading, error: artistsError },
    load: loadArtists
    } = useArtists();

    const {
    state: { items: auctions, loading: auctionsLoading, error: auctionsError },
    load: loadAuctions
    } = useAuctions();

    // Load data on component mount
    React.useEffect(() => {
        loadArtists();
        loadAuctions();
    }, [loadArtists, loadAuctions]);

    if (artistsLoading) return Loading("artist");
    if (artistsError) return <p>Error loading artists: {artistsError}</p>;

    const artist = artists.find(a => a.id === artistId);
    const artistArt = auctions.filter(auction => auction.artistName === artist?.name);


    if (!artist) {
        return (
            <div className={styles.artistDetailContainer}>
                <p className={styles.artistDetailNotFound}>Artist not found.</p>
                <button className={styles.artistDetailBack} onClick={() => navigate(-1)}>
                    ← Back
                </button>
            </div>
        );
    }

    console.log("Artist Art:", artistArt);
    
    if (auctionsLoading) return Loading("auctions");
    if (auctionsError) return <p>Error loading artists: {auctionsError}</p>;

    return (
        <div className={styles.artistPageContainer}>
            <div className={styles.artistDetailContainer}>
                <button className={styles.artistDetailBack} onClick={() => navigate(-1)}>
                    ← Back
                </button>
                <div className={styles.artistDetailCard}>
                    <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className={styles.artistDetailImage}
                    />
                    <h1 className={styles.artistDetailName}>{artist.name}</h1>
                    <p className={styles.artistDetailBio}>{artist.bio}</p>
                </div>
            </div>

			<div className={styles.artSection}>
                <h3>{artist.name}'s art</h3>
				{auctionsLoading && <p>Loading art...</p>}
				{auctionsError && <p>Error loading art pieces: {auctionsError}</p>}
				{!auctionsLoading && !auctionsError && artistArt.length === 0 && <p>No art found.</p>}
				{!auctionsLoading && artistArt.length > 0 && (
					<ul className={styles.artList}>
						{artistArt.map((piece) => {
							const art = piece;
							if (!art) return null;

							return (
								<li className={styles.artItem}>
									<img
										src={art.imageUrl}
										alt={art.title}
										className={styles.artImage}
									/>
                                    <div className={styles.artDetails}>
                                        <h4>{art.title}</h4>
                                        <p>by {art.artistName}</p>
                                    </div>
								</li>
							);
						})}
					</ul>
				)}
			</div>
        </div>
    );

}
