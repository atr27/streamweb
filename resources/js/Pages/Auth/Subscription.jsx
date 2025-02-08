import AuthenticatedLayout from '@/Layouts/Authenticated/Index';
import SubscriptionCard from '@/Components/SubscriptionCard';

export default function Subscription() {
    return (
        <AuthenticatedLayout>
            <div className="mx-auto max-w-[1440px] px-[50px]">
                <div className="flex flex-col items-center py-20">
                    <div className="mb-3 text-[26px] font-semibold text-black">
                        Pricing for Everyone
                    </div>
                    <p className="max-w-[302px] text-center text-base leading-7 text-gray-1">
                        Invest your little money to get a whole new experiences
                        from movies.
                    </p>

                    {/* <!-- Pricing Card --> */}
                    <div className="mt-[70px] flex justify-center gap-10">
                        {/* <!-- Basic --> */}
                        <SubscriptionCard 
                            name="Basic"
                            price={299000}
                            duration="3"
                            features={[
                                'Unlock 10 basic movies',
                                'Up to 3 users',
                                'Support 24/7 ready',
                            ]}
                        
                        />

                        {/* <!-- For Greatest --> */}
                        <SubscriptionCard isPremium 
                            name="For Greatest"
                            price={599000}
                            duration="6"
                            features={[
                                'Unlock 200 awards movies',
                                '180 subtitles available',
                                'iOS, Android, TV',
                                'Offline Mode',
                                'Up to 20 users',
                                'Support 24/7 ready',
                            ]}
                            onSelectSubscription={() => {}}
                        />
                    </div>
                    {/* <!-- /Pricing Card --> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
