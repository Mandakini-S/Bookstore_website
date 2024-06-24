from django.shortcuts import render  
from rest_framework.views import APIView  
from rest_framework.response import Response  
from rest_framework import status  
from .models import Customer 
from .models import Products
from .models import Order
from .models import Category
from .serializers import CustomerSerializer
from .serializers import ProductSerializer
from .serializers import OrderSerializer
from .serializers import CategorySerializer
from django.shortcuts import get_object_or_404  
# Create your views here.  
  
class CustomerView(APIView):  
  
    def get(self, request, id):  
        result = Customer.objects.get(id=id)  
        if id:  
            serializers = CustomerSerializer(result)  
            return Response({'success': 'success', "customer":serializers.data}, status=200)  
  
        result = Customer.objects.all()  
        serializers = CustomerSerializer(result, many=True)  
        return Response({'status': 'success', "customer":serializers.data}, status=200)  
  
    def post(self, request):  
        serializer = CustomerSerializer(data=request.data)  
        if serializer.is_valid():  
            serializer.save()  
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)  
        else:  
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)  
  
    def patch(self, request, id):  
        result = Customer.objects.get(id=id)  
        serializer = CustomerSerializer(result, data = request.data, partial=True)  
        if serializer.is_valid():  
            serializer.save()  
            return Response({"status": "success", "data": serializer.data})  
        else:  
            return Response({"status": "error", "data": serializer.errors})  
  
    def delete(self, request, id=None):  
        result = get_object_or_404(Customer, id=id)  
        result.delete()  
        return Response({"status": "success", "data": "Record Deleted"})  

# product view


class ProductView(APIView):

    def get(self, request, id=None):
        if id:
            product = get_object_or_404(Products, id=id)
            serializer = ProductSerializer(product)
            return Response({'status': 'success', "product": serializer.data}, status=200)

        products = Products.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response({'status': 'success', "products": serializer.data}, status=200)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        product = get_object_or_404(Products, id=id)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})

    def delete(self, request, id=None):
        product = get_object_or_404(Products, id=id)
        product.delete()
        return Response({"status": "success", "data": "Record Deleted"})

#Order view

class OrderView(APIView):

    def get(self, request, id=None):
        if id:
            order = get_object_or_404(Order, id=id)
            serializer = OrderSerializer(order)
            return Response({'status': 'success', "order": serializer.data}, status=200)

        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response({'status': 'success', "orders": serializer.data}, status=200)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        order = get_object_or_404(Order, id=id)
        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})

    def delete(self, request, id=None):
        order = get_object_or_404(Order, id=id)
        order.delete()
        return Response({"status": "success", "data": "Record Deleted"})


#category view

class CategoryView(APIView):

    def get(self, request, id=None):
        if id:
            category = get_object_or_404(Category, id=id)
            serializer = CategorySerializer(category)
            return Response({'status': 'success', "category": serializer.data}, status=200)

        categories = Category.get_all_categories()
        serializer = CategorySerializer(categories, many=True)
        return Response({'status': 'success', "categories": serializer.data}, status=200)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        category = get_object_or_404(Category, id=id)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})

    def delete(self, request, id=None):
        category = get_object_or_404(Category, id=id)
        category.delete()
        return Response({"status": "success", "data": "Record Deleted"})