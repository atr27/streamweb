import ReactPlayer from "react-player";
import { Link } from "@inertiajs/react";

export default function Show() {
    return (
        <>
            <section
                className="watching-page relative mx-auto w-screen h-screen font-poppins bg-form-bg overflow-hidden"
                id="stream"
            >
                <div className="h-full pt-[90px] overflow-hidden">
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=mqqft2x_Aa4"
                        controls
                        width="100%"
                        height="calc(100vh - 100px)"
                        className="react-player"
                    />
                </div>

                {/* Back to dashboard button */}
                <div className="absolute left-5 top-5 z-20">
                    <Link href={route("auth.dashboard")}>
                        <img
                            src="/icons/ic_arrow-left.svg"
                            className="btn-back w-[46px] transition-all"
                            alt="Back to dashboard"
                        />
                    </Link>
                </div>

                {/* Video Title */}
                <div className="title-video absolute left-1/2 top-7 max-w-[310px] -translate-x-1/2 text-center md:max-w-[620px]">
                    <span className="select-none text-2xl font-medium text-white drop-shadow-md transition-all">
                        Details Screen Part Final
                    </span>
                </div>
            </section>
            {/* Movie Description Section */}
            <section className="movie-description bg-form-bg py-10 px-5 md:px-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-white text-2xl font-semibold mb-6">Movie Details</h2>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Movie Poster */}
                        <div className="w-full md:w-1/4">
                            <img 
                                src="/images/featured-1.png" 
                                alt="Movie Poster" 
                                className="w-full rounded-md shadow-lg"
                            />
                        </div>
                        {/* Movie Information */}
                        <div className="w-full md:w-3/4">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-white text-xl font-medium">Details Screen Part Final</h3>
                                    <p className="text-gray-300 mt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <span className="text-gray-400 block">Genre</span>
                                        <span className="text-white">Action</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block">Duration</span>
                                        <span className="text-white">2h 13m</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block">Year</span>
                                        <span className="text-white">2024</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block">Rating</span>
                                        <span className="text-white">4.5/5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
