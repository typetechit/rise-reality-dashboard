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
                ->store('editor-file-upload', 'public');

            return response()->json([
                'editor-uploaded-image' => $uploadedImagePath
            ]);
        }

        return response()->json();
    }
}
