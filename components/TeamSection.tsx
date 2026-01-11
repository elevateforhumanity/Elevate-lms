import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Elizabeth Greene",
    title: "Founder & Executive Director",
    image: "/images/elizabeth-greene-founder.jpg",
    bio: "Elizabeth founded Elevate for Humanity with a mission to connect everyday people to free workforce training that leads to real careers.",
  },
  {
    name: "Carlina Wilkes",
    title: "Chief Administrative & Compliance Officer (CACO)",
    image: "/images/carlina-wilkes.jpg",
    bio: "[Bio Content - to be added]",
  },
  {
    name: "Sharon Douglas",
    title: "Director of Healthcare & Administrative Programs, Grant Compliance & Funding",
    image: "/images/sharon-douglas.jpg",
    bio: "[Bio Content - to be added]",
  },
  {
    name: "Jozanna George",
    title: "Director of Enrollment & Beauty Industry Programs",
    image: "/images/jozanna-george.jpg",
    bio: "[Bio Content - to be added]",
  },
  {
    name: "Ameco Martin",
    title: "Director of Staffing",
    image: "/images/ameco-martin.jpg",
    bio: "[Bio Content - to be added]",
  },
  {
    name: "Leslie Wafford",
    title: "Director of Housing & Supportive Services",
    image: "/images/leslie-wafford.jpg",
    bio: "[Bio Content - to be added]",
  },
  {
    name: "Alina Smith",
    title: "Director of Behavioral Health Services (PMHNP)",
    image: "/images/alina-smith.jpg",
    bio: "[Bio Content - to be added]",
  },
  {
    name: "Clystjah Woodley",
    title: "Lead Life Coach & Personal Development Specialist",
    image: "/images/clystjah-woodley.jpg",
    bio: "[Bio Content - to be added]",
  },
  {
    name: "Delores Reynolds",
    title: "Social Media & Digital Engagement Coordinator",
    image: "/images/delores-reynolds.jpg",
    bio: "[Bio Content - to be added]",
  },
];

export default function TeamSection() {
  return (
    <section className="py-20   ">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-3">
            Our Team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Meet the People Behind the Mission
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Our dedicated team works every day to connect individuals with life-changing career opportunities through free workforce training.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image - Professional Headshot Size */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <Image loading="lazy"
                  src={member.image}
                  alt={`${member.name} - ${member.title}`}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-teal-600 mb-3">
                  {member.title}
                </p>
                <p className="text-sm text-black leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-black mb-6">
            Want to join our mission to elevate communities through workforce development?
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl"
          >
            View Career Opportunities
          </Link>
        </div>
      </div>
    </section>
  );
}
