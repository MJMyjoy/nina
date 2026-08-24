from django.urls import path
from . import views

app_name = 'citations'

urlpatterns = [
    path('', views.home, name='home'),
    path('citation/<int:pk>/', views.citation_detail, name='detail'),
]
