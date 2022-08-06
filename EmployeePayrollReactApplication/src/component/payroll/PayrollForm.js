import React from 'react';
import '../payroll/payrollForm.css'
import EmployeeService from '../../service/EmployeeService';
import pimg1 from '../assets/profile-images/Ellipse -3.png';
import pimg2 from '../assets/profile-images/Ellipse 1.png';
import pimg3 from '../assets/profile-images/Ellipse -8.png';
import pimg4 from '../assets/profile-images/Ellipse -7.png';
import HomePage from '../homePage/HomePage';



class PayrollForm extends React.Component {

    constructor(props) {
        super(props)
        this.departmentArray = [];
        this.state = {

            id: '',
            name: '',
            salary: '400000',
            profilePic: '',
            gender: '',
            department: [],
            startDate: '01/01/2021',
            note: '',
            date: '01',
            month: '01',
            year: '2021',
            nameError: '',
            updateStatus: false,
            departmentError: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.onSalaryChange = this.onSalaryChange.bind(this);
        this.onReset = this.onReset.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    handleCheckBox = (event) => {
        if (!event.target.checked) {
            let index = this.departmentArray.indexOf(event.target.value);
            this.departmentArray.splice(index, 1);
            this.setState({
                [event.target.value]: false
            })
        } else {
            if (!this.departmentArray.includes(event.target.value)) {
                this.departmentArray.push(event.target.value);
                this.setState({
                    [event.target.value]: true
                })
            }
        }
        this.setState({ [event.target.name]: this.departmentArray });

        if (this.departmentArray.length > 0) {
            this.setState({departmentError :''});
        }
    };



    componentDidMount() {
        if (this.props.employeeId) {
            this.setState({ id: this.props.employeeId.employeeToEdit })
            EmployeeService.getEmployeeById(this.props.employeeId.employeeToEdit)
                .then(res => {
                    var dateArray = res.data.data.startDate.split('-');
                    var stDate = dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];
                    this.setState({
                        name: res.data.data.name,
                        salary: res.data.data.salary,
                        profilePic: res.data.data.profilePic,
                        gender: res.data.data.gender,
                        department: res.data.data.department,
                        startDate: stDate,
                        note: res.data.data.note,
                        date: dateArray[2],
                        month: dateArray[1],
                        year: dateArray[0],
                    })
                    this.departmentArray = res.data.data.department;
                })
        }
    }

    onReset() {
        this.setState({
            name: '',
            salary: '',
            profilePic: '',
            gender: '',
            department: [],
            startDate: '01/01/2021',
            note: '',
            date: '01',
            month: '01',
            year: '2021',
            nameError: '',
            departmentError: '',
        })
        this.departmentArray = [];
    }

    handleChange(event) {

        if (event.target.name === 'name') {
            let name = RegExp('^[A-Z]{1}[a-z]{3,}$')
            if (name.test(event.target.value))
                this.setState({ nameError: "" })
            else this.setState({ nameError: "Invalid name" })
        }

        if (event.target.name === "date" || event.target.name === "month" || event.target.name === "year") {
            this.setState({ [event.target.name]: event.target.value });
            this.setState({ startDate: this.state.date + "/" + this.state.month + "/" + this.state.year });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }

       
    }

    onSalaryChange(event) {
        this.setState({ salary: event.target.value });
    }

    save(event) {
        event.preventDefault();

        if (this.departmentArray.length == 0) {
            this.setState({departmentError :'select any department'});
            return;
        }
        else if (this.state.nameError === '') {

        }
        else {
            alert('Invalid name')
            return;
        }

        let object = {
            name: this.state.name,
            salary: this.state.salary,
            profilePic: this.state.profilePic,
            gender: this.state.gender,
            department: this.state.department,
            startDate: this.state.startDate,
            note: this.state.note,
        }


        if (this.state.id === '') {
            EmployeeService.addEmployee(object).then(data => {
                alert(" data added successfully")
                this.onReset();
            }).catch(err => {
                alert('err while adding');
            })
        }
        else {
            EmployeeService.updateEmployee(object, this.state.id).then(data => {
                alert(" data updated successfully")
                this.setState({ updateStatus: true })
            }).catch(err => {
                alert('err while adding');
            })
        }

    }

    render() {

        if (this.state.updateStatus === true) {
            return <HomePage />
        }

        return (<>
            <div className="form-content">
                <form action="" className="form" onSubmit={this.save}>
                    <div className="form-head">
                        Employee Payroll form
                    </div>
                    <div className="row-content">
                        <label className="label text">Name</label>
                        <input type="text" className="input" id="name" name="name" placeholder="Your name.." required value={this.state.name} onChange={this.handleChange} />
                        <error-output className="text-error" >{this.state.nameError}</error-output>
                    </div>
                    <div className="row-content">
                        <label className="label text">Profile image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="profilePic" required onChange={this.handleChange} value='../assets/profile-images/Ellipse -3.png' checked={this.state.profilePic === '../assets/profile-images/Ellipse -3.png'}></input>
                                <img src={pimg1} alt="" id="image1" className="profile" />
                            </label>
                            <label>
                                <input type="radio" id="profile2" name="profilePic" onChange={this.handleChange} value='../assets/profile-images/Ellipse 1.png' checked={this.state.profilePic === '../assets/profile-images/Ellipse 1.png'} />
                                <img src={pimg2} alt="" id="image2" className="profile" />
                            </label>
                            <label>
                                <input type="radio" id="profile3" name="profilePic" onChange={this.handleChange} value='../assets/profile-images/Ellipse -8.png' checked={this.state.profilePic === '../assets/profile-images/Ellipse -8.png'} />
                                <img src={pimg3} alt="" id="image3" className="profile" />
                            </label>
                            <label>
                                <input type="radio" id="profile4" name="profilePic" onChange={this.handleChange} value='../assets/profile-images/Ellipse -7.png' checked={this.state.profilePic === '../assets/profile-images/Ellipse -7.png'} />
                                <img src={pimg4} alt="" id="image4" className="profile" />
                            </label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text">Gender</label>
                        <div>
                            <input type="radio" id="male" name="gender" value="male" required onChange={this.handleChange} checked={this.state.gender === 'male'} />
                            <label className="text">Male</label>
                            <input type="radio" id="female" name="gender" value="female" onChange={this.handleChange} checked={this.state.gender === 'female'} />
                            <label className="text">Female</label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text">Department</label>
                        <div className="department-checkbox-content">
                            <input type="checkbox" id="hr" name="department" value="HR" className="group-required" onChange={this.handleCheckBox} checked={this.state.department.includes('HR')} />
                            <label className="text">HR</label>
                            <input type="checkbox" className="checkbox" id="sales" name="department" value="Sales" onChange={this.handleCheckBox} checked={this.state.department.includes('Sales')} />
                            <label className="text">Sales</label>
                            <input type="checkbox" className="checkbox" id="finance" name="department" value="Finance" onChange={this.handleCheckBox} checked={this.state.department.includes('Finance')} />
                            <label className="text">Finance</label>
                            <input type="checkbox" className="checkbox" id="engineer" name="department" value="Engineer" onChange={this.handleCheckBox} checked={this.state.department.includes('Engineer')} />
                            <label className="text">Engineer</label>
                            <input type="checkbox" className="checkbox" id="others" name="department" value="Others" onChange={this.handleCheckBox} checked={this.state.department.includes('Others')} />
                            <label className="text">Others</label>
                        </div>
                        <error-output className="text-error" >{this.state.departmentError}</error-output>
                    </div>
                    <div className="row-content">
                        <label className="label text">Choose your salary</label>
                        <input type="range" className="input" name="salary" id="salary" min="300000" max="500000" step="100"
                            value={this.state.salary} onChange={this.onSalaryChange} />
                        <output className="salary-output text">{this.state.salary}</output>
                    </div>
                    <div className="row-content">
                        <label className="label text">Start date</label>
                        <div className="date-content">
                            <select name="date" id="day" onChange={this.handleChange} value={this.state.date}>
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select name="month" id="month" onChange={this.handleChange} value={this.state.month}>
                                <option value="01">January</option>
                                <option value="02">Feburary</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select name="year" id="year" onChange={this.handleChange} value={this.state.year}>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                            </select>
                        </div>
                        <error-output className="date-error" ></error-output>
                    </div>
                    <div className="row-content">
                        <label className="label text">Notes</label>
                        <textarea name="note" id="note" required className="notes" placeholder="" style={{ height: 100 }} onChange={this.handleChange} value={this.state.note}></textarea>
                    </div>
                    <div className="buttonParent">
                        <a href="/" className="resetButton button cancelButton"> Cancel</a>
                        <div className="submit-reset">
                            <button className="button submitButton" id="submitButton"
                                type="submit">Submit</button>
                            <button className="button resetButton" type="reset" onClick={this.onReset} >Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </>);
    }

}



export default PayrollForm;
