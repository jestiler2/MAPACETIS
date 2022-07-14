
// Creamos el mapa y lo centramos... 
let map = L.map('map').setView([23.466302332191862, -102.1152141635831], 5) //nos permite ver el mapa

// Seleccionamos el mapa base...
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' //mapa  url extraida
}).addTo(map);

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

function drawItemSelect() {

  var combo = document.getElementById("menubox");
  var selected = combo.options[combo.selectedIndex].text;
  // Agregamos la layer con el cuadrito al mapa (pa que se va)...
  // Vamos a a consumir nuestrro web service entonces mostramos letrero de cargando...
  $('body').loadingModal("show");
  // FIXME: cuando dibujas un cuadrado dejando presionado el boton del mouse se hace un cagadero...
  var dos = null; //para comprobar que este vacio
  var menu = document.getElementById("menubox");
  // Mandamos a llamar wl web service por post (que es lo mismo que ajax)
  $.post("http://localhost//cerounoC.php", // Cual es la url de nuestro web service
    { "unidad": selected }).done( // Mandamos los parámwetros..
      // Función que se ejecuta cuando obtenemos la respuesta del web service...
      function (result) {
        // Leemos el goejson que creamos y lo agregamos al mapa...
        L.geoJson.ajax("newfile2.json", { style: function (feature) { return { color: "#FF0000", weight: 5.0, opacity: 1.0 }; } }).addTo(map);
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






// Tomamos latitudes y longitudes de los cuadros hechos y llamamos al web service con los parámetros...
map.on('draw:created', function (e) {
 removeOptions();
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
        for (let i = 0; i < data.length-1; i++) {
          for (let j = 0; j < data[i].length; j++) {
            let option = document.createElement("option");
            option.setAttribute("value", "value");
            let optionTexto = document.createTextNode(data[i][j]);
            option.appendChild(optionTexto);
            menu.appendChild(option);


          }
        }


        // Agregamos al url al text input que SI es un text input...
        $("#urlTxt").val(data[2]);
        // Si recibimos la respuesta quitamos el letrero de cargando...
        $('body').loadingModal('hide');
      }
    );

  console.log(dos);






});


//removedor de los datos
function removeOptions() {
  var j = document.getElementById("menubox");
  // alert("mensaje");
  // var i, L = selectElement.options.length - 1;
  for (i = j.options.length; i >= 0; i--) {
    j.remove(i);
  }
} // using the function: removeOptions(document.getElementById('DropList')


var activities = document.getElementById("menubox");

activities.addEventListener("click", function() {
    var options = activities.options.length;
   console.log(options);
    if(options < 2)
    {
      console.log("entre en if");

      drawItemSelect();
    }

    // var combo = document.getElementById("menubox");
    // var selected = combo.options[combo.selectedIndex].text;
    // var selected2 = combo.options[0].text;

    // if(selected == selected2)
    // {
    //   console.log("entre en if 2");

    //   drawItemSelect();
    // }
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

// Configurar PopUp
function popup(feature,layer){
    if(feature.properties && feature.properties.BARRIO){
        layer.bindPopup("<strong>Barrio: </strong>" + feature.properties.BARRIO + "<br/>" + "<strong>Localidad: </strong>" + feature.properties.LOCALIDAD);
    }
}

// Agregar capa en formato GeoJson
var barriosJS = L.geoJson(barrios,{
    onEachFeature: popup
}).addTo(map);

// Agregar coordenadas para dibujar una polilinea
var coord_camino = [
    [4.798039528031478, -74.03124090388363],
    [4.79059838513191, -74.02832266048456],
    [4.786663954996014, -74.02806516841994],
    [4.784183541760121, -74.02832266048456],
    [4.781275459625073, -74.02703520016145],
    [4.777683105825763, -74.02617689327938],
    [4.7735878498196636, -74.02655897938767],
    [4.771834421730695, -74.02735291325358],
    [4.770316205986422, -74.02692375981255]
];

var camino = L.polyline(coord_camino, {
    color: 'red'
}).addTo(map);

// Agregar un marcador
var marker_cerro = L.circleMarker(L.latLng(4.791132952755172, -73.99527784552215), {
    radius: 6,
    fillColor: "#ff0000",
    color: "blue",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6,
}).addTo(map);

// Agregar la leyenda
const legend = L.control.Legend({
    position: "bottomright",
    collapsed: false,
    symbolWidth: 24,
    opacity:1,
    column:1,
    legends: [
        {
            label: "MARCADOR",
            type: "circle",
            radius: 6,
            color: "blue",
            fillColor: "#FF0000",
            fillOpacity: 0.6,
            weight: 2,
            layers: [marker_cerro],
            inactive: false,
        }, {
            label: "EJEMPLO DESACTIVABLE",
            type: "polyline",
            color: "#FF0000",
            fillColor: "#FF0000",
            weight: 2,
            layers: camino
        },  {
            label: "Desactivable",
            type: "rectangle",
            color: "#0074f0",
            fillColor: "#009ff0",
            weight: 2,
            layers: barriosJS,barrios
        },
        
        {
          // ----------------------
          label: "Desactivable pru",
          type: "image",
          url: "Leaflet.Legend-master/examples/marker/purple.png",
      
          layers: L
      },
        {
            label: "EJEMPLO MARCADOR",
            type: "image",
            url: "Leaflet.Legend-master/examples/marker/purple.png"
        },{
            label: "EJEMPLO MARCADOR",
            type: "polyline",
            color: "#0000FF",
            fillColor: "#0000FF",
            dashArray: [5, 5],
            weight: 2
        }, {
            label: "EJEMPLO MARCADOR",
            type: "polygon",
            sides: 5,
            color: "EJEMPLO MARCADOR",
            fillColor: "#FF0000",
            weight: 2
        }]
}).addTo(map);