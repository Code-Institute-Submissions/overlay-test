

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