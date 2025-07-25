---
title: Alberto Prado
layout: base.liquid
---

# Alberto Prado

See all my posts

{% for post in posts %}
  <a href="{{ post.title | slugify }}">{{ post.title }}</a>
{% endfor %}