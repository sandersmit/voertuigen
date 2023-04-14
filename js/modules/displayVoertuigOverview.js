import {
    initApp
} from '../app.js';
import {
    setVoertuigDetailPage
} from './displayVoertuigDetail.js';





function updateAppData() {
    let AllData = initApp.voertuigen;
    return AllData;
}

function updateRange( rangeNumber ){
    if ( rangeNumber == 0 ) {
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

function updatePaginitionItems(index,filterVal){
    let rangeNumber = index; 
    fillArrays(updateAppData(), updateRange(rangeNumber),filterVal);
}

function fillArrays(AllData,newdataUpdate,filterVal){
    let allcontentpages = [];
    const voertuigOverzichtContainer = document.getElementById("VoertuigOverzichtContainer");
    voertuigOverzichtContainer.innerHTML = "";
    let newListholder = document.createElement('ul');
    for (let i in AllData) {
        //console.log(AllData[i])
            if (filterVal == "Motorfiets") {
                console.log("motorfiets selectie")
                allcontentpages.push(AllData[i].Motorfiets);
            }
            else if (filterVal == "Personenauto") {
                console.log("Personenauto selectie")
                allcontentpages.push(AllData[i].Personenauto);
            }
            else{
                console.log("geen selectie")
                allcontentpages.push(AllData[i]);
            }
        }
        if (!newdataUpdate) {
            newdataUpdate = [0,50];
        }

        allcontentpages.slice(newdataUpdate[0] ,newdataUpdate[1]).forEach(function(value, index, arr){  
        //let voertuigMerkVar = arr[index].merk;
        let voortuigSoort =  arr[index].voertuigsoort;
        //let voertuigenKenteken = arr[index].kenteken;
        //let voertuigHandelsBenaming = arr[index].handelsbenaming;
        let newElem = document.createElement('li');
        // newElem.innerHTML =
        // `<a href='voortuigdetail.html' data-voertuigId=${voertuigenKenteken}><h3 data-voertuigId=${voertuigenKenteken}>
        // ${voertuigMerkVar}<span>${voertuigHandelsBenaming}</span><span>${voortuigSoort}</span></h3></a>`;
        newElem.innerHTML =
        `<a href='voortuigdetail.html' ><h3 >
        <span>${voortuigSoort}</span></h3></a>`;
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
    if (this.classList.contains('open')) {
        console.log("contains open");
        this.classList.toggle("open");
        //document.removeEventListener('click', checkDomClick);
        
    } else {
        console.log("not contains open");
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
  };

function addPaginition(pagenitionTotal){
    const pagenitionMenu = document.createElement("ul");
    pagenitionMenu.classList.add('pagination');  
    // add horiontal scroll
    pagenitionMenu.addEventListener("wheel", function (e) {
        if (e.deltaY > 0) {
            pagenitionMenu.scrollLeft += 100;
        //prevent scoll on the page
        e.preventDefault();
        }
        else {
            pagenitionMenu.scrollLeft -= 100;
        e.preventDefault();
        }
    });
        let container = document.getElementsByClassName("gridContainer");
        container[0].after(pagenitionMenu);
        for (let index = 1; index < pagenitionTotal; index++) {
        updatePaginition(pagenitionMenu,index);
        }
}

function updatePaginition(pagenitionMenu,index){
       let pagenitionItem = document.createElement("li");
        pagenitionItem.classList.add('btn');
        let position = 0;
        pagenitionItem.addEventListener("click", changeStateMenuItem);
        pagenitionMenu.addEventListener("mousemove", checkmouseX);
          let btns = document.getElementsByClassName("btn");
          for (var i = 0; i < btns.length; i++) {
            btns[0].classList.add('active');  
          }
          
          function changeStateMenuItem(event) {
            updatePaginitionItems(index)
            console.log("index"+index)
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
            
            }
            function checkmouseX(e) {  
                this.scrollLeft =+ e.clientX;
                console.log(this.scrollLeft);
            }

        pagenitionItem.innerHTML += index;
        pagenitionMenu.appendChild(pagenitionItem);
}

if (localStorage.length > 0) {
    trackDisplayVoortuig();
}

function initFilter(){
    let filters = document.querySelectorAll(".filter");
    const filteroptionMotorfiets = document.getElementById("Motorfiets");
    const filteroptionPersonenauto = document.getElementById("Personenauto");
    const filteroptionBromfiets = document.getElementById("Bromfiets");
    //const filteroptionPersonenauto = document.getElementById("Personenauto");
    //filters[0].getElementById("Motorfiets");
    console.log(filters[0])
    filteroptionMotorfiets.addEventListener("click", filtering);
    filteroptionPersonenauto.addEventListener("click", filtering);
    filteroptionBromfiets.addEventListener("click", filtering);
    //filteroptionPersonenauto.addEventListener("click", filtering);
}
function filtering(event){
    let filterVal = event.target.value;
    let AllData = initApp.voertuigen;
    console.log(AllData);
    console.log(filterVal);
    //setting first page
    let index = 0;
   // fillArrays(AllData,newdataUpdate,filterVal);
   updatePaginitionItems(index,filterVal)
}

function init() {
    let AllData = initApp.voertuigen;
    let totalPerPage = 50; 
    let pagenitionTotal = initApp.voertuigen.length/totalPerPage;
    addPaginition(pagenitionTotal);
    console.log(AllData);
    fillArrays(AllData);
    initFilter();
    
}

export {
    init, updateAppData, trackDisplayVoortuig
};