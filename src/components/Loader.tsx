import poleSVG from '../assets/pole.svg';

export const Loader = () => {
    return (
        <section className="size-full flex flex-col items-center justify-center backdrop-blur-3xl  ">
            <img
                src={poleSVG}
                alt="Fishing pole"
                className=" animate-pulse w-40"
            />
            <p className="text-primary text-lg  font-medium ">
                Loading, please wait...
            </p>
        </section>
    );
};
