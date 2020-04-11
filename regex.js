
// validate email address function
const validateEmail = (email) => {
    
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const sortEmails = () => {

    // read file
    var fs = require("fs");
    var emailsArray = fs.readFileSync('emails.txt').toString().split("\r\n");
    let sortedEmails = {};
    
    emailsArray.reduce((accumulator, currentEmail) => {

        // check if email is valid
        const validator = validateEmail(currentEmail);

        // find indexes for slice method
        const atIndex = currentEmail.indexOf('@');
        const lastIndex = currentEmail.length;

        // if email is legit add to object with domain key
        if(validator) {

            // separate domain from email
            domain = currentEmail.slice(atIndex + 1 , lastIndex);

            // If email is valid add to object
            if(sortedEmails[domain]) {
                sortedEmails[domain] =  sortedEmails[domain] + 1;
            } 
            else {
                sortedEmails[domain] = 1;
            }

            // if its not a valid add in object with key invalid
        } else {

            if(sortedEmails['invalid']) {
                sortedEmails['invalid'] =  sortedEmails['invalid'] + 1;
            } 
            else {
                sortedEmails['invalid'] = 1;
            }
        }

   }, {});

   // return sorted array
   return sortedEmails;

}

const result = sortEmails();
console.log(result);



