
// app local storage key
export const STORAGE_KEY = 'covid-19-tracker';

// initial local storage data object
export const DATA_OBJ = {
    userPreferences: {
        theme: 'light'
    }
};


// covid-19 API
export const COVID_URL = 'https://disease.sh/v3/covid-19';
// export const COVID_API_WORLD = 'https://disease.sh/v3/covid-19';
// export const COVID_URL = 'https://disease.sh/v3/covid-19';


// leaflet map initial values
export const mapData = {
    initZoom: 2,
    focusZoom: 5,
    minZoom: 1,
    maxZoom: 16,
    initLat: 25,
    initLng: 10,
    flyDuration: 1.5
};