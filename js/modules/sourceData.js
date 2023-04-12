import {
    initApp
} from '../app.js';
import {
    init
} from './displayVoertuigOverview.js';
import {
    updateAppData
} from './displayVoertuigOverview.js';
import {
    printpredefined
} from './displayVoertuigDetail.js';

//use local download
//const endpoint1 = '../../data/rdw.json';
//use online
const endpoint1 = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json';
const fetchEndpoint1 = function () {
    fetch(endpoint1).then(function (response) {
        return response.json();
    }).then(function (allDataFetched) {
       initApp.voertuigen = allDataFetched;
       init();
       updateAppData();
    }).catch(function (error) {
        console.log(error);
    });
};

const fetchEndpoint2 = function (currvoertuiglinkAttrLocalStorage) {
    //use local storage in endpoint
    console.log(currvoertuiglinkAttrLocalStorage);
    const endpoint2 = `https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${currvoertuiglinkAttrLocalStorage}`;
    const VoertuigDetailContainer = document.getElementById("VoertuigDetailContainer");
    fetch(endpoint2).then(function (response) {
        return response.json();
    }).then(function (predefinedVoortuig) {
        printpredefined(predefinedVoortuig, VoertuigDetailContainer);
    }).catch(function (error) {
        console.log(error);
    });
};

export {fetchEndpoint1, fetchEndpoint2};