import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';

import { mockPaintings } from '@features/paintings/mockData/mockPaintings.ts';
import App from '../../../../../../../../tmp/App.js';

describe('App Routing', () => {
    test('renders Gallery page on default route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        // Check for Gallery title
        expect(screen.getByTestId('gallery-title')).toBeInTheDocument();
        // Check that at least one painting card is rendered
        expect(screen.getByTestId(`painting-card-${mockPaintings[0].id}`)).toBeInTheDocument();
    });

    test('renders PaintingDetail page for valid painting ID', () => {
        const painting = mockPaintings[0];

        render(
            <MemoryRouter initialEntries={[`/painting/${painting.id}`]}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByTestId('painting-title')).toHaveTextContent(painting.title);
        expect(screen.getByTestId('painting-artist')).toHaveTextContent(painting.artist);
        expect(screen.getByTestId('bid-input')).toHaveAttribute(
            'placeholder',
            `Place your bid`
        );
    });

    test('renders NotFound page for unknown route', () => {
        render(
            <MemoryRouter initialEntries={['/unknown-route']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByTestId('notfound-title')).toBeInTheDocument();
        expect(screen.getByTestId('notfound-message')).toBeInTheDocument();
    });
});

describe('App Navigation', () => {
    test('clicking a painting navigates to PaintingDetail', async () => {
        const user = userEvent.setup();
        const painting = mockPaintings[0];

        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        const paintingCard = screen.getByTestId(`painting-card-${painting.id}`);
        expect(paintingCard).toBeInTheDocument();

        await user.click(paintingCard);

        expect(await screen.findByTestId('painting-title')).toHaveTextContent(painting.title);
        expect(screen.getByTestId('painting-artist')).toHaveTextContent(painting.artist);
        expect(screen.getByTestId('current-bid')).toBeInTheDocument();
    });

    test('back button navigates to Gallery', async () => {
        const user = userEvent.setup();
        const painting = mockPaintings[0];

        render(
            <MemoryRouter initialEntries={[`/painting/${painting.id}`]}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByTestId('painting-title')).toBeInTheDocument();

        await user.click(screen.getByTestId('back-button'));

        expect(screen.getByTestId('gallery-title')).toBeInTheDocument();
        expect(screen.getByTestId(`painting-card-${mockPaintings[0].id}`)).toBeInTheDocument();
    });

    test('navigation to unknown route shows NotFound and return button works', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={['/non-existent']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByTestId('notfound-title')).toBeInTheDocument();

        await user.click(screen.getByTestId('return-gallery-button'));

        expect(screen.getByTestId('gallery-title')).toBeInTheDocument();
    });
});

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation((msg, ...args) => {
        if (
            typeof msg === "string" &&
            msg.includes("Relative route resolution within Splat routes is changing in v7")
        ) {
            return; // ignore this specific warning
        }
        console.warn(msg, ...args); // still show other warnings
    });
});

afterAll(() => {
    console.warn.mockRestore(); // restore original console.warn after tests
});
