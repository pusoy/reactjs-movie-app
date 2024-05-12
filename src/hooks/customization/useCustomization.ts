import { useContext } from "react";
import { CustomizationContext, CustomizationContextType } from "./context";

export const useCustomization = (): CustomizationContextType => {
  const context = useContext(CustomizationContext);

  if (!context) {
    throw new Error(`Context not instantiated`);
  }
  return context;
};
