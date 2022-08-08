// Agregamos funcionalidad del modal




// Creamos el mapa y lo centramos... 
let map = L.map('map').setView([23.466302332191862, -102.1152141635831], 5) //nos permite ver el mapa

// Seleccionamos el mapa base...
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' //mapa  url extraida
}).addTo(map);

// Arreglo dinamico por capas:
var capMap = [];

// Queremos activar el contro lde dibujo (el cuadrito en la parte superior derecha)...


// Volar a coordenadas de los sitios de la Lista desplegable
// document.getElementById('select-location').addEventListener('change', function(e){
//   let coords = e.target.value.split(",");
//   map.flyTo(coords,13);
// })

// 1.- creo sus propiedades
var drawPluginOptions = {
  position: 'topright',
  draw: {
    polyline: false,
    polygon: false,
    circle: false, // Turns off this drawing tool
    rectangle: {
      shapeOptions: {
        clickable: false
      }
    },
    marker: false,
    circlemarker: false
  },
  edit: false
};
// 2.- creo un control de dibujo con la propiedades de arriba
var drawControl = new L.Control.Draw(drawPluginOptions);
// 3.- lo agrego al mapa...
map.addControl(drawControl);
// 4.- Creo una capa en donde se pueda ver el cuadrito de selección...
var editableLayers = new L.FeatureGroup();
// 5.- Agrego al mapa la capa creada pa ver el cuadrito...
map.addLayer(editableLayers);
// Borramos cualquier otro cuadro que haya c uando iniciamos un dibujo...
map.on('draw:drawstart', function (e) {
  editableLayers.clearLayers();
}
);
function style(feature) {
  return {
      weight: .5,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
     
  };
}

//este es la inversa del acto , el requisito es que las capas esten guardadas
function resetMap () {
  for (let index = 0; index < capMap.length; index++) {
    // map.removeLayer(capMap[index]['data']);
    // map.eachLayer( function(layer) {
    capMap[index]['data'].removeFrom(map);
      //capMap[index]['data'].clearLayers();
    //   if ( layer.myTag &&  layer.myTag == capMap[index]['name']) {
    //     map.removeLayer(layer)
    //       }

    //     });
    console.log("Borrando");
  }
}

function addComponents () { //este formatea primero el mapa

  resetMap(); //reseteamos
  //esta es la estructura que se crea con boostrap
  for (let index = 0; index < capMap.length; index++) {
    const e = document.createElement('div');
    var structure = ""
    structure = '<div class="input-group mb-3">' +
                  '<div style="display: flex; width: 100%">' +
                    '<div class="input-group-prepend">' +
                      '<div class="input-group-text" style="background-color: ' + capMap[index]['colorGUI'] + '; cursor: pointer;" onclick=' + '"javascript:seeCapSelect(' + "'" + capMap[index]['name'] + "', " + index + ')">' +
                        '<input type="checkbox" aria-label="Checkbox for following text input" id="element' + index + '">' +
                      '</div>' +
                    '</div>' +
                    '<div style="display: flex; width: 100%; background-color: #FFFFFF; padding: 10px; border: 1px solid #ced4da;">' +
                      '<span style="margin-right: 10px;">' +
                        capMap[index]['name'].toUpperCase()  +
                        "<small class='d-block text-muted'>" + capMap[index]['type'] + "</small>" +
                      "</span>" +
                      "<div "  + 'style="display: flex; width: 50%; justify-content: flex-end; align-items: center;"' + "><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/OOjs_UI_icon_clear-destructive.svg/1200px-OOjs_UI_icon_clear-destructive.svg.png' alt='twbs' width='32' height='32' class='rounded-circle flex-shrink-0' onclick='" + 'javascript:deleteGUI(' + index + ')' + "' style='cursor: pointer;'></div>" +
                    "</div>" +
                  '</div>' +
                '</div>';
    e.innerHTML = structure; 
    document.getElementById("internsData").appendChild(e);
    capMap[index]['data'].addTo(map);//agregamos al mapa
  }

  for (let index = 0; index < capMap.length; index++) {
    if (capMap[index]['enable'] == true) {
      var select = document.getElementById("element" + index);
      console.log("element"+index)
      console.log(capMap[index]['enable'])
      select.checked = capMap[index]['enable']
    }
  }
}

