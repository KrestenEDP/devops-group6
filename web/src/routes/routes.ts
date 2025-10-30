export const ROUTES = {
    GALLERY: "/",
    AUCTION_DETAIL: (id: string | number = ":auctionId") => `/auction/${id}`,
    LOGIN: "/login",
    CREATE_ACCOUNT: "/create-account",
    FORGOT_PASSWORD: "/forgot-password",
    NOT_FOUND: "*",
    ARTISTS: "/artists",
    ARTIST_DETAIL: (id: string | number = ":artistId") => `/artists/${id}`,
    PROFILE: "/profile",
    NEW_ART: "/new-auction",
} as const;