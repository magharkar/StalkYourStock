/**
 * @author Kandarp Parikh
 */
 import { Button } from "@mui/material";
 import {FooterContainer} from "../../components/Footer/FooterContainer";
 import Navbar from "../../components/Navbar/NavUser"
 import { FooterWrapper, HeaderWrapper, MainContent, PageWrapper, BottomContainer, Row_Complaint,
   Column_Complaint, Image } from "../LandingPage/LandingPage.style";
 import landingPageImg from '../../assets/pictures/landing-page.png';
 import lasagnaSoup from '../../assets/pictures/lasagna-soup.webp';
 import React, { useEffect, useState } from 'react'
 import axios from 'axios';
 import {useNavigate} from 'react-router-dom';
 import './Complaints.css';
 import DropDown from "../../components/CommonComponents/DropDown"
 import TextField from "@mui/material/TextField";
 import baseURL from "../../config";
 
 function LandingPage(props) {
    const navigate = useNavigate();
    const [api_url,setAPIUrl] = useState(baseURL+'/complaints/allcomplaints/');
    console.log(api_url)
    const [complaints,setComplaints] = useState([]);
    const [data, setData] = useState('');
    const [search,setSearch] = useState('');
    const complaintType = ["Delivery","Quality","Quantity"]
    const [complaintId,setComplaintId] = useState('')
    const userEmail = localStorage.getItem("emailId");
    const [orderId,setOrderId] = useState('')

    // This function gets the state of the selected value from Select Complaint Type dropdown
    const childToParent = (childdata) => {
      setData(childdata);
      if(complaintType.includes(childdata))
      {
        setAPIUrl(baseURL+'/complaints/filterByComplaintType/');
      }
      else{
          setData("")
          setAPIUrl(baseURL+'/complaints/allcomplaints/');
      }
      
    }
    useEffect(() => {
        console.log(localStorage.getItem("emailId"))
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
        if(data.length > 0 && (complaintType.includes(data)))
        {
            axios.post(api_url,{headers: headers, data : {'complaintType': data}}).then((response) => {
            setComplaints(response.data)});
        }
        else{
            axios.get(api_url,{headers: headers}).then((response) => {
                setComplaints(response.data);
            });
        }

    },[data]);
 
     const handleClick = (id) => {
         navigate(`/complaints/ComplaintDetailsPage/${id}`);
     }
 
    const SearchByComplaintId=(e)=>{
        setComplaintId(e.target.value)
        };
 
    const SearchByOrderId=(e)=>{
        setOrderId(e.target.value)
        };
 
 
   return (
     <PageWrapper>
         <HeaderWrapper><Navbar /></HeaderWrapper>
             <MainContent>
                 
                 <img src={landingPageImg} width="100%"/>
                 <h1 style={{width: 'fit-content',margin: '0 auto'}}>My Complaints</h1>
                 <br></br>
                 <Row_Complaint style={{height:"10px",alignItems:"center"}}>
                 <Column_Complaint ><DropDown childToParent={childToParent} ></DropDown></Column_Complaint>
                 <Column_Complaint><TextField onChange={SearchByComplaintId}  id="name-input" name="name" label="Search by ComplaintId" type="text"/></Column_Complaint>
                 <Column_Complaint><TextField onChange={SearchByOrderId}  id="name-input" name="name" label="Search by OrderId" type="text"/></Column_Complaint>
                 </Row_Complaint>
                 
                 {!search.length > 0 ? (complaints.map((r) => (
                 <div >
                     {complaintId.length > 0 && r.complaintId.toLowerCase().startsWith(complaintId) && r.userEmail === userEmail? (
 
                         <Row_Complaint style={{height:"1%" , color:'Black' , backgroundColor:'orange', padding:'30px'}}>
                         <Column_Complaint >Complaint Id : {r.complaintId}</Column_Complaint>
                         <Column_Complaint >OrderId : {r.orderId}</Column_Complaint>
                         <Column_Complaint >ComplaintStatus : {r.complaintStatus}</Column_Complaint>
                         <Button variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"250px"}} onClick={() => handleClick(r.complaintId)}>Complaint Details</Button>
                         </Row_Complaint>
 
                     ) : null}
 
                     {orderId.length > 0 && r.orderId.startsWith(orderId) && r.userEmail == userEmail? (
 
                     <Row_Complaint style={{height:"1%" , color:'Black' , backgroundColor:'orange', padding:'30px'}}>
                     <Column_Complaint >Complaint Id : {r.complaintId}</Column_Complaint>
                     <Column_Complaint >OrderId : {r.orderId}</Column_Complaint>
                     <Column_Complaint >ComplaintStatus : {r.complaintStatus}</Column_Complaint>
                     <Button variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"250px"}} onClick={() => handleClick(r.complaintId)}>COmplaint Details</Button>
                     </Row_Complaint>
 
                     ) : null}
 
                     {complaintId.length === 0 && orderId.length === 0 && r.userEmail == userEmail? (
 
                     <Row_Complaint style={{height:"1%" , color:'Black' , backgroundColor:'orange', padding:'30px'}}>
                     <Column_Complaint >Complaint Id : {r.complaintId}</Column_Complaint>
                     <Column_Complaint >OrderId : {r.orderId}</Column_Complaint>
                     <Column_Complaint >ComplaintStatus : {r.complaintStatus}</Column_Complaint>
                     <Button variant="contained" style={{color: 'white', backgroundColor: "#1D3124",width:"250px"}} onClick={() => handleClick(r.complaintId)}>Complaint Details</Button>
                     </Row_Complaint>
 
                     ) : null}
                 </div>
     )))
     :
     <div >
     <Row_Complaint style={{height:"1%" , color:'Black' , backgroundColor:'orange', padding:'30px'}}>
         <Column_Complaint >Complaint Id : {complaints.complaintId}</Column_Complaint>
         <Column_Complaint >OrderId : {complaints.orderId}</Column_Complaint>
         <Column_Complaint >ComplaintStatus : {complaints.complaintStatus}</Column_Complaint>
     </Row_Complaint>
     </div>
                 }
 <br></br>
                 <Row_Complaint>
                     <Column_Complaint><Image src={lasagnaSoup} width="100%" height="100%"/></Column_Complaint>
                     <Column_Complaint className="text">
                     </Column_Complaint>
                 </Row_Complaint>
             </MainContent>

             <FooterContainer />
     </PageWrapper>
   );
 }
 
 export default LandingPage;