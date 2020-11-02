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
  }
  printCurrentQuote = (()=>{
    this.quoteSpace.textContent = this.quotesArr[this.currentRecord].en;
  })
  printCurrentAuthor = (()=>{
    console.log(this.quotesArr[this.currentRecord].author);
    this.authorSpace.textContent = this.quotesArr[this.currentRecord].author;
  })
  printCurrentRating = (()=>{
    console.log(this.quotesArr[this.currentRecord].rating);
  })
  togglePlay = (()=>{ 
    if (this.isPlaying === false){
      this.isPlaying = true;
      this.intervalId = setInterval (this.nextRecord, 3000);
    } else {
      this.isPlaying = false;
      clearInterval(this.intervalId);
    }
  })
  nextRecord = (()=>{
    if (this.currentRecord < this.quotesArr.length){
      this.currentRecord +=1;
    }else if (this.currentRecord === this.quotesArr.length){
      this.currentRecord = 0;
    }
    
    this.printCurrentQuote();
    this.printCurrentAuthor();
    this.printCurrentRating();
  })
}



