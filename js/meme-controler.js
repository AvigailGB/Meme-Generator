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
        drawText(txt.txt, txt.color, txt.strokeColor, txt.pos.x, txt.pos.y, txt.size, idx)
    })
}

function drawText(text, color, strokeColor, x, y, size, idx) {
    // console.log('text',text)
    var currLineIdx = getCurrLineIdx()
    if (currLineIdx === idx) {
        gCtx.fillStyle = '#05050584'
        gCtx.fillRect(x, y-20, x + (gCtx.measureText(text).width), y)
        // console.log('y, x',y, x)
    }
    gCtx.measureText(text).width
    // console.log('gCtx.measureText(text).width', gCtx.measureText(text).width)
    gCtx.lineWidth = 1
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    var txts = getLines()
    gCtx.font = size
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
    gElCanvas.addEventListener('mousemove', onMove)
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
    var idxClicked = isTxtClicked(pos)
    if ( idxClicked === -1) return
    resetCurrLineIdx(idxClicked)
    setLineDrage(true)
    document.body.style.cursor = 'grabbing'
    var memeLine = getLines()
    var elInput = document.querySelector('input')
    elInput.placeholder = memeLine[idxClicked].txt
    renderMeme()
}

function onMove(ev) {
    const lines = getLines()
    const idx = getCurrLineIdx()
    if (lines[idx].isDrag) {
        const pos = getEvPos(ev)
        //Calc the delta , the diff we moved
        const dx = pos.x - lines[idx].pos.x
        const dy = pos.y - lines[idx].pos.y
        moveLine(dx, dy)
        //Save the last pos , we remember where we`ve been and move accordingly
        lines[idx].pos = pos
        //The canvas is render again after every move
        renderMeme()
    }
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
    setLineDrage(false)
}

function onChangeColorStroke(color){
    setColorStroke(color.name)
    renderMeme()
}

function onChangeColor(color) {
    setColor(color.name)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onMoveBetweenLine() {
    moveBetweenLine()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onChangeSizeTxt(range) {
    changeSizeTxt(range)
    renderMeme()
}
