import {
    initApp
} from '../app.js';
import {
    setVoertuigDetailPage
} from './displayVoertuigDetail.js';


function updateAppData() {
    console.log("updateAppData()");
    let AllData = initApp.voertuigen;
    return AllData;
}

function updateRange( rangeNumber ){
    if ( rangeNumber > 1 ) {
        console.log("rangeNumber > 0: "+ rangeNumber );
    }else{
        console.log("rangeNumber = 0: "+ rangeNumber );
        rangeNumber = 0;
    }
    let baseStartRange = 50 * rangeNumber;
    let baseEndRange = baseStartRange + 50;
    console.log(`new updateRange() range: + ${baseStartRange} ${baseEndRange}` );
    let rangeArray = [];
    rangeArray.push(baseStartRange,baseEndRange);
    console.log(rangeArray);
    return rangeArray;
}

function updatePaginitionItems(index){
    console.log( "update index:" + index);
    let rangeNumber = index; 
    //console.log( "update rangenumber:" + updateRange(rangeNumber));  
    //updateRange(rangeNumber); 
    fillArrays(updateAppData(), updateRange(rangeNumber));
}

function fillArrays(AllData,newdataUpdate){
    //console.log("fill arrays"+ blockholder)
    //blockholder.innerHTML = "";
    let allcontentpages = [];
    const voertuigOverzichtContainer = document.getElementById("VoertuigOverzichtContainer");
    voertuigOverzichtContainer.innerHTML = "";
    let newListholder = document.createElement('ul');
    for (let i in AllData) {
        //console.log();
        allcontentpages.push(AllData[i]);
        }
        if (!newdataUpdate) {
            console.log("!newdataUpdate: " + newdataUpdate);
            newdataUpdate = [0,50];
        } else {
            console.log("newdataUpdate with value:" + newdataUpdate);
        }
        console.log("updateData");
        
        allcontentpages.slice(newdataUpdate[0] ,newdataUpdate[1]).forEach(function(value, index, arr){  
        let voertuigMerkVar = arr[index].merk;
        let voortuigSoort =  arr[index].voertuigsoort;
        let voertuigenKenteken = arr[index].kenteken;
        let voertuigHandelsBenaming = arr[index].handelsbenaming;
        let newElem = document.createElement('li');
        newElem.innerHTML =
        `<a href='/voortuigdetail.html' data-voertuigId=${voertuigenKenteken}><h3 data-voertuigId=${voertuigenKenteken}>
        ${voertuigMerkVar}<span>${voertuigHandelsBenaming}</span></h3></a>`;
        newListholder.appendChild(newElem);
        newElem.firstChild.addEventListener("click", setVoertuigDetailPage);
     });
     voertuigOverzichtContainer.appendChild(newListholder);
    
 }

 function trackDisplayVoortuig(){
    let trackEl = document.createElement('div');
    let container = document.getElementsByClassName("gridContainer");
    trackEl.classList.add('trackEl');
   
    for (var i = 1; i <= localStorage.length; i++) {
        let trackElitem = document.createElement('span');
        console.log("getLocalStorage"+localStorage.length);
        const prevvoertuiglinkAttrLocalStorage = localStorage.getItem(i);
        trackElitem.append(prevvoertuiglinkAttrLocalStorage);    
        trackEl.prepend(trackElitem);
    }
    container[0].after(trackEl);
    trackEl.innerHTML+= `<h5>laatst bekeken voortuigen: </h5>`; 
    trackEl.addEventListener("click", openclose); 
}
function openclose(event)
{
console.log(event);
this.classList.toggle("open");
}

function init() {
    console.log(initApp.voertuigen[0]);
    let AllData = initApp.voertuigen;
    //console.log("fill arrays"+ blockholder)
    //blockholder.innerHTML = "";
    let totalPerPage = 50; 
    let pagenitionTotal = initApp.voertuigen.length/totalPerPage;
    addPaginition(pagenitionTotal);
    fillArrays(AllData);
}
 

function addPaginition(pagenitionTotal){

    //console.log("blockholder:"+ blockholder.id)
    const pagenitionMenu = document.createElement("ul");
    pagenitionMenu.classList.add('pagination');  
    let container = document.getElementsByClassName("gridContainer");
    container[0].after(pagenitionMenu);
    //blockholder.before(pagenitionMenu);
        for (let index = 1; index < 5; index++) {
        updatePaginition(pagenitionMenu,index);
        }
}

function updatePaginition(pagenitionMenu,index){
    
       let pagenitionItem = document.createElement("li");
        pagenitionItem.classList.add('btn');
        pagenitionItem.addEventListener("click", changeStateMenuItem);
          let btns = document.getElementsByClassName("btn");
          for (var i = 0; i < btns.length; i++) {
            btns[0].classList.add('active');
           
          }
          function changeStateMenuItem() {
            updatePaginitionItems(index);
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
            }
        pagenitionItem.innerHTML += index;
        pagenitionMenu.appendChild(pagenitionItem);
}

if (localStorage.length > 0) {
    trackDisplayVoortuig();
}

export {
    init, updateAppData, trackDisplayVoortuig
};