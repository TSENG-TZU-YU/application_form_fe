import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../styles/caseManagement/_caseManagement.scss';
import CategoryFilter from './Component/CategoryFilter.js';
import StatusFilter from './Component/StatusFilter.js';
import DateFilter from './Component/DateFilter.js';
import CheckStatePage from './Component/CheckStatePage.js';
import CaseDetail from '../CaseDetail/CaseDetail';
import { FaEye } from 'react-icons/fa';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';
import axios from 'axios';

function CaseManagement() {
  const [number, setNumber] = useState(true);
  const [time, setTime] = useState(true);
  const [checkState, setCheckState] = useState(false);
  const [caseDetailPage, setCaseDetailPage] = useState(true);
  const [dateRemind, setDateRemind] = useState('');
  const [maxDateValue, setMaxDateValue] = useState('');
  const [minDateValue, setMinDateValue] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minDate, setMinDate] = useState('');

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
      {checkState ? <CheckStatePage setCheckState={setCheckState} /> : ''}
      {caseDetailPage ? (
        <CaseDetail setCaseDetailPage={setCaseDetailPage} />
      ) : (
        ''
      )}

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
          <tbody>
            {applicationCheck.map((v, i) => {
              return (
                <tr key={i}>
                  <td>轉件人:林鈺珊</td>
                  <td>{v.case_number}</td>
                  <td>金陽信資產管理</td>
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
                    <FaEye
                      className="icons"
                      onClick={() => {
                        setCaseDetailPage(true);
                      }}
                    />
                    {/* <div className="hadClick">NEW</div> */}
                  </td>
                  <td>進度(3/4)</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CaseManagement;
