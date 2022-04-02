/**
 * @author Kandarp Parikh
 */
 import React, { Component,useEffect, useState,useRef } from 'react';
 import axios from 'axios';
 import { Button } from "@mui/material";
 import {FooterContainer} from "../../components/Footer/FooterContainer";
 import Navbar from "../../components/Navbar/NavUser"
 import { FooterWrapper, HeaderWrapper, MainContent, PageWrapper, BottomContain, Row_Complaint,
   Column_Complaint, Image } from "../LandingPage/LandingPage.style";
 import {useNavigate} from 'react-router-dom';
 import './Complaints.css';
 import TextField from "@mui/material/TextField";
 import Select from 'react-select'
 import ComplaintsImage from '../../assets/pictures/Complaints.jpg';
 import Card from '@mui/material/Card';
 import baseURL from '../../config';
 
 function LandingPage(props) {
   const [success,setSuccess] = useState("");
   const [url,setUrl] = useState("");
   const navigate = useNavigate();
   const [api_url,setAPIUrl] = useState(baseURL+'/complaints/allcomplaints/');
   const complaintId_url = baseURL+'/complaints/generateComplaintId';
   const [typeOfComplaint,setTypeOfComplaint] = useState("");
   const [data, setData] = useState('');
   const [search,setSearch] = useState('');
   const [complaint,setComplaint] = useState("");
   const [ComplaintError,setComplaintError] = useState("");
   const complaintType = [
     {value:"Delivery",label:"Delivery Related"},
     {value:"Quality",label:"Quality Related"},
     {value:"Quantity",label:"Quantity Related"},
   ]
   const orderIds = []
   const [errormsg,setErrormsg] = useState("");
   const orderId_url= baseURL+'/complaints/allorders';
   const [complaintId,setComplaintId] = useState('')
   const [orderId,setOrderId] = useState('')
   const fileInput = useRef();
   const userId = localStorage.getItem("emailId")
   const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}
   
   // Populate options for select dropdown of OrderId, Call API and get only user specific OrderIds
   axios.post(orderId_url,{data : {'userId': userId}}).then((response) => {
     for (let i = 0; i < response.data.length; i++) {
       orderIds.push({value:response.data[i].orderId,label:response.data[i].orderId});
     }
   });
   const handleChange = (ev) => {
     setSuccess(false)
   }
   
   useEffect(() => {
       const headers = {
           'Access-Control-Allow-Origin': '*',
           'Content-Type': 'application/json'
       }
       axios.get(complaintId_url,{headers: headers}).then((response) => {
       setComplaintId(response.data)
     });
   },[data]);
 
   // Set OrderId to selected value from dropdown
   const handleOrderSelect = (e) =>{
     setOrderId(e.value);
   }
 
   // Set ComplaintType to selected value from dropdown
   const handleComplaintTypeSelect = (e) =>{
     setTypeOfComplaint(e.value);
   }
 
   // This function is called when Submit Complaint Button is clicked
   const handleUpload = (ev) => {
     if(typeOfComplaint.length === 0 || orderId.length === 0 || ComplaintError.length>0 ||
       errormsg.length > 0)
     {
       if(typeOfComplaint.length === 0 || orderId.length === 0)
       {
         alert("Please select value for each dropdown")
       }
       else if(ComplaintError.length>0)
       {
         alert("Please enter atleast 15 characters in complaint description")
       }
       else if(errormsg.length>0){
         alert(errormsg)
       }
     }
     // If there are no form validation errorr then proceed to submit complaint and upload image to S3
     else
     {
     let file = fileInput.current.files[0];
     let fileParts = fileInput.current.files[0].name.split('.');
     let fileName = complaintId;
     let fileType = fileParts[1];
     console.log("Preparing the upload");
     axios.post(baseURL+"/uploadToS3",{
       fileName : fileName,
       fileType : fileType
     })
     // Get signed URL from S3 and then upload selected file to S3
     .then(response => {
       var returnData = response.data.data.returnData;
       var signedRequest = returnData.signedRequest;
       var url = returnData.url;
       setUrl(url)       
       var options = {
         headers: {
           'Content-Type': fileType
         }
       };
       axios.put(signedRequest,file,options)
       .then(result => {
         setSuccess(true);
         console.log("uploaded")
       })
       .catch(error => {
         console.log(JSON.stringify(error))
         alert("ERROR " + JSON.stringify(error));
       })
     })
     .catch(error => {
       alert(JSON.stringify(error));
     })
 
     const headers = {
       'Access-Control-Allow-Origin': '*',
       'Content-Type': 'application/json'
   }
   // API call to backend to insert complaint data to database
   axios.post(baseURL+"/complaints/addcomplaint",{headers: headers, 
   data : {
     complaintId : complaintId,
     complaintType: typeOfComplaint,
     description: complaint,
     orderId: orderId,
     photoUrl: 'https://ecofresh-complaint.s3.us-west-2.amazonaws.com/'+complaintId,
     userEmail: userId,
   }})
   .then(result => {
     alert("Complain Submitted")
    window.location.reload();
  })
  .catch(error => {
    alert("ERROR " + JSON.stringify(error));
  });
   
   }
 }
 
  // This function validation for complaint description text field
   const handlecomplaint = (e) =>{
     if(e.target.value.length < 15){
       setComplaintError("Complaint should be atleast 15 characters long");
       setErrormsg("Complaint should be atleast 15 characters long");
     }
     else{
       setComplaintError("");
       setErrormsg("");
     }
     setComplaint(e.target.value);
   }
 
     return (
       <PageWrapper>
         
       <HeaderWrapper><Navbar /></HeaderWrapper>
             <MainContent>
               <img src={ComplaintsImage} width="100%" height="300px"/>
               <h1 style={{width: 'fit-content',margin: '0 auto'}}>New Complaint</h1>
           <Card>
                   <hr></hr>
               <Row_Complaint style={{height:"50px",alignItems:"center"}}>
                   
                   <Column_Complaint  style={{ backgroundColor:'#1d3124',color:'white'}}> <div>Select OrderId :</div> </Column_Complaint>
                   <Column_Complaint style={{backgroundColor:"orange"}}><div><Select style={{ backgroundColor:'orange'}} options={orderIds} onChange={handleOrderSelect} value={orderIds[0]} /></div></Column_Complaint>
 
               </Row_Complaint>
               <Row_Complaint style={{height:"50px",alignItems:"center"}}>
                   <Column_Complaint  style={{ backgroundColor:'#1d3124',color:'white'}}> Select Complaint Type : </Column_Complaint>
                   <Column_Complaint style={{backgroundColor:"orange"}}><Select options={complaintType} onChange={handleComplaintTypeSelect}/></Column_Complaint>
                   
               </Row_Complaint>
               <Row_Complaint style={{height:"50px",alignItems:"center"}}>
                   <Column_Complaint  style={{ backgroundColor:'#1d3124',color:'white'}}> Enter Complaint Description : </Column_Complaint>
                   <Column_Complaint style={{backgroundColor:"orange"}}><TextField style ={{width: '100%',backgroundColor:'white'}}onChange={handlecomplaint} type="text"/></Column_Complaint>
               </Row_Complaint>
               {complaint.length < 15 && complaint.length!=0 && ComplaintError ? (
                             <Row_Complaint style={{height:"50px",alignItems:"center"}}>
                             <Column_Complaint></Column_Complaint>
                             <Column_Complaint><p style={{color:"red"}}>{ComplaintError}</p></Column_Complaint>
                             <Column_Complaint></Column_Complaint> 
                         </Row_Complaint>)
               :null}
               
               <Row_Complaint style={{height:"50px",alignItems:"center"}}>
                   <Column_Complaint style={{ backgroundColor:'#1d3124',color:'white'}}> Upload Image (Optional):</Column_Complaint>
                   <Column_Complaint style={{backgroundColor:"orange"}}>  <input onChange={handleChange} ref={fileInput} type="file"/></Column_Complaint>  
               </Row_Complaint>
               <Row_Complaint style={{height:"50px"}}>
                 <Column_Complaint></Column_Complaint>
                 <Column_Complaint>
               <Button style={{backgroundColor:"orange",
                     float:'right'}} onClick={handleUpload}>Submit Complaint</Button> </Column_Complaint>
               </Row_Complaint>
               <hr></hr>
           </Card>
           </MainContent>
              <FooterContainer />
 
           </PageWrapper>
     );
 
 }
 export default LandingPage;
 