<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class APIPropertyController extends Controller
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
