import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const LOCATION_KEY = 'locationDB'

export const locService = {
    query,
    remove,
    createLocation

}

// _createLocations()
const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384, },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581, }
]

function query() {
    return storageService.query(LOCATION_KEY)
}

function _createLocations() {
    let locations = utilService.loadFromStorage(LOCATION_KEY)
    if (!locations || !locations.length) {
        _createDemoLocations()
    }
}

function _createDemoLocations() {
    let locationNames = ['Las-Vegas', 'Coding-AcademyHQ']
    let locationLat = [36.188110, 32.068424]
    let locationLng = [-115.176468, 34.824785]

    locationNames.map((locationName, i) => {
        console.log(locationName);
        let pos = { lat: locationLat[i], lng: locationLng[i] }
        createLocation(pos, locationName)
    })
}

function createLocation(pos, name) {
    const location = {}
    const { lat, lng } = pos
    location.name = name
    location.lat = lat
    location.lng = lng
    location.id = utilService.makeId()
    location.createdAt = utilService.formatTime()
    location.updatedAt = utilService.formatTime()

    return storageService.post(LOCATION_KEY, location)


}

function remove(locationId) {
    return storageService.remove(LOCATION_KEY, locationId)
}
