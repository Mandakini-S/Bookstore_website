# sample_app/urls.py
from django.urls import path
from .views import CustomerView
from .views import ProductView
from .views import OrderView
from .views import CategoryView, CartItemView


urlpatterns = [
    path('customer/', CustomerView.as_view(), name='customer-list'),
    path('customer/<int:id>/', CustomerView.as_view()),
    path('customer/<int:id>/update/ ', CustomerView.as_view()),
    path('products/', ProductView.as_view()),
    path('products/<int:id>/', ProductView.as_view()),
    path('products/<int:id>/update/', ProductView.as_view()),
    path('orders/', OrderView.as_view()),
    path('orders/<int:id>/', OrderView.as_view()),
    path('orders/<int:id>/update/', OrderView.as_view()),
    path('categories/', CategoryView.as_view()),
    path('categories/<int:id>/', CategoryView.as_view()),
    path('categories/<int:id>/update', CategoryView.as_view()),
    path('cartitem/<int:id>/', CartItemView.as_view(), name='cartitem-detail'),
    path('cartitem/', CartItemView.as_view(), name='cartitem-list'),
]

