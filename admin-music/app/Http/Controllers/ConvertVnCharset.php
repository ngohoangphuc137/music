<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConvertVnCharset extends Controller
{
    public function convertVnCharset($name){
        $convert = $name;
        $convert=preg_replace('/\Á|À|Ã|Ạ|Ả|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ|Ẳ/','A',$convert);
        $convert=preg_replace('/\à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/','a',$convert);

        $convert=preg_replace('/\É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ|Ể/','E',$convert);
        $convert=preg_replace('/\è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/','e',$convert);

        $convert=preg_replace('/\Ì|Í|Ị|Ỉ|Ĩ/','I',$convert);
        $convert=preg_replace('/\ì|í|ị|ỉ|ĩ/','i',$convert);

        $convert=preg_replace('/\Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/','O',$convert);
        $convert=preg_replace('/\ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/','o',$convert);

        $convert=preg_replace('/\Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/','U',$convert);
        $convert=preg_replace('/\ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/','u',$convert);

        $convert=preg_replace('/\Ỳ|Ý|Ỵ|Ỷ|Ỹ/','Y',$convert);
        $convert=preg_replace('/\ỳ|ý|ỵ|ỷ|ỹ/','y',$convert);

        $convert=preg_replace('/\Đ/','D',$convert);
        $convert=preg_replace('/\đ/','d',$convert);

        $convert=preg_replace('/\(||%|$|@|&/','',$convert);
        $convert=preg_replace('/\)/','',$convert);
        $convert=preg_replace('/\.|;|,/','-',$convert);
        $convert=preg_replace('/\ /','-',$convert);
        return $convert;
    }
    
}
