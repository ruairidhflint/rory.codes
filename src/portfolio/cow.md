---
layout: 'portfolio.njk'
title: 'Calendar of Wisdom'
permalink: /calendar-of-wisdom/
summary: Daily insight and reflections from A Calendar of Wisdom by Leo Tolstoy
deployed: https://www.calendarof.life/
position: 1
---

A NextJS app that displays the daily wisdom, quotes and philosophy from Leo Tolstoy's A Calendar of Wisdom. The content was dynamically
parsed from an ePub file to create formatted Markdown.  
![Calendar of Wisdom app screenshot](/assets/images/cow.webp 'cow')

366 was the product of wanting to learn about optimising API requests, data caching and a very old
set of 'quote' cards I owned as a child. The cards each had a date on one side and an interesting quote,
proverb or fact on the other; the reader was encouraged to only look at one per day and to reflect,
ponder and disaect the content. I always flicked through until I found one I liked or that felt pertinent at
the time which was, of course, completely beside the point.

I originally built a NodeJS server with a PostgreSQL database that contained 366 quotes each assigned to
a specific day of the year. The simple, responsive front-end would make an API call based on the date and retrieve
the quote and cache it locally, never making another request until the date changed.

The process worked well and was fast and efficient. I moved over to a Firebase storage and serverless
implementation simply as a way to refactor the code and learn about a new technology. Users can easily share the quote of
the day to Twitter or set it as their homepage to have an interesting prompt to start the morning.

//

    A Calendar of Wisdom by Leo Tolstoy was published in the early 20th century and is one of my all time favourite books. For each day of the year he compiled
    quotes, personal wisdom and Philosophy to inspire, motivate and contemplate. As life became more and more busy, I often forgot to read the daily entry and so
    I have parsed the text and created a simple React site to display the relevant text each day.

    The most difficult element was taking an ePub document, cleaning out the unwanted text and then writing a Python script to dynamically extract each day
    and format it correctly; differentiating between titles, quotes and standard text. Once the Markdown had been created, it was a simple case of creating a fast, modern
    and efficient UI to display the text.

    The project was written in TypeScript and styled in Tailwind. At point of deployment, it scored 100 across all Lighthouse metrics.
