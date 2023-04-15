import {
    initApp
} from '../app.js';
import {
    setVoertuigDetailPage
} from './displayVoertuigDetail.js';

//get the data object
function updateAppData() {
    let AllData = initApp.voertuigen;
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
        newElem.firstChild.addEventListener("click", setVoertuigDetailPage);
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

export {
    init, updateAppData, trackDisplayVoortuig
};