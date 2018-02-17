from django.conf.urls import url
from app import views
from app import api_views
from django.contrib.auth import views as auth_views
from app import forms

urlpatterns = [
    # url(r'^createfaults/$', CreateFaults.as_view(), name='createfaults'),

    url(r'^visuals/$', views.Visuals.as_view(), name='visuals'),
    url(r'^notifs/$', views.Notifs.as_view(), name='notifs'),
    url(r'^profile/$', views.Profile.as_view(), name='profile'),
    url(r'^load_employees_data/$', views.LoadEmployeesData.as_view(),
        name='load_employees_data'),
    url(r'^api/api_auth/(?P<username>\w+)/(?P<password>.+)/',
        views.LoginAuth.as_view(), name='api_auth'),
    url(r'^login/$', auth_views.LoginView.as_view(
        template_name='login.html', form_class=forms.LoginForm),
        name='login'),
    url(r'^logout/$', auth_views.logout, name='logout'),
    url(r'^register/$', views.RegisterUserView.as_view(), name='register'),
]