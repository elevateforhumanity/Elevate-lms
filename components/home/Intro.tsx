import Image from 'next/image';

export default function Intro() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Elevate for Humanity
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              A regulated workforce development and credentialing institute connecting 
              students to approved training, recognized credentials, and real career pathways.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/homepage/students.jpg"
              alt="Students in training"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
