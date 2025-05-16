---
layout: 'about.njk'
title: Working Notes
permalink: /notes/
---

These are my working notes. They are written purely for myself. They are neither complete nor incomplete but forever in a state of change. I have no publicly available versioning so what is here today may not be here tomorrow. And that is just fine.

The notes are heavily inspired by the work of [Andy Matuschak](https://notes.andymatuschak.org/) and [Steph Ango](https://stephango.com/evergreen-notes).

If anything catches your eye, feel free to [say hello](/about) and start a chat. I reply to every email, eventually.
<br />

{% if collections.notes.length %}
{% for note in collections.notes %}

- [{{ note.data.title }}]({{ note.url }})
  {% endfor %}
  {% endif %}
