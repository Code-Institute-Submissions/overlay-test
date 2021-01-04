
const buildBtn = document.addEventListener("DOMContentLoaded", buildButtons);
let timerbtn = document.getElementById("start-btn"); 
const testBox = document.getElementById("test-box");
const container = document.getElementById("testing-area");
const words = ["is", "look", "come", "see", "play", "cat", "dog", "when", "up", "at", "when", "and", "eat", "the", "my", "for", "to", "you" ];
const totalWords = 300;
const resultsTable = document.getElementById("results-table");
let overlay = document.getElementById("overlay-effect");
let timer;
timerbtn.addEventListener("click", startTest);
const countBox = document.getElementById('count-box')
const resultsArea = document.getElementById("results")

const colors = [
     {
       'name': 'No Overlay',
        'colorValue': 'rgba(0,0,0,0.01)'
     },
     {
       'name': 'Mint Green',
        'colorValue': 'rgba(62,239,118,0.3)'
     },
     {
       'name': 'Lime Green',
        'colorValue': 'rgba(25,245,0,0.3)'
     },
     {
       'name': 'Rose',
        'colorValue': 'rgba(218,106,152,0.3)'
     },
     {
       'name': 'Pink',
        'colorValue': 'rgba(245,0,168,0.3)'
     },
     {
       'name': 'Purple',
        'colorValue': 'rgba(61,6,109,0.3)'
     },
     {
       'name': 'Yellow',
        'colorValue': 'rgba(219,235,9,0.3)'
     },
     {
       'name': 'Blue',
        'colorValue': 'rgba(9,46,235,0.3)'
     },
    { 
        'name' : 'Aqua',
        'colorValue' : 'rgba(64,177,168,0.3)' 
    },
    { 
        'name' : 'Orange',
        'colorValue' : 'rgba(260,200,30,0.3)' 
    },
    { 
        'name' : 'Grey',
        'colorValue' : 'rgba(0,0,0,0.3)'
    }
];

function buildButtons() {
    
    for(i = 0; i < colors.length; i++) {
        let button = document.createElement("button");
        let addColor = colors[i].colorValue; 
        let color= colors[i].name;
        overlay.dataset.colorName = "No Overlay";
        
        button.innerHTML = colors[i].name;
        button.className = "overlay-btns";
        button.addEventListener("click", function() {            
            overlay.style.backgroundColor = addColor;         
            overlay.dataset.colorName = color;
        });

        let buttonDiv = document.getElementById("btns");
        buttonDiv.appendChild(button);
    }
}

function startTest() {
    testBox.innerHTML = "";
    timerbtn.removeEventListener("click", startTest);
    timerbtn.addEventListener("click", stopTest);
    timerbtn.style.backgroundColor = "var(--blue-background)";
    timerbtn.style.color= " var(--sub-font-color)";
    timerbtn.innerHTML= "Stop Testing"; 
    countBox.innerHTML = "GO!";
    startTimer();
    generateText();
    
}

function startTimer() {
    let countdown = 3;
    timer = setInterval(viewTime, 1000);
    
    function viewTime() {
      if (countdown == -1) {
        clearTimeout(timer);
        countBox.innerHTML = 'Times up! Click the last word you read'
        countBox.classList.add("stop-test");
        endTest();
      } else {
        countBox.innerHTML = countdown + ' s';
        countdown--;
      }
    }            
}

function stopTest (){
    clearTimeout(timer);
    countBox.classList.remove("stop-test");
    countBox.innerHTML = 'Click start to begin the test';
    endChanges();    
}

function endTest() {
    testBox.style.zIndex = "2";
    container.style.zIndex ="0";
    endChanges();
}

function endChanges(){
    timerbtn.removeEventListener("click", stopTest);
    timerbtn.addEventListener("click", startTest);
    timerbtn.innerHTML= "Start Test";
    timerbtn.style.backgroundColor = "var(--pink-color)";
    timerbtn.style.color= " var(--font-color)";
}

function findWord() {
    let word = words[Math.floor(Math.random()*words.length)]
    return word;
} 

function generateText () {
    let paragraph = "";
    
    for(let i = 0; i < totalWords; i++) {
        let thisWord= findWord();    
        let str = `
            <span class="wordings" data-word-number=${i} onclick="testResult(this.getAttribute('data-word-number'))">
                ${thisWord} 
            </span>
        `;
        let findEndStr =  paragraph.slice(-45);
        let skipWord = findEndStr.includes(thisWord);
        
        if (skipWord) {
                continue;        
            } else {
                paragraph += str;        
            }
        }
    testBox.innerHTML = paragraph;
    return testBox;
}

function testResult(data_word_number) {    
    data_word_number++;
    countBox.innerHTML = 'You read...' + data_word_number + ' words with ' + overlay.dataset.colorName + '!'
    testBox.style.zIndex = "-1";
    container.style.zIndex ="-2";
   
   if (resultsTable.hasChildNodes()) {
        console.log("table already made")
        createRow(data_word_number)
    } else {
        createTable()
        createRow(data_word_number)
    };
    
    setTimeout(resultsAlert, 1000);
}        

function resultsAlert(){
    alert( 'Your results have been added to a table below this test') 
    countBox.innerHTML = "Click start to begin the test"
    countBox.classList.remove("stop-test");   
    results.style.display = "block";
    
}
 
function createTable(){
    let tbody = document.createElement('tbody')    
    let row = document.createElement('tr');  
    resultsTable.classList.add('table-color');

    let head1 = document.createElement('th');
    let head2 = document.createElement('th');
    
    let heading1 = document.createTextNode('Overlay Colour');
    let heading2 = document.createTextNode('Words Read');

    head1.appendChild(heading1);
    head2.appendChild(heading2);
    row.appendChild(head1);
    row.appendChild(head2);
    tbody.appendChild(row)
    tbody.id = "tbody";

    resultsTable.appendChild(tbody);    
}

function createRow(data_word_number) {
    let tbody = document.getElementById("tbody")

    let row = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.classList.add("overlay-color");
    td2.classList.add("word-count");

    let data1 = document.createTextNode(overlay.dataset.colorName)
    let data2 = document.createTextNode(data_word_number)
    
    td1.appendChild(data1);
    td2.appendChild(data2);
    row.appendChild(td1);
    row.appendChild(td2);

    tbody.appendChild(row);
}

function getResult(){

}

function resultsAdvice() {

}
