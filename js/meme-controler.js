'use strict'

var gElCanvas
var gCtx


function onImgSelect(imgid) {
    // renderEditorTools()
    var elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none'
    var elEditor = document.querySelector('.editor')
    elEditor.style.display = 'block'
    setImg(imgid)
    gElCanvas = document.querySelector('.my-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    addListeners()
    renderMeme()
}

// function renderEditorTools() {
//     console.log('a')
//     var strHTML = 
//     var elGallery = document.querySelector('.gallery')
//     elGallery.innerHTML = ''
//     var elEditor = document.querySelector('.editor')
//     elEditor.innerHTML = strHTML
// }

function renderMeme() {
    var memeUrl = getMemeUrl()
    drawImg(memeUrl)
}

function drawImg(memeUrl) {
    var img = new Image()
    img.src = memeUrl

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTexts()
    }
}

function drawTexts() {
    var txts = getLines()
    txts.forEach((txt, idx) => {
        drawText(txt.txt, txt.color, 10, txt.pos.y, idx)
    })
}

function drawText(text, color, x, y, idx) {
    var currLineIdx = getCurrLineIdx() 
    if(currLineIdx === idx){
        gCtx.fillStyle = '#05050584'
    gCtx.fillRect(x, y - 20, x + 240, y)
    }
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = '20px Arial';
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function addListeners() {
    addMouseListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTxtClicked(pos)) return
    // setCircleDrag(true)
    // gStartPos = pos
    var currLineIdx = getCurrLineIdx()
    document.body.style.cursor = 'grabbing'
    var memeLine = getLines()
    var elInput = document.querySelector('input')
    elInput.placeholder = memeLine[currLineIdx].txt
}

function onChangeTxt(txt) {
    var memeLine = getLines()
    var currLineIdx = getCurrLineIdx()
    memeLine[currLineIdx].txt = txt.name
    renderMeme()
}

function onUp() {
    // setCircleDrag(false)
    document.body.style.cursor = 'grab'
}

function onChangeColor(color){
    setColor(color.name)
    renderMeme()
}

function onAddLine(){
    addLine()
    renderMeme()
}

function onMoveBetweenLine(){
    moveBetweenLine()
    renderMeme()
}

function onDeleteLine(){
    deleteLine()
    renderMeme()
}