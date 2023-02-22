import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const LOCATION_KEY = 'locationDB'

export const locService = {
    getLocs

}

_createLocations()
const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384, },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581, }
]

function getEmptyLocation(id = '', createdAt = '', updatedAt = '') {
    return { id, createdAt, updatedAt }

}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function _createLocations() {
    let locations = utilService.loadFromStorage(LOCATION_KEY)
    console.log(locations)
    if (!locations || !locations.length) {
        _createDemoLocations()
    }
}

function _createDemoLocations() {
    let locationNames = ['GreatPlace', 'NeverAgian']
    let locationLat = [32.047104, 32.047201]
    let locationLng = [34.832384, 34.832581]

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

