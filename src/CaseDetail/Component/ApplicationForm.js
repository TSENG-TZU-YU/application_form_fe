import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/caseDetail/_applicationForm.scss';
import EditNeedPage from './EditNeedPage';
import AddStateForm from './AddStateForm';
import { AiFillCloseSquare } from 'react-icons/ai';

function ApplicationForm() {
  const [editPage, setEditPage] = useState(false);
  const [addStateForm, setAddStateForm] = useState(false);

  const [editNeed, setEditNeed] = useState([{ title: '', directions: '' }]);

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
        <div>
          <div className="pb-1">案件編號</div>
          <input type="text" placeholder="NPB-20221128001" disabled />
        </div>
        <div className="gapContain my-2">
          <div>
            <div className="pb-1">處理人</div>
            <input type="text" placeholder="林鈺珊" disabled />
          </div>
          <div>
            <div className="pb-1">申請類別</div>
            <input type="text" placeholder="現有系統增修" disabled />
          </div>
        </div>
        <div className="gapContain">
          <div>
            <div className="pb-1">系統名稱</div>
            <input type="text" placeholder="現有系統增修" disabled />
          </div>
          <div>
            <div className="pb-1">該功能使用次數</div>
            <div className="d-flex align-items-center">
              <input type="radio" disabled checked />
              <label>一次性</label>
              <input className="ms-2" type="radio" disabled />
              <label className="me-2">短期</label>
              <input type="radio" disabled />
              <label>長期</label>
            </div>
          </div>
        </div>

        {/* 需求 */}
        <div className="needContain">
          <div className="d-flex">
            <input type="checkbox" />
            <span className="title">需求 1</span>
          </div>
          <div className="needInput center">
            <span className="pe-1">1.</span>
            <input type="text" placeholder="增加新功能" disabled />
          </div>
          <div className="needInput">
            <span className="pe-1">2.</span>
            <textarea
              name=""
              // cols="30"
              rows="3"
              placeholder="請依標題詳細說明"
              disabled
            ></textarea>
          </div>
        </div>

        {/* 檔案 */}
        <div className="needFile">
          <span>1.</span>
          <div className="files">1110321幹部配置表.pdf</div>
        </div>

        {/* 選擇狀態 */}
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
      </div>
    </div>
  );
}

export default ApplicationForm;
