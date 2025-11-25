import { Leaf } from "lucide-react";

export default function Footer({ heroHeading }: { heroHeading: string }) {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-6 h-6 text-emerald-500" />
              <span className="text-xl font-bold">{heroHeading}</span>
            </div>
            <p className="text-gray-400 text-sm">
              Revolutionizing agricultural water management through IoT and AI innovation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#tensiometers" className="hover:text-emerald-500 transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#pilots" className="hover:text-emerald-500 transition-colors">
                  Pilots
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-emerald-500 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/media" className="hover:text-emerald-500 transition-colors">
                  Media
                </a>
              </li>
              <li>
                <a href="/media" className="hover:text-emerald-500 transition-colors">
                  Publications
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-400">
              For inquiries about {heroHeading} technology and partnerships, please reach out to our team.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 {heroHeading} Project. All rights reserved. EU Horizon 2020 Initiative.</p>
        </div>
      </div>
    </footer>
  );
}
