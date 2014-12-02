ForumBUDDY

DESCRIPTION

Basic Google Chrome extension that logs whenever someone mentions your username on a forum and provides information
about the post. Right now this extension only works for http://forum.bodybuilding.com/ but will eventually
work on all vBulletin forums.

HOW IT WORKS

Scrapes the search database of a forum with your username and records all fourm posts in localStorage. The extension
uses background.js constantly scrape the forum every minute and stores all information.


PROJECT STATUS

DONE:

- Basic scraping algorithm for querying the search results database.

- Timer to scrape every minute

- Store all posts in localStorage

- Change "yesterday" and "today" to the real date

- Created basic UI for chrome extension
- Settings page
- Popup page
- Pull username for the search query from the forum website
- Display a badge by donators usernames
- disable x button
- Donation page
- Improve scrape algorithm to get mention results almost instantaneously
- Sort results by date field in memory instead of top query search

TO DO:
- Display subscriptions in popup page
- Scrape and display latest reputation received data
- Hide posts from reds
- Make universal for all vBulletin Forums