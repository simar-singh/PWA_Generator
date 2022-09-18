import { NextPage } from "next";
import { FC, useContext, useEffect, useState } from "react";
import { modalContext } from "../contexts/modal";
import Toast from "./toast";

const ClipBoard: FC<{setShow, meta: string}> = ({ setShow, meta }) => {
  function onClick() {
    navigator.clipboard.writeText(meta);
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 1000);
  }

  return (
    <div onClick={onClick} className="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
    </div>
  )
}

const Modal: NextPage = () => {
  const [meta, setMeta] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const { setStatus } = useContext(modalContext);

  useEffect(() => {
    fetch('/meta.txt').then((res) => res.text()).then((val) => {
      setMeta(val);
    });
  }, []);

  function onClick() {
    setStatus(false);
    window.location.reload();
  }
  
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" role="dialog">
      <div className="flex lg:items-end items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <Toast show={show} msg="Copied Text" />
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-3xl text-center leading-6 font-medium text-gray-900" id="modal-title">
                  Created PWA Requirements
                </h3>
                <div className="mt-6 flex gap-2">
                  <p className="text-md text-gray-500">
                    Here are some helpful meta tags to add in your html 
                  </p>
                  <ClipBoard setShow={setShow} meta={meta} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={onClick} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;