console.log("connected");


// var url = "http://colormind.io/api/";
// var data = {
// 	model : "ui",
// 	input : [[44,43,44],"N","N","N","N","N","N"]
// }

// var http = new XMLHttpRequest();

// http.onreadystatechange = function() {
// 	if(http.readyState == 4 && http.status == 200) {
// 		var palette = JSON.parse(http.responseText).result;
// 	}
// }

// http.open("POST", url, true);
// http.send(JSON.stringify(data));
// console.log(data);

const heroku = "https://cors-anywhere.herokuapp.com/";
const palett = "http://palett.es/API/v1/palette/from/fabada";
const palettMonochrome = "http://palett.es/API/v1/palette/monochrome/between/0.3/0.7"
const colorApi = "http://thecolorapi.com/scheme?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html&mode=analogic&count=6"
const pokemon ="https://pokeapi.co/api/v2/berry/cheri/";
const quotes ="https://programming-quotes-api.herokuapp.com/quotes/lang/en";
fetch(quotes, {})
	.then ( (response) => {
		console.log(response);
		return response.json(); 
})
.then ((data) => {
	console.log(data);
});