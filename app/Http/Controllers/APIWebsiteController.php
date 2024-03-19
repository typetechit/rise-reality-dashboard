<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\City;
use Illuminate\Http\Request;

class APIWebsiteController extends Controller
{
    public function getFilterOptions(): \Illuminate\Http\JsonResponse
    {
        $listingTypes = collect(['Exclusive Listing', 'Lease', 'Rental', 'Sale'])
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

        return response()->json([
            'listingTypes' => $listingTypes,
            'categories' => $categories,
            'CitiesWithAreas' => $cities,
        ]);
    }
}
