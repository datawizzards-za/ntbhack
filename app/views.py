# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import pickle
import numpy as np
import pandas as pd
import json
import datetime

from random import randint

from django.shortcuts import render
from django.views import View
from django.contrib.auth import authenticate, login
from . import models
from app.forms import RegisterUserForm
from django.urls import reverse_lazy
from django.http import HttpResponseForbidden, HttpResponse
from django.views.generic import CreateView, TemplateView
from django.contrib.auth.models import User
from django.core import serializers
import requests
from django.contrib.auth.mixins import LoginRequiredMixin


# Create your views here.


class Visuals(View):
    template_name = 'visuals.html'

    def get(self, request):
        context = {'hello': 'hello there'}
        return render(request, self.template_name, context)


class Notifs(View):
    template_name = 'notifs.html'

    def get(self, request):
        context = {'hello': 'hello there'}
        return render(request, self.template_name, context)


class Profile(View):
    template_name = 'profile.html'

    def get(self, request):
        context = {'hello': 'hello there'}
        return render(request, self.template_name, context)


class LoadEmployeesData(View):
    template_name = 'load_employees_data.html'

    def get(self, request):
        return render(request, self.template_name)


class RegisterUserView(CreateView):
    form_class = RegisterUserForm
    template_name = "register.html"

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return HttpResponseForbidden()

        return super(RegisterUserView, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        user = form.save(commit=False)
        user.set_password(form.cleaned_data['password'])
        user.save()
        return HttpResponse('User registered')


class LoginAuth(View):
    def get(self, request, *args, **kwargs):
        username = kwargs['username']
        password = kwargs['password']
        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                username = user.username
                user = authenticate(username=username, password=password)
                login(request, user)
                details = User.objects.get(username=username)
                serialized_obj = serializers.serialize('json', [details, ])
                return HttpResponse(serialized_obj)
            else:
                return HttpResponse('{"messages":"Wrong password"}')
        except User.DoesNotExist:
            return HttpResponse(
                '{"message": "username and password incorrect"}')
