import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Gallery } from "@features/paintings/pages/Gallery";
import { AuctionDetail } from "@features/paintings/pages/AuctionDetail.tsx";
import { Login } from "@features/auth/pages/Login";
import { UserCreation } from "@features/auth/pages/UserCreation";
import { ForgotPassword } from "@features/auth/pages/ForgotPassword";
import { Artists } from "@features/artists/pages/Artists";
import { ArtistDetail } from "@features/artists/pages/ArtistDetail";
import { NotFound } from "@components/common/NotFound/NotFound";
import { ROUTES } from "./routes/routes";
import "./styles/App.scss";
import {UserProvider} from "./context/UserContext.tsx";
import {ArtistsProvider} from "./context/ArtistsContext.tsx";
import {AuctionsProvider} from "./context/AuctionsContext.tsx";
import {Profile} from "@features/profile/pages/Profile.tsx";

export function App() {
    return (
        <UserProvider>
            <ArtistsProvider>
                <AuctionsProvider>
                    <Layout>
                        <Routes>
                            <Route path={ROUTES.GALLERY} element={<Gallery />} />
                            <Route path={ROUTES.AUCTION_DETAIL()} element={<AuctionDetail />} />
                            <Route path={ROUTES.LOGIN} element={<Login />} />
                            <Route path={ROUTES.CREATE_ACCOUNT} element={<UserCreation />} />
                            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                            <Route path={ROUTES.ARTISTS} element={<Artists />} />
                            <Route path={ROUTES.ARTIST_DETAIL()} element={<ArtistDetail />} />
                            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                            <Route path={ROUTES.PROFILE} element={<Profile />} />
                        </Routes>
                    </Layout>
                </AuctionsProvider>
            </ArtistsProvider>
        </UserProvider>
    );
}
