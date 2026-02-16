import { Users, Heart, Building2, Award } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const highlights = [
  {
    icon: Users,
    number: 125000,
    suffix: '+',
    label: 'Registered Donors',
    description: 'Generous individuals committed to saving lives',
  },
  {
    icon: Heart,
    number: 450000,
    suffix: '+',
    label: 'Lives Saved',
    description: 'Through successful blood transfusions',
  },
  {
    icon: Building2,
    number: 350,
    suffix: '+',
    label: 'Hospitals Connected',
    description: 'Nationwide network of partner facilities',
  },
  {
    icon: Award,
    number: 25,
    suffix: ' Years',
    label: 'Of Service',
    description: 'Dedicated to community health since 2001',
  },
];

function useCountUp(end: number, duration: number = 3000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - startValue) + startValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, startCounting]);

  return count;
}

function HighlightCard({ highlight, index }: { highlight: typeof highlights[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = highlight.icon;
  const count = useCountUp(highlight.number, 3000, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
          <Icon className="w-8 h-8 text-red-600" />
        </div>
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {formatNumber(count)}
          {highlight.suffix}
        </div>
        <div className="text-lg font-semibold text-gray-900 mb-2">
          {highlight.label}
        </div>
        <div className="text-sm text-gray-600">
          {highlight.description}
        </div>
      </div>
    </div>
  );
}

export function AboutImpactHighlights() {
  return (
    <section className="bg-gradient-to-br from-red-50 to-red-100/50 py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every number represents lives touched, families reunited, and hope restored
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} highlight={highlight} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}