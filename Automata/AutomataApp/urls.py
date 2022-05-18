from django.urls import path
from AutomataApp import views

urlpatterns = [
    path('conPy/', views.verificarPy, name="Con Python"),
    path('automata/', views.principal, name="Automata"),
]