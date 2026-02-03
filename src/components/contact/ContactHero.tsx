import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-white via-red-50/30 to-red-50/50 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            <h1 className="text-6xl font-bold text-gray-900 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Have a question or need assistance? We're here to help. Reach out to us and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-gray-700">Average response time: 2-4 hours</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-gray-700">Support available Monday - Saturday</p>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVscCUyMGhlYWx0aGNhcmUlMjBzdXBwb3J0fGVufDF8fHx8MTc2ODg5MTM0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Customer support and communication"
                className="w-full h-[400px] object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full bg-blue-100 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
