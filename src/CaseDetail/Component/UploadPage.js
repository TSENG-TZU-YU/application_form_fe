import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { FaTrashAlt } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import moment from 'moment';
import Swal from 'sweetalert2';

import '../../styles/caseDetail/_uploadPage.scss';
import { useAuth } from '../../utils/use_auth';

function UploadPage({ setAddStatus, addStatus, caseNum }) {
  const [userFilesPage, setUserFilesPage] = useState(true);
  const [mgtFilesPage, setMgtUserFilesPage] = useState(false);
  const [filesData, setFilesData] = useState([{ fileName: '' }]);
  const { member, setMember } = useAuth();
  const [getUserTotalFile, setGetUserTotalFile] = useState([]);
  const [getHandlerTotalFile, setGetHandlerTotalFile] = useState([]);
  const [render, setRender] = useState(false);
  const [addNo, setAddNo] = useState([]);
  console.log('addNo', addNo);
  useEffect(() => {
    async function getMember() {
      try {
        // console.log('檢查是否登入');
        let response = await axios.get(`http://localhost:3001/api/login/auth`, {
          withCredentials: true,
        });

        setMember(response.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
    getMember();

    if (member.permissions_id === 1) {
      setAddStatus(false);
    }
  }, []);

  useEffect(() => {
    async function toGetUserFile() {
      try {
        let response = await axios.get(
          `http://localhost:3001/api/files/getUserFile/${caseNum}`
        );
        setGetUserTotalFile(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    async function toGetHandlerFile() {
      try {
        let response = await axios.get(
          `http://localhost:3001/api/files/getHandlerFile/${caseNum}`
        );
        setGetHandlerTotalFile(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    async function toGetHandlerFileNo() {
      try {
        let response = await axios.get(
          `http://localhost:3001/api/files/getHandlerFileNo/${caseNum}`
        );
        setAddNo(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    toGetUserFile();
    toGetHandlerFile();
    toGetHandlerFileNo();
  }, [render]);

  // function getFileNameFromContentDisposition(contentDisposition) {
  //   if (!contentDisposition) return null;

  //   const match = contentDisposition.match(/filename="?([^"]+)"?/);

  //   return match ? match[1] : null;
  // }

  // useEffect(()=>{

  // },[ fileName])
  const handleDownload = async (fileName) => {
    await axios({
      url: 'http://localhost:3001/api/files',
      data: {
        name: fileName,
      },
      method: 'POST',
      responseType: 'blob', // important 下載檔案需要轉
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    });
  };

  //整理檔案資料 user
  const map = {};
  const newGetUserFile = getUserTotalFile
    .reduce((acc, cur) => {
      const { create_time, file_no, name } = cur;
      const item = { file_no, name };
      if (!map[create_time]) {
        map[create_time] = { create_time, item: [item] };
        acc = [...acc, map[create_time]];
      } else {
        map[create_time].item.push({ file_no, name });
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(b.name) - new Date(a.name));

  //整理檔案資料 handler
  const map1 = {};
  const newGetHandlerFile = getHandlerTotalFile
    .reduce((acc, cur) => {
      const { create_time, file_no, name } = cur;
      const item = { file_no, name };
      if (!map1[create_time]) {
        map1[create_time] = { create_time, item: [item] };
        acc = [...acc, map1[create_time]];
      } else {
        map1[create_time].item.push({ file_no, name });
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(b.name) - new Date(a.name));

  //   files upload
  //   update contain
  const handlerUpdateFile = (val, i, input) => {
    let newData = [...filesData];
    if (input === 'photo1') newData[i].fileName = val;
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
  async function fileSubmit() {
    try {
      // if (!filesData=== '') {
      let endTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      let noTime = moment(Date.now()).format('YYYYMMDD');
      const formData = new FormData();
      for (let i = 0; i < filesData.length; i++) {
        formData.append(i, filesData[i].fileName);
      }
      formData.append('fileNo', '-' + noTime);
      formData.append('No', addNo[0].application_category);

      formData.append('number', parseInt(Date.now() / 10000));
      formData.append('create_time', endTime);
      let response = await axios.post(
        `http://localhost:3001/api/1.0/applicationData/postHandleFile/${caseNum}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: '已上傳檔案',
      });
      setFilesData([{ fileName: '' }]);
      setRender(false);
      // } else {
      //   Swal.fire({
      //     icon: 'error',
      //     title: '無檔案',
      //   });
      // }
    } catch (err) {
      console.log(err);
    }
  }
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
                        v.fileName.name
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
                  accept=".csv,.txt,.text,.png,.jpeg,.jpg,text/csv,.pdf,.xlsx"
                  onChange={(e) => {
                    handlerUpdateFile(e.target.files[0], i, 'photo1');
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="subBtn">
          <button
            className="submitBtn"
            onClick={() => {
              setRender(true);
              fileSubmit();
            }}
          >
            上傳檔案
          </button>
        </div>
      </>

      {/* 管理者接收檔案 */}
      {addStatus ? (
        <>
          <div className="receiveFileContainer">
            <div className="receiveFileTime">2022/12/12 13:21 已上傳文件:</div>
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
        </>
      ) : (
        ''
      )}

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
            {newGetUserFile.map((v, i) => {
              return (
                <div key={uuidv4()} className="pt-2">
                  <span className="filesTime">
                    {v.create_time} (處理人接收時間 : 2022/12/13 12:12)
                  </span>
                  {newGetUserFile[i].item.map((v, i) => {
                    return (
                      <div key={uuidv4()} className="pt-2">
                        <span>{i + 1}.</span>
                        <span className="ms-1 me-2">{v.file_no}</span>
                        <span
                          className="download"
                          onClick={() => {
                            handleDownload(v.name);
                          }}
                        >
                          {v.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="viewFilesContain">
            {newGetHandlerFile.map((v, i) => {
              return (
                <div key={uuidv4()} className="pt-2">
                  <span className="filesTime">{v.create_time}</span>
                  {newGetHandlerFile[i].item.map((v, i) => {
                    return (
                      <div key={uuidv4()} className="pt-2">
                        <span>{i + 1}.</span>
                        <span className="ms-1 me-2">{v.file_no}</span>
                        <span
                          className="download"
                          onClick={() => {
                            handleDownload(v.name);
                          }}
                        >
                          {v.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
