from rest_framework import serializers

from .models import Model1


class Model1Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Model1
        fields = ('url', 'test_field',)
