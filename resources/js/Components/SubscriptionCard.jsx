import Button from './PrimaryButton';

export default function SubscriptionCard({
    id,
    name,
    price,
    duration,
    features,
    isPremium,
    onSelectSubscription,
}) {
    return (
        <>
            {/* <!-- Basic --> */}
            {!isPremium && (
                <div className="flex w-[300px] flex-col gap-[30px] rounded-[26px] px-7 py-[30px] text-black outline outline-1 outline-[#F1F1F1]">
                    <div>
                        <div className="mb-2 text-sm">{name}</div>
                        <div className="text-[28px] font-bold">
                            IDR {price.toLocaleString()}
                        </div>
                        <p className="text-xs font-light text-gray-1">
                            /{duration} months
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {features.map((feature, index) => (
                            <div
                                className="flex items-center gap-2"
                                key={`feature-${id}-${index}`}
                            >
                                <img src="/icons/ic_tick.svg" alt="" />
                                <span className="text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div onClick={onSelectSubscription}>
                        <Button type="button" variant="white-outline">
                            <span className="text-base">Start {name}</span>
                        </Button>
                    </div>
                </div>
            )}

            {/* <!-- For Greatest --> */}
            {isPremium && (
                <div className="flex w-[300px] flex-col gap-[30px] rounded-[26px] bg-black px-7 py-[30px] text-white outline outline-1 outline-[#F1F1F1]">
                    <div className="max-w-max rounded-full bg-yellow-500 p-[13px]">
                        <img src="/icons/ic_star.svg" width="24" alt="" />
                    </div>

                    <div>
                        <div className="mb-2 text-sm">{name}</div>
                        <div className="text-[28px] font-bold">
                            IDR {price.toLocaleString()}
                        </div>
                        <p className="text-xs font-light text-[#767676]">
                            /{duration} months
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {features.map((feature, index) => (
                            <div className="flex items-center gap-2" key={`feature-${id}-${index}`}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.4402 12.0001L10.8142 14.3731L15.5602 9.62708"
                                        strokeWidth="1.5"
                                        strokeLineCap="round"
                                        strokeLineJoin="round"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2.7498 12.0001C2.7498 18.9371 5.0628 21.2501 11.9998 21.2501C18.9368 21.2501 21.2498 18.9371 21.2498 12.0001C21.2498 5.06312 18.9368 2.75012 11.9998 2.75012C5.0628 2.75012 2.7498 5.06312 2.7498 12.0001Z"
                                        strokeWidth="1.5"
                                        strokeLineCap="round"
                                        strokeLineJoin="round"
                                    />
                                </svg>
                                <span className="text-sm">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div onClick={onSelectSubscription}>
                        <Button
                            type="button"
                            variant="primary"
                        >
                            <span className="text-base font-semibold">
                                Subscribe Now
                            </span>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
