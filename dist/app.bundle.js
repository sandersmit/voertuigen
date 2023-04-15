/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initApp": () => (/* binding */ initApp)
/* harmony export */ });
/* harmony import */ var _modules_sourceData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/sourceData.js */ "./js/modules/sourceData.js");
/* harmony import */ var _modules_displayVoertuigDetail_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/displayVoertuigDetail.js */ "./js/modules/displayVoertuigDetail.js");
/*jslint node: true */
/* esversion: 8 */
/* jshint esversion: 6 */
// 'use strict';




//initial object method for app
const initApp = {
    voertuigen: "",
    init: function () {
        if (document.getElementById('voertuigOverzichtPage') != null) {
            //fetch endpoint for cars personcars only
            (0,_modules_sourceData_js__WEBPACK_IMPORTED_MODULE_0__.fetchEndpoint1)();   
        }
        if (document.getElementById('voertuigDetailPage') != null) {
             //fetch another endpoint with this function
            (0,_modules_displayVoertuigDetail_js__WEBPACK_IMPORTED_MODULE_1__.loadvoertuigDetailPage)();
        }
    }
};
const startApp = function () {
    initApp.init();
};
//start app in page load
document.addEventListener("DOMContentLoaded", startApp);


/***/ }),

/***/ "./js/modules/displayVoertuigDetail.js":
/*!*********************************************!*\
  !*** ./js/modules/displayVoertuigDetail.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadvoertuigDetailPage": () => (/* binding */ loadvoertuigDetailPage),
/* harmony export */   "printpredefined": () => (/* binding */ printpredefined),
/* harmony export */   "setVoertuigDetailPage": () => (/* binding */ setVoertuigDetailPage)
/* harmony export */ });
/* harmony import */ var _sourceData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sourceData.js */ "./js/modules/sourceData.js");


function setVoertuigDetailPage(event) {
    event.target.parentElement.classList.add('test');
    ///setting data attribute to link on the detail page
    const voertuiglinkAttr = event.target.parentElement.getAttribute("data-voertuigid");
    //setting local storage 
    setLocalStorage(voertuiglinkAttr);
}

function setLocalStorage(voertuiglinkAttr){
    let newId = localStorage.length + 1;
    localStorage.setItem(newId, voertuiglinkAttr);
}

function loadvoertuigDetailPage() {
    let lastestItem = localStorage.length;
    const currvoertuiglinkAttrLocalStorage = localStorage.getItem(lastestItem);
     (0,_sourceData_js__WEBPACK_IMPORTED_MODULE_0__.fetchEndpoint2)(currvoertuiglinkAttrLocalStorage);
}

function printpredefined(predefinedVoortuig, VoertuigDetailContainer) {
   const listholder = document.createElement("ul");
   const backBtn = document.createElement("a");
   const header = document.createElement("header");
   backBtn.classList.add("backlink");
   backBtn.setAttribute("href", "index.html");
    let generatedKeyArray = Object.keys(predefinedVoortuig[0]);
    let generatedValueArray = Object.values(predefinedVoortuig[0]);
      for (var i = 0; i < 3; i++) {
        header.innerHTML += `<div><h4>${generatedKeyArray[i]}</h4><p>${generatedValueArray[i]}</p></div>`;
        }
      for (var j = 4; j < generatedKeyArray.length; j++) {
        listholder.innerHTML += `<li><h4>${generatedKeyArray[j]}</h4><p>${generatedValueArray[j]}</p></li>`;
        }
        VoertuigDetailContainer.appendChild(backBtn);
        VoertuigDetailContainer.appendChild(header);
        VoertuigDetailContainer.appendChild(listholder);
}



/***/ }),

/***/ "./js/modules/displayVoertuigOverview.js":
/*!***********************************************!*\
  !*** ./js/modules/displayVoertuigOverview.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "trackDisplayVoortuig": () => (/* binding */ trackDisplayVoortuig),
/* harmony export */   "updateAppData": () => (/* binding */ updateAppData)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.js */ "./js/app.js");
/* harmony import */ var _displayVoertuigDetail_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayVoertuigDetail.js */ "./js/modules/displayVoertuigDetail.js");



const materials = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
  ];
  console.log("test1");
  console.log(materials.map(material => material.length));
  // Expected output: Array [8, 6, 7, 9]
//get the data object
function updateAppData() {
    let AllData = _app_js__WEBPACK_IMPORTED_MODULE_0__.initApp.voertuigen;
    return AllData;
}
//set a scoped array range in new array
function updateRange( rangeNumber ){
    if ( rangeNumber == 0 ) {
        rangeNumber = 0;
    }
    let baseStartRange = 50 * rangeNumber;
    let baseEndRange = baseStartRange + 50;
    let rangeArray = [];
    rangeArray.push(baseStartRange,baseEndRange);
    return rangeArray;
}

