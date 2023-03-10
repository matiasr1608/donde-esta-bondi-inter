const DENO_URL = "backend.matiasrolando.com"
let routes_line = null;
let origen = new Array();
let recorridos = new Array();
let routesFiltered = new Array();
var lineas = { 10: ['2', '222', '402', '404', '405', '407', '409', '427', '456', '494', '4A', '4AC', '4AD', '4D', '4DR', '600', '76', 'CE1', 'D9', 'G', 'L14', 'L16', 'L29', 'L7'], 13: ['15A', '15B', '6A', '6R6'], 18: ['1A', '2A', '700', '701', '703', '704', '705', '706', '707', '708', '709', '710', '711', '712', '714', '724', '747', '748', '750', '751', '752', '757', '7A', '7E7R', '7E8R', '802', '803', '804', '809', '8A', '8E7R', '8E8R', 'DM1', 'P757', 'P758', 'P759', 'P760', 'P761', 'P768', 'P7H', 'XA1', 'XA2'], 20: ['1M1', '1M12', '1M6', '1M7', '2M1', '2M7', '2M8', '505', '522', '524', '526', '538', '546', '582', 'D11', 'L24', 'L25', 'L38', 'MD3', 'ML1'], 29: ['2K'], 32: ['S5', 'S6', 'S7'], 33: ['A1', 'A10', 'A11', 'A12', 'A14', 'A16', 'A18', 'A5', 'A6', 'A9'], 35: ['10A', '14A', '14AB', '14AR', 'T1', 'T14A', 'T2', 'T4N', 'T4R', 'T5', 'T6'], 36: [], 37: [], 39: ['Z1', 'Z2', 'Z3', 'Z4'], 50: ['100', '102', '103', '104', '105', '109', '110', '111', '112', '113', '115', '116', '117', '121', '124', '125', '127', '128', '130', '137', '141', '142', '143', '144', '145', '147', '148', '149', '150', '151', '155', '156', '157', '158', '163', '169', '174', '175', '180', '181', '183', '185', '186', '187', '188', '191', '192', '195', '199', '21', '214', '227', '230', '268', '276', '60', '62', '64', 'C1', 'C2', 'C3', 'C4', 'C5', 'CE1', 'D10', 'D5', 'D8', 'DE1', 'DM1', 'E14', 'G10', 'G11', 'G3', 'G8', 'L1', 'L15', 'L2', 'L20', 'L22', 'L26', 'L28', 'L3', 'L35', 'L36', 'L39', 'L4', 'L41', 'L46', 'L5', 'L6', 'L9'], 70: ['11A', '17', '221', '300', '306', '316', '328', '329', '330', '370', '396', '71', '79', 'CE1', 'DM1', 'L12', 'L31', 'L33', 'U11C', 'XA1'], 80: [] }

import $ from "jquery";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom_index.css'

import * as bootstrap from 'bootstrap';

import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import "leaflet.locatecontrol/dist/L.Control.Locate.css"
import "leaflet.locatecontrol"

$(document).ready(() => {
    let map = L.map('map_routes').setView([-34.814733, -56.180452], 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const searchRoute = (linea) => {
        $.ajax(
            {
                url: `https://${DENO_URL}/getroutes?linea=${linea}`,
                method: "get",
                contentType: "application/json",


                // data:JSON.stringify({"subsistema":"-1","empresa":"-1"}),
                success: function (response) {
                    console.log(response);
                    routes_line = response
                    origen = new Array();
                    recorridos = new Array()
                    routes_line.forEach(route => {
                        if (origen.indexOf(route.properties.Origen) === -1) { origen.push(route.properties.Origen) };//make a list of the origins so u can show them as button to select
                        if (recorridos.indexOf(route.properties.Recorrido) === -1) { recorridos.push(route.properties.Recorrido) };//make a list of the type of routes so u can show them as button to select
                    });
                    showSwitches();
                }
            }
        )
    }


    const showSwitches = () => {
        $("#switch_origen").empty()
        $("#switch_route").empty()
        if (routes_line.length == 0) {
            $(".tercero").attr("hidden")

            showAlert("No hay recorridos para la búsqueda realizada. Recuerde que sólo se pueden ver los recorridos de suburbanos")
        } else {
            $("#alert_search").empty()
            $(".tercero").removeAttr("hidden")

            origen.forEach((ori, i) => {
                $("#switch_origen").append(
                    `<div class= "form-check form-switch">
                        <input class="form-check-input check-origin" type="checkbox" name="prueba" role="switch" value="${ori}" id="flexSwitchCheck_origen${i}" >
                        <label class="form-check-label" for="flexSwitchCheck_origen${ori}">${ori}</label>
                    </div>`
                );
                $(`#flexSwitchCheck_origen${i}`).click(() => filterRoutes())
            })
            recorridos.forEach((rec, i) => {
                $("#switch_route").append(
                    `<div class= "form-check form-switch">
                        <input class="form-check-input check-routes" type="checkbox" name="prueba" role="switch" value="${rec}" id="flexSwitchCheck_recorrido${i}" >
                        <label class="form-check-label" for="flexSwitchCheck_recorrido${rec}">${rec}</label>
                    </div>`
                );
                $(`#flexSwitchCheck_recorrido${i}`).click(() => filterRoutes())
            })
        }

    }


    const filterRoutes = () => {
        var originChecked = new Array();
        var routesChecked = new Array();

        $(".check-origin:checked").each(function () {
            originChecked.push(($(this).val()))
        })
        $(".check-routes:checked").each(function () {
            routesChecked.push(($(this).val()))
        })
        if (originChecked) {
            routesFiltered = routes_line.filter(route => originChecked.includes(route.properties.Origen) && routesChecked.includes(route.properties.Recorrido))
            console.log(routesFiltered)
            showRoutes(routesFiltered);
        }
    }
    let groupRoutes = L.geoJSON()

    const showRoutes = (routesShow) => {
        groupRoutes.clearLayers()
        if(routesShow.length !=0){
            routesShow.forEach((route) => {
                groupRoutes.addData(route.geometry)
            })
            groupRoutes.addTo(map)
            let bounds = groupRoutes.getBounds();
            map.fitBounds(bounds)
        }
        
    }

    $("#search").click(async () => {
        console.log($("#linea").val())
        searchRoute($("#linea").val())
    }
    )


    const showAlert = (msg) => {
        console.log("alert")
        $("#alert_search").empty()
            .append(`<div class="alert alert-warning alert-dismissible fade show" role="alert">${msg}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>`)
    }

    $("#empresa").change(function () {
        var empresa = $("#empresa").val();
        $("#linea").empty()
        lineas[empresa].forEach(i => {
            $("#linea").append('<option value=' + i + '>' + i + '</option>')
        });
        $(".segundo").removeAttr("disabled")
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
        },



    ];

    for (let i in empresas) {
        $('#empresa').append(('<option value=' + empresas[i].codigo + '>' + empresas[i].descripcion + '</option>'))
    }
})