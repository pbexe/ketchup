import uuid
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view

from rest_framework.parsers import JSONParser
from rest_framework.decorators import parser_classes

from . import permissions

# from .models import Model1
# from .serializers import Model1Serializer


# class Model1ViewSet(viewsets.ModelViewSet):
#     queryset = Model1.objects.all()
#     serializer_class = Model1Serializer
#     permission_classes = (permissions.Model1,)

from core.models import Session, AnonymousSession
import jwt


@api_view(["GET"])
@parser_classes([JSONParser])
def start(request: Request):
    # user = request.user
    # if user.is_authenticated:
    #     return Response({"error": "Only works anonymously for now"})

    session = AnonymousSession.objects.create()

    identifier = session.identifier

    return Response({"message": identifier})
