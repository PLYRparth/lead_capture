export default function Footer() {
  return (
    <footer className="bg-canvas-parchment text-ink-muted-80 pt-section pb-[64px] px-4 border-t border-divider-soft">
      <div className="w-full max-w-[980px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[12px] font-text mb-12">
          <div>
            <h3 className="font-semibold text-ink mb-2">Platform</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="hover:underline">Features</a></li>
              <li><a href="#" className="hover:underline">Integrations</a></li>
              <li><a href="#" className="hover:underline">Security</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ink mb-2">Resources</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="hover:underline">Documentation</a></li>
              <li><a href="#" className="hover:underline">API Reference</a></li>
              <li><a href="#" className="hover:underline">Guides</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ink mb-2">Company</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ink mb-2">Legal</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-divider-soft flex flex-col md:flex-row items-center justify-between gap-4 text-[12px]">
          <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
            Built for Digital Heroes Training Task
          </a>
        </div>
      </div>
    </footer>
  );
}
