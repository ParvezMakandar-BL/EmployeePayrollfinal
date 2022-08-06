package com.bridgelabz.employeepayrollapp.controller;

import com.bridgelabz.employeepayrollapp.dto.EmployeePayrollDTO;
import com.bridgelabz.employeepayrollapp.dto.ResponseDTO;
import com.bridgelabz.employeepayrollapp.implementation.IEmployeePayrollService;
import com.bridgelabz.employeepayrollapp.model.EmployeePayrollData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


//@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@CrossOrigin(allowedHeaders = "*", origins = "*")

@RestController
@RequestMapping("/employeepayrollservice")
public class EmployeePayrollController {

    @Autowired
    private IEmployeePayrollService employeePayrollService;

    @GetMapping(value = {"/", "", "/get"})
    public ResponseEntity<ResponseDTO> getEmployeePayrollData() {
        List<EmployeePayrollData> empData = null;
        empData = employeePayrollService.getEmployeePayrollData();
        ResponseDTO responseDTO = new ResponseDTO("Get call successful", empData);
        return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
    }

    @GetMapping("/get/{empId}")
    public ResponseEntity<ResponseDTO> getEmployeePayrollData(@PathVariable("empId") long empId) {
        EmployeePayrollData empData = employeePayrollService.getEmployeePayrollDataById((int)empId);
        ResponseDTO responseDTO = new ResponseDTO("Get call for id successful", empData);
        return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> createEmployeePayroll(@Valid @RequestBody EmployeePayrollDTO employeePayrollDTO) {
        EmployeePayrollData empData = null;
        empData = employeePayrollService.createEmployeePayrollData(employeePayrollDTO);
        ResponseDTO responseDTO = new ResponseDTO("Created employee payroll dto", empData);
        return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
    }

    @PutMapping("/update/{empid}")
    public ResponseEntity<ResponseDTO> updateEmployeePayroll(@Valid @PathVariable("empid") long empId, @RequestBody EmployeePayrollDTO employeePayrollDTO) {
        EmployeePayrollData empData = null;
        empData = employeePayrollService.updateEmployeePayrollData((int)empId, employeePayrollDTO);
        ResponseDTO responseDTO = new ResponseDTO("Updated employee payroll dto", empData);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{empid}")
    public ResponseEntity<ResponseDTO> deleteEmployeePayroll(@PathVariable("empid") long empId) {
        employeePayrollService.deteleEmployeePayrollDataById((int)empId);
        ResponseDTO responseDTO = new ResponseDTO("Deleted employee payroll for id ", empId);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
}
