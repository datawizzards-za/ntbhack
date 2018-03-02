from app import serializers, models

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from django.contrib.auth.models import User
from app import models
from app import serializers


class GetMunisData(generics.ListCreateAPIView):
    queryset = models.Municipalities.objects.all()
    serializer_class = serializers.MunicipalitySerializer


class GetOfficials(generics.ListCreateAPIView):
    queryset = models.Officials.objects.all()
    serializer_class = serializers.OfficialsSerializer
