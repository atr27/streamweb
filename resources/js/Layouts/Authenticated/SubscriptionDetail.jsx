import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function SubscriptionDetail({ auth }) {
    const [remainingTime, setRemainingTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [error, setError] = useState(null);
    
    // Initialize subscription data from auth prop
    useEffect(() => {
        if (auth?.activePlan) {
            setSubscriptionData(auth.activePlan);
            setError(null);
        }
    }, [auth]);

    const userName = auth?.user?.name;

    useEffect(() => {
        const calculateTimeLeft = () => {
            if (!subscriptionData?.isPremium) return;

            const now = new Date();
            const expiryDate = new Date(now.getTime() + (subscriptionData.remainingActiveDay * 24 * 60 * 60 * 1000));
            const difference = expiryDate.getTime() - now.getTime();

            if (difference > 0) {
                const newRemainingTime = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                };

                setRemainingTime(newRemainingTime);
            }
        };

        // Calculate time left immediately and then every second
        if (subscriptionData) {
            calculateTimeLeft();
            const timer = setInterval(calculateTimeLeft, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [subscriptionData]);

    if (!auth?.user || !subscriptionData) return null;

    return (
        <div className="mt-8 bg-slate-900 rounded-2xl">
            <div className="rounded-2xl bg-gradient-to-br from-primary/80 to-primary p-6 text-yellow-500">
                <div className="mb-4">
                    <h3 className="text-lg font-bold">{userName}</h3>
                    <p className="text-sm opacity-80">
                        {subscriptionData.name}
                    </p>
                </div>
                
                {error ? (
                    <p className="text-sm text-red-200">{error}</p>
                ) : subscriptionData.isPremium ? (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Total Aktif</span>
                            <span>{subscriptionData.activeDay} hari</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Sisa Hari</span>
                            <span>{subscriptionData.remainingActiveDay} hari</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Status :</span>
                            <span className={`${subscriptionData.isPremium ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`}>{subscriptionData.isPremium ? 'Aktif' : 'Tidak Aktif'}</span>
                        </div>
                    </div>
                ) : (
                    <Link
                        href={route('user.subscription.index')}
                        className="mt-2 block rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-primary transition hover:bg-white/90"
                    >
                        Upgrade ke Premium
                    </Link>
                )}
            </div>
        </div>
    );
}
