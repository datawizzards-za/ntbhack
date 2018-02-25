from rest_framework import serializers
from app import models
from django.contrib.auth.models import User
import json
import datetime


class OfficialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Officials
        fields = ['title', 'role', 'name', 'email_address', 'fax_number', 'phone_number',
                  'demarcation_code']


class MunicipalitySerializer(serializers.ModelSerializer):
    officials = OfficialsSerializer(many=True, read_only=True)

    class Meta:
        model = models.Municipalities
        fields = ['area', 'category', 'demarcation_code', 'fax_number',
                  'name', 'phone_number', 'postal_address_1', 'postal_address_2',
                  'postal_code', 'province_name', 'street_address_1', 'street_address_2',
                  'street_address_3', 'website', 'officials']
