import { useForm } from 'react-hook-form';
import { LabelledInput } from '@/components/formRelated/LabelledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionSchema, type QuestionValues } from 'tacklebox-schemas';
import { LabelledTextArea } from '@/components/formRelated/LabelledTextArea';
import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { NavLink } from 'react-router';
import { CLIENT_ROUTES } from '@/routes';
import { useCreateQuestion } from '../hooks/useCreateQuestion';
import { SubmitButton } from '@/components/buttons/SubmitButton';

export const QuestionForm = ({
    refreshQuestions,
}: {
    refreshQuestions: () => Promise<void>;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(QuestionSchema) });

    const { isLoggedIn } = useAuthContext();
    const { createQuestion } = useCreateQuestion(refreshQuestions);

    const onSubmit = async (data: QuestionValues) => {
        const result = await createQuestion(data);
        if (result.success) reset();
    };

    return (
        <div>
            {isLoggedIn ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form rounded-t-none border-0 shadow-xl py-6 "
                >
                    <h1>Ask a question</h1>
                    <div className="input-container">
                        <LabelledInput
                            labelText="Question title:"
                            errors={errors}
                            register={register}
                            name="title"
                            placeholder="What is your question?"
                        />

                        <LabelledTextArea
                            labelText="Description:"
                            errors={errors}
                            register={register}
                            placeholder="Describe the question and the solutions you have tried"
                            name="description"
                        />
                    </div>
                    <SubmitButton text="Post question" />
                </form>
            ) : (
                <p className="text-center py-8 px-12 text-xl shadow-xl rounded-small">
                    <NavLink to={CLIENT_ROUTES.LOG_IN}>Log in</NavLink> to ask
                    questions
                </p>
            )}
        </div>
    );
};
