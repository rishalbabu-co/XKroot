import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, ArrowRight, PhoneCall } from 'lucide-react';
import PhonePePayment from '../components/payment/PhonePePayment';

const PLANS = [
  {
    name: 'Basic',
    price: 2999,
    description: 'Perfect for small businesses and startups',
    features: [
      { name: 'Up to 5 job postings', included: true },
      { name: 'Basic candidate search', included: true },
      { name: 'Email support', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Custom branding', included: false },
      { name: 'Priority support', included: false },
      { name: 'Advanced analytics', included: false },
      { name: 'API access', included: false },
    ],
  },
  {
    name: 'Intermediate',
    price: 6999,
    description: 'Great for growing companies',
    popular: true,
    features: [
      { name: 'Up to 15 job postings', included: true },
      { name: 'Advanced candidate search', included: true },
      { name: 'Priority email support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Custom branding', included: true },
      { name: 'Bulk job posting', included: true },
      { name: 'API access', included: false },
      { name: 'Dedicated account manager', included: false },
    ],
  },
  {
    name: 'Advanced',
    price: 9999,
    description: 'For organizations with advanced needs',
    features: [
      { name: 'Unlimited job postings', included: true },
      { name: 'Advanced candidate search', included: true },
      { name: '24/7 priority support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Custom branding', included: true },
      { name: 'Bulk job posting', included: true },
      { name: 'API access', included: true },
      { name: 'Dedicated account manager', included: true },
    ],
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    features: [
      { name: 'Everything in Advanced', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Custom workflows', included: true },
      { name: 'SLA guarantees', included: true },
      { name: 'Multiple teams', included: true },
      { name: 'Advanced security', included: true },
      { name: 'Custom reporting', included: true },
      { name: 'Dedicated support team', included: true },
    ],
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleSelectPlan = (planName: string) => {
    if (planName === 'Enterprise') {
      // Open contact form or redirect to contact page
      navigate('/contact');
      return;
    }
    setSelectedPlan(planName);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    // Here you would typically:
    // 1. Update user's subscription in the database
    // 2. Show a success message
    // 3. Redirect to dashboard
    navigate('/dashboard');
  };

  if (showPayment && selectedPlan) {
    const plan = PLANS.find(p => p.name === selectedPlan);
    if (!plan?.price) return null;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-20 pb-12">
        <div className="max-w-lg mx-auto px-4">
          <PhonePePayment
            amount={plan.price}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setShowPayment(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose the perfect plan for your recruitment needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white dark:bg-dark-800 rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-indigo-600 dark:ring-indigo-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-indigo-600 text-white text-sm text-center py-1">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 min-h-[48px]">
                  {plan.description}
                </p>
                <div className="mt-4">
                  {plan.price ? (
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ₹{plan.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                        /month
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <PhoneCall className="h-5 w-5 text-indigo-600" />
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Book a Demo
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`mt-6 w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                    plan.name === 'Enterprise'
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  } transition-colors duration-200`}
                >
                  <span>{plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 dark:text-gray-600 mt-0.5" />
                      )}
                      <span className="ml-3 text-gray-600 dark:text-gray-300">
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We accept all major credit cards, debit cards, and UPI payments through PhonePe.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}