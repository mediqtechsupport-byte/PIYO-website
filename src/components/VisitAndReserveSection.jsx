import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  CalendarDays,
  Send,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export function VisitAndReserveSection({ openStatus }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Lunch (12:00 PM)');
  const [partySize, setPartySize] = useState('4â€“5 Guests');
  const [occasion, setOccasion] = useState('Family Dine-In');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const buildBookingText = () => {
    const lines = [
      'PIYO Grill & Restaurant â€” Table / Event Inquiry',
      `Guest Name: ${name.trim() || 'Guest'}`,
      `Date: ${date || 'Upcoming visit'}`,
      `Time: ${timeSlot}`,
      `Party Size: ${partySize}`,
      `Occasion: ${occasion}`,
      notes.trim() ? `Special Request: ${notes.trim()}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const handleCopyBooking = async () => {
    try {
      await navigator.clipboard.writeText(buildBookingText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const mailtoHref = `mailto:${RESTAURANT_INFO.email}?subject=${encodeURIComponent(
    `Table / Event Inquiry â€” ${name || 'Tagaytay Guest'}`
  )}&body=${encodeURIComponent(buildBookingText())}`;

  const smsHref = `sms:${RESTAURANT_INFO.mobileTel}?body=${encodeURIComponent(
    buildBookingText()
  )}`;

  return (
    <section id="visit" className="bg-[#F5EFE2] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Location, Hours, Direct Contacts */}
          <div className="space-y-5 lg:col-span-6">
            <div>
              <span className="inline-block rounded-full bg-[#0B2718]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0B2718]">
                Visit Us in Tagaytay
              </span>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0B2718] sm:text-4xl">
                Find PIYO Along Tagaytayâ€“Nasugbu Highway
              </h2>
              <p className="mt-1.5 text-sm text-[#425246]">
                Stop by for misty morning coffee &amp; silog (Friâ€“Sun from 7 AM) or cozy evening Kansi and grilled specialties.
              </p>
            </div>

            {/* Hours Card */}
            <div className="rounded-3xl border border-[#0B2718]/15 bg-[#FAF6EC] p-5 shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[#0B2718]">
                  <Clock className="h-5 w-5 text-[#C29645]" />
                  <h3 className="font-serif text-xl font-semibold">Operating Hours</h3>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    openStatus.isOpen
                      ? 'bg-emerald-900/10 text-emerald-900'
                      : 'bg-amber-900/10 text-amber-900'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      openStatus.isOpen ? 'bg-emerald-600' : 'bg-amber-600'
                    }`}
                  />
                  {openStatus.isOpen ? 'Open Now' : 'Closed Now'}
                </span>
              </div>

              <div className="mt-4 divide-y divide-[#0B2718]/10">
                {RESTAURANT_INFO.hours.map((slot, idx) => {
                  const isTodayBlock =
                    (idx === 1 && openStatus.isWeekendBlock) ||
                    (idx === 0 && !openStatus.isWeekendBlock);
                  return (
                    <div
                      key={slot.days}
                      className={`flex items-center justify-between py-2.5 text-sm ${
                        isTodayBlock ? 'font-bold text-[#0B2718]' : 'text-[#425246]'
                      }`}
                    >
                      <span>
                        {slot.days}{' '}
                        {isTodayBlock && (
                          <span className="ml-1.5 rounded-full bg-[#0B2718] px-2 py-0.5 text-[10px] font-semibold text-[#D8B36A]">
                            Today
                          </span>
                        )}
                      </span>
                      <span>{slot.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Quick Navigation Card */}
            <div className="rounded-3xl border border-[#0B2718]/15 bg-[#0B2718] p-5 text-[#FAF6EC] shadow-md">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#D8B36A]" />
                <div>
                  <h3 className="font-serif text-xl font-semibold">Location</h3>
                  <p className="mt-1 text-sm text-[#DCE6DF]">
                    {RESTAURANT_INFO.address}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#D8B36A] px-4 py-2.5 text-xs font-bold text-[#06180E] transition hover:bg-[#E5C685]"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={RESTAURANT_INFO.wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-[#06180E]/60 px-4 py-2.5 text-xs font-bold text-[#FAF6EC] transition hover:bg-[#06180E]"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-[#D8B36A]" />
                  <span>Open in Waze</span>
                </a>
              </div>

              {/* Direct Lines */}
              <div className="mt-5 grid grid-cols-1 gap-2.5 border-t border-white/15 pt-4 text-xs sm:grid-cols-2">
                <a
                  href={`tel:${RESTAURANT_INFO.mobileTel}`}
                  className="flex items-center gap-2 rounded-xl bg-white/8 px-3 py-2.5 text-[#FAF6EC] transition hover:bg-white/15"
                >
                  <Phone className="h-4 w-4 text-[#D8B36A]" />
                  <div>
                    <p className="text-[10px] text-[#CDD9D0]">Mobile</p>
                    <p className="font-bold">{RESTAURANT_INFO.mobile}</p>
                  </div>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.landlineTel}`}
                  className="flex items-center gap-2 rounded-xl bg-white/8 px-3 py-2.5 text-[#FAF6EC] transition hover:bg-white/15"
                >
                  <Phone className="h-4 w-4 text-[#D8B36A]" />
                  <div>
                    <p className="text-[10px] text-[#CDD9D0]">Landline</p>
                    <p className="font-bold">{RESTAURANT_INFO.landline}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="flex items-center gap-2 rounded-xl bg-white/8 px-3 py-2.5 text-[#FAF6EC] transition hover:bg-white/15 sm:col-span-2"
                >
                  <Mail className="h-4 w-4 text-[#D8B36A]" />
                  <div className="truncate">
                    <p className="text-[10px] text-[#CDD9D0]">Email</p>
                    <p className="truncate font-semibold">{RESTAURANT_INFO.email}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Table & Private Event Reservation Builder */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-[#0B2718]/15 bg-[#FAF6EC] p-5 shadow-sm sm:p-7">
              <div className="flex items-center gap-2.5 text-[#0B2718]">
                <CalendarDays className="h-5 w-5 text-[#C29645]" />
                <h3 className="font-serif text-2xl font-semibold sm:text-3xl">
                  Reserve a Table or Group Event
                </h3>
              </div>
              <p className="mt-1 text-sm text-[#4B5E50]">
                Planning a family lunch (6â€“8 seaters available!), Tagaytay weekend breakfast, or private gathering? Prepare your reservation details below and send straight via SMS or email.
              </p>

              <div className="mt-5 space-y-3.5">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0B2718]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maria Santos"
                    className="w-full rounded-2xl border border-[#0B2718]/20 bg-white px-4 py-2.5 text-sm text-[#1D231E] placeholder-[#7B8B7F] focus:border-[#0B2718] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0B2718]">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-2xl border border-[#0B2718]/20 bg-white px-4 py-2.5 text-sm text-[#1D231E] focus:border-[#0B2718] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0B2718]">
                      Preferred Time
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full rounded-2xl border border-[#0B2718]/20 bg-white px-4 py-2.5 text-sm text-[#1D231E] focus:border-[#0B2718] focus:outline-none"
                    >
                      <option>Friâ€“Sun Breakfast (7:30 AM)</option>
                      <option>Early Lunch (11:00 AM)</option>
                      <option>Lunch (12:00 PM)</option>
                      <option>Afternoon Merienda (3:00 PM)</option>
                      <option>Dinner (6:30 PM)</option>
                      <option>Friâ€“Sun Late Dinner (8:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0B2718]">
                      Party Size
                    </label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      className="w-full rounded-2xl border border-[#0B2718]/20 bg-white px-4 py-2.5 text-sm text-[#1D231E] focus:border-[#0B2718] focus:outline-none"
                    >
                      <option>2â€“3 Guests</option>
                      <option>4â€“5 Guests</option>
                      <option>6â€“8 Guests (Family Table)</option>
                      <option>9â€“15 Guests</option>
                      <option>16+ Private Event / Group</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0B2718]">
                      Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full rounded-2xl border border-[#0B2718]/20 bg-white px-4 py-2.5 text-sm text-[#1D231E] focus:border-[#0B2718] focus:outline-none"
                    >
                      <option>Family Dine-In</option>
                      <option>Birthday / Celebration</option>
                      <option>Tagaytay Barkada Trip</option>
                      <option>Corporate / Group Event</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0B2718]">
                    Notes or Dish Pre-Order
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Reserve 1 Bacolod Cansi & Crispy Pata, high chair needed..."
                    className="w-full rounded-2xl border border-[#0B2718]/20 bg-white px-4 py-2.5 text-sm text-[#1D231E] placeholder-[#7B8B7F] focus:border-[#0B2718] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
                  <a
                    href={smsHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B2718] px-5 py-3 text-sm font-bold text-[#FAF6EC] shadow-sm transition hover:bg-[#113421]"
                  >
                    <Send className="h-4 w-4 text-[#D8B36A]" />
                    <span>Send via SMS</span>
                  </a>

                  <a
                    href={mailtoHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0B2718] bg-white px-5 py-3 text-sm font-bold text-[#0B2718] transition hover:bg-[#E5EDE7]"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send via Email</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyBooking}
                  className="flex w-full items-center justify-center gap-1.5 rounded-full border border-[#0B2718]/20 bg-[#E5EDE7]/70 py-2 text-xs font-semibold text-[#0B2718] transition hover:bg-[#E5EDE7]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-700" />
                      <span>Reservation Details Copied â€” Paste in Facebook Messenger!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Details to Message on Facebook</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
