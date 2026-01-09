import Image from "next/image";

interface FooterProps {
  data: {
    logo?: string;
    copyright: string;
    socialLinks: { platform: string; url: string }[];
    funding?: {
      text: string;
      logo?: string;
    };
  };
}

export default function Footer({ data }: FooterProps) {
  const { logo, copyright, socialLinks, funding } = data;

  return (
    <footer className="bg-slate-900 text-slate-200 py-12 sm:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              {logo && (
                <Image
                  src={logo}
                  alt="Logo"
                  width={250}
                  height={50}
                  priority
                  className="grayscale mb-2"
                />
              )}
              <p className="text-slate-400 text-sm leading-snug mb-4">
                Revolutionizing agriculture with Edge AI and sustainable irrigation solutions for a water-secure future.
              </p>
              <div className="flex space-x-3 justify-center lg:justify-start">
                {socialLinks &&
                  socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                    >
                      <span className="text-xs font-bold">{link.platform.charAt(0)}</span>
                    </a>
                  ))}
              </div>
            </div>
          </div>


          {/* Quick Links Column - Placeholder for now, can be dynamic later */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="#tensiometers" className="hover:text-emerald-400 transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#pilots" className="hover:text-emerald-400 transition-colors">
                  Pilot Sites
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-emerald-400 transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="/media" className="hover:text-emerald-400 transition-colors">
                  Media Center
                </a>
              </li>
            </ul>
          </div>

          {/* Funding Acknowledgment Column */}
          <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 text-center sm:text-left">
              {funding?.logo && (
                <div className="relative w-24 h-16 flex-shrink-0 bg-white rounded-sm overflow-hidden shadow-md">
                  <Image
                    src={funding.logo}
                    alt="Funding Agency Logo"
                    fill
                    style={{ objectFit: "contain", padding: "4px" }}
                  />
                </div>
              )}
              <div>
                <h3 className="text-white font-semibold mb-2">TUNGER 2+2</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {funding?.text ||
                    "This project has received funding from the TUNGER 2+2 research and innovation programme. The German project partners are funded by the BMBF and the Tunisian project partners are funded by the Tunisian Ministry of Higher Education and Scientific Research (MoHESR) under the guideline of TUNGER 2+2."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p className="mb-4 md:mb-0">{copyright}</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
