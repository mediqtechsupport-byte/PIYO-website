import React, { useState } from 'react';
import {
  Navigation,
  Compass,
  MessageSquare,
  Mail,
  Copy,
  Check,
  Users,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export function VisitAndReserveSection({ openStatus }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Lunch (12:00 PM)');
  const [partySize, setPartySize] = useState('1–2 Guests');
  const [occasion, setOccasion] = useState('General Dining');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const buildBookingText = () => {
    const lines = [
      'PIYO Grill & Restaurant — Table / Event Inquiry',
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
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const mailtoHref = `mailto:${RESTAURANT_INFO.email}?subject=${encodeURIComponent(
    `Table / Event Inquiry — ${name || 'Tagaytay Guest'}`
  )}&body=${encodeURIComponent(buildBookingText())}`;

  const smsHref = `sms:${RESTAURANT_INFO.mobileTel}?body=${encodeURIComponent(
    buildBookingText()
  )}`;

  return (
    <section
      id="visit"
      className="relative overflow-hidden border-t border-[#DFB96F]/15 bg-[#06180E] py-16 text-[#FAF6EC] sm:py-20 lg:py-24"
    >
      {/* Subtle Ambient Warm Gold & Deep Emerald Radial Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 46% 52% at 18% 22%, rgba(223,185,111,0.08) 0%, transparent 68%), radial-gradient(ellipse 52% 58% at 84% 78%, rgba(22,64,42,0.34) 0%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          {/* Left Column: Premier Location, Hours, Warm Beige Space Card & Direct Contacts */}
          <div className="space-y-5 lg:col-span-5">
            <div>
              {/* Premier Location Pill */}
              <span className="inline-flex items-center gap-2 rounded-full border border-[#DFB96F]/30 bg-[#0B2316] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#DFB96F]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#DFB96F]" aria-hidden="true" />
                Premier Location
              </span>

              {/* Stacked High-Contrast Display Heading */}
              <h2 className="mt-4 font-serif text-4xl font-semibold uppercase leading-[1.02] tracking-tight text-[#FAF6EC] sm:text-[2.85rem]">
                PIYO
                <span className="block text-[#DFB96F]">Tagaytay</span>
              </h2>

              <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-[#B7C9BE]">
                Elevated dining along the Tagaytay–Nasugbu Highway. Experience
                misty mornings and cozy evening Cansi in a space designed for
                warm hospitality.
              </p>
            </div>

            <div className="h-px w-full bg-[#FAF6EC]/10" aria-hidden="true" />

            {/* Operating Hours Dark Forest Card */}
            <div className="rounded-2xl border border-[#DFB96F]/16 bg-[#0A2215]/90 p-5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#DFB96F]">
                  Operating Hours
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
                    openStatus.isOpen
                      ? 'border-emerald-400/30 bg-emerald-500/12 text-emerald-300'
                      : 'border-rose-400/30 bg-rose-500/12 text-rose-300'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      openStatus.isOpen ? 'bg-emerald-400' : 'bg-rose-400'
                    }`}
                  />
                  {openStatus.isOpen ? 'Open Now' : 'Closed Now'}
                </span>
              </div>

              <div className="mt-3.5 divide-y divide-[#FAF6EC]/8">
                {RESTAURANT_INFO.hours.map((slot, idx) => {
                  const isTodayBlock =
                    (idx === 1 && openStatus.isWeekendBlock) ||
                    (idx === 0 && !openStatus.isWeekendBlock);
                  return (
                    <div
                      key={slot.days}
                      className="flex items-center justify-between gap-2 py-2.5 text-xs sm:text-[13px]"
                    >
                      <span
                        className={`inline-flex items-center gap-2 ${
                          isTodayBlock
                            ? 'font-semibold text-[#FAF6EC]'
                            : 'text-[#9EB3A6]'
                        }`}
                      >
                        <span>{slot.days}</span>
                        {isTodayBlock && (
                          <span className="rounded bg-[#FAF6EC]/12 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#DFB96F]">
                            Today
                          </span>
                        )}
                      </span>
                      <span className="font-semibold tabular-nums text-[#F5EFE2]">
                        {slot.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Warm Cream Beige "Find Our Space" Contrast Card */}
            <div className="rounded-2xl border border-[#DFB96F]/30 bg-[#F5EFE2] p-5 text-[#06180E] shadow-[0_22px_48px_-18px_rgba(0,0,0,0.6)] sm:p-6">
              <h3 className="font-serif text-xl font-semibold tracking-tight text-[#06180E]">
                Find Our Space
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#45564A] sm:text-[13px]">
                {RESTAURANT_INFO.address}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[#0B2718] px-4 py-2.5 text-xs font-bold text-[#FAF6EC] shadow-sm transition hover:bg-[#143D28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2718]"
                >
                  <Navigation className="h-3.5 w-3.5 text-[#DFB96F]" aria-hidden="true" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={RESTAURANT_INFO.wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#0B2718]/18 bg-[#FAF6EC] px-4 py-2.5 text-xs font-bold text-[#0B2718] transition hover:border-[#0B2718]/40 hover:bg-[#EAE0CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2718]"
                >
                  <Compass className="h-3.5 w-3.5 text-[#0B2718]" aria-hidden="true" />
                  <span>Waze</span>
                </a>
              </div>
            </div>

            {/* Direct Phone Tiles */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.mobileTel}`}
                className="group rounded-2xl border border-[#DFB96F]/16 bg-[#0A2215]/90 p-4 transition hover:border-[#DFB96F]/45 hover:bg-[#0E2C1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
              >
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8DA496]">
                  Inquiries
                </span>
                <span className="mt-1 block text-sm font-bold tabular-nums text-[#FAF6EC] transition-colors group-hover:text-[#DFB96F]">
                  {RESTAURANT_INFO.mobile}
                </span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.landlineTel}`}
                className="group rounded-2xl border border-[#DFB96F]/16 bg-[#0A2215]/90 p-4 transition hover:border-[#DFB96F]/45 hover:bg-[#0E2C1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
              >
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8DA496]">
                  Landline
                </span>
                <span className="mt-1 block text-sm font-bold tabular-nums text-[#FAF6EC] transition-colors group-hover:text-[#DFB96F]">
                  {RESTAURANT_INFO.landline}
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Luxury Dark Forest Green "Book a Table" Concierge Card */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-[#DFB96F]/20 bg-[#0A2215]/92 p-6 shadow-[0_28px_72px_-24px_rgba(0,0,0,0.72)] sm:p-8 lg:p-9">
              {/* Signature Angled Warm Gold Top-Right Corner Accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rotate-12 rounded-xl bg-[#DFB96F]/18"
              />

              <div className="relative">
                <h3 className="font-serif text-3xl font-semibold tracking-tight text-[#FAF6EC] sm:text-[2.15rem]">
                  Book a Table
                </h3>
                <p className="mt-2 max-w-lg text-xs leading-relaxed text-[#A3B8AC] sm:text-[13.5px]">
                  Secure your placement for breakfast, lunch, or private evening
                  gatherings. All details are sent directly to our concierge
                  team for immediate confirmation.
                </p>

                <div
                  className="my-6 h-px w-full bg-[#FAF6EC]/10"
                  aria-hidden="true"
                />

                <div className="space-y-4">
                  {/* Guest Information */}
                  <div>
                    <label
                      htmlFor="reserve-name"
                      className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#DFB96F]"
                    >
                      Guest Information
                    </label>
                    <input
                      id="reserve-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Full Name (e.g. Alessandro Santos)"
                      className="min-h-[46px] w-full rounded-xl border border-[#FAF6EC]/12 bg-[#06160D] px-4 py-2.5 text-sm text-[#FAF6EC] placeholder-[#6B8275] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
                    />
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="reserve-date"
                        className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9BB0A3]"
                      >
                        Date of Visit
                      </label>
                      <input
                        id="reserve-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ colorScheme: 'dark' }}
                        className="min-h-[46px] w-full rounded-xl border border-[#FAF6EC]/12 bg-[#06160D] px-4 py-2.5 text-sm text-[#FAF6EC] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="reserve-time"
                        className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9BB0A3]"
                      >
                        Preferred Time
                      </label>
                      <div className="relative">
                        <select
                          id="reserve-time"
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="min-h-[46px] w-full appearance-none rounded-xl border border-[#FAF6EC]/12 bg-[#06160D] pl-4 pr-10 py-2.5 text-sm text-[#FAF6EC] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
                        >
                          <option className="bg-[#0A2215]">Fri–Sun Breakfast (7:30 AM)</option>
                          <option className="bg-[#0A2215]">Early Lunch (11:00 AM)</option>
                          <option className="bg-[#0A2215]">Lunch (12:00 PM)</option>
                          <option className="bg-[#0A2215]">Afternoon Merienda (3:00 PM)</option>
                          <option className="bg-[#0A2215]">Dinner (6:30 PM)</option>
                          <option className="bg-[#0A2215]">Fri–Sun Late Dinner (8:30 PM)</option>
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8DA496]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Party Size & Occasion Row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="reserve-party"
                        className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9BB0A3]"
                      >
                        Party Size
                      </label>
                      <div className="relative">
                        <select
                          id="reserve-party"
                          value={partySize}
                          onChange={(e) => setPartySize(e.target.value)}
                          className="min-h-[46px] w-full appearance-none rounded-xl border border-[#FAF6EC]/12 bg-[#06160D] pl-4 pr-10 py-2.5 text-sm text-[#FAF6EC] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
                        >
                          <option className="bg-[#0A2215]">1–2 Guests</option>
                          <option className="bg-[#0A2215]">3–5 Guests</option>
                          <option className="bg-[#0A2215]">6–8 Guests (Family Table)</option>
                          <option className="bg-[#0A2215]">9–15 Guests</option>
                          <option className="bg-[#0A2215]">16+ Private Event / Group</option>
                        </select>
                        <Users
                          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8DA496]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="reserve-occasion"
                        className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9BB0A3]"
                      >
                        Occasion
                      </label>
                      <div className="relative">
                        <select
                          id="reserve-occasion"
                          value={occasion}
                          onChange={(e) => setOccasion(e.target.value)}
                          className="min-h-[46px] w-full appearance-none rounded-xl border border-[#FAF6EC]/12 bg-[#06160D] pl-4 pr-10 py-2.5 text-sm text-[#FAF6EC] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
                        >
                          <option className="bg-[#0A2215]">General Dining</option>
                          <option className="bg-[#0A2215]">Family Dine-In</option>
                          <option className="bg-[#0A2215]">Birthday / Celebration</option>
                          <option className="bg-[#0A2215]">Tagaytay Barkada Trip</option>
                          <option className="bg-[#0A2215]">Corporate / Group Event</option>
                        </select>
                        <Sparkles
                          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8DA496]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes & Special Requests */}
                  <div>
                    <label
                      htmlFor="reserve-notes"
                      className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9BB0A3]"
                    >
                      Notes &amp; Special Requests
                    </label>
                    <textarea
                      id="reserve-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Let us know about dietary requirements or dish pre-orders (e.g. 1 Bacolod Cansi)..."
                      className="w-full rounded-xl border border-[#FAF6EC]/12 bg-[#06160D] px-4 py-3 text-sm text-[#FAF6EC] placeholder-[#6B8275] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
                    />
                  </div>

                  {/* Primary Action Buttons Row */}
                  <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                    <a
                      href={smsHref}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E8C983] via-[#DFB96F] to-[#C89B49] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#06180E] shadow-[0_10px_28px_-6px_rgba(223,185,111,0.45)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EC]"
                    >
                      <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Send via SMS</span>
                    </a>

                    <a
                      href={mailtoHref}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#FAF6EC]/16 bg-[#06160D] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F5EFE2] transition hover:border-[#DFB96F]/55 hover:bg-[#0D2B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#DFB96F]" aria-hidden="true" />
                      <span>Send via Email</span>
                    </a>
                  </div>

                  {/* Copy to Facebook Messenger Bar */}
                  <button
                    type="button"
                    onClick={handleCopyBooking}
                    className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl border border-[#FAF6EC]/10 bg-[#06160D]/70 px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#9EB3A6] transition hover:border-[#DFB96F]/40 hover:text-[#F5EFE2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                        <span className="text-emerald-300">
                          Copied — Paste in Facebook Messenger!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy to Facebook Messenger</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
