import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { mockAuctions } from '@data/mockAuctions';
import { App } from '@/App';

describe('App Navigation', () => {
    test('clicking a painting navigates to AuctionDetail', async () => {
        const user = userEvent.setup();
        const painting = mockAuctions[0];

        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        await user.click(screen.getByTestId(`painting-card-${painting.id}`));

        expect(await screen.findByTestId('painting-title')).toHaveTextContent(painting.title);
        expect(screen.getByTestId('painting-artist')).toHaveTextContent(painting.artistName);
    });

    test('back button navigates to Gallery', async () => {
        const user = userEvent.setup();
        const painting = mockAuctions[0];

        render(
            <MemoryRouter initialEntries={[`/painting/${painting.id}`]}>
                <App />
            </MemoryRouter>
        );

        await user.click(screen.getByTestId('back-button'));

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
