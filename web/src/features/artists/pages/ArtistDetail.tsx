import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/ArtistDetail.module.scss";
import {useArtists} from "@context/ArtistsContext.tsx";
import {Loading} from "@components/common/Loading/Loading.tsx";
import React from "react";

export function ArtistDetail() {
    const navigate = useNavigate();
    const { artistId } = useParams<{ artistId: string }>();
    const { state: { items: artists, loading, error }, load } = useArtists();

    // Load data on component mount
    React.useEffect(() => {
        load();
    }, [load]);

    if (loading) return Loading("artist");
    if (error) return <p>Error loading artists: {error}</p>;

    const artist = artists.find(a => a.id === artistId);

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

    return (
        <div className={styles.artistDetailContainer}>
            <button className={styles.artistDetailBack} onClick={() => navigate(-1)}>
                ← Back
            </button>
            <div className={styles.artistDetailCard}>
                <img src={artist.imageUrl} alt={artist.name} className={styles.artistDetailImage} />
                <h1 className={styles.artistDetailName}>{artist.name}</h1>
                <p className={styles.artistDetailBio}>{artist.bio}</p>
            </div>
        </div>
    );
}
