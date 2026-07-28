import React from "react";
import { VehicleType, getVehicleColorScheme } from "../utils/vehicleAvatars";

interface VehicleCardPreviewProps {
  type: VehicleType;
  regionLevel?: string;
}

export const VehicleCardPreview: React.FC<VehicleCardPreviewProps> = ({ type, regionLevel }) => {
  const c = getVehicleColorScheme(regionLevel);

  if (type === "person") {
    // 3D Traveler Character Preview
    return (
      <div className="relative w-20 h-24 flex flex-col items-center justify-center select-none py-1 person-avatar-body">
        {/* Soft shadow under feet */}
        <div className="absolute bottom-1 w-12 h-2.5 bg-slate-400/20 rounded-full blur-[2px]" />

        {/* Cap/Hat */}
        <div className="w-9 h-4 rounded-t-full relative z-20 flex items-center justify-center border border-white/40 shadow-xs" style={{ backgroundColor: c.primary }}>
          <div className="absolute -bottom-0.5 w-11 h-1.5 rounded-full shadow-xs" style={{ backgroundColor: c.dark }} />
        </div>

        {/* Face */}
        <div className="w-9 h-8 bg-[#ffedd5] rounded-b-2xl border border-orange-200/80 z-10 flex flex-col items-center pt-2 relative -mt-0.5 shadow-sm">
          {/* Eyes */}
          <div className="flex justify-between w-6 px-0.5">
            <div className="w-1.5 h-2.5 bg-[#1e293b] rounded-full" />
            <div className="w-1.5 h-2.5 bg-[#1e293b] rounded-full" />
          </div>
          {/* Smile */}
          <div className="w-2.5 h-1 border-b-2 border-[#1e293b] rounded-b-full mt-0.5" />
          {/* Blush Cheeks */}
          <div className="flex justify-between w-7 absolute bottom-1.5 px-0.5">
            <div className="w-2 h-1 bg-rose-400/60 rounded-full" />
            <div className="w-2 h-1 bg-rose-400/60 rounded-full" />
          </div>
        </div>

        {/* Scarf */}
        <div className="w-10 h-3 rounded-full z-20 -mt-1 shadow-xs border border-white/40" style={{ backgroundColor: c.dark }} />

        {/* Body & Backpack */}
        <div className="relative w-9 h-5 rounded-b-xl border border-white/40 flex justify-center z-10 shadow-sm" style={{ backgroundColor: c.primary }}>
          {/* Backpack on side */}
          <div className="absolute -right-1.5 top-0 w-3.5 h-5 rounded-r-xl border border-white/40" style={{ backgroundColor: c.dark }} />
          {/* Boots */}
          <div className="flex justify-between w-6 absolute -bottom-2.5">
            <div className="w-2.5 h-2.5 bg-[#1e293b] rounded-b-md shadow-xs person-leg-left" />
            <div className="w-2.5 h-2.5 bg-[#1e293b] rounded-b-md shadow-xs person-leg-right" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "car") {
    // 3D Car Character Preview
    return (
      <div className="relative w-20 h-24 flex flex-col items-center justify-center select-none py-1">
        {/* Soft shadow */}
        <div className="absolute bottom-2 w-14 h-3 bg-slate-400/25 rounded-full blur-[2px]" />

        {/* Cabin / Windshield */}
        <div className="w-10 h-6 bg-[#0f172a] rounded-t-2xl border-2 border-white relative flex flex-col items-center justify-center z-10 shadow-xs">
          <div className="flex justify-between w-6 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.eye }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.eye }} />
          </div>
          <div className="w-2.5 h-1 border-b-2 rounded-b-full mt-0.5" style={{ borderColor: c.eye }} />
        </div>

        {/* Main Body */}
        <div className="w-14 h-7 border-2 border-white rounded-2xl relative flex items-center justify-between px-1.5 z-20 shadow-md -mt-0.5" style={{ backgroundColor: c.primary }}>
          <div className="w-3 h-3 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/40" />
          <div className="w-3 h-3 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/40" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-1.5 w-4 h-1.5 rounded-b-full border-b-2 border-white/90" />
        </div>

        {/* Wheels */}
        <div className="flex justify-between w-13 z-30 -mt-2">
          <div className="w-4 h-4 bg-[#1e293b] rounded-full border-2 border-slate-300 flex items-center justify-center shadow-xs">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          <div className="w-4 h-4 bg-[#1e293b] rounded-full border-2 border-slate-300 flex items-center justify-center shadow-xs">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "plane") {
    // 3D Side-Profile Plane Character Preview
    return (
      <div className="relative w-20 h-24 flex flex-col items-center justify-center select-none py-1">
        {/* Soft shadow */}
        <div className="absolute bottom-3 w-12 h-2.5 bg-slate-400/20 rounded-full blur-[2px]" />

        {/* Airplane 3/4 Side View Container (Tilted ~12deg up) */}
        <div className="relative flex items-center justify-center transform -rotate-12 transition-transform hover:scale-105">
          {/* Tail Fin (Back left pointing up) */}
          <div
            className="absolute -top-4 left-1 w-4 h-6 rounded-t-full rounded-bl-md shadow-xs border border-white/40 transform -rotate-12 z-0"
            style={{ backgroundColor: c.primary }}
          />

          {/* Far / Upper Wing */}
          <div
            className="absolute -top-2 left-4 w-6 h-3 rounded-full border border-white/30 transform -rotate-25 z-0"
            style={{ backgroundColor: c.dark }}
          />

          {/* Main Fuselage (Cream / White Capsule Body) */}
          <div className="w-15 h-6 bg-gradient-to-b from-slate-50 to-slate-200 border border-slate-300/80 rounded-full relative z-10 flex items-center px-1 shadow-md">
            {/* Side Passenger Window Bar */}
            <div className="w-4.5 h-1 bg-sky-300/90 rounded-full ml-2.5 border border-sky-400/50" />
            
            {/* Cockpit Front Window */}
            <div className="w-3.5 h-2.5 bg-sky-400 rounded-full ml-1 border border-white/90 shadow-xs flex items-center justify-center">
              <div className="w-1 h-1 bg-white/90 rounded-full" />
            </div>
          </div>

          {/* Near / Bottom Wing (Extending down-front) */}
          <div
            className="absolute -bottom-2 left-4 w-7 h-3.5 rounded-full border border-white/50 shadow-md transform rotate-12 z-20"
            style={{ backgroundColor: c.primary }}
          />
        </div>
      </div>
    );
  }

  // Default: Subway (지하철)
  return (
    <div className="relative w-20 h-24 flex flex-col items-center justify-center select-none py-1">
      {/* Soft shadow */}
      <div className="absolute bottom-1 w-12 h-2.5 bg-slate-400/20 rounded-full blur-[2px]" />

      {/* Train Body Cabin */}
      <div className="relative shadow-xl flex flex-col items-center w-12 h-14">
        <div className="absolute inset-0 border-2 border-white rounded-2xl flex flex-col items-center py-1 shadow-md" style={{ backgroundColor: c.primary }}>
          {/* Pantograph connector */}
          <div className="w-9 h-1 rounded-t-md -mt-2" style={{ backgroundColor: c.dark }} />
          {/* Dark Glass */}
          <div className="w-10 h-6 bg-[#0f172a] rounded-xl flex items-center justify-center mt-1 relative">
            <div className="w-1.5 h-1.5 rounded-full mx-1.5" style={{ backgroundColor: c.eye }} />
            <div className="w-1.5 h-1.5 rounded-full mx-1.5" style={{ backgroundColor: c.eye }} />
            <div className="absolute bottom-1 w-3 h-1.5 border-b-2 rounded-b-full" style={{ borderColor: c.eye }} />
          </div>
          {/* Dual Headlights */}
          <div className="flex justify-between w-9 px-1 mt-2">
            <div className="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_6px_#fef08a] border border-white/20" />
            <div className="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_6px_#fef08a] border border-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};