//update page with new scoped range array
function updatePaginitionItems(index){
    let rangeNumber = index; 
    fillArrays(updateAppData(), updateRange(rangeNumber));
}

//execute array loop with the chosen output for the user UI. 
function fillArrays(AllData,newdataUpdate){
    let allcontentpages = [];
    const voertuigOverzichtContainer = document.getElementById("VoertuigOverzichtContainer");
    voertuigOverzichtContainer.innerHTML = "";
    let newListholder = document.createElement('ul');
    for (let i in AllData) {
        allcontentpages.push(AllData[i]);
        }
        if (!newdataUpdate) {
            newdataUpdate = [0,50];
        }
        allcontentpages.slice(newdataUpdate[0] ,newdataUpdate[1]).forEach(function(value, index, arr){  
        let voertuigMerkVar = arr[index].merk;
        let voortuigSoort =  arr[index].voertuigsoort;
        let voertuigenKenteken = arr[index].kenteken;
        let voertuigHandelsBenaming = arr[index].handelsbenaming;
        let newElem = document.createElement('li');
        newElem.innerHTML =
        `<a href='voortuigdetail.html' data-voertuigId=${voertuigenKenteken}><h3 data-voertuigId=${voertuigenKenteken}>
        ${voertuigMerkVar}<span>${voertuigHandelsBenaming}</span></h3></a>`;
        newListholder.appendChild(newElem);
        newElem.firstChild.addEventListener("click", _displayVoertuigDetail_js__WEBPACK_IMPORTED_MODULE_1__.setVoertuigDetailPage);
     });
     voertuigOverzichtContainer.appendChild(newListholder);
 }
//component "Laatst bekekenvoertuigen"
 function trackDisplayVoortuig(){
    let trackEl = document.createElement('div');
    let container = document.getElementsByClassName("gridContainer");
    trackEl.classList.add('trackEl');
    //check in localstorage for displaying it. 
    for (var i = 1; i <= localStorage.length; i++) {
        let trackElitem = document.createElement('span');
        const prevvoertuiglinkAttrLocalStorage = localStorage.getItem(i);
        trackElitem.append(prevvoertuiglinkAttrLocalStorage);    
        trackEl.prepend(trackElitem);
    }
    //place it on te ui
    container[0].after(trackEl);
    trackEl.innerHTML+= `<h5>laatst bekeken voortuigen: </h5>`; 
    trackEl.addEventListener("click", openclose); 
}

//toggle component "Laatst bekekenvoertuigen"
function openclose(event)
{
    if (this.classList.contains('open')) {
        this.classList.toggle("open");
    } else {
        this.classList.toggle("open");
        document.addEventListener('click', checkDomClick); 
    }
}

//function to check click event outside components
function checkDomClick(event) {
    let trackEle = document.querySelectorAll(".trackEl");
    const outsideClickForComponent1 = !trackEle[0].contains(event.target);
    if (outsideClickForComponent1) {
        trackEle[0].classList.toggle("open");
        document.removeEventListener('click', checkDomClick);
    } 
  }

function addPaginition(pagenitionTotal){
    const pagenitionMenu = document.createElement("ul");
    pagenitionMenu.classList.add('pagination');  
        let container = document.getElementsByClassName("gridContainer");
        container[0].after(pagenitionMenu);
        for (let index = 1; index < pagenitionTotal; index++) {
            //plaats alle paginatie items die er zijn het menu
            updatePaginition(pagenitionMenu,index);
        }
}


function updatePaginition(pagenitionMenu,index){
       let pagenitionItem = document.createElement("li");
        pagenitionItem.classList.add('btn');
        pagenitionItem.addEventListener("click", changeStateMenuItem);
        // add horiontal scroll - instead of clicking to next menu item. - Feature UX
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // false for mobile device - 
        pagenitionMenu.addEventListener("mousemove", checkmouseX);
      }
       
       let btns = document.getElementsByClassName("btn");
          for (var i = 0; i < btns.length; i++) {
            btns[0].classList.add('active');  
          }
          //active state for user + update results on page 
          function changeStateMenuItem(event) {
            updatePaginitionItems(index);
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
            }
            //add the scroll on mouse movement - part of UX feature
            function checkmouseX(e) {  
                this.scrollLeft =+ e.clientX;
            }

        pagenitionItem.innerHTML += index;
        pagenitionMenu.appendChild(pagenitionItem);
}
//toon component "Laatst bekekenvoertuigen" alleen als er history is. 
if (localStorage.length > 0) {
    trackDisplayVoortuig();
}
//first execute for dipaying ui. 
function init() {
    let AllData =  updateAppData();
    let totalPerPage = 50; 
    let pagenitionTotal =  updateAppData().length/totalPerPage;
    addPaginition(pagenitionTotal);
    fillArrays(AllData);
}



