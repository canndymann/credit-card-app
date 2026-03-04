"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavTabs() {
  const pathname = usePathname();

  const tabs = [
    { href: "/", label: "My Cards" },
    { href: "/optimizer", label: "Optimizer" },
  ];

  return (
    <nav className="flex gap-1">
      {tabs.map((tab) => {
        const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
              isActive
                ? "bg-white text-gray-900"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
