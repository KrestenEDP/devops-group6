import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Gallery } from "@features/paintings/pages/Gallery";
import { PaintingDetail } from "@features/paintings/pages/PaintingDetail";
import { Login } from "@features/auth/pages/Login";
import { UserCreation } from "@features/auth/pages/UserCreation";
import { ForgotPassword } from "@features/auth/pages/ForgotPassword";
import { Artists } from "@features/artists/pages/Artists";
import { ArtistDetail } from "@features/artists/pages/ArtistDetail";
import { NotFound } from "./pages/NotFound/NotFound";
import { ROUTES } from "./routes/routes";
import "./styles/App.scss";

export function App() {
    return (
        <Layout>
            <Routes>
                <Route path={ROUTES.GALLERY} element={<Gallery />} />
                <Route path={ROUTES.PAINTING_DETAIL()} element={<PaintingDetail />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.CREATE_ACCOUNT} element={<UserCreation />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={ROUTES.ARTISTS} element={<Artists />} />
                <Route path={ROUTES.ARTIST_DETAIL()} element={<ArtistDetail />} />
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
        </Layout>
    );
}
