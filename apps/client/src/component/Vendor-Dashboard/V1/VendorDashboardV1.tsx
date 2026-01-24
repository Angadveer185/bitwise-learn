"use client";

import SideBar from "@/component/general/SideBar";
import HeroSection from "./HeroSection";

export default function VendorDashboardV1() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-10 py-10">
        <HeroSection />
      </main>
    </div>
  );
}