/***/ }),

/***/ "./js/modules/sourceData.js":
/*!**********************************!*\
  !*** ./js/modules/sourceData.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchEndpoint1": () => (/* binding */ fetchEndpoint1),
/* harmony export */   "fetchEndpoint2": () => (/* binding */ fetchEndpoint2)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.js */ "./js/app.js");
/* harmony import */ var _displayVoertuigOverview_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayVoertuigOverview.js */ "./js/modules/displayVoertuigOverview.js");
/* harmony import */ var _displayVoertuigDetail_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayVoertuigDetail.js */ "./js/modules/displayVoertuigDetail.js");





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
       _app_js__WEBPACK_IMPORTED_MODULE_0__.initApp.voertuigen = allDataFetched;
       (0,_displayVoertuigOverview_js__WEBPACK_IMPORTED_MODULE_1__.init)();
       (0,_displayVoertuigOverview_js__WEBPACK_IMPORTED_MODULE_1__.updateAppData)();
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
        (0,_displayVoertuigDetail_js__WEBPACK_IMPORTED_MODULE_2__.printpredefined)(predefinedVoortuig, VoertuigDetailContainer);
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./js/app.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW5kYm94Ly4vanMvYXBwLmpzIiwid2VicGFjazovL3NhbmRib3gvLi9qcy9tb2R1bGVzL2Rpc3BsYXlWb2VydHVpZ0RldGFpbC5qcyIsIndlYnBhY2s6Ly9zYW5kYm94Ly4vanMvbW9kdWxlcy9kaXNwbGF5Vm9lcnR1aWdPdmVydmlldy5qcyIsIndlYnBhY2s6Ly9zYW5kYm94Ly4vanMvbW9kdWxlcy9zb3VyY2VEYXRhLmpzIiwid2VicGFjazovL3NhbmRib3gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2FuZGJveC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2FuZGJveC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NhbmRib3gvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zYW5kYm94L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2FuZGJveC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2FuZGJveC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLypqc2xpbnQgbm9kZTogdHJ1ZSAqL1xuLyogZXN2ZXJzaW9uOiA4ICovXG4vKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG4vLyAndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7XG4gICAgZmV0Y2hFbmRwb2ludDFcbn0gZnJvbSAnLi9tb2R1bGVzL3NvdXJjZURhdGEuanMnO1xuaW1wb3J0IHtcbiAgICBsb2Fkdm9lcnR1aWdEZXRhaWxQYWdlXG59IGZyb20gJy4vbW9kdWxlcy9kaXNwbGF5Vm9lcnR1aWdEZXRhaWwuanMnO1xuXG4vL2luaXRpYWwgb2JqZWN0IG1ldGhvZCBmb3IgYXBwXG5jb25zdCBpbml0QXBwID0ge1xuICAgIHZvZXJ0dWlnZW46IFwiXCIsXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvZXJ0dWlnT3ZlcnppY2h0UGFnZScpICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vZmV0Y2ggZW5kcG9pbnQgZm9yIGNhcnMgcGVyc29uY2FycyBvbmx5XG4gICAgICAgICAgICBmZXRjaEVuZHBvaW50MSgpOyAgIFxuICAgICAgICB9XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9lcnR1aWdEZXRhaWxQYWdlJykgIT0gbnVsbCkge1xuICAgICAgICAgICAgIC8vZmV0Y2ggYW5vdGhlciBlbmRwb2ludCB3aXRoIHRoaXMgZnVuY3Rpb25cbiAgICAgICAgICAgIGxvYWR2b2VydHVpZ0RldGFpbFBhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5jb25zdCBzdGFydEFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpbml0QXBwLmluaXQoKTtcbn07XG4vL3N0YXJ0IGFwcCBpbiBwYWdlIGxvYWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHN0YXJ0QXBwKTtcbmV4cG9ydCB7XG4gICAgaW5pdEFwcFxufTsiLCJpbXBvcnQge1xuICAgIGZldGNoRW5kcG9pbnQyXG59IGZyb20gJy4vc291cmNlRGF0YS5qcyc7XG5cbmZ1bmN0aW9uIHNldFZvZXJ0dWlnRGV0YWlsUGFnZShldmVudCkge1xuICAgIGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Rlc3QnKTtcbiAgICAvLy9zZXR0aW5nIGRhdGEgYXR0cmlidXRlIHRvIGxpbmsgb24gdGhlIGRldGFpbCBwYWdlXG4gICAgY29uc3Qgdm9lcnR1aWdsaW5rQXR0ciA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdm9lcnR1aWdpZFwiKTtcbiAgICAvL3NldHRpbmcgbG9jYWwgc3RvcmFnZSBcbiAgICBzZXRMb2NhbFN0b3JhZ2Uodm9lcnR1aWdsaW5rQXR0cik7XG59XG5cbmZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZSh2b2VydHVpZ2xpbmtBdHRyKXtcbiAgICBsZXQgbmV3SWQgPSBsb2NhbFN0b3JhZ2UubGVuZ3RoICsgMTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuZXdJZCwgdm9lcnR1aWdsaW5rQXR0cik7XG59XG5cbmZ1bmN0aW9uIGxvYWR2b2VydHVpZ0RldGFpbFBhZ2UoKSB7XG4gICAgbGV0IGxhc3Rlc3RJdGVtID0gbG9jYWxTdG9yYWdlLmxlbmd0aDtcbiAgICBjb25zdCBjdXJydm9lcnR1aWdsaW5rQXR0ckxvY2FsU3RvcmFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxhc3Rlc3RJdGVtKTtcbiAgICAgZmV0Y2hFbmRwb2ludDIoY3VycnZvZXJ0dWlnbGlua0F0dHJMb2NhbFN0b3JhZ2UpO1xufVxuXG5mdW5jdGlvbiBwcmludHByZWRlZmluZWQocHJlZGVmaW5lZFZvb3J0dWlnLCBWb2VydHVpZ0RldGFpbENvbnRhaW5lcikge1xuICAgY29uc3QgbGlzdGhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgIGNvbnN0IGJhY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICBiYWNrQnRuLmNsYXNzTGlzdC5hZGQoXCJiYWNrbGlua1wiKTtcbiAgIGJhY2tCdG4uc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcImluZGV4Lmh0bWxcIik7XG4gICAgbGV0IGdlbmVyYXRlZEtleUFycmF5ID0gT2JqZWN0LmtleXMocHJlZGVmaW5lZFZvb3J0dWlnWzBdKTtcbiAgICBsZXQgZ2VuZXJhdGVkVmFsdWVBcnJheSA9IE9iamVjdC52YWx1ZXMocHJlZGVmaW5lZFZvb3J0dWlnWzBdKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGhlYWRlci5pbm5lckhUTUwgKz0gYDxkaXY+PGg0PiR7Z2VuZXJhdGVkS2V5QXJyYXlbaV19PC9oND48cD4ke2dlbmVyYXRlZFZhbHVlQXJyYXlbaV19PC9wPjwvZGl2PmA7XG4gICAgICAgIH1cbiAgICAgIGZvciAodmFyIGogPSA0OyBqIDwgZ2VuZXJhdGVkS2V5QXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgbGlzdGhvbGRlci5pbm5lckhUTUwgKz0gYDxsaT48aDQ+JHtnZW5lcmF0ZWRLZXlBcnJheVtqXX08L2g0PjxwPiR7Z2VuZXJhdGVkVmFsdWVBcnJheVtqXX08L3A+PC9saT5gO1xuICAgICAgICB9XG4gICAgICAgIFZvZXJ0dWlnRGV0YWlsQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhY2tCdG4pO1xuICAgICAgICBWb2VydHVpZ0RldGFpbENvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgICAgICBWb2VydHVpZ0RldGFpbENvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0aG9sZGVyKTtcbn1cblxuZXhwb3J0IHtcbiAgICBzZXRWb2VydHVpZ0RldGFpbFBhZ2UsXG4gICAgbG9hZHZvZXJ0dWlnRGV0YWlsUGFnZSxcbiAgICBwcmludHByZWRlZmluZWRcbn07IiwiaW1wb3J0IHtcbiAgICBpbml0QXBwXG59IGZyb20gJy4uL2FwcC5qcyc7XG5pbXBvcnQge1xuICAgIHNldFZvZXJ0dWlnRGV0YWlsUGFnZVxufSBmcm9tICcuL2Rpc3BsYXlWb2VydHVpZ0RldGFpbC5qcyc7XG5cbmNvbnN0IG1hdGVyaWFscyA9IFtcbiAgICAnSHlkcm9nZW4nLFxuICAgICdIZWxpdW0nLFxuICAgICdMaXRoaXVtJyxcbiAgICAnQmVyeWxsaXVtJ1xuICBdO1xuICBjb25zb2xlLmxvZyhcInRlc3QxXCIpO1xuICBjb25zb2xlLmxvZyhtYXRlcmlhbHMubWFwKG1hdGVyaWFsID0+IG1hdGVyaWFsLmxlbmd0aCkpO1xuICAvLyBFeHBlY3RlZCBvdXRwdXQ6IEFycmF5IFs4LCA2LCA3LCA5XVxuLy9nZXQgdGhlIGRhdGEgb2JqZWN0XG5mdW5jdGlvbiB1cGRhdGVBcHBEYXRhKCkge1xuICAgIGxldCBBbGxEYXRhID0gaW5pdEFwcC52b2VydHVpZ2VuO1xuICAgIHJldHVybiBBbGxEYXRhO1xufVxuLy9zZXQgYSBzY29wZWQgYXJyYXkgcmFuZ2UgaW4gbmV3IGFycmF5XG5mdW5jdGlvbiB1cGRhdGVSYW5nZSggcmFuZ2VOdW1iZXIgKXtcbiAgICBpZiAoIHJhbmdlTnVtYmVyID09IDAgKSB7XG4gICAgICAgIHJhbmdlTnVtYmVyID0gMDtcbiAgICB9XG4gICAgbGV0IGJhc2VTdGFydFJhbmdlID0gNTAgKiByYW5nZU51bWJlcjtcbiAgICBsZXQgYmFzZUVuZFJhbmdlID0gYmFzZVN0YXJ0UmFuZ2UgKyA1MDtcbiAgICBsZXQgcmFuZ2VBcnJheSA9IFtdO1xuICAgIHJhbmdlQXJyYXkucHVzaChiYXNlU3RhcnRSYW5nZSxiYXNlRW5kUmFuZ2UpO1xuICAgIHJldHVybiByYW5nZUFycmF5O1xufVxuXG4vL3VwZGF0ZSBwYWdlIHdpdGggbmV3IHNjb3BlZCByYW5nZSBhcnJheVxuZnVuY3Rpb24gdXBkYXRlUGFnaW5pdGlvbkl0ZW1zKGluZGV4KXtcbiAgICBsZXQgcmFuZ2VOdW1iZXIgPSBpbmRleDsgXG4gICAgZmlsbEFycmF5cyh1cGRhdGVBcHBEYXRhKCksIHVwZGF0ZVJhbmdlKHJhbmdlTnVtYmVyKSk7XG59XG5cbi8vZXhlY3V0ZSBhcnJheSBsb29wIHdpdGggdGhlIGNob3NlbiBvdXRwdXQgZm9yIHRoZSB1c2VyIFVJLiBcbmZ1bmN0aW9uIGZpbGxBcnJheXMoQWxsRGF0YSxuZXdkYXRhVXBkYXRlKXtcbiAgICBsZXQgYWxsY29udGVudHBhZ2VzID0gW107XG4gICAgY29uc3Qgdm9lcnR1aWdPdmVyemljaHRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlZvZXJ0dWlnT3ZlcnppY2h0Q29udGFpbmVyXCIpO1xuICAgIHZvZXJ0dWlnT3ZlcnppY2h0Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbGV0IG5ld0xpc3Rob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIGZvciAobGV0IGkgaW4gQWxsRGF0YSkge1xuICAgICAgICBhbGxjb250ZW50cGFnZXMucHVzaChBbGxEYXRhW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW5ld2RhdGFVcGRhdGUpIHtcbiAgICAgICAgICAgIG5ld2RhdGFVcGRhdGUgPSBbMCw1MF07XG4gICAgICAgIH1cbiAgICAgICAgYWxsY29udGVudHBhZ2VzLnNsaWNlKG5ld2RhdGFVcGRhdGVbMF0gLG5ld2RhdGFVcGRhdGVbMV0pLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGluZGV4LCBhcnIpeyAgXG4gICAgICAgIGxldCB2b2VydHVpZ01lcmtWYXIgPSBhcnJbaW5kZXhdLm1lcms7XG4gICAgICAgIGxldCB2b29ydHVpZ1Nvb3J0ID0gIGFycltpbmRleF0udm9lcnR1aWdzb29ydDtcbiAgICAgICAgbGV0IHZvZXJ0dWlnZW5LZW50ZWtlbiA9IGFycltpbmRleF0ua2VudGVrZW47XG4gICAgICAgIGxldCB2b2VydHVpZ0hhbmRlbHNCZW5hbWluZyA9IGFycltpbmRleF0uaGFuZGVsc2JlbmFtaW5nO1xuICAgICAgICBsZXQgbmV3RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIG5ld0VsZW0uaW5uZXJIVE1MID1cbiAgICAgICAgYDxhIGhyZWY9J3Zvb3J0dWlnZGV0YWlsLmh0bWwnIGRhdGEtdm9lcnR1aWdJZD0ke3ZvZXJ0dWlnZW5LZW50ZWtlbn0+PGgzIGRhdGEtdm9lcnR1aWdJZD0ke3ZvZXJ0dWlnZW5LZW50ZWtlbn0+XG4gICAgICAgICR7dm9lcnR1aWdNZXJrVmFyfTxzcGFuPiR7dm9lcnR1aWdIYW5kZWxzQmVuYW1pbmd9PC9zcGFuPjwvaDM+PC9hPmA7XG4gICAgICAgIG5ld0xpc3Rob2xkZXIuYXBwZW5kQ2hpbGQobmV3RWxlbSk7XG4gICAgICAgIG5ld0VsZW0uZmlyc3RDaGlsZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2V0Vm9lcnR1aWdEZXRhaWxQYWdlKTtcbiAgICAgfSk7XG4gICAgIHZvZXJ0dWlnT3ZlcnppY2h0Q29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0xpc3Rob2xkZXIpO1xuIH1cbi8vY29tcG9uZW50IFwiTGFhdHN0IGJla2VrZW52b2VydHVpZ2VuXCJcbiBmdW5jdGlvbiB0cmFja0Rpc3BsYXlWb29ydHVpZygpe1xuICAgIGxldCB0cmFja0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJncmlkQ29udGFpbmVyXCIpO1xuICAgIHRyYWNrRWwuY2xhc3NMaXN0LmFkZCgndHJhY2tFbCcpO1xuICAgIC8vY2hlY2sgaW4gbG9jYWxzdG9yYWdlIGZvciBkaXNwbGF5aW5nIGl0LiBcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRyYWNrRWxpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBwcmV2dm9lcnR1aWdsaW5rQXR0ckxvY2FsU3RvcmFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGkpO1xuICAgICAgICB0cmFja0VsaXRlbS5hcHBlbmQocHJldnZvZXJ0dWlnbGlua0F0dHJMb2NhbFN0b3JhZ2UpOyAgICBcbiAgICAgICAgdHJhY2tFbC5wcmVwZW5kKHRyYWNrRWxpdGVtKTtcbiAgICB9XG4gICAgLy9wbGFjZSBpdCBvbiB0ZSB1aVxuICAgIGNvbnRhaW5lclswXS5hZnRlcih0cmFja0VsKTtcbiAgICB0cmFja0VsLmlubmVySFRNTCs9IGA8aDU+bGFhdHN0IGJla2VrZW4gdm9vcnR1aWdlbjogPC9oNT5gOyBcbiAgICB0cmFja0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuY2xvc2UpOyBcbn1cblxuLy90b2dnbGUgY29tcG9uZW50IFwiTGFhdHN0IGJla2VrZW52b2VydHVpZ2VuXCJcbmZ1bmN0aW9uIG9wZW5jbG9zZShldmVudClcbntcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJvcGVuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5cIik7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tEb21DbGljayk7IFxuICAgIH1cbn1cblxuLy9mdW5jdGlvbiB0byBjaGVjayBjbGljayBldmVudCBvdXRzaWRlIGNvbXBvbmVudHNcbmZ1bmN0aW9uIGNoZWNrRG9tQ2xpY2soZXZlbnQpIHtcbiAgICBsZXQgdHJhY2tFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRyYWNrRWxcIik7XG4gICAgY29uc3Qgb3V0c2lkZUNsaWNrRm9yQ29tcG9uZW50MSA9ICF0cmFja0VsZVswXS5jb250YWlucyhldmVudC50YXJnZXQpO1xuICAgIGlmIChvdXRzaWRlQ2xpY2tGb3JDb21wb25lbnQxKSB7XG4gICAgICAgIHRyYWNrRWxlWzBdLmNsYXNzTGlzdC50b2dnbGUoXCJvcGVuXCIpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrRG9tQ2xpY2spO1xuICAgIH0gXG4gIH1cblxuZnVuY3Rpb24gYWRkUGFnaW5pdGlvbihwYWdlbml0aW9uVG90YWwpe1xuICAgIGNvbnN0IHBhZ2VuaXRpb25NZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgIHBhZ2VuaXRpb25NZW51LmNsYXNzTGlzdC5hZGQoJ3BhZ2luYXRpb24nKTsgIFxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdyaWRDb250YWluZXJcIik7XG4gICAgICAgIGNvbnRhaW5lclswXS5hZnRlcihwYWdlbml0aW9uTWVudSk7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBwYWdlbml0aW9uVG90YWw7IGluZGV4KyspIHtcbiAgICAgICAgICAgIC8vcGxhYXRzIGFsbGUgcGFnaW5hdGllIGl0ZW1zIGRpZSBlciB6aWpuIGhldCBtZW51XG4gICAgICAgICAgICB1cGRhdGVQYWdpbml0aW9uKHBhZ2VuaXRpb25NZW51LGluZGV4KTtcbiAgICAgICAgfVxufVxuXG5cbmZ1bmN0aW9uIHVwZGF0ZVBhZ2luaXRpb24ocGFnZW5pdGlvbk1lbnUsaW5kZXgpe1xuICAgICAgIGxldCBwYWdlbml0aW9uSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgcGFnZW5pdGlvbkl0ZW0uY2xhc3NMaXN0LmFkZCgnYnRuJyk7XG4gICAgICAgIHBhZ2VuaXRpb25JdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VTdGF0ZU1lbnVJdGVtKTtcbiAgICAgICAgLy8gYWRkIGhvcmlvbnRhbCBzY3JvbGwgLSBpbnN0ZWFkIG9mIGNsaWNraW5nIHRvIG5leHQgbWVudSBpdGVtLiAtIEZlYXR1cmUgVVhcbiAgICAgIGlmKCEvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpe1xuICAgICAgICAvLyBmYWxzZSBmb3IgbW9iaWxlIGRldmljZSAtIFxuICAgICAgICBwYWdlbml0aW9uTWVudS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGNoZWNrbW91c2VYKTtcbiAgICAgIH1cbiAgICAgICBcbiAgICAgICBsZXQgYnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidG5cIik7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidG5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBidG5zWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpOyAgXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vYWN0aXZlIHN0YXRlIGZvciB1c2VyICsgdXBkYXRlIHJlc3VsdHMgb24gcGFnZSBcbiAgICAgICAgICBmdW5jdGlvbiBjaGFuZ2VTdGF0ZU1lbnVJdGVtKGV2ZW50KSB7XG4gICAgICAgICAgICB1cGRhdGVQYWdpbml0aW9uSXRlbXMoaW5kZXgpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgY3VycmVudFswXS5jbGFzc05hbWUgPSBjdXJyZW50WzBdLmNsYXNzTmFtZS5yZXBsYWNlKFwiIGFjdGl2ZVwiLCBcIlwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9hZGQgdGhlIHNjcm9sbCBvbiBtb3VzZSBtb3ZlbWVudCAtIHBhcnQgb2YgVVggZmVhdHVyZVxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2ttb3VzZVgoZSkgeyAgXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxMZWZ0ID0rIGUuY2xpZW50WDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICBwYWdlbml0aW9uSXRlbS5pbm5lckhUTUwgKz0gaW5kZXg7XG4gICAgICAgIHBhZ2VuaXRpb25NZW51LmFwcGVuZENoaWxkKHBhZ2VuaXRpb25JdGVtKTtcbn1cbi8vdG9vbiBjb21wb25lbnQgXCJMYWF0c3QgYmVrZWtlbnZvZXJ0dWlnZW5cIiBhbGxlZW4gYWxzIGVyIGhpc3RvcnkgaXMuIFxuaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGggPiAwKSB7XG4gICAgdHJhY2tEaXNwbGF5Vm9vcnR1aWcoKTtcbn1cbi8vZmlyc3QgZXhlY3V0ZSBmb3IgZGlwYXlpbmcgdWkuIFxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgQWxsRGF0YSA9ICB1cGRhdGVBcHBEYXRhKCk7XG4gICAgbGV0IHRvdGFsUGVyUGFnZSA9IDUwOyBcbiAgICBsZXQgcGFnZW5pdGlvblRvdGFsID0gIHVwZGF0ZUFwcERhdGEoKS5sZW5ndGgvdG90YWxQZXJQYWdlO1xuICAgIGFkZFBhZ2luaXRpb24ocGFnZW5pdGlvblRvdGFsKTtcbiAgICBmaWxsQXJyYXlzKEFsbERhdGEpO1xufVxuXG5leHBvcnQge1xuICAgIGluaXQsIHVwZGF0ZUFwcERhdGEsIHRyYWNrRGlzcGxheVZvb3J0dWlnXG59OyIsImltcG9ydCB7XG4gICAgaW5pdEFwcFxufSBmcm9tICcuLi9hcHAuanMnO1xuaW1wb3J0IHtcbiAgICBpbml0XG59IGZyb20gJy4vZGlzcGxheVZvZXJ0dWlnT3ZlcnZpZXcuanMnO1xuaW1wb3J0IHtcbiAgICB1cGRhdGVBcHBEYXRhXG59IGZyb20gJy4vZGlzcGxheVZvZXJ0dWlnT3ZlcnZpZXcuanMnO1xuaW1wb3J0IHtcbiAgICBwcmludHByZWRlZmluZWRcbn0gZnJvbSAnLi9kaXNwbGF5Vm9lcnR1aWdEZXRhaWwuanMnO1xuXG4vL3VzZSBsb2NhbCBzb3VyY2Vcbi8vY29uc3QgZW5kcG9pbnQxID0gJy4uLy4uL2RhdGEvcmR3Lmpzb24nO1xuLy91c2Ugb25saW5lIHNvdXJjZVxuLy9zZXQgc2NvcGUgdG8gb25seSBjYXJzLiAtIGNvdWxkIG9wdGlvbmFseSBtYWtlIGEgZmlsdGVyIGJ5IHVzaW5nOiAgYXBpLmh0dHBzOi8vZGV2LnNvY3JhdGEuY29tL2RvY3MvZmlsdGVyaW5nLmh0bWxcbi8vZ2V0IGFsbCByZXN1bHRzIC8vIGlzIHJhbmRvbVxuLy9jb25zdCBlbmRwb2ludDEgPSAnaHR0cHM6Ly9vcGVuZGF0YS5yZHcubmwvcmVzb3VyY2UvbTlkNy1lYmYyLmpzb24nO1xuLy9nZXQgUGVzb25lbmF1dG8ncyBvbmx5XG5jb25zdCBlbmRwb2ludDEgPSAnaHR0cHM6Ly9vcGVuZGF0YS5yZHcubmwvcmVzb3VyY2UvbTlkNy1lYmYyLmpzb24/dm9lcnR1aWdzb29ydD1QZXJzb25lbmF1dG8nO1xuY29uc3QgZmV0Y2hFbmRwb2ludDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgYWRkbG9hZGVyKCk7XG4gICAgZmV0Y2goZW5kcG9pbnQxKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGFsbERhdGFGZXRjaGVkKSB7XG4gICAgICAgcmVtb3ZlbG9hZGVyKCk7XG4gICAgICAgaW5pdEFwcC52b2VydHVpZ2VuID0gYWxsRGF0YUZldGNoZWQ7XG4gICAgICAgaW5pdCgpO1xuICAgICAgIHVwZGF0ZUFwcERhdGEoKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xufTtcblxuY29uc3QgZmV0Y2hFbmRwb2ludDIgPSBmdW5jdGlvbiAoY3VycnZvZXJ0dWlnbGlua0F0dHJMb2NhbFN0b3JhZ2UpIHtcbiAgICAvL3VzZSBsb2NhbCBzdG9yYWdlIGluIGVuZHBvaW50XG4gICAgY29uc3QgZW5kcG9pbnQyID0gYGh0dHBzOi8vb3BlbmRhdGEucmR3Lm5sL3Jlc291cmNlL205ZDctZWJmMi5qc29uP2tlbnRla2VuPSR7Y3VycnZvZXJ0dWlnbGlua0F0dHJMb2NhbFN0b3JhZ2V9YDtcbiAgICBjb25zdCBWb2VydHVpZ0RldGFpbENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVm9lcnR1aWdEZXRhaWxDb250YWluZXJcIik7XG4gICAgZmV0Y2goZW5kcG9pbnQyKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHByZWRlZmluZWRWb29ydHVpZykge1xuICAgICAgICBwcmludHByZWRlZmluZWQocHJlZGVmaW5lZFZvb3J0dWlnLCBWb2VydHVpZ0RldGFpbENvbnRhaW5lcik7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcbn07XG4vL2xvYWRlciBmb3IgdXNlciBVSVxuZnVuY3Rpb24gYWRkbG9hZGVyKCl7XG4gICAgY29uc3QgbG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZChcImxvYWRlclwiKTtcbiAgICBsZXQgZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJncmlkQ29udGFpbmVyXCIpO1xuICAgIGdyaWRDb250YWluZXJbMF0uYXBwZW5kQ2hpbGQobG9hZGVyKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZWxvYWRlcigpe1xuICAgIGxldCBsb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibG9hZGVyXCIpO1xuICAgIGxvYWRlclswXS5yZW1vdmUoKTtcbn1cblxuZXhwb3J0IHtmZXRjaEVuZHBvaW50MSwgZmV0Y2hFbmRwb2ludDJ9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9qcy9hcHAuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=