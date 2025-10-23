import { useNavigate } from "react-router-dom";
import { ROUTES } from "@routes/routes.ts";
import {useArtists} from "@context/ArtistsContext";
import styles from "../styles/Artists.module.scss";
import type { Artist } from "@customTypes/artist.ts";
import {Loading} from "@components/common/Loading/Loading.tsx";
import React from "react";

export function Artists() {
    const navigate = useNavigate();
    const { state: { items: artists, loading, error }, load } = useArtists();

    // Load data on component mount
    React.useEffect(() => {
        load();
    }, [load]);

    if (loading) return Loading("artists");
    if (error) return <p>Error loading artists: {error}</p>;

    return (
        <div className={styles.artistsList}>
            {artists.map(({ id, name, image }: Artist) => (
                <div
                    key={id}
                    className={styles.artistItem}
                    onClick={() => navigate(ROUTES.ARTIST_DETAIL(id))}
                >
                    <img src={image} alt={name} className={styles.artistItemImage} />
                    <span className={styles.artistItemName}>{name}</span>
                </div>
            ))}
        </div>
    );
}
