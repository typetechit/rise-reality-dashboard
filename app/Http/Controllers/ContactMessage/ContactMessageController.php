<?php

namespace App\Http\Controllers\ContactMessage;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contactMessages = ContactMessage::query()->latest()->paginate(25);

        return inertia('ContactMessages/Index', [
            'contactMessages' => $contactMessages
        ]);
    }

    public function create()
    {
        return inertia('ContactMessages/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);

        $newContactMessage = ContactMessage::create($request->all());

        if($request->wantsJson()){
            return response()->json($newContactMessage);
        }

        return to_route('contact-messages.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ContactMessage $contactMessage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ContactMessage $contactMessage)
    {
        return inertia('ContactMessages/Edit', [
            'contactMessage' => $contactMessage
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ContactMessage $contactMessage)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);

        $contactMessage->update($request->all());

        return to_route('contact-messages.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();
        return to_route('contact-messages.index');
    }
}
