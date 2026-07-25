import { CheckCircle2, Zap, Shield } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: "Instant Capture",
      desc: "Zero latency form submissions with real-time validation to ensure every lead counts.",
      icon: <Zap className="w-8 h-8 text-primary mb-4" />
    },
    {
      title: "Pristine Data",
      desc: "Robust server-side verification keeps your pipeline clean and actionable.",
      icon: <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
    },
    {
      title: "Secure Storage",
      desc: "Enterprise-grade database modeling built on MongoDB Atlas.",
      icon: <Shield className="w-8 h-8 text-primary mb-4" />
    }
  ];

  return (
    <section id="features" className="bg-surface-tile-1 text-on-dark py-section px-4">
      <div className="max-w-[1024px] mx-auto">
        <div className="text-center mb-[80px]">
          <h2 className="text-[40px] leading-[1.1] font-semibold tracking-tight-hero mb-4">
            Pro capabilities.
          </h2>
          <p className="text-[21px] text-body-muted max-w-[600px] mx-auto">
            Everything you need to scale your outreach, built into a minimal footprint.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-surface-tile-2 rounded-lg p-[32px] flex flex-col items-start border border-surface-tile-3">
              {feature.icon}
              <h3 className="text-[21px] font-semibold tracking-tight-display mb-2">{feature.title}</h3>
              <p className="text-[17px] text-body-muted leading-[1.47]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
