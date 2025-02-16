import { useState, useEffect } from 'react';

export default function SubscriptionDetail({
    name = 'Free Plan',
    isPremium = false,
    remainingDay = 0,
    activeDay = 0,
}) {
    const [currentRemainingDays, setCurrentRemainingDays] = useState(remainingDay);

    useEffect(() => {
        const updateRemainingDays = () => {
            // Calculate the current remaining days
            const today = new Date();
            const daysPassed = Math.floor((today - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / (1000 * 60 * 60 * 24));
            const newRemainingDays = Math.max(0, remainingDay - daysPassed);
            setCurrentRemainingDays(newRemainingDays);
        };

        // Update immediately
        updateRemainingDays();

        // Update every day at midnight
        const now = new Date();
        const night = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1, // tomorrow
            0, 0, 0 // midnight
        );
        const msToMidnight = night.getTime() - now.getTime();

        // Set timeout for first update at midnight
        const timeoutId = setTimeout(() => {
            updateRemainingDays();
            // Then set interval for subsequent updates
            const intervalId = setInterval(updateRemainingDays, 24 * 60 * 60 * 1000);
            return () => clearInterval(intervalId);
        }, msToMidnight);

        return () => clearTimeout(timeoutId);
    }, [remainingDay]);

    // Calculate percentage safely
    const calculatePercentage = () => {
        if (!activeDay || activeDay === 0) return 0;
        const percentage = Math.floor((currentRemainingDays / activeDay) * 100);
        return Math.min(Math.max(percentage, 0), 100);
    };

    const percentage = calculatePercentage();

    // Style configurations based on plan type
    const styles = {
        basic: {
            container: "flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-lg",
            badge: "rounded-full bg-gradient-to-r from-slate-500 to-slate-600 px-3 py-1 text-xs font-semibold text-white shadow-md",
            numbers: "text-slate-300",
            progress: "bg-gradient-to-r from-slate-500 to-slate-600",
            status: "text-slate-400"
        },
        premium: {
            container: "flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-slate-900 via-[#1a1a2e] to-black p-6 shadow-2xl",
            badge: "rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg",
            numbers: "text-yellow-400",
            progress: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500",
            status: "text-yellow-400"
        }
    };

    const currentStyle = isPremium ? styles.premium : styles.basic;

    return (
        <div className={currentStyle.container}>
            {/* Header with Plan Name and Payment Status */}
            <div className="flex items-center justify-between">
                <div className={currentStyle.badge}>
                    {name}
                </div>
                <div className={`flex items-center gap-2 text-sm font-medium ${currentStyle.status}`}>
                    <span className={`inline-block h-2 w-2 rounded-full ${isPremium ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    {isPremium ? 'Paid' : 'Pending'}
                </div>
            </div>

            {/* Days Information */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        Remaining Days
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-bold ${currentStyle.numbers}`}>
                            {Math.floor(currentRemainingDays)}
                        </span>
                        <span className="text-sm text-slate-400">days</span>
                    </div>
                </div>
                <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        Total Duration
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-bold ${currentStyle.numbers}`}>
                            {Math.floor(activeDay)}
                        </span>
                        <span className="text-sm text-slate-400">days</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400">Progress</span>
                    <span className={currentStyle.numbers}>
                        {percentage}% remaining
                    </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800/50">
                    <div
                        className={`h-full rounded-full ${currentStyle.progress} transition-all duration-500 ease-out`}
                        style={{ width: `${percentage}%` }}
                    >
                        <div className="h-full w-full animate-[progress_1s_linear_infinite] bg-[linear-gradient(45deg,rgba(255,255,255,0.2)25%,transparent25%,transparent50%,rgba(255,255,255,0.2)50%,rgba(255,255,255,0.2)75%,transparent75%,transparent)] bg-[length:8px_8px]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
