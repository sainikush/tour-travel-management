import { Link } from "react-router-dom";
import { Award, Heart, Compass } from "lucide-react";
import CommonSection from "../shared/CommonSection";
import Newsletter from "../shared/Newsletter";

import experienceImg from "../assets/images/experience.png";
import heroImg01 from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import worldImg from "../assets/images/world.png";

const STATS = [
  { value: "12k+", label: "Successful trips" },
  { value: "2k+",  label: "Regular clients" },
  { value: "40+",  label: "Destinations" },
  { value: "15",   label: "Years experience" },
];

const VALUES = [
  {
    icon: Compass,
    title: "Locally guided",
    desc: "Every tour is led by someone who actually lives there — not a script read from a bus.",
  },
  {
    icon: Heart,
    title: "Small groups",
    desc: "We cap group sizes so you get real time with your guide and the places you visit.",
  },
  {
    icon: Award,
    title: "Honest pricing",
    desc: "The price you see is the price you pay. No hidden fees, no last-minute surprises.",
  },
];

const TEAM = [
  { name: "Vivek Saini",   role: "Founder & Lead Guide",   avatar: heroImg01 },
  { name: "Priya Kapoor",  role: "Head of Operations",     avatar: heroImg02 },
  { name: "Rohan Verma",   role: "Customer Experience",    avatar: experienceImg },
];

const About = () => {
  return (
    <>
      {/* ========= PAGE HEADER ========= */}
      <CommonSection title="About Wayfare" />

      {/* ========= INTRO ========= */}
      <section className="section bg-bg">
        <div className="container-x">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left: copy */}
            <div className="col-span-12 lg:col-span-6">
              <p className="eyebrow mb-3">Our story</p>

              <h2 className="mb-5 max-w-lg">
                We started Wayfare because travel deserved better
              </h2>

              <p className="max-w-prose mb-4">
                In 2011, we took our first small group through the Himalayas.
                Twelve people, one guide, and a promise: no rushing, no
                filler stops, no hidden fees. That trip is still the
                template for everything we run today.
              </p>

              <p className="max-w-prose">
                Fifteen years later, we've taken over twelve thousand
                travellers across forty destinations — but the promise hasn't
                changed. Real places, real people, and the time to actually
                enjoy them.
              </p>
            </div>

            {/* Right: image collage */}
            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={heroImg01}
                      alt="Wayfare travellers"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-5">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-sm mt-10">
                    <img
                      src={experienceImg}
                      alt="Guided experience"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========= STATS BAND ========= */}
      <section className="bg-primary text-text-inverse">
        <div className="container-x py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-display font-semibold mb-2">
                  {s.value}
                </p>
                <p className="text-sm text-text-inverse/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= WHAT MAKES US DIFFERENT ========= */}
      <section className="section bg-surface border-y border-border">
        <div className="container-x">
          <header className="max-w-prose mb-10">
            <p className="eyebrow mb-3">What makes us different</p>
            <h2>Three things we refuse to compromise on</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6">
                <div className="w-12 h-12 rounded-full bg-secondary-soft
                                flex items-center justify-center mb-4">
                  <Icon size={22} className="text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-medium mb-2">{title}</h3>
                <p className="text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= MISSION QUOTE ========= */}
      <section className="section bg-secondary-soft">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src={worldImg}
              alt=""
              className="h-6 w-auto mx-auto mb-6 opacity-70"
            />

            <blockquote className="font-display text-2xl md:text-3xl text-text leading-snug mb-6">
              "Travel should leave you with memories, not a checklist."
            </blockquote>

            <p className="text-sm text-text-muted">
              — Vivek Saini, Founder
            </p>
          </div>
        </div>
      </section>

      {/* ========= TEAM ========= */}
      <section className="section bg-bg">
        <div className="container-x">
          <header className="max-w-prose mb-10">
            <p className="eyebrow mb-3">The team</p>
            <h2>The people behind your trips</h2>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="card p-6 text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4
                                border-2 border-secondary-soft">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base font-medium mb-1">{member.name}</h3>
                <p className="text-sm text-text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= CTA ========= */}
      <section className="section bg-surface border-y border-border">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-3">Ready to go?</p>
            <h2 className="mb-4">Browse our tours and pick your next trip</h2>
            <p className="mb-8">
              Forty destinations, small groups, and local guides who know every
              back road. Come see why our travellers keep coming back.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/tours" className="btn-primary">
                Browse tours
              </Link>
              <Link to="/home" className="btn-outline">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default About;