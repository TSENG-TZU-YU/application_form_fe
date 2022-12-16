import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiFillCloseSquare } from 'react-icons/ai';
import '../../styles/caseDetail/_addStatePage.scss';

function AddStateForm({
  setAddStateForm,
  handlerSelect,
  setHandlerSelect,
  handlerData,
  handlePostVal,
  postVal,
  handlePostHandle,
  postValRemind,
  setPostValRemind,
}) {
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
            <span>{postVal.handler}</span>
          </div>
          <div className="mb-2">
            <span>&emsp;&emsp;處理狀態：</span>
            <span>{postVal.status}</span>
          </div>
          {/* 轉件 */}
          {postVal.status === '轉件中' ? (
            <div className="mb-2">
              <span>&emsp;&emsp;轉件人員：</span>
              <select
                name="transfer"
                value={postVal.transfer}
                onChange={(e) => {
                  setPostValRemind(false);
                  handlePostVal(e);
                }}
              >
                <option value="" selected>
                  ----請選擇轉件人員----
                </option>
                {handlerData.map((v) => {
                  return (
                    <option value={v.name} key={uuidv4()}>
                      {v.name}
                    </option>
                  );
                })}
              </select>
              {postValRemind ? (
                <span className="selectRemind">*請選擇轉件人員</span>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
          {/*------ */}

          {/* <div className="statusTime mb-2">
            <span>&emsp;&emsp;處理時間：</span>
            <span>2022/12/12 13:14</span>
          </div> */}
          <div className="d-flex mb-2">
            <span>&emsp;&emsp;&emsp;&emsp;備註：</span>
            <textarea
              name="remark"
              rows="5"
              placeholder=""
              value={postVal.remark}
              onChange={(e) => {
                handlePostVal(e);
              }}
            ></textarea>
          </div>
          {postVal.status === '案件進行中' ? (
            <div>
              <span>預計完成時間：</span>
              <input
                name="finishTime"
                type="datetime-local"
                value={postVal.finishTime}
                onChange={(e) => {
                  handlePostVal(e);
                }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <button
          onClick={
            handlePostHandle
            // setAddStateForm(true);
          }
        >
          確認申請
        </button>
      </div>
    </div>
  );
}

export default AddStateForm;