function updateComponentes () {
  // Reset componentes:
  document.getElementById("internsData").innerHTML = ""; //es un div ,es como decirle que lo que teniamos lo borre, solo permite agregar 1
//eliminamos para que quede en blanco y llamamos update
  // Update componentes:
  addComponents()
}

function deleteGUI (index) {
  var template = '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
                    '<div class="modal-dialog modal-dialog-centered" role="document">' +
                        '<div class="modal-content">' +
                            '<div class="modal-header">' +
                               '<h5 class="modal-title" id="exampleModalLongTitle">Eliminar ubicación en el mapa</h5>' +
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                            '</div>' +
                            '<div class="modal-body">' +
                              '¿Realmente desea eliminar esta ubicacióm marcada en el mapa?' +
                            '</div>' +
                            '<div class="modal-footer">' +
                              '<button type="button" class="btn btn-primary"' + "onclick='" + 'javascript:deleteCap(' + index + ')' + "'>Aceptar</button>'" +
                              '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                  '</div>';
    document.getElementById("modal-delete").innerHTML = template
    $("#exampleModalCenter").modal('toggle')
}

function deleteCap (index) {
    resetMap(); //reseteamos 
    capMap.splice(index, 1);//al arreglo lo borramos, el arreglo dinamico el 1 solo elimina el 1 elemento
    updateComponentes();//actualizamos los componentes
    $("#exampleModalCenter").modal('toggle')
}

function checkCap (select) { //nos permite verificar
  for (let index = 0; index < capMap.length; index++) {
    if (select == capMap[index]['name']) {
      return true;
    }
  }
  return false; //impide diplicaciones
}

