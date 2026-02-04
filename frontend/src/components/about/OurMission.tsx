import { ImageWithFallback } from '../figma/ImageWithFallback';

export function OurMission() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="grid grid-cols-2 gap-16 items-center">
        {/* Left Side - Content */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Our Mission & Vision
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To save lives by ensuring a safe, reliable, and sufficient blood supply for patients in need. We strive to make blood donation accessible, convenient, and rewarding for every eligible donor while maintaining the highest standards of safety and quality.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-3">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                A world where no patient suffers or dies due to lack of safe blood. We envision a community where blood donation is a fundamental part of civic responsibility, and every person understands the life-saving impact of their contribution.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-3">Our Values</h3>
              <p className="text-gray-700 leading-relaxed">
                Compassion, integrity, excellence, and collaboration guide everything we do. We believe in treating every donor with respect, maintaining transparency in our operations, and working tirelessly to serve our communities with dedication and care.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1589104759909-e355f8999f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWlzc2lvbiUyMHRlYW13b3JrfGVufDF8fHx8MTc2ODcxOTUyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Healthcare mission and teamwork"
              className="w-full h-[500px] object-cover"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -z-10 -top-8 -right-8 w-full h-full bg-red-100 rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
}
