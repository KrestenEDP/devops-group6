import type {Artist} from "@customTypes/artist.ts";

// Use Vite-friendly import for public assets
const artistMaelle = `${import.meta.env.BASE_URL}artistMaelle.svg`;
// const artistAlex = `${import.meta.env.BASE_URL}artistAlex.svg`; // Uncomment if you have it

export const mockArtists: Artist[] = [
    {
        artistId: "maelle",
        name: "Maelle Dessendre",
        image: artistMaelle,
        bio: `Maelle is a fiercely talented artist and a masterful duelist,
blending elegance and edge in everything she does. Her creations captivate,
her blade commands respect—and whether on canvas or in combat, she never misses her mark.`,
    },
    {
        artistId: "alex",
        name: "Alex Shadow",
        image: artistMaelle, // Replace with artistAlex if available
        bio: `Alex is a bold and talented painter whose edgy, distinctive style turns heads and challenges norms.
Known in the art world as ‘Alex the Edger,’ their work cuts through convention with raw expression and fearless creativity.`,
    },
];
