import { useForm } from 'react-hook-form';
import { LabelledInput } from './LabelledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    QuestionSchema,
    type QuestionValues,
} from '../../schemas/questions/QuestionSchema';
import { LabelledTextArea } from './LabelledTextArea';
import { useAuthContext } from '../../contexts/auth/useAuthContext';
import { NavLink } from 'react-router';
import { clientRoutes } from '../../routes';

export const QuestionForm = ({
    createQuestion,
}: {
    createQuestion: (
        data: QuestionValues,
        onSuccess: () => void,
    ) => Promise<void>;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(QuestionSchema) });

    const { isLoggedIn } = useAuthContext();

    const onSubmit = async (data: QuestionValues) => {
        await createQuestion(data, () => {
            reset();
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="form rounded-t-none border-0 shadow-xl py-8 "
        >
            {isLoggedIn ? (
                <>
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
                    <input type="submit" />
                </>
            ) : (
                <p className="text-center">
                    <NavLink to={clientRoutes.LOG_IN}>Log in</NavLink> to ask
                    questions
                </p>
            )}
        </form>
    );
};
