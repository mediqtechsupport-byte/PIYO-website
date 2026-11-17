/**
 * Computes PIYO Grill & Restaurant's current open/closed status in Asia/Manila time.
 * Mon–Thu: 11:00 AM – 8:00 PM
 * Fri–Sun: 7:00 AM – 10:00 PM
 */
export function getTagaytayOpenStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const weekday = map.weekday; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
  const hour = Number(map.hour) % 24;
  const minute = Number(map.minute);
  const currentMinutes = hour * 60 + minute;

  const isWeekendBlock = ['Fri', 'Sat', 'Sun'].includes(weekday);
  const openHour = isWeekendBlock ? 7 : 11;
  const closeHour = isWeekendBlock ? 22 : 20;
  const openMinutes = openHour * 60;
  const closeMinutes = closeHour * 60;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  const openLabel = isWeekendBlock ? '7:00 AM' : '11:00 AM';
  const closeLabel = isWeekendBlock ? '10:00 PM' : '8:00 PM';

  let nextNote = '';
  if (isOpen) {
    nextNote = `Open Now · Until ${closeLabel}`;
  } else if (currentMinutes < openMinutes) {
    nextNote = `Opens Today at ${openLabel}`;
  } else {
    const tomorrowIsWeekend =
      weekday === 'Thu' || weekday === 'Fri' || weekday === 'Sat';
    const nextOpen = tomorrowIsWeekend ? '7:00 AM' : '11:00 AM';
    nextNote = `Closed · Opens Tomorrow ${nextOpen}`;
  }

  return {
    isOpen,
    weekday,
    isWeekendBlock,
    todayHours: `${openLabel} – ${closeLabel}`,
    statusText: nextNote,
  };
}

export function formatPeso(amount) {
  return `₱${Number(amount).toLocaleString('en-PH')}`;
}
