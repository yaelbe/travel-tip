import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const LOCATION_KEY = 'locationDB'

export const locService = {
    getLocs: query,
    remove

}

_createLocations()
const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384, },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581, }
]

function getEmptyLocation(id = '', createdAt = '', updatedAt = '') {
    return { id, createdAt, updatedAt }

}

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

    const locations = locationNames.map((locationName, i) => {
        console.log(locationName);
        const location = _createLocation(locationName)
        location.lat = locationLat[i]
        location.lng = locationLng[i]
        return location
    })
    utilService.saveToStorage(LOCATION_KEY, locations)
}

function _createLocation(name) {
    const location = getEmptyLocation()
    location.name = name
    location.id = utilService.makeId()
    location.createdAt = utilService.formatTime()
    location.updatedAt = utilService.formatTime()
    return location
}

function remove(locationId) {
    return storageService.remove(LOCATION_KEY, locationId)
}