import { useNavigate } from "react-router-dom";
import { mockArtists } from "@features/artists/mockData/mockArtists";
import styles from "../styles/Artists.module.scss"; // SCSS module
import { ROUTES } from "@routes/routes.ts";
import type { Artist } from "@customTypes/artist.ts";

export function Artists() {
    const navigate = useNavigate();

    return (
        <div className={styles.artistsList}>
            {mockArtists.map(({ artistId, name, image }: Artist) => (
                <div
                    key={artistId}
                    className={styles.artistItem}
                    onClick={() => navigate(ROUTES.ARTIST_DETAIL(artistId))}
                >
                    <img src={image} alt={name} className={styles.artistItemImage} />
                    <span className={styles.artistItemName}>{name}</span>
                </div>
            ))}
        </div>
    );
}
