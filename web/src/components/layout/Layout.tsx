import type { ReactNode } from "react";
import { Header } from "./Header/Header";

type LayoutProps = {
    children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <main>{children}</main>
            {/* Optional Footer component can go here */}
        </>
    );
}
