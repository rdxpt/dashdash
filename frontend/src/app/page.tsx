'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Brain, 
  FileText, 
  FlaskRound as Flask, 
  Lock, 
  Network, 
  Shield, 
  Stethoscope, 
  Users, 
  Workflow, 
  ArrowRight, 
  ChevronRight,
  Zap,
  LineChart,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const BrainWavesSVG = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="w-full h-64 md:h-96"
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      d="M0 100 Q 50 50, 100 100 T 200 100 T 300 100 T 400 100"
      stroke="#2D336B"
      strokeWidth="2"
      fill="none"
    />
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
      d="M0 100 Q 50 150, 100 100 T 200 100 T 300 100 T 400 100"
      stroke="#7886C7"
      strokeWidth="2"
      fill="none"
    />
  </motion.svg>
);

const features = [
  {
    icon: Brain,
    title: "Advanced AI Models",
    description: "Specialized models for EEG analysis, stroke detection, and neurodegenerative disease prediction"
  },
  {
    icon: Network,
    title: "Multi-Modal Data Fusion",
    description: "Seamless integration of MRI, CT, PET, and other imaging modalities"
  },
  {
    icon: Workflow,
    title: "Smart Workflow Automation",
    description: "Automated scheduling, reporting, and critical case alerts"
  },
  {
    icon: Shield,
    title: "Secure Data Management",
    description: "HIPAA and GDPR-compliant integration with existing EHR systems"
  }
];

const capabilities = [
  {
    icon: Zap,
    title: "Real-Time Analysis",
    description: "Instant processing of neurological data for rapid diagnosis"
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description: "AI-driven prognosis and treatment recommendations"
  },
  {
    icon: Share2,
    title: "Collaborative Platform",
    description: "Secure sharing of insights among healthcare professionals"
  }
];

const impactMetrics = [
  { value: "98%", label: "Diagnostic Accuracy" },
  { value: "60%", label: "Time Saved" },
  { value: "45%", label: "Earlier Detection" },
  { value: "100K+", label: "Patients Helped" }
];

export default function Home() {
  const router = useRouter();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
          <BrainWavesSVG />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold text-[#2D336B] tracking-tight"
            >
              Empowering Neurologists
              <span className="block text-[#7886C7]">Transforming Patient Care</span>
            </motion.h1>
            
            <motion.p
              variants={fadeIn}
              className="text-xl text-[#7886C7] max-w-3xl mx-auto"
            >
              Our platform integrates state-of-the-art AI with clinical workflows,
              providing unparalleled support in diagnosis, treatment planning, and research.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#2D336B] to-[#1E2245] hover:from-[#1E2245] hover:to-[#0F1122] text-white shadow-xl hover:shadow-2xl transition-all duration-300 group px-8 py-6 text-lg"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#A9B5DF] hover:border-[#2D336B] hover:bg-[#2D336B]/5 group px-8 py-6 text-lg transition-all duration-300"
                onClick={() => router.push('/about')}
              >
                Learn More
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-bold text-[#2D336B] mb-6"
            >
              Advanced Neurological Solutions
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-xl text-[#7886C7] max-w-2xl mx-auto"
            >
              Combining cutting-edge AI technology with clinical expertise
              for exceptional results in neurological care.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#A9B5DF]/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2D336B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <feature.icon 
                  className={`h-14 w-14 mb-4 transition-all duration-300 relative z-10 ${
                    hoveredFeature === index ? 'text-[#2D336B] scale-110' : 'text-[#A9B5DF]'
                  }`}
                />
                <h3 className="text-xl font-semibold text-[#2D336B] mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-[#7886C7] leading-relaxed relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-4 bg-[#2D336B]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-bold text-white mb-6"
            >
              Powerful Capabilities
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-xl text-[#A9B5DF] max-w-2xl mx-auto"
            >
              Experience the future of neurological care with our comprehensive suite of tools.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                className="bg-[#1E2245] rounded-2xl p-8 hover:bg-[#262B52] transition-all duration-300 border border-[#A9B5DF]/20 hover:border-[#A9B5DF]/40 group"
              >
                <div className="bg-[#2D336B] rounded-lg p-3 inline-block mb-4 group-hover:bg-[#A9B5DF] transition-colors duration-300">
                  <capability.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {capability.title}
                </h3>
                <p className="text-[#A9B5DF] leading-relaxed">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-[#2D336B] mb-2">
                  {metric.value}
                </h3>
                <p className="text-[#7886C7]">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D336B] mb-6">
            Ready to Transform Neurological Care?
          </h2>
          <p className="text-lg text-[#7886C7] mb-8 max-w-2xl mx-auto">
            Join leading neurologists who are already using our AI platform to
            improve patient outcomes and advance neurological research.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#2D336B] to-[#1E2245] hover:from-[#1E2245] hover:to-[#0F1122] text-white shadow-xl hover:shadow-2xl transition-all duration-300 group px-8 py-6 text-lg"
            onClick={handleGetStarted}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}