/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VehicleType = "subway" | "person" | "car" | "plane";

export interface VehicleInfo {
  id: VehicleType;
  name: string;
  subtitle: string;
}

export const VEHICLE_LIST: VehicleInfo[] = [
  { id: "subway", name: "지하철", subtitle: "쾌적한 꼬마 지하철" },
  { id: "person", name: "여행자", subtitle: "배낭을 멘 꼬마 여행자" },
  { id: "car", name: "자동차", subtitle: "듬직한 꼬마 자동차" },
  { id: "plane", name: "비행기", subtitle: "하늘을 나는 꼬마 비행기" },
];

export interface VehicleColorScheme {
  primary: string;      // Main body color hex
  dark: string;         // Dark accent hex
  light: string;        // Light tint hex
  glass: string;        // Glass / detail hex
  eye: string;          // Eye / highlight hex
  tailwindBorder: string;
  tailwindBg: string;
  tailwindText: string;
  tailwindPill: string;
  tailwindRipple: string;
}

export function getVehicleColorScheme(regionLevel?: string): VehicleColorScheme {
  if (regionLevel === "japan") {
    return {
      primary: "#f43f5e",
      dark: "#881337",
      light: "#ffe4e6",
      glass: "#fb7185",
      eye: "#fecdd3",
      tailwindBorder: "border-rose-500",
      tailwindBg: "bg-rose-50 dark:bg-rose-950/40",
      tailwindText: "text-rose-600 dark:text-rose-400",
      tailwindPill: "bg-rose-600 text-white",
      tailwindRipple: "bg-rose-500/30",
    };
  }
  if (regionLevel === "usa") {
    return {
      primary: "#2563eb",
      dark: "#1e3a8a",
      light: "#dbeafe",
      glass: "#60a5fa",
      eye: "#bfdbfe",
      tailwindBorder: "border-blue-500",
      tailwindBg: "bg-blue-50 dark:bg-blue-950/40",
      tailwindText: "text-blue-600 dark:text-blue-400",
      tailwindPill: "bg-blue-600 text-white",
      tailwindRipple: "bg-blue-500/30",
    };
  }
  if (regionLevel === "china") {
    return {
      primary: "#f59e0b",
      dark: "#78350f",
      light: "#fef3c7",
      glass: "#fbbf24",
      eye: "#fef08a",
      tailwindBorder: "border-amber-500",
      tailwindBg: "bg-amber-50 dark:bg-amber-950/40",
      tailwindText: "text-amber-800 dark:text-amber-400",
      tailwindPill: "bg-amber-500 text-slate-950 font-black",
      tailwindRipple: "bg-amber-500/30",
    };
  }
  if (regionLevel === "world") {
    return {
      primary: "#64748b",
      dark: "#1e293b",
      light: "#f1f5f9",
      glass: "#94a3b8",
      eye: "#cbd5e1",
      tailwindBorder: "border-slate-500",
      tailwindBg: "bg-slate-100 dark:bg-slate-800/50",
      tailwindText: "text-slate-700 dark:text-slate-300",
      tailwindPill: "bg-slate-700 text-white",
      tailwindRipple: "bg-slate-500/30",
    };
  }
  // Default: Korea (Emerald)
  return {
    primary: "#10b981",
    dark: "#047857",
    light: "#d1fae5",
    glass: "#34d399",
    eye: "#a7f3d0",
    tailwindBorder: "border-emerald-500",
    tailwindBg: "bg-emerald-50 dark:bg-emerald-950/40",
    tailwindText: "text-emerald-600 dark:text-emerald-400",
    tailwindPill: "bg-emerald-600 text-white",
    tailwindRipple: "bg-emerald-500/30",
  };
}

/**
 * Generate HTML string for Leaflet Marker Icon on Map based on vehicleType and regionLevel
 */
export function getMapVehicleMarkerHtml(
  vehicleType: VehicleType,
  regionLevel: string | undefined,
  activeRegionName: string
): { html: string; iconSize: [number, number] } {
  const c = getVehicleColorScheme(regionLevel);

  let avatarInnerHtml = "";

  if (vehicleType === "subway") {
    avatarInnerHtml = `
      <div class="relative shadow-2xl flex flex-col items-center vehicle-avatar-body" style="width: 46px; height: 50px;">
        <!-- Main shell -->
        <div class="absolute inset-0 border-2 border-white rounded-2xl flex flex-col items-center py-1 shadow-lg" style="background-color: ${c.primary};">
          <!-- Roof rail connector -->
          <div class="w-8 h-1 rounded-t-md -mt-2" style="background-color: ${c.dark};"></div>
          <!-- Dark Front glass -->
          <div class="w-9 h-5 bg-[#0f172a] rounded-lg flex items-center justify-center mt-1 relative">
            <!-- Cute eyes -->
            <div class="w-1.5 h-1.5 rounded-full mx-1.5" style="background-color: ${c.eye};"></div>
            <div class="w-1.5 h-1.5 rounded-full mx-1.5" style="background-color: ${c.eye};"></div>
            <!-- Sweet smiling mouth -->
            <div class="absolute bottom-1 w-2.5 h-1.5 border-b-2 rounded-b-full" style="border-color: ${c.eye};"></div>
          </div>
          <!-- Dual front headlights -->
          <div class="flex justify-between w-8 px-0.5 mt-2">
            <div class="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/20"></div>
            <div class="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/20"></div>
          </div>
        </div>
      </div>
    `;
  } else if (vehicleType === "person") {
    // Cute 3D Traveler Character
    avatarInnerHtml = `
      <div class="relative flex flex-col items-center drop-shadow-xl person-avatar-body" style="width: 48px; height: 54px;">
        <!-- Cap/Hat -->
        <div class="w-8 h-3.5 rounded-t-full relative z-20 flex items-center justify-center border border-white/30" style="background-color: ${c.primary};">
          <div class="absolute -bottom-0.5 w-10 h-1.5 rounded-full" style="background-color: ${c.dark};"></div>
        </div>
        <!-- Face -->
        <div class="w-8 h-7 bg-[#ffedd5] rounded-b-2xl border border-orange-200/60 z-10 flex flex-col items-center pt-1.5 relative -mt-0.5 shadow-xs">
          <!-- Eyes -->
          <div class="flex justify-between w-5 px-0.5">
            <div class="w-1.5 h-2 bg-[#1e293b] rounded-full"></div>
            <div class="w-1.5 h-2 bg-[#1e293b] rounded-full"></div>
          </div>
          <!-- Smile -->
          <div class="w-2 h-1 border-b-2 border-[#1e293b] rounded-b-full mt-0.5"></div>
          <!-- Rosy Cheeks -->
          <div class="flex justify-between w-6 absolute bottom-1.5 px-0.5">
            <div class="w-1.5 h-1 bg-rose-400/60 rounded-full"></div>
            <div class="w-1.5 h-1 bg-rose-400/60 rounded-full"></div>
          </div>
        </div>
        <!-- Scarf -->
        <div class="w-9 h-2.5 rounded-full z-20 -mt-1 shadow-xs border border-white/40" style="background-color: ${c.dark};"></div>
        <!-- Body & Backpack -->
        <div class="relative w-8 h-4 rounded-b-xl border border-white/30 flex justify-center z-10" style="background-color: ${c.primary};">
          <!-- Backpack on back -->
          <div class="absolute -right-1 top-0 w-3 h-4 rounded-r-lg border border-white/30" style="background-color: ${c.dark};"></div>
          <!-- Animated Boots (Legs) -->
          <div class="flex justify-between w-5 absolute -bottom-2.5">
            <div class="w-2.5 h-2.5 bg-[#1e293b] rounded-b-md person-leg-left shadow-xs"></div>
            <div class="w-2.5 h-2.5 bg-[#1e293b] rounded-b-md person-leg-right shadow-xs"></div>
          </div>
        </div>
      </div>
    `;
  } else if (vehicleType === "car") {
    // Cute 3D Car Character
    avatarInnerHtml = `
      <div class="relative flex flex-col items-center drop-shadow-xl vehicle-avatar-body" style="width: 50px; height: 48px;">
        <!-- Roof / Windshield cabin -->
        <div class="w-8 h-5 bg-[#0f172a] rounded-t-xl border-2 border-white/80 relative flex items-center justify-center pt-0.5 z-10 shadow-sm">
          <!-- Cute face inside windshield -->
          <div class="flex justify-between w-5">
            <div class="w-1.5 h-1.5 rounded-full" style="background-color: ${c.eye};"></div>
            <div class="w-1.5 h-1.5 rounded-full" style="background-color: ${c.eye};"></div>
          </div>
          <div class="absolute bottom-0.5 w-2 h-1 border-b-2 rounded-b-full" style="border-color: ${c.eye};"></div>
        </div>
        <!-- Main Car Body -->
        <div class="w-12 h-6 border-2 border-white rounded-2xl relative flex items-center justify-between px-1 z-20 shadow-md" style="background-color: ${c.primary};">
          <!-- Dual Headlights -->
          <div class="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/40"></div>
          <div class="w-2.5 h-2.5 bg-[#fef08a] rounded-full shadow-[0_0_8px_#fef08a] border border-white/40"></div>
          <!-- Grill Smile -->
          <div class="absolute left-1/2 -translate-x-1/2 bottom-1 w-3 h-1.5 rounded-b-full border-b-2 border-white/80"></div>
        </div>
        <!-- 3D Wheels -->
        <div class="flex justify-between w-11 z-30 -mt-1.5">
          <div class="w-3.5 h-3.5 bg-[#1e293b] rounded-full border-2 border-slate-400 flex items-center justify-center">
            <div class="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <div class="w-3.5 h-3.5 bg-[#1e293b] rounded-full border-2 border-slate-400 flex items-center justify-center">
            <div class="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    `;
  } else if (vehicleType === "plane") {
    // 3D Side-Profile Airplane Character
    avatarInnerHtml = `
      <div class="relative flex flex-col items-center justify-center drop-shadow-xl vehicle-avatar-body" style="width: 52px; height: 48px;">
        <div class="relative flex items-center justify-center transform -rotate-12">
          <!-- Tail Fin (Back left pointing up) -->
          <div class="absolute -top-3.5 left-1 w-3.5 h-5.5 rounded-t-full rounded-bl-md shadow-xs border border-white/40 transform -rotate-12 z-0" style="background-color: ${c.primary};"></div>
          
          <!-- Upper / Far Wing -->
          <div class="absolute -top-1.5 left-3.5 w-5 h-2.5 rounded-full border border-white/30 transform -rotate-25 z-0" style="background-color: ${c.dark};"></div>
          
          <!-- Main Fuselage (Off-white capsule body) -->
          <div class="w-13 h-5.5 bg-gradient-to-b from-slate-50 to-slate-200 border border-slate-300/80 rounded-full relative z-10 flex items-center px-1 shadow-md">
            <!-- Side Window Stripe -->
            <div class="w-4 h-1 bg-sky-300/80 rounded-full ml-2 border border-sky-400/50"></div>
            <!-- Cockpit Window -->
            <div class="w-3 h-2 bg-sky-400 rounded-full ml-1 border border-white/80 shadow-xs flex items-center justify-center">
              <div class="w-1 h-1 bg-white/90 rounded-full"></div>
            </div>
          </div>
          
          <!-- Near / Bottom Wing -->
          <div class="absolute -bottom-1.5 left-3.5 w-6 h-3 rounded-full border border-white/50 shadow-md transform rotate-12 z-20" style="background-color: ${c.primary};"></div>
        </div>
      </div>
    `;
  }

  const html = `
    <div class="relative flex flex-col items-center justify-center select-none" style="transform: translate(-50%, -85%);">
      <!-- Ripple wave behind -->
      <div class="absolute w-12 h-12 ${c.tailwindRipple} rounded-full animate-ping pointer-events-none" style="animation-duration: 2s; top: 12px;"></div>
      
      ${avatarInnerHtml}
      
      <!-- Station Name banner below -->
      <div class="mt-2.5 bg-slate-900 border border-slate-800 shadow-xl px-4 py-1.5 rounded-full text-[13px] font-black text-white tracking-tight whitespace-nowrap z-50 flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full ${c.primary === "#f59e0b" ? "bg-amber-400" : c.primary === "#f43f5e" ? "bg-rose-400" : c.primary === "#2563eb" ? "bg-blue-400" : c.primary === "#64748b" ? "bg-slate-400" : "bg-emerald-400"} animate-pulse"></span>
        <span>${activeRegionName}</span>
      </div>
    </div>
  `;

  return { html, iconSize: [52, 54] };
}
