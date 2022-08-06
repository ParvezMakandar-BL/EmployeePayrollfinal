import PayrollForm from './component/payroll/PayrollForm';
import './component/payroll/payrollForm.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './component/homePage/HomePage'

function App() {
  return (
    <div>

      <header className="header-content header">
        <div className="logo-content">
          <img src="../assets/images/logo.png" alt="" />
          <div>
            <span className="emp-text">EMPLOYEE</span><br />
            <span className="emp-text emp-payroll">PAYROLL</span>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/form" element={<PayrollForm />} />
        <Route path="/form/:id" element={<PayrollForm />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

    </div>
  );
}

export default App;
