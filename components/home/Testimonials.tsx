import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "I didn't know where to start. This program showed me exactly what to do, step by step. Now I'm certified and working.",
      name: "Sarah Johnson",
      role: "Healthcare Graduate",
      image: "/images/testimonials/testimonial-medical-assistant.png"
    },
    {
      quote: "The training was real. The credentials matter. I got hired two weeks after finishing the program.",
      name: "Marcus Williams",
      role: "Skilled Trades Graduate",
      image: "/images/testimonials/testimonial-success-story-2.png"
    },
    {
      quote: "No cost, no debt, and a real career path. This changed everything for me.",
      name: "David Chen",
      role: "Technology Graduate",
      image: "/images/testimonials/testimonial-success-story-3.png"
    }
  ];

  return (
    <section className="bg-white py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-16 text-center">
          What Students Say
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 md:p-8 rounded-lg">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-base md:text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-base md:text-xl text-gray-700 leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
