'use strict'

var gMem = {
    selectedImgid: '',
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'You can write something interesting',
            size: 20 + 'px',
            color: 'red',
            pos: {x: 10, y: 30}
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

function isTxtClicked(clickedPos){
    var idx = gMem.lines.findIndex(line => clickedPos.y > line.y || clickedPos.y < line.y -20
        ) 
    // console.log('clickedPos.y > line.y || clickedPos.y < line.y -20',idx = gMem.lines.findIndex(line => clickedPos.y > line.y || clickedPos.y < line.y -20))
    return idx
}

function setColor(color){
    gMem.lines[gMem.selectedLineIdx].color = color
}

function addLine(){
    var pos  
    if(gMem.lines.length === 0) pos = {x: 10, y: 30}
    else if(gMem.lines.length === 1) pos = {x: 10, y: 270}
    else pos = {x: 10, y: 150}
    var newLine ={
        txt: 'You can write something interesting',
        size: 20 + 'px',
        color: 'red',
        pos
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