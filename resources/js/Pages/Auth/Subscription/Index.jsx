import AuthenticatedLayout from '@/Layouts/Authenticated/Index';
import SubscriptionCard from '@/Components/SubscriptionCard';
import { router } from '@inertiajs/react';

export default function Subscription({auth, subscriptionPlans}) {
   const selectSubscriptionPlan = id => {
        router.post(route('user.subscription.userSubscribe', {
            subscriptionPlan: id
        }));
   }

    return (
        <AuthenticatedLayout auth={auth}>
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
                        {subscriptionPlans.map((subscriptionPlan) => (
                            <SubscriptionCard 
                                key={subscriptionPlan.id}
                                name={subscriptionPlan.name}
                                price={subscriptionPlan.price}
                                duration={subscriptionPlan.duration_in_months}
                                features={JSON.parse(subscriptionPlan.features)}
                                isPremium={subscriptionPlan.name === 'Premium'}
                                onSelectSubscription={() => selectSubscriptionPlan(subscriptionPlan.id)}
                            />
                        ))}
                    </div>
                    {/* <!-- /Pricing Card --> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
