"use strict";

const quotes = "https://programming-quotes-api.herokuapp.com/quotes/lang/en";
fetch(quotes, {})
.then((response) => {
    return response.json();
})
.then((data) => {
    const quote = new Quote (data, 0, false);
    quote.printCurrentQuote();
    quote.printCurrentAuthor();
    quote.printCurrentRating();
    quote.togglePlay();
    quote.addListeners();
    
})
.catch ((error) => {
  console.log ("API loading error.", error)
});
///////////////////////////////////////////////////////////////////////////
class Quote {
  constructor (quotesArr, currentRecord, isPlaying){
    this.quotesArr = quotesArr;
    this.currentRecord = currentRecord;
    this.isPlaying = isPlaying;
    //
    this.quoteSpace = document.querySelector(".quote");
    this.authorSpace = document.querySelector(".author");
    this.ratingSpace = document.querySelector(".heart-rating");
    //
    this.playStop = document.querySelector(".play-stop-btn");
    this.backBtn = document.querySelector(".back-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.ctrls = document.querySelector(".ctrls-container");
    this.ctrls.style.visibility = "hidden";
  }
  printCurrentQuote = (()=>{
    this.quoteSpace.textContent = this.quotesArr[this.currentRecord].en;
  });
  printCurrentAuthor = (()=>{
    console.log(this.quotesArr[this.currentRecord].author);
    this.authorSpace.textContent = this.quotesArr[this.currentRecord].author;
  });
  printCurrentRating = (()=>{
    console.log(this.quotesArr[this.currentRecord].rating);
  });
  togglePlay = (()=>{ 
    if (this.isPlaying === false){ 
      this.isPlaying = true;
      this.playStop.innerHTML = `<img  src="images/stop-btn.svg" alt="stop">`
      this.ctrls.style.visibility = "hidden";
      this.intervalId = setInterval (this.nextRecord, 2000);
    } else {
      this.isPlaying = false;
      this.playStop.innerHTML = `<img  src="images/play-btn.svg" alt="play">`
      this.ctrls.style.visibility = "visible";
      clearInterval(this.intervalId);
    }
  });
  nextRecord = (()=>{
    console.log("h")
    if (this.currentRecord < this.quotesArr.length-1){
      this.currentRecord +=1;
    }else if (this.currentRecord === this.quotesArr.length-1){
      this.currentRecord = 0;
    }
    this.printCurrentQuote();
    this.printCurrentAuthor();
    this.printCurrentRating();
  });
  prevRecord = (()=>{
    if (this.currentRecord > 0){
      this.currentRecord -=1;
    }else if (this.currentRecord === 0){
      this.currentRecord = this.quotesArr.length-1;
    }
    this.printCurrentQuote();
    this.printCurrentAuthor();
    this.printCurrentRating();
  });
  addListeners = (()=>{
    this.playStop.addEventListener("click", this.togglePlay);
    this.backBtn.addEventListener("click", this.prevRecord);
    this.nextBtn.addEventListener("click", this.nextRecord);
  });
}


