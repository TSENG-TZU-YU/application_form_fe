import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiFillCloseSquare } from 'react-icons/ai';
import '../../styles/caseDetail/_addStatePage.scss';

function AddStateForm({ setAddStateForm }) {
  return (
    <div className="addStatePageContain">
      <div className="addStateForm">
        <AiFillCloseSquare
          className="closeBtn"
          onClick={() => {
            setAddStateForm(false);
          }}
        />
        <div className="title">新增處理狀態</div>

        {/* 表單內容 */}
        <div className="addStateFormContain">
          <div className="mb-2">
            <span> &emsp;&emsp;處理人員：</span>
            <span>林鈺珊</span>
          </div>
          <div className="mb-2">
            <span>&emsp;&emsp;處理狀態：</span>
            <span>專案進行中</span>
          </div>
          {/* 轉件 */}
          {/* <div className="mb-2">
              <span>&emsp;&emsp;轉件人員：</span>
              <select name="">
                <option value="0" selected>
                  ----請選擇轉件人員----
                </option>
                <option value="1">郭彥岐</option>
              </select>
            </div> */}
          {/*------ */}
          <div className="statusTime mb-2">
            <span>&emsp;&emsp;處理時間：</span>
            <span>2022/12/12 13:14</span>
          </div>
          <div className="d-flex mb-2">
            <span>&emsp;&emsp;&emsp;&emsp;備註：</span>
            <textarea name="" rows="5" placeholder=""></textarea>
          </div>
          <div>
            <span>預計完成時間：</span>
            <input type="datetime-local" />
          </div>
        </div>
        <button
          onClick={() => {
            setAddStateForm(true);
          }}
        >
          確認申請
        </button>
      </div>
    </div>
  );
}

export default AddStateForm;
