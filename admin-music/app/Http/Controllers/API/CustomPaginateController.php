<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CustomPaginateController extends Controller
{
    public function customPaginate($query, $request, $perPage)
    {
        $page = isset($request['page']) ? (int) $request->input('page', 1) : 1; // trang hiện tại
        $total = $query->count();
        $offset = ($page - 1) * $perPage;
        $result = $query->skip($offset)->take($perPage)->get();
        return [
            'total' => $total,
            'item' => $result,
            'perPage' => $perPage,
            'page' => $page,
            'last_page' => ceil($total / $perPage)
        ];
    }
}
