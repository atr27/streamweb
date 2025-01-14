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
        </>
    );
}
