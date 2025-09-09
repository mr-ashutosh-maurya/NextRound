import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arayan Sharma",
    role: "Software Engineer",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Job Hunt helped me land my dream job in just 2 weeks! The platform is smooth and easy to use.",
    rating: 4,
  },
  {
    name: "Priya Verma",
    role: "UI/UX Designer",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    quote:
      "I found amazing opportunities here. The experience was seamless and the support team is great!",
    rating: 4,
  },
  {
    name: "Rohan Patel",
    role: "Data Scientist",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    quote:
      "The job recommendations were spot on. I highly recommend Job Hunt to anyone looking for growth.",
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <section className=" max-w-7xl mx-auto mb-10 mt-5 py-16 px-6 bg-gray-50">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-12">
        ❤️ What Our Users Say
      </h2>

      {/* Testimonial Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition flex flex-col"
          >
            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {t.role} @ {t.company}
                </p>
              </div>
            </div>

            {/* Quote */}
            <p className="mt-4 text-gray-600 text-sm leading-relaxed flex-grow">
              “{t.quote}”
            </p>

            {/* Rating */}
            <div className="flex mt-4 text-yellow-500">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
