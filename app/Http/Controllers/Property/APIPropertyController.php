<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\Settings\Category;
use Illuminate\Http\Request;

class APIPropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $propertiesQuery = Property::query()
            ->with(['user:id,name,email,image,description,social_links', 'category:id,name']);

        if($request->get('search')){
            $propertiesQuery->where('title', 'like', '%' . $request->get('search') . '%')
                ->orWhere('description', 'like', '%' . $request->get('search') . '%');
        }

        if($request->exists('listing')){
            $listingsArr = explode(',', $request->get('listing'));
            $propertiesQuery->whereIn('listing_type', $listingsArr);
        }

        if($request->exists('property')){
            $categoryNamesArr = explode(',', $request->get('property'));
            $categoryIds = Category::query()
                ->where('type', 'property')
                ->whereIn('name', $categoryNamesArr)
                ->pluck('id')
                ->unique()
                ->toArray();

            $propertiesQuery->whereIn('category_id', $categoryIds);
        }

        if($request->exists('min') && $request->exists('max')){
            $min = (int) $request->get('min');
            $max = (int) $request->get('max');
            $priceRange = [$min, $max];

            $propertiesQuery->whereBetween('price', $priceRange);
        }

        if($request->exists('is_featured')){
            $propertiesQuery->where('is_featured', $request->get('is_featured'));
        }

        $paginate = $request->get('paginate', 20);

        $properties = $propertiesQuery
            ->latest()
            ->paginate($this->paginationCount);

        return response()->json($properties);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        $property->load(['user', 'category:id,name']);

        return response()->json($property);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
