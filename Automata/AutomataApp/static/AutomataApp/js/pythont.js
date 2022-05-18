$(function () {
    $("#btnVerificar").click(function (e) { 
        if($("#expresion").val().trim() == ""){
            Swal.fire({
                title: automataDice,
                text: noHayTexto,
                icon: 'warning'
            })
            speak(noHayTexto)
        }else{
            verificarPalabra($("#expresion").val().replace(/\s+/g, ""))
            $("#expresion").val($("#expresion").val().replace(/\s+/g, ""))
        }
    });

    $("#expresion").focus(function (e) { 
        $("#expresion").keyup(function (e) { 
            if(e.key == "Enter"){
                if($("#expresion").val().trim() == ""){
                    Swal.fire({
                        title: automataDice,
                        text: noHayTexto,
                        icon: 'warning'
                    })
                    speak(noHayTexto)
                }else{
                    verificarPalabra($("#expresion").val().replace(/\s+/g, ""))
                    $("#expresion").val($("#expresion").val().replace(/\s+/g, ""))
                }
            }
        });   
    });

    $("#speed").change(function (e) { 
        cambiarVelocidad($("#speed").val())
    });

});

var valido = "La palabra es válida"
var invalido = "La palabra no es válida"
var automataDice = "Autómata dice:"
var caracterNoReconocido = "El caracter '"
var caracterNoReconocido2 = "' no hace parte del abecedario del autómata"
var noHayTexto = "Por favor ingrese una palabra."
var tabla = [["E", '1'], ["2", "3"], ["5", "E"], ["4", "E"], ["5", "7"], ["2", "6"], ["2", "6"], ["8", "E"], ["E", "7"]]
var inc = 0
let time

function verificarPalabra(expresion){
    $("#letras").empty()
    time = 0
    let estado = 0
    let completado = true
    let actual
    iluminar(-1, 0, "")
    for(let element of expresion){
        actual = estado
        if(element == "a"){
            if(tabla[estado][0] == "E"){
                Swal.fire({
                    title: automataDice,
                    text: invalido,
                    icon: 'error'
                })
                speak(invalido)
                completado = false
                break
            }else{
                estado = parseInt(tabla[estado][0], 10)
                iluminar(actual, estado, element)
            }
        }else if(element == "b"){
            if(tabla[estado][1] == "E"){
                Swal.fire({
                    title: automataDice,
                    text: invalido,
                    icon: 'error'
                })
                speak(invalido)
                completado = false
                break  
            }else{
                estado = parseInt(tabla[estado][1])
                iluminar(actual, estado, element)
            }
        }else{
            setTimeout(function(){
                Swal.fire({
                    title: automataDice,
                    text: caracterNoReconocido+element+caracterNoReconocido2,
                    icon: 'warning'
                })
                speak(caracterNoReconocido+element+caracterNoReconocido2)
            }, time);
            completado = false
            break
        }
    }
    
    if (estado > 0 && estado < 9 && estado != 2 && estado != 7 && completado){
        setTimeout(function(){
            Swal.fire({
                title: automataDice,
                text: valido,
                icon: 'success'
            })
            speak(valido)
        }, time);
    }else if(completado){
        setTimeout(function(){
            Swal.fire({
                title: automataDice,
                text: invalido,
                icon: 'error'
            })
            speak(invalido)
        }, time);
    }
}

function deselect() {
    $('.form-select').attr("disabled", true);
    $('.form-select').attr("disabled", false);
}

function iluminar(actual, estado, element){
    setTimeout(function(){
        $("#letras").append('<h3>'+element+'</h3>')
        colorEnlace(actual, estado, inc)
    }, time);
    time += inc
    setTimeout(function(){
        colorNodo(estado, inc)  
    }, time);
    time += inc
}

function cambiarVelocidad(velocidad){
    if(velocidad == 1){
        inc = 0
    }else if(velocidad == 2){
        inc = 300
    }else{
        inc = 1000
    }
}