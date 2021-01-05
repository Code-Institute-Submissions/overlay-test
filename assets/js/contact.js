/**This function is called when the user submits the email my results form
 * WordCount and OverlayColour are returned as arrays
 * The resultsStr is genereated using a loop to iterate through the array
 * The for loop builds a string and update the resultStr
 * The user gets all the results emailed to them instead of one at a time
 * The resultStr is then set as a parameter for the email
 * email.send uses the service id and template id correspondonding to emailJS
 * name and email parameters are called from the form
 * The email is sent to the user using emailsJS 
 * Then the user recieves an alert to say it has been sent.   
 */

function sendMail(resultsForm) {
    let wordCount = document.getElementsByClassName('word-count');
    let overlayColour= document.getElementsByClassName("overlay-color");
    let resultStr = " ";
    
    for(let i = 0; i < wordCount.length; i++) {
        let str1 = wordCount[i].innerHTML;
        let str2 = overlayColour[i].innerHTML;
        let wordStr = ("You read " + str1 + " with " + str2 + "! \n");  
        resultStr += wordStr;
    }
       
    emailjs.send("Project-Request","overlay", {
        "name": resultsForm.name.value,
        "email": resultsForm.email.value,
        "results" : resultStr        
    })
    .then 
    alert ("Email Sent")
    return false;    
};