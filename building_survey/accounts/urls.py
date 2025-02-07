
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.UserLoginView.as_view(), name='Login'),
    path('signup/', views.UserSignupView.as_view(), name='Signup'),
]
