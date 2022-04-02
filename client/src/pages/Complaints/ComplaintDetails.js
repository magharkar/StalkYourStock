/**
 * @author Kandarp Parikh
 */
import {useParams} from 'react-router-dom'
import { Button } from "@mui/material";
import { FooterContainer } from "../../components/Footer/FooterContainer";
// import Header from "../../components/Header/Header";
import { MainContent, PageWrapper, BottomContain, Row_Complaint,
  Column_Complaint, Image, HeaderWrapper } from "../LandingPage/LandingPage.style";
import ComplaintsImage from '../../assets/pictures/Complaints.jpg';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Complaints.css';
import Card from '@mui/material/Card';
import TextField from "@mui/material/TextField";
import Navbar from '../../components/Navbar/NavAdmin';
import baseURL from '../../config';
function ComplaintDetails() {
    const [complaint,setComplaint] = useState('');
    const [id,setId] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const params = useParams();
    const [api_url,setAPIUrl] = useState(baseURL+'/complaints/fetchByComplaintId');


    useEffect(()=>
        {
            setId(params.id)
            setImageUrl("https://ecofresh-complaint.s3.us-west-2.amazonaws.com/"+id)
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }

                axios.post(api_url,{headers: headers, data : {'complaintId': params.id}}).then((response) => {
                setComplaint(response.data.data);});
        },[id])

  return     (
  <PageWrapper>
<HeaderWrapper><Navbar /></HeaderWrapper>
      <MainContent>
        <img src={ComplaintsImage} width="100%" height="300px"/>
        <h1 style={{width: 'fit-content',margin: '0 auto'}}>Complaint Details</h1>
          {true ? (
    <Card>
        <hr></hr>
        <Row_Complaint style={{height:"50px",alignItems:"center"}}>
            <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}>Complaint Id : {complaint.complaintId}</Column_Complaint>
            <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}>Complaint Date : {complaint.date}</Column_Complaint>
            <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}>OrderId : {complaint.orderId}</Column_Complaint>
        </Row_Complaint>
        <Row_Complaint style={{height:"50px",alignItems:"center"}}>
            <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}>Complaint Type : {complaint.complaintType}</Column_Complaint>
            <Column_Complaint>      </Column_Complaint>
            <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}>Complaint Status : {complaint.complaintStatus}</Column_Complaint>
        </Row_Complaint>
        <hr></hr>
        <Row_Complaint style={{height:"50px",alignItems:"center"}}>
            <Column_Complaint  style={{ backgroundColor:'#1d3124',color:'white'}}> Complaint Description : </Column_Complaint>
            <Column_Complaint style={{ backgroundColor:'orange'}}>{complaint.description}</Column_Complaint>
            <Column_Complaint></Column_Complaint>
        </Row_Complaint>
        <Row_Complaint style={{height:"200px",alignItems:"center"}}>
            <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}> Complaint Image :</Column_Complaint>
            <Column_Complaint>  <img src={imageUrl} width="40%" height="200px"/></Column_Complaint>  
            <Column_Complaint>   </Column_Complaint> 
        </Row_Complaint>
        <Row_Complaint style={{height:"50px",alignItems:"center"}}>
            <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}> Complaint Resolution Message : </Column_Complaint>
            <Column_Complaint style={{ backgroundColor:'orange'}}>{complaint.resolutionMessage}</Column_Complaint>
            <Column_Complaint></Column_Complaint>
        </Row_Complaint>
        <Row_Complaint style={{height:"50px",alignItems:"center"}}>
            <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}> Reimbursement Amount : </Column_Complaint>
            <Column_Complaint style={{ backgroundColor:'orange'}}>{complaint.reimbursementAmount}</Column_Complaint>
            <Column_Complaint></Column_Complaint>
        </Row_Complaint>
        <hr></hr>
    </Card>
)
:null
          }
<br></br>
      </MainContent>

      <BottomContain>
             <FooterContainer />
         </BottomContain>
</PageWrapper>
);
}

export default ComplaintDetails
