from django.contrib import admin  
from .models import Customer 
from .models import Order
from .models import Products
from .models import Category
  
# Register your models here.  
admin.site.register(Customer)  
admin.site.register(Order)  
admin.site.register(Products) 
admin.site.register(Category) 
