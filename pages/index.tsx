import { NextPage } from "next";
import { useContext, useEffect } from "react";

import genZip from "../functions/create_zip";
import { SubmissionContext } from "../contexts/submit";

import DropBox from "../components/dropbox";
import FormBox from "../components/formbox";
import Modal from "../components/modal";
import { modalContext } from "../contexts/modal";

const Index: NextPage = () => {
  const { mForm, setMForm, fileForm, setFileForm } = useContext(SubmissionContext);
  const { status, setStatus } = useContext(modalContext);

  useEffect(() => {
    if(mForm && fileForm) {
      genZip(fileForm, mForm);
      setStatus(true);
    }

    else {
      setMForm(null);
      setFileForm(null);
      setStatus(false);
    } 
  }, [mForm, fileForm]);

  return (
    <>
      <div className={status ? '' : 'hidden'}>
        <Modal />
      </div>
      <div className="w-full h-full flex flex-col lg:justify-center md:items-center">
        <div className="w-full lg:w-3/4 h-3/5 lg:h-3/4 flex-none lg:flex sm:px-6 lg:px-0">
          <div className="w-full h-full sm:h-auto bg-white rounded-l-lg">
            <FormBox />
          </div>
          <div className="w-full h-full sm:h-auto bg-gray-600 px-8 md:px-16 py-8 rounded-r-lg">
            <DropBox />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;