import {
    fetchEndpoint2
} from './sourceData.js';

function setVoertuigDetailPage(event) {
    event.target.parentElement.classList.add('test');
    console.log("event.target.name"+ event.target.parentElement);
    //setting data attribute with movie id
    const voertuiglinkAttr = event.target.parentElement.getAttribute("data-voertuigid");
    console.log("setvoertuigDetailPage()"+ voertuiglinkAttr);
    //setting local storage
    setLocalStorage(voertuiglinkAttr);
}

function setLocalStorage(voertuiglinkAttr){
    console.log("setLocalStorage"+ localStorage.length);
    let newId = localStorage.length + 1;
    localStorage.setItem(newId, voertuiglinkAttr);
}

function loadvoertuigDetailPage() {
    let lastestItem = localStorage.length;
    const currvoertuiglinkAttrLocalStorage = localStorage.getItem(lastestItem);
     fetchEndpoint2(currvoertuiglinkAttrLocalStorage);
}

function printpredefined(predefinedVoortuig, VoertuigDetailContainer) {

   console.log("predefinedVoortuig"+predefinedVoortuig[0].kenteken);
   const listholder = document.createElement("ul");
   const backBtn = document.createElement("a");
   const header = document.createElement("header");
   backBtn.classList.add("backlink");
   backBtn.setAttribute("href", "overview.html");

   for (const [key, value] of Object.entries(predefinedVoortuig)) {
        console.log(`${key}: ${value.merk}`);
      }
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