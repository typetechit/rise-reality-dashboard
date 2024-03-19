<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FaqTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqData = $this->getFaqData();

        DB::table('faqs')->insert($faqData);
    }

    private function getFaqData()
    {
        return [
            [
                'question' => 'What types of commercial properties does Rise Realty offer in Miami/South Florida?',
                'answer' => 'Rise Realty offers a diverse range of commercial properties in Miami/South Florida, including office spaces, retail storefronts, industrial warehouses, and more. Whether you\'re looking to lease or purchase, our team can assist you in finding the perfect space for your business.',
                'serial' => 1
            ],
            [
                'question' => 'How does Rise Realty ensure the best investment opportunities in Miami/South Florida?',
                'answer' => 'Our market analysis services provide valuable insights into the real estate market trends, property values, and investment opportunities in Miami/South Florida. We use advanced tools and thorough research to help clients make informed decisions and optimize their investment returns.',
                'serial' => 2
            ],
            [
                'question' => 'What are the benefits of using Rise Realty for corporate relocation in Miami/South Florida?',
                'answer' => 'Rise Realty offers expert corporate relocation services tailored to the needs of businesses in Miami/South Florida. Our team assists with property search, lease negotiation, and relocation logistics to ensure a seamless transition for your company.',
                'serial' => 3
            ],
            [
                'question' => 'Does Rise Realty assist with residential real estate in Miami/South Florida?',
                'answer' => 'Rise Realty specializes in residential real estate in the Miami/South Florida area. Our experienced team can help you buy, sell, or lease properties such as condos, single-family homes, and apartments. We provide personalized service and expert guidance throughout the entire process.',
                'serial' => 4
            ],
            [
                'question' => 'What types of properties do Rise Realty specialize in?',
                'answer' => 'Rise Realty specializes in residential and commercial real estate, offering a wide range of properties including homes, condos, apartments, office spaces, retail storefronts, and industrial warehouses.',
                'serial' => 5
            ],
            [
                'question' => 'Where does Rise Realty operate?',
                'answer' => 'Rise Realty operates primarily in the vibrant real estate markets of Miami and South Florida, serving clients across the region.',
                'serial' => 6
            ],
            [
                'question' => 'How can I search for properties on the Rise Realty website?',
                'answer' => 'You can search for properties on the Rise Realty website by using our advanced search filters to narrow down your options based on criteria such as location, property type, price range, and amenities.',
                'serial' => 7
            ],
            [
                'question' => 'Does Rise Realty offer assistance with financing for property purchases?',
                'answer' => 'Yes, Rise Realty provides access to equity and debt financing options for both residential and commercial real estate transactions, helping clients secure the necessary funds for their investments.',
                'serial' => 8
            ],
            [
                'question' => 'How does Rise Realty ensure a smooth buying or selling process for clients?',
                'answer' => 'Rise Realty\'s experienced team guides clients through every step of the buying or selling process, providing expert advice, negotiating favorable terms, and ensuring that all transactions are completed efficiently and effectively.',
                'serial' => 9
            ],
            [
                'question' => 'What sets Rise Realty apart from other real estate agencies?',
                'answer' => 'Rise Realty stands out for its commitment to personalized service, local expertise, and dedication to helping clients achieve their real estate goals. We prioritize client satisfaction and strive to exceed expectations in every transaction.',
                'serial' => 10
            ],
            [
                'question' => 'Can Rise Realty help with lease negotiation for residential and commercial properties?',
                'answer' => 'Yes, Rise Realty\'s experienced team can assist with lease negotiation for both residential and commercial properties in Miami/South Florida. We leverage our market knowledge and negotiation skills to secure favorable terms for our clients.',
                'serial' => 11
            ],
            [
                'question' => 'How do I get started with Rise Realty for my real estate needs in Miami/South Florida?',
                'answer' => 'Getting started with Rise Realty is easy! Simply contact us through our website or give us a call to schedule a consultation. Our team will be happy to discuss your real estate goals and tailor our services to meet your specific needs in the Miami/South Florida area.',
                'serial' => 12
            ],
        ];
    }
}
