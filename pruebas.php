<?php
//compuesto por propiedades
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
echo "<br>";
echo "<br>";
$duplicate = array_values(array_unique($amenitis));
echo "<br>";
echo "<br>";
echo "Amenity";
echo "<br>";
echo "<br>";
//print_r($duplicate);
for ($j=0; $j<count($duplicate); $j++) { 
  echo $duplicate[$j];
  echo nl2br("\n"); //salto de linea
  }
echo "<br>";
echo "<br>";
$duplicate2 = array_values(array_unique($variable2));
echo "<br>";
echo "<br>";
echo "HighWays";
echo "<br>";
echo "<br>";
//print_r($duplicate);
for ($l=0; $l<count($duplicate2); $l++) { 
  echo $duplicate2[$l];
  echo nl2br("\n"); //salto de linea
  }
?>