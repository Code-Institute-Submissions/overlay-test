function startTest() {
    let box = document.getElementById("test-box")
    box.innerHTML = "";

    writeTest()
    
}

function writeTest() {
 
    let box = document.getElementById("test-box");
    box.appendChild(findPara());

}

function findWord() {
    let words = ["is", "look", "come", "see", "play", "cat", "dog", "when", "up", "at", "when", "and", "eat", "the", "my", "for", "to", "you" ];
    word = words[Math.floor(Math.random()*words.length)]
    word = (word + " ");
    return word;
}

function findPara () {
    var totalWords = 300;
    let content = document.createElement('p');
    let para = "";
    
    for(var i = 0; i < totalWords; i++) {
    let str = `<span class = "wordings">${(findWord())}</span>`;
    para += str;
    }
    content.innerHTML = para;

    return content;    

}

function addOverlay() {
 // adding event listeners to the buttons adding class on click
 // remove all classes and then add testing-area + overlay color class 
 let test = document.getElementsByClassName('overlay-btns');
    console.log(test);
}



document.addEventListener("DOMContentLoaded", addOverlay());

function stopTest() {

}

function getResults() {

}

function compareResults() {

}

function writeResult() {

}

function resultsAdvice() {

}