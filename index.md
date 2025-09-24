---
title: Alberto Prado
layout: base.liquid
---

# Alberto Prado

See all my posts

{% for post in collections.post %}
  <a href="{{ post.page.url }}">{{ post.data.title }}</a>
{% endfor %}