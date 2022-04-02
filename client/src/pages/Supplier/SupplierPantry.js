/**
 * @author Sumadhur Vaidyula
 */

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../../components/Navbar/NavSupplier';
import { FooterContainer } from '../../components/Footer/FooterContainer';

function createData(Item, Quantity, Cost) {
  return { Item, Quantity, Cost };
}

const rows = [
  createData('Onions', 159, 6.0),
  createData('Tomatoes', 237, 9.0, 4.3),
  createData('Salt', 262,2.0),
  createData('Butter', 305,4.3),
  createData('Flour', 356, 3.9),
];

export default function BasicTable() {
  return (

   
    <TableContainer component={Paper}>
        <Navbar></Navbar>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow variant="h4">
            <TableCell>Items</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Cost</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Item}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Item}
              </TableCell>
              <TableCell align="right">{row.Quantity}</TableCell>
              <TableCell align="right">{row.Cost}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      
    <FooterContainer/>
    </TableContainer>
  );
}
