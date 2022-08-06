import axios from 'axios';
import React from 'react';

class EmployeeService extends React.Component {
    baseUrl = `http://localhost:8080/employeepayrollservice/`;

    addEmployee = (data) => {
        return axios.post(this.baseUrl + 'create', data)
    }

    getEmployee = () => {
        return axios.get(this.baseUrl + 'get')
    }

    getEmployeeById = (id) => {
        return axios.get(this.baseUrl + 'get/' + id)
    }

    updateEmployee = (data, id) => {
        return axios.put(this.baseUrl + 'update/' + id , data)
    }

    deleteEmployee = (data) => {
        return axios.delete(this.baseUrl + 'delete/' + data)
    }
 }

export default new EmployeeService();