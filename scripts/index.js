"use strict";

const quotes = "https://programming-quotes-api.herokuapp.com/quotes/lang/en";
fetch(quotes, {})
.then((response) => {
    return response.json();
})
.then((data) => {
    const quote = new Quote (data, 0, false);
    quote.randomizeArr();
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
    this.authorSpace = document.querySelector(".author-sign");
    this.heartOn = document.querySelector(".heart-on");
    this.heartOff = document.querySelector(".heart-off");
    //
    this.playStop = document.querySelector(".play-stop-btn");
    this.backBtn = document.querySelector(".back-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.ctrls = document.querySelector(".ctrls-container");
    this.ctrls.style.visibility = "hidden";
    //
    this.general = document.querySelector(".general");
    //this.colorCounter = 0;
    //
    this.progress = document.querySelector(".progress-bar-off");
    this.slideinAnimation = document.querySelector(".slidein-animation-off");
  }
  initSlideIn(){
    this.slideinAnimation.className = "slidein-animation-on";
    this.intervalId2 = setInterval (this.clearSlideIn, 1000);
  }
  clearSlideIn = (()=>{
    this.slideinAnimation.className = "slidein-animation-off"
    clearInterval(this.intervalId2);
  })
  initProgress(){
    this.progress.className = "progress-bar-on";
  }
  clearProgress(){
    this.progress.className = "progress-bar-off";
  }
  changeColorScheme = (()=>{
    const rand = Math.floor(10*Math.random());
    this.general.className = "general"+rand;
    //this.general.className = "general"+this.colorCounter;
  });

  randomizeArr = (()=>{
    let currentIndex = this.quotesArr.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = this.quotesArr[currentIndex];
      this.quotesArr[currentIndex] = this.quotesArr[randomIndex];
      this.quotesArr[randomIndex] = temporaryValue;
    }
    return this.quotesArr;
  });
  printCurrentQuote = (()=>{
    this.quoteSpace.textContent = `“${this.quotesArr[this.currentRecord].en}”`;
  });
  printCurrentAuthor = (()=>{
    this.authorSpace.textContent = this.quotesArr[this.currentRecord].author;
  });
  printCurrentRating = (()=>{
    if (this.quotesArr[this.currentRecord].rating > 0){
      this.heartOn.textContent = "";
      this.heartOff.textContent = "♥♥♥♥♥";
    }
    if (this.quotesArr[this.currentRecord].rating > 1){
      this.heartOn.textContent = "♥";
      this.heartOff.textContent = "♥♥♥♥";
    }
    if (this.quotesArr[this.currentRecord].rating > 2){
      this.heartOn.textContent = "♥♥";
      this.heartOff.textContent = "♥♥♥";
    }
    if (this.quotesArr[this.currentRecord].rating > 3){
      this.heartOn.textContent = "♥♥♥";
      this.heartOff.textContent = "♥♥";
    }
    if (this.quotesArr[this.currentRecord].rating > 4){
      this.heartOn.textContent = "♥♥♥♥";
      this.heartOff.textContent = "♥";
    }
    if (this.quotesArr[this.currentRecord].rating === 5){
      this.heartOn.textContent = "♥♥♥♥♥";
      this.heartOff.textContent = "";
    }
  });
  togglePlay = (()=>{ 
    if (this.isPlaying === false){ 
      //when stopped start again (button to say stop)
      this.isPlaying = true;
      this.playStop.innerHTML = `<img  src="images/stop-btn.svg" alt="stop">`
      this.ctrls.style.visibility = "hidden";
      this.intervalId = setInterval (this.nextRecord, 3000);
      this.initProgress();

    } else {
      //when playing then stop (button to say play)
      this.isPlaying = false;
      this.playStop.innerHTML = `<img  src="images/play-btn.svg" alt="play">`
      this.ctrls.style.visibility = "visible";
      clearInterval(this.intervalId);
      this.clearProgress();
    }
  });
  nextRecord = (()=>{
    if (this.currentRecord < this.quotesArr.length-1){
      this.currentRecord +=1;
    }else if (this.currentRecord === this.quotesArr.length-1){
      this.currentRecord = 0;
    }
    //this.colorCounter++
    this.printCurrentQuote();
    this.printCurrentAuthor();
    this.printCurrentRating();
    this.changeColorScheme();
    this.initSlideIn();
  });
  prevRecord = (()=>{
    if (this.currentRecord > 0){
      this.currentRecord -=1;
    }else if (this.currentRecord === 0){
      this.currentRecord = this.quotesArr.length-1;
    }
    //this.colorCounter--;
    this.printCurrentQuote();
    this.printCurrentAuthor();
    this.printCurrentRating();
    this.changeColorScheme();
    this.initSlideIn();
  });
  addListeners = (()=>{
    this.playStop.addEventListener("click", this.togglePlay);
    this.backBtn.addEventListener("click", this.prevRecord);
    this.nextBtn.addEventListener("click", this.nextRecord);
  });
}


