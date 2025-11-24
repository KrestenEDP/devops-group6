import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { mockAuctions } from '@data/mockAuctions';
import {App} from '@/App';

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

describe('App Navigation', () => {
    test('clicking a painting navigates to AuctionDetail', async () => {
        const user = userEvent.setup();
        const auction = mockAuctions[0];

        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        await screen.findByTestId(`auction-card-${auction.id}`);
        await user.click(screen.getByTestId(`auction-card-${auction.id}`));

        expect(await screen.findByTestId('painting-title')).toHaveTextContent(auction.title);
        expect(screen.getByTestId('painting-artist')).toHaveTextContent(auction.artistName);
    });

    test('back button navigates to Gallery', async () => {
        const user = userEvent.setup();
        const auction = mockAuctions[0];

        render(
            <MemoryRouter initialEntries={[`/auction/${auction.id}`]}>
                <App />
            </MemoryRouter>
        );

        await screen.findByTestId(`back-button`);
        await user.click(screen.getByTestId('back-button'));

        await screen.findByTestId(`gallery-title`);
        expect(screen.getByTestId('gallery-title')).toBeInTheDocument();
    });

    test('NotFound return button works', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={['/non-existent']}>
                <App />
            </MemoryRouter>
        );

        await user.click(screen.getByTestId('return-gallery-button'));

        expect(screen.getByTestId('gallery-title')).toBeInTheDocument();
    });
});
