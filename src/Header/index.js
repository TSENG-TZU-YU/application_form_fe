import React from 'react';
import './index.scss';

//react-icons
import { HiPencilAlt } from 'react-icons/hi';
import { RiFileTextLine } from 'react-icons/ri';
import { RiPhoneFindFill } from 'react-icons/ri';
import { MdOutlineLogout } from 'react-icons/md';

//子頁面
import Application from '../Application';

function Header() {
    return (
        <>
            <div className="navTop">
                <h3>陽信</h3>
                <MdOutlineLogout size="30"/>
            </div>
            <div className="between">
                <div className="navRight">
                    <div>公司:陽信電子商務</div>
                    <div>姓名:曾子瑜</div>
                    <div>職別:職員</div>

                    {/* 使用者 */}
                    <div className="bold">
                        <HiPencilAlt size="20" />
                        申請表
                    </div>
                    <div className="bold">
                        <RiFileTextLine size="20" />
                        申請紀錄查詢
                    </div>

                    {/* 處理人/協理/主管 */}
                    <div className="bold">
                        <RiPhoneFindFill size="20" />
                        案件審理作業
                    </div>
                </div>
                <div className="left">
                    <Application />
                </div>
            </div>
        </>
    );
}

export default Header;
