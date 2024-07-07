from rest_framework.permissions import BasePermission

class IsAdminOrReadOnly(BasePermission):
  
    # Custom permission to only allow admin users to edit it.
    

    def has_permission(self, request, view):
       
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True

        # Write permissions are only allowed to the admin user.
        return request.user and request.user.is_staff
