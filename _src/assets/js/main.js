'use strict';
console.log('>> Ready :)');

const ul = document.querySelector('.ul');
const btn = document.querySelector('.btn');
const urlApi = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';
const placeholder = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
const radios = document.getElementsByName('numbers');
let radioValue = '';
let arPairs = [];
let arShow = [];
let active = false;

addRadioListener();

if(localStorage.length>0){
    const inputSelected = JSON.parse(localStorage.getItem('num'));
    console.log(inputSelected);
    for (let i=0;i<radios.length;i++){
        if (inputSelected == radios[i].value){
            radios[i].checked = true;
            radioValue = inputSelected;
        }
    }
} else {
    radios[0].checked = true;
    radioValue = radios[0].value;
    localStorage.setItem('num', JSON.stringify(radioValue));
}

function addRadioListener() {
    for(let i = 0; i < radios.length; i++){
        radios[i].addEventListener('change', getValueRadio);
    }
}

function getValueRadio(e) {
    radioValue = e.currentTarget.value;
    localStorage.setItem('num', JSON.stringify(radioValue));
}

function getResults() {
    fetch(urlApi+radioValue)
    .then(data => data.json())
    .then(data => {
        showResults(data);
    });
}

function showResults (data) {
    let content = '';
    if (ul.innerHTML != content){
        ul.innerHTML = content;
    }
    for (let i=0; i<data.length;i++){
        const srcImage = data[i].image;
        const pair = data[i].pair;
        content += `<li class="card" data-image="${srcImage}" data-pair="${pair}" data-state="false">
        <img src="${srcImage}" alt="" class="image" >
        </li>`; 
    }
    ul.innerHTML = content;
    setTimeout(addPlaceholder,3000);
}

function addPlaceholder() {
    const arImages = document.querySelectorAll('.image');
    for(const img of arImages){
        img.src = placeholder;
    }
    addListenerCards();    
}

function addListenerCards() {
    const arCards = document.querySelectorAll('.card');
    for (const card of arCards) {
        card.addEventListener('click', showImage);
    }
}

function showImage(e) {
    let card = e.currentTarget;
    let tImage = card.getAttribute("data-image");
    let tState = card.getAttribute("data-state");
    let tPair = card.getAttribute("data-pair");
    if (tState === 'false' && active===false) {
        arShow.push(card);
        card.firstElementChild.src = tImage;
        card.setAttribute('data-state', true);
        arPairs.push(tPair);
        if(arPairs.length>=2){
            if(arPairs[0]===arPairs[1]){
                emptyAr();
            } else {
                active=true;
                function badChoice(){ 
                    for(const errorCard of arShow){
                        errorCard.firstElementChild.src = placeholder;
                        errorCard.setAttribute('data-state', false);
                    }
                    emptyAr();
                    active=false;
                }
                setTimeout(badChoice,2000);
            }
        }
    } else if (tState === 'true' && arPairs[0]===tPair){
        card.firstElementChild.src = placeholder;
        card.setAttribute('data-state', false);
        emptyAr();
    }
}

function emptyAr() {
    arPairs = [];
    arShow = [];
}

btn.addEventListener('click', getResults);