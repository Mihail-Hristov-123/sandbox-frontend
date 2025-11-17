import { Loader } from '@/components/Loader';
import { CatchCard } from './components/CatchCard';
import { CatchForm } from './components/CatchForm';

import { useLoadCatches } from './hooks/useLoadCatches';

export const Catches = () => {
    const { catches, updateCatches, loading } = useLoadCatches();

    const catchContent = loading ? (
        <Loader />
    ) : catches?.length ? (
        catches.map((catchInfo) => (
            <CatchCard key={catchInfo.title} {...catchInfo} />
        ))
    ) : (
        <p>No catches have been published yet</p>
    );

    return (
        <main className=" flex flex-col items-center">
            <div className="xl:w-2/3">
                <CatchForm updateCatches={updateCatches} />
                <h1 className="pt-20 pb-12">Recent catches</h1>
                <section className="flex flex-col  gap-10 ">
                    {catchContent}
                </section>
            </div>
        </main>
    );
};
