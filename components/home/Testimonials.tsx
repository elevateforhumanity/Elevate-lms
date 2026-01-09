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
      name: "Maria Rodriguez",
      role: "Skilled Trades Graduate",
      image: "/testimonial-female-trades.jpg"
    },
    {
      quote: "No cost, no debt, and a real career path. This changed everything for me.",
      name: "David Chen",
      role: "Technology Graduate",
      image: "/testimonial-david-chen.jpg"
    }
  ];

  return (
    <section className="bg-white py-8 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-16 text-center">
          What Students Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 md:p-8 rounded-lg">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-lg overflow-hidden mb-4 shadow-lg mx-auto">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                  />
                </div>
                <div>
                  <p className="text-lg md:text-xl font-bold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-base md:text-lg text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-base md:text-xl text-gray-700 leading-relaxed text-center">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
