/*Sets names for variables that will be used mulitple times*/
const textBox = document.getElementById("text-box");
const resultsTable = document.getElementById("results-table");
const overlay = document.getElementById("overlay-effect");
const timerBox = document.getElementById('count-box');
const resultsArea = document.getElementById("results");
const testArea = document.getElementById("testing-area");

/* Global variable to allow timer to be stop and started*/
let timer;
let countdown;

/* Total words wanted for test */
const totalWords = 300;

/* Words to be used for the random generated paragraph*/
const words = [
    "is", 
    "look", 
    "come", 
    "see", 
    "play", 
    "cat", 
    "dog", 
    "when", 
    "up", 
    "at", 
    "when", 
    "and", 
    "eat", 
    "the", 
    "my", 
    "for", 
    "to", 
    "you" 
];

/*Colours to be used for overlays and names*/
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

/** 
 * On page loaded event listener is added to the page and
 * buttons of overlays colours are automatically genereated. 
 * startBtn is also given event listener to start test. 
 */
const buildBtn = document.addEventListener("DOMContentLoaded", buildButtons);
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startTest); 

/**
 * BuildButtons function builds the coloured overlay buttons
 * It takes the colors array and loops through
 * Assigning the innerHTML name and an eventlistener
 * The event listener when clicked changes the color value of the overlay 
 * The event listener also gives the overlay a dataset of the color name used. 
 * The button is then appended within the button div.
 */

function buildButtons() {  
    
    for( let color of colors) {
        let button = document.createElement("button");
        overlay.dataset.colorName = "No Overlay";
        
        button.innerHTML = color.name;
        button.className = "overlay-btns";
        button.addEventListener("click", function() {            
            overlay.style.backgroundColor = color.colorValue;         
            overlay.dataset.colorName = color.name;
        });

        let buttonDiv = document.getElementById("btns");
        buttonDiv.appendChild(button);
    }
};

/** Start test function starts the test by calling on other functions
 * The innerHTML of textBox is given a value of an empty string 
 * The generateText function is called
 * The startTimer function is called
 * The event listeners are replaced so the start button becomes a stop button
 * The innerHTML and classes for the start button are changed 
 * timerBox is given innerHTML of GO! before the timer starts
 */
function startTest() {
    textBox.innerHTML = "";
    startBtn.removeEventListener("click", startTest);
    startBtn.addEventListener("click", stopTest);
    startBtn.classList.remove("start-test");
    startBtn.classList.add("end-test");
    startBtn.innerHTML= "Stop Testing"; 
    timerBox.innerHTML = "GO!";
    startTimer();
    generateText();
    
}

/** Start timer sets the  interval of 1 second
 * Calls the viewtime function. 
 */
function startTimer() {    
    timer = setInterval(viewTime, 1000);
    countdown = 30;             
}

/**creates an if statement to find out if countdown is complete
 * if it has been 30s the timer is cleared
 * The timerBox then prompts the user to click on the last word read
 * timerBox is given new class 
 * The end of test function is called
 * Else if the timer is not finished the countDown prints the seconds left
 * The countdown takes off 1 second *  
 */
function viewTime() {
      if (countdown == -1) {
        clearTimeout(timer);
        timerBox.innerHTML = 'Times up! Click the last word you read'
        timerBox.classList.add("stop-test");
        endTest();
      } else {
        timerBox.innerHTML = countdown + ' s';
        countdown--;
      }
    }     

function endTest() {
    textBox.classList.remove("text-box-default")
    textBox.classList.add("text-box-live")
    testArea.classList.remove("test-area-default")
    testArea.classList.add("test-area-live")
    endChanges();
}    
function stopTest (){
    clearTimeout(timer);
    timerBox.classList.remove("stop-test");
    timerBox.innerHTML = 'Click start to begin the test';
    startBtn.classList.remove("end-test")
    startBtn.classList.add("start-test")
    startBtn.innerHTML= "Start Test";
    endChanges();    
}

function endChanges(){
    startBtn.removeEventListener("click", stopTest);
    startBtn.addEventListener("click", startTest);
   
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
            <span class="wordings" data-word-number=${i}
            onclick="testResult(this.getAttribute('data-word-number'))">
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
    textBox.innerHTML = paragraph;
    return textBox;
}

function testResult(data_word_number) {    
    data_word_number++;
    timerBox.innerHTML = 'You read...' + 
                        data_word_number +
                        ' words with ' +
                        overlay.dataset.colorName +
                        '!'
    startBtn.classList.remove("end-test");
    startBtn.classList.add("start-test");
    startBtn.innerHTML= "Start Test";
    textBox.classList.remove("text-box-live")
    textBox.classList.add("text-box-default")
    testArea.classList.remove("test-area-live")
    testArea.classList.add("test-area-default")
   
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
    timerBox.innerHTML = "Click start to begin the test"
    timerBox.classList.remove("stop-test");   
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

