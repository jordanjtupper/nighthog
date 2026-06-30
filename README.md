# Night Hog calendar conversion

Upload these three files to the root of the Night Hog GitHub repo:

- `index.html`
- `gigs-feed.js`
- `nighthog-calendar.js`

From now on, add/change Night Hog dates in `gigs-feed.js`. The visible calendar and generated MusicEvent schema come from that same list.

The current styling is preserved. Past gigs are hidden automatically, remaining gigs are sorted by date, and the next show gets the existing `Next Up` badge.
