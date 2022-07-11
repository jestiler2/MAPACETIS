
// Creamos el mapa y lo centramos... 
let map = L.map('map').setView([23.466302332191862, -102.1152141635831], 5) //nos permite ver el mapa

// Seleccionamos el mapa base...
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' //mapa  url extraida
}).addTo(map);

// Queremos activar el contro lde dibujo (el cuadrito en la parte superior derecha)...

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
  var dos = null;
  var menu = document.getElementById("menubox");
  // Mandamos a llamar wl web service por post (que es lo mismo que ajax)
  $.post("http://localhost//cerounoC.php", // Cual es la url de nuestro web service
    { "unidad": selected }).done( // Mandamos los parámwetros..
      // Función que se ejecuta cuando obtenemos la respuesta del web service...
      function (result) {
        // Leemos el goejson que creamos y lo agregamos al mapa...
        L.geoJson.ajax("newfile2.json", { style: function (feature) { return { color: "#FF0000", weight: 5.0, opacity: 1.0 }; } }).addTo(map);
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