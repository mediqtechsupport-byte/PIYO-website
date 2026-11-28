import React from 'react';
import { Star, Flame, Wind, Users, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';
import { useSectionReveal } from '../hooks/useSectionReveal';

export function HeritageAndReviews() {
  const [heritageRef, heritageRevealed] = useSectionReveal(0.06);
  const [reviewsRef, reviewsRevealed] = useSectionReveal(0.06);

  return (
    <>
      {/* Negros Heritage & Tagaytay Space Section */}
      <section
        ref={heritageRef}
        id="heritage"
        className="relative flex min-h-[var(--stage-h)] flex-col justify-center overflow-hidden border-y border-[#DFB96F]/15 bg-[#0A180E]/58 py-12 text-[#FAF6EC] sm:py-16"
      >
        <div aria-hidden="true" data-page-seam className="piyo-page-seam" />
        <div data-page-stage="heritage" className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span
                data-revealed={heritageRevealed ? 'true' : 'false'}
                style={{ transitionDelay: '0ms' }}
                className="piyo-reveal inline-block rounded-full border border-[#D8B36A]/45 bg-[#08130B]/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#D8B36A]"
              >
                Our Story &amp; Atmosphere
              </span>
              <h2
                data-revealed={heritageRevealed ? 'true' : 'false'}
                style={{ transitionDelay: '65ms' }}
                className="piyo-reveal mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl"
              >
                Negros is known for many things,{' '}
                <span className="italic font-medium text-[#D8B36A]">
                  its food tells the story.
                </span>
              </h2>
              <p
                data-revealed={heritageRevealed ? 'true' : 'false'}
                style={{ transitionDelay: '125ms' }}
                className="piyo-reveal mt-3 text-sm leading-relaxed text-[#D8E3DB] sm:text-base"
              >
                Along Km. 64 of the Tagaytay–Nasugbu Highway, PIYO Grill &amp; Restaurant brings together warm Negrense hospitality and classic Filipino grill cooking — from real <em>batwan</em>-soured Bacolod Cansi and smoky Chicken Inasal to family-style Crispy Pata and Tagaytay Bulalo.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div
                  data-revealed={heritageRevealed ? 'true' : 'false'}
                  style={{ transitionDelay: '185ms' }}
                  className="piyo-reveal-scale rounded-2xl border border-white/10 bg-[#08130B]/65 p-4"
                >
                  <Wind className="h-5 w-5 text-[#D8B36A]" />
                  <h3 className="mt-2 text-sm font-bold text-[#FAF6EC]">
                    Fresh Indoor Comfort
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#CDD9D0]">
                    Our charcoal grill station is set apart from the main indoor hall so you dine comfortably smoke-free.
                  </p>
                </div>

                <div
                  data-revealed={heritageRevealed ? 'true' : 'false'}
                  style={{ transitionDelay: '245ms' }}
                  className="piyo-reveal-scale rounded-2xl border border-white/10 bg-[#08130B]/65 p-4"
                >
                  <Flame className="h-5 w-5 text-[#D8B36A]" />
                  <h3 className="mt-2 text-sm font-bold text-[#FAF6EC]">
                    Free Kansi Soup Refills
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#CDD9D0]">
                    Pair misty Tagaytay weather with steaming bowls of rich Bacolod Cansi and generous broth refills.
                  </p>
                </div>

                <div
                  data-revealed={heritageRevealed ? 'true' : 'false'}
                  style={{ transitionDelay: '305ms' }}
                  className="piyo-reveal-scale rounded-2xl border border-white/10 bg-[#08130B]/65 p-4"
                >
                  <Users className="h-5 w-5 text-[#D8B36A]" />
                  <h3 className="mt-2 text-sm font-bold text-[#FAF6EC]">
                    6–8 Seater Family Tables
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#CDD9D0]">
                    Spacious seating for parents, barkada road trips, weekend breakfasts, and private celebrations.
                  </p>
                </div>
              </div>
            </div>

            {/* Collage Showcase */}
            <div className="grid grid-cols-2 gap-3 lg:col-span-6">
              <div className="space-y-3">
                <div
                  data-revealed={heritageRevealed ? 'true' : 'false'}
                  style={{ transitionDelay: '110ms' }}
                  className="piyo-reveal-scale overflow-hidden rounded-3xl border border-[#D8B36A]/30 bg-[#08130B]"
                >
                  <img
                    src="./images/dish-silog.jpg"
                    alt="A Taste of Home Filipino breakfast silog plate"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="font-serif text-base font-semibold text-[#FAF6EC]">
                      A Taste of Home
                    </p>
                    <p className="text-[11px] text-[#D8B36A]">
                      Fri–Sun Early Open at 7:00 AM
                    </p>
                  </div>
                </div>
                <div
                  data-revealed={heritageRevealed ? 'true' : 'false'}
                  style={{ transitionDelay: '220ms' }}
                  className="piyo-reveal-scale overflow-hidden rounded-3xl border border-[#D8B36A]/30 bg-[#08130B]"
                >
                  <img
                    src="./images/dish-refreshers.jpg"
                    alt="PIYO Tropical Fruit Coolers and Shakes"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div
                  data-revealed={heritageRevealed ? 'true' : 'false'}
                  style={{ transitionDelay: '170ms' }}
                  className="piyo-reveal-scale overflow-hidden rounded-3xl border border-[#D8B36A]/30 bg-[#08130B]"
                >
                  <img
                    src="./images/dish-pasta-pizza.jpg"
                    alt="Creamy Fettuccine and Filipino Pork Adobo Pizza"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div
                  data-revealed={heritageRevealed ? 'true' : 'false'}
                  style={{ transitionDelay: '280ms' }}
                  className="piyo-reveal-scale overflow-hidden rounded-3xl border border-[#D8B36A]/30 bg-[#08130B]"
                >
                  <img
                    src="./images/dish-specials.jpg"
                    alt="Crispy Pata and Sizzling Sisig platter"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="font-serif text-base font-semibold text-[#FAF6EC]">
                      Sharing Platters
                    </p>
                    <p className="text-[11px] text-[#D8B36A]">
                      Crispy Pata, Ribs &amp; Sizzling Plates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="piyo-snap-end pointer-events-none h-px w-full" />
      </section>

      {/* Customer Testimonials (Honoring PIYO's Torn-Parchment Over Tagaytay Pine Forest!) */}
      <section
        ref={reviewsRef}
        id="reviews"
        className="relative flex min-h-[var(--stage-h)] flex-col justify-center overflow-hidden bg-[#0C1B11]/54 py-12 text-[#FAF6EC] sm:py-16"
      >
        <div aria-hidden="true" data-page-seam className="piyo-page-seam" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(216,179,106,0.14),transparent_50%)]" />
        <div data-page-stage="reviews" className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div
            className="piyo-reveal text-center"
            data-revealed={reviewsRevealed ? 'true' : 'false'}
          >
            <p className="font-serif text-3xl italic font-medium text-[#FAF6EC] sm:text-4xl">
              Customer testimonial
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#D8B36A]">
              Dine in at PIYO Grill &amp; Restaurant
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-9 md:grid-cols-3 md:gap-6">
            {TESTIMONIALS.map((item, idx) => (
              <article
                key={item.id}
                data-revealed={reviewsRevealed ? 'true' : 'false'}
                style={{ transitionDelay: `${85 + idx * 85}ms` }}
                className="piyo-reveal-scale parchment-note relative flex flex-col justify-between rounded-2xl border border-[#E2D6BC] p-5 text-[#222B23] shadow-xl sm:p-6"
              >
                {/* Decorative Masking Tape Top Accent */}
                <span
                  aria-hidden="true"
                  className="mx-auto -mt-8 mb-3 block h-4 w-24 rotate-[-1.5deg] rounded-xs bg-[#E7DFCD]/85 shadow-xs backdrop-blur-xs"
                />

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-[#D8A138] text-[#D8A138]"
                        />
                      ))}
                    </div>
                    <Quote className="h-4 w-4 text-[#0D1C11]/35" />
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[#2C362D]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-5 border-t border-[#0D1C11]/15 pt-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-serif text-lg font-bold text-[#0D1C11]">
                        — {item.author}
                      </p>
                      <p className="text-[11px] font-medium text-[#4A5E4E]">
                        {item.source}
                      </p>
                    </div>
                    <img
                      src="./logo.svg"
                      alt="PIYO Verified Seal"
                      className="h-9 w-9 rounded-full ring-1 ring-[#0D1C11]/25"
                    />
                  </div>
                  <p className="mt-2 rounded-lg bg-[#0D1C11]/8 px-2.5 py-1 text-[11px] font-semibold text-[#0D1C11]">
                    Food: {item.ratings.food} · Service: {item.ratings.service} · Atmosphere:{' '}
                    {item.ratings.atmosphere}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="piyo-snap-end pointer-events-none h-px w-full" />
      </section>
    </>
  );
}
