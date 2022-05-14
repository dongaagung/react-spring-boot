import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import employeeService from "../services/employee.service";



const AddEmployee = () => {
    const[name,setName] = useState('');
    const[location,setLocation] = useState('');
    const[department,setDepartment] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();


    const saveEmployee = (e) => {
        e.preventDefault();

        const employee = {name,location,department,id}; 
        if (id) {
            //update
            employeeService.update(employee)
            .then(response => {
                navigate("/");
            })
            .catch(error => {
                console.log("something wrong", error);
            })
        }else {
            //add
            employeeService.create(employee)
            .then(response => {
                navigate("/");
            })
            .catch(error => {
                console.log("something wrong", error);
            })
        }
    }

    useEffect(() => {
        if (id) {
            employeeService.getById(id)
            .then(employee =>{
                setName(employee.data.name);
                setDepartment(employee.data.department);
                setLocation(employee.data.location);
            })
            .catch(error => {
                console.log("something wrong", error);
            });
        }
    }, [])

    return(
        <div className="container">
            <hr/>
            <h3>Add new Employee</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input type="text"
                    className="form-control col-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name">
                    </input>
                </div>
                <div className="form-group">
                    <input type="text"
                    className="form-control col-4"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Enter department">
                    </input>
                </div>
                <div className="form-group">
                    <input type="text"
                    className="form-control col-4"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location">
                    </input>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={(e) => saveEmployee(e)}>Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/" className="btn btn-info mb-2">Back to list</Link>
        </div>
    )

    
}
 
export default AddEmployee;