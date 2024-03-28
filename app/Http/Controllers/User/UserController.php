<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserCreateRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::query()->latest()->paginate(25);

        return inertia('Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = [ "ADMIN", "PROPERTY_AGENT", "EDITOR" ];
        return inertia('Users/Create', [
            "roles" => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserCreateRequest $request)
    {
        $validatedData = $request->validationData();

        $newUser = User::create([
            "name" => $validatedData['name'],
            "email" => $validatedData['email'],
            "password" => Hash::make($validatedData['password']),
            "role" => $validatedData['role'],
            "designation" => $validatedData['designation'],
            "description" => $validatedData['description'],
            "experience" => $validatedData['experience'],
            "location" => $validatedData['location'],
            "practice_area" => $validatedData['practice_area'],
            "phone" => $validatedData['phone'],
        ]);

        $updatableData = [];

        if($request->hasFile('image')){
            $featuredImagePath = $request
                ->file('image')
                ->store('user_images', 'public');

            $updatableData["image"] = $featuredImagePath;
        }

        $newUser->update($updatableData);

        return to_route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles = [ "ADMIN", "PROPERTY_AGENT", "EDITOR" ];
        return inertia('Users/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $updatableData = $request->validationData();
        unset($updatableData['_method']);

        if($request->hasFile('image')){
            $featuredImagePath = $request
                ->file('image')
                ->store('user_images', 'public');

            $updatableData["image"] = $featuredImagePath;
        }

        $user->update($updatableData);
        return to_route('users.show', ['user' => $user]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function updatePassword(Request $request, User $user)
    {
        $request->validate([
            'new_password' => 'required|confirmed|min:6',
        ]);

        $updatedPassword = bcrypt($request->get('new_password'));

        $user->update([
            'password' => $updatedPassword
        ]);

        return back()->with([
            'message' => "Password Updated"
        ]);
    }
}
