
// Creamos el mapa y lo centramos... 
let map = L.map('map').setView([23.466302332191862, -102.1152141635831], 5) //nos permite ver el mapa

// Seleccionamos el mapa base...
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' //mapa  url extraida
}). addTo(map);

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
map.on('draw:drawstart', function(e) { 
  editableLayers.clearLayers();
  }
);

function drawItemSelect(){
  const lineReader = require('line-reader');
  lineReader.eachLine('datos.txt',(line,last)=>{
      console.log(line);
  })
}


// Tomamos latitudes y longitudes de los cuadros hechos y llamamos al web service con los parámetros...
map.on('draw:created', function(e) { 
    // Agregamos la layer con el cuadrito al mapa (pa que se va)...
    const lineReader = require('line-reader');
    lineReader.eachLine('datos.txt',(line,last)=>{
        console.log(line);
    })


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
 $.post("http://localhost//cerounoC.php", // Cual es la url de nuestro web service
        {"Lat1": Lat2, "Lat2": Lat1, "Lon1": Lon1, "Lon2": Lon2}).done( // Mandamos los parámwetros..
            // Función que se ejecuta cuando obtenemos la respuesta del web service...
            function(result){
                // Leemos el goejson que creamos y lo agregamos al mapa...
                L.geoJson.ajax("newfile2.json", {style: function(feature){return{color: "#FF0000", weight: 5.0, opacity: 1.0};}}) .addTo(map);
                // Mostramos en la consola la respuesta...
                console.log(result);
      
                // Agregamos al url al text input que SI es un text input...
                $("#urlTxt").val(result);
                // Si recibimos la respuesta quitamos el letrero de cargando...
                $('body').loadingModal('hide');
            }
        );
   
    console.log(dos);
  

   



  });


