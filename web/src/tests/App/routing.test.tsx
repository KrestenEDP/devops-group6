import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockAuctions } from '@data/mockAuctions';
import { App } from '@/App';

describe('App Routing', () => {
    test('renders Gallery page on default route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByTestId('gallery-title')).toBeInTheDocument();
        expect(screen.getByTestId(`painting-card-${mockAuctions[0].id}`)).toBeInTheDocument();
    });

    test('renders AuctionDetail page for valid ID', () => {
        const painting = mockAuctions[0];

        render(
            <MemoryRouter initialEntries={[`/painting/${painting.id}`]}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByTestId('painting-title')).toHaveTextContent(painting.title);
        expect(screen.getByTestId('painting-artist')).toHaveTextContent(painting.artistName);
        expect(screen.getByTestId('bid-input')).toHaveAttribute('placeholder', 'Place your bid');
    });

    test('renders NotFound page for unknown route', () => {
        render(
            <MemoryRouter initialEntries={['/unknown']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByTestId('notfound-title')).toBeInTheDocument();
        expect(screen.getByTestId('notfound-message')).toBeInTheDocument();
    });
});
