from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Products, Order, Category, CartItem
from .serializers import CustomerSerializer, ProductSerializer, OrderSerializer, CategorySerializer, CartItemSerializer
from .permissions import IsAdminOrReadOnly

class CustomerView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, id=None):
        if id:
            result = Customer.objects.get(id=id)
            serializers = CustomerSerializer(result)
            return Response({'success': 'success', "customer": serializers.data}, status=200)

        result = Customer.objects.all()
        serializers = CustomerSerializer(result, many=True)
        return Response({'status': 'success', "customer": serializers.data}, status=200)

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        result = Customer.objects.get(id=id)
        serializer = CustomerSerializer(result, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})

    def delete(self, request, id=None):
        result = get_object_or_404(Customer, id=id)
        result.delete()
        return Response({"status": "success", "data": "Record Deleted"})


class ProductView(APIView):
    permission_classes = [IsAdminOrReadOnly]

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


class OrderView(APIView):
    permission_classes = [IsAuthenticated]

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


class CategoryView(APIView):
    permission_classes = [IsAdminUser]

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


class CartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        if id:
            cart_item = get_object_or_404(CartItem, id=id, user=request.user)
            serializer = CartItemSerializer(cart_item)
            return Response({'status': 'success', "cart_item": serializer.data}, status=200)

        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response({'status': 'success', "cart_items": serializer.data}, status=200)

    def post(self, request):
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Save the user along with the data
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        cart_item = get_object_or_404(CartItem, id=id, user=request.user)
        serializer = CartItemSerializer(cart_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})

    def delete(self, request, id=None):
        cart_item = get_object_or_404(CartItem, id=id, user=request.user)
        cart_item.delete()
        return Response({"status": "success", "data": "Record Deleted"})
