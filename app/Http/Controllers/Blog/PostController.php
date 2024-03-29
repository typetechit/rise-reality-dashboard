<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\PostCreateRequest;
use App\Http\Requests\Blog\PostUpdateRequest;
use App\Models\Post;
use Carbon\Carbon;
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
            ->with('user')
            ->latest()
            ->paginate(1);

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
        $postPublishedDate = Carbon::make($request->get('published_at', now()));

        $newPost = $request->user()->posts()->create([
            'title' => $postData['title'],
            'description' => $postData['description'],
            'is_published' => $postData['is_published'],
            'created_at' => $postPublishedDate
        ]);

        $updatableData = [];

        if($request->hasFile('featured_image')){
            $featuredImagePath = $request
                ->file('featured_image')
                ->store('post_images', 'public');

            $updatableData["featured_image"] = $featuredImagePath;
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
        $updatableData = $request->only('title', 'description', 'is_published', 'published_at');

        if($request->hasFile('featured_image')){
            $featuredImagePath = $request
                ->file('featured_image')
                ->store('post_images', 'public');

            $updatableData["featured_image"] = $featuredImagePath;
        }

        if($request->get('published_at')){
            $updatableData['created_at'] = Carbon::make($request->get('published_at'));
        }

        $post->update($updatableData);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if($post->user_id === auth()->id()){
            $post->delete();
        }

        return to_route('posts.index');
    }
}
