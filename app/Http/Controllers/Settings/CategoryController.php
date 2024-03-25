<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Settings\Amenity;
use App\Models\Settings\Attribute;
use App\Models\Settings\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::query()
            ->with('attributes:id,name')
            ->latest()
            ->paginate(25);

        return inertia('Settings/Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categoryTypes = ["blog", 'property'];
        $attributes = Attribute::query()
            ->select(['id', 'name'])
            ->latest()
            ->orderBy('name')
            ->get();

        return inertia('Settings/Categories/Create', [
            "categoryTypes" => $categoryTypes,
            'attributes' => $attributes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @throws \Throwable
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {

            $request->validate([
                'name' => 'required',
                'type' => 'required:in:post,property',
                'attributes' => 'nullable|array'
            ]);

            $foundCategory = Category::query()->where('name', $request->name)->where('type', $request->type)->first();

            throw_if($foundCategory, new \Exception("Category already exists"));

            $newCategoryData = $request->only('name', 'type');
            $newCategoryData['slug'] = Str::slug($request->name);
            $newCategory = Category::create($newCategoryData);

            if($request->exists('attributes')){
                $attributeIds = collect($request->input('attributes'))->pluck('id')->toArray();
                $newCategory->attributes()->sync($attributeIds);
            }

            DB::commit();

            return to_route('settings.categories.index');

        }catch (\Exception $e){
            DB::rollBack();
            dd($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $category->load('attributes');

        $categoryTypes = ["blog", 'property'];
        $attributes = Attribute::query()
            ->select(['id', 'name'])
            ->latest()
            ->orderBy('name')
            ->get();

        return inertia('Settings/Categories/Edit', [
            "categoryTypes" => $categoryTypes,
            'attributes' => $attributes,
            "category" => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     * @throws \Throwable
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required',
            'type' => 'required:in:blog,property',
            'attributes' => 'nullable|array'
        ]);

        $updatableData = $request->only('name', 'type');
        $updatableData['slug'] = Str::slug($request->name);

        $category->update($updatableData);

        if($request->exists('attributes')){
            $attributeIds = collect($request->input('attributes'))->pluck('id')->toArray();
            $category->attributes()->sync($attributeIds);
        }

        return to_route('settings.categories.edit', ['category' => $category]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
