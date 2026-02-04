import { AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export function EmergencyContactNotice() {
  const navigate = useNavigate();
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-16">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Need Blood Urgently?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                If you need blood for a patient, please use our dedicated blood request form. 
                We'll connect you with donors much faster than through general contact.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/need-blood')}
            className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            Request Blood
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
