import React, { createContext, useContext, useState, ReactNode } from "react";

interface PrinterContextType {
  printerIp: string;
  setPrinterIp: (ip: string) => void;
  printerPort: number;
  setPrinterPort: (port: number) => void;
}

const PrinterContext = createContext<PrinterContextType | undefined>(undefined);

export const PrinterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [printerIp, setPrinterIp] = useState("");
  const [printerPort, setPrinterPort] = useState(9100);

  return (
    <PrinterContext.Provider
      value={{ printerIp, setPrinterIp, printerPort, setPrinterPort }}
    >
      {children}
    </PrinterContext.Provider>
  );
};

export const usePrinter = (): PrinterContextType => {
  const context = useContext(PrinterContext);
  if (!context) {
    throw new Error("usePrinter must be used within a PrinterProvider");
  }
  return context;
};
