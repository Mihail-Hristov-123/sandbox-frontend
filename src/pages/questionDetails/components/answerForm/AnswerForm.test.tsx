import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AnswerForm } from './AnswerForm';
import userEvent from '@testing-library/user-event';

let isLoggedInMock = true;
const mockUseCreateAnswer = vi.fn();

const user = userEvent.setup();
const validAnswer = 'A valid answer to any question';

vi.mock('@/contexts/auth/useAuthContext', () => ({
    useAuthContext: () => ({
        isLoggedIn: isLoggedInMock,
        userInfo: {},
    }),
}));

vi.mock('../../hooks/useCreateAnswer', () => ({
    useCreateAnswer: () => ({
        createAnswer: mockUseCreateAnswer,
    }),
}));

const renderComponent = () => {
    render(
        <MemoryRouter>
            <AnswerForm questionId={10} updateAnswers={vi.fn()} />
        </MemoryRouter>,
    );
};

const getElements = () => ({
    textarea: screen.getByPlaceholderText(/your answer/i),
    profilePicture: screen.getByAltText(/your profile picture/i),
    submitButton: screen.getByRole('button', { name: /post answer/i }),
});

describe('AnswerForm', () => {
    beforeEach(() => {
        isLoggedInMock = true;
    });

    it('should render the LoginRedirector component if the user is not logged in', async () => {
        isLoggedInMock = false;
        renderComponent();
        expect(
            screen.getByRole('link', { name: /log in/i }),
        ).toBeInTheDocument();
    });

    it("should render the form's textarea, submit button and the user's profile picture", async () => {
        renderComponent();

        const elements = getElements();
        Object.values(elements).forEach((element) =>
            expect(element).toBeInTheDocument(),
        );
    });

    it('should call the createAnswer function with the provided form data', async () => {
        renderComponent();
        const { textarea, submitButton } = getElements();
        mockUseCreateAnswer.mockResolvedValue({ success: false });
        await user.type(textarea, validAnswer);
        await user.click(submitButton);

        expect(mockUseCreateAnswer).toHaveBeenCalledWith({
            content: validAnswer,
        });
    });

    it('should reset the textarea if answer creation is successful', async () => {
        renderComponent();
        const { textarea, submitButton } = getElements();
        mockUseCreateAnswer.mockResolvedValue({ success: true });
        await user.type(textarea, validAnswer);
        await user.click(submitButton);

        expect(textarea).toHaveValue('');
    });
});
