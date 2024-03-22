<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\PostCreateRequest;
use App\Http\Requests\Blog\PostUpdateRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::query()
            ->with('user:id,name')
            ->latest()
            ->paginate(25);

        return inertia('Blog/Posts/Index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Blog/Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostCreateRequest $request)
    {
        $postData = $request->validationData();

        $newPost = $request->user()->posts()->create([
            'title' => $postData['title'],
            'description' => $postData['description'],
            'is_published' => $postData['is_published'],
        ]);

        $updatableData = [];

        if($request->hasFile('featured_image')){
            $featuredImagePath = $request
                ->file('featured_image')
                ->store('post_images', 'public');

            $updatableData["featured_image"] = $featuredImagePath;
        }

        if(count($request->video_links) > 0){
            $updatableData["video_links"] = $request->video_links;
        }

        if($request->hasFile('gallery_images')){

            $files = $request->file('gallery_images');
            $filesPathLinks = [];

            foreach($files as $file){
                $filesPathLinks[] = $file->store('gallery_images', 'public');
            }

            $filesPathLinks = collect($filesPathLinks)->map(function($link) {
                return asset('storage/'.$link);
            });

            $updatableData["gallery_images"] = $filesPathLinks;
        }

        $newPost->update($updatableData);

        return to_route('posts.edit', ['post' => $newPost]);
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
    public function edit(Post $post)
    {
        return inertia('Blog/Posts/Edit', [
            'post' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostUpdateRequest $request, Post $post)
    {
        $updatableData = $request->only('title', 'description', 'is_published');;

        if($request->hasFile('featured_image')){
            $featuredImagePath = $request
                ->file('featured_image')
                ->store('post_images', 'public');

            $updatableData["featured_image"] = $featuredImagePath;
        }

        if(count($request->video_links) > 0){
            $updatableData["video_links"] = $request->video_links;
        }

        if($request->hasFile('gallery_images')){

            $files = $request->file('gallery_images');
            $filesPathLinks = [];

            foreach($files as $file){
                $filesPathLinks[] = $file->store('gallery_images', 'public');
            }

            $filesPathLinks = collect($filesPathLinks)->map(function($link) {
                return asset('storage/'.$link);
            });

            $updatableData["gallery_images"] = $filesPathLinks;
        }

        $post->update($updatableData);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
