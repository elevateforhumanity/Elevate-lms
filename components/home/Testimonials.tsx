export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
          What Students Say
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Testimonial 1 */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              "I didn't know where to start. This program showed me exactly what to do, 
              step by step. Now I'm certified and working."
            </p>
            <p className="text-lg font-semibold text-gray-900">
              — Healthcare Graduate
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              "The training was real. The credentials matter. I got hired two weeks 
              after finishing the program."
            </p>
            <p className="text-lg font-semibold text-gray-900">
              — Skilled Trades Graduate
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              "No cost, no debt, and a real career path. This changed everything for me."
            </p>
            <p className="text-lg font-semibold text-gray-900">
              — Technology Graduate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
