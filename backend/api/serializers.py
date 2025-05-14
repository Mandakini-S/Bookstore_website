# api/serializers.py
from rest_framework import serializers  
from .models import Customer  
from .models import Order
from .models import Products
from account.models import UserData
from .models import Category, CartItem
  
class CustomerSerializer(serializers.ModelSerializer):  
    first_name = serializers.CharField(max_length=200, required=True)  
    last_name = serializers.CharField(max_length=200, required=True)  
    address = serializers.CharField(max_length=200, required=True)  
    mobile = serializers.CharField(max_length=10, required=True)  
  
    class Meta:  
        model = Customer
        fields = ('__all__')  
        
class OrderSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Products.objects.all())
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    quantity = serializers.IntegerField(required=True)
    price = serializers.IntegerField(required=True)
    address = serializers.CharField(max_length=50, required=False, allow_blank=True)
    phone = serializers.CharField(max_length=50, required=False, allow_blank=True)
    date = serializers.DateField(required=True)
    status = serializers.BooleanField(default=False)

    class Meta:
        model = Order
        fields = '__all__'
        
class ProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=60, required=True)
    price = serializers.IntegerField(default=0)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    description = serializers.CharField(max_length=250, required=False, allow_blank=True, allow_null=True)
    image = serializers.ImageField(required=False)

    class Meta:
        model = Products
        fields = '__all__'
        
class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, required=True)
    
    class Meta:
        model = Category
        fields = '__all__'
        
    
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Products.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = CartItem
        fields = ['id', 'user', 'product', 'product_id', 'quantity', 'added_at']
        read_only_fields = ['user', 'added_at']
