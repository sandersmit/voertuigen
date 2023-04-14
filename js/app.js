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
        if (document.getElementById('voertuigOverzichtPage') != null) {
            fetchEndpoint1();   
        }
        if (document.getElementById('voertuigDetailPage') != null) {
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