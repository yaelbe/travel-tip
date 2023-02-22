import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onDelete = onDelete
window.onRenderLocations = renderLocation
window.onHandleSubmit = onHandleSubmit

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            renderLocation()
        })
        .catch(() => console.log('Error: cannot init map'))
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

function onPanTo(location) {
    console.log('Panning the Map', location)
    renderLocationName(location.name)
    mapService.panTo(location.lat, location.lng)
}

function renderLocation() {
    locService.query().then(locs => {
        console.log(locs);

        let strHtml = locs.map(location =>
            `<li>
            ${location.name}<br>
          location: [lat:${location.lat} , lng: ${location.lng}]
          <button onclick="onPanTo({lat:${location.lat},lng:${location.lng},name:'${location.name}'})">Go</button>
          <button onclick="onDelete('${location.id}')">delete</button>
            </li > `
        )

        document.querySelector('.locations-list').innerHTML = strHtml.join('')

    })

}

function onDelete(id) {
    locService.remove(id).then(renderLocation)
}

function renderLocationName(name) {
    document.querySelector('.address').innerText = name
}

function onHandleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const fromEntries = Object.fromEntries(formData)
    const keyword = fromEntries['keyword']


    mapService.locationFromAddress(keyword.trim())
        .then((pos) => locService.createLocation(pos, keyword))
        .then(onPanTo)
        .then(renderLocation)
    e.target.reset()

}
