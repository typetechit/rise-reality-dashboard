<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\PropertyCreateRequest;
use App\Http\Requests\Property\PropertyUpdateRequest;
use App\Models\Country;
use App\Models\Property;
use App\Models\Settings\Amenity;
use App\Models\Settings\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
                ->paginate($this->paginationCount);
        }else if($request->user()->role === 'PROPERTY_AGENT'){
            $properties = Property::query()
                ->where('user_id', auth()->id())
                ->with(['user:id,name,email,phone', 'category:id,name'])
                ->latest()
                ->paginate($this->paginationCount);
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
        $availableListingTypes = ['Lease', 'Rental', 'Sale'];
        $availableAmenities = Amenity::query()
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
            $postPublishedDate = Carbon::make($request->get('published_at', now()));

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
                'created_at' => $postPublishedDate
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
        $property->load('category:id,name');

        $availableListingTypes = config('property.listingsTypes');
        $availableAmenities = Amenity::query()
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
                })->toArray();

                $updatableData['gallery_images'] = array_merge($property->gallery_images, $filesPathLinks);
            }

            if(count($request->video_links) > 0){
                $updatableData["video_links"] = $request->video_links;
            }

            if($request->get('published_at')){
                $updatableData['created_at'] = Carbon::make($request->get('published_at'));
            }

            $property->update($updatableData);

            DB::commit();

            return to_route('properties.edit', ['property' => $property])
                ->with([
                    'message' => 'Property Information updated.'
                ]);

        }catch (\Exception $e){
            DB::rollBack();
            dd($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        if($property->user_id === auth()->id()){
            $property->delete();
        }

        return to_route('properties.index');
    }

    public function removeGalleryImage(Request $request, Property $property)
    {

        if ($request->has('indexId')) {
            $propertyGalleryImages = $property->gallery_images;
            $propertyItemIndexToRemove = $request->input('indexId');

            if (isset($propertyGalleryImages[$propertyItemIndexToRemove])) {
                // Get the full URL of the image
                $imageUrl = $propertyGalleryImages[$propertyItemIndexToRemove];

                // Extract the path from the URL
                $imagePath = Str::after($imageUrl, '/storage/');

                // Check if the image exists in storage
                if (Storage::disk('public')->exists($imagePath)) {
                    // Delete the image from storage
                    Storage::disk('public')->delete($imagePath);
                }

                // Remove the image from the gallery_images array
                unset($propertyGalleryImages[$propertyItemIndexToRemove]);

                // Reindex the array
                $updatedGalleryImages = array_values($propertyGalleryImages);

                // Update the property with the updated gallery_images
                $property->update([
                    'gallery_images' => $updatedGalleryImages
                ]);

                return back()->with([
                    'galleryImages' => $property->gallery_images
                ]);
            }
        }

        return back();
    }
}
