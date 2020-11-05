"use strict";

const quotes = "https://programming-quotes-api.herokuapp.com/quotes/lang/en";
fetch(quotes)
.then((response) => {
  return response.json();
})
.then((data) => {
  const authors = new Authors (data);
  authors.printListAZ();
  authors.addListeners();
})
.catch ((error) => {
  console.log ("API loading error.", error);
});

class Authors {
  constructor(quotesArr){
    this.quotesArr = quotesArr;
    this.authorsArr = this.quotesArr.map ((el)=>{
        const author = el.author;
        return author;
    });
    this.uniqueAuthorsArr = [];
    this.authorsArr.forEach((word)=>{
      if (!this.uniqueAuthorsArr.includes(word)){
        this.uniqueAuthorsArr.push(word);
      }else if (this.uniqueAuthorsArr.includes(word)){
        this.repeatedStringsIndex = this.uniqueAuthorsArr.indexOf(word);
        this.uniqueAuthorsArr.splice(this.repeatedStringsIndex, 1);
      }
    });
    this.here = document.querySelector(".authors-container");
    this.topNav = document.querySelector(".top-nav");
    this.sortAZ = document.querySelector(".sort-az");
    this.sortZA = document.querySelector(".sort-za");
  }
  printListAZ = (()=>{
      this.uniqueAuthorsArr.sort().forEach ((el)=>{
      this.row = document.createElement ("div");
      this.row.textContent = el;
      this.row.className = "author";
      this.here.appendChild(this.row);
    }); 
  });
  printListZA = (()=>{
      this.uniqueAuthorsArr.sort().reverse().forEach ((el)=>{
      this.row = document.createElement ("div");
      this.row.textContent = el;
      this.row.className = "author";
      this.here.appendChild(this.row);
    });
  });
  clearAndPrintAZ = (()=>{
    this.here.innerHTML = "";
    this.printListAZ();
  })
  clearAndPrintZA = (()=>{
    this.here.innerHTML = "";
    this.printListZA();
  })

  addListeners = (()=>{
    this.sortAZ.addEventListener("click", this.clearAndPrintAZ);
    this.sortZA.addEventListener("click", this.clearAndPrintZA);
  });
}
  
