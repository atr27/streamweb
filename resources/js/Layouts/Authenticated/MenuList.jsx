import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faDownload, faMessage, faCreditCard, faRightFromBracket, faChartLine, faUser } from '@fortawesome/free-solid-svg-icons';
import { router } from '@inertiajs/react';

export const UserMenu = [
    {
        icon: ({isActive}) => (
            <FontAwesomeIcon 
                icon={faHome}
                className={`${isActive ? 'text-yellow-500' : 'text-black group-hover:text-yellow-500'}`}
                size="lg"
            />
        ),
        text: 'Discover',
        path: '/dashboard'
    },
    {
        icon: ({isActive}) => (
            <FontAwesomeIcon 
                icon={faHeart}
                className={`${isActive ? 'text-yellow-500' : 'text-black group-hover:text-yellow-500'}`}
                size="lg"
            />
        ),
        text: 'Your Favorites',
        path: '#!'
    },
    {
        icon: ({isActive}) => (
            <FontAwesomeIcon 
                icon={faDownload}
                className={`${isActive ? 'text-yellow-500' : 'text-black group-hover:text-yellow-500'}`}
                size="lg"
            />
        ),
        text: 'Downloads',
        path: '#!'
    },
    {
        icon: ({isActive}) => (
            <FontAwesomeIcon 
                icon={faMessage}
                className={`${isActive ? 'text-yellow-500' : 'text-black group-hover:text-yellow-500'}`}
                size="lg"
            />
        ),
        text: 'Messages',
        path: '#!'
    },
];

export const OtherMenu = [
    {
        icon: ({isActive}) => (
            <FontAwesomeIcon 
                icon={faCreditCard}
                className={`${isActive ? 'text-yellow-500' : 'text-black group-hover:text-yellow-500'}`}
                size="lg"
            />
        ),
        text: 'Payment',
        path: '/dashboard/subscription-plan'
    },
    {
        icon: ({isActive}) => (
            <FontAwesomeIcon 
                icon={faChartLine}
                className={`${isActive ? 'text-yellow-500' : 'text-black group-hover:text-yellow-500'}`}
                size="lg"
            />
        ),
        text: 'Analytics',
        path: '#!'
    },
    {
        icon: ({isActive}) => (
            <FontAwesomeIcon 
                icon={faUser}
                className={`${isActive ? 'text-yellow-500' : 'text-black group-hover:text-yellow-500'}`}
                size="lg"
            />
        ),
        text: 'Your Profile',
        path: '#!'
    },
    {
        icon: ({isActive}) => (
            <FontAwesomeIcon 
                icon={faRightFromBracket}
                className={`${isActive ? 'text-yellow-500' : 'text-black group-hover:text-yellow-500'}`}
                size="lg"
            />
        ),
        text: 'Logout',
        onClick: () => router.post(route('logout'))
    }
]
