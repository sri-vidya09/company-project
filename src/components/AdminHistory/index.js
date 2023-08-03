import { useEffect, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const AdminHistory = (props) => {
  const [formattedDate, setFormattedDate] = useState(""); 
  const { details } = props;
  const { id, transaction_name, category, amount, type, date,user_id } = details;
  const isCredit = type === "credit" ? "creditColor" : "debitColor";
  const usersList = [
    { username: "Jane Doe", userId: 1 },
    { username: "samsmith", userId: 2 },
    { username: "admin", userId: 3 },
    { username: "Rahul", userId: 4 },
    { username: "Teja", userId: 5 },
    { username: "Lokesh", userId: 6 },
    { username: "Ramesh", userId: 7 },
    { username: "Suresh", userId: 8 },
    { username: "Prem", userId: 9 },
    { username: "piyush", userId: 10 },
    { username: "isha", userId: 12 },
    { username: "Seema", userId: 14 },
    { username: "Arjun", userId: 15 },
    { username: "radha", userId: 16 },
    { username: "phani", userId: 17 }
  ];
  const filterUser = usersList.filter((user) => user.userId === user_id);
  const username = filterUser.length > 0 ? filterUser[0].username : "User Not Found";


  
  console.log(details);


  const cookiData=Cookies.get("user")
      const userId=JSON.parse(cookiData)
    
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role":"user",
          "x-hasura-user-id":`${userId.id}`
        },
        body:JSON.stringify({id:id})
      };
const deleteFunction= async(close)=>{
     const response=await fetch("https://bursting-gelding-24.hasura.app/api/rest/delete-transaction",options);
     const data=await response.json();
     close()
     console.log(data)
     console.log(id)
     window.location.reload()
}
  const dateFunction = (receivedDate) => {
    const date = new Date(receivedDate);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const formattedDate = `${day} ${month}`;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${(hours % 12) || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${amPm}`;
    const formattedDateTime = `${formattedDate}, ${formattedTime}`;
    setFormattedDate(formattedDateTime); 
  };

  useEffect(() => {
    dateFunction(date);
  }, []);

  return (
    <li className="user-list">
      {type === "credit" ? (
        <BsArrowUpCircle className={`iconer ${isCredit}`} />
      ) : (
        <BsArrowDownCircle className={`iconer ${isCredit}`} />
      )}
      
       <img src="https://s3-alpha-sig.figma.com/img/57d3/d250/790e98129931897251abd3915a931233?Expires=1691971200&Signature=YpaWRkaWOMdRC5HT4eTffn-NvDJxxf87hiX0hFvxbYrqmtXgzo2fy1v7-1j3fhGi1i2q8E2sBQ3sDg38jHyhS5UEBGcES6qoFsHXcB0zNpah~C8kKu61euDChDEf2US2RTAKAcyLo41iXSSFuvbwDXp2MKzdu8EPzResV9XNbvy6MC493bdr94WOIT1~c9tQDEBFLnj7xFgchyvFQIbHiVVJGE9l30oM3Lv0h~k-gTag6a-1YqHa502qT0ujMMQ6Lo1QTPnMx2vJHQhhr5CB2s0hgiHyfNLTg44Nz-sqV0-kgBp~2gUgXdRTCA-FrM3noqjsRX1eQxDQxqs7fZfeEQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="profile-logo" className='user-logo' />
      <p className="paragraph">{username}</p>
      <div className="list-items">
      <p className="paragraph">{transaction_name}</p>
        <p className="paragraph">{category}</p>
        <p className="paragraph">{formattedDate}</p>
        {type === "credit" ? (
          <p className="creditColor">+{amount}</p>
        ) : (
          <p className="debitColor">-{amount}</p>
        )}
      </div>    
    </li>
  );
};

export default AdminHistory;