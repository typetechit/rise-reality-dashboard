<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Property\Amenity;
use App\Models\Settings\Attribute;
use App\Models\Settings\Category;
use Illuminate\Http\Request;

class AmenityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $amenities = Amenity::query()->latest()->paginate(25);

        return inertia('Settings/Amenities/Index', [
            'amenities' => $amenities
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Settings/Amenities/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:amenities,name'
        ]);

        $newAmenity = Amenity::create($request->all());

        return to_route('settings.amenities.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Amenity $amenity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Amenity $amenity)
    {
        return inertia('Settings/Amenities/Edit', [
            'amenity' => $amenity
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Amenity $amenity)
    {
        $request->validate([
            'name' => 'required|unique:amenities,name'
        ]);

        $amenity->update($request->all());

        return to_route('settings.amenities.edit', [
            'amenity' => $amenity
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attribute $attribute)
    {
        //
    }
}
