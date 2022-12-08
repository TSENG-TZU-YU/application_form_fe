import React, { useState } from 'react';
import './index.scss';

//react-icons
import { IoIosAddCircle } from 'react-icons/io';
import { IoMdCloseCircle } from 'react-icons/io';
import axios from 'axios';

function Application() {
  const [addNeed, setAddNeed] = useState([
    { need: Number(new Date()), title: '', text: '' },
  ]);
  const [addFile, setAddFile] = useState([{ file: Number(new Date()) }]);
  const [submitValue, setSubmitValue] = useState([]);
  console.log('submitValue', submitValue);
  console.log('addNeed', addNeed);

  //表格資料填入
  const handleChange = (e) => {
    setSubmitValue({ ...submitValue, [e.target.name]: e.target.value });
  };

  //增加需求
  const addN = () => {
    const newAdd = { need: Number(new Date()), title: '', text: '' };
    const newAdds = [...addNeed, newAdd];
    setAddNeed(newAdds);
  };
  //填入需求
  const needChangerHandler = (val, i, input) => {
    let newData = [...addNeed];
    if (input === 'tt') newData[i].title = val;
    if (input === 'ttt') newData[i].text = val;
    setAddNeed(newData);
  };
  //刪除需求
  const deleteNeed = (i) => {
    let newData = [...addNeed];
    newData.splice(i, 1);
    if (newData.length === 0) return;
    setAddNeed(newData);
  };

  //增加上傳檔案
  const addF = () => {
    const newAdd = {
      file: Number(new Date()),
    };
    const newAdds = [newAdd, ...addFile];
    setAddFile(newAdds);
    console.log('2', newAdds);
  };
  //刪除檔案
  const deleteFile = (i) => {
    let newData = [...addFile];
    newData.splice(i, 1);
    if (newData.length === '') return;
    setAddFile(newData);
  };
  //單個檔案上傳
  const onFileUpload = (event) => {
    console.log(event.target.files[0]);
  };
  //需求內容
  async function submit() {
    try {
      let response = await axios.post(
        'http://localhost:3001/api/todo',
        submitValue
      );
      console.log(response);
    } catch (err) {
      console.log('sub', err);
    }
  }
  return (
    <div className="scroll">
      <div className="container">
        <h3>申請表</h3>
        <div className="vector"></div>
        <div className="box">
          <div>
            <div>處理人</div>
            <select name="handler" className="handler" onChange={handleChange}>
              <option> -----請選擇-----</option>
              <option>郭彥岐(由單位主管分配)</option>
              <option>連佳豪</option>
              <option>王裕億</option>
              <option>林祐生</option>
            </select>
          </div>
          <div>
            <div>申請類別</div>
            <select name="category" className="handler" onChange={handleChange}>
              <option>-----請選擇類別-----</option>
              <option>新專案建置</option>
              <option>現有系統增修</option>
              <option>問題回報</option>
            </select>
          </div>
        </div>
        <div className="box">
          <div>
            <div>專案名稱</div>
            <input
              name="name"
              className="handler"
              type="text"
              onChange={handleChange}
            />
          </div>
          {/* 週期 */}
          <div>
            <div className="cycle">該功能使用次數</div>
            <div className="check handler">
              <div className="form-check">
                <input
                  className="form-check-input "
                  type="radio"
                  name="cycle"
                  value="1"
                  onChange={handleChange}
                />
                <label className="form-check-label">一次性</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="cycle"
                  value="2"
                  onChange={handleChange}
                />
                <label className="form-check-label">短期</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="cycle"
                  value="3"
                  onChange={handleChange}
                />
                <label className="form-check-label">長期</label>
              </div>
            </div>
          </div>
        </div>
        {/* 需求 */}
        <div className="add handler">
          <div>(增加列點1. 2.)</div>
          <IoIosAddCircle size="20" onClick={addN} />
        </div>
        <div className="needs">
          {addNeed.map((v, i) => {
            return (
              <div key={i} className="need">
                <div className="one">
                  <div>需求{i + 1}</div>
                  <IoMdCloseCircle
                    className="two"
                    size="20"
                    onClick={deleteNeed}
                  />
                </div>

                <div>
                  <div>1.</div>
                  <input
                    className="input"
                    type="text"
                    name="tt"
                    placeholder="標題"
                    onChange={(e) => {
                      needChangerHandler(e.target.value, i, 'tt');
                    }}
                  />
                </div>
                <div>
                  <div>2.</div>
                  <textarea
                    className="input"
                    placeholder="請依據標題詳細說明"
                    name="ttt"
                    cols="30"
                    rows="10"
                    style={{ resize: 'none', height: '120px' }}
                    onChange={(e) => {
                      needChangerHandler(e.target.value, i, 'ttt');
                    }}
                  ></textarea>
                </div>
              </div>
            );
          })}

          {/* <div className="need">
                        <div className="one">需求一</div>
                        <div className="two">
                            <div>需求二</div>
                            <IoMdCloseCircle size="20" />
                        </div>

                        <div>
                            <div>1.</div>
                            <input className="input" type="text" placeholder="標題" />
                        </div>
                        <div>
                            <div>2.</div>
                            <textarea
                                className="input"
                                placeholder="請依據標題詳細說明"
                                cols="30"
                                rows="10"
                                style={{ resize: 'none', height: '120px' }}
                            ></textarea>
                        </div>
                    </div> */}
        </div>

        {/* 附件上傳 */}
        <div className="file">
          <div className="fileName">
            <div>
              <div>附件上傳</div>
              <div>副檔名</div>
              <div>(選擇新專案必須上傳RFP 文件)</div>
            </div>

            <IoIosAddCircle size="20" onClick={addF} />
          </div>
          {addFile.map((v, i) => {
            return (
              <div key={i} className="two">
                <input type={'file'} onChange={onFileUpload} />
                <IoMdCloseCircle size="20" onClick={deleteFile} />
              </div>
            );
          })}
        </div>
        <div className="ps">
          備註: 將由處理人員主動與您聯繫討論預計完成時間。
        </div>

        <div className="submit" onClick={submit}>
          送出
        </div>
      </div>
    </div>
  );
}

export default Application;
