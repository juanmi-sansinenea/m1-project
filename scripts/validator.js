"use strict";

// Validation
// manage the errors to be shown to the user

// email:
// email syntax (@ , .com)
// call to db to check if email is available

// password:
// the length of the password
// if the password and repeat-password are matching


class Validator {
    constructor() {
      // predetermined error messages
      this.invalidEmailError = "Enter a valid email address";
      this.emailExistsError = "This email address is already taken";
      this.passwordError = "Password must be at least 6 chars";
      this.repeatPasswordError = "Password and reapeat password must match!";
      //this.errorsArr = [];
  
      
      // object with all the current errors that are shown to the user
      this.errors = {
        invalidEmailError: this.invalidEmailError,
        emailExistsError: this.emailExistsError,
        passwordError: this.passwordError,
        repeatPasswordError: this.repeatPasswordError,
      };
    }
  
  
  
    // validate if email syntax is valid
    validateValidEmail = (email) => {
      if (this.emailSyntaxIsValid(email)) {
        // don't show the email error message - remove it from the errors to show
        //delete this.errors.invalidEmailError;
        this.errors.invalidEmailError = "Email";
        this.errorsFlag0 = false;
      } else {
        // if the email is not valid, set the error that will be shown
        this.errors.invalidEmailError = this.invalidEmailError;
        this.errorsFlag0 = true;
      }
    };
  
  
    // helper function for `validateValidEmail`
    emailSyntaxIsValid = (email) => {
      // RegEx object - it contains the regex pattern used to test if email is valid
      const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      const emailIsValid = emailRegEx.test(email);
      return emailIsValid;
    };
  
  
    // validate if email is taken
    validateUniqueEmail = (newEmail) => {
      const users = db.getAllUsers(); //
      let emailUnique = true;
      users.forEach((userObj) => {
        if (userObj.email === newEmail) {
          // Check email of each user
          emailUnique = false; // set emailUnique to `false` if email is already taken
        }
      });
  
      // if email is unique (if it is not taken) - remove the error message
      if (emailUnique) {
        //delete this.errors.emailExistsError;
        this.errors.emailExistsError = "Email";
        this.errorsFlag1 = false;
      } else {
        // if the email is taken, set the error to be shown
        this.errors.emailExistsError = this.emailExistsError;
        this.errorsFlag1 = true;
      }
    };
  
    //validate the password length
    validatePassword = (password) => {
      if (password.length >= 6) {
        // remove the error message
        //delete this.errors.passwordError;
        this.errors.passwordError = "Password";
        this.errorsFlag2 = false;
      } else {
        // if password has less than 6 characters, set the error to be shown
        this.errors.passwordError = this.passwordError;
        this.errorsFlag2 = true;
      }
    };
  
  
    // validate if password and repeat-password are matching
    validateRepeatPassword = (password, repeatPassword) => {
      if (password === repeatPassword) {
        // remove the error message
        //delete this.errors.repeatPasswordError;
        this.errors.repeatPasswordError = "Repeat password";
        this.errorsFlag3 = false;
      } else {
        // if passwords are not matching, set the error to be shown
        this.errors.repeatPasswordError = this.repeatPasswordError;
        this.errorsFlag3 = true;
      }
    };
  
    // get the errors to show them to the user on the Signup page
    getErrors = () => {
      return this.errors;
    };
  }
  
  const validator = new Validator();