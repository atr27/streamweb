import Sidebar from "@/Layouts/Authenticated/Sidebar";
import Topbar from "@/Layouts/Authenticated/Topbar";

export default function AuthenticatedLayout({ children, auth }) {
    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <div className="hidden lg:block">
                <Sidebar auth={auth} />
            </div>

            <div className="w-full lg:pl-[300px]">
                <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
                    <div className="flex flex-col gap-[30px] lg:gap-[50px] py-6 lg:py-10">
                        <Topbar name={auth.user.name} auth={auth} />
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </div>
    );
}
