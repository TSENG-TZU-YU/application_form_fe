import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { AiFillCloseCircle } from 'react-icons/ai';

import '../styles/caseDetail/_caseDetail.scss';
import ChatPage from './Component/ChatPage';

function CaseDetail() {
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMsgTrue, setSubmitMsgTrue] = useState(false);
  const [fileDataName, setFileDataName] = useState(null);

  // message submit
  const handleSubmit = () => {
    if (submitMsgTrue) {
      console.log('msg', submitMessage);
    }
  };

  //   files upload
  const updateImgHandler = (e) => {
    let file = e.target.files[0].name;
    setFileDataName(file);
    console.log(file);
  };

  return (
    <div className="caseDetailContainer">
      <div className="caseDetailContain">
        <nav>
          <ul>
            <li>申請表</li>
            <li>討論區</li>
            <li>上傳文件</li>
          </ul>
        </nav>
        {/* container */}
        {/* <ChatPage
          setSubmitMessage={setSubmitMessage}
          setSubmitMsgTrue={setSubmitMsgTrue}
          submitMsgTrue={submitMsgTrue}
          handleSubmit={handleSubmit}
        /> */}

        <div className="uploadContainer">
          <div className="addUpload">
            <div className="addTitle">
              請新增上傳附件(可上傳副檔名.pdf / img...)
            </div>
            <MdOutlineAddBox className="addIcon" />
          </div>

          <label className="addUploadContainer" htmlFor="file1">
            <span>1.</span>
            <div className="addUploadContain">
              {fileDataName ? (
                fileDataName
              ) : (
                <div className="addFile">
                  <HiOutlineDocumentPlus className="addIcon" />
                  <span>點擊新增檔案</span>
                </div>
              )}
              <AiFillCloseCircle className="delIcon" />
            </div>
          </label>
          <input
            className="input d-none"
            name="photo1"
            type="file"
            id="file1"
            onChange={updateImgHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default CaseDetail;
