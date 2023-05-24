// const { cssNumber } = require("jquery");
// const DENO_URL = 'backend.matiasrolando.com'
const DENO_URL = 'https://backend.matiasrolando.com'
var lineas = { 41: ['R1', 'R2', 'R10', 'R11', 'R12', 'R14', 'R15', 'R16', 'R17', 'R20', 'R24', 'R25'], 10: ['2', "D222", '222', '402', '404', '405', '407', '409', '427', '456', '494', '4A', '4AC', '4AD', '4D', "48D", '4DR', "5D", '600', '76', 'CE1', 'D9', 'G', "L13", 'L14', 'L16', 'L29', 'L7'], 13: ['15A', '15B', '6A', '6R6'], 18: ['1A', '2A', '700', '701', "702", "702R", '703', '704', '705', '706', '707', '708', '709', '710', '711', '712', '714', '724', '747', '748', '750', '751', '752', '757', '7A', '7E7R', '7E8R', "7E8D", "7H", '802', '803', '804', '805', "806", "807", "808", '809', "888", '8A', '8E7R', '8E8R', 'DM1', 'P757', 'P758', 'P759', 'P760', 'P761', 'P768', 'P7H', 'XA1', 'XA2'], 20: ["1M11", '1M1', '1M2', '1M3', '1M4', '1M5', '1M6', '1M7', '1M12', '1M13', '1M14', '1M15', '1M16', '1M6', '1M7', '2M1', '2M7', '2M8', '505', '522', '524', '526', '538', '546', '582', 'D11', 'L24', 'L25', 'L38', 'MD3', 'ML1'], 29: ['2K'], 32: ['S5', 'S6', 'S7'], 33: ['A1', 'A10', 'A11', 'A12', 'A14', 'A16', 'A18', 'A5', 'A6', 'A9'], 35: ['10A', '14A', '14AB', '14AR', 'T1', 'T14A', 'T2', 'T4N', 'T4R', 'T5', 'T6'], 36: [], 37: [], 39: ['Z1', 'Z2', 'Z3', 'Z4'], 50: ['100', '102', '103', '103SD', '104', '105', '109', '110', '111', '112', '113', '115', '116', '117', '121', '124', "124 SD", '125', '127', '128', '130', '137', '141', '142', '143', '144', '145', '147', '148', '149', '150', '151', '155', '156', '157', '158', '163', '169', "169 SD", '174', '175', '180', '181', '183', '185', '186', '187', '188', '191', '192', '195', '199', '21', '214', '227', '230', "230D", '268', '276', '60', '60 SD', '62', '64', 'C1', 'C2', 'C3', 'C4', 'C5', 'CE1', 'D10', 'D5', 'D8', 'DE1', 'DM1', 'E14', 'G10', 'G11', 'G3', 'G8', 'L1', 'L112', 'L15', "L17", "L18", "L19", 'L2', 'L20', 'L22', "L23", 'L26', "L27", 'L28', 'L3', "L30", "L31", "L34", 'L35', 'L36', 'L39', 'L4', 'L41', 'L46', 'L5', 'L6', 'L9'], 70: ["6B", '11A', '17', '221', '300', '306', '316', '328', '329', '330', '370', '396', '71', '79', 'CE1', 'DM1', "UAM1", "LM13", 'L12', 'L31', "L32", 'L33', "PB", 'U11C', "U11S", "U11T", "8SR", 'XA1'], 80: [] }
var buses = null;
// var window.mapita = null;
var groupMarkers = null;
var groupStops = null;
var markers = new Array();
var bounds = null;
var firstTime = true;  // to ckeck if it is the first time that searches or is it an update 
let timeOut = null;
var selectedBus = null;
var timerfollowBus = null;
var selectedMarker = null;
let destinos = [];

import $, { type } from "jquery";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/custom_index_.css'

import * as bootstrap from 'bootstrap';

import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import "leaflet.locatecontrol/dist/L.Control.Locate.css"
import "leaflet.locatecontrol"

import busStopIcon from "../images/busstop.png"

import busIconUrl from "../images/BusIcon.png"
//import busIcon from "../images/BusIcon.png"

import { Workbox } from 'workbox-window'
import { registerSW } from 'virtual:pwa-register'
registerSW({ reloadOnUpdate: true, immediate: true })


