import { Brain, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#2D336B] via-[#1E2245] to-[#0F1122] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(169, 181, 223, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(120, 134, 199, 0.3) 0%, transparent 50%)'
        }}/>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 group">
              <div className="relative">
                <Brain className="h-10 w-10 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-2xl font-bold tracking-tight">NeuroVED</span>
            </div>
            <p className="mt-6 text-sm text-gray-300 leading-relaxed">
              Revolutionizing healthcare through advanced AI technology and machine learning solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">About Us</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Services</Link></li>
              <li><Link href="/technology" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Technology</Link></li>
              <li><Link href="/case-studies" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Case Studies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services#medical-models" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Medical Models</Link></li>
              <li><Link href="/services#data-management" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Data Management</Link></li>
              <li><Link href="/services#ai-assistants" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">AI Assistants</Link></li>
              <li><Link href="/services#administration" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Administration</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-[#A9B5DF] mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm leading-relaxed">123 Medical Center Dr.</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-[#A9B5DF] group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-[#A9B5DF] group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm">contact@neuroved.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} NeuroVED. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link href="/compliance" className="text-gray-400 hover:text-white text-sm transition-colors">Compliance</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;