package com.bridgelabz.employeepayrollapp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

public @Data @ToString class EmployeePayrollDTO {

    @NotEmpty(message = "Employee cannot be empty")
    @Pattern(regexp = "^[A-Z]{1}[a-zA-Z\\s]{2,}$", message = "Employee name Invalid")
    String name;

    @Min(value = 500, message = "Min salary should be more than 500")
    int salary;

    @Pattern(regexp = "male|female", message = "Gender needs to be male or female")
    String gender;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @NotNull(message = "Need to pass a valid date")
    @PastOrPresent(message = "Date needs to be in the past or today")
    LocalDate startDate;

    @NotBlank(message = "Note cannot be blank")
    String note;

    @NotBlank(message = "Profile pic cannot be blank")
    String profilePic;

    @NotNull(message = "Department cannot be empty")
    List<String> department;
}
