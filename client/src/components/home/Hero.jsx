export default function Hero() {
  return (
    <section className="bg-canvas text-ink py-[120px] px-4 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <div className="max-w-[980px] w-full mx-auto flex flex-col items-center">
        <h1 className="text-[56px] leading-[1.07] font-semibold tracking-tight-hero mb-6">
          Capture leads.<br />Without the clutter.
        </h1>
        <p className="text-[28px] leading-[1.14] font-normal tracking-[0.196px] text-ink max-w-[600px] mb-10">
          The essential tool for high-performing teams to capture, organize, and close.
        </p>
        <div className="flex items-center gap-4">
          <a href="#contact" className="btn-primary text-[17px] py-[14px] px-[28px]">
            Capture a lead
          </a>
          <a href="#features" className="btn-secondary-pill text-[17px] py-[14px] px-[28px] group">
            Learn more
            <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">›</span>
          </a>
        </div>
      </div>
    </section>
  );
}
