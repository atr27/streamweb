import CardMovie from '@/Components/CardMovie';
import FeaturedMovie from '@/Components/FeaturedMovie';
import AuthenticatedLayout from '@/Layouts/Authenticated/Index';
import { Head } from '@inertiajs/react';
import Flickity from 'react-flickity-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export default function Dashboard({ auth, featuredMovies, movies, flash }) {
    const flickityOptions = {
        cellAlign: 'left',
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: '>1',
        freeScroll: true,
        freeScrollFriction: 0.075
    };

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
    }, [flash?.message]);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
                <title>Dashboard</title>
            </Head>
            <ToastContainer position="top-right" autoClose={3000} />
            <div>
                <div className="mb-4 text-[22px] font-semibold text-black">
                    Featured Movies
                </div>
                <Flickity className="gap-[30px]" options={flickityOptions}>
                    {featuredMovies.map((movie) => (
                        <FeaturedMovie
                            key={movie.id}
                            slug={movie.slug}
                            name={movie.title}
                            category={movie.genre}
                            thumbnail={movie.thumbnail}
                            rating={movie.rating}
                        />
                    ))}
                </Flickity>
            </div>
            <div className="mt-[50px]">
                <div className="mb-4 text-[22px] font-semibold text-black">
                    Browse
                </div>
                <Flickity 
                    className="gap-[30px] overflow-hidden" 
                    options={{
                        ...flickityOptions,
                        groupCells: true,
                        adaptiveHeight: true
                    }}
                    static
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className="mr-5 w-[232px]">
                            <CardMovie
                                slug={movie.slug}
                                name={movie.title}
                                category={movie.genre}
                                thumbnail={movie.thumbnail}
                                rating={movie.rating}
                            />
                        </div>
                    ))}
                </Flickity>
            </div>
        </AuthenticatedLayout>
    );
}
