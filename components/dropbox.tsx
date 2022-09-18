import { NextPage } from "next";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { SubmissionContext } from "../contexts/submit";

interface PreviewProps {
  url: string
}

const Preview: FC<PreviewProps> = ({ url }) => {
  return (
    <div className="w-auto h-min border-4 border-gray-400">
      <img className="h-min" src={url} alt="Preview" />
    </div>
  );
}

const DropBox: NextPage = () => {
  const { sub, setSub, fileForm, setFileForm } = useContext(SubmissionContext);

  useEffect(() => {
    if(sub) {
      if(file) {
        setFileForm(file);
      }

      else {
        alert("Please add a file for icon");
      }

      setSub(false);
    }
  }, [sub]);

  const input_ref = useRef(null);

  const [overlay, setOverlay] = useState<boolean>(false);
  const [file, setFile] = useState<File>(null);
  const [url, setURL] = useState<string>("");

  function addFile(f: File) {
    let reader = new FileReader();

    reader.onload = (e) => {
      setURL(e.target.result.toString());

      let img = document.createElement("img");
      img.onload = async () => {
        let canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 512, 512);

        let dataUrl = canvas.toDataURL(f.type);

        const blob = await (await fetch(dataUrl)).blob();
        const new_file = new File([blob], 'icon.png', {type:"image/png"});
        setFile(new_file);
      }
      img.src = e.target.result.toString();
    }

    reader.readAsDataURL(f);
  }
   
  function hasFiles({ dataTransfer: { types = [] } }) {
    return types.indexOf("Files") > -1;
  }

  function clickFileButton() {
    input_ref.current.click();
  }

  function fileChange(e) {
    addFile(e.target.files[0]);
  }

  function dragEnterHandler(e) {
    e.preventDefault();
    if (!hasFiles(e)) {
      return;
    }

    setOverlay(true);
  }

  function dragLeaveHandler(e) {
    setOverlay(false);
  }
  
  function dragOverHandler(e) {
    setOverlay(true);
    if (hasFiles(e)) {
      e.preventDefault();
    }
  }

  function dropHandler(ev: React.DragEvent) {
    ev.preventDefault();
    let f: File = ev.dataTransfer.files[0];
    setOverlay(false);

    if(f['type'] === 'image/png') { 
      addFile(f)
    } 
    
    else { 
      alert("Please upload a .png");
      setFile(null);
    }
  }

  return (
    <main className="container mx-auto max-w-screen-lg h-full">
      <article onDragEnter={dragEnterHandler} onDrag={dragEnterHandler} onDragLeave={dragLeaveHandler} onDrop={dropHandler} onDragOver={dragOverHandler} aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md">
        <div className={`w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md ${overlay ? '' : 'hidden'}`}>
          <i>
            <svg className="fill-current w-12 h-12 mb-3 text-blue-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
            </svg>
          </i>
          <p className="text-lg text-blue-700">Drop files to upload</p>
        </div>

        <section className="h-full overflow-auto p-8 w-full flex flex-col">
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
              <span>Drag and drop your files anywhere or</span>
            </p>
            <input type="file" multiple className="hidden" />
            <button onClick={clickFileButton} className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
              Upload a file
            </button>
          </header>

          <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
            To Upload
          </h1>

          <div className="w-1/3 h-1/3">
            <ul className="w-full flex flex-1 flex-wrap -m-1">
              <li className="h-full w-full text-center flex flex-col items-center justify-center">
                { !file ? <p className="text-small w-full text-gray-500">No files selected</p> : <Preview url={url} /> }
              </li>
            </ul>
          </div>
        </section>
        <footer className="flex justify-end px-8 pb-8 pt-4">
          <button onClick={() => setSub(true)} className="rounded-md px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none">
            Upload
          </button>
        </footer>
      </article>
      
      <input type="file" accept="image/png" onChange={fileChange} ref={input_ref} className="hidden" />
    </main>
  )
}

export default DropBox;