<?php
require "geo.php";

$lat1= '';
$lat2= '';
$long1= '';
$variable3 = array();
$long2= '';

if ($file = fopen("datos.txt", "r")) {
   while(!feof($file)) {
       $line = fgets($file);
      array_push($variable3, $line);
   }
   fclose($file);
}

$lat1= $variable3[0];
$lat2= $variable3[1];
$long1= $variable3[2];
$long2= $variable3[3];

$lat1=strtr($lat1, "\n", "");
$lat2=strtr($lat2, "\n", "");
$long1=strtr($long1, "\n", "");
$long2=strtr($long2, "\n", "");

// echo  $lat1."\n";
// echo  $lat2."\n";
// echo  $long1."\n";
// echo  $long2."\n";
// echo $_POST["unidad"]."\n";


// fwrite($myfile,String($_POST["Lat1"])+","+ String ($_POST["Lat2"])+","+ String( $_POST["Lon1"])+","+ String( $_POST["Lon2"]) );
// fclose($myfile);

//$overpass = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(way["highway"="cycleway"]('.$_POST["Lat1"].','.$_POST["Lon1"].','.$_POST["Lat2"].','.$_POST["Lon2"].');node(w)->.x;);out;';
//$overpass = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="hospital"]('.$_POST["Lat1"].','.$_POST["Lon1"].','.$_POST["Lat2"].','.$_POST["Lon2"].');node(w)->.x;);out;';
//$overpass = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(node["highway"]('.$_POST["Lat1"].','.$_POST["Lon1"].','.$_POST["Lat2"].','.$_POST["Lon2"].');node["amenity"]('.$_POST["Lat1"].','.$_POST["Lon1"].','.$_POST["Lat2"].','.$_POST["Lon2"].');node(w)->.x;);out;';


$overpass = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="'.$_POST["unidad"].'"]('.$lat1.','.$long1.','.$lat2.','.$long2.');node(w)->.x;);out;';
// $overpass = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(node["highway"]('.$lat1.','.$long1.','.$lat2.','.$long2.');node["amenity"]('.$lat1.','.$long1.','.$lat2.','.$long2.');node(w)->.x;);out;';
$overpass2 = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(node["highway"="'.$_POST["unidad"].'"]('.$lat1.','.$long1.','.$lat2.','.$long2.');node(w)->.x;);out;';
$overpass3 = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(way["highway"="'.$_POST["unidad"].'"]('.$lat1.','.$long1.','.$lat2.','.$long2.');node(w)->.x;);out;';



// $overpass = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(way["highway"="cycleway"]('.$_POST["Lat1"].','.$_POST["Lon1"].','.$_POST["Lat2"].','.$_POST["Lon2"].');node(w)->.x;);out;';


$overpass = preg_replace("/[\r\n|\n|\r]+/", "",$overpass); //elimina los saltos
$overpass2 = preg_replace("/[\r\n|\n|\r]+/", "",$overpass2); //elimina los saltos
$overpass3 = preg_replace("/[\r\n|\n|\r]+/", "",$overpass3); //elimina los saltos


// echo $overpass."\n";
// echo $overpass2."\n";
// echo "aqui el uno uno \n";
// cURL the API
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $overpass);
$html = curl_exec($ch);
// echo $html;

// echo "aqui dos el dos\n";
// cURL the API
$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch2, CURLOPT_URL, $overpass2);
$html2 = curl_exec($ch2);
// echo $html2;

$ch3 = curl_init();
curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch3, CURLOPT_URL, $overpass3);
$html3 = curl_exec($ch3);
// echo $html2;



$variablej = json_decode($html);

// echo $variablej->elements; 

// echo "enconde 1\n";
// echo json_encode($variablej->elements); 
$encode = $variablej->elements;

$variablej2 = json_decode($html2);

// echo $variablej2->elements; 
// // echo "enconde 2\n";
// echo json_encode($variablej2->elements); 

$encode2 = $variablej2->elements;

$variablej3 = json_decode($html3);

// echo $variablej2->elements; 
// // echo "enconde 2\n";
// echo json_encode($variablej2->elements); 

$encode3 = $variablej3->elements;
// foreach ($allData as $data) {  // en all data tenemos features
//    $props = $data->properties;  //vamos a propies -lo de las capas de isaac
//    if (!empty($props->amenity)) { //dentro la propiedad se hace la consulta si no es vacio
//      $ameniti=$props->amenity; //si no esta vacio entramos a ameniti
//      array_push($amenitis, $ameniti); //con array push se agrega al array dinamico
//    }
//    //$props = $data->geometry; //para las coordenada
//    $props = $data->properties;
//    if (!empty($props->highway)) {
//      $ameniti=$props->highway;
//      array_push($variable2, $ameniti);
//      }
//  }

$geojson = null;
$seleccion = $_POST["search"];

if(!empty($variablej->elements) && $seleccion == 0){ 
   $geojson = Overpass2Geojson::convertNodes($html,false);
}
if(!empty($variablej2->elements)&& $seleccion == 1){ 
   $geojson = Overpass2Geojson::convertNodes($html2,false);
}
if(!empty($variablej3->elements) && $seleccion == 2){ 
   $geojson = Overpass2Geojson::convertWays($html3,false);
}

// if( strpos($overpass, "(way[")===false){
//    $geojson = Overpass2Geojson::convertNodes($html,false); // Returns array with GeoJSON structure
// }else{
//    $geojson = Overpass2Geojson::convertWays($html,false); // Returns array with GeoJSON structure
// }


// echo $geojson;

$myfile = fopen("newfile2.json", "w") or die("Unable to open file!");
//$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");

fwrite($myfile, json_encode($geojson));
fclose($myfile);
// echo json_encode($geojson);

if(!empty($variablej->elements)){ 
   $arr=array(
      "url"=> 
      $overpass 
   );

   echo json_encode($arr); 
}
if(!empty($variablej2->elements)){ 
   $arr=array(
      "url"=> 
      $overpass2 
   );

   echo json_encode($arr); 
}
if(!empty($variablej3->elements)){ 
   $arr=array(
      "url"=> 
      $overpass3 
   );

   echo json_encode($arr); 
}





?>
