function startTest() {
    
    writeTest()
    
}

function writeTest() {
let content = document.createElement("span");
let word = document.createTextNode(findWord());
content.appendChild(word);

let box = document.getElementById("test-box");
box.appendChild(content);

}

function findWord() {
    let words = ["is", "look", "come", "see", "play", "cat", "dog", "when", "up", "at", "when", "and", "eat", "the", "my", "for", "to", "you" ];
    word = words[Math.floor(Math.random()*words.length)]
    word = (word + " ");
    return word;
}

function findPara (){

}

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