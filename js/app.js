/*jslint node: true */
/* esversion: 8 */
/* jshint esversion: 6 */
// 'use strict';

import {
    fetchEndpoint1
} from './modules/sourceData.js';
import {
    loadvoertuigDetailPage
} from './modules/displayVoertuigDetail.js';

const initApp = {
    voertuigen: "",
    init: function () {
        console.log("init app");
        if (document.getElementById('voertuigOverzichtPage') != null) {
            fetchEndpoint1();   
        }
        if (document.getElementById('voertuigDetailPage') != null) {
            console.log("init app");
            loadvoertuigDetailPage();
        }
    }
};
const startApp = function () {
    initApp.init();
};

document.addEventListener("DOMContentLoaded", startApp);
export {
    initApp
};