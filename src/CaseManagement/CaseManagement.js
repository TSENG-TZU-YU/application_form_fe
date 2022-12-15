import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/config';
import axios from 'axios';
import { useAuth } from '../utils/use_auth';

import '../styles/caseManagement/_caseManagement.scss';
import CategoryFilter from './Component/CategoryFilter.js';
import StatusFilter from './Component/StatusFilter.js';
import DateFilter from './Component/DateFilter.js';
import CheckStatePage from './Component/CheckStatePage.js';

import { FaEye } from 'react-icons/fa';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';

function CaseManagement({ setCaseNum, setCaseId }) {
  const { member, setMember } = useAuth();
  const [number, setNumber] = useState(true);
  const [time, setTime] = useState(true);
  const [checkState, setCheckState] = useState(false);
  const [dateRemind, setDateRemind] = useState('');
  const [maxDateValue, setMaxDateValue] = useState('');
  const [minDateValue, setMinDateValue] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [memberId, setMemberId] = useState('');
  const [allData, setAllData] = useState([]);
  const [caseHistory, setCaseHistory] = useState([]);
  const [nowState, setNowState] = useState('');

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
  }, []);

  // 取得所有資料
  useEffect(() => {
    let getCampingData = async () => {
      let response = await axios.get(`${API_URL}/applicationData`, {
        withCredentials: true,
      });
      // console.log(response.data.result);
      if (member.permissions_id === 1) {
        setAllData(response.data.result);
      }
      if (member.permissions_id === 3) {
        setAllData(response.data.handlerResult);
      }
    };
    getCampingData();
  }, [member]);

  // 審查 history
  let handleCaseHistory = async (caseNum) => {
    let response = await axios.get(
      `${API_URL}/applicationData/getCaseHistory/${caseNum}`,
      {
        withCredentials: true,
      }
    );
    setCaseHistory(response.data.result);
  };

  // put 狀態 4 -> 5
  let handleChangeState = async (caseNum, caseId) => {
    let response = await axios.post(
      `${API_URL}/applicationData/changeState/${caseNum}`,
      { handler: allData[0].handler, id: caseId },
      {
        withCredentials: true,
      }
    );
    // console(response.data.result);
  };

  return (
    <>
      {/* <Header> */}
      {checkState ? (
        <CheckStatePage
          setCheckState={setCheckState}
          caseHistory={caseHistory}
        />
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

          {allData.map((v) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td>
                    {v.valid === 1 && v.transfer === 1
                      ? `轉件人:${v.sender}`
                      : ''}
                  </td>
                  <td>{v.case_number}</td>
                  <td>{v.applicant_unit}</td>
                  <td>{v.user}</td>
                  <td>{v.handler}</td>
                  <td>{v.application_category}</td>
                  <td>{v.create_time}</td>
                  <td
                    onClick={() => {
                      setCheckState(true);
                      handleCaseHistory(v.case_number);
                    }}
                  >
                    <span className="viewList">{v.name}</span>
                  </td>
                  <td className="posClick">
                    <Link to={`caseDetail/application/${v.case_number}`}>
                      <FaEye
                        className={`icons ${
                          v.name === '申請中' && member.permissions_id === 3
                            ? 'eyeBcg'
                            : ''
                        }`}
                        onClick={() => {
                          setCaseNum(v.case_number);
                          setCaseId(v.id);
                          if (
                            v.name === '申請中' &&
                            member.permissions_id === 3
                          ) {
                            handleChangeState(v.case_number, v.id);
                          }
                        }}
                      />
                    </Link>

                    {/* <div className="hadClick">NEW</div> */}
                  </td>
                  <td>
                    進度({v.cou}/{v.sum})
                  </td>
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
