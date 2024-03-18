<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\PropertyCreateRequest;
use App\Models\Category;
use App\Models\Country;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::query()
            ->with(['user:id,name,email,phone', 'category:id,name'])
            ->latest()
            ->paginate(25);
//        return response()->json($properties);
        return inertia('Properties/Index', [
			'properties' => $properties
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $availableListingTypes = ['Exclusive Listing', 'Lease', 'Rental', 'Sale'];
        $availableAmenities = Property\Amenity::query()
            ->select(['id', 'name'])
            ->latest()
            ->get();

        $availableCategories = Category::query()
            ->with('attributes:id,name,icon')
            ->where('type', 'property')
            ->orderBy('name')
            ->get();

        return inertia('Properties/Create', [
            'listingTypes' => $availableListingTypes,
            'amenities' => $availableAmenities,
            'categories' => $availableCategories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PropertyCreateRequest $request)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validationData();

            $newPropertyData = [
                'user_id' => auth()->id(),
                'country_id' => optional(Country::first())->id,
                'category_id' => $validatedData['category']['id'],
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'content' => $validatedData['content'],
                'featured_image' => $validatedData['featured_image'],
                'is_published' => $validatedData['is_published'],
                'price' => $validatedData['price'],
                'location' => $validatedData['location'],
                'mls_code' => $validatedData['mls_code'],
                'build_year' => $validatedData['build_year'],
                'property_size' => $validatedData['property_size'],
                'is_featured' => $validatedData['is_featured'],
                'listing_type' => $validatedData['listing_type'],
                'amenities' => $validatedData['amenities'],
                'category_attributes' => $validatedData['category_attributes'],
            ];

            $newProperty = $request->user()->properties()
                ->create($newPropertyData);

            DB::commit();

            return to_route('properties.index');
        }catch (\Exception $e){
            DB::rollBack();
            dd($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
