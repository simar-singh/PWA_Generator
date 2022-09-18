import { NextPage } from "next";
import React, { FC, useContext, useEffect, useState } from "react";
import { SubmissionContext } from "../contexts/submit";

const InputBox: FC<{q: string, onChange: React.ChangeEventHandler<HTMLInputElement>}> = ({ q, onChange }) => {
  return (
    <div className="col-span-6 sm:col-span-3 mb-5">
      <label htmlFor={q} className="text-lg font-medium text-gray-700">{ q }</label>
      <input id={q} type="text" onChange={onChange} className="mt-1 pl-2 h-10 w-full shadow-sm sm:text-sm border-2 border-gray-200 rounded-md" />
    </div>
  );
}

const ColorBox: FC<{q: string, onChange: React.ChangeEventHandler<HTMLInputElement>}> = ({ q, onChange }) => {
  return (
    <div className="col-span-6 sm:col-span-3 mb-5 flex gap-2">
      <label htmlFor={q} className="text-lg font-medium text-gray-700">{ q }</label>
      <input id={q} type="color" onChange={onChange} />
    </div>
  );
}

const DropdownBox: FC<{q: string, options: string[], onChange: React.ChangeEventHandler<HTMLSelectElement>}> = ({ q, options, onChange }) => {
  return (
    <div className="col-span-6 sm:col-span-3 mb-5">
      <label htmlFor={q} className="block text-lg font-medium text-gray-700">{ q }</label>
      <select id={q} onChange={onChange} className="mt-1 w-full py-2 px-3 border-2 border-gray-200 rounded-md shadow-sm focus:outline-none">
        { options.map((opt, key) => <option key={key}>{ opt }</option>) }
      </select>
    </div>
  );
}


const FormBox: NextPage = () => {
  const { sub, setSub, mForm, setMForm } = useContext(SubmissionContext);

  useEffect(() => {
    if(sub) {
      if(manifest.name !== "" && manifest.short !== "") {
        setMForm(manifest);
      }

      else {
        alert("Please fill out all of form fields")
      }

      setSub(false);
    }
  }, [sub]);

  const Orientations: string[] = [
    "any",
    "natural",
    "landscape",
    "landscape-primary",
    "landscape-secondary",
    "portrait",
    "portrait-primary",
    "portrait-secondary"
  ];
  
  const Displays: string[] = [
    "fullscreen",
    "standalone",
    "minimal-ui",
    "browser"
  ];

  const [manifest, setManifest] = useState({
    name: "",
    short: "",
    theme: "#000000",
    background: "#000000",
    display: "standalone",
    orientation: "portrait",
  });

  function onChange(e, q) {
    let new_manifest = manifest;
    new_manifest[q] = e.target.value;

    setManifest(new_manifest);
  }

  return (
    <div className="w-full h-full p-4 pt-6">
      <InputBox q={"App Name"} onChange={(e) => onChange(e, 'name')} />
      <InputBox q={"Short Name"} onChange={(e) => onChange(e, 'short')} />

      <DropdownBox q={"Display"} options={Displays} onChange={(e) => onChange(e, 'display')} />
      <DropdownBox q={"Orientation"} options={Orientations} onChange={(e) => onChange(e, 'orientaion')} />

      <ColorBox q={"Theme:"} onChange={(e) => onChange(e, 'theme')} />
      <ColorBox q={"Background:"} onChange={(e) => onChange(e, 'background')} />
    </div>
  );
}

export default FormBox;