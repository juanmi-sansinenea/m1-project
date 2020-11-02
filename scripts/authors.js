"use strict";




const quotes = "https://programming-quotes-api.herokuapp.com/quotes/lang/en";
fetch(quotes)
.then((response) => {
  console.log(response);
    return response.json();
})
.then((data) => {
  const quotesArr = data;
  // Get authors array
  const authorsArr = quotesArr.map ((el)=>{
    const author = el.author;
    return author;
  });
  // Get unique authors array
  const authorsUniquesArr = [];
  authorsArr.forEach((word)=>{
    if (!authorsUniquesArr.includes(word)){
      authorsUniquesArr.push(word)
    }else if (authorsUniquesArr.includes(word)){
      const repeatedStringsIndex = authorsUniquesArr.indexOf(word);
      authorsUniquesArr.splice(repeatedStringsIndex, 1)
    }
  });
  // Sort authors list alphabetically 
  authorsUniquesArr.sort ()
  console.log(authorsUniquesArr);
})
.catch ((error) => {
  console.log ("API loading error.", error);
});





