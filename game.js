var list = [];
var i = 0;
var N = getQueryStringValue('N');
var spy_index = Math.round(1+(N-1)*Math.random());
var word_index = null;
var played = [];

document.getElementById("nGiocatori").innerHTML = N;

async function newGame(){
    i = 0;
    spy_index = Math.round(1+(N-1)*Math.random());
    word_index = null;
    const response = await fetch('list.txt');
    const fileContent = await response.text();
    list = fileContent.split('\n').map(line => line.trim());
    if(list.length > played.length) {
        do {
            word_index = Math.round((list.length-1)*Math.random());
        } while (played.includes(word_index));
        played.push(word_index);
        document.getElementById("buttons").style.display = "flex";
        document.getElementById("newGameId").style.display = "none";
        document.getElementById("titleID").innerHTML = "Partita in corso...";
    } else {
        document.getElementById("newGameId").style.display = "none";
        document.getElementById("titleID").innerHTML = "Parole terminate, ricarica la pagina!";
    };
}

// Funzione per ottenere il valore di un parametro dalla query string
function getQueryStringValue(key) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

function show() {
    el = document.getElementById("input-text-ID");
    if (i+1 == spy_index){
        el.innerHTML = "Spia!";
    } else {
        el.innerHTML = list[word_index];
    }
    i = i+1;
    el.style.display = "block";
}

function hide() {
    el = document.getElementById("input-text-ID");
    el.style.display = "none";
    if (i == N){
        document.getElementById("titleID").innerHTML = "Tutti hanno il ruolo!";
        document.getElementById("buttons").style.display = "none";
        document.getElementById("newGameId").style.display = "flex";
    }
}