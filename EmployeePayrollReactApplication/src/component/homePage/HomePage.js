import React, { useState, useEffect } from 'react'
import EmployeeService from '../../service/EmployeeService'
import '../homePage/HomePage.css';
import delBtn from '../assets/icons/delete-black-18dp.svg';
import editBtn from '../assets/icons/create-black-18dp.svg';
import addBtn from '../assets/icons/add-24px.svg';
import PayrollForm from '../payroll/PayrollForm';

import profile1 from '../assets/profile-images/Ellipse -3.png';
import profile2 from '../assets/profile-images/Ellipse -1.png';
import profile3 from '../assets/profile-images/Ellipse -8.png';
import profile4 from '../assets/profile-images/Ellipse -7.png';

var imgUrl;

var loadImages = (img) => {
    if (img === '../assets/profile-images/Ellipse -1.png') {
        imgUrl = profile2;
    }
    if (img === '../assets/profile-images/Ellipse -3.png') {
        imgUrl = profile1;
    }
    if (img === '../assets/profile-images/Ellipse -8.png') {
        imgUrl = profile3;
    }
    if (img === '../assets/profile-images/Ellipse -7.png') {
        imgUrl = profile4;
    }

};

function HomePage(props) {

    const [employees, setEmployees] = useState([{}]);
    const [editStatus, setEdit] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);

    const fetchData = () => {
        EmployeeService.getEmployee()
            .then(res => {
                setEmployees({ employees: res.data.data })
            })
    }

    const OnDelete = (event) => {
        EmployeeService.deleteEmployee(event.target.id)
            .then(res => {
                fetchData();
            })
    }

    const onEditClick = (event) => {
        setEmployeeToEdit(event.target.id);
        setEdit(true);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (editStatus)
        return <PayrollForm employeeId={{ employeeToEdit }} />


    return (
        <div>
            <div className="main-content">
                <div className="header-content">
                    <div className="emp-detail-text">
                        Employee Detail <div className="emp-content"></div>
                    </div>
                    <a href="/form" className="add-button">
                        <img src={addBtn} alt="" />Add User</a>
                </div>

                <table className="table-main" id="display">

                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Start Date</th>
                        <th>Actions</th>
                    </tr>
                    {employees.employees && employees.employees.map((employee) => {
                        return (<tr key={employee.id}>
                            <td>
                                <img alt="" className="profile" onLoad={loadImages(employee.profilePic)} src={imgUrl} />
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.gender}</td>
                            <td>

                                {employee.department.map(dept => {

                                    return <div className="dept-label" key={dept}>{dept}</div>
                                })}
                            </td>
                            <td>&#8377; {employee.salary}</td>
                            <td>{employee.startDate}</td>
                            <td className="action-content">
                                <img src={delBtn} id={employee.id} onClick={OnDelete} alt="delete" />
                                <img src={editBtn} id={employee.id} onClick={onEditClick} alt="delete" />
                            </td>
                        </tr>)
                    })}
                </table>
            </div>
        </div>
    )
}

export default HomePage