import { Leaf } from "lucide-react";
import Image from "next/image";

interface FooterProps {
  heroHeading: string;
  data: {
    copyright: string;
    socialLinks: { platform: string; url: string }[];
    funding?: {
      text: string;
      logo: string;
    };
  };
}

export default function Footer({ heroHeading, data }: FooterProps) {
  const { copyright, socialLinks, funding } = data;

  return (
    <footer className="bg-slate-900 text-slate-200 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
                <Leaf className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                {heroHeading}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Revolutionizing agriculture with Edge AI and sustainable irrigation solutions for a water-secure future.
            </p>
            <div className="flex space-x-4">
              {socialLinks &&
                socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                  >
                    {/* Simple first letter icon as fallback, can be replaced with actual icons */}
                    <span className="text-xs font-bold">{link.platform.charAt(0)}</span>
                  </a>
                ))}
            </div>
          </div>

          {/* Quick Links Column - Placeholder for now, can be dynamic later */}
          <div className="lg:col-span-1">
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-24 h-16 flex-shrink-0 bg-blue-800 rounded-sm overflow-hidden shadow-md">
                <Image
                  src={
                    funding?.logo ||
                    "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
                  }
                  alt="EU Flag"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">EU Horizon 2020</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {funding?.text ||
                    "This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 123456."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>{copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
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
