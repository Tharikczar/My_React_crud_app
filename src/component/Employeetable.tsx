import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: string;
  name: string;
  email: string;
  contactNo: string;
  education: {
    educationType: string;
    percentage: string;
    passedOutYear: string;
  }[];
}

const Employeetable = () => {
  const navigateTo = useNavigate();
  const employeeEdit = (id: string) => {
    console.log(`Editing employee with id: ${id}`);
    navigateTo(`/editEmployee/${id}`)
    // Handle the edit logic here
  };

  const homeScreen = () => {
    navigateTo('/');
  };
  const [empDate, empDataChanges] = useState<Employee[]>([]);
  useEffect(() => {
    fetch("http://localhost:8000/posts") // Ensure the correct endpoint
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        empDataChanges(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);


  return (
    <>
      <div className='flex justify-end'>
        <Button variant="text" type="reset" color="secondary" size="large" onClick={homeScreen}>
          Home Page
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email&nbsp;(g)</TableCell>
              <TableCell align="right">Contant No&nbsp;(g)</TableCell>
              <TableCell align="right">Action&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empDate && empDate?.map((employee, index) => (
              <TableRow
                key={employee?.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">{employee.name}</TableCell>
                <TableCell align="right">{employee.email}</TableCell>
                <TableCell align="right">{employee.contactNo}</TableCell>
                <TableCell align="center" className='flex justify-around'>
                  <Button className='mx-3' variant="contained" size="small" onClick={() => { employeeEdit(employee.id) }}>
                    Edit
                  </Button><Button className='mx-3' variant="outlined" color="error" size="small">
                    Delete
                  </Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Employeetable