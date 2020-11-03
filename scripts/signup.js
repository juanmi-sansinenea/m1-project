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
        const email = signup.emailInput.value;
        validator.validateValidEmail(email);
        validator.validateUniqueEmail(email);
        signup.emailLabel.textContent = validator.errors.invalidEmailError + validator.errors.emailExistsError; 
        console.log(validator.errors);
        
    };
    // handle the password input
    handlePasswordInput = (event) => {
        const passwordInput = event.target;
        const repeatPasswordInput = signup.repeatPasswordInput;
        const password = signup.passwordInput.value;
        const repeatPassword = signup.repeatPasswordInput.value;
        validator.validatePassword(password);
        validator.validateRepeatPassword(password, repeatPassword);
        signup.passwordLabel.textContent = validator.errors.passwordError;
        console.log(validator.errors);
       
    };
    // handle the repeat-password input
    handleRepeatPasswordInput = (event) => {
        const passwordInput = event.target;
        const repeatPasswordInput = signup.repeatPasswordInput;
        const password = signup.passwordInput.value;
        const repeatPassword = signup.repeatPasswordInput.value;
        validator.validatePassword(password);
        validator.validateRepeatPassword(password, repeatPassword);
        signup.repeatPasswordLabel.textContent = validator.errors.repeatPasswordError;
        console.log(validator.errors);
    };
    // used to show messages below the Signup form ----!!!!!!!CHANGE TO LABEL
    setErrorMessageEmail = (event) => {
        const errorsObj = validator.getErrors();
        const errorStringsArr = Object.values( errorsObj );
        console.log(errorStringsArr);
        signup.emailLabel.textContent = validator.errors.invalidEmailError;
        signup.passwordLabel.textContent = validator.errors.passwordError;
        signup.repeatPasswordLabel.textContent = validator.errors.repeatPasswordError;
    
    }

    // handle the sending of the data ( on submit )
    saveData = (event) => {

        // Prevent the default behaviour of the form submit button which reloads the page
        event.preventDefault();
        if (validator.errorsFlag0 === false && validator.errorsFlag1 === false && validator.errorsFlag2 === false && validator.errorsFlag3 === false){
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
            this.repeatPasswordInput.value = "";
            //
            this.nameLabel.textContent = "Name";
            this.emailLabel.textContent = "Email";
            this.passwordLabel.textContent = "Password";
            this.repeatPasswordLabel.textContent = "Repeat password";
        }
    };

    addListeners = () => {
        this.emailInput.addEventListener("blur", this.handleEmailInput);
        this.passwordInput.addEventListener("blur", this.handlePasswordInput);
        this.repeatPasswordInput.addEventListener("blur", this.handleRepeatPasswordInput);
        this.buttonInput.addEventListener("click", this.saveData);
        
    }
}




const signup = new Signup();

// Add event listeners once the page and all the resources are loaded
window.addEventListener('load', signup.addListeners )

