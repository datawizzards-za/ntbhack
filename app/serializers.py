from rest_framework import serializers
from app import models
from django.contrib.auth.models import User
import json
import datetime


class CashFlowSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CashFlow
        fields = ['amount', 'financial_year_end', 'item_label', 'amount_type']


class CapitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Capital
        fields = ['amount', 'financial_year_end', 'item_label', 'amount_type']


class IncomeExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IncomeExpense
        fields = ['amount', 'financial_year_end', 'item_label', 'amount_type']


class ForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Forecast
        fields = ['kpi', 'forecast_period', 'forecast_value']


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Maintenance
        fields = ['amount', 'financial_year_end', 'item_label', 'amount_type']


class WESerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WastefulExpenditure
        fields = ['amount', 'financial_year_end', 'item_label']


class BSSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BalanceSheet
        fields = ['amount', 'financial_year_end', 'item_label', 'amount_type']


class AuditsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Audits
        fields = ['financial_year_end', 'opinion', 'opinion_report_url']


class OfficialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Officials
        fields = ['title', 'role', 'name',
                  'email_address', 'fax_number', 'phone_number']


class MunicipalitySerializer(serializers.ModelSerializer):
    officials = OfficialsSerializer(many=True, read_only=True)
    audits = AuditsSerializer(many=True, read_only=True)
    cash_flows = CashFlowSerializer(many=True, read_only=True)
    balance_sheets = BSSerializer(many=True, read_only=True)
    maintenance = MaintenanceSerializer(many=True, read_only=True)
    wasteful = WESerializer(many=True, read_only=True)
    forecasts = ForecastSerializer(many=True, read_only=True)
    capital = CapitalSerializer(many=True, read_only=True)
    income_expense = IncomeExpenseSerializer(many=True, read_only=True)

    class Meta:
        model = models.Municipalities
        fields = ['area', 'category', 'demarcation_code', 'fax_number',
                  'name', 'phone_number', 'postal_address_1', 'postal_address_2',
                  'postal_code', 'province_name', 'street_address_1', 'street_address_2',
                  'street_address_3', 'website', 'officials', 'balance_sheets', 'audits',
                  'cash_flows', 'maintenance', 'wasteful', 'forecasts', 'capital', 'income_expense']
