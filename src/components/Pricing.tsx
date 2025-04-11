'use client';

const plans = [
  {
    name: 'Basic',
    price: '$9.99',
    features: [
      'HD Streaming',
      '1 Device at a time',
      'Limited Content',
      'Standard Support'
    ],
    buttonText: 'Get Started'
  },
  {
    name: 'Premium',
    price: '$19.99',
    features: [
      '4K Streaming',
      '4 Devices at a time',
      'All Content',
      'Priority Support',
      'Offline Downloads'
    ],
    buttonText: 'Get Started',
    popular: true
  },
  {
    name: 'Family',
    price: '$29.99',
    features: [
      '4K Streaming',
      '6 Devices at a time',
      'All Content',
      '24/7 Support',
      'Offline Downloads',
      'Kids Profile'
    ],
    buttonText: 'Get Started'
  }
];

export default function Pricing() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-lg shadow-sm divide-y divide-gray-200 ${
                plan.popular ? 'border-primary' : 'border-gray-200'
              }`}
            >
              <div className="p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  {plan.name}
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  {plan.price}
                  <span className="text-gray-400">/month</span>
                </p>
                <button
                  className={`mt-8 block w-full rounded-md py-2 text-sm font-semibold text-white ${
                    plan.popular ? 'bg-primary' : 'bg-gray-800'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 