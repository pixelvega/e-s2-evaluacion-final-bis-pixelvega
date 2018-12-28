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
            //console.log(radios[i]);
            radios[i].checked = true;
            radioValue = inputSelected;
        }
    }
    //checked input value === inputSelected
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
}

btn.addEventListener('click', getResults);