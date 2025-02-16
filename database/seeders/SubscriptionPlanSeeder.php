<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SubscriptionPlan;

class SubscriptionPlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'id' => 1,
                'name' => 'Basic Plan',
                'price' => 300000,
                'duration_in_months' => 1,
                'features' => json_encode([
                    'HD Streaming',
                    'Watch on any device',
                    'Cancel anytime'
                ])
            ],
            [
                'id' => 2,
                'name' => 'Premium Plan',
                'price' => 600000,
                'duration_in_months' => 6,
                'features' => json_encode([
                    'Ultra HD Streaming',
                    'Watch on any device',
                    'Cancel anytime',
                    'Download for offline',
                    'Family sharing'
                ])
            ],
            [
                'id' => 3,
                'name' => 'Pro Plan',
                'price' => 1000000,
                'duration_in_months' => 12,
                'features' => json_encode([
                    'Ultra HD Streaming',
                    'Watch on any device',
                    'Cancel anytime',
                    'Download for offline',
                    'Family sharing',
                    'Priority support',
                    'Early access'
                ])
            ],
        ];

        foreach ($plans as $plan) {
            SubscriptionPlan::updateOrCreate(
                ['id' => $plan['id']],
                $plan
            );
        }
    }
}
