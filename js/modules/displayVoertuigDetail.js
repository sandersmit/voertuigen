import {
    fetchEndpoint2
} from './sourceData.js';

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
     fetchEndpoint2(currvoertuiglinkAttrLocalStorage);
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

export {
    setVoertuigDetailPage,
    loadvoertuigDetailPage,
    printpredefined
};