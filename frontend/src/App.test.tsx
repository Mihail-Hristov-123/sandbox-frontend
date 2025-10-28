import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should render the App component', async () => {
        render(<App />);

        const element = await screen.findByText(
            'Click on the Vite and React logos to learn more',
        );

        expect(element).toBeInTheDocument();
        expect(element).toBeVisible();
    });
});
