/*Sets names for variables that will be used mulitple times in functions*/
const textBox = document.getElementById('text-box');
const resultsTable = document.getElementById('results-table');
const overlay = document.getElementById('overlay-effect');
const timerBox = document.getElementById('count-box');
const resultsArea = document.getElementById('results');
const testArea = document.getElementById('testing-area');
const instructions = document.getElementById('instructions');
const buttonDiv = document.getElementById('btns');  

/* Global variables to allow timer to be stop and started*/
let timer;
let countdown;

/* Words to be used for the random generated paragraph*/
const words = [
    'is', 
    'look', 
    'come', 
    'see', 
    'play', 
    'cat', 
    'dog', 
    'when', 
    'up', 
    'at', 
    'when', 
    'and', 
    'eat', 
    'the', 
    'my', 
    'for', 
    'to', 
    'you' 
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

/** On page loaded event listener is added to the page and
 * buttons of overlays colours are automatically genereated. 
 * startBtn is also given event listener to start test. 
 * submitBtn is also given an event listener for calculator
 */
const buildBtn = document.addEventListener('DOMContentLoaded', buildButtons);
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById("calculate-btn");
startBtn.addEventListener('click', startTest); 
submitBtn.addEventListener("click", calculator)

/** BuildButtons function builds the coloured overlay buttons
 * It takes the colors array and loops through
 * Assigning the innerHTML name and an eventlistener
 * The event listener when clicked changes the color value of the overlay 
 * The event listener also gives the overlay a dataset of the color name used. 
 * The button is then appended within the button div.
 * Calls the instruction button function 
 */
function buildButtons() {
    
    for( let color of colors) {
        let button = document.createElement('button');
        overlay.dataset.colorName = 'No Overlay';
        
        button.innerHTML = color.name;
        button.className = 'overlay-btns';
        button.addEventListener('click', function() {            
            overlay.style.backgroundColor = color.colorValue;         
            overlay.dataset.colorName = color.name;
        });        
        buttonDiv.appendChild(button);
    }
    instructionBtn()
};

/** Button that the user can click to see the instructions again
 * This calls the stop test function and reverts the classes
 */

function instructionBtn() {
    let instructionBtn = document.createElement('button');
    instructionBtn.innerHTML = 'See Instructions';
    instructionBtn.classList.add('instruction-btn')
    instructionBtn.classList.add('overlay-btns');
    
    instructionBtn.addEventListener('click', function() {
        instructions.classList.add('show-instructions')
        textBox.innerHTML = '';
        stopTest();    
    })
        buttonDiv.appendChild(instructionBtn)
}

/** Start test function starts the test by calling on other functions
 * The innerHTML of textBox is given a value of an empty string 
 * The generateText function is called
 * The startTimer function is called
 * The event listeners are replaced so the start button becomes a stop button
 * The innerHTML and classes for the start button are changed 
 * timerBox is given innerHTML of GO! before the timer starts
 */
function startTest() {
    instructions.classList.remove("show-instructions")
    textBox.innerHTML = '';
    startBtn.removeEventListener('click', startTest);
    startBtn.addEventListener('click', stopTest);
    startBtn.classList.remove('start-test');
    startBtn.classList.add('end-test');
    startBtn.innerHTML= 'Stop Testing'; 
    timerBox.innerHTML = 'GO!';
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
 * If it has been 30s the timer is cleared
 * The timerBox then prompts the user to click on the last word read
 * TimerBox is given new class 
 * The end of test function is called
 * Else if the timer is not finished the countDown prints the seconds left
 * The countdown takes off 1 second *  
 */
function viewTime() {
    if (countdown == -1) {
    clearTimeout(timer);
    timerBox.innerHTML = 'Times up! Click the last word you read'
    timerBox.classList.add('stop-test');
    changeIndex();
    } else {
    timerBox.innerHTML = countdown + ' s';
    countdown--;
    }
}     

/** The changeIndex function changes the indexing of the testing area,
 * the user can then click on the word they reached during the test
 * Changes the innerHTML to 'Reset' incase the user doent want to save
  */
function changeIndex() {
    textBox.classList.remove('text-box-default');
    textBox.classList.add('text-box-live');
    testArea.classList.remove('test-area-default');
    testArea.classList.add('test-area-live')
}

/** Reverts the index back to the initial position when called */
function revertIndex(){
    textBox.classList.remove('text-box-live')
    textBox.classList.add('text-box-default')
    testArea.classList.remove('test-area-live')
    testArea.classList.add('test-area-default')
}

/** Changes the stop button back to a start button 
 * reverts the timberBox to default and removes the colour banding
*/
function endChanges(){
    startBtn.removeEventListener('click', stopTest);
    startBtn.addEventListener('click', startTest); 
    startBtn.classList.remove('end-test');
    startBtn.classList.add('start-test');
    startBtn.innerHTML= 'Start Test';  
    timerBox.classList.remove('stop-test')
}

/** The stopTest function reverts the test back to its original point
 * The timer is cleared and startBtn and timberBox are reverted to original
 * The changeIndex hasn't been called so the user can't mistakenly click a word
 * It calls the endChanges to revert the event listeners
 */
function stopTest (){
    clearTimeout(timer);
    timerBox.innerHTML = 'Click start to begin the test';
    endChanges();    
}

/** Finds a random word in the words array and returns it as word */
function findWord() {
    let word = words[Math.floor(Math.random()*words.length)]
    return word;
} 

/**Generates a random paragraph of words
 * Sets the paragraph as an empty string at the start so text is replaced
 * It takes the totalWords variable and runs a loop based on the value (300)
 * It calls the findWord function to generate a random word
 * Then it creates a string that assigns a dataset and uses the random word.
 * It then finds out whether that word was the last to be added 
 * If the same word was added last then it will skip adding the new string  
 * If the word is different to the previous it will add this to the paragraph
 * Outside of the loop the created paragraph is then added to the textBox
 */
function generateText () {
    let totalWords = 300;
    let paragraph = '';
    
    for(let i = 0; i < totalWords; i++) {
        let thisWord= findWord();    
        let str = `
            <span class='words' data-word-number=${i}
            onclick='testResult(this.getAttribute("data-word-number"))'>
                ${thisWord} 
            </span>
        `;
        let findEndStr =  paragraph.slice(-45);
        let skipWord = findEndStr.includes(thisWord);
        
        if (skipWord) {
            totalWords++
                continue;        
            } else {
                paragraph += str;        
            }
        }
    textBox.innerHTML = paragraph;
    return textBox;
} 

/** The results are displayed inside the textbox
 * It will call the endchanges function and revert the index
 * If the table has no content it will add tbody, headings & generate a row
 * If there is a table the function will call generate row and append it
 * Time out is set so the user can see their result before the alert is run
 */
function testResult(data_word_number) {    
    data_word_number++;
    timerBox.innerHTML = 'You read...' + 
                        data_word_number +
                        ' words with ' +
                        overlay.dataset.colorName +
                        '!'
    endChanges()
    revertIndex()
   
   if (resultsTable.hasChildNodes()) {
        console.log('table already made')
        createRow(data_word_number)
    } else {
        createTable()
        createRow(data_word_number)
    };
    
    setTimeout(resultsAlert, 500);
}

/** This function will give the user an alert 
 * The alert will prompt the user to look at the table below
 * It will then also show the results table that has been hidden. 
*/
function resultsAlert(){
    alert( 'Your results have been added to a table below this test') 
    timerBox.innerHTML = 'Click start to begin the test'
    timerBox.classList.remove('stop-test');   
    resultsArea.style.display = 'block';   
}
 
/** Creates a table
 * Creates a row
 * Adds the Overlay Colour & Words Read headings to the row
 * Appended these within the body of the table create
 * Table is appended to the resultsTable. 
 */
function createTable(){
    let tbody = document.createElement('tbody')    
    let row = document.createElement('tr');  

    let head1 = document.createElement('th');
    let head2 = document.createElement('th');
    
    let heading1 = document.createTextNode('Overlay Colour');
    let heading2 = document.createTextNode('Words Read');

    head1.appendChild(heading1);
    head2.appendChild(heading2);
    row.appendChild(head1);
    row.appendChild(head2);
    tbody.appendChild(row)
    tbody.id = 'tbody';

    resultsTable.appendChild(tbody);    
}

/** Creates a new row containing the results
 * Takes the overlay data from the dataset
 * Takes the word count from data_word_number
 * Appends these into the row
 * Then added a class to both so these can be used to send emails later
 * Appends these to the body in table
 */
function createRow(data_word_number) {
    let tbody = document.getElementById('tbody')
    let row = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    td1.classList.add('overlay-color');
    td2.classList.add('word-count');

    let data1 = document.createTextNode(overlay.dataset.colorName)
    let data2 = document.createTextNode(data_word_number)
    
    td1.appendChild(data1);
    td2.appendChild(data2);
    row.appendChild(td1);
    row.appendChild(td2);

    tbody.appendChild(row);
}

/** This calculates whether the user has a change in reading % 
 * It takes the scores to work out the difference 
 * Then logs the results for the user */
function calculator() {
    let topScore = parseInt(document.getElementById("top-score").value);
    let baseline = parseInt(document.getElementById("baseline").value);    
    let speedincrease = document.getElementById("percentage-result");
    speedincrease.innerHTML = "";

    let increase = (topScore - baseline);
    increase = increase/baseline;
    percentage = increase * 100;  
    percentage =  Math.round(percentage)
    console.log(percentage)
    
    if (isNaN(percentage)){
        speedincrease.innerHTML = "No results entered please enter numbers into both boxes"
    } else {
    speedincrease.innerHTML = "Your wordspeed changed by " + percentage + "%"
    }
}
