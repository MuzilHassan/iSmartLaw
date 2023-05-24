/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import myPic from "assets/images/Mypic.jpeg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={2}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="xxl" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Function({ contact, address }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {contact}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {address}
      </SoftTypography>
    </SoftBox>
  );
}

function Court({ court, address }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {court}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {address}
      </SoftTypography>
    </SoftBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "Judge_Details", align: "left" },
    { name: "Address", align: "center" },
    { name: "Court_Address", align: "left" },
    { name: "Service_No", align: "center" },
    { name: "Appointment_Date", align: "center" },
  ],

  rows: [
    {
      Judge_Details: <Author image={myPic} name="Umar Farooq" email="umar@gmail.com" />,
      Address: <Function contact="+92 3419452545" address="Park Road, Islamabad" />,
      
      Court_Address: <Court court="High Court (Court # 302)" address="F8 Markaz, Islamabad" />,
      
      Service_No: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          123456329
        </SoftTypography>
      ),
      
      Appointment_Date: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          01/10/2022
        </SoftTypography>
      ),
     
    },
    
    {
      Judge_Details: <Author image={team3} name="Umar Farooq" email="umar@gmail.com" />,
      Address: <Function contact="+92 3419452545" address="Park Road, Islamabad" />,
      
      Court_Address: <Court court="High Court (Court # 302)" address="F8 Markaz, Islamabad" />,
      
      Service_No: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          123456329
        </SoftTypography>
      ),
      
      Appointment_Date: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          01/10/2022
        </SoftTypography>
      ),
     
    },
    
    {
      Judge_Details: <Author image={team2} name="Umar Farooq" email="umar@gmail.com" />,
      Address: <Function contact="+92 3419452545" address="Park Road, Islamabad" />,
      
      Court_Address: <Court court="High Court (Court # 302)" address="F8 Markaz, Islamabad" />,
      
      Service_No: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          123456329
        </SoftTypography>
      ),
      
      Appointment_Date: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          01/10/2022
        </SoftTypography>
      ),
     
    },
   
    
  ],
};

export default authorsTableData;
