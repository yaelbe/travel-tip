import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onDelete = onDelete
window.onRenderLocations = RenderLocations

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            RenderLocations()
        })
        .catch(() => console.log('Error: cannot init map'))
}

function RenderLocations() {
    locService.getLocs().then(renderLocs)

}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            pos = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            onPanTo(pos)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo(obj) {
    console.log('Panning the Map', obj)
    renderLocationName(obj.name)
    mapService.panTo(obj.lat, obj.lng)
}

function renderLocs(locs) {
    let strHtml = locs.map(location =>
        `<li>
        ${location.name}<br>
      location: [lat:${location.lat} , lng: ${location.lng}]
      <button onclick="onPanTo({lat:${location.lat},lng:${location.lng},name:'${location.name}'})">Go</button>
      <button onclick="onDelete('${location.id}')">delete</button>
        </li > `
    )

    document.querySelector('.locations-list').innerHTML = strHtml.join('')
}

function onDelete(id) {
    console.log(id);
    locService.remove(id).then(onInit)
}

function renderLocationName(name) {
    document.querySelector('.addres').innerText = name
}