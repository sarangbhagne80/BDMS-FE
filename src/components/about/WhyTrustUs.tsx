import { ShieldCheck, Building2, Clock, Lock } from 'lucide-react';

const trustFactors = [
  {
    icon: ShieldCheck,
    title: 'Verified Donors',
    description: 'Rigorous screening and testing ensures the highest safety standards for all donations',
  },
  {
    icon: Building2,
    title: 'Hospital Partnerships',
    description: 'Trusted by 350+ hospitals and medical facilities across the nation',
  },
  {
    icon: Clock,
    title: '24/7 Emergency Support',
    description: 'Round-the-clock assistance for urgent blood requirements and emergencies',
  },
  {
    icon: Lock,
    title: 'Secure Data',
    description: 'Advanced encryption and privacy protection for all donor and patient information',
  },
];

export function WhyTrustUs() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Why Trust Us
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our commitment to safety, quality, and service has made us a trusted partner in healthcare
        </p>
      </div>

      <div className="grid grid-cols-4 gap-8">
        {trustFactors.map((factor, index) => {
          const Icon = factor.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {factor.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {factor.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
