<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EditorFileUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpg,jpeg,png'
        ]);

        if($request->hasFile('image')){
            $uploadedImagePath = $request
                ->file('image')
                ->store('editor_uploaded_image', 'public');

            return response()->json([
                'editor_uploaded_image' => asset('storage/'.$uploadedImagePath),
            ]);
        }

        return response()->json();
    }
}
