# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Audits(models.Model):
    demarcation_code = models.CharField(max_length=5)
    financial_year_end = models.CharField(max_length=4)
    opinion = models.CharField(max_length=100)
    opinion_report_url = models.CharField(max_length=100)


class Municipalities(models.Model):
    area = models.CharField(max_length=9)
    category = models.Chafield(max_length=2)
    demarcation_code = models.Charfield(max_length=6)
    fax_number = models.Charfield(max_length=10)
    name = models.Charfield(max_length=50)
    phone_number = models.Charfield(max_length=10)
    postal_address_1 = models.Charfield(max_length=50)
    postal_address_2 = models.Charfield(max_length=50)
    postal_code  = models.Charfield(max_length=4)
    province_name = models.Charfield(max_length=20)
    street_address_1  = models.Charfield(max_length=50)
    street_address_2 = models.Charfield(max_length=50)
    street_address_3 = models.Charfield(max_length=30)
    website = models.Charfield(max_length=30)


class Officials(models.Model):
    title = models.Charfield(max_length=4)
    role = models.Charfield(max_length=30)
    name = models.Charfield(max_length=50)
    email_address = models.Charfield(max_length=50)
    fax_number = models.Charfield(max_length=10)
    phone_number = models.Charfield(max_length=10)
    demarcation_code = models.Charfield(max_length=6)
