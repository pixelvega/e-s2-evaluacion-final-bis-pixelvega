"use strict";console.log(">> Ready :)");const ul=document.querySelector(".ul"),btn=document.querySelector(".btn"),urlApi="https://raw.githubusercontent.com/Adalab/cards-data/master/",placeholder="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB",radios=document.getElementsByName("numbers");let radioValue="",arPairs=[],arShow=[],active=!1;if(addRadioListener(),localStorage.length>0){const e=JSON.parse(localStorage.getItem("num"));console.log(e);for(let t=0;t<radios.length;t++)e==radios[t].value&&(radios[t].checked=!0,radioValue=e)}else radios[0].checked=!0,radioValue=radios[0].value,localStorage.setItem("num",JSON.stringify(radioValue));function addRadioListener(){for(let e=0;e<radios.length;e++)radios[e].addEventListener("change",getValueRadio)}function getValueRadio(e){radioValue=e.currentTarget.value,localStorage.setItem("num",JSON.stringify(radioValue))}function getResults(){fetch(urlApi+radioValue).then(e=>e.json()).then(e=>{showResults(e)})}function showResults(e){let t="";ul.innerHTML!=t&&(ul.innerHTML=t);for(let a=0;a<e.length;a++){t+=`<li class="card" data-image="${e[a].image}" data-pair="${e[a].pair}" data-state="false">\n        <img src="${placeholder}" alt="" class="image" >\n        </li>`}ul.innerHTML=t,addListenerCards()}function addListenerCards(){const e=document.querySelectorAll(".card");for(const t of e)t.addEventListener("click",showImage)}function showImage(e){let t=e.currentTarget,a=t.getAttribute("data-image"),r=t.getAttribute("data-state"),i=t.getAttribute("data-pair");if("false"===r&&!1===active){if(arShow.push(t),t.firstElementChild.src=a,t.setAttribute("data-state",!0),arPairs.push(i),arPairs.length>=2)if(arPairs[0]===arPairs[1])emptyAr();else{active=!0,setTimeout(function(){for(const e of arShow)e.firstElementChild.src=placeholder,e.setAttribute("data-state",!1);emptyAr(),active=!1},2e3)}}else"true"===r&&arPairs[0]===i&&(t.firstElementChild.src=placeholder,t.setAttribute("data-state",!1),emptyAr())}function emptyAr(){arPairs=[],arShow=[]}btn.addEventListener("click",getResults);