'use strict'

function onInit(){
    renderGalery()
}

function renderGalery(){
    var imgs = getImgs()
    let strHTMLs = imgs.map(img => 
    `<img src="${img.url}" alt="" id="${img.id}" onclick="onImgSelect(${img.id})">`
    )
    document.querySelector('.gallery').innerHTML = strHTMLs.join('')
    var elEditor = document.querySelector('.editor')
    elEditor.style.display = 'none'
}