import type {Artist} from "@customTypes/artist.ts";

const artistMaelle = `${import.meta.env.BASE_URL}artistMaelle.svg`;
// const artistAlex = `${import.meta.env.BASE_URL}artistAlex.svg`;

export const mockArtists: Artist[] = [
    {
        id: "maelle",
        name: "Maelle Dessendre",
        email: "maelleDes@abracadabra.com",
        imageUrl: artistMaelle,
        userId: "userMaelle",
        bio: `Maelle is a fiercely talented artist and a masterful duelist,
blending elegance and edge in everything she does. Her creations captivate,
her blade commands respect—and whether on canvas or in combat, she never misses her mark.`,
    },
    {
        id: "alex",
        name: "Alex Shadow",
        email: "AlexDarktherThanEdge@abracadabra.com",
        imageUrl: artistMaelle, // Replace with artistAlex
        userId: "userAlex",
        bio: `Alex is a bold and talented painter whose edgy, distinctive style turns heads and challenges norms.
Known in the art world as ‘Alex the Edger,’ their work cuts through convention with raw expression and fearless creativity.`,
    },
];
