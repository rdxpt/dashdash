import { Brain, Mic, Image, FileText, Sparkles } from 'lucide-react';

export default function AIAssistance() {
  const features = [
    {
      icon: Mic,
      title: "Voice Analysis",
      description: "Record patient symptoms via voice for instant AI analysis",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Image,
      title: "Vision Analysis",
      description: "Upload medical images for AI-powered diagnostics",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: FileText,
      title: "Report Generation",
      description: "Automated medical report creation with AI assistance",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Brain,
      title: "3D Visualization",
      description: "Interactive brain segmentation and analysis tools",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-[#2D336B] animate-pulse" />
        </div>
        <h2 className="text-4xl font-bold gradient-text">AI-Powered Medical Assistance</h2>
        <p className="text-lg text-[#7886C7] max-w-2xl mx-auto">
          Access advanced AI tools and resources designed specifically for doctors and neurologists
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
          >
            <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#2D336B] mb-2">{feature.title}</h3>
            <p className="text-[#7886C7]">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 