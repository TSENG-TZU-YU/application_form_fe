import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/caseDetail/_editNeedPage.scss';
import { MdOutlineAddBox } from 'react-icons/md';
import { AiFillCloseCircle, AiFillCloseSquare } from 'react-icons/ai';

function EditNeedPage({
  setEditPage,
  handleAddNeed,
  editNeed,
  handleDelNeed,
  handlerUpdateNeed,
}) {
  return (
    <div className="editNeedContainer">
      <div className="editNeedContain">
        <AiFillCloseSquare
          className="closeBtn"
          onClick={() => {
            setEditPage(false);
          }}
        />
        <div className="title">申請需求修改</div>
        <div className="editNeedWidth">
          {/* 需求表單 */}
          <div className="addTitle">
            <div>增加需求</div>
            <MdOutlineAddBox
              className="addNeedIcon"
              onClick={() => {
                handleAddNeed();
              }}
            />
          </div>

          {/* 需求內容 */}
          {editNeed.map((v, i) => {
            return (
              <div className="addNeedTable" key={uuidv4()}>
                <div>
                  <span className="needTit">需求 {1 + i}</span>
                  {i !== 0 ? (
                    <AiFillCloseCircle
                      className="delNeedIcon"
                      onClick={() => {
                        handleDelNeed(i);
                      }}
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div className="needInput center">
                  <span className="pe-1">1.</span>
                  <input
                    type="text"
                    name="title"
                    placeholder="請輸入標題"
                    value={v.title}
                    onChange={(e) => {
                      handlerUpdateNeed(e.target.value, i, 'tit');
                    }}
                  />
                </div>
                <div className="needInput">
                  <span className="pe-1">2.</span>
                  <textarea
                    name="directions"
                    rows="3"
                    placeholder="請依據標題詳細說明"
                    value={v.directions}
                    onChange={(e) => {
                      handlerUpdateNeed(e.target.value, i, 'dir');
                    }}
                  ></textarea>
                </div>
              </div>
            );
          })}
        </div>
        <button className="finishBtn">修改完成</button>
      </div>
    </div>
  );
}

export default EditNeedPage;
