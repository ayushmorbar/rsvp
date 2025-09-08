"use client";

import { createContext, useContext } from "react";

interface TooltipContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  // This is a simple provider for tooltip functionality
  // In a real app, you might use a library like Radix UI or implement
  // more sophisticated tooltip logic
  
  const value = {
    isOpen: false,
    setIsOpen: () => {},
  };

  return (
    <TooltipContext.Provider value={value}>
      {children}
    </TooltipContext.Provider>
  );
}

export function useTooltip() {
  const context = useContext(TooltipContext);
  if (context === undefined) {
    throw new Error("useTooltip must be used within a TooltipProvider");
  }
  return context;
}
