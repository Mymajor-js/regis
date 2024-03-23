import React, { useState ,useEffect ,useRef} from 'react';
import './adminshow.css';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';


function OpenCloseComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://sheet.best/api/sheets/197a5f20-fa48-43f8-8faf-2837bf44b6e6');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsAuthenticated(false); // เมื่อปิดโมดัลเลอร์ให้รีเซ็ตสถานะการตรวจสอบสิทธิ์การเข้าสู่ระบบ
  };

  const handleConfirm = () => {
    // ตรวจสอบว่าชื่อผู้ใช้และรหัสผ่านถูกต้องหรือไม่
    if (user === '11' && password === '1') {
      setIsAuthenticated(true);
      setIsOpen(false); // ปิดโมดัลเลอร์หลังจากเข้าสู่ระบบสำเร็จ
    } else {
      Swal.fire({
        icon: 'error',
        title: 'เข้าสู่ระบบล้มเหลว',
        text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      });
    }
  };

  const savedata = () => {
    const excelData = [
      ['ชื่อ-สกุล', 'รหัสนักศึกษา', 'ชั้นปี', 'สาขาวิชา', 'ฝ่ายที่สนใจ'],
      ...data.map(item => [item.fullname, item.stdid, item.level, item.subj, item.about])
    ];

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(excelBlob, 'data.xlsx');
  };


  return (
    <div class="show-content">
      {!isOpen && (
        <button onClick={handleOpen} class="buttonshow">
          <div class="svg-wrapper-1">
            <div class="svg-wrapper">
              
            </div>
          </div>
          <span>Admin</span>
        </button>
      )}
      {isOpen && !isAuthenticated && (
        <div class="show-co">
          <div class="retop">
            <h2>LOGIN</h2>
          </div>
          <div class="input-container">
            <input
              placeholder="Username"
              class="input-field"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            ></input>
            <label for="input-field" class="input-label">
              Username
            </label>
            <span class="input-highlight"></span>
          </div>
          <br />
          <div class="input-container">
            <input
              placeholder="Password"
              class="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label for="input-field" class="input-label">
              Password
            </label>
            <span class="input-highlight"></span>
          </div>
          <br />
          <button class="button aaa" onClick={handleConfirm}>
            ยืนยัน
          </button>
          <button class="btns aaa" onClick={handleClose}>
            กลับ
          </button>
        </div>
      )}
      {isAuthenticated && (
  <div class="show-co">
    <div class="table-wrapper">
      <h2>ข้อมูลผู้สมัครทั้งหมด</h2>
      <table>
        <thead>
          <tr>
            <th>ชื่อ-สกุล</th>
            <th>รหัสนักศึกษา</th>
            <th>ชั้นปี</th>
            <th>สาขาวิชา</th>
            <th>ฝ่ายที่สนใจ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.fullname}</td>
              <td>{row.stdid}</td>
              <td>{row.level}</td>
              <td>{row.subj}</td>
              <td>{row.about}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div><br></br>
    <div class="btsa">
    <button class="closebtn" onClick={savedata}>
      บันทึกเป็น PDF
    </button>
    <button class="closebtn" onClick={handleClose}>
      ปิด
    </button>
    </div>
  </div>
)}

</div>
    
  );
}

export default OpenCloseComponent;

