<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\PropertyCreateRequest;
use App\Http\Requests\Property\PropertyUpdateRequest;
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
    public function index(Request $request)
    {
        $properties = [];

        if($request->user()->role === 'ADMIN'){
            $properties = Property::query()
                ->with(['user:id,name,email,phone', 'category:id,name'])
                ->latest()
                ->paginate(25);
        }else if($request->user()->role === 'PROPERTY_AGENT'){
            $properties = Property::query()
                ->with(['user:id,name,email,phone', 'category:id,name'])
//                ->where('user_id', auth()->id())
                ->latest()
                ->paginate(25);
        }

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
                'featured_image' => null,
                'is_published' => $validatedData['is_published'],
                'price' => $validatedData['price'],
                'location' => $validatedData['location'],
                'map_url' => $validatedData['map_url'],
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

            $updatableData = [];

            if($request->hasFile('featured_image')){
                $featuredImagePath = $request->file('featured_image')->store('property_images', 'public');
                $updatableData['featured_image'] = $featuredImagePath;
            }

            if($request->hasFile('gallery_images')){

                $files = $request->file('gallery_images');
                $filesPathLinks = [];

                foreach($files as $file){
                    $filesPathLinks[] = $file->store('property_gallery_images', 'public');
                }

                $filesPathLinks = collect($filesPathLinks)->map(function($link) {
                    return asset('storage/'.$link);
                });

                $updatableData['gallery_images'] = $filesPathLinks;
            }

            if(count($request->video_links) > 0){
                $updatableData["video_links"] = $request->video_links;
            }

            $newProperty->update($updatableData);

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
    public function edit(Property $property)
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

        return inertia('Properties/Edit', [
            'property' => $property,
            'listingTypes' => $availableListingTypes,
            'amenities' => $availableAmenities,
            'categories' => $availableCategories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PropertyUpdateRequest $request, Property $property)
    {
        DB::beginTransaction();

        try {
            $validatedData = $request->validationData();
            dd($validatedData);

            $updatableData = [
                'category_id' => $validatedData['category']['id'],
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'content' => $validatedData['content'],
                'is_published' => $validatedData['is_published'],
                'price' => $validatedData['price'],
                'location' => $validatedData['location'],
                'map_url' => $validatedData['map_url'],
                'mls_code' => $validatedData['mls_code'],
                'build_year' => $validatedData['build_year'],
                'property_size' => $validatedData['property_size'],
                'is_featured' => $validatedData['is_featured'],
                'listing_type' => $validatedData['listing_type'],
                'amenities' => $validatedData['amenities'],
                'category_attributes' => $validatedData['category_attributes'],
            ];

            if($request->hasFile('featured_image')){
                $featuredImagePath = $request->file('featured_image')->store('property_images', 'public');
                $updatableData['featured_image'] = $featuredImagePath;
            }

            if($request->hasFile('gallery_images')){

                $files = $request->file('gallery_images');
                $filesPathLinks = [];

                foreach($files as $file){
                    $filesPathLinks[] = $file->store('property_gallery_images', 'public');
                }

                $filesPathLinks = collect($filesPathLinks)->map(function($link) {
                    return asset('storage/'.$link);
                });

                $updatableData['gallery_images'] = $filesPathLinks;
            }

            if(count($request->video_links) > 0){
                $updatableData["video_links"] = $request->video_links;
            }

            $property->update($updatableData);

            DB::commit();

            return to_route('properties.edit', ['property' => $property]);
        }catch (\Exception $e){
            DB::rollBack();
            dd($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
