const goBack = function (){
    console.log("baaack!");
    window.history.back();
}
const xClose = document.querySelector("#x-cls");
xClose.addEventListener("click", goBack);