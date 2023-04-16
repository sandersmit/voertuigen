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
var initApp = {
  voertuigen: "",
  init: function init() {
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
var startApp = function startApp() {
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
  ///setting data attribute to link on the detail page 
  var voertuiglinkAttr = event.target.parentElement.getAttribute("data-voertuigid");
  //setting local storage 
  setLocalStorage(voertuiglinkAttr);
}
function setLocalStorage(voertuiglinkAttr) {
  var newId = localStorage.length + 1;
  localStorage.setItem(newId, voertuiglinkAttr);
}

//use local storage to fetch new endpoint
function loadvoertuigDetailPage() {
  var lastestItem = localStorage.length;
  var currvoertuiglinkAttrLocalStorage = localStorage.getItem(lastestItem);
  (0,_sourceData_js__WEBPACK_IMPORTED_MODULE_0__.fetchEndpoint2)(currvoertuiglinkAttrLocalStorage);
}
//print the ui for the detail page
function printpredefined(predefinedVoortuig, VoertuigDetailContainer) {
  var listholder = document.createElement("ul");
  var backBtn = document.createElement("a");
  var header = document.createElement("header");
  backBtn.classList.add("backlink");
  backBtn.setAttribute("href", "index.html");
  //loop trough keys and values for detailpage data
  var generatedKeyArray = Object.keys(predefinedVoortuig[0]);
  var generatedValueArray = Object.values(predefinedVoortuig[0]);
  for (var i = 0; i < 3; i++) {
    header.innerHTML += "<div><h4>".concat(generatedKeyArray[i], "</h4><p>").concat(generatedValueArray[i], "</p></div>");
  }
  for (var j = 4; j < generatedKeyArray.length; j++) {
    listholder.innerHTML += "<li><h4>".concat(generatedKeyArray[j], "</h4><p>").concat(generatedValueArray[j], "</p></li>");
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



//get the data object
function updateAppData() {
  var AllData = _app_js__WEBPACK_IMPORTED_MODULE_0__.initApp.voertuigen;
  return AllData;
}
//set a scoped array range in new array
function updateRange(rangeNumber) {
  if (rangeNumber == 0) {
    rangeNumber = 0;
  }
  var baseStartRange = 50 * rangeNumber;
  var baseEndRange = baseStartRange + 50;
  var rangeArray = [];
  rangeArray.push(baseStartRange, baseEndRange);
  return rangeArray;
}

//update page with new scoped range array
function updatePaginitionItems(index) {
  var rangeNumber = index;
  fillArrays(updateAppData(), updateRange(rangeNumber));
}

//execute array loop with the chosen output for the user UI. 
function fillArrays(AllData, newdataUpdate) {
  var allcontentpages = [];
  var voertuigOverzichtContainer = document.getElementById("VoertuigOverzichtContainer");
  voertuigOverzichtContainer.innerHTML = "";
  var newListholder = document.createElement('ul');
  for (var i in AllData) {
    allcontentpages.push(AllData[i]);
  }
  //geen paginatie update - start dan op eerste range
  if (!newdataUpdate) {
    newdataUpdate = [0, 50];
  }
  //slice een nieuwe range
  allcontentpages.slice(newdataUpdate[0], newdataUpdate[1]).forEach(function (value, index, arr) {
    var voertuigMerkVar = arr[index].merk;
    var voortuigSoort = arr[index].voertuigsoort;
    var voertuigenKenteken = arr[index].kenteken;
    var voertuigHandelsBenaming = arr[index].handelsbenaming;
    var newElem = document.createElement('li');
    newElem.innerHTML = "<a href='detail.html' data-voertuigId=".concat(voertuigenKenteken, "><h3 data-voertuigId=").concat(voertuigenKenteken, ">\n        ").concat(voertuigMerkVar, "<span>").concat(voertuigHandelsBenaming, "</span></h3></a>");
    newListholder.appendChild(newElem);
    newElem.firstChild.addEventListener("click", _displayVoertuigDetail_js__WEBPACK_IMPORTED_MODULE_1__.setVoertuigDetailPage);
  });
  voertuigOverzichtContainer.appendChild(newListholder);
}
//component "Laatst bekekenvoertuigen"
function trackDisplayVoortuig() {
  var trackEl = document.createElement('div');
  var container = document.getElementsByClassName("gridContainer");
  trackEl.classList.add('trackEl');
  //check in localstorage for displaying it. 
  for (var i = 1; i <= localStorage.length; i++) {
    var trackElitem = document.createElement('span');
    var prevvoertuiglinkAttrLocalStorage = localStorage.getItem(i);
    trackElitem.append(prevvoertuiglinkAttrLocalStorage);
    trackEl.prepend(trackElitem);
  }
  //place it on te ui
  container[0].after(trackEl);
  trackEl.innerHTML += "<h5>laatst bekeken voortuigen: </h5>";
  trackEl.addEventListener("click", openclose);
}

//toggle component "Laatst bekekenvoertuigen"
function openclose(event) {
  if (this.classList.contains('open')) {
    this.classList.toggle("open");
  } else {
    this.classList.toggle("open");
    document.addEventListener('click', checkDomClick);
  }
}

//function to check click event outside components
function checkDomClick(event) {
  var trackEle = document.querySelectorAll(".trackEl");
  var outsideClickForComponent1 = !trackEle[0].contains(event.target);
  if (outsideClickForComponent1) {
    trackEle[0].classList.toggle("open");
    document.removeEventListener('click', checkDomClick);
  }
}
function addPaginition(pagenitionTotal) {
  var pagenitionMenu = document.createElement("ul");
  pagenitionMenu.classList.add('pagination');
  var container = document.getElementsByClassName("gridContainer");
  container[0].after(pagenitionMenu);
  for (var index = 1; index < pagenitionTotal; index++) {
    //plaats alle paginatie items die er zijn het menu
    updatePaginition(pagenitionMenu, index);
  }
}
function updatePaginition(pagenitionMenu, index) {
  var pagenitionItem = document.createElement("li");
  pagenitionItem.classList.add('btn');
  pagenitionItem.addEventListener("click", changeStateMenuItem);
  // add horiontal scroll - instead of clicking to next menu item. - Feature UX
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // false for mobile device - 
    pagenitionMenu.addEventListener("mousemove", checkmouseX);
  }
  var btns = document.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[0].classList.add('active');
  }
  //active state for user + update results on page 
  function changeStateMenuItem(event) {
    updatePaginitionItems(index);
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  }
  //add the scroll on mouse movement - part of UX feature
  function checkmouseX(e) {
    this.scrollLeft = +e.clientX;
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
  var AllData = updateAppData();
  var totalPerPage = 50;
  var pagenitionTotal = updateAppData().length / totalPerPage;
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
var endpoint1 = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json?voertuigsoort=Personenauto';
var fetchEndpoint1 = function fetchEndpoint1() {
  addloader();
  fetch(endpoint1).then(function (response) {
    return response.json();
  }).then(function (allDataFetched) {
    removeloader();
    _app_js__WEBPACK_IMPORTED_MODULE_0__.initApp.voertuigen = allDataFetched;
    (0,_displayVoertuigOverview_js__WEBPACK_IMPORTED_MODULE_1__.init)();
    (0,_displayVoertuigOverview_js__WEBPACK_IMPORTED_MODULE_1__.updateAppData)();
  })["catch"](function (error) {
    console.log(error);
  });
};
var fetchEndpoint2 = function fetchEndpoint2(currvoertuiglinkAttrLocalStorage) {
  //use local storage in endpoint
  var endpoint2 = "https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=".concat(currvoertuiglinkAttrLocalStorage);
  var VoertuigDetailContainer = document.getElementById("VoertuigDetailContainer");
  fetch(endpoint2).then(function (response) {
    return response.json();
  }).then(function (predefinedVoortuig) {
    (0,_displayVoertuigDetail_js__WEBPACK_IMPORTED_MODULE_2__.printpredefined)(predefinedVoortuig, VoertuigDetailContainer);
  })["catch"](function (error) {
    console.log(error);
  });
};
//loader for user UI
function addloader() {
  var loader = document.createElement("div");
  loader.classList.add("loader");
  var gridContainer = document.getElementsByClassName("gridContainer");
  gridContainer[0].appendChild(loader);
}
function removeloader() {
  var loader = document.getElementsByClassName("loader");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FuZGJveC8uL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly9zYW5kYm94Ly4vanMvbW9kdWxlcy9kaXNwbGF5Vm9lcnR1aWdEZXRhaWwuanMiLCJ3ZWJwYWNrOi8vc2FuZGJveC8uL2pzL21vZHVsZXMvZGlzcGxheVZvZXJ0dWlnT3ZlcnZpZXcuanMiLCJ3ZWJwYWNrOi8vc2FuZGJveC8uL2pzL21vZHVsZXMvc291cmNlRGF0YS5qcyIsIndlYnBhY2s6Ly9zYW5kYm94L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NhbmRib3gvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NhbmRib3gvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zYW5kYm94L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2FuZGJveC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3NhbmRib3gvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3NhbmRib3gvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qanNsaW50IG5vZGU6IHRydWUgKi9cbi8qIGVzdmVyc2lvbjogOCAqL1xuLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuLy8gJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge1xuICAgIGZldGNoRW5kcG9pbnQxXG59IGZyb20gJy4vbW9kdWxlcy9zb3VyY2VEYXRhLmpzJztcbmltcG9ydCB7XG4gICAgbG9hZHZvZXJ0dWlnRGV0YWlsUGFnZVxufSBmcm9tICcuL21vZHVsZXMvZGlzcGxheVZvZXJ0dWlnRGV0YWlsLmpzJztcblxuLy9pbml0aWFsIG9iamVjdCBtZXRob2QgZm9yIGFwcFxuY29uc3QgaW5pdEFwcCA9IHtcbiAgICB2b2VydHVpZ2VuOiBcIlwiLFxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2VydHVpZ092ZXJ6aWNodFBhZ2UnKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAvL2ZldGNoIGVuZHBvaW50IGZvciBjYXJzIHBlcnNvbmNhcnMgb25seVxuICAgICAgICAgICAgZmV0Y2hFbmRwb2ludDEoKTsgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvZXJ0dWlnRGV0YWlsUGFnZScpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAvL2ZldGNoIGFub3RoZXIgZW5kcG9pbnQgd2l0aCB0aGlzIGZ1bmN0aW9uXG4gICAgICAgICAgICBsb2Fkdm9lcnR1aWdEZXRhaWxQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuY29uc3Qgc3RhcnRBcHAgPSBmdW5jdGlvbiAoKSB7XG4gICAgaW5pdEFwcC5pbml0KCk7XG59O1xuLy9zdGFydCBhcHAgaW4gcGFnZSBsb2FkXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBzdGFydEFwcCk7XG5leHBvcnQge1xuICAgIGluaXRBcHBcbn07IiwiaW1wb3J0IHtcbiAgICBmZXRjaEVuZHBvaW50MlxufSBmcm9tICcuL3NvdXJjZURhdGEuanMnO1xuXG5cbmZ1bmN0aW9uIHNldFZvZXJ0dWlnRGV0YWlsUGFnZShldmVudCkge1xuICAgIC8vL3NldHRpbmcgZGF0YSBhdHRyaWJ1dGUgdG8gbGluayBvbiB0aGUgZGV0YWlsIHBhZ2UgXG4gICAgY29uc3Qgdm9lcnR1aWdsaW5rQXR0ciA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdm9lcnR1aWdpZFwiKTtcbiAgICAvL3NldHRpbmcgbG9jYWwgc3RvcmFnZSBcbiAgICBzZXRMb2NhbFN0b3JhZ2Uodm9lcnR1aWdsaW5rQXR0cik7XG59XG5cbmZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZSh2b2VydHVpZ2xpbmtBdHRyKXtcbiAgICBsZXQgbmV3SWQgPSBsb2NhbFN0b3JhZ2UubGVuZ3RoICsgMTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuZXdJZCwgdm9lcnR1aWdsaW5rQXR0cik7XG59XG5cbi8vdXNlIGxvY2FsIHN0b3JhZ2UgdG8gZmV0Y2ggbmV3IGVuZHBvaW50XG5mdW5jdGlvbiBsb2Fkdm9lcnR1aWdEZXRhaWxQYWdlKCkge1xuICAgIGxldCBsYXN0ZXN0SXRlbSA9IGxvY2FsU3RvcmFnZS5sZW5ndGg7XG4gICAgY29uc3QgY3VycnZvZXJ0dWlnbGlua0F0dHJMb2NhbFN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsYXN0ZXN0SXRlbSk7XG4gICAgIGZldGNoRW5kcG9pbnQyKGN1cnJ2b2VydHVpZ2xpbmtBdHRyTG9jYWxTdG9yYWdlKTtcbn1cbi8vcHJpbnQgdGhlIHVpIGZvciB0aGUgZGV0YWlsIHBhZ2VcbmZ1bmN0aW9uIHByaW50cHJlZGVmaW5lZChwcmVkZWZpbmVkVm9vcnR1aWcsIFZvZXJ0dWlnRGV0YWlsQ29udGFpbmVyKSB7XG4gICBjb25zdCBsaXN0aG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgY29uc3QgYmFja0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgIGJhY2tCdG4uY2xhc3NMaXN0LmFkZChcImJhY2tsaW5rXCIpO1xuICAgYmFja0J0bi5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIFwiaW5kZXguaHRtbFwiKTtcbiAgIC8vbG9vcCB0cm91Z2gga2V5cyBhbmQgdmFsdWVzIGZvciBkZXRhaWxwYWdlIGRhdGFcbiAgICBsZXQgZ2VuZXJhdGVkS2V5QXJyYXkgPSBPYmplY3Qua2V5cyhwcmVkZWZpbmVkVm9vcnR1aWdbMF0pO1xuICAgIGxldCBnZW5lcmF0ZWRWYWx1ZUFycmF5ID0gT2JqZWN0LnZhbHVlcyhwcmVkZWZpbmVkVm9vcnR1aWdbMF0pO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgaGVhZGVyLmlubmVySFRNTCArPSBgPGRpdj48aDQ+JHtnZW5lcmF0ZWRLZXlBcnJheVtpXX08L2g0PjxwPiR7Z2VuZXJhdGVkVmFsdWVBcnJheVtpXX08L3A+PC9kaXY+YDtcbiAgICAgICAgfVxuICAgICAgZm9yICh2YXIgaiA9IDQ7IGogPCBnZW5lcmF0ZWRLZXlBcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgICBsaXN0aG9sZGVyLmlubmVySFRNTCArPSBgPGxpPjxoND4ke2dlbmVyYXRlZEtleUFycmF5W2pdfTwvaDQ+PHA+JHtnZW5lcmF0ZWRWYWx1ZUFycmF5W2pdfTwvcD48L2xpPmA7XG4gICAgICAgIH1cbiAgICAgICAgVm9lcnR1aWdEZXRhaWxDb250YWluZXIuYXBwZW5kQ2hpbGQoYmFja0J0bik7XG4gICAgICAgIFZvZXJ0dWlnRGV0YWlsQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgICAgIFZvZXJ0dWlnRGV0YWlsQ29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3Rob2xkZXIpO1xufVxuXG5leHBvcnQge1xuICAgIHNldFZvZXJ0dWlnRGV0YWlsUGFnZSxcbiAgICBsb2Fkdm9lcnR1aWdEZXRhaWxQYWdlLFxuICAgIHByaW50cHJlZGVmaW5lZFxufTsiLCJpbXBvcnQge1xuICAgIGluaXRBcHBcbn0gZnJvbSAnLi4vYXBwLmpzJztcbmltcG9ydCB7XG4gICAgc2V0Vm9lcnR1aWdEZXRhaWxQYWdlXG59IGZyb20gJy4vZGlzcGxheVZvZXJ0dWlnRGV0YWlsLmpzJztcblxuLy9nZXQgdGhlIGRhdGEgb2JqZWN0XG5mdW5jdGlvbiB1cGRhdGVBcHBEYXRhKCkge1xuICAgIGxldCBBbGxEYXRhID0gaW5pdEFwcC52b2VydHVpZ2VuO1xuICAgIHJldHVybiBBbGxEYXRhO1xufVxuLy9zZXQgYSBzY29wZWQgYXJyYXkgcmFuZ2UgaW4gbmV3IGFycmF5XG5mdW5jdGlvbiB1cGRhdGVSYW5nZSggcmFuZ2VOdW1iZXIgKXtcbiAgICBpZiAoIHJhbmdlTnVtYmVyID09IDAgKSB7XG4gICAgICAgIHJhbmdlTnVtYmVyID0gMDtcbiAgICB9XG4gICAgbGV0IGJhc2VTdGFydFJhbmdlID0gNTAgKiByYW5nZU51bWJlcjtcbiAgICBsZXQgYmFzZUVuZFJhbmdlID0gYmFzZVN0YXJ0UmFuZ2UgKyA1MDtcbiAgICBsZXQgcmFuZ2VBcnJheSA9IFtdO1xuICAgIHJhbmdlQXJyYXkucHVzaChiYXNlU3RhcnRSYW5nZSxiYXNlRW5kUmFuZ2UpO1xuICAgIHJldHVybiByYW5nZUFycmF5O1xufVxuXG4vL3VwZGF0ZSBwYWdlIHdpdGggbmV3IHNjb3BlZCByYW5nZSBhcnJheVxuZnVuY3Rpb24gdXBkYXRlUGFnaW5pdGlvbkl0ZW1zKGluZGV4KXtcbiAgICBsZXQgcmFuZ2VOdW1iZXIgPSBpbmRleDsgXG4gICAgZmlsbEFycmF5cyh1cGRhdGVBcHBEYXRhKCksIHVwZGF0ZVJhbmdlKHJhbmdlTnVtYmVyKSk7XG59XG5cbi8vZXhlY3V0ZSBhcnJheSBsb29wIHdpdGggdGhlIGNob3NlbiBvdXRwdXQgZm9yIHRoZSB1c2VyIFVJLiBcbmZ1bmN0aW9uIGZpbGxBcnJheXMoQWxsRGF0YSxuZXdkYXRhVXBkYXRlKXtcbiAgICBsZXQgYWxsY29udGVudHBhZ2VzID0gW107XG4gICAgY29uc3Qgdm9lcnR1aWdPdmVyemljaHRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlZvZXJ0dWlnT3ZlcnppY2h0Q29udGFpbmVyXCIpO1xuICAgIHZvZXJ0dWlnT3ZlcnppY2h0Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbGV0IG5ld0xpc3Rob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIGZvciAobGV0IGkgaW4gQWxsRGF0YSkge1xuICAgICAgICBhbGxjb250ZW50cGFnZXMucHVzaChBbGxEYXRhW2ldKTtcbiAgICAgICAgfVxuICAgICAgICAvL2dlZW4gcGFnaW5hdGllIHVwZGF0ZSAtIHN0YXJ0IGRhbiBvcCBlZXJzdGUgcmFuZ2VcbiAgICAgICAgaWYgKCFuZXdkYXRhVXBkYXRlKSB7XG4gICAgICAgICAgICBuZXdkYXRhVXBkYXRlID0gWzAsNTBdO1xuICAgICAgICB9XG4gICAgICAgIC8vc2xpY2UgZWVuIG5pZXV3ZSByYW5nZVxuICAgICAgICBhbGxjb250ZW50cGFnZXMuc2xpY2UobmV3ZGF0YVVwZGF0ZVswXSAsbmV3ZGF0YVVwZGF0ZVsxXSkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGFycil7ICBcbiAgICAgICAgbGV0IHZvZXJ0dWlnTWVya1ZhciA9IGFycltpbmRleF0ubWVyaztcbiAgICAgICAgbGV0IHZvb3J0dWlnU29vcnQgPSAgYXJyW2luZGV4XS52b2VydHVpZ3Nvb3J0O1xuICAgICAgICBsZXQgdm9lcnR1aWdlbktlbnRla2VuID0gYXJyW2luZGV4XS5rZW50ZWtlbjtcbiAgICAgICAgbGV0IHZvZXJ0dWlnSGFuZGVsc0JlbmFtaW5nID0gYXJyW2luZGV4XS5oYW5kZWxzYmVuYW1pbmc7XG4gICAgICAgIGxldCBuZXdFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbmV3RWxlbS5pbm5lckhUTUwgPVxuICAgICAgICBgPGEgaHJlZj0nZGV0YWlsLmh0bWwnIGRhdGEtdm9lcnR1aWdJZD0ke3ZvZXJ0dWlnZW5LZW50ZWtlbn0+PGgzIGRhdGEtdm9lcnR1aWdJZD0ke3ZvZXJ0dWlnZW5LZW50ZWtlbn0+XG4gICAgICAgICR7dm9lcnR1aWdNZXJrVmFyfTxzcGFuPiR7dm9lcnR1aWdIYW5kZWxzQmVuYW1pbmd9PC9zcGFuPjwvaDM+PC9hPmA7XG4gICAgICAgIG5ld0xpc3Rob2xkZXIuYXBwZW5kQ2hpbGQobmV3RWxlbSk7XG4gICAgICAgIG5ld0VsZW0uZmlyc3RDaGlsZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2V0Vm9lcnR1aWdEZXRhaWxQYWdlKTtcbiAgICAgfSk7XG4gICAgIHZvZXJ0dWlnT3ZlcnppY2h0Q29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0xpc3Rob2xkZXIpO1xuIH1cbi8vY29tcG9uZW50IFwiTGFhdHN0IGJla2VrZW52b2VydHVpZ2VuXCJcbiBmdW5jdGlvbiB0cmFja0Rpc3BsYXlWb29ydHVpZygpe1xuICAgIGxldCB0cmFja0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJncmlkQ29udGFpbmVyXCIpO1xuICAgIHRyYWNrRWwuY2xhc3NMaXN0LmFkZCgndHJhY2tFbCcpO1xuICAgIC8vY2hlY2sgaW4gbG9jYWxzdG9yYWdlIGZvciBkaXNwbGF5aW5nIGl0LiBcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRyYWNrRWxpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBjb25zdCBwcmV2dm9lcnR1aWdsaW5rQXR0ckxvY2FsU3RvcmFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGkpO1xuICAgICAgICB0cmFja0VsaXRlbS5hcHBlbmQocHJldnZvZXJ0dWlnbGlua0F0dHJMb2NhbFN0b3JhZ2UpOyAgICBcbiAgICAgICAgdHJhY2tFbC5wcmVwZW5kKHRyYWNrRWxpdGVtKTtcbiAgICB9XG4gICAgLy9wbGFjZSBpdCBvbiB0ZSB1aVxuICAgIGNvbnRhaW5lclswXS5hZnRlcih0cmFja0VsKTtcbiAgICB0cmFja0VsLmlubmVySFRNTCs9IGA8aDU+bGFhdHN0IGJla2VrZW4gdm9vcnR1aWdlbjogPC9oNT5gOyBcbiAgICB0cmFja0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuY2xvc2UpOyBcbn1cblxuLy90b2dnbGUgY29tcG9uZW50IFwiTGFhdHN0IGJla2VrZW52b2VydHVpZ2VuXCJcbmZ1bmN0aW9uIG9wZW5jbG9zZShldmVudClcbntcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJvcGVuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5cIik7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tEb21DbGljayk7IFxuICAgIH1cbn1cblxuLy9mdW5jdGlvbiB0byBjaGVjayBjbGljayBldmVudCBvdXRzaWRlIGNvbXBvbmVudHNcbmZ1bmN0aW9uIGNoZWNrRG9tQ2xpY2soZXZlbnQpIHtcbiAgICBsZXQgdHJhY2tFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRyYWNrRWxcIik7XG4gICAgY29uc3Qgb3V0c2lkZUNsaWNrRm9yQ29tcG9uZW50MSA9ICF0cmFja0VsZVswXS5jb250YWlucyhldmVudC50YXJnZXQpO1xuICAgIGlmIChvdXRzaWRlQ2xpY2tGb3JDb21wb25lbnQxKSB7XG4gICAgICAgIHRyYWNrRWxlWzBdLmNsYXNzTGlzdC50b2dnbGUoXCJvcGVuXCIpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrRG9tQ2xpY2spO1xuICAgIH0gXG4gIH1cblxuZnVuY3Rpb24gYWRkUGFnaW5pdGlvbihwYWdlbml0aW9uVG90YWwpe1xuICAgIGNvbnN0IHBhZ2VuaXRpb25NZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgIHBhZ2VuaXRpb25NZW51LmNsYXNzTGlzdC5hZGQoJ3BhZ2luYXRpb24nKTsgIFxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdyaWRDb250YWluZXJcIik7XG4gICAgICAgIGNvbnRhaW5lclswXS5hZnRlcihwYWdlbml0aW9uTWVudSk7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBwYWdlbml0aW9uVG90YWw7IGluZGV4KyspIHtcbiAgICAgICAgICAgIC8vcGxhYXRzIGFsbGUgcGFnaW5hdGllIGl0ZW1zIGRpZSBlciB6aWpuIGhldCBtZW51XG4gICAgICAgICAgICB1cGRhdGVQYWdpbml0aW9uKHBhZ2VuaXRpb25NZW51LGluZGV4KTtcbiAgICAgICAgfVxufVxuXG5cbmZ1bmN0aW9uIHVwZGF0ZVBhZ2luaXRpb24ocGFnZW5pdGlvbk1lbnUsaW5kZXgpe1xuICAgICAgIGxldCBwYWdlbml0aW9uSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgcGFnZW5pdGlvbkl0ZW0uY2xhc3NMaXN0LmFkZCgnYnRuJyk7XG4gICAgICAgIHBhZ2VuaXRpb25JdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VTdGF0ZU1lbnVJdGVtKTtcbiAgICAgICAgLy8gYWRkIGhvcmlvbnRhbCBzY3JvbGwgLSBpbnN0ZWFkIG9mIGNsaWNraW5nIHRvIG5leHQgbWVudSBpdGVtLiAtIEZlYXR1cmUgVVhcbiAgICAgIGlmKCEvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpe1xuICAgICAgICAvLyBmYWxzZSBmb3IgbW9iaWxlIGRldmljZSAtIFxuICAgICAgICBwYWdlbml0aW9uTWVudS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGNoZWNrbW91c2VYKTtcbiAgICAgIH1cbiAgICAgICBcbiAgICAgICBsZXQgYnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidG5cIik7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidG5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBidG5zWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpOyAgXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vYWN0aXZlIHN0YXRlIGZvciB1c2VyICsgdXBkYXRlIHJlc3VsdHMgb24gcGFnZSBcbiAgICAgICAgICBmdW5jdGlvbiBjaGFuZ2VTdGF0ZU1lbnVJdGVtKGV2ZW50KSB7XG4gICAgICAgICAgICB1cGRhdGVQYWdpbml0aW9uSXRlbXMoaW5kZXgpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgY3VycmVudFswXS5jbGFzc05hbWUgPSBjdXJyZW50WzBdLmNsYXNzTmFtZS5yZXBsYWNlKFwiIGFjdGl2ZVwiLCBcIlwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9hZGQgdGhlIHNjcm9sbCBvbiBtb3VzZSBtb3ZlbWVudCAtIHBhcnQgb2YgVVggZmVhdHVyZVxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2ttb3VzZVgoZSkgeyAgXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxMZWZ0ID0rIGUuY2xpZW50WDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICBwYWdlbml0aW9uSXRlbS5pbm5lckhUTUwgKz0gaW5kZXg7XG4gICAgICAgIHBhZ2VuaXRpb25NZW51LmFwcGVuZENoaWxkKHBhZ2VuaXRpb25JdGVtKTtcbn1cbi8vdG9vbiBjb21wb25lbnQgXCJMYWF0c3QgYmVrZWtlbnZvZXJ0dWlnZW5cIiBhbGxlZW4gYWxzIGVyIGhpc3RvcnkgaXMuIFxuaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGggPiAwKSB7XG4gICAgdHJhY2tEaXNwbGF5Vm9vcnR1aWcoKTtcbn1cbi8vZmlyc3QgZXhlY3V0ZSBmb3IgZGlwYXlpbmcgdWkuIFxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgQWxsRGF0YSA9ICB1cGRhdGVBcHBEYXRhKCk7XG4gICAgbGV0IHRvdGFsUGVyUGFnZSA9IDUwOyBcbiAgICBsZXQgcGFnZW5pdGlvblRvdGFsID0gIHVwZGF0ZUFwcERhdGEoKS5sZW5ndGgvdG90YWxQZXJQYWdlO1xuICAgIGFkZFBhZ2luaXRpb24ocGFnZW5pdGlvblRvdGFsKTtcbiAgICBmaWxsQXJyYXlzKEFsbERhdGEpO1xufVxuXG5leHBvcnQge1xuICAgIGluaXQsIHVwZGF0ZUFwcERhdGEsIHRyYWNrRGlzcGxheVZvb3J0dWlnXG59OyIsImltcG9ydCB7XG4gICAgaW5pdEFwcFxufSBmcm9tICcuLi9hcHAuanMnO1xuaW1wb3J0IHtcbiAgICBpbml0XG59IGZyb20gJy4vZGlzcGxheVZvZXJ0dWlnT3ZlcnZpZXcuanMnO1xuaW1wb3J0IHtcbiAgICB1cGRhdGVBcHBEYXRhXG59IGZyb20gJy4vZGlzcGxheVZvZXJ0dWlnT3ZlcnZpZXcuanMnO1xuaW1wb3J0IHtcbiAgICBwcmludHByZWRlZmluZWRcbn0gZnJvbSAnLi9kaXNwbGF5Vm9lcnR1aWdEZXRhaWwuanMnO1xuXG4vL3VzZSBsb2NhbCBzb3VyY2Vcbi8vY29uc3QgZW5kcG9pbnQxID0gJy4uLy4uL2RhdGEvcmR3Lmpzb24nO1xuLy91c2Ugb25saW5lIHNvdXJjZVxuLy9zZXQgc2NvcGUgdG8gb25seSBjYXJzLiAtIGNvdWxkIG9wdGlvbmFseSBtYWtlIGEgZmlsdGVyIGJ5IHVzaW5nOiAgYXBpLmh0dHBzOi8vZGV2LnNvY3JhdGEuY29tL2RvY3MvZmlsdGVyaW5nLmh0bWxcbi8vZ2V0IGFsbCByZXN1bHRzIC8vIGlzIHJhbmRvbVxuLy9jb25zdCBlbmRwb2ludDEgPSAnaHR0cHM6Ly9vcGVuZGF0YS5yZHcubmwvcmVzb3VyY2UvbTlkNy1lYmYyLmpzb24nO1xuLy9nZXQgUGVzb25lbmF1dG8ncyBvbmx5XG5jb25zdCBlbmRwb2ludDEgPSAnaHR0cHM6Ly9vcGVuZGF0YS5yZHcubmwvcmVzb3VyY2UvbTlkNy1lYmYyLmpzb24/dm9lcnR1aWdzb29ydD1QZXJzb25lbmF1dG8nO1xuY29uc3QgZmV0Y2hFbmRwb2ludDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgYWRkbG9hZGVyKCk7XG4gICAgZmV0Y2goZW5kcG9pbnQxKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGFsbERhdGFGZXRjaGVkKSB7XG4gICAgICAgcmVtb3ZlbG9hZGVyKCk7XG4gICAgICAgaW5pdEFwcC52b2VydHVpZ2VuID0gYWxsRGF0YUZldGNoZWQ7XG4gICAgICAgaW5pdCgpO1xuICAgICAgIHVwZGF0ZUFwcERhdGEoKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xufTtcblxuY29uc3QgZmV0Y2hFbmRwb2ludDIgPSBmdW5jdGlvbiAoY3VycnZvZXJ0dWlnbGlua0F0dHJMb2NhbFN0b3JhZ2UpIHtcbiAgICAvL3VzZSBsb2NhbCBzdG9yYWdlIGluIGVuZHBvaW50XG4gICAgY29uc3QgZW5kcG9pbnQyID0gYGh0dHBzOi8vb3BlbmRhdGEucmR3Lm5sL3Jlc291cmNlL205ZDctZWJmMi5qc29uP2tlbnRla2VuPSR7Y3VycnZvZXJ0dWlnbGlua0F0dHJMb2NhbFN0b3JhZ2V9YDtcbiAgICBjb25zdCBWb2VydHVpZ0RldGFpbENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVm9lcnR1aWdEZXRhaWxDb250YWluZXJcIik7XG4gICAgZmV0Y2goZW5kcG9pbnQyKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHByZWRlZmluZWRWb29ydHVpZykge1xuICAgICAgICBwcmludHByZWRlZmluZWQocHJlZGVmaW5lZFZvb3J0dWlnLCBWb2VydHVpZ0RldGFpbENvbnRhaW5lcik7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcbn07XG4vL2xvYWRlciBmb3IgdXNlciBVSVxuZnVuY3Rpb24gYWRkbG9hZGVyKCl7XG4gICAgY29uc3QgbG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZChcImxvYWRlclwiKTtcbiAgICBsZXQgZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJncmlkQ29udGFpbmVyXCIpO1xuICAgIGdyaWRDb250YWluZXJbMF0uYXBwZW5kQ2hpbGQobG9hZGVyKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZWxvYWRlcigpe1xuICAgIGxldCBsb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibG9hZGVyXCIpO1xuICAgIGxvYWRlclswXS5yZW1vdmUoKTtcbn1cblxuZXhwb3J0IHtmZXRjaEVuZHBvaW50MSwgZmV0Y2hFbmRwb2ludDJ9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9qcy9hcHAuanNcIik7XG4iLCIiXSwibmFtZXMiOlsiZmV0Y2hFbmRwb2ludDEiLCJsb2Fkdm9lcnR1aWdEZXRhaWxQYWdlIiwiaW5pdEFwcCIsInZvZXJ0dWlnZW4iLCJpbml0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0YXJ0QXBwIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZldGNoRW5kcG9pbnQyIiwic2V0Vm9lcnR1aWdEZXRhaWxQYWdlIiwiZXZlbnQiLCJ2b2VydHVpZ2xpbmtBdHRyIiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInNldExvY2FsU3RvcmFnZSIsIm5ld0lkIiwibG9jYWxTdG9yYWdlIiwibGVuZ3RoIiwic2V0SXRlbSIsImxhc3Rlc3RJdGVtIiwiY3VycnZvZXJ0dWlnbGlua0F0dHJMb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicHJpbnRwcmVkZWZpbmVkIiwicHJlZGVmaW5lZFZvb3J0dWlnIiwiVm9lcnR1aWdEZXRhaWxDb250YWluZXIiLCJsaXN0aG9sZGVyIiwiY3JlYXRlRWxlbWVudCIsImJhY2tCdG4iLCJoZWFkZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJnZW5lcmF0ZWRLZXlBcnJheSIsIk9iamVjdCIsImtleXMiLCJnZW5lcmF0ZWRWYWx1ZUFycmF5IiwidmFsdWVzIiwiaSIsImlubmVySFRNTCIsImNvbmNhdCIsImoiLCJhcHBlbmRDaGlsZCIsInVwZGF0ZUFwcERhdGEiLCJBbGxEYXRhIiwidXBkYXRlUmFuZ2UiLCJyYW5nZU51bWJlciIsImJhc2VTdGFydFJhbmdlIiwiYmFzZUVuZFJhbmdlIiwicmFuZ2VBcnJheSIsInB1c2giLCJ1cGRhdGVQYWdpbml0aW9uSXRlbXMiLCJpbmRleCIsImZpbGxBcnJheXMiLCJuZXdkYXRhVXBkYXRlIiwiYWxsY29udGVudHBhZ2VzIiwidm9lcnR1aWdPdmVyemljaHRDb250YWluZXIiLCJuZXdMaXN0aG9sZGVyIiwic2xpY2UiLCJmb3JFYWNoIiwidmFsdWUiLCJhcnIiLCJ2b2VydHVpZ01lcmtWYXIiLCJtZXJrIiwidm9vcnR1aWdTb29ydCIsInZvZXJ0dWlnc29vcnQiLCJ2b2VydHVpZ2VuS2VudGVrZW4iLCJrZW50ZWtlbiIsInZvZXJ0dWlnSGFuZGVsc0JlbmFtaW5nIiwiaGFuZGVsc2JlbmFtaW5nIiwibmV3RWxlbSIsImZpcnN0Q2hpbGQiLCJ0cmFja0Rpc3BsYXlWb29ydHVpZyIsInRyYWNrRWwiLCJjb250YWluZXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidHJhY2tFbGl0ZW0iLCJwcmV2dm9lcnR1aWdsaW5rQXR0ckxvY2FsU3RvcmFnZSIsImFwcGVuZCIsInByZXBlbmQiLCJhZnRlciIsIm9wZW5jbG9zZSIsImNvbnRhaW5zIiwidG9nZ2xlIiwiY2hlY2tEb21DbGljayIsInRyYWNrRWxlIiwicXVlcnlTZWxlY3RvckFsbCIsIm91dHNpZGVDbGlja0ZvckNvbXBvbmVudDEiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkUGFnaW5pdGlvbiIsInBhZ2VuaXRpb25Ub3RhbCIsInBhZ2VuaXRpb25NZW51IiwidXBkYXRlUGFnaW5pdGlvbiIsInBhZ2VuaXRpb25JdGVtIiwiY2hhbmdlU3RhdGVNZW51SXRlbSIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVja21vdXNlWCIsImJ0bnMiLCJjdXJyZW50IiwiY2xhc3NOYW1lIiwicmVwbGFjZSIsImUiLCJzY3JvbGxMZWZ0IiwiY2xpZW50WCIsInRvdGFsUGVyUGFnZSIsImVuZHBvaW50MSIsImFkZGxvYWRlciIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImFsbERhdGFGZXRjaGVkIiwicmVtb3ZlbG9hZGVyIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiZW5kcG9pbnQyIiwibG9hZGVyIiwiZ3JpZENvbnRhaW5lciIsInJlbW92ZSJdLCJzb3VyY2VSb290IjoiIn0=