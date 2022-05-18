$(function () {
    $("#btnVerificar").click(function (e) { 
        verificarPalabra($("#expresion").val())
    });

    $("#expresion").focus(function (e) { 
        $("#expresion").keyup(function (e) { 
            if(e.key == "Enter"){
                verificarPalabra($("#expresion").val())
            }
        });
        
    });
});

var valido = "La palabra es válida"
var invalido = "La palabra no es válida"
var tabla = [["E", '1'], ["2", "3"], ["5", "E"], ["4", "E"], ["5", "7"], ["2", "6"], ["2", "6"], ["8", "E"], ["E", "7"]]
var inc = 1000
let time

function verificarPalabra(expresion){
    time = 0
    let estado = 0
    let completado = true
    let actual
    iluminar(-1, 0)
    for(let element of expresion){
        actual = estado
        if(element == "a"){
            if(tabla[estado][0] == "E"){
                Swal.fire({
                    title: "Automata dice:",
                    text: invalido,
                    icon: 'error'
                })
                completado = false
                break
            }else{
                estado = parseInt(tabla[estado][0], 10)
                iluminar(actual, estado)
            }
        }else if(element == "b"){
            if(tabla[estado][1] == "E"){
                Swal.fire({
                    title: "Automata dice:",
                    text: invalido,
                    icon: 'error'
                })
                completado = false
                break  
            }else{
                estado = parseInt(tabla[estado][1])
                iluminar(actual, estado)
            }
        }else{
            Swal.fire({
                title: "Automata dice:",
                text: "El caracter '"+element+"' no hace parte del abecedario del automata",
                icon: 'warning'
            })
            completado = False
            break
        }
    }
    
    if (estado > 0 && estado < 9 && estado != 2 && estado != 7 && completado){
        setTimeout(function(){
            Swal.fire({
                title: "Automata dice:",
                text: valido,
                icon: 'success'
            })
        }, time);
    }else if(completado){
        setTimeout(function(){
            Swal.fire({
                title: "Automata dice:",
                text: invalido,
                icon: 'error'
            })
        }, time);
    }
}

function deselect() {
    $('.form-select').attr("disabled", true);
    $('.form-select').attr("disabled", false);
}

function iluminar(actual, estado){
    console.log(time)
    setTimeout(function(){
        colorEnlace(actual, estado, inc)
    }, time);
    time += inc
    setTimeout(function(){
        colorNodo(estado, inc)  
    }, time);
    time += inc
}