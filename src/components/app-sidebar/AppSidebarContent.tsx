"use client";

import AppSidebarItem from "./AppSidebarItem";
import UserButton from "./UserButton";

import {
  AreaChartIcon,
  MenuIcon,
  MessageSquarePlus,
  PlayIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

interface AppSidebarContentProps {
  fullName: string;
  email: string;
}

export default function AppSidebarContent({
  fullName,
  email,
}: AppSidebarContentProps) {
  const [isHoverable, setIsHoverable] = useState(false);
  const { isVisible, isExpanded, setIsExpanded, isUserDropdownOpen } =
    useSidebar();

  useEffect(() => {
    setIsHoverable(
      window.matchMedia("(hover: hover)").matches &&
        window.matchMedia("(min-width: 1024px)").matches,
    );
  }, []);

  return (
    <div
      className="group fixed z-50"
      data-state={isExpanded || isUserDropdownOpen ? "expanded" : "collapsed"}
    >
      <div
        className={cn(
          "invisible fixed inset-0 z-40 bg-black/30 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-data-[state=expanded]:visible group-data-[state=expanded]:opacity-100 lg:can-hover:hidden",
          !isVisible && "-translate-x-full [transition:transform_300ms]",
        )}
        onClick={() => setIsExpanded(false)}
      ></div>
      <button
        className={cn(
          "fixed z-50 p-1.5 text-foreground drop-shadow-lg lg:can-hover:hidden",
          !isVisible && "-translate-x-full [transition:transform_300ms]",
        )}
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        <MenuIcon className="visible fixed h-10 w-10 opacity-100 transition-all group-data-[state=expanded]:invisible group-data-[state=expanded]:rotate-90 group-data-[state=expanded]:opacity-0" />
        <XIcon className="h-10 w-10 opacity-100 transition-all group-data-[state=collapsed]:invisible group-data-[state=collapsed]:-rotate-90 group-data-[state=collapsed]:opacity-0" />
      </button>
      <nav
        className={cn(
          "hide-scrollbar group fixed z-40 flex h-full w-16 -translate-x-full flex-col items-center justify-between overflow-y-auto border-r bg-background py-2 pt-12 shadow-lg transition-all duration-200 group-data-[state=expanded]:w-full group-data-[state=expanded]:translate-x-0 group-data-[state=expanded]:shadow-xl xs:group-data-[state=expanded]:w-60 lg:can-hover:translate-x-0 lg:can-hover:pt-2",
          !isVisible &&
            "-translate-x-full [transition:transform_300ms] group-data-[state=expanded]:-translate-x-full lg:can-hover:-translate-x-full",
        )}
        onMouseEnter={() => isHoverable && setIsExpanded(true)}
        onMouseLeave={() => isHoverable && setIsExpanded(false)}
      >
        <div className="flex w-full flex-col items-center justify-center gap-y-1 p-2">
          <AppSidebarItem
            href="/app/play"
            text="Play"
            Icon={PlayIcon}
            onClick={() => !isHoverable && setIsExpanded(false)}
          />
          <AppSidebarItem
            href="/app/analytics"
            text="Analytics"
            Icon={AreaChartIcon}
            onClick={() => !isHoverable && setIsExpanded(false)}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-y-1 p-2">
          <AppSidebarItem
            href="/app/feedback"
            text="Feedback"
            Icon={MessageSquarePlus}
            onClick={() => !isHoverable && setIsExpanded(false)}
          />
          <AppSidebarItem
            href="/app/settings"
            text="Settings"
            Icon={SettingsIcon}
            onClick={() => !isHoverable && setIsExpanded(false)}
          />
          <UserButton fullName={fullName} email={email} />
        </div>
      </nav>
    </div>
  );
}
