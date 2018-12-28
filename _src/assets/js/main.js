'use strict';
console.log('>> Ready :)');

const ul = document.querySelector('.ul');
const btn = document.querySelector('.btn');
const urlApi = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';
const placeholder = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
const radios = document.getElementsByName('numbers');
let radioValue = '';

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
    console.log(radioValue);
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
    console.log(data);
    let content = '';
    if (ul.innerHTML != content){
        ul.innerHTML = content;
    }
    for (let i=0; i<data.length;i++){
        const srcImage = data[i].image;
        const pair = data[i].pair;
        content += `<li class="card" data-image="${srcImage}" data-pair="${pair}" data-state="false">
        <img src="${placeholder}" alt="" class="image" >
        </li>`; 
    }
    ul.innerHTML = content;
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
    if (tState === 'false') {
        card.firstElementChild.src = tImage;
        card.setAttribute('data-state', true);
    } else if (tState === 'true') {
        card.firstElementChild.src = placeholder;
        card.setAttribute('data-state', false);
    }
}

btn.addEventListener('click', getResults);