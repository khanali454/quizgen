<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
   public function index(){
    $user = Auth::user();
    dd($user);
    return Inertia::render('Admin/Dashboard');
   }
}
