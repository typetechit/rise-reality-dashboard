<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Property;
use App\Models\Settings\Category;

class APIWebsiteController extends Controller
{
    public function getFilterOptions(): \Illuminate\Http\JsonResponse
    {
        $listingTypes = collect(config('property.listingsTypes'))
            ->map(function($item){
                return [
                    'value' => $item,
                    'label' => $item
                ];
            })->toArray();

        $categories = Category::query()
            ->select(['id', 'name'])
            ->where('type', 'property')
            ->latest()
            ->get();

        $cities = City::query()
            ->with(['areas'])
            ->orderBy('name')
            ->get();

        $propertyPriceRange = [
            Property::min('price'),
            Property::max('price'),
        ];

        return response()->json([
            'price_range' => $propertyPriceRange,
            'listingTypes' => $listingTypes,
            'categories' => $categories,
            'CitiesWithAreas' => $cities,
        ]);
    }
}
