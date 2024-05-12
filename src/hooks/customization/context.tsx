import { ReactElement, createContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Customization } from "@/types/customization";

export type CustomizationContextType = {
  customization: Customization;
  setCustomization: (customization: Customization) => void;
};

export const CustomizationContext =
  createContext<CustomizationContextType | null>(null);

export const CustomizationProvider = ({
  children,
}: {
  children?: ReactElement | ReactElement[];
}) => {
  const [customization, setCustomization] = useLocalStorage<Customization>(
    "customization",
    undefined
  );

  return (
    <CustomizationContext.Provider
      value={{
        customization,
        setCustomization,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};
