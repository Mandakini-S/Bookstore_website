from django.db import models  
import datetime 
from account.models import UserData
from django.utils.translation import gettext_lazy as _

def upload_to(instance,filename):
    return 'products/{filename}'.format(filename=filename)
 

class Category(models.Model): 
    name = models.CharField(max_length=50) 
  
    @staticmethod
    def get_all_categories(): 
        return Category.objects.all() 
  
    def __str__(self): 
        return self.name 

class Customer(models.Model):  
    first_name = models.CharField(max_length=200)  
    last_name = models.CharField(max_length=200)  
    address = models.CharField(max_length=200)   
    mobile = models.CharField(max_length=10)  
  
    def __str__(self):  
        return self.first_name + " " + self.last_name  

class Products(models.Model): 
    name = models.CharField(max_length=60) 
    price = models.IntegerField(default=0) 
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1) 
    description = models.CharField( 
        max_length=250, default='', blank=True, null=True) 
    image = models.ImageField(_("Image"),upload_to=upload_to, default='products/default.jpg') 
  
    @staticmethod
    def get_products_by_id(ids): 
        return Products.objects.filter(id__in=ids) 
  
    @staticmethod
    def get_all_products(): 
        return Products.objects.all() 
  
    @staticmethod
    def get_all_products_by_categoryid(category_id): 
        if category_id: 
            return Products.objects.filter(category=category_id) 
        else: 
            return Products.get_all_products() 
        
class Order(models.Model): 
    product = models.ForeignKey(Products, 
                                on_delete=models.CASCADE) 
    customer = models.ForeignKey(Customer, 
                                 on_delete=models.CASCADE) 
    quantity = models.IntegerField(default=1) 
    price = models.IntegerField() 
    address = models.CharField(max_length=50, default='', blank=True) 
    phone = models.CharField(max_length=50, default='', blank=True) 
    date = models.DateField(default=datetime.datetime.today) 
    status = models.BooleanField(default=False) 
  
    def placeOrder(self): 
        self.save() 
  
    @staticmethod
    def get_orders_by_customer(customer_id): 
        return Order.objects.filter(customer=customer_id).order_by('-date') 
    
class CartItem(models.Model):
    user = models.ForeignKey(UserData, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='cart_items')
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.quantity} of {self.product.name} by {self.user.email}'