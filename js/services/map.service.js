export const mapService = {
  initMap,
  addMarker,
  panTo,
  locationFromAddress,
  askForName,
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
  // console.log('InitMap')
  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })
    gMap.addListener('click', onAddMarker)
    // console.log('Map!', gMap)
  })
}

function addMarker(loc, name) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: name,
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyCCFaZB_hNjFfmy8dUF1hgsK27XTUPJ30E'

  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}

function locationFromAddress(address) {
  const API_KEY = 'AIzaSyCCFaZB_hNjFfmy8dUF1hgsK27XTUPJ30E'
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.results[0].geometry.location)
}

function askForName(lat, lng) {
  google.maps.InfoWindow.prototype.opened = false
  const innerHtml = `
   <input type="text" name="location" placeholder="what is this place?"/>
   <button class="btn-ok" >✅</button>`

  let infoWindow = new google.maps.InfoWindow({
    content: innerHtml,
    position: { lat, lng },
  })
  infoWindow.open(gMap)

  return new Promise((resolve, reject) => {
    google.maps.event.addListener(infoWindow, 'domready', () => {
      let elOk = document.querySelector('.btn-ok')
      elOk.addEventListener('click', () => {
        console.log(lat, lng)
        const locationName = document.querySelector('input[name="location"]').value
        infoWindow.close()
        resolve(locationName)
      })
    })
  })
}
