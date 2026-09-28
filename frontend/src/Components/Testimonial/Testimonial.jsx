import { Star } from "lucide-react";

import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Aarav Mehta",
    city: "Mumbai",
    avatar: ava01,
    rating: 5,
    text: "Booked a 7-day Bali trip — everything from airport pickup to the villa was exactly as promised. Zero surprises, which is rare.",
  },
  {
    id: 2,
    name: "Priya Kapoor",
    city: "Delhi",
    avatar: ava02,
    rating: 5,
    text: "The tour guide in Thailand was exceptional. Small group, flexible schedule, and the local food stops were the highlight.",
  },
  {
    id: 3,
    name: "Rohan Verma",
    city: "Bangalore",
    avatar: ava03,
    rating: 4,
    text: "Used them for a family trip to Switzerland. Booking was smooth and the support team actually responded fast.",
  },
];

const Testimonial = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {TESTIMONIALS.map((t) => (
        <figure key={t.id} className="card p-6 flex flex-col">
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                strokeWidth={1.75}
                className={
                  i < t.rating
                    ? "fill-accent text-accent"
                    : "text-border"
                }
              />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-text leading-relaxed mb-6 flex-1">
            "{t.text}"
          </blockquote>

          {/* Author */}
          <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-text">{t.name}</p>
              <p className="text-xs text-text-muted">{t.city}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default Testimonial;