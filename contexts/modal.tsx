import { createContext, FC, useState } from "react";

export const modalContext = createContext<any>(false);

const ModelProvider: FC = ({ children }) => {
  const [status, setStatus] = useState<boolean>(false);

  return (
    <modalContext.Provider value={{ status, setStatus }}>
      { children }
    </modalContext.Provider>
  );
}

export default ModelProvider;