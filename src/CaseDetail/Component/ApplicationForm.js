import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../utils/use_auth';
import { API_URL } from '../../utils/config';

import '../../styles/caseDetail/_applicationForm.scss';
import EditNeedPage from './EditNeedPage';
import AddStateForm from './AddStateForm';

function ApplicationForm({ setAddStatus, addStatus }) {
  const [editPage, setEditPage] = useState(false);
  const [addStateForm, setAddStateForm] = useState(false);
  const { member, setMember } = useAuth();
  const { num } = useParams();
  const [needData, setNeedData] = useState([]);
  const [detailData, setDetailData] = useState([]);

  const [editNeed, setEditNeed] = useState([{ title: '', directions: '' }]);

  const radioInput = [
    { title: '一次性', value: '1' },
    { title: '短期', value: '2' },
    { title: '長期', value: '3' },
  ];

  // 檢查會員
  useEffect(() => {
    async function getMember() {
      try {
        // console.log('檢查是否登入');
        let response = await axios.get(`http://localhost:3001/api/login/auth`, {
          withCredentials: true,
        });
        // console.log(response.data);
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

  // 取得detail Id 的值
  useEffect(() => {
    let getCampingDetailData = async () => {
      let response = await axios.get(`${API_URL}/applicationData/${num}`);
      setDetailData(response.data.result);
      setNeedData(response.data.needResult);
      // console.log(response.data.result);
      // console.log(response.data.needResult);
    };

    getCampingDetailData();
  }, [num]);

  //   需求修改表單
  // add need
  const handleAddNeed = () => {
    let newData = [...editNeed, { title: '', directions: '' }];
    setEditNeed(newData);
  };

  // del need
  const handleDelNeed = (i) => {
    if (editNeed.length === 1) return;
    let newData = [...editNeed];
    newData.splice(i, 1);
    setEditNeed(newData);
  };

  //   update contain
  const handlerUpdateNeed = (val, i, input) => {
    let newData = [...editNeed];
    if (input === 'tit') newData[i].title = val;
    if (input === 'dir') newData[i].directions = val;
    setEditNeed(newData);
  };

  return (
    <div className="appFormContainer">
      {/* 處理人申請狀態btn */}
      {addStateForm ? <AddStateForm setAddStateForm={setAddStateForm} /> : ''}

      {/* 修改表單btn */}
      {editPage ? (
        <EditNeedPage
          setEditPage={setEditPage}
          handleAddNeed={handleAddNeed}
          editNeed={editNeed}
          handleDelNeed={handleDelNeed}
          handlerUpdateNeed={handlerUpdateNeed}
        />
      ) : (
        ''
      )}
      <div
        className="editBtn"
        onClick={() => {
          setEditPage(true);
        }}
      >
        請點選按鈕進行需求修改
      </div>

      {/* 處理狀態 */}
      <div className="statusFormContainer">
        <div className="statusFormContain">
          <div className="mb-1">
            <span> &emsp;&emsp;處理人員：</span>
            <span>林鈺珊</span>
          </div>
          <div className="mb-1">
            <span>&emsp;&emsp;處理狀態：</span>
            <span>專案進行中</span>
          </div>
          <div className="statusTime mb-1">
            <span>&emsp;&emsp;處理時間：</span>
            <span>2022/12/12 13:14</span>
          </div>
          <div className="d-flex mb-1">
            <span>&emsp;&emsp;&emsp;&emsp;備註：</span>
            <textarea
              name=""
              cols="40"
              rows="3"
              placeholder="進行中"
              disabled
            ></textarea>
          </div>
          <div>
            <span>預計完成時間：</span>
            <span>2022/12/12 13:14</span>
          </div>
        </div>
        <div className="statusFormContain">
          <div className="statusTime mb-1">
            <span>&emsp;&emsp;處理時間：</span>
            <span>2022/12/12 13:14</span>
          </div>
          <div className="mb-1">
            <span> &emsp;&emsp;處理人員：</span>
            <span>林鈺珊</span>
          </div>
          <div className="mb-1">
            <span>&emsp;&emsp;申請狀態：</span>
            <span>專案進行中</span>
          </div>
          <div className="d-flex mb-1">
            <span>&emsp;&emsp;&emsp;&emsp;備註：</span>
            <textarea name="" cols="40" rows="3"></textarea>
          </div>
          <div>
            <span>專案完成時間：</span>
            <span>2022/12/12 13:14</span>
          </div>
        </div>
      </div>

      {/* 申請表單 */}
      <div className="tableContainer">
        {detailData.map((v) => {
          return (
            <div key={uuidv4()}>
              <div>
                <div className="pb-1">案件編號</div>
                <input type="text" placeholder={v.case_number} disabled />
              </div>
              <div className="gapContain my-2">
                <div>
                  <div className="pb-1">處理人</div>
                  <input type="text" placeholder={v.user} disabled />
                </div>
                <div>
                  <div className="pb-1">申請類別</div>
                  <input
                    type="text"
                    placeholder={v.application_category}
                    disabled
                  />
                </div>
              </div>
              <div className="gapContain">
                <div>
                  <div className="pb-1">專案名稱</div>
                  <input type="text" placeholder={v.project_name} disabled />
                </div>
                <div>
                  <div className="pb-1">該功能使用次數</div>
                  <div className="d-flex align-items-center">
                    {radioInput.map((d) => {
                      return (
                        <div
                          className="d-flex align-items-center"
                          key={uuidv4()}
                        >
                          <input
                            type="radio"
                            disabled
                            checked={v.cycle === d.value ? true : false}
                          />
                          <label>{d.title}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 需求 */}
        {needData.map((v, i) => {
          return (
            <div className="needContain" key={uuidv4()}>
              <div className="d-flex">
                <input type="checkbox" disabled={addStatus ? false : true} />
                <span className="title">需求 {i}</span>
              </div>
              <div className="needInput center">
                <span className="pe-1">1.</span>
                <input type="text" placeholder={v.requirement_name} disabled />
              </div>
              <div className="needInput">
                <span className="pe-1">2.</span>
                <textarea
                  name=""
                  rows="3"
                  placeholder={v.directions}
                  disabled
                ></textarea>
              </div>
            </div>
          );
        })}

        {/* 檔案 */}
        <div className="needFile">
          <span>1.</span>
          <div className="files">1110321幹部配置表.pdf</div>
        </div>

        {/* 選擇狀態 */}
        {addStatus ? (
          <div className="selectContain">
            <select name="">
              <option value="0" selected>
                --請選擇申請狀態--
              </option>
              <option value="1">同意申請</option>
            </select>
            <button
              className="confirmBtn"
              onClick={() => {
                setAddStateForm(true);
              }}
            >
              確認
            </button>
            <button className="finishBtn">完成</button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default ApplicationForm;
