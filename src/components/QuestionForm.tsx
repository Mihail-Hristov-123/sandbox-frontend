import { useForm } from 'react-hook-form';
import arrowDown from '../assets/arrow-down.svg';
import arrowUp from '../assets/arrow-up.svg';
import { LabelledInput } from './form/LabelledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    QuestionSchema,
    type QuestionValues,
} from '../schemas/questions/QuestionSchema';
import { LabelledTextArea } from './form/LabelledTextArea';
import { useState } from 'react';

export const QuestionForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(QuestionSchema) });

    const [expanded, setExpanded] = useState(false);

    const onSubmit = (data: QuestionValues) => {
        console.log(data);
        reset();
        setExpanded(false);
    };

    return (
        <section className="flex flex-col w-2/3 mx-auto">
            <div
                className={`transition-all duration-500 ease-linear overflow-hidden border-gray-700 border-t-0 
                    ${expanded ? ' opacity-100 py-4 px-5 border-2 rounded-b-xl' : 'opacity-0 py-0 px-5'}
                `}
            >
                {expanded && (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <h2 className="text-center text-3xl">Ask a question</h2>
                        <LabelledInput
                            labelText="Question title:"
                            errors={errors}
                            register={register}
                            name="title"
                        />
                        <LabelledTextArea
                            labelText="Description:"
                            errors={errors}
                            register={register}
                            name="description"
                        />
                        <input type="submit" />
                    </form>
                )}
            </div>

            <div className="w-fit mx-auto bg-gray-700 rounded-b-2xl flex items-center gap-2 px-3 py-1">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center group"
                >
                    <span className="text-white text-sm">
                        {expanded ? 'Hide question form' : 'Ask a question'}
                    </span>
                    <img
                        src={expanded ? arrowUp : arrowDown}
                        alt={expanded ? 'Collapse form' : 'Expand form'}
                        className="size-0 opacity-0 group-hover:opacity-100 group-hover:size-5 group-hover:ml-2 transition-all duration-100"
                    />
                </button>
            </div>
        </section>
    );
};
