import django

from django.contrib.auth.models import User
user = User.objects.get(username = 'carmstrong1')

from core.models import ApiInfo

test = ApiInfo(username = user, hostname = '127.0.0.1:8000', human_readable = 'BCO API (Generic)', apikey = '@#48&8fdsnj4012nDfh4jkl2')
test.save()

#suppress account

#API Key needs to give list of tables -> gives list of prefixes (parsed)
# -> Need keys/tables model
# -> server request for tables sends back comma-separated list
