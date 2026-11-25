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
  Clock,
  Phone,
  MapPin,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

const SOLIHIYA_LIGHT_BG =
  "url(\"data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%230D1C11' stroke-width='0.9'%3E%3Cpath d='M0 24H48M24 0V48M0 0L48 48M48 0L0 48' opacity='0.4'/%3E%3Crect x='12' y='12' width='24' height='24' rx='3'/%3E%3C/g%3E%3C/svg%3E\")";

const SOLIHIYA_GOLD_BG =
  "url(\"data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23DFB96F' stroke-width='0.8'%3E%3Cpath d='M0 26H52M26 0V52M0 0L52 52M52 0L0 52' opacity='0.35'/%3E%3Crect x='13' y='13' width='26' height='26' rx='3'/%3E%3C/g%3E%3C/svg%3E\")";

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
      className="relative overflow-hidden border-t border-[#DFB96F]/15 bg-[#08130B] py-16 text-[#FAF6EC] sm:py-20 lg:py-24"
    >
      {/* Subtle Ambient Warm Gold & Deep Emerald Radial Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 46% 52% at 18% 22%, rgba(223,185,111,0.08) 0%, transparent 68%), radial-gradient(ellipse 52% 58% at 84% 78%, rgba(19,35,22,0.34) 0%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          {/* Left Column: Premier Location, Hours, Warm Beige Space Card & Direct Contacts */}
          <div className="space-y-5 lg:col-span-5">
            <div>
              {/* Premier Location Pill */}
              <span className="inline-flex items-center gap-2 rounded-full border border-[#DFB96F]/30 bg-[#0B190F] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#DFB96F]">
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
            <div className="relative overflow-hidden rounded-2xl border border-[#DFB96F]/20 bg-gradient-to-b from-[#112013]/95 to-[#0A170E]/95 p-5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)]">
              {/* Subtle top champagne-gold sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#DFB96F]/45 to-transparent"
              />
              {/* Delicate corner bracket detail */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-3 h-3 w-3 rounded-tr-md border-r border-t border-[#DFB96F]/25"
              />
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#DFB96F]">
                  <Clock className="h-3.5 w-3.5 text-[#DFB96F]/85" aria-hidden="true" />
                  <span>Operating Hours</span>
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
                          <span className="rounded bg-[#DFB96F]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#DFB96F] ring-1 ring-[#DFB96F]/25">
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

            {/* Warm Cream Beige "Find Our Space" Contrast Card with Subtle Solihiya Linen & Botanical Flourish */}
            <div className="relative overflow-hidden rounded-2xl border border-[#DFB96F]/35 bg-[#F5EFE2] p-5 text-[#08130B] shadow-[0_22px_48px_-18px_rgba(0,0,0,0.6)] sm:p-6">
              {/* Whisper-subtle Solihiya woven texture */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.055]"
                style={{
                  backgroundImage: SOLIHIYA_LIGHT_BG,
                  backgroundSize: '44px 44px',
                }}
              />
              {/* Delicate botanical leaf silhouette tucked in upper-right corner */}
              <svg
                aria-hidden="true"
                viewBox="0 0 120 120"
                fill="none"
                className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 text-[#0D1C11]/[0.07]"
              >
                <path
                  d="M18 102C42 74 72 44 106 14"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M44 76C36 56 46 36 62 24M62 58C60 40 72 24 88 16M54 66C74 70 92 62 106 48M72 48C86 50 98 44 108 32"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              {/* Crisp thin warm-gold inner top accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#C29645]/45 to-transparent"
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="inline-flex items-center gap-2 font-serif text-xl font-semibold tracking-tight text-[#08130B]">
                    <MapPin className="h-4 w-4 text-[#B08334]" aria-hidden="true" />
                    <span>Find Our Space</span>
                  </h3>
                  <span className="rounded-full border border-[#0D1C11]/15 bg-[#FAF6EC]/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0D1C11]/75">
                    Km. 64
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#45564A] sm:text-[13px]">
                  {RESTAURANT_INFO.address}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[#0D1C11] px-4 py-2.5 text-xs font-bold text-[#FAF6EC] shadow-sm transition hover:bg-[#162719] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1C11]"
                  >
                    <Navigation className="h-3.5 w-3.5 text-[#DFB96F]" aria-hidden="true" />
                    <span>Google Maps</span>
                  </a>
                  <a
                    href={RESTAURANT_INFO.wazeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#0D1C11]/18 bg-[#FAF6EC]/95 px-4 py-2.5 text-xs font-bold text-[#0D1C11] transition hover:border-[#0D1C11]/40 hover:bg-[#EAE0CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1C11]"
                  >
                    <Compass className="h-3.5 w-3.5 text-[#0D1C11]" aria-hidden="true" />
                    <span>Waze</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Phone Tiles with Subtle Gold Icon Medallion */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.mobileTel}`}
                className="group relative flex items-center justify-between gap-2 overflow-hidden rounded-2xl border border-[#DFB96F]/18 bg-gradient-to-b from-[#112013]/92 to-[#0A170E]/92 p-4 transition hover:border-[#DFB96F]/45 hover:bg-[#112013] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#DFB96F]/30 to-transparent"
                />
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8DA496]">
                    Inquiries
                  </span>
                  <span className="mt-1 block truncate text-sm font-bold tabular-nums text-[#FAF6EC] transition-colors group-hover:text-[#DFB96F]">
                    {RESTAURANT_INFO.mobile}
                  </span>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DFB96F]/22 bg-[#DFB96F]/8 text-[#DFB96F] transition group-hover:bg-[#DFB96F]/16">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.landlineTel}`}
                className="group relative flex items-center justify-between gap-2 overflow-hidden rounded-2xl border border-[#DFB96F]/18 bg-gradient-to-b from-[#112013]/92 to-[#0A170E]/92 p-4 transition hover:border-[#DFB96F]/45 hover:bg-[#112013] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#DFB96F]/30 to-transparent"
                />
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8DA496]">
                    Landline
                  </span>
                  <span className="mt-1 block truncate text-sm font-bold tabular-nums text-[#FAF6EC] transition-colors group-hover:text-[#DFB96F]">
                    {RESTAURANT_INFO.landline}
                  </span>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DFB96F]/22 bg-[#DFB96F]/8 text-[#DFB96F] transition group-hover:bg-[#DFB96F]/16">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Luxury Dark Forest Green "Book a Table" Concierge Card */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-[#DFB96F]/24 bg-gradient-to-b from-[#112013]/95 via-[#0B190F]/95 to-[#0A170E]/95 p-6 shadow-[0_28px_72px_-24px_rgba(0,0,0,0.72)] sm:p-8 lg:p-9">
              {/* Luminous champagne-gold hairline sheen along top rim */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#DFB96F]/55 to-transparent"
              />
              {/* Subtle masked Solihiya weave fading gently from top-right corner */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 h-52 w-56 opacity-[0.11]"
                style={{
                  backgroundImage: SOLIHIYA_GOLD_BG,
                  backgroundSize: '48px 48px',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 85% 85% at 100% 0%, black 0%, transparent 74%)',
                  maskImage:
                    'radial-gradient(ellipse 85% 85% at 100% 0%, black 0%, transparent 74%)',
                }}
              />
              {/* Delicate fine-line gold botanical sprig tucked quietly in upper-right corner */}
              <svg
                aria-hidden="true"
                viewBox="0 0 120 120"
                fill="none"
                className="pointer-events-none absolute right-3 top-3 h-24 w-24 text-[#DFB96F]/22"
              >
                <path
                  d="M28 92C48 68 72 44 102 18"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M52 68C46 52 54 36 68 26M68 52C66 38 76 26 90 19M60 60C76 64 90 56 102 44"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              {/* Subtle architectural corner frame ticks */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3.5 left-3.5 h-3.5 w-3.5 rounded-bl-md border-b border-l border-[#DFB96F]/20"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3.5 right-3.5 h-3.5 w-3.5 rounded-br-md border-b border-r border-[#DFB96F]/20"
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
                      className="min-h-[46px] w-full rounded-xl border border-[#FAF6EC]/12 bg-[#061009] px-4 py-2.5 text-sm text-[#FAF6EC] placeholder-[#6B8275] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
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
                        className="min-h-[46px] w-full rounded-xl border border-[#FAF6EC]/12 bg-[#061009] px-4 py-2.5 text-sm text-[#FAF6EC] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
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
                          className="min-h-[46px] w-full appearance-none rounded-xl border border-[#FAF6EC]/12 bg-[#061009] pl-4 pr-10 py-2.5 text-sm text-[#FAF6EC] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
                        >
                          <option className="bg-[#0B190F]">Fri–Sun Breakfast (7:30 AM)</option>
                          <option className="bg-[#0B190F]">Early Lunch (11:00 AM)</option>
                          <option className="bg-[#0B190F]">Lunch (12:00 PM)</option>
                          <option className="bg-[#0B190F]">Afternoon Merienda (3:00 PM)</option>
                          <option className="bg-[#0B190F]">Dinner (6:30 PM)</option>
                          <option className="bg-[#0B190F]">Fri–Sun Late Dinner (8:30 PM)</option>
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
                          className="min-h-[46px] w-full appearance-none rounded-xl border border-[#FAF6EC]/12 bg-[#061009] pl-4 pr-10 py-2.5 text-sm text-[#FAF6EC] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
                        >
                          <option className="bg-[#0B190F]">1–2 Guests</option>
                          <option className="bg-[#0B190F]">3–5 Guests</option>
                          <option className="bg-[#0B190F]">6–8 Guests (Family Table)</option>
                          <option className="bg-[#0B190F]">9–15 Guests</option>
                          <option className="bg-[#0B190F]">16+ Private Event / Group</option>
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
                          className="min-h-[46px] w-full appearance-none rounded-xl border border-[#FAF6EC]/12 bg-[#061009] pl-4 pr-10 py-2.5 text-sm text-[#FAF6EC] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
                        >
                          <option className="bg-[#0B190F]">General Dining</option>
                          <option className="bg-[#0B190F]">Family Dine-In</option>
                          <option className="bg-[#0B190F]">Birthday / Celebration</option>
                          <option className="bg-[#0B190F]">Tagaytay Barkada Trip</option>
                          <option className="bg-[#0B190F]">Corporate / Group Event</option>
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
                      className="w-full rounded-xl border border-[#FAF6EC]/12 bg-[#061009] px-4 py-3 text-sm text-[#FAF6EC] placeholder-[#6B8275] transition focus:border-[#DFB96F]/65 focus:outline-none focus:ring-2 focus:ring-[#DFB96F]/25"
                    />
                  </div>

                  {/* Primary Action Buttons Row */}
                  <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                    <a
                      href={smsHref}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E8C983] via-[#DFB96F] to-[#C89B49] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#08130B] shadow-[0_10px_28px_-6px_rgba(223,185,111,0.45)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EC]"
                    >
                      <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Send via SMS</span>
                    </a>

                    <a
                      href={mailtoHref}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#FAF6EC]/16 bg-[#061009] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F5EFE2] transition hover:border-[#DFB96F]/55 hover:bg-[#112013] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#DFB96F]" aria-hidden="true" />
                      <span>Send via Email</span>
                    </a>
                  </div>

                  {/* Copy to Facebook Messenger Bar */}
                  <button
                    type="button"
                    onClick={handleCopyBooking}
                    className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl border border-[#FAF6EC]/10 bg-[#061009]/70 px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#9EB3A6] transition hover:border-[#DFB96F]/40 hover:text-[#F5EFE2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
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
