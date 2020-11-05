"use strict";

const quotes = "https://programming-quotes-api.herokuapp.com/quotes/lang/en";
fetch(quotes, {})
.then((response) => {
    return response.json();
})
.then((data) => {
    const quote = new Quote (data, 0, false);
    quote.filterArrByRate();
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
    this.navColor = document.querySelector(".nav-color");
    this.colorCounter = 0; // REF 1/3
    //
    this.progress = document.querySelector(".progress-bar-off");
    this.slideinAnimation = document.querySelector(".slidein-animation-off");
    //
    this.rateFilter = parseInt(window.location.search.charAt(6));
    this.filterBtn = document.querySelector(".filter-btn");
    this.overlayContainer = document.querySelector(".overlay-container");
    this.radio = document.querySelector("radio");
    
  }
  filterArrByRate = (()=>{

    // if (!this.rateFilter || this.rateFilter===undefined){
    //   this.rateFilter = 5;
    // }
    if (this.rateFilter === 5){
      this.quotesArr = this.quotesArr.filter((el)=>{
        if (Math.floor(el.rating) === 5){
          return true;
        } else {
          return false;
        }
      });
    } else if (this.rateFilter === 4){
      this.quotesArr = this.quotesArr.filter((el)=>{
        if (Math.floor(el.rating) === 4){
          return true;
        } else {
          return false;
        }
      });
    } else if (this.rateFilter === 3){
      this.quotesArr = this.quotesArr.filter((el)=>{
        if (Math.floor(el.rating) === 3){
          return true;
        } else {
          return false;
        }
      });
      console.log(this.quotesArr.length);
    } else if (this.rateFilter === 2){
      this.quotesArr = this.quotesArr.filter((el)=>{
        if (Math.floor(el.rating) === 2){
          return true;
        } else {
          return false;
        }
      });
    } else if (this.rateFilter === 1){
      this.quotesArr = this.quotesArr.filter((el)=>{
        if (Math.floor(el.rating) === 1){
          return true;
        } else {
          return false;
        }
      });
    }
    console.log(this.quotesArr.length)
  });
  initSlideIn(){
    this.slideinAnimation.className = "slidein-animation-on";
    this.intervalId2 = setInterval (this.clearSlideIn, 1000);
  }
  clearSlideIn = (()=>{
    this.slideinAnimation.className = "slidein-animation-off"
    clearInterval(this.intervalId2);
  })
  initProgress(){
    this.progress.className = "progress-bar-on like-btns-color"+this.colorCounter;;
  }
  clearProgress(){
    this.progress.className = "progress-bar-off";
  }
  changeColorScheme = (()=>{
    const rand = Math.floor(9*Math.random());
    //this.general.className = "general"+rand; // REF-MakeRandom
    //this.navColor.className = "nav-color"+rand; //REF-MakeRandom
    // REF-MakeRandom: remember!! change this.colorCounter by rand in the ifs below
    this.general.className = "general"+this.colorCounter; // REFF
    this.navColor.className = "bottom-nav nav-color"+this.colorCounter; //REF-MakeRandom NOT
    if (this.isPlaying === false){ 
      //when stopped start again (button to say stop)
      this.playStop.innerHTML = `<svg class="btns-color${this.colorCounter}"><path class="st0" d="M60,30C60,13.5,46.7,0.1,30.2,0C13.8,0.1,0.5,13.5,0.5,30s13.3,29.9,29.8,30C46.7,59.9,60,46.5,60,30z M38.5,38H38H22.5H22V22h0.5H38h0.5V38z"/></svg>`;
      this.progress.className = "progress-bar-off like-btns-color"+this.colorCounter;
    } else {
      //when playing then stop (button to say play)
      this.playStop.innerHTML = `<svg class="btns-color${this.colorCounter}"><path d="M30,0C13.4,0,0,13.4,0,30s13.4,30,30,30s30-13.4,30-30S46.6,0,30,0zM22.2,40.3V18.7L41,29.5L22.2,40.3z"/>`;
      this.progress.className = "progress-bar-on like-btns-color"+this.colorCounter;
    }
    this.backBtn.innerHTML = `<svg class="back-btn btns-color${this.colorCounter}"><path d="M30,0C13.4,0,0,13.4,0,30s13.4,30,30,30s30-13.4,30-30S46.6,0,30,0z M44,31l-25-0.5l4.6,4.7c0.4,0.4,0.4,1,0,1.4 c0,0,0,0,0,0c-0.4,0.4-1,0.4-1.4,0l-6.2-6.5c0,0,0,0,0,0c-0.4-0.4-0.4-1,0-1.4l6.5-6.2c0.4-0.4,1-0.4,1.4,0c0,0,0,0,0,0 c0.4,0.4,0.4,1,0,1.4L19,28.5L44,29V31z"/></svg>`;
    this.nextBtn.innerHTML = `<svg class="next-btn btns-color${this.colorCounter}"><path d="M30,0C13.4,0,0,13.4,0,30s13.4,30,30,30s30-13.4,30-30S46.6,0,30,0z M44.1,31.3l-6.5,6.2c-0.4,0.4-1,0.4-1.4,0c0,0,0,0,0,0 c-0.4-0.4-0.4-1,0-1.4l4.7-4.6L16,31v-2l25,0.5l-4.5-4.7c-0.4-0.4-0.4-1,0-1.4c0,0,0,0,0,0c0.4-0.4,1-0.4,1.4,0l6.2,6.5 c0,0,0,0,0,0C44.5,30.2,44.5,30.9,44.1,31.3z"/></svg>`;
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
    this.quoteSpace.class
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
      //this.playStop.innerHTML = `<img  src="images/stop-btn.svg" alt="stop">`; //REF-same with img
      this.playStop.innerHTML = `<svg class="btns-color${this.colorCounter}"><path class="st0" d="M60,30C60,13.5,46.7,0.1,30.2,0C13.8,0.1,0.5,13.5,0.5,30s13.3,29.9,29.8,30C46.7,59.9,60,46.5,60,30z M38.5,38H38H22.5H22V22h0.5H38h0.5V38z"/></svg>`;
      this.ctrls.style.visibility = "hidden";
      this.intervalId = setInterval (this.nextRecord, 3000);
      this.initProgress();

    } else {
      //when playing then stop (button to say play)
      this.isPlaying = false;
      //this.playStop.innerHTML = `<img  src="images/play-btn.svg" alt="play">`; //REF-same with img
      this.playStop.innerHTML = `<svg class="btns-color${this.colorCounter}"><path d="M30,0C13.4,0,0,13.4,0,30s13.4,30,30,30s30-13.4,30-30S46.6,0,30,0zM22.2,40.3V18.7L41,29.5L22.2,40.3z"/>`;
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
    this.colorCounter++ // REF 2/3
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
    this.colorCounter--; // REF 3/3
    this.printCurrentQuote();
    this.printCurrentAuthor();
    this.printCurrentRating();
    this.changeColorScheme();
    this.initSlideIn();
  });
  openOverlay =(()=>{
    document.body.innerHTML = `
<div class = "overlay">
    <nav>
        <div class = "top-nav">
            <a href="about.html"><img id="logo" src="images/pg-logo.svg" style="display: none;"></a>
            <a href="index.html" ><img id="burger" src = "images/x-cls.svg"></a>
        </div>
    </nav>
    <div class="manifesto-container">
        <form action="" method="get">
            <div>
                <input type="radio" id="5hearts" name="rate" value="5" checked>
                <label for="rate-filter">♥♥♥♥♥</label>
            </div>

            <div>
                <input type="radio" id="4hearts" name="rate" value="4">
                <label for="rate-filter">♥♥♥♥</label>
            </div>

            <div>
                <input type="radio" id="3hearts" name="rate" value="3">
                <label for="rate-filter">♥♥♥</label>
            </div>

            <div>
                <input type="radio" id="2hearts" name="rate" value="2">
                <label for="rate-filter">♥♥</label>
            </div>

            <div>
                <input type="radio" id="1hearts" name="rate" value="1">
                <label for="rate-filter">♥</label>
            </div>
            <br>
            <div>Filter</div>
            <input id="filter-submit" type="submit" value="Filter">
        </form>
    </div>
</div>`;




  });

  addListeners = (()=>{
    this.playStop.addEventListener("click", this.togglePlay);
    this.backBtn.addEventListener("click", this.prevRecord);
    this.nextBtn.addEventListener("click", this.nextRecord);
    this.filterBtn.addEventListener("click", this.openOverlay);
  });
}


