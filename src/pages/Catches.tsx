import { useState } from 'react';
import { CatchCard, type CatchValues } from '../components/cards/CatchCard';

export const Catches = () => {
    const [posts, setPosts] = useState<CatchValues[]>([
        {
            authorName: 'mihail',
            coordinates: [42.335, 23.083],
            title: 'I caught a big fish ',
            imgLink:
                'https://content.osgnetworks.tv/infisherman/content/photos/Fall-Pike-Just-Right-LEAD.JPG',
        },
        {
            authorName: 'mihail',
            coordinates: [43.0, -87.0],
            title: 'Ended the day at lake Michigan with a nice bass',
            imgLink:
                'https://www.strikeking.com/contentassets/4aba65e48f11486394435bfd5c8a334b/angler_holding_large_fish.jpg',
        },
        {
            authorName: 'Maria',
            coordinates: [42.335, 23.083],
            title: "The biggest catfish I've ever caught",
            imgLink:
                'https://midwestoutdoors.com/wp-content/uploads/2019/10/Durick-Advanced-Catfishing1500x1000.jpg',
        },
    ]);

    return (
        <main className=" flex flex-col items-center">
            <h1>Recent catches</h1>
            <section className="flex flex-col w-2/3 gap-10 ">
                {posts.map((post) => (
                    <CatchCard {...post} />
                ))}
            </section>
        </main>
    );
};
