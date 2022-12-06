import React, { useState } from 'react';
import './index.scss';

//react-icons
import { IoIosAddCircle } from 'react-icons/io';
import { IoMdCloseCircle } from 'react-icons/io';

function Application() {
    const [addNeed, setAddNeed] = useState([]);
    const add = (index) => {
        const newAdd = {
            need: Number(new Date()),
        };
        const newAdds = [newAdd, ...addNeed];
        setAddNeed(newAdds);
        console.log('1', newAdds);
    };

    //單個檔案上傳
    const onFileUpload = (event) => {
        console.log(event.target.files[0]);
    };
    return (
        <div className="scroll">
            <div className="container">
                <h3>申請表</h3>
                <div className="vector"></div>
                <div className="box">
                    <div>
                        <div>處理人</div>
                        <select className="handler">
                            <option> -----請選擇-----</option>
                            <option>郭彥岐(由單位主管分配)</option>
                            <option>連佳豪</option>
                            <option>王裕億</option>
                            <option>林祐生</option>
                        </select>
                    </div>
                    <div>
                        <div>申請類別</div>
                        <select className="handler">
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
                        <input className="handler" type="text" />
                    </div>
                    {/* 週期 */}
                    <div>
                        <div>該功能使用次數</div>
                        <div className="check handler">
                            <div class="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                <label className="form-check-label">一次性</label>
                            </div>
                            <div class="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" checked />
                                <label className="form-check-label">短期</label>
                            </div>
                            <div class="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" checked />
                                <label className="form-check-label">長期</label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 需求 */}
                <div className="add handler">
                    <div>(增加列點1. 2.)</div>
                    <IoIosAddCircle size="20" onClick={add} />
                </div>
                <div className="needs">
                    {addNeed.map((v, i) => {
                        return (
                            <div className="need">
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
                        <IoIosAddCircle size="20" />
                    </div>
                    <input type={'file'} onChange={onFileUpload} />
                </div>
                <div className="ps">備註: 將由處理人員主動與您聯繫討論預計完成時間。</div>

                <div className="submit">送出</div>
            </div>
        </div>
    );
}

export default Application;
