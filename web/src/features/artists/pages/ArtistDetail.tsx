import { useParams, useNavigate } from "react-router-dom";
import { mockArtists } from "@features/artists/mockData/mockArtists"; // Mock mockData
import styles from "../styles/ArtistDetail.module.scss"; // SCSS module
import type {Artist} from '@customTypes/artist.ts';

export function ArtistDetail() {
    const { artistId } = useParams<{ artistId: string }>();
    const navigate = useNavigate();

    // Type-safe find
    const artist: Artist | undefined = mockArtists.find(a => a.artistId === artistId);

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
                <img src={artist.image} alt={artist.name} className={styles.artistDetailImage} />
                <h1 className={styles.artistDetailName}>{artist.name}</h1>
                <p className={styles.artistDetailBio}>{artist.bio}</p>
            </div>
        </div>
    );
}
