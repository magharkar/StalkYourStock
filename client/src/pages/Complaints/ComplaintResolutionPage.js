/**
 * @author Kandarp Parikh
 */
import {useParams} from 'react-router-dom'
import { Button } from "@mui/material";
import { FooterContainer } from "../../components/Footer/FooterContainer";
import { MainContent, PageWrapper, BottomContain, Row_Complaint,
  Column_Complaint, HeaderWrapper } from "../LandingPage/LandingPage.style";
import ComplaintsImage from '../../assets/pictures/Complaints.jpg';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Complaints.css';
import Card from '@mui/material/Card';
import TextField from "@mui/material/TextField";
import Navbar from '../../components/Navbar/NavAdmin';
import baseURL from '../../config';

function ComplaintResolution() {
    const [complaint,setComplaint] = useState('');
    const [id,setId] = useState('')
    const params = useParams();
    const [api_url,setAPIUrl] = useState(baseURL+'/complaints/fetchByComplaintId');
    const [reimbursementAmount,setreimbursementAmount] = useState('')
    const [resolutionMessage,setresolutionMessage] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const AddResolutionMesage = (e) =>{
        setresolutionMessage(e.target.value)
    }
    
    const AddResolutionAmount = (e) => {
        setreimbursementAmount(e.target.value)
    }

function AddResolution()
    {
        console.log("add called")
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
        axios.post(baseURL+"/complaints/addresolution",{headers: headers, data : {'complaintId': params.id,
        "reimbursementAmount":reimbursementAmount, "resolutionMessage":resolutionMessage}})
    }

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
        <h1 style={{width: 'fit-content',margin: '0 auto'}}>Complaint Resolution</h1>
          {true ? (
    <Card >
            <hr></hr>
        <Row_Complaint style={{height:"10px",alignItems:"center"}}>
            <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}>Complaint Id : {complaint.complaintId}</Column_Complaint>
            <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}>Complaint Date : {complaint.date}</Column_Complaint>
            <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}>OrderId : {complaint.orderId}</Column_Complaint>
        </Row_Complaint>
        <Row_Complaint style={{height:"10px",alignItems:"center"}}>
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
        <hr></hr>
        <form>
        <Row_Complaint style={{height:"50px",alignItems:"center"}}>
            <Column_Complaint> Resolution message <p></p>
            <TextField onChange={AddResolutionMesage} style={{width: '800px',margin: '0 auto'}} id="name-input" name="name" label="Resolution Message" type="text"/>
            </Column_Complaint>
        </Row_Complaint>
        <Row_Complaint style={{height:"50px",alignItems:"center"}}>
            <Column_Complaint> Reimbursement amount ($)<p></p>
            <TextField onChange={AddResolutionAmount} style={{width: '200px',margin: '0 auto'}} id="name-input" name="name" label="Resolution Amount" type="text"/>
            </Column_Complaint>
        </Row_Complaint>
        <Button type="submit" style={{backgroundColor:'orange', color:'black',margin: '0 50%'}} onClick={AddResolution}>Submit</Button>
        </form>
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

export default ComplaintResolution
