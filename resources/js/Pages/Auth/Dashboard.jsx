import CardMovie from '@/Components/CardMovie';
import FeaturedMovie from '@/Components/FeaturedMovie';
import AuthenticatedLayout from '@/Layouts/Authenticated/Index';
import { Head } from '@inertiajs/react';
import Flickity from 'react-flickity-component';

export default function Dashboard() {
    const flickityOptions = {
        cellAlign: 'left',
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: '>1',
    };

    return (
        <AuthenticatedLayout>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
                <title>Dashboard</title>
            </Head>
            <div>
                <div className="mb-4 text-[22px] font-semibold text-black">
                    Featured Movies
                </div>
                <Flickity className="gap-[30px]" options={flickityOptions}>
                    {[1, 2, 3, 4].map((i) => (
                        <FeaturedMovie
                            key={i}
                            slug="the-batman-first"
                            name={`The Batman ${i}`}
                            category="Action"
                            thumbnail="/images/featured-1.png"
                            rating={i + 1}
                        />
                    ))}
                </Flickity>
            </div>
            <div className="mt-[50px]">
                <div className="mb-4 text-[22px] font-semibold text-black">
                    Browse
                </div>
                <Flickity className="gap-[30px]" options={flickityOptions}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <CardMovie 
                            key={i}
                            slug="the-meong-golden"
                            name={`The Meong Golden ${i}`}
                            category="Comedy"
                            thumbnail="/images/browse-1.png"
                        />
                    ))}
                </Flickity>
            </div>
        </AuthenticatedLayout>
    );
}