function resetIcon () {//lo que nos hace creamos el icono azul 
  // Reset color:
  var blueIcon = new L.Icon({
    iconUrl: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + '2A81CB' + '&chf=a,s,ee00FFFF',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
//en el arreglo dinamico hacemos un foreach para reinicializar todo en azul
for (let index = 0; index < capMap.length; index++) {

  capMap[index]['data'].eachLayer(function (layer) {  
    if(layer.feature.properties.amenity == capMap[index]['name']) {    
      layer.setIcon(blueIcon) 
    }

    if(layer.feature.properties.highway == capMap[index]['name'] && capMap[index]['type'] == "Highway") {    
      layer.setIcon(blueIcon) 
    }

    if(layer.feature.properties.highway == capMap[index]['name'] && capMap[index]['type'] == "Way") {    
      layer.setStyle({color :'2A81CB'})
      console.log("Cambiando a azul el Way")
    }
  });

  console.log("Recoloreando");
}
}
//requiere item y capa
function seeCapSelect (cap, id) { //cap es la posicion
  //la capa es la posicion de la capa

  capMap[id]['enable'] = !capMap[id]['enable']

  // Reset color:
  var blueIcon = new L.Icon({
    iconUrl: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + '2A81CB' + '&chf=a,s,ee00FFFF',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  //este primer foor resetea en azzul
  for (let index = 0; index < capMap.length; index++) {

    capMap[index]['data'].eachLayer(function (layer) {  
      if(layer.feature.properties.amenity == capMap[index]['name']) {    
        layer.setIcon(blueIcon) 
      }

      if(layer.feature.properties.highway == capMap[index]['name'] && capMap[index]['type'] == "Highway") {    
        layer.setIcon(blueIcon) 
      }

      if(layer.feature.properties.highway == capMap[index]['name'] && capMap[index]['type'] == "Way") {    
        layer.setStyle({color : '#2A81CB'})
        console.log("Cambiando a azul el Way")
      }
    });

    console.log("Recoloreando");
  }

  // una vez reseteado ejecutamos para encontrar el nombre que sea igual
  for (let index = 0; index < capMap.length; index++) {
    console.log(capMap[index]['data']);
    console.log(capMap[index]);

    var greenIcon = new L.Icon({
      iconUrl: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + capMap[index]['color'] + '&chf=a,s,ee00FFFF',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    capMap[index]['data'].eachLayer(function (layer) {  
      if(capMap[index]['enable'] == true && capMap[index]['type'] == "Amenity") {    
        layer.setIcon(greenIcon) 
        console.log("ameniti");
      }

      if(capMap[index]['enable'] == true && capMap[index]['type'] == "Highway") {    
        layer.setIcon(greenIcon) 
        console.log("soy hihgway");
      }

      if(capMap[index]['enable'] == true && capMap[index]['type'] == "Way") {
        layer.setStyle({color : capMap[index]['color']})
        console.log("soy Way");
        console.log("Cambiando a rojo el Way")
      }
    });

    console.log("Recoloreando el seleccionado");
  }
//tenemos que eliminar y agregar
  resetMap();
  updateComponentes(); //resetea y reagrega
}

function drawItemSelect(option) { //para saber de que lista viene 

  var combo = null;
  
  if (option == 0) {
    combo = document.getElementById("menubox");
  }
  
  if (option == 1) {
    combo = document.getElementById("menubox2");
  }

  if (option == 2) { //son las opciones del html
    combo = document.getElementById("menubox3");
  }

  var selected = combo.options[combo.selectedIndex].text;

  if (checkCap(selected) == true) {//si en la lista ya existe
    return; //ya seleccionada no se vuelve a selccionar
  }

  function onEachFeature(feature, layer) { //esto hace e ppopout de los marcadores
    console.log(feature)
    if (feature.properties.amenity) {
      var lat = feature.geometry.coordinates[1];
      var lng = feature.geometry.coordinates[0];
      var akey = "a270636c43724c4c8b0c8c55c0b2a130";
      var popupContent = "<p>" + feature.properties.amenity + "</p>"+"<p>" + feature.properties.name + "</p>"+"<p>" +'<iframe src="https://www.google.com/maps/embed/v1/streetview?key='+akey+'&location='+lat+','+lng+'&heading=210&pitch=10&fov=35" style="width:100%;border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' + feature.geometry.coordinates + "</p>";
      layer.bindPopup(popupContent);
    }

    if (feature.properties.highway) {
      var popupContent = "<p>" + feature.properties.highway + "</p>"+"<p>" + feature.geometry.coordinates + "</p>";
      layer.bindPopup(popupContent);
    }

 }

 

  // Agregamos la layer con el cuadrito al mapa (pa que se va)...
  // Vamos a a consumir nuestrro web service entonces mostramos letrero de cargando...
  $('body').loadingModal("show");
  // FIXME: cuando dibujas un cuadrado dejando presionado el boton del mouse se hace un cagadero...
  var dos = null; //para comprobar que este vacio
  // var menu = document.getElementById("menubox");
  // Mandamos a llamar wl web service por post (que es lo mismo que ajax)
  console.log(selected)
  console.log(option)
  $.post("http://localhost//cerounoC.php", // Cual es la url de nuestro web service
    { "unidad": selected, "search": option }).done( // Mandamos los parámwetros..
      // Función que se ejecuta cuando obtenemos la respuesta del web service...
      function (result) {

      //   var geojsonMarkerOptions = {
      //     // radius: 8,
      //     fillColor: "#ff7800",
      //     color: "#000",
      //     weight: 1,
      //     opacity: 1,
      //     fillOpacity: 0.8
      // };

      // var geoJsonPoint = new L.marker({
      //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      //   iconSize: [25, 41],
      //   iconAnchor: [12, 41],
      //   popupAnchor: [1, -34],
      //   shadowSize: [41, 41]
      // });
      // var greenIcon = new L.Icon({
      //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      //   iconSize: [25, 41],
      //   iconAnchor: [12, 41],
      //   popupAnchor: [1, -34],
      //   shadowSize: [41, 41]
      // });

        // Test de modal: //IMPORTANTE
        //aqui damos el color azul podemos cambiar cambia el icono ,podria poner otro
        var geo = L.geoJson.ajax("newfile2.json", { pointToLayer: function(feature, latlng) {
          var blueIcon = new L.Icon({
            iconUrl: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + '2A81CB' + '&chf=a,s,ee00FFFF',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          return L.marker(latlng, {icon: blueIcon});
          //latin, ledamos icon  y el icono
          }, onEachFeature: onEachFeature });
          //propiedad del primer popup

        // Creating objet for push:
        //creamos la variable global
        var strutureCap =  null;
        var colorIcon = generateRandomCodeIcon()
        var colorWay = generateRandomCode()

        if (option == 0) {//se pierden de la memoria de los valores
          strutureCap = {
            name: selected,
            type: 'Amenity',
            data: geo,
            color: colorIcon,
            enable: false,
            colorGUI: "#" + colorIcon
          };
        }

        if (option == 1) {
          strutureCap = {
            name: selected,
            type: 'Highway',
            data: geo,
            color: colorIcon,
            enable: false,
            colorGUI: "#" + colorIcon
          };
        }

        if (option == 2) {
          strutureCap = {
            name: selected,
            type: 'Way',
            data: geo,
            color: colorWay,
            enable: false,
            colorGUI: colorWay
          };
        }

        console.log(capMap);
        console.log(strutureCap);

        capMap.push(strutureCap);
        updateComponentes(); //actualizamos todos los componentes

      
        // Leemos el goejson que creamos y lo agregamos al mapa...
        // L.geoJson.ajax("newfile2.json", {function(geoJsonPoint, latlng) {return L.marker(latlng,{icon: greenIcon} ); } }).addTo(map);
        //L.geoJson.ajax("newfile2.json", {function(geoJsonPoint, latlng) {return L.marker(latlng,{icon: greenIcon} ); } })
        //aqui se agregan las CAPAAAS
        // Mostramos en la consola la respuesta...
        console.log(result);
        dos = result;
        var tres = JSON.parse(dos);
        console.log(tres);
        var data = [];
        var data2 = [];
        for (let i in tres) {
          if (tres[i] != null) {
            data.push(tres[i])
          }
        }
        console.log(data);
     
        // var combo = document.getElementById("menubox2");
        // var selected = combo.options[combo.selectedIndex].text;
        // // Agregamos la layer con el cuadrito al mapa (pa que se va)...
        // // Vamos a a consumir nuestrro web service entonces mostramos letrero de cargando...
        // $('body').loadingModal("show");
        // // FIXME: cuando dibujas un cuadrado dejando presionado el boton del mouse se hace un cagadero...
        // var dos2 = null;
        // var menu2 = document.getElementById("menubox2");
        // // Mandamos a llamar wl web service por post (que es lo mismo que ajax)
        // $.post("http://localhost//cerounoC.php", // Cual es la url de nuestro web service
        //   { "unidad": selected }).done( // Mandamos los parámwetros..
        //     // Función que se ejecuta cuando obtenemos la respuesta del web service...
        //     function (result) {
        //       // Leemos el goejson que creamos y lo agregamos al mapa...
        //       L.geoJson.ajax("newfile2.json", { style: function (feature) { return { color: "#FF0000", weight: 5.0, opacity: 1.0 }; } }).addTo(map);
        //       // Mostramos en la consola la respuesta...
        //       console.log(result);
        //       dos2 = result;
        //       var tres2 = JSON.parse(dos2);
        //       console.log(tres);
        //       var data = [];
        //       var data2 = [];
        //       for (let i in tres2) {
        //         if (tres2[i] != null) {
        //           data.push(tres2[i])
        //         }
        //       }
        //       console.log(data);
        


        // Agregamos al url al text input que SI es un text input...
        $("#urlTxt").val(data[0]);

        // Agregamos al url al text input que SI es un text input...
        // $("#urlTxt").val(result);
        // Si recibimos la respuesta quitamos el letrero de cargando...
        $('body').loadingModal('hide');
      }
    );
}

// Funcion generadora de letras hexadecimales
function generarLetra(){
	var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
	var numero = (Math.random()*15).toFixed(0);
	return letras[numero];
}

// Funcion de generación de colores aleatorios
function generateRandomCode() {
  var coolor = "";
	for(var i=0;i<6;i++){
		coolor = coolor + generarLetra() ;
	}
	return "#" + coolor;
}

function generateRandomCodeIcon() {
  var coolor = "";
	for(var i=0;i<6;i++){
		coolor = coolor + generarLetra() ;
	}
	return coolor;
}


// Tomamos latitudes y longitudes de los cuadros hechos y llamamos al web service con los parámetros...
map.on('draw:created', function (e) {
 removeOptions();

 // Reseteamos el mapa y datos. cuado hacemos otro cuadrito
 resetMap(); //reseamos el mapa
 capMap = [];//para el arreglo nuevo
 updateComponentes();//para el popup
 
  // Agregamos la layer con el cuadrito al mapa (pa que se va)...
  editableLayers.addLayer(e.layer);
  // Tomamos latitudes y longitudes...
  var Lat1 = e.layer.getBounds().getNorth();
  var Lat2 = e.layer.getBounds().getSouth();
  var Lon1 = e.layer.getBounds().getWest();
  var Lon2 = e.layer.getBounds().getEast();

  // Vamos a a consumir nuestrro web service entonces mostramos letrero de cargando...
  $('body').loadingModal("show");



  //CONSULTA TOOODAS LAS AMENIDADES
  
  // FIXME: cuando dibujas un cuadrado dejando presionado el boton del mouse se hace un cagadero...
  var dos = null;
  var menu = document.getElementById("menubox");
  var menu2 = document.getElementById("menubox2");
  var menu3 = document.getElementById("menubox3");
  // Mandamos a llamar wl web service por post (que es lo mismo que ajax)
  $.post("http://localhost//0.1.php", // Cual es la url de nuestro web service
    { "Lat1": Lat2, "Lat2": Lat1, "Lon1": Lon1, "Lon2": Lon2 }).done( // Mandamos los parámwetros..
      // Función que se ejecuta cuando obtenemos la respuesta del web service...
      function (result) {
        // Leemos el goejson que creamos y lo agregamos al mapa...
        L.geoJson.ajax("newfile.json", { style: function (feature) { return { color: "#FF0000", weight: 5.0, opacity: 1.0 }; } })
        //.addTo(map);
        // Mostramos en la consola la respuesta...
        console.log(result);
        dos = result;
        var tres = JSON.parse(dos);
        console.log(tres);
        var data = [];
        var data2 = [];

        for (let i in tres) {
          if (tres[i] != null) {
            data.push(tres[i])
          }
        }

        console.log(data);
        console.log(data[0][0]);
        console.log(data[1][0]);
        console.log(data[2][0]);

        for (let i = 0; i < data.length-1; i++) {
          for (let j = 0; j < data[i].length; j++) {
            let option = document.createElement("option");
            option.setAttribute("value", "value");
            let optionTexto = document.createTextNode(data[i][j]);
            option.appendChild(optionTexto);

            if (i == 0) {
              menu.appendChild(option);
            }
            
            if (i == 1) {
              menu2.appendChild(option);
            }
            if (i == 2) {
              menu3.appendChild(option);
            }

          }
        }

        // Agregamos al url al text input que SI es un text input...
        $("#urlTxt").val(data[3]);
        // Si recibimos la respuesta quitamos el letrero de cargando...
        $('body').loadingModal('hide');
      }
    );

  console.log(dos);

  // Agrega el zoon automático en el mapa
  map.fitBounds([
    [Lat1, Lon1],
    [Lat2, Lon2]
  ]);

});


//removedor de los datos de la lista del html creada
function removeOptions() {
  var j = document.getElementById("menubox");
  var j2 = document.getElementById("menubox2");
  var j3 = document.getElementById("menubox3");
  // alert("mensaje");
  // var i, L = selectElement.options.length - 1;
  for (i = j.options.length; i >= 2; i--) {
    j.remove(i);
  }

  for (i = j2.options.length; i >= 2; i--) {
    j2.remove(i);
  }

  for (i = j3.options.length; i >= 2; i--) {
    j3.remove(i);
  }

} // using the function: removeOptions(document.getElementById('DropList')


var activities = document.getElementById("menubox");

activities.addEventListener("click", function() {
    var options = activities.options.length;
   console.log(options);
    if(options < 2)
    {
      console.log("entre en if");

      drawItemSelect(0);
    }
});

var activities2 = document.getElementById("menubox2");

activities2.addEventListener("click", function() {
    var options = activities2.options.length;
   console.log(options);
    if(options < 2)
    {
      console.log("entre en if");

      drawItemSelect(1);
    }
});

var activities3 = document.getElementById("menubox3");

activities3.addEventListener("click", function() {
    var options = activities3.options.length;
   console.log(options);
    if(options < 2)
    {
      console.log("entre en if");

      drawItemSelect(2);
    }
});


//neuvoooooooooo
var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '©OpenStreetMap, ©CartoDB',subdomains: 'abcd',maxZoom: 24});

// Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomleft"
    }).addTo(map);

// Agregar escala
 new L.control.scale({imperial: false}).addTo(map);

// // Configurar PopUp
// function popup(feature,layer){
//     if(feature.properties && feature.properties.BARRIO){
//         layer.bindPopup("<strong>Barrio: </strong>" + feature.properties.BARRIO + "<br/>" + "<strong>Localidad: </strong>" + feature.properties.LOCALIDAD);
//     }
// }

// // Agregar capa en formato GeoJson
// var barriosJS = L.geoJson(barrios,{
//     onEachFeature: popup
// }).addTo(map);

// // Agregar coordenadas para dibujar una polilinea
// var coord_camino = [
//     [4.798039528031478, -74.03124090388363],
//     [4.79059838513191, -74.02832266048456],
//     [4.786663954996014, -74.02806516841994],
//     [4.784183541760121, -74.02832266048456],
//     [4.781275459625073, -74.02703520016145],
//     [4.777683105825763, -74.02617689327938],
//     [4.7735878498196636, -74.02655897938767],
//     [4.771834421730695, -74.02735291325358],
//     [4.770316205986422, -74.02692375981255]
// ];

// var camino = L.polyline(coord_camino, {
//     color: 'red'
// }).addTo(map);

// // Agregar un marcador
// var marker_cerro = L.circleMarker(L.latLng(4.791132952755172, -73.99527784552215), {
//     radius: 6,
//     fillColor: "#ff0000",
//     color: "blue",
//     weight: 2,
//     opacity: 1,
//     fillOpacity: 0.6,
// }).addTo(map);

// // Agregar la leyenda
// const legend = L.control.Legend({
//     position: "bottomright",
//     collapsed: false,
//     symbolWidth: 24,
//     opacity:1,
//     column:1,
//     legends: [
//         {
//             label: "MARCADOR",
//             type: "circle",
//             radius: 6,
//             color: "blue",
//             fillColor: "#FF0000",
//             fillOpacity: 0.6,
//             weight: 2,
//             layers: [marker_cerro],
//             inactive: false,
//         }, {
//             label: "EJEMPLO DESACTIVABLE",
//             type: "polyline",
//             color: "#FF0000",
//             fillColor: "#FF0000",
//             weight: 2,
//             layers: camino
//         },  {
//             label: "Desactivable",
//             type: "rectangle",
//             color: "#0074f0",
//             fillColor: "#009ff0",
//             weight: 2,
//             layers: barriosJS,barrios
//         },
        
//         {
//           // ----------------------
//           label: "Desactivable pru",
//           type: "image",
//           url: "Leaflet.Legend-master/examples/marker/purple.png",
      
//           layers: L
//       },
//         {
//             label: "EJEMPLO MARCADOR",
//             type: "image",
//             url: "Leaflet.Legend-master/examples/marker/purple.png"
//         },{
//             label: "EJEMPLO MARCADOR",
//             type: "polyline",
//             color: "#0000FF",
//             fillColor: "#0000FF",
//             dashArray: [5, 5],
//             weight: 2
//         }, {
//             label: "EJEMPLO MARCADOR",
//             type: "polygon",
//             sides: 5,
//             color: "EJEMPLO MARCADOR",
//             fillColor: "#FF0000",
//             weight: 2
//         }]
// })//.addTo(map);