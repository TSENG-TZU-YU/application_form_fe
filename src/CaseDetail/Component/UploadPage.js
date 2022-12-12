import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { FaTrashAlt } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';

import '../../styles/caseDetail/_uploadPage.scss';

function UploadPage() {
  const [userFilesPage, setUserFilesPage] = useState(true);
  const [mgtFilesPage, setMgtUserFilesPage] = useState(false);
  const [filesData, setFilesData] = useState([{ fileName: '' }]);

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
    <div className="overScr">
      {/* 上傳檔案 */}
      <>
        <div className="addUpload">
          <div className="addTitle">
            請新增上傳附件(可上傳副檔名.pdf / img...)
          </div>
          <div>
            <FaTrashAlt className="trashIcon" onClick={handleClearFile} />
            <MdOutlineAddBox className="addIcon" onClick={handleAddFile} />
          </div>
        </div>
        <div className="uploadContainer">
          {filesData.map((v, i) => {
            return (
              <div key={uuidv4()}>
                <div className="upload">
                  <label className="addUploadContainer" htmlFor={`file${i}`}>
                    <span className={`items ${i < 9 ? 'ps-2' : ''}`}>
                      {i + 1}.
                    </span>
                    <div className="addUploadContain">
                      {v.fileName !== '' ? (
                        v.fileName
                      ) : (
                        <div className="addFile">
                          <HiOutlineDocumentPlus className="addIcon" />
                          <span>點擊新增檔案</span>
                        </div>
                      )}
                    </div>
                  </label>
                  {i !== 0 ? (
                    <AiFillCloseCircle
                      className="delIcon"
                      onClick={() => {
                        handleDelFile(i);
                      }}
                    />
                  ) : (
                    ''
                  )}
                </div>

                <input
                  className="input d-none"
                  name="photo1"
                  type="file"
                  id={`file${i}`}
                  onChange={(e) => {
                    handlerUpdateFile(e, i);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="subBtn">
          <button className="submitBtn">上傳檔案</button>
        </div>
      </>

      {/* 管理者接收檔案 */}
      <div className="receiveFileContainer">
        <div
          className="receiveFileTime
  "
        >
          2022/12/12 13:21 已上傳文件:
        </div>
        <textarea
          name=""
          className="textContain"
          //   cols="87"
          rows="30"
        ></textarea>
        <div className="files">
          <div className="receiveFile">
            <span>1.</span>
            <span className="ms-1 me-2">NPB-11111291330-001</span>
            <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
          </div>
          <div className="receiveFile">
            <span>1.</span>
            <span className="ms-1 me-2">NPB-11111291330-001</span>
            <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
          </div>
          <div className="receiveFile">
            <span>1.</span>
            <span className="ms-1 me-2">NPB-11111291330-001</span>
            <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
          </div>
          <div className="receiveFile">
            <span>1.</span>
            <span className="ms-1 me-2">NPB-11111291330-001</span>
            <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
          </div>
          <div className="receiveFile">
            <span>1.</span>
            <span className="ms-1 me-2">NPB-11111291330-001</span>
            <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
          </div>
          <div className="receiveFile">
            <span>1.</span>
            <span className="ms-1 me-2">NPB-11111291330-001</span>
            <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
          </div>
          <div className="receiveFile">
            <span>1.</span>
            <span className="ms-1 me-2">NPB-11111291330-001</span>
            <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
          </div>
        </div>
      </div>
      <div className="subBtn receiveBtn">
        <button className="submitBtn">接收檔案</button>
      </div>

      {/* 雙方檔案 */}
      <div className="viewFilesContainer">
        <div className="viewBtn">
          <div
            className={`btnWidth borderR ${
              userFilesPage === true ? 'clickStyle' : ''
            }`}
            onClick={() => {
              setUserFilesPage(true);
              setMgtUserFilesPage(false);
            }}
          >
            申請人上傳文件
          </div>
          <div
            className={`btnWidth borderL ${
              mgtFilesPage === true ? 'clickStyle' : ''
            }`}
            onClick={() => {
              setUserFilesPage(false);
              setMgtUserFilesPage(true);
            }}
          >
            處理人上傳文件
          </div>
        </div>
        {/* 檔案內容 */}
        {/* 使用者 */}
        {/* 管理者 */}
        {userFilesPage === true && mgtFilesPage === false ? (
          <div className="viewFilesContain">
            <div className="pt-2">
              <span className="filesTime">
                2022/12/12 13:14 (處理人接收時間 : 2022/12/13 12:12)
              </span>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="filesTime">
                2022/12/12 13:14 (處理人接收時間 : 2022/12/13 12:12)
              </span>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="filesTime">
                2022/12/12 13:14 (處理人接收時間 : 2022/12/13 12:12)
              </span>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="filesTime">
                2022/12/12 13:14 (處理人接收時間 : 2022/12/13 12:12)
              </span>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="viewFilesContain">
            <div className="pt-2">
              <span className="filesTime">2022/12/12 13:14</span>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="filesTime">2022/12/12 13:14</span>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="filesTime">2022/12/12 13:14</span>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="filesTime">2022/12/12 13:14</span>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
              <div className="pt-2">
                <span>1.</span>
                <span className="ms-1 me-2">NPB-11111291330-001</span>
                <span>陽信銀行客訴管理系統_邀標規格書.pdf</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
