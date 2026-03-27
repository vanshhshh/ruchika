import type { Metadata } from "next";
import { HeartHandshake, Quote, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the philosophy behind Nourished with Ruchika Chawla and the personalized wellness approach that shapes every client journey.",
};

const nourishmentPillars = [
  "Thoughtfully designed nutrition plans tailored to your lifestyle",
  "An emphasis on high-quality, balanced, and nourishing foods",
  "Sustainable weight management without deprivation",
  "A seamless integration of health into your everyday life",
];

const founderPrinciples = [
  "Simplicity over complexity",
  "Sustainability over quick fixes",
  "Real results over temporary changes",
];

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-cream via-ivory/80 to-cream" />
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_top,rgba(226,211,174,0.22),transparent_72%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-sage-600">
              About Us
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-charcoal md:text-5xl">
              Where Nourishment Meets Elegance.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-olive-gray">
              Nourished with Ruchika Chawla is more than a wellness platform. It
              is a refined approach to living well.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-olive-gray">
              Founded by Ruchika Chawla, a seasoned health coach with a deep
              understanding of modern lifestyles, the brand is built on the
              philosophy that true wellness is effortless, elegant, and
              sustainable. We move away from extremes and quick fixes, and
              instead curate personalized nutrition experiences that align with
              your body, your routine, and your goals.
            </p>

            <div className="mt-8 rounded-[2rem] border border-sage-100 bg-white/80 p-6 shadow-soft backdrop-blur-sm md:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sage-700">
                <Sparkles className="h-4 w-4" />
                Luxury In Health
              </div>
              <p className="mt-4 text-base leading-relaxed text-olive-gray">
                Luxury in health is not about exclusivity. It is about
                intentional living, mindful nourishment, and lasting
                transformation.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-sage-100 bg-white p-8 shadow-medium md:p-10">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sage-700">
              <HeartHandshake className="h-4 w-4" />
              The Nourished Method
            </div>
            <p className="mt-4 text-sm leading-relaxed text-olive-gray">
              We offer a bespoke approach to wellness designed to feel
              elevated, practical, and natural to sustain.
            </p>
            <ul className="mt-6 space-y-4">
              {nourishmentPillars.map((pillar) => (
                <li
                  key={pillar}
                  className="flex items-start gap-3 text-sm leading-relaxed text-olive-gray"
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-warm-400" />
                  <span>{pillar}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-sage-100 bg-sage-50/70 p-8 shadow-soft md:p-10">
            <p className="text-xs uppercase tracking-[0.18em] text-sage-600">
              About The Founder
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal">
              Meet Ruchika Chawla
            </h2>
            <p className="mt-5 text-base leading-relaxed text-olive-gray">
              With over 17+ years of professional experience and a deep
              understanding of modern lifestyles, Ruchika brings together
              science-backed nutrition and practical living.
            </p>
            <ul className="mt-6 space-y-3">
              {founderPrinciples.map((principle) => (
                <li
                  key={principle}
                  className="flex items-start gap-3 text-sm text-olive-gray"
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-sage-500" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[1.5rem] border border-warm-200 bg-white/80 p-5 text-sm leading-relaxed text-sage-700">
              <div className="flex items-center gap-2 font-medium">
                <Quote className="h-4 w-4" />
                Founder&apos;s note
              </div>
              <p className="mt-3">
                &ldquo;You do not need to do more. You just need to do what
                works, consistently.&rdquo;
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-sage-100 bg-white p-8 shadow-soft md:p-10">
            <p className="text-xs uppercase tracking-[0.18em] text-sage-600">
              Every Journey Is Personal
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal">
              Wellness that feels natural, achievable, and elevated
            </h2>
            <p className="mt-5 text-base leading-relaxed text-olive-gray">
              Every journey with us is deeply personal. We take the time to
              understand you, your habits, your preferences, and your
              challenges, then craft a path that fits your real life.
            </p>
            <p className="mt-4 text-base leading-relaxed text-olive-gray">
              Our clients do not just lose weight. They gain clarity,
              confidence, and a renewed connection with their bodies.
            </p>
            <p className="mt-6 text-base font-medium leading-relaxed text-sage-700">
              Because when nourishment becomes a lifestyle, transformation
              becomes inevitable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
