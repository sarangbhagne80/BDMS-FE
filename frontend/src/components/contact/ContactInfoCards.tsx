import { Phone, Mail, MapPin } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '916 79799 18-HELP',
    subtext: 'Mon-Sat: 8 AM - 8 PM',
    link: 'tel:1-800-BLOOD-HELP',
    color: 'red',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'sarangbhagne80@gmail.com',
    subtext: 'We respond within 24 hours',
    link: 'mailto:sarangbhagne80@gmail.com',
    color: 'blue',
  },
  {
    icon: MapPin,
    title: 'Location',
    content: '123 Life Street, Health City',
    subtext: 'Visit our main office',
    link: '#',
    color: 'green',
  },
];

export function ContactInfoCards() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the most convenient way to reach us
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          const colorClasses = {
            red: 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white',
            blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
            green: 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white',
          };
          
          return (
            <a
              key={index}
              href={info.link}
              className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300 ${colorClasses[info.color as keyof typeof colorClasses]}`}>
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {info.title}
              </h3>
              <p className="text-lg font-medium text-gray-800 mb-2">
                {info.content}
              </p>
              <p className="text-sm text-gray-600">
                {info.subtext}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
}
