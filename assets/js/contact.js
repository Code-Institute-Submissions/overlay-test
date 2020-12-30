let resultStr = " ";

function sendMail(resultsForm) {
    let wordCount = document.getElementsByClassName('word-count');
    let overlayColour= document.getElementsByClassName("overlay-color");
    let wordStr = "";
    let str1 = "";
    let str2 = ""


    for(let i = 0; i < wordCount.length; i++) {
        str1 = wordCount[i].innerHTML;        
        for(let j = 0; j < overlayColour.length; j++) {
            str2 = overlayColour[j].innerHTML;   
            wordStr = ("You read " + str1 + " with " + str2 + "! \n")  
            resultStr += wordStr               
        }
        
            
         console.log(resultStr)
    }
       
    // emailjs.send("Project-Request","overlay", {
    //     "name": resultsForm.name.value,
    //     "email": resultsForm.email.value,
    //     "results" : resultStr
        
    // })
    // .then 
    // alert ("Email Sent")
    return false;
    
};