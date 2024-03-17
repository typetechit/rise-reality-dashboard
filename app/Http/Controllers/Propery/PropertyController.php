<?php

namespace App\Http\Controllers\Propery;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\PropertyCreateRequest;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::query()->latest()->paginate(25);

        return inertia('Properties/Index', [
			'properties' => $properties
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Properties/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PropertyCreateRequest $request)
    {
        dd($request->validationData());
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
