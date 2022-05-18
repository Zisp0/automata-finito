from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def verificarPy(request):
    expresion = request.POST.get('cadena', '')
    if(expresion != ""):
        tabla = [["E", '1'], ["2", "3"], ["5", "E"], ["4", "E"], ["5", "7"], ["2", "6"], ["2", "6"], ["8", "E"], ["E", "7"]]
        estado = 0
        completado = True
        mensaje = ""

        for i in expresion:
            if(i == "a"):
                if(tabla[estado][0] == "E"):
                    mensaje = "La palabra no es válida"
                    completado = False
                    break
                else:
                    estado = int(tabla[estado][0])
            elif(i == "b"):
                if(tabla[estado][1] == "E"):
                    mensaje = "La palabra no es válida"
                    completado = False
                    break
                else:
                    estado = int(tabla[estado][1])
            else:
                mensaje = "El caracter %s no hace parte del abecedario del automata" %i
                completado = False
                break

        if (estado > 0 and estado < 9 and estado != 2 and estado != 7 and completado):
            mensaje = "La palabra es válida"
        elif(completado):
            mensaje = "La palabra no es válida"

        return render(request, "AutomataApp/indexpy.html", {"mensaje": mensaje, "expresion": expresion})
    else:
        return render(request, "AutomataApp/indexpy.html", {"mensaje": "", "expresion": expresion})

def principal(request):
    return render(request, "AutomataApp/index.html")