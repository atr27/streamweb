import ReactPlayer from "react-player";
import { Link } from "@inertiajs/react";

export default function Show() {
    return (
        <>
            <section
                class="watching-page relative mx-auto w-screen h-screen font-poppins bg-form-bg"
                id="stream"
            >
               <div className="pt-[100px]">
               <ReactPlayer
                    url={"https://www.youtube.com/watch?v=mqqft2x_Aa4"}
                    controls
                    width={"100%"}
                    height={"835px"}
               />
               </div>

                {/* <!-- Button back to dashboard --> */}
                <div class="absolute left-5 top-5 z-20">
                    <Link href={route("auth.dashboard")}>
                        <img
                            src="/icons/ic_arrow-left.svg"
                            class="btn-back w-[46px] transition-all"
                            alt="stream"
                        />
                    </Link>
                </div>

                {/* <!-- Video Title --> */}
                <div class="title-video absolute left-1/2 top-7 max-w-[310px] -translate-x-1/2 text-center md:max-w-[620px]">
                    <span class="select-none text-2xl font-medium text-white drop-shadow-md transition-all">
                        Details Screen Part Final
                    </span>
                </div>
            </section>
        </>
    );
}
