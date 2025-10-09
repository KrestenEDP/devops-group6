export const ROUTES = {
    GALLERY: "/",
    PAINTING_DETAIL: (id: string | number = ":paintingId") => `/painting/${id}`,
    LOGIN: "/login",
    CREATE_ACCOUNT: "/create-account",
    FORGOT_PASSWORD: "/forgot-password",
    NOT_FOUND: "*",
    ARTISTS: "/artists",
    ARTIST_DETAIL: (id: string | number = ":artistId") => `/artists/${id}`,
} as const;

// Optional helper type (if you want autocompletion for route keys)
export type RouteKeys = keyof typeof ROUTES;