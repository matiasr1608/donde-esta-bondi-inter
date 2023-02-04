// const { cssNumber } = require("jquery");

var lineas = { 10: ['2', '222', '402', '404', '405', '407', '409', '427', '456', '494', '4A', '4AC', '4AD', '4D', '4DR', '600', '76', 'CE1', 'D9', 'G', 'L14', 'L16', 'L29', 'L7'], 13: ['15A', '15B', '6A', '6R6'], 18: ['1A', '2A', '700', '701', '703', '704', '705', '706', '707', '708', '709', '710', '711', '712', '714', '724', '747', '748', '750', '751', '752', '757', '7A', '7E7R', '7E8R', '802', '803', '804', '809', '8A', '8E7R', '8E8R', 'DM1', 'P757', 'P758', 'P759', 'P760', 'P761', 'P768', 'P7H', 'XA1', 'XA2'], 20: ['1M1', '1M12', '1M6', '1M7', '2M1', '2M7', '2M8', '505', '522', '524', '526', '538', '546', '582', 'D11', 'L24', 'L25', 'L38', 'MD3', 'ML1'], 29: ['2K'], 32: ['S5', 'S6', 'S7'], 33: ['A1', 'A10', 'A11', 'A12', 'A14', 'A16', 'A18', 'A5', 'A6', 'A9'], 35: ['10A', '14A', '14AB', '14AR', 'T1', 'T14A', 'T2', 'T4N', 'T4R', 'T5', 'T6'], 36: [], 37: [], 39: ['Z1', 'Z2', 'Z3', 'Z4'], 50: ['100', '102', '103', '104', '105', '109', '110', '111', '112', '113', '115', '116', '117', '121', '124', '125', '127', '128', '130', '137', '141', '142', '143', '144', '145', '147', '148', '149', '150', '151', '155', '156', '157', '158', '163', '169', '174', '175', '180', '181', '183', '185', '186', '187', '188', '191', '192', '195', '199', '21', '214', '227', '230', '268', '276', '60', '62', '64', 'C1', 'C2', 'C3', 'C4', 'C5', 'CE1', 'D10', 'D5', 'D8', 'DE1', 'DM1', 'E14', 'G10', 'G11', 'G3', 'G8', 'L1', 'L15', 'L2', 'L20', 'L22', 'L26', 'L28', 'L3', 'L35', 'L36', 'L39', 'L4', 'L41', 'L46', 'L5', 'L6', 'L9'], 70: ['11A', '17', '221', '300', '306', '316', '328', '329', '330', '370', '396', '71', '79', 'CE1', 'DM1', 'L12', 'L31', 'L33', 'U11C', 'XA1'], 80: [] }
var buses = null;
var map = null;
var groupMarkers = null;
var markers = new Array();
var bounds = null;




$(document).ready(function () {
    //service woerker
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker
                .register("/serviceWorker.js")
                .then(res => console.log("service worker registered"))
                .catch(err => console.log("service worker not registered", err))
        })
    }
    // PWA BUTTON
    var beforeInstallPrompt = null;   //variable to save the event 

    window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);

    function eventHandler(event) {
        beforeInstallPrompt = event;
        document.getElementById("pwa_btn").removeAttribute("disabled");
    }

    function errorHandler(event) {
        console.log("error: " + event);
    }

    $("#pwa_btn").click(()=>{
        if (beforeInstallPrompt) {beforeInstallPrompt.prompt()};
    })



    // MAPA
    map = L.map('map').setView([-34.814733, -56.180452], 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    //////////
    groupMarkers = L.featureGroup().addTo(map);

    // update de db
    function updateDB() {
        $.ajax(
            {
                url: "https://donde-estan-buses.deno.dev/updateDB",
                method: "get",
                contentType: "application/json",


                // data:JSON.stringify({"subsistema":"-1","empresa":"-1"}),
                success: function (response) {
                    console.log(response);
                }
            }
        )
    }
    updateDB();

    $("#search").click(async () => {
        $.ajax(
            {
                url: "https://donde-estan-buses.deno.dev/buses?codigoEmpresa=" + $("#empresa").val() + "&linea=" + $("#segundo").val(),
                method: "get",
                contentType: "application/json",
                // data:JSON.stringify({"subsistema":"-1","empresa":"-1"}),
                success: (response) => { showResponseBuses(response) }
            }
        )
    }
    )
    //array for the markers of the map
    // var destinos = [];
    function showResponseBuses(response) {
        //console.log(response)
        $("#search").html("Actualizar")
        buses = response.data;

        if (buses.length > 0) {
            destinos = new Array(); // to save later destinations to choose from
            new Promise(function (resolve) {
                showBuses(buses)
                resolve()
            }).then(function () {
                map.fitBounds(bounds)
            })

            buses.forEach(bus => {
                if (destinos.indexOf(bus.properties.destinoDesc) === -1) { destinos.push(bus.properties.destinoDesc) };//make a list of the destinations so u can show them as button to select
            });
            adddestinatiosHtml();

            $("#alert_tiempo").empty();

            if (((Date.now() - response.lastUpdateDB) >= 20000)) {
                $("#alert_tiempo").empty()
                    .append('<div class="alert alert-warning alert-dismissible fade show" role="alert">Las ubicaciones no están actualizadas, intente de nuevo en unos segundos.(diferencia ' + (Date.now() - response.lastUpdateDB) / 1000 + 'segundos)<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>')
                console.log("mas de 20 seg");
                updateDB();
                $("#search").addClass('disabled');
                $("#search").html("Espere")
                setTimeout(function () { $("#search").removeClass('disabled'); $("#search").html("Actualizar") }, 5000)

            }
            $(".tercero").removeClass("invisible")

        } else {
            $("#alert_tiempo").empty()

                .append('<div class="alert alert-warning alert-dismissible fade show" role="alert">No hay ubicaciones reportadas para su búsqueda, intente nuevamente.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>')

        }
    }


    function adddestinatiosHtml() {  //adds the destinations so u can toggle betwen them
        i = 0
        $("#switch_destinations").empty();
        destinos.forEach((dest) => {
            i += 1;
            createFormChe(dest, filterBusesByDest, i)
        })
    }

    const createFormChe = (dest, handler, i) => {
        $("#switch_destinations").append(
            `<div class= "form-check form-switch">
                <input class="form-check-input" type="checkbox" name="prueba" role="switch" value="${dest}" id="flexSwitchCheck${i}" checked>
                <label class="form-check-label" for="flexSwitchCheck${dest}">${dest}</label>
            </div>`
        );
        $(`#flexSwitchCheck${i}`).click(() => handler())

    }


    const filterBusesByDest = () => {  //everytime a check is clicked updates the buses on the map

        var destChecked = new Array();
        $(".form-check-input:checked").each(function () {
            destChecked.push(($(this).val()))
        })
        buesesChecked = buses.filter(bus => destChecked.includes(bus.properties.destinoDesc)) //


        showBuses(buesesChecked);

        showBuses(buesesChecked);

    };


    function showBuses(busess) { //add buses to the map recived as an array
        //remove markers if there are any'
        //removeAllMarkers()
        //removeAllMarkers();
        new Promise(function (resolve) {
            map.removeLayer(groupMarkers)
            groupMarkers = L.featureGroup();
            resolve();
        }).then(function () {
            busess.forEach((bus) => {
                const marker = L.marker(bus.geometry.coordinates.reverse())
                marker.bindPopup("<b>" + bus.properties.linea + "</b></br>Destino: " + bus.properties.destinoDesc + "</br> Tipo: " + bus.properties.sublinea)
                // marker.addTo(map)
                markers.push(marker)

                marker.addTo(groupMarkers)
            })
            groupMarkers.addTo(map);
            bounds = groupMarkers.getBounds();
        })
    }

    //    const changeMapViewport = (buses)=>{
    //     var maxLat = null
    //     var maxLong = null
    //     var minLat= null
    //     var minLong= null
    //     buses.forEach(bus =>{
    //         if(bus.geometry.coordinates[1] > maxLat){ maxLat = bus.geometry.coordinates[1]}
    //         if(bus.geometry.coordinates[1] < minLat){ minLat = bus.geometry.coordinates[1]}
    //         if(bus.geometry.coordinates[0] > maxLong){ maxLong = bus.geometry.coordinates[0]}

    //         if(bus.geometry.coordinates[0] < minLong){ minLong = bus.geometry.coordinates[0]}
    //     })
    //     map.fitBounds([
    //         [minLat, minLong],
    //         [maxLat, maxLong]
    //     ]);
    //    }




    // function removelayer(marker){
    //     console.log("Borrando markers del mapa:")
    //     console.log(marker)
    //     map.removeLayer(marker)
    // }


    // function addlayer(marker){
    //     console.log("Añadir markers del mapa:")
    //     console.log(marker)
    //     map.addLayer(marker)
    // }



    $("#empresa").change(function () {
        var empresa = $("#empresa").val();
        // empresa = document.getElementById("empresa").value;
        $(".segundo").removeClass("invisible");
        $("#segundo").empty()
        lineas[empresa].forEach(i => {
            $("#segundo").append('<option value=' + i + '>' + i + '</option>')
        });
    })
    // if (empresa == "COPSA") {
    //     lineas[empresa].forEach(i => {
    //     $("#segundo").append('<option value='+i+'>'+i+'</option>')
    //     });
    // }

    let empresas = [
        {
            codigo: '10',
            descripcion: 'C.O.E.T.C.'
        },
        {
            codigo: '13',
            descripcion: 'EMPRESA CASANOVA LIMITADA'
        },
        {
            codigo: '18',
            descripcion: 'C.O.P.S.A.'
        },
        {
            codigo: '20',
            descripcion: 'C.O.M.E.S.A'
        },
        {
            codigo: '29',
            descripcion: 'C.I.T.A.'
        },
        {
            codigo: '32',
            descripcion: 'SAN ANTONIO TRANSPORTE Y TURISMO (SATT)'
        },
        {
            codigo: '33',
            descripcion: 'C.O. DEL ESTE'
        },
        {
            codigo: '35',
            descripcion: 'TALA-PANDO-MONTEVIDEO'
        },
        {
            codigo: '39',
            descripcion: 'ZEBALLOS HERMANOS'
        },
        {
            codigo: '50',
            descripcion: 'C.U.T.C.S.A.'
        },
        {
            codigo: '70',
            descripcion: 'U.C.O.T.'
        },
        {
            codigo: '80',
            descripcion: 'COIT'
        }

    ];

    for (let i in empresas) {
        $('#empresa').append(('<option value=' + empresas[i].codigo + '>' + empresas[i].descripcion + '</option>'))
    }




})


// <select id="subsistema" name="subsistema" class="form-control">
// 										<option value="-1">Todos</option>
// 										<option value="1">Montevideo</option>
// 										<option value="2">Canelones</option>
// 										<option value="3">San Jose</option>
// 										<option value="4">Metropolitano</option>
// 									</select>
