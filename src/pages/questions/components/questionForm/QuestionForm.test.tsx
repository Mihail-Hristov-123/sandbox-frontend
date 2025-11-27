import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { QuestionForm } from './QuestionForm';
import { Login } from '@/pages/login/Login';
import userEvent from '@testing-library/user-event';

let isLoggedInMock: boolean;
const mockRefreshQuestions = vi.fn();
const mockCreateQuestion = vi.fn();

const user = userEvent.setup();

const validQuestionData = {
    title: 'Sample question title',
    description: 'A sample question description',
};

vi.mock('@/contexts/auth/useAuthContext', () => ({
    useAuthContext: () => ({
        isLoggedIn: isLoggedInMock,
    }),
}));

vi.mock('../../hooks/useCreateQuestion', () => ({
    useCreateQuestion: () => ({
        createQuestion: mockCreateQuestion,
    }),
}));

const renderComponent = () =>
    render(
        <MemoryRouter>
            <QuestionForm refreshQuestions={mockRefreshQuestions} />
        </MemoryRouter>,
    );

const getFormElements = async () => ({
    heading: await screen.findByRole('heading', { name: /ask a question/i }),
    titleInput: await screen.findByLabelText(/question title:/i),
    descriptionTextarea: await screen.findByLabelText(/description:/i),
    submitButton: await screen.findByRole('button', { name: /post question/i }),
});

describe('QuestionForm', () => {
    beforeEach(() => {
        isLoggedInMock = true;
    });

    it('should render the LoginRedirector component if the user is not authenticated', async () => {
        isLoggedInMock = false;
        renderComponent();
        const loginLink = await screen.findByRole('link', { name: /log in/i });
        expect(loginLink).toBeInTheDocument();
    });

    it("should render the login form's heading, inputs for question title and description and submit button", async () => {
        renderComponent();
        const formElements = await getFormElements();
        Object.values(formElements).forEach((element) =>
            expect(element).toBeInTheDocument(),
        );
    });

    it('should call the create question function with the data from the form', async () => {
        renderComponent();
        const { submitButton, descriptionTextarea, titleInput } =
            await getFormElements();
        mockCreateQuestion.mockResolvedValue({ success: false });
        await user.type(titleInput, validQuestionData.title);
        await user.type(descriptionTextarea, validQuestionData.description);
        await user.click(submitButton);

        expect(mockCreateQuestion).toHaveBeenCalledWith(validQuestionData);
    });

    it('should reset the form if the question was created successfully', async () => {
        renderComponent();
        const { submitButton, descriptionTextarea, titleInput } =
            await getFormElements();
        mockCreateQuestion.mockResolvedValue({ success: true });
        await user.type(titleInput, validQuestionData.title);
        await user.type(descriptionTextarea, validQuestionData.description);
        await user.click(submitButton);

        [descriptionTextarea, titleInput].forEach((element) =>
            expect(element).toHaveValue(''),
        );
    });
});
