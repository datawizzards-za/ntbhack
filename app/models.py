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
    area
    category
    demarcation_code
    fax_number
    name
    phone_number
    postal_address_1
    postal_address_2
    postal_code
    province_name
    street_address_1
    street_address_2
    street_address_3
    website


class Officials(models.Model):
    title
    role
    name
    email_address
    fax_number
    phone_number
    demarcation_code
