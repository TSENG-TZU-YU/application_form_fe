import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiFillCloseSquare } from 'react-icons/ai';

import '../styles/caseDetail/_caseDetail.scss';
import ChatPage from './Component/ChatPage';
import UploadPage from './Component/UploadPage';

function CaseDetail({ setCaseDetailPage }) {
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMsgTrue, setSubmitMsgTrue] = useState(false);
  const [userFilesPage, setUserFilesPage] = useState(true);
  const [mgtFilesPage, setMgtUserFilesPage] = useState(false);
  const [filesData, setFilesData] = useState([{ fileName: '' }]);

  // message submit
  const handleSubmit = () => {
    if (submitMsgTrue) {
      console.log('msg', submitMessage);
    }
  };

  //   files upload
  //   update contain
  const handlerUpdateFile = (e, i) => {
    let name = e.target.files[0].name;
    let newData = [...filesData];
    filesData[i].fileName = name;
    setFilesData(newData);
    // console.log(e.target.files[0].name);
    // console.log(i);
  };

  // add files
  const handleAddFile = () => {
    let newData = [...filesData, { fileName: '' }];
    setFilesData(newData);
  };

  // clear files
  const handleClearFile = () => {
    let newData = [{ fileName: '' }];
    setFilesData(newData);
  };

  // del files
  const handleDelFile = (i) => {
    if (filesData.length === 1) return;
    let newData = [...filesData];
    newData.splice(i, 1);
    setFilesData(newData);
    // console.log(i);
  };

  return (
    <div className="caseDetailContainer">
      <div className="caseDetailContain">
        <AiFillCloseSquare
          className="closePageIcon"
          onClick={() => {
            console.log('aaa');
            setCaseDetailPage(false);
          }}
        />
        <nav>
          <ul>
            <li>申請表</li>
            <li>討論區</li>
            <li>上傳文件</li>
          </ul>
        </nav>
        {/* container */}
        {/* 申請表 */}
        <div className="appFormContainer">
          <div className="statusFormContainer">
            <div className="statusTime">處理時間: 2022/12/12 13:14</div>
            <div>處理人員:林鈺珊</div>
            <div>
              <span>申請狀態:</span>
              <span>專案進行中</span>
            </div>
            <div className="d-flex">
              <span>備註:</span>
              <textarea name="" className="" cols="50" rows="3"></textarea>
            </div>
            <div>
              <span>專案完成時間:</span>
              <span>2022/12/12 13:14</span>
            </div>
          </div>
        </div>

        {/* 討論區 */}
        {/* <ChatPage
          setSubmitMessage={setSubmitMessage}
          setSubmitMsgTrue={setSubmitMsgTrue}
          submitMsgTrue={submitMsgTrue}
          handleSubmit={handleSubmit}
        /> */}

        {/* 檔案上傳區 */}
        {/* <UploadPage
          handleClearFile={handleClearFile}
          handleAddFile={handleAddFile}
          filesData={filesData}
          handleDelFile={handleDelFile}
          handlerUpdateFile={handlerUpdateFile}
          userFilesPage={userFilesPage}
          setUserFilesPage={setUserFilesPage}
          setMgtUserFilesPage={setMgtUserFilesPage}
          mgtFilesPage={mgtFilesPage}
        /> */}
      </div>
    </div>
  );
}

export default CaseDetail;
