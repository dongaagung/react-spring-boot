import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import employeeService from "../services/employee.service";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 



const EmployeesList = () => {

  const[employees, setEmployees] =  useState([]);

  useEffect(() => {
    init();
  },[])

  const init = () => {
    employeeService.getAll()
    .then(response => {
      setEmployees(response.data);
      setTimeout(function(){
        $('#example').DataTable();
         } ,100);
    })
    .catch(error => {
      console.log('Something wrong', error);
    })
  }

  const deleteSweetAlert = (id) => {
    swal({  
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(willDelete => { 
        if(willDelete) {
          employeeService.removeUsingUpdate(id)
          .then(response => {
            init();
          });  
          swal("Poof! Your data file has been deleted!", {
            icon: "success",
          });
        }else{
          swal("Your data file is safe!");
        }
      })
    .catch(error =>{
      console.log('something wrong ',error);
    })
  }

  return (
    <div className="container">
      <hr/>
      <div class="jumbotron jumbotron-fluid text-center">
        <div class="container">
          <h1 class="display-4">List of Employees</h1>
          <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </div>
      </div>
      <hr/>
      <div>
          <Link to="/add" className="btn btn-primary mb-2">Add Employee</Link>
        <table id="example" className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Location</th>
              <th>Department</th>
              <th>Actions</th>

            </tr> 
          </thead>
          <tbody>
          {
            employees.map((employee, index) =>(
              <tr key={employee.id}>
                <td>{index +1}</td>
                <td>{employee.name}</td>
                <td>{employee.location}</td>
                <td>{employee.department }</td>
                <td>
                    <Link className="btn btn-info" to={`/employees/edit/${employee.id}`}>Update</Link>
                    <button className="btn btn-danger ml-2" onClick={() => {deleteSweetAlert(employee.id)}}>Delete</button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
    );
}
 
export default EmployeesList;
