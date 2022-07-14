<?php
require "geo.php";

// verificar que estan los paametros...
if (!isset($_POST["Lat1"], $_POST["Lat2"], $_POST["Lon1"], $_POST["Lon2"])){
   echo "Faltan parametros...";
   exit();
}
$myfile = fopen("datos.txt", "w") or die("Unable to open file!");
//$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
fwrite($myfile,$_POST["Lat1"]."\n");
fwrite($myfile,$_POST["Lat2"]."\n");
fwrite($myfile,$_POST["Lon1"]."\n");
fwrite($myfile,$_POST["Lon2"] );


// fwrite($myfile,String($_POST["Lat1"])+","+ String ($_POST["Lat2"])+","+ String( $_POST["Lon1"])+","+ String( $_POST["Lon2"]) );
fclose($myfile);

//$overpass = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(way["highway"="cycleway"]('.$_POST["Lat1"].','.$_POST["Lon1"].','.$_POST["Lat2"].','.$_POST["Lon2"].');node(w)->.x;);out;';
//$overpass = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="hospital"]('.$_POST["Lat1"].','.$_POST["Lon1"].','.$_POST["Lat2"].','.$_POST["Lon2"].');node(w)->.x;);out;';
$overpass = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(node["highway"]('.$_POST["Lat1"].','.$_POST["Lon1"].','.$_POST["Lat2"].','.$_POST["Lon2"].');node["amenity"]('.$_POST["Lat1"].','.$_POST["Lon1"].','.$_POST["Lat2"].','.$_POST["Lon2"].');node(w)->.x;);out;';
// echo $overpass."\n";


// cURL the API
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $overpass);
$html = curl_exec($ch);
// echo $html;
if( strpos($overpass, "(way[")===false){
   $geojson = Overpass2Geojson::convertNodes($html,false); // Returns array with GeoJSON structure
}else{
   $geojson = Overpass2Geojson::convertWays($html,false); // Returns array with GeoJSON structure
}
$myfile = fopen("newfile.json", "w") or die("Unable to open file!");
//$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");

fwrite($myfile, json_encode($geojson));
fclose($myfile);


//LECTOR
$people_json = file_get_contents('newfile.json'); //lee el archivo
$decoded_json = json_decode($people_json, false); //decodifica el json
$allData=$decoded_json->features; //accedemos a la propiedad features del json (el objeto dividido por las llaves)
$amenitis = array();  //creamos las variables y arreglos
$variable2 = array();

foreach ($allData as $data) {  // en all data tenemos features
  $props = $data->properties;  //vamos a propies -lo de las capas de isaac
  if (!empty($props->amenity)) { //dentro la propiedad se hace la consulta si no es vacio
    $ameniti=$props->amenity; //si no esta vacio entramos a ameniti
    array_push($amenitis, $ameniti); //con array push se agrega al array dinamico
  }
  //$props = $data->geometry; //para las coordenada
  $props = $data->properties;
  if (!empty($props->highway)) {
    $ameniti=$props->highway;
    array_push($variable2, $ameniti);
    }
}

$duplicate = array_values(array_unique($amenitis));

// for ($j=0; $j<count($duplicate); $j++) { 
//   echo $duplicate[$j];
//   echo nl2br("\n"); //salto de linea
//   }
// echo "<br>";
// echo "<br>";
$duplicate2 = array_values(array_unique($variable2));
// echo "<br>";
// echo "<br>";
// echo "HighWays";
// echo "<br>";
// echo "<br>";
// //print_r($duplicate);
// for ($l=0; $l<count($duplicate2); $l++) { 
//   echo $duplicate2[$l];
//   echo nl2br("\n"); //salto de linea

//   }
$arr=array(
   "base"=> //yo puse base
   $duplicate , 
   "base2"=> 
   $duplicate2 , 
   "url"=> 
   $overpass 
);


  echo json_encode($arr); 














?>
