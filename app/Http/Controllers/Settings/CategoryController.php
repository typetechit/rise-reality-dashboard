<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Settings\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::query()->latest()->paginate(25);

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

        return inertia('Settings/Categories/Create', [
            "categoryTypes" => $categoryTypes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @throws \Throwable
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'type' => 'required:in:post,property',
        ]);

        $foundCategory = Category::query()->where('name', $request->name)->where('type', $request->type)->first();

        throw_if($foundCategory, new \Exception("Category already exists"));

        $newCategoryData = $request->only('name', 'type');
        $newCategoryData['slug'] = Str::slug($request->name);
        $newCategory = Category::create($newCategoryData);

        return to_route('settings.categories.index');
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
        $categoryTypes = ["blog", 'property'];

        return inertia('Settings/Categories/Edit', [
            "categoryTypes" => $categoryTypes,
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
        ]);

        $updatableData = $request->only('name', 'type');
        $updatableData['slug'] = Str::slug($request->name);

        $category->update($updatableData);

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
