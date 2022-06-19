'use strict'

var gMem = {
    selectedImgid: '',
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'You can write something here',
            size: 20 + 'px',
            color: 'red',
            strokeColor: 'black',
            pos: {x: 10, y: 30},
            isDrag: false
        }]
}

function setImg(id) {
    gMem.selectedImgid = id
    // let imgUrl = getImg(id)
    // return imgUrl
}

function getMemeUrl() {
    var img = gImgs.find(img => +img.id === gMem.selectedImgid)
    return img.url
}

function getLines() {
    return gMem.lines
}

function getCurrLineIdx(){
    return gMem.selectedLineIdx
}

function resetCurrLineIdx(lineIdx){
    gMem.selectedLineIdx = lineIdx
}

function setLineDrage(isDrag){
    gMem.lines[gMem.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy){
    gMem.lines[gMem.selectedLineIdx].pos.x += dx
    gMem.lines[gMem.selectedLineIdx].pos.y += dy
}

function isTxtClicked(clickedPos){
    var idx = gMem.lines.findIndex(line => clickedPos.y < line.pos.y && clickedPos.y > line.pos.y -20
        ) 
    // console.log('clickedPos.y > line.y || clickedPos.y < line.y -20',idx = gMem.lines.findIndex(line => clickedPos.y > line.y || clickedPos.y < line.y -20))
    return idx
}

function setColor(color){
    gMem.lines[gMem.selectedLineIdx].color = color
}

function setColorStroke(color){
    gMem.lines[gMem.selectedLineIdx].setColorStroke = color
}

function addLine(){
    var pos  
    if(gMem.lines.length === 0) pos = {x: 10, y: 30}
    else if(gMem.lines.length === 1) pos = {x: 10, y: 270}
    else pos = {x: 10, y: 150}
    var newLine ={
        txt: 'You can write something here',
        size: 20 + 'px',
        color: 'red',
        strokeColor: 'black',
        pos,
        isDrag: false
    }
    gMem.lines.push(newLine)
    gMem.selectedLineIdx = gMem.lines.length -1 
}

function moveBetweenLine(){
    if(gMem.selectedLineIdx === gMem.lines.length -1) gMem.selectedLineIdx = 0
    else gMem.selectedLineIdx ++
}

function deleteLine(){
    gMem.lines.splice(gMem.selectedLineIdx, 1)
    if(gMem.selectedLineIdx === gMem.lines.length)gMem.selectedLineIdx --
    
}

function changeSizeTxt(range){
    var currSize = +gMem.lines[gMem.selectedLineIdx].size.slice(0, 2)
    gMem.lines[gMem.selectedLineIdx].size = currSize + range + 'px'
    // console.log('gMem.lines[gMem.selectedLineIdx].size',gMem.lines[gMem.selectedLineIdx].size)
}