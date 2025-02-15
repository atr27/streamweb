import Sidebar from "@/Layouts/Authenticated/Sidebar";
import Topbar from "@/Layouts/Authenticated/Topbar";

export default function AuthenticatedLayout({ children, auth }) {
    return (
        <>
            <div className="max-w-screen mx-auto hidden lg:block">
                {/* START: Sidebar */}
                <Sidebar auth={auth} />
                {/* END: Sidebar */}

                {/* START: Content */}
                <div className="ml-[300px] px-[50px]">
                    <div className="flex flex-col gap-[50px] py-10">
                        {/* START: Top Bar */}
                        <Topbar name={auth.user.name} />
                        {/* END: Top Bar */}
                        <main>{children}</main>
                    </div>
                </div>
                {/* END: Content */}
            </div>

            <div className="mx-auto flex h-screen w-full bg-black px-4 lg:hidden">
                <div className="my-auto text-center text-2xl font-medium leading-snug text-white">
                    Sorry, this page only supported on 1024px screen or above
                </div>
            </div>
        </>
    );
}
