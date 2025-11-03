'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Bell, Brain, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import Dash, { Patient, Appointment } from './Dash';
import RightBar from './RightBar';
import initialPatients from "../data/patients";
import appointmentsData from "../data/appointments";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [gradioUrl, setGradioUrl] = useState("http://localhost:7860"); // Default Gradio URL
  const [segmentationModelUrl, setSegmentationModelUrl] = useState("http://localhost:3003"); // 3D Segmentation Model URL
  
  // State for patients and appointments
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData);
  const [activeView, setActiveView] = useState<"dash" | "ai" | "data">("dash");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 ml-20 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-[#2D336B] hover:text-[#1E2245] flex items-center group transition-all">
              <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Home</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-xl font-bold text-[#2D336B] ml-2">
              {activeView === "dash" && "Patient Dashboard"}
              {activeView === "ai" && "AI Doctor"}
              {activeView === "data" && "3D Brain Segmentation"}
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-600 hover:text-[#2D336B] transition-colors rounded-lg hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600 hidden md:block">
                {user?.email || 'Guest User'}
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2D336B] to-[#7886C7] flex items-center justify-center text-white font-semibold hover:scale-110 transition-transform cursor-pointer">
                {user?.name?.[0] || <User className="h-5 w-5" />}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <RightBar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <div className="ml-20 p-6 flex-1">
        <div className="mb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-xl shadow-lg border border-white/50 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-[#2D336B] mb-3">Welcome back, {user?.name || 'User'}</h2>
          <p className="text-[#7886C7] text-lg">
            {activeView === "dash" && "Manage your patients and appointments with ease"}
            {activeView === "ai" && "Use AI to assist with diagnoses and treatments"}
            {activeView === "data" && "Visualize and analyze 3D brain segmentation models"}
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="mt-6">
          {/* Patient Management Section */}
          {activeView === "dash" && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <Dash 
                  patients={patients} 
                  setPatients={setPatients} 
                  appointments={appointments} 
                  setAppointments={setAppointments} 
                />
              </div>
            </div>
          )}
          
          {/* AI Doctor Section */}
          {activeView === "ai" && (
            <Card className="shadow-xl border-0 rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b">
                <CardTitle className="flex items-center text-lg">
                  <span className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl mr-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.25m0 0v5.8a2.25 2.25 0 01-1.5 2.25m0 0a4.5 4.5 0 01-1.5.25m-4.5-9.5a2.25 2.25 0 00-1.5-2.25m1.5 2.25a4.5 4.5 0 001.5.25m7.5-3a4.5 4.5 0 00-4.5 0m4.5 0a4.5 4.5 0 01-4.5 0" />
                    </svg>
                  </span>
                  AI Doctor with Vision & Voice
                </CardTitle>
                <CardDescription className="text-base">
                  Speak your symptoms and upload images for AI-powered medical analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[700px] overflow-hidden bg-gray-50">
                  <iframe 
                    src={gradioUrl} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0"
                    title="AI Doctor"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t">
                  <p className="text-sm text-gray-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
                    </svg>
                    <span className="font-medium">Server Status:</span>&nbsp;Running at {gradioUrl}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Data Analytics Section with 3D Segmentation Model */}
          {activeView === "data" && (
            <div className="space-y-6">
              <Card className="shadow-xl border-0 rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b">
                  <CardTitle className="flex items-center text-lg">
                    <span className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl mr-3 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                      </svg>
                    </span>
                    3D Brain Segmentation Model
                  </CardTitle>
                  <CardDescription className="text-base">
                    Interactive 3D visualization for neurological analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="w-full h-[700px] overflow-hidden bg-gray-50">
                    <iframe 
                      src={segmentationModelUrl} 
                      width="100%" 
                      height="100%" 
                      frameBorder="0"
                      title="3D Brain Segmentation"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-t">
                    <p className="text-sm text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
                      </svg>
                      <span className="font-medium">Server Status:</span>&nbsp;Running at {segmentationModelUrl}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-900">Total Patients</h3>
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-blue-900 mb-2">{patients.length}</p>
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="text-green-600 font-semibold mr-1">↑ +2</span> this week
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-xl border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-purple-900">Brain Scans</h3>
                    <div className="bg-purple-500 p-2 rounded-lg">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-purple-900 mb-2">
                    {patients.reduce((sum, p) => sum + (p.reports ? p.reports.length : 0), 0)}
                  </p>
                  <p className="text-sm text-purple-700 flex items-center">
                    <span className="text-green-600 font-semibold mr-1">↑ +5</span> this month
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-100 p-8 rounded-xl border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-green-900">Models</h3>
                    <div className="bg-green-500 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-green-900 mb-2">12</p>
                  <p className="text-sm text-green-700 flex items-center">
                    <span className="text-green-600 font-semibold mr-1">↑ +3</span> this week
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
