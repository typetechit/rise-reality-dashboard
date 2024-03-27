<?php

namespace App\Http\Controllers\Testimonial;

use App\Http\Controllers\Controller;
use App\Http\Requests\TestimonialCreateRequest;
use App\Models\Testimonial;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonials = Testimonial::query()->latest()->get();

        return inertia('Testimonials/Index', [
            'testimonials' => $testimonials
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Testimonials/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TestimonialCreateRequest $request)
    {
        $validatedData = $request->validationData();

        $newTestimonial = Testimonial::create([
            'name' => $validatedData['name'],
            'position' => $validatedData['position'],
            'company' => $validatedData['company'],
            'comment' => $validatedData['comment'],
        ]);

        $updatableData = [];

        if($request->hasFile('image')){
            $featuredImagePath = $request
                ->file('image')
                ->store('testimonial_images', 'public');

            $updatableData["image"] = $featuredImagePath;
        }

        $newTestimonial->update($updatableData);

        return redirect()->route('testimonials.index');
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
    public function edit(Testimonial $testimonial)
    {
        return inertia('Testimonials/Edit', [
            'testimonial' => $testimonial
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TestimonialCreateRequest $request, Testimonial $testimonial)
    {
        $updatableData = $request->validationData();
        if($request->hasFile('image')){
            $featuredImagePath = $request
                ->file('image')
                ->store('testimonial_images', 'public');

            $updatableData["image"] = $featuredImagePath;
        }

        $testimonial->update($updatableData);


        return redirect()->route('testimonials.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return redirect()->route('testimonials.index');
    }
}
