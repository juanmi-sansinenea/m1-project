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
    handleEmailInput = (event) => {
        const emailInput = event.target;
        const email = emailInput.value;
        validator.validateValidEmail(email);
        validator.validateUniqueEmail(email);
        this.setErrorMessages();    
    };
    // handle the password input
    handlePasswordInput = (event) => {
        const passwordInput = event.target;
        const repeatPasswordInput = this.repeatPasswordInput;
        const password = passwordInput.value;
        const repeatPassword = repeatPasswordInput.value;
        validator.validatePassword(password);
        validator.validateRepeatPassword(password, repeatPassword);
        this.setErrorMessages();
    };
    // handle the repeat-password input
    handleRepeatPasswordInput = (event) => {
        const passwordInput = event.target;
        const repeatPasswordInput = this.repeatPasswordInput;
        const password = passwordInput.value;
        const repeatPassword = repeatPasswordInput.value;
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
        signup.emailLabel.textContent = validator.errors.invalidEmailError;
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
        this.emailInput.addEventListener("input", this.handleEmailInput);
        this.passwordInput.addEventListener("input", this.handlePasswordInput);
        this.repeatPasswordInput.addEventListener("input", this.handleRepeatPasswordInput);
        this.buttonInput.addEventListener("click", this.saveData);
    }
}




const signup = new Signup();

// Add event listeners once the page and all the resources are loaded
window.addEventListener('load', signup.addListeners )

