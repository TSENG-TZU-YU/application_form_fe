import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/config';
import axios from 'axios';

import '../styles/caseManagement/_caseManagement.scss';
import CategoryFilter from './Component/CategoryFilter.js';
import StatusFilter from './Component/StatusFilter.js';
import DateFilter from './Component/DateFilter.js';
import CheckStatePage from './Component/CheckStatePage.js';

import { FaEye } from 'react-icons/fa';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';

function CaseManagement() {
  const [number, setNumber] = useState(true);
  const [time, setTime] = useState(true);
  const [checkState, setCheckState] = useState(false);
  const [dateRemind, setDateRemind] = useState('');
  const [maxDateValue, setMaxDateValue] = useState('');
  const [minDateValue, setMinDateValue] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [allData, setAllData] = useState([]);

  // 取得所有資料
  useEffect(() => {
    let getCampingData = async () => {
      let response = await axios.get(`${API_URL}/applicationData`);
      setAllData(response.data.result);
    };
    getCampingData();
  }, []);

  const [applicationCheck, setApplicationCheck] = useState([]);

  useEffect(() => {
    async function getCheck() {
      try {
        let res = await axios.get(
          'http://localhost:3001/api/application_check'
        );
        setApplicationCheck(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getCheck();
  }, []);

  return (
    <>
      {/* <Header> */}
      {checkState ? <CheckStatePage setCheckState={setCheckState} /> : ''}

      <div className="caseContainer">
        {/* 篩選 */}
        <div className="sortSelect">
          <div className="bothFilter">
            <CategoryFilter />
            <StatusFilter />
          </div>
          <DateFilter
            dateRemind={dateRemind}
            setDateRemind={setDateRemind}
            setMaxDate={setMaxDate}
            setMinDate={setMinDate}
            maxDateValue={maxDateValue}
            setMaxDateValue={setMaxDateValue}
            minDateValue={minDateValue}
            setMinDateValue={setMinDateValue}
          />
        </div>

        <table className="caseContain">
          <thead>
            <tr>
              <th></th>
              <th className="sortBtn">
                案件編號
                {number ? (
                  <MdArrowDropDown
                    className="arrow"
                    onClick={() => {
                      setNumber(false);
                    }}
                  />
                ) : (
                  <MdArrowDropUp
                    className="arrow"
                    onClick={() => {
                      setNumber(true);
                    }}
                  />
                )}
              </th>
              <th>申請單位</th>
              <th>申請人</th>
              <th>處理人</th>
              <th>申請類別</th>
              <th className="sortBtn">
                申請時間
                {time ? (
                  <MdArrowDropDown
                    className="arrow"
                    onClick={() => {
                      setTime(false);
                    }}
                  />
                ) : (
                  <MdArrowDropUp
                    className="arrow"
                    onClick={() => {
                      setTime(true);
                    }}
                  />
                )}
              </th>
              <th>申請狀態</th>
              <th></th>
              <th>需求進度</th>
            </tr>
          </thead>

          {allData.map((v) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td>轉件人:林鈺珊</td>
                  <td>{v.case_number}</td>
                  <td>{v.applicant_unit}</td>
                  <td>{v.user}</td>
                  <td>{v.handler}</td>
                  <td>{v.application_category}</td>
                  <td>{v.create_time}</td>
                  <td
                    onClick={() => {
                      setCheckState(true);
                    }}
                  >
                    <span className="viewList">{v.name}</span>
                  </td>
                  <td className="posClick">
                    <Link to={`caseDetail/${v.case_number}`}>
                      <FaEye className="icons" />
                    </Link>

                    {/* <div className="hadClick">NEW</div> */}
                  </td>
                  <td>進度(3/4)</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      {/* </Header> */}
    </>
  );
}

export default CaseManagement;
