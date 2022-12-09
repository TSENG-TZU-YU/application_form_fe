import React, { useEffect, useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//react-icons
import { HiPencilAlt } from 'react-icons/hi';
import { RiFileTextLine } from 'react-icons/ri';
import { RiPhoneFindFill } from 'react-icons/ri';
import { MdOutlineLogout } from 'react-icons/md';

//hook
import { useAuth } from '../utils/use_auth';

function Header({
  setApplication,
  application,
  caseManagement,
  setCaseManagement,
  setTrial,
  trial,
}) {
  const navigate = useNavigate();

  //使用者資料
  const { member, setMember } = useAuth();

  //權限
  const [user, setUser] = useState();
  // const { director, setDirector } = useAuth();
  const [handler, setHandler] = useState();
  // const { associate, setAssociater } = useAuth();
  console.log('user', user);
  console.log('handler', handler);
  console.log('member.id', member);
  console.log('member.permissions', member.permissions_id);
  //會員登入狀態判斷
  useEffect(() => {
    async function getMember() {
      try {
        // console.log('檢查是否登入');
        let response = await axios.get(`http://localhost:3001/api/login/auth`, {
          withCredentials: true,
        });

        setMember(response.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
    getMember();

    //TODO:刷新後權限會不見
    if (member.permissions_id === 1) {
      setUser(true);
      setHandler(false);
    }
    if (member.permissions_id === 2) {
      setUser(true);
      setHandler(true);
    }
    if (member.permissions_id === 3 || member.permissions_id === 4) {
      setHandler(true);
      setUser(false);
    }
  }, []);

  const logOut = async () => {
    try {
      let res = await axios.get('http://localhost:3001/api/logout');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const app = () => {
    if (caseManagement || trial) {
      setCaseManagement(false);
      setTrial(false);
    }

    setApplication(true);
  };
  const cas = () => {
    if (application || trial) {
      setApplication(false);
      setTrial(false);
    }
    setCaseManagement(true);
  };
  const tri = () => {
    if (application || caseManagement) {
      setApplication(false);
      setCaseManagement(false);
    }
    setTrial(true);
  };

  return (
    <>
      <div className="navTop">
        <h3>陽信</h3>
        <MdOutlineLogout size="30" onClick={logOut} />
      </div>
      <div className="between">
        <div className="navRight">
          <div>公司:{member.applicant_unit}</div>
          <div>姓名:{member.name}</div>
          <div>職別:{member.job}</div>

          {/* 使用者/主管 */}
          {user ? (
            <>
              <Link to="application">
                <div
                  className={`bold ${application ? 'link' : ''}`}
                  onClick={app}
                >
                  <HiPencilAlt size="20" />
                  申請表
                </div>
              </Link>
              <Link
                className={` ${caseManagement ? 'link' : ''}`}
                to="/header"
                onClick={cas}
              >
                <div className="bold">
                  <RiFileTextLine size="20" />
                  申請紀錄查詢
                </div>
              </Link>
            </>
          ) : (
            ''
          )}
          {handler ? (
            <>
              <Link to="">
                {/* 處理人/協理/主管 */}
                <div className={`bold ${trial ? 'link' : ''}`} onClick={tri}>
                  <RiPhoneFindFill size="20" />
                  案件審理作業
                </div>
              </Link>
            </>
          ) : (
            ''
          )}
        </div>

        <div className="left">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Header;
