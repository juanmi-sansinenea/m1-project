"use strict";

class User {
    constructor(name, email, password) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
}
class Signup {
    constructor() {
      // store all of the input elements
      this.nameInput = document.querySelector("#name");
      this.emailInput = document.querySelector("#email");
      this.passwordInput = document.querySelector("#password");
      this.repeatPasswordInput = document.querySelector("#repeat-password");
      //
      this.nameLabel = document.querySelector("#name-label");
      this.emailLabel = document.querySelector("#email-label");
      this.passwordLabel = document.querySelector("#password-label");
      this.repeatPasswordLabel = document.querySelector("#repeat-password-label");
      //
      this.buttonInput = document.querySelector("#signup-button");
    }
    // handle the email input
    handleEmailInput = () => {
        //const emailInput = event.target;
        const email = signup.emailInput.value;
        validator.validateValidEmail(email);
        validator.validateUniqueEmail(email);
        //this.setErrorMessages();  
        this.handlePasswordInput(); 
    };
    // handle the password input
    handlePasswordInput = () => {
        //const passwordInput = event.target;
        const repeatPasswordInput = signup.repeatPasswordInput;
        const password = signup.passwordInput.value;
        const repeatPassword = signup.repeatPasswordInput.value;
        validator.validatePassword(password);
        validator.validateRepeatPassword(password, repeatPassword);
        //this.setErrorMessages();
        this.handleRepeatPasswordInput();
    };
    // handle the repeat-password input
    handleRepeatPasswordInput = () => {
        //const passwordInput = event.target;
        const repeatPasswordInput = signup.repeatPasswordInput;
        const password = signup.passwordInput.value;
        const repeatPassword = signup.repeatPasswordInput.value;
        validator.validatePassword(password);
        validator.validateRepeatPassword(password, repeatPassword);
        this.setErrorMessages();
    };
    // used to show messages below the Signup form ----!!!!!!!CHANGE TO LABEL
    setErrorMessages = () => {
        // Clear previous messages, so that they don't add up
        //this.errorsWrapper.innerHTML = "";
        const errorsObj = validator.getErrors();
        // returns an array of objects values (only error strings)
        const errorStringsArr = Object.values( errorsObj );
        console.log(errorStringsArr);
        if (type === "email") {
            signup.emailLabel.textContent = validator.errors.invalidEmailError;
        }
        //if (type === "password"){
            signup.passwordLabel.textContent = validator.errors.passwordError;
        //}
        //if (type === "repeat"){
            signup.repeatPasswordLabel.textContent = validator.errors.repeatPasswordError;
        //}   


        
        /*errorStringsArr.forEach( (str) => {
        const p = document.createElement('p');
        p.textContent = str;
        this.errorsWrapper.appendChild(p);
        })*/
    }

    // handle the sending of the data ( on submit )
    saveData = (event) => {
        // Prevent the default behaviour of the form submit button which reloads the page
        event.preventDefault();

        // get the value from all of the inputs
        const name = this.nameInput.value;
        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        // create the new user
        const newUser = new User(name, email, password);

        // Save the user in the database
        db.saveNewUser(newUser);

        // empty the form
        this.nameInput.value = "";
        this.emailInput.value = "";
        this.passwordInput.value = "";
    };

    addListeners = () => {
        /*this.emailInput.addEventListener("input", this.handleEmailInput);
        this.passwordInput.addEventListener("input", this.handlePasswordInput);
        this.repeatPasswordInput.addEventListener("input", this.handleRepeatPasswordInput);
        this.buttonInput.addEventListener("click", this.saveData);*/
        this.buttonInput.addEventListener("click", this.handleEmailInput);
        
    }
}




const signup = new Signup();

// Add event listeners once the page and all the resources are loaded
window.addEventListener('load', signup.addListeners )

