import SubscriptionDetail from '@/Layouts/Authenticated/SubscriptionDetail';
import { Link, usePage } from '@inertiajs/react';
import MenuItem from './MenuItem';
import { OtherMenu, UserMenu } from './MenuList';

export default function Sidebar({ auth }) {
    // Get subscription data from auth.activePlan with default values
    const activePlan = auth?.activePlan || {
        name: 'Free Plan',
        activeDay: 0,
        remainingActiveDay: 0,
        isPremium: false,
    };

    // Get current URL from Inertia
    const { url } = usePage();

    return (
        <>
            <aside className="fixed z-50 h-full w-[300px] bg-white">
                <div className="flex h-full flex-col overflow-y-auto border-r border-[#F1F1F1] p-[30px]">
                    <Link href="/" className="transition-all hover:opacity-80">
                        <h1 className="text-3xl font-semibold text-black">
                            Stream Web
                        </h1>
                    </Link>
                    <div className="links mt-[60px] flex h-full flex-col gap-[50px]">
                        <div>
                            <div className="mb-4 text-sm text-gray-1">Menu</div>
                            {UserMenu.map((menu, index) => (
                                <MenuItem
                                    key={index}
                                    icon={menu.icon}
                                    text={menu.text}
                                    isActive={menu.path === url}
                                    path={menu.path || '#'}
                                />
                            ))}
                        </div>

                        <div>
                            <div className="side-link mb-4 text-sm text-gray-1">
                                Others
                            </div>

                            {OtherMenu.map((menu, index) => (
                                <MenuItem
                                    key={index}
                                    icon={menu.icon}
                                    text={menu.text}
                                    isActive={menu.path === url}
                                    path={menu.path || '#'}
                                    onClick={menu.onClick}
                                />
                            ))}

                            <div className="mt-4">
                                <SubscriptionDetail
                                    name={activePlan.name}
                                    isPremium={activePlan.isPremium}
                                    remainingDay={activePlan.remainingActiveDay}
                                    activeDay={activePlan.activeDay}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