// import "../serviceWorr.js"
$(document).ready(function () {

    setTimeout(() => {
        // Check for a waiting Service Worker
        console.log("enrtró")
        navigator.serviceWorker.getRegistration().then(function (registration) {
            if (registration.waiting) {
                // There is a waiting Service Worker
                if (confirm('Actualización disponible, ¿Desea actualizar la página?')) {
                    // Activate the waiting Service Worker
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                }
            }
        });

        // Add event listener for Service Worker updates
        navigator.serviceWorker.addEventListener('controllerchange', function () {
            // A new Service Worker has taken control of the page
            // Reload the page to ensure all resources are updated
            window.location.reload();
        })
    }
        , 10000)

    //service woerker

    // if ("serviceWorker" in navigator) {
    //     window.addEventListener("load", function () {
    //         navigator.serviceWorker
    //             .register("/serviceWorker.js")
    //             .then(res => console.log("service worker registered"))
    //             .catch(err => console.log("service worker not registered", err))
    //     })
    // }
    // navigator.serviceWorker.ready.then((registration) => {
    //     registration.update();
    //   });
    // PWA BUTTON
    var beforeInstallPrompt = null;   //variable to save the event 

    window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);


    function eventHandler(event) {
        beforeInstallPrompt = event;
        document.getElementById("pwa_btn").removeAttribute("disabled");
        document.getElementById("pwa_btn2").removeAttribute("disabled");

    }
    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        if (/Windows/i.test(userAgent)) {
            return 'Windows';
        } else if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent)) {
            return 'Mac';
        } else if (/Linux/i.test(userAgent)) {
            return 'Linux';
        }
        return "nosesabe"
    }


    window.addEventListener('appinstalled', () => {
        let eventName = "installed_app_from_"+getMobileOperatingSystem()
        gtag("event", eventName)
    });

    function errorHandler(event) {
        console.log("error: " + event);
    }

    $("#pwa_btn").click(() => {
        if (beforeInstallPrompt) { beforeInstallPrompt.prompt() };
    })
    $("#pwa_btn2").on("click", () => {
        if (beforeInstallPrompt) { beforeInstallPrompt.prompt() };
    })
    //button to show modal if there isnt an event
    setTimeout(() => {
        if (!beforeInstallPrompt) {
            document.getElementById("pwa_btn").removeAttribute("disabled");
            $("#pwa_btn").attr('data-bs-toggle', "modal")
            $("#pwa_btn").attr("data-bs-target", "#exampleModal")

            document.getElementById("pwa_btn2").removeAttribute("disabled");
            $("#pwa_btn2").attr('data-bs-toggle', "modal")
            $("#pwa_btn2").attr("data-bs-target", "#exampleModal")
        }
    }, 1000)



    // MAPA
    window.mapita = L.map('map').setView([-34.814733, -56.180452], 9)
        .on("moveend", (e) => { addStops() });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(window.mapita);
    L.control.locate({
        position: "topright",
        strings: {
            title: "Ubicarme."
        }
    }).addTo(window.mapita); // add add to locate
    //////////

    groupMarkers = L.featureGroup().addTo(window.mapita);
    // groupStops = L.featureGroup().addTo(window.mapita);


    // update de db
    function updateDB() {
        $.ajax(
            {
                url: `${DENO_URL}/updateDB`,
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

    ////ADD STOPS

    const dividend = 100
    const getNextEvenValue = (x) => Math.ceil(x * dividend) / dividend
    const getPrevioudEvenValue = (x) => Math.floor(x * dividend) / dividend
    const getEveryPointInInterval = (a, b) => {
        const begin = getPrevioudEvenValue(a)
        const end = getNextEvenValue(b)
        const arr = []
        // console.log(begin)
        // console.log(end)
        for (let i = begin; i <= end; i += 1 / dividend) {
            arr.push(i)
        }
        return arr
    }


    let globalIterator = 0;
    let mapTilesShown = new Map(); // array de cuadrados que están mostrados en el mapa

    const jsonTileMap = window.localStorage.getItem("tileMap2") // get the tile map from kocal storage
    let tileMapStorage = null
    if (jsonTileMap === null) {
        tileMapStorage = new Map()
    } else {
        tileMapStorage = new Map(JSON.parse(jsonTileMap))
    }


    // const getClave =(lay,long){
    //     return S
    // }
    const viewMoved = (bounds) => {
        globalIterator += 1
        let localIterator = globalIterator
        const lats = getEveryPointInInterval(bounds._southWest.lat, bounds._northEast.lat)
        const longs = getEveryPointInInterval(bounds._southWest.lng, bounds._northEast.lng)

        let arrayTilesSeen = new Array()   //array de cuadrados que se obtienen del viewport
        for (const lat of lats) {
            for (const long of longs) {
                arrayTilesSeen.push({ lat, long })
            }
        }

        if (mapTilesShown.size > 0) {
            mapTilesShown.forEach((id, key) => {
                if (!arrayTilesSeen.some(obj => JSON.stringify(obj) === key)) { //!arrayTilesSeen.some(obj => JSON.stringify(obj) === JSON.stringify(key))
                    deleteTileMap(id);
                    mapTilesShown.delete(key)
                }
            })
        }


        let promesas = new Array()
        arrayTilesSeen.forEach((tile) => {   //Por cada tile visto pide info del tile, puede estar en storage o lo tiene que pedir al server
            if (!mapTilesShown.has(JSON.stringify(tile))) {
                let promesa = findTileInfo(tile).then((data) => {
                    if (localIterator != globalIterator) {
                        // console.log("se resolvió tarde")
                        let error = "se resolvió tarde"
                        // Promise.reject()
                        throw error
                    }
                    if (Array.isArray(data)) {
                        let leafletID = showTileMap(data);
                        mapTilesShown.set(JSON.stringify(tile), leafletID) //String([tile.lat, tile.long])
                        return { tile, data }
                    } else {
                        mapTilesShown.set(JSON.stringify(tile), [])
                        return { tile, data: [] }
                    }

                }

                )
                promesas.push(promesa)
            } else {
                // console.log("estaba ya en el mapa")
            }
        })
        Promise.allSettled(promesas).then((setResult) => {
            setResult.forEach((set) => {
                if (set.status == "fulfilled") {
                    tileMapStorage.set(JSON.stringify(set.value.tile), set.value.data)
                }
            }

            )
            localStorage.setItem('tileMap2', JSON.stringify(Array.from(tileMapStorage.entries())))
        })
    }

    const showTileMap = (data) => {
        if (Array.isArray(data)) {
            groupStops = L.layerGroup()
            data.forEach(stop => {
                const marker = L.marker(stop.geometry.coordinates, { icon: stopIcon }) //removed reverse()
                // const radioLineasDiv = document.createElement("div")
                var $divparent = $("<div>", { "class": "overflow-auto", "style": "max-height: 15rem; max-width: 10rem" })
                $divparent.append(`<p class="mb-0 mt-0 fs-6 fw-bold">Seleccioná la linea a buscar:  </p> </br> `)
                var $div = $("<div>")
                stop.properties.lineas.split("-").forEach(
                    (e) => {
                        // console.log(e)
                        var $button = $("<button>", { id: "button" + e, "type": "button", "class": "btn btn-outline-primary btn-sm", "style": "width:4rem" }).on("click", (e) => { searchBusbyButton(e) }).append(e)
                        // $button.click(()=> {console.log("apretaste")})
                        $div.append($button)
                    }
                )
                $divparent.append($div)
                // $divparent.on("click", "button", function (e) {
                //     console.log(e);
                // });
                marker.bindPopup($divparent[0])

                marker.addTo(groupStops)
            })
            groupStops.addTo(window.mapita)
            // neWarrayStopsGroups.set(string, groupStops._leaflet_id)
            return groupStops._leaflet_id
        }

    }
    const searchBusbyButton = (e) => {
        firstTime = true
        let empresa = null
        for (let key in lineas) {
            if (lineas[key].indexOf(e.currentTarget.innerText) !== -1) {
                empresa = key
            }
        }
        ajaxSearchBuses(empresa, e.currentTarget.innerText)

        console.log(empresa)
        setCurrentLine(e.currentTarget.innerText, empresa)
        gtag('event', 'searched_bus_by_stop', { "empresa": empresa, "linea": e.currentTarget.innerText });

    }

    const findTileInfo = async (tile) => {
        if (tileMapStorage.has(JSON.stringify(tile))) {  // if the tile has the  information saved 

            let data = tileMapStorage.get(JSON.stringify(tile))
            return new Promise((resolve) => {
                resolve(data)
            })
        } else {

            let btmLeft = [tile.long + (1 / dividend), tile.lat]
            let upperRight = [tile.long, tile.lat + (1 / dividend)]
            let strbtmleft = String(btmLeft).replace(/\[|\]/g, "");
            let strupperRight = String(upperRight).replace(/\[|\]/g, "")
            return new Promise((resolve) => {
                $.ajax(
                    {
                        url: `${DENO_URL}/getStops?btmLeft=` + strbtmleft + "&upperRight=" + strupperRight,
                        method: "get",
                        contentType: "application/json",
                        success: (response) => {
                            var paradas = response.data
                            if (Array.isArray(paradas)) {
                                paradas.forEach((e) => { e.geometry.coordinates = e.geometry.coordinates.reverse() })
                            }
                            tileMapStorage.set(JSON.stringify(tile), paradas)
                            resolve(paradas)
                        }
                    }
                )
            })

        }
    }


    const deleteTileMap = (id) => {
        var layerToRemove = window.mapita._layers[id];
        if (layerToRemove) {
            window.mapita.removeLayer(layerToRemove)
        }
    }

    // tilemap = saco de localstorage
    // fun me movi{
    //     incremento iterador global
    //     let localIncremetnador = incrementadorglobal

    //     for h for L
    //         arrayDeCuadrdisQueVeo


    //     elementos  listadecuadrados q ya no quiero mostrar pq no estan en viewport
    //         quito layer del mapa
    //         los bborro de listadecuadrados



    //     arrayDeCuadrdisQueVeo.forEach(
    //         si no esta en el listadecuadrados{
    //            let promesa = pbuscaresecuadrado(data),then(
    //             if(localIncremetnador =! globalIncrementador){
    //                 decir que omití la repsuesta pq es vieja 
    //                 return Promise.reject()
    //             }
    //             idleaflet = agregaalmapa(data)
    //             return {idleaflet, data}
    //            )
    //            promesas.push(promesa)
    //         }
    //     )
    //     Promise.allSettled(promesas).then((settlementResults) =>{
    //         settlementResults.forEach((sr)=>{
    //             si sr esta bien{
    //                 tilemap.set(sr.idleaflet,sr.data)
    //             }
    //         }
    //         window.localStorage.set("tileMap",tilemap)
    //         )
    //     }

    //     )

    // }

    // for cuadradp em listadecuadradosviejos
    // if (cusdrado.x, cuadrado.y no esta en el csmpo seleccionado del mapa)
    //     mapa.removelayer(cuadrado.id)
    // pbuscaresecuadrado(){

    // }
    const setCurrentLine = (line, empresa) => {  // to change the select text to the line watching
        $("#empresa").val(empresa)
        $(".segundo").removeAttr("disabled");
        $("#linea").empty()
        $("#linea").append('<option value=' + line + '>' + line + '</option>')
    }


    const addStops = () => {
        if (window.mapita.getZoom() >= 15) {


            viewMoved(window.mapita.getBounds())
        } else {
            mapTilesShown.forEach((id, key) => {
                deleteTileMap(id);
                mapTilesShown.delete(key)
            })
        }
    }
    var stopIcon = L.icon({
        iconUrl: busStopIcon,
        // shadowUrl: 'leaf-shadow.png',

        iconSize: [15, 39], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        iconAnchor: [7, 39], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [0, -39] // point from which the popup should open relative to the iconAnchor
    });

    var busIcon = L.icon({
        iconUrl: busIconUrl,
        // shadowUrl: 'leaf-shadow.png',

        iconSize: [25, 55], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        iconAnchor: [12.5, 55], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [0, -39] // point from which the popup should open relative to the iconAnchor
    })


    //////alert

    // SEARCH BUTTON
    $("#search").click(async () => {
        if (firstTime) {
            ajaxSearchBuses($("#empresa").val(), $("#linea").val())
            gtag('event', 'searched_bus', { "empresa": $("#empresa").val(), "linea": $("#linea").val() });
            // console.log("hola hola")
        } else {
            if (!timeOut) {
                ajaxSearchBuses($("#empresa").val(), $("#linea").val())
                timeOut = setTimeout(() => { clearTimeout(timeOut); timeOut = null }, 2000)
            }
        }
    }
    )
    const ajaxSearchBuses = (empresa, linea) => {
        $.ajax(
            {
                url: `${DENO_URL}/buses?codigoEmpresa=` + empresa + "&linea=" + linea,
                method: "get",
                contentType: "application/json",
                // data:JSON.stringify({"subsistema":"-1","empresa":"-1"}),
                success: (response) => {
                    showResponseBuses(response)
                    console.log(response)
                }

            }
        )
    }
    //array for the markers of the map
    function showResponseBuses(response) {
        //console.log(response)
        $("#search").html("Actualizar")
        buses = response.data;
        buses.forEach(bus => { bus.geometry.coordinates.reverse() })
        let last = response.lastUpdateDB;
        // console.log(last)
        if (buses.length > 0) {
            destinos = new Array(); // to save later destinations to choose from
            buses.forEach(bus => {
                if (destinos.indexOf(bus.properties.destinoDesc) === -1) { destinos.push(bus.properties.destinoDesc) };//make a list of the destinations so u can show them as button to select
            });
            if (firstTime) {
                adddestinatiosHtml();
            }
            new Promise(function (resolve) {
                filterBusesByDest();
                resolve()
            })


            $("#alert_tiempo").empty();
            if (((Date.now() - response.lastUpdateDB) >= 25000)) {
                $("#alert_tiempo").empty()
                    .append('<div class="alert alert-warning alert-dismissible fade show" role="alert">Las ubicaciones no están actualizadas, intente actualizar nuevamente en unos segundos. (diferencia ' + (Date.now() - response.lastUpdateDB) / 1000 + 'segundos)<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>')
                console.log("mas de 20 seg");
                updateDB();
                $("#search").addClass('disabled');
                $("#search").html("Espere")
                setTimeout(function () { $("#search").removeClass('disabled'); $("#search").html("Actualizar") }, 5000)
                $("#select_company")[0].scrollIntoView()


            } else {
                $("#map")[0].scrollIntoView()
            }
            // $(".tercero").removeClass("invisible")
            $(".tercero").removeAttr("hidden")

        } else {
            $("#alert_tiempo").empty()

                .append('<div class="alert alert-warning alert-dismissible fade show" role="alert">No hay ubicaciones reportadas para su búsqueda, intente nuevamente.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>')

        }
        firstTime = false
    }


    function adddestinatiosHtml() {  //adds the destinations so u can toggle betwen them
        let i = 0
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
        let buesesChecked = buses.filter(bus => destChecked.includes(bus.properties.destinoDesc)) //
        showBuses(buesesChecked, 15);

    };


    function showBuses(busess, zoom) { //add buses to the map recived as an array
        //remove markers if there are any'
        new Promise(function (resolve) {
            window.mapita.removeLayer(groupMarkers)
            groupMarkers = L.featureGroup();
            resolve();
        }).then(() => {
            busess.forEach((bus) => {
                if (isInside(bus.geometry.coordinates)) {
                    let btn_attr = null
                    if (timerfollowBus) { // if following a bus, the button of the pop up to follow a bus deactivated
                        btn_attr = "disabled"
                    }
                    const marker = L.marker(bus.geometry.coordinates, { icon: busIcon }) //removed reverse()
                    marker.bindPopup(`<div style="display: flex; justify-content: space-between;"> <p class="mb-0 mt-0 fs-6 fw-bold"><b>${bus.properties.linea} </b> </p>       <button class= "mt-0 mb-0 btn btn-outline-primary btn-sm fw-bold seguiBus" ${btn_attr}>Seguí tu bondi</button> </div>
                </br>Destino: ${bus.properties.destinoDesc} </br>
                 Tipo: ${bus.properties.sublinea}`)
                        .on("click", saveSelectedBus)
                    // marker.addTo(map)
                    markers.push(marker)
                    marker.addTo(groupMarkers)
                    bus.marker_id = groupMarkers.getLayerId(marker)   // vinculate each bus to a marker in the map
                } else {
                    console.log("Un bondi estaba fuera de uruguay")
                }

            })
            groupMarkers.addTo(window.mapita);
            //new Promise((resolve) => {
            bounds = null
            bounds = groupMarkers.getBounds();
            //   resolve()
            //}).then(() => {

            if (busess.length > 1) {
                window.mapita.fitBounds(bounds)
            } else {
            }
            if (busess.length == 1) {
                window.mapita.setView(busess[0].geometry.coordinates, zoom)
            }
            // }
            //)
            //$('.leaflet-marker-icon').on('click',(e)=>{saveSelectedBus(e)});

        })
    }


    const isInside = (point) => {// check if the bus is inside the metropolitan area
        // ray-casting algorithm based on
        // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
        const vs = [[
            -57.0416736,
            -33.9114244
        ],
        [
            -57.0636507,
            -35.1291316
        ],
        [
            -54.9703315,
            -35.2009977
        ],
        [
            -55.01978,
            -33.9843498
        ]];

        var x = point[1], y = point[0];//changed this

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };

    $("#empresa").change(function () {
        firstTime = true
        var empresa = $("#empresa").val();
        // empresa = document.getElementById("empresa").value;
        $(".segundo").removeAttr("disabled");
        $("#linea").empty()
        lineas[empresa].forEach(i => {
            $("#linea").append(`<option value=${i}>  ${i} </option>`)
        });
    })
    $("#linea").change(() => {
        firstTime = true
    }
    )
    const saveSelectedBus = (e) => {   // saves the bus vinculated to the marker clicked
        selectedBus = null
        console.log(groupMarkers.getLayerId(e.target))
        //console.log(e)
        //console.log(groupMarkers.getLayerId(e.target))
        selectedBus = buses.filter(bus => bus.marker_id == groupMarkers.getLayerId(e.target))
        selectedMarker = e.target
    }

    const followSelectedBus = (response) => {   // centers the map on the selected bus
        if (response) {
            if (((Date.now() - response.lastUpdateDB) >= 20000)) {
                updateDB();
            }
            buses = response.data
            buses.forEach(bus => { bus.geometry.coordinates.reverse() })
            showBuses(buses, window.mapita.getZoom())
            //var mapZoom = null;
            //mapZoom = map.getZoom()
            //map.setView(response.data[0].geometry.coordinates.reverse(), 9)


            //console.log(mapZoom)
        } else {
            showBuses(selectedBus, 15)
            // map.setView(selectedBus[0].geometry.coordinates, 15)
            timerfollowBus = setInterval(() => {
                getBusByID(selectedBus[0].properties.id)
            }, 7000)
        }
        $("#alert_follow").empty()
            .append('<div style="display: flex; justify-content: space-between;" class="alert alert-info fade show" role="alert"><p class="align-self-center mb-0 mt-0">Estás siguiendo a tu bondi (actualización automática).</p><button type="button" class="btn btn btn-outline-danger align-self-right" id="closeBtnFollow">Dejar de seguir</button> </div>')
        $("#closeBtnFollow").click(() => {
            $("#alert_follow").empty()
            clearInterval(timerfollowBus)
            timerfollowBus = null
            ajaxSearchBuses($("#empresa").val(), $("#linea").val())
        })
    }

    $(document).on("click", ".seguiBus", function (e) {   //adds the events fot p tag that dosnt yet exists
        if (!timerfollowBus) {
            followSelectedBus();  //only follow bus if there is a timer 
        }
        // selectedMarker._popup.setContent((`<div style="display: flex; justify-content: space-between;"> <p class="mb-0 mt-0 fs-6 fw-bold"><b>${selectedBus[0].properties.linea} </b> </p>       <button class= "mt-0 mb-0 btn btn-outline-primary btn-sm fw-bold seguiBus" disabled>Siguiendo.</button> </div>
        // </br>Destino: ${selectedBus[0].properties.destinoDesc} </br>
        //  Tipo: ${selectedBus[0].properties.sublinea}`))
    });





    const getBusByID = (ID) => {
        $.ajax(
            {
                url: `${DENO_URL}/getBusbyID?ID=${ID}`,
                method: "get",
                contentType: "application/json",
                // data:JSON.stringify({"subsistema":"-1","empresa":"-1"}),
                success: (response) => {
                    followSelectedBus(response)
                }
            }
        )
    }
    ////// FAVOURITES
    const hola = () => {
        console.log(hola)
    }
    const displayFavedLines = () => {
        $("#fav_lines").empty()
        if (savedLines.length > 0) {
            $("#fav_lines_box").removeClass("d-none")
            savedLines.forEach((line) => {
                $("#fav_lines").append(` 
                    <button type="button" class="btn btn-primary btn-sm " id="button_line_${line}" value=${line}>
                    ${line}
                    <span aria-hidden="true" class="close" data-dismiss="alert" id="span_${line}">&times;</span>
                </button>`
                )
                $(`#span_${line}`).on("click", (e) => {
                    e.currentTarget.parentElement.remove()
                    removeLineFav(line)
                    if (savedLines.length == 0) {
                        $("#fav_lines_box").addClass("d-none")
                    }
                })
                $(`#button_line_${line}`).on("click", (e) => {
                    firstTime = true
                    let empresa = null
                    for (let key in lineas) {
                        if (lineas[key].indexOf(e.currentTarget.value) !== -1) {
                            empresa = key
                        }
                    }
                    console.log(empresa, e.currentTarget.value)
                    ajaxSearchBuses(empresa, e.currentTarget.value)
                    setCurrentLine(e.currentTarget.value, empresa)
                })
            })
        }
    }

    let jsonFavedLines = window.localStorage.getItem("favedLines") // get the saved lines from kocal storage
    let savedLines = null
    if (jsonFavedLines === null) {
        savedLines = []
    } else {
        savedLines = JSON.parse(jsonFavedLines)
        displayFavedLines()
    }


    const removeLineFav = (line) => {
        const index = savedLines.indexOf(line);
        if (index > -1) { // only splice array when item is found
            savedLines.splice(index, 1); // 2nd parameter means remove one item only
        }
        window.localStorage.setItem("favedLines", JSON.stringify(savedLines));
    }

    const addLineFav = () => {
        let linea = $("#linea").val();
        if (!savedLines.includes(linea)) {
            savedLines.push(linea)
            window.localStorage.setItem("favedLines", JSON.stringify(savedLines));
        }
        displayFavedLines()
    }



    $("#add_fav").on("click", addLineFav)

    //////////////////////MODAL WHATS NEW
    let showModal = window.localStorage.getItem("showModalVersion")
    const myModal = new bootstrap.Modal($("#modal_whats_new"));
    console.log(showModal, JSON.parse(showModal))
    if (showModal == null || JSON.parse(showModal) != "0.0.8.1") {
        myModal.show()
    }

    $("#close_modal_new").on("click", () => {
        myModal.hide()

        window.localStorage.setItem("showModalVersion", JSON.stringify("0.0.8.1"))
    })

    let empresas = [
        {
            codigo: '13',
            descripcion: 'CASANOVA LIMITADA'
        },
        {
            codigo: '29',
            descripcion: 'C.I.T.A.'
        },
        {
            codigo: '10',
            descripcion: 'C.O.E.T.C.'
        },
        {
            codigo: '33',
            descripcion: 'C.O. DEL ESTE'
        },
        {
            codigo: '20',
            descripcion: 'C.O.M.E.S.A'
        },
        {
            codigo: '18',
            descripcion: 'C.O.P.S.A.'
        },

        {
            codigo: '50',
            descripcion: 'C.U.T.C.S.A.'
        },
        {
            codigo: '32',
            descripcion: 'SATT'
        },

        {
            codigo: '35',
            descripcion: 'TALA-PANDO-MONTEVIDEO'
        },
        {
            codigo: '70',
            descripcion: 'U.C.O.T.'
        },
        {
            codigo: '39',
            descripcion: 'ZEBALLOS HERMANOS'
        }, {
            codigo: '41',
            descripcion: 'RUTAS DEL NORTE'
        },



    ];

    for (let i in empresas) {
        $('#empresa').append(('<option value=' + empresas[i].codigo + '>' + empresas[i].descripcion + '</option>'))
    }




})
