import { createContext, FC, useState } from "react";

export const SubmissionContext = createContext<any>(null);

interface wManifest {
  name: string,
  short: string,
  theme: string,
  background: string,
  display: string,
  orientation: string,
}

const SubmissionProvider: FC = ({ children }) => {
  const [sub, setSub] = useState<boolean>(false);
  const [mForm, setMForm] = useState<wManifest | null>(null);
  const [fileForm, setFileForm] = useState<File | null>(null);



  return (
    <SubmissionContext.Provider value={{ sub, setSub, mForm, setMForm, fileForm, setFileForm }}>
      { children }
    </SubmissionContext.Provider>
  );
}

export default SubmissionProvider;