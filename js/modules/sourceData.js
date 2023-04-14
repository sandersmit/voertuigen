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

//use local source
//const endpoint1 = '../../data/rdw.json';
//use online source
//set scope to only cars. - could optionaly make a filter by using:  api.https://dev.socrata.com/docs/filtering.html
//get all results // is random
//const endpoint1 = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json';
//get Pesonenauto's only
const endpoint1 = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json?voertuigsoort=Personenauto';
const fetchEndpoint1 = function () {
    addloader();
    fetch(endpoint1).then(function (response) {
        return response.json();
    }).then(function (allDataFetched) {
       removeloader();
       initApp.voertuigen = allDataFetched;
       init();
       updateAppData();
    }).catch(function (error) {
        console.log(error);
    });
};

const fetchEndpoint2 = function (currvoertuiglinkAttrLocalStorage) {
    //use local storage in endpoint
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
//loader for user UI
function addloader(){
    const loader = document.createElement("div");
    loader.classList.add("loader");
    let gridContainer = document.getElementsByClassName("gridContainer");
    gridContainer[0].appendChild(loader);
}
function removeloader(){
    let loader = document.getElementsByClassName("loader");
    loader[0].remove();
}

export {fetchEndpoint1, fetchEndpoint2};