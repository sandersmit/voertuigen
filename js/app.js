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

//initial object method for app
const initApp = {
    voertuigen: "",
    init: function () {
        if (document.getElementById('voertuigOverzichtPage') != null) {
            //fetch endpoint for cars personcars only
            fetchEndpoint1();   
        }
        if (document.getElementById('voertuigDetailPage') != null) {
             //fetch another endpoint with this function
            loadvoertuigDetailPage();
        }
    }
};
const startApp = function () {
    initApp.init();
};
//start app in page load
document.addEventListener("DOMContentLoaded", startApp);
export {
    initApp
};