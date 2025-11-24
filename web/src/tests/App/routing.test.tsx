import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockAuctions } from '@data/mockAuctions';
import { App } from '@/App';

// Mock the global fetch before tests
beforeAll(() => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockAuctions),
        } as Response)
    ) as unknown as typeof fetch;
});

// Reset mocks after each test
afterEach(() => {
    vi.clearAllMocks();
});

describe('App Routing', () => {
    test('renders Gallery page on default route', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        await screen.findByTestId(`gallery-title`);
        expect(screen.getByTestId('gallery-title')).toBeInTheDocument();
        expect(screen.getByTestId(`auction-card-${mockAuctions[0].id}`)).toBeInTheDocument();
    });

    test('renders AuctionDetail page for valid ID', async () => {
        const auction = mockAuctions[0];

        render(
            <MemoryRouter initialEntries={[`/auction/${auction.id}`]}>
                <App />
            </MemoryRouter>
        );

        await screen.findByTestId(`painting-title`);
        expect(screen.getByTestId('painting-title')).toHaveTextContent(auction.title);
        expect(screen.getByTestId('painting-artist')).toHaveTextContent(auction.artistName);
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
