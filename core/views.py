from rest_framework import viewsets

from . import permissions
from .models import Model1
from .serializers import Model1Serializer


class Model1ViewSet(viewsets.ModelViewSet):
    queryset = Model1.objects.all()
    serializer_class = Model1Serializer
    permission_classes = (permissions.Model1,)

def register():
    pass