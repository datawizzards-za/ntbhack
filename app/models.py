# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Audits(models.Model):
    demarcation_code = models.CharField(max_length=5)
    financial_year_end = models.CharField(max_length=4)
    opinion = models.CharField(max_length=100)
    opinion_report_url = models.CharField(max_length=100)
