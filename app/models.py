# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Audits(models.Model):
    demarcation_code = models.CharField(max_length=10)
    demarcation_label = models.CharField(max_length=255)
    financial_year_end = models.CharField(max_length=20)
    opinion = models.CharField(max_length=255)
    opinion_report_url = models.CharField(max_length=255)


class Municipalities(models.Model):
    area = models.CharField(max_length=9)
    category = models.CharField(max_length=2)
    demarcation_code = models.CharField(max_length=6)
    fax_number = models.CharField(max_length=20)
    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    postal_address_1 = models.CharField(max_length=50)
    postal_address_2 = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=4)
    province_name = models.CharField(max_length=20)
    street_address_1 = models.CharField(max_length=50)
    street_address_2 = models.CharField(max_length=50)
    street_address_3 = models.CharField(max_length=100)
    website = models.CharField(max_length=100)


class Officials(models.Model):
    title = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    email_address = models.CharField(max_length=255)
    fax_number = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    demarcation_code = models.CharField(max_length=255)


class Maintenance(models.Model):
    demarcation_code = models.CharField(max_length=6)
    amount = models.CharField(max_length=9)
    amount_type = models.CharField(max_length=15)
    financial_period = models.CharField(max_length=4)
    financial_year_end = models.CharField(max_length=4)
    item_label = models.CharField(max_length=25)


class CashFlow(models.Model):
    demarcation_code = models.CharField(max_length=6)
    amount = models.CharField(max_length=9)
    amount_type = models.CharField(max_length=15)
    financial_year_end = models.CharField(max_length=4)
    item_label = models.CharField(max_length=25)


class BalanceSheet(models.Model):
    amount = models.CharField(max_length=9)
    demarcation_code = models.CharField(max_length=6)
    demarcation_label = models.CharField(max_length=20)
    financial_year_end = models.CharField(max_length=4)
    item_label = models.CharField(max_length=25)


class Capital(models.Model):
    amount_type = models.CharField(max_length=15)
    financial_year_end = models.CharField(max_length=4)
    item_label = models.CharField(max_length=25)
    demarcation_code = models.CharField(max_length=6)
    demarcation_label = models.CharField(max_length=20)


class IncomeExpense(models.Model):
    amount_type = models.CharField(max_length=25)
    financial_year_end = models.CharField(max_length=4)
    item_label = models.CharField(max_length=25)
    demarcation_code = models.CharField(max_length=6)
    demarcation_label = models.CharField(max_length=20)


class WastefulExpenditure(models.Model):
    amount = models.CharField(max_length=9)
    demarcation_code = models.CharField(max_length=6)
    demarcation_label = models.CharField(max_length=20)
    financial_year_end = models.CharField(max_length=4)
    item_label = models.CharField(max_length=25)
    postal_code = models.CharField(max_length=4)
    province_name = models.CharField(max_length=20)
    street_address_1 = models.CharField(max_length=50)
    street_address_2 = models.CharField(max_length=50)
    street_address_3 = models.CharField(max_length=30)
    website = models.CharField(max_length=30)
