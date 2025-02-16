<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SubscriptionPlan;

class SubscriptionPlanTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subscriptionPlans = [
            [
                'name' => 'Basic',
                'price' => 250000,
                'duration_in_months' => 3,
                'features' => json_encode([
                    'feature1',
                    'feature2',
                ])
            ],
            [
                'name' => 'Premium',
                'price' => 600000,
                'duration_in_months' => 6,
                'features' => json_encode([
                    'feature1',
                    'feature2',
                    'feature3',
                    'feature4',
                ])
            ]
        ];

        SubscriptionPlan::insert($subscriptionPlans);
    }
}
