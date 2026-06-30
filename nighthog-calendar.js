// Night Hog calendar renderer
// Builds the visible calendar and MusicEvent schema from window.NIGHT_HOG_GIGS.

(() => {
  const gigs = Array.isArray(window.NIGHT_HOG_GIGS) ? window.NIGHT_HOG_GIGS : [];
  const list = document.getElementById('showsList');
  const empty = document.getElementById('showsEmpty');
  if (!list) return;

  const tzOffset = '-05:00';
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function parseDate(date) {
    return new Date(`${date}T00:00:00`);
  }

  function eventEndDate(gig) {
    if (!gig.endTime) return gig.date;
    if (!gig.startTime) return gig.date;
    return gig.endTime <= gig.startTime ? addDays(gig.date, 1) : gig.date;
  }

  function addDays(dateString, days) {
    const d = parseDate(dateString);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function prettyTime(gig) {
    if (gig.displayTime) return gig.displayTime;
    if (!gig.startTime && !gig.endTime) return 'TBA';
    if (gig.startTime && !gig.endTime) return formatTime(gig.startTime);
    return `${formatTime(gig.startTime)} – ${formatTime(gig.endTime)}`;
  }

  function formatTime(value) {
    if (!value) return '';
    const [hRaw, mRaw] = value.split(':');
    let h = Number(hRaw);
    const m = Number(mRaw || '0');
    const suffix = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${String(m).padStart(2, '0')} ${suffix}`;
  }

  function locationText(gig) {
    return [gig.city, gig.state].filter(Boolean).join(', ');
  }

  function makeItem(gig, isNext) {
    const d = parseDate(gig.date);
    const li = document.createElement('li');
    li.className = `show-item${isNext ? ' next-show' : ''}`;
    li.dataset.date = gig.date;
    li.innerHTML = `
      <span class="show-date"><span class="show-month">${monthNames[d.getMonth()]}</span><span class="show-day">${String(d.getDate()).padStart(2, '0')}</span></span>
      <div class="show-info">
        <h3 class="show-venue">${escapeHtml(gig.venue)}${isNext ? '<span class="show-badge">Next Up</span>' : ''}</h3>
        <p class="show-location">${escapeHtml(locationText(gig))}</p>
      </div>
      <span class="show-time">${escapeHtml(prettyTime(gig))}</span>
    `;
    return li;
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
  }

  const upcoming = gigs
    .filter(gig => gig.date && parseDate(gig.date) >= today)
    .sort((a, b) => `${a.date}T${a.startTime || '23:59'}`.localeCompare(`${b.date}T${b.startTime || '23:59'}`));

  list.innerHTML = '';
  upcoming.forEach((gig, index) => list.appendChild(makeItem(gig, index === 0)));

  if (empty) empty.hidden = upcoming.length > 0;

  const events = upcoming.map(gig => ({
    '@type': 'MusicEvent',
    name: gig.status === 'private' ? 'Night Hog Private Event' : `Night Hog Live at ${gig.venue}`,
    startDate: gig.startTime ? `${gig.date}T${gig.startTime}:00${tzOffset}` : gig.date,
    ...(gig.endTime ? { endDate: `${eventEndDate(gig)}T${gig.endTime}:00${tzOffset}` } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    description: gig.status === 'private'
      ? `Private Night Hog performance in ${locationText(gig)}.`
      : `Night Hog performs live classic rock, funk, and soul at ${gig.venue} in ${locationText(gig)}.`,
    image: 'https://nighthogbr.com/images/nighthog-logo.png',
    location: {
      '@type': 'Place',
      name: gig.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: gig.city || '',
        addressRegion: gig.state || 'LA',
        addressCountry: 'US'
      }
    },
    performer: {
      '@type': 'MusicGroup',
      name: 'Night Hog',
      url: 'https://nighthogbr.com'
    },
    organizer: {
      '@type': 'MusicGroup',
      name: 'Night Hog',
      url: 'https://nighthogbr.com'
    },
    offers: gig.status === 'private' ? undefined : {
      '@type': 'Offer',
      url: 'https://nighthogbr.com/#shows',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  })).map(event => Object.fromEntries(Object.entries(event).filter(([, value]) => value !== undefined)));

  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.id = 'night-hog-generated-event-schema';
  schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': events }, null, 2);
  document.head.appendChild(schema);
})();
