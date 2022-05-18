var es = {
    "titulo": "Autómata finito.",
    "creditos": "Por: Faiber Hernández y César Torres",
    "campoVerificar": "Por favor ingrese aquí la palabra a validar...",
    "verificar": "Verificar",
    "velocidad": "Velocidad",
    "lenguaje": "Lenguaje",
    "inmediato": "Inmediato",
    "rapido": "Rápido",
    "lento": "Lento",
    "español": "Español",
    "ingles": "Inglés",
    "invalido": "La palabra no es válida.",
    "valido": "La palabra es válida.",
    "automataDice": "Automata dice:",
    "caracterNN": "El caracter '",
    "caracterNN2": "' no hace parte del abecedario del autómata",
    "noHayPalabra": "Por favor ingrese una palabra.",
    "leido": "Leido:"
};

var en = {
    "titulo": "Finite automata.",
    "creditos": "By: Faiber Hernández y César Torres",
    "campoVerificar": "Please enter here the word to validate...",
    "verificar": "Check",
    "velocidad": "Speed",
    "lenguaje": "Language",
    "inmediato": "Immediate",
    "rapido": "Fast",
    "lento": "Slow",
    "español": "Spanish",
    "ingles": "English",
    "invalido": "The word is invalid.",
    "valido": "The word is valid.",
    "automataDice": "Automata says:",
    "caracterNN": "The character '",
    "caracterNN2": "' is not part of the automaton's alphabet",
    "noHayPalabra": "Please enter a word.",
    "leido": "Read:"
};

$(function () {
    $("#language").change(function (e) { 
        cambiarIdioma($("#language").val())
    });
});

function cambiarIdioma(lang) {
    //cambiando idioma, español = 1, ingles = 2
    let lg
    if(lang == 1){
        lg = es
    }else{
        lg = en
    }

    $(".titulo").text(lg.titulo)
    $(".creditos").text(lg.creditos)
    $("#expresion").attr("placeholder", lg.campoVerificar)
    $("#btnVerificar").text(lg.verificar)
    $("#instant").text(lg.inmediato)
    $("#rapid").text(lg.rapido)
    $("#slow").text(lg.lento)
    $("#velocidad").text(lg.velocidad);
    $("#lenguaje").text(lg.lenguaje);
    $("#ES").text(lg.español);
    $("#EN").text(lg.ingles);
    $("#leido").text(lg.leido);
    valido = lg.valido
    invalido = lg.invalido
    automataDice = lg.automataDice
    caracterNoReconocido = lg.caracterNN
    caracterNoReconocido2 = lg.caracterNN2
    noHayTexto = lg.noHayPalabra
}