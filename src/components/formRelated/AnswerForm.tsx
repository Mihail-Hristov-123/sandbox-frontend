import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { LabelledTextArea } from './LabelledTextArea';
import { useAuthContext } from '../../contexts/auth/useAuthContext';
import { NavLink } from 'react-router';
import { clientRoutes } from '../../routes';

import {
    AnswerSchema,
    type AnswerValues,
} from '../../schemas/questions/CommentSchema';

export const AnswerForm = ({
    closeModal,
    questionId,
    createAnswer,
}: {
    closeModal: () => void;
    questionId: number;
    createAnswer: (
        data: AnswerValues,
        questionId: unknown,
        onSuccess: () => void,
    ) => Promise<void>;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(AnswerSchema) });

    const { isLoggedIn } = useAuthContext();

    const onSubmit = async (data: AnswerValues) => {
        await createAnswer(data, questionId, () => {
            (reset(), closeModal());
        });
    };

    return (
        <div>
            {isLoggedIn ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-12 min-w-[40vw]"
                >
                    <h2 className="text-center text-3xl">Ask a question</h2>
                    <div className=" px-14 space-y-12">
                        <LabelledTextArea
                            labelText="Your answer:"
                            errors={errors}
                            register={register}
                            name="content"
                        />
                    </div>
                    <input type="submit" />
                </form>
            ) : (
                <p className="text-center py-4 px-12 text-xl">
                    <NavLink to={clientRoutes.LOG_IN}>Log in</NavLink> to access
                    this feature.
                </p>
            )}
        </div>
    );
};
