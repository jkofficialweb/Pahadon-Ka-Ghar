import React, { useState, useEffect } from 'react';
import {
  Mail,
  CheckCircle2,
  Sparkles,
  Gift,
  ShieldCheck,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { isValidEmail } from '../utils/newsletter.ts';

const LOCAL_STORAGE_NEWSLETTER_KEY = 'pkg_newsletter_subscriber';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Seasonal Offers',
    'Trek & Weather Guides',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedEmail, setSavedEmail] = useState<string>('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_NEWSLETTER_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setIsSubscribed(true);
          setSavedEmail(parsed.email);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setIsSubmitting(true);

    // Simulate quick instant registration
    setTimeout(() => {
      const subData = {
        email: email.trim(),
        name: name.trim() || undefined,
        topics: selectedTopics,
        subscribedAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem(LOCAL_STORAGE_NEWSLETTER_KEY, JSON.stringify(subData));
      } catch {
        // Storage unavailable
      }

      setSavedEmail(email.trim());
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail('');
      setName('');
    }, 450);
  };

  const handleReset = () => {
    setIsSubscribed(false);
    setErrorMessage(null);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 md:p-10 text-stone-200 shadow-xl relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {isSubscribed ? (
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto text-center py-4">
          <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              Subscription Active
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Welcome to the Pahadon Ka Ghar Family!
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              We have registered <strong className="text-white">{savedEmail}</strong> for our seasonal
              Kashmir Valley Notes, early-bird room tariffs, and local Sonamarg travel insights.
            </p>
          </div>

          {/* Welcome Voucher Callout */}
          <div className="bg-stone-950/80 border border-amber-600/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  Direct Guest Welcome Perk: ₹500 OFF
                </span>
                <span className="text-[11px] text-stone-400 block">
                  Use coupon code{' '}
                  <span className="font-mono text-amber-300 font-bold bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-700/50">
                    KASHMIR500
                  </span>{' '}
                  when booking directly with us.
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-[11px] text-stone-400 hover:text-white underline cursor-pointer shrink-0"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Valley Notes & Seasonal Retreat Offers</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white leading-tight">
              Kashmir Travel Tips & Secret Seasonal Tariffs
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Subscribe to receive curated itineraries (Spring almond blooms, Summer Sindh river
              angling, Autumn fiery chinars, and Winter snow wonderland), local pony trek advice, and
              exclusive subscriber tariffs up to 20% off.
            </p>

            {/* Micro Trust Bullets */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                No spam ever (1-2 emails/mo)
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Sonamarg weather alerts
              </span>
              <span>·</span>
              <span>Unsubscribe anytime</span>
            </div>
          </div>

          {/* Right Column: Interactive Subscription Form */}
          <div className="lg:col-span-6 bg-stone-950/70 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4">
            {errorMessage && (
              <div className="p-3 bg-red-950/80 border border-red-700/60 text-red-200 text-xs rounded-xl">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubscribe} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="newsletter-name" className="block text-[11px] font-semibold text-stone-300 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    id="newsletter-name"
                    type="text"
                    placeholder="e.g. Ayesha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700/80 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="newsletter-email" className="block text-[11px] font-semibold text-stone-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-stone-900 border border-stone-700/80 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Topics of Interest Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-stone-300 mb-1.5">
                  What would you like to receive?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Seasonal Offers',
                    'Trek & Weather Guides',
                    'Wazwan Recipes & Culture',
                  ].map((topic) => {
                    const isSelected = selectedTopics.includes(topic);
                    return (
                      <button
                        type="button"
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                          isSelected
                            ? 'bg-amber-900/60 border-amber-600/70 text-amber-200'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-300'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-amber-800 hover:bg-amber-700 disabled:bg-stone-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Registering...</span>
                ) : (
                  <>
                    <span>Subscribe to Kashmir Valley Notes</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
