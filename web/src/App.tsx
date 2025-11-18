import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Gallery } from "@features/paintings/pages/Gallery";
import { AuctionDetail } from "@features/paintings/pages/AuctionDetail.tsx";
import { Login } from "@features/auth/pages/Login";
import { UserCreation } from "@features/auth/pages/UserCreation";
import { ForgotPassword } from "@features/auth/pages/ForgotPassword";
import { Artists } from "@features/artists/pages/Artists";
import { ArtistDetail } from "@features/artists/pages/ArtistDetail";
import { Admin } from "@features/admin/pages/Admin.tsx";
import { NotFound } from "@components/common/NotFound/NotFound";
import { ROUTES } from "./routes/routes";
import "./styles/App.scss";
import {UserProvider} from "./context/UserContext.tsx";
import {ArtistsProvider} from "./context/ArtistsContext.tsx";
import {AuctionsProvider} from "./context/AuctionsContext.tsx";
import {Profile} from "@features/profile/pages/Profile.tsx";
import { NewArt } from "@features/paintings/pages/NewArt.tsx";
import {TransactionsProvider} from "@context/TransactionContext.tsx";

export function App() {
    return (
        <UserProvider>
        <TransactionsProvider>
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
                    <Route path={ROUTES.NEW_ART} element={<NewArt />} />
                    <Route path={ROUTES.ADMIN} element={<Admin />} />
                </Routes>
            </Layout>
        </AuctionsProvider>
        </ArtistsProvider>
        </TransactionsProvider>
        </UserProvider>
    );
}
