import SubscriptionDetail from '@/Layouts/Authenticated/SubscriptionDetail';
import { Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome,
    faStar,
    faUser,
    faSignOutAlt,
    faCreditCard,
    // Tambahkan icon lain yang diperlukan
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({ auth, onClose = null, isMobile = false }) {
    const defaultPlan = {
        name: 'Free Plan',
        activeDay: 0,
        remainingActiveDay: 0,
        isPremium: false,
    };

    const activePlan = auth?.activePlan ?? defaultPlan;

    const navigation = [
        { 
            name: 'Dashboard', 
            href: route('user.dashboard'),
            icon: <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
        },
        {
            name: 'Favorites',
            href: route('user.favorites.index'),
            icon: <FontAwesomeIcon icon={faStar} className="w-5 h-5" />
        },
        {
            name: 'Payment',
            href: route('user.subscription.index'),
            icon: <FontAwesomeIcon icon={faCreditCard} className="w-5 h-5" />
        },
        { 
            name: 'Profile', 
            href: route('user.profile'),
            icon: <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
        },
        {
            name: 'Logout',
            href: route('logout'),
            icon: <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
        }
    ];

    const sidebarClasses = `${isMobile ? 'fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out' : 'fixed left-0 top-0'} h-full w-[300px] overflow-y-auto bg-white p-6 shadow-[5px_0_30px_0_rgba(0,0,0,0.05)]`;

    return (
        <>
            {isMobile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
            )}
            <div className={sidebarClasses}>
                {/* Logo */}
                <div className="flex items-center justify-between">
                    <Link href={route('user.dashboard')}>
                        <h1 className="text-2xl font-bold">
                            StreamWeb
                        </h1>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="mt-[50px] flex flex-col gap-[10px]">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            method={item.name === 'Logout' ? 'post' : 'get'}
                            as={item.name === 'Logout' ? 'button' : undefined}
                            className="flex items-center gap-[10px] rounded-full px-6 py-2 transition-all text-black hover:text-primary hover:bg-primary/5"
                        >
                            {item.icon}
                            <div className="text-base">{item.name}</div>
                        </Link>
                    ))}
                </div>
                {/* Subscription Detail - pastikan auth diteruskan dengan benar */}
                <SubscriptionDetail auth={{ ...auth, activePlan }} />
            </div>
        </>
    );
}

const MobileSidebar = ({ auth, onClose }) => {
    return (
        <Sidebar auth={auth} onClose={onClose} isMobile={true} />
    );
}

export { MobileSidebar };