import React from 'react';
import '../../styles/caseManagement/_checkStatePage.scss';
export default function CheckStatePage({ setCheckState }) {
  return (
    <div className="checkStateContainer">
      <div
        className="close"
        onClick={() => {
          setCheckState(false);
        }}
      >
        關閉
      </div>
      <div className="checkStateContain">
        <div className="title">申請狀態列表</div>
        <table className="checkStateTable">
          <thead>
            <tr>
              <th>案件編號</th>
              <th>申請人</th>
              <th>處理人</th>
              <th>處理狀態</th>
              <th>處理時間</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NP20221128001</td>
              <td>曾子瑜</td>
              <td>黃聖崴</td>
              <td>案件進行中</td>
              <td>2022/11/28 13:21</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>NP20221128001</td>
              <td>曾子瑜</td>
              <td>黃聖崴</td>
              <td>案件進行中</td>
              <td>2022/11/28 13:21</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>NP20221128001</td>
              <td>曾子瑜</td>
              <td>黃聖崴</td>
              <td>案件進行中</td>
              <td>2022/11/28 13:21</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>NP20221128001</td>
              <td>曾子瑜</td>
              <td>黃聖崴</td>
              <td>案件進行中</td>
              <td>2022/11/28 13:21</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
