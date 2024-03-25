<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Settings\Attribute;
use App\Models\Settings\Category;
use Illuminate\Http\Request;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $attributes = Attribute::query()->latest()->paginate(25);

        return inertia('Settings/Attributes/Index', [
            'attributes' => $attributes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Settings/Attributes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:attributes,name',
            'icon' => 'nullable'
        ]);

        $newAttribute = Attribute::create($request->all());

        return to_route('settings.attributes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Attribute $attribute)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attribute $attribute)
    {
        return inertia('Settings/Attributes/Edit', [
            'attribute' => $attribute
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attribute $attribute)
    {
        $request->validate([
            'name' => 'required|unique:attributes,name',
            'icon' => 'nullable'
        ]);

        $attribute->update($request->all());

        return to_route('settings.attributes.edit', [
            'attribute' => $attribute
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
