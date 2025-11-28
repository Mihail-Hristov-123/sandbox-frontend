import { OptionsMenu } from '@/components/OptionsMenu';
import { CLIENT_ROUTES } from '@/routes';
import { Link } from 'react-router';

interface SectionProps {
    title: string;
    text: string;
    path: string;
    buttonText: string;
    className: string;
}

const Section = ({
    title,
    text,
    path,
    buttonText,
    className,
}: SectionProps) => {
    return (
        <section
            className={`px-20 space-y-6 py-16 ${className} max-lg:text-center max-xl:px-8 `}
        >
            <h2 className="text-4xl font-semibold">{title}</h2>

            <p className="text-xl">{text}</p>
            <button className="bg-accent text-primary px-6 py-3 rounded-4xl">
                <Link
                    to={path}
                    className="hover:text-primary text-xl no-underline"
                >
                    {buttonText}
                </Link>
            </button>
        </section>
    );
};

export const Home = () => (
    <main className="min-h-[130vh] pb-0">
        <div className="bg-cover bg-fixed h-[70vh] bg-[url('/landing-background.jpg')] max-lg:bg-center">
            <div className="backdrop-brightness-67 size-full flex flex-col justify-center text-white text-center px-10">
                <h1 className="text-white text-5xl max-sm:text-3xl font-extrabold capitalize">
                    The tackle box: where anglers meet
                </h1>
                <p className="text-2xl">
                    Find the best spots and tips for your next fishing adventure
                </p>
            </div>
        </div>
        <OptionsMenu />
        <Section
            title="Top Fishing Locations"
            text="Can't seem to find the fish? Discover the spots where others are reeling them in."
            path={CLIENT_ROUTES.CATCHES}
            buttonText="Explore spots"
            className="bg-primary text-white"
        />
        <Section
            title="Learn and Contribute"
            text="Got fishing questions or tips to share? Join the community and help others while getting expert advice."
            path={CLIENT_ROUTES.QUESTIONS}
            buttonText="View questions"
            className="text-right"
        />
    </main>
);
