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
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
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

const authorsTableData = {
  columns: [
    { name: "User_Details", align: "left" },
    { name: "Address", align: "left" },
    { name: "Role", align: "center" },
    { name: "Joined", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      User_Details: <Author image={myPic} name="Umar Farooq" email="umar@gmail.com" />,
      Address: <Function contact="+92 3419452545" address="Park Road, Islamabad" />,
      Role: (
        <SoftBadge variant="gradient" badgeContent="Client" color="success" size="xs" container />
      ),
      Joined: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18
        </SoftTypography>
      ),
      action: (
        <SoftBox mr={1}>
              <SoftButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </SoftButton>
            </SoftBox>
      ),
    },
    {
      User_Details: <Author image={team3} name="Alexa Liras" email="alexa@gmail.com" />,
      Address: <Function contact="+92 3331482019" address="Bahria Inclave Islamabad" />,
      Role: (
        <SoftBadge variant="gradient" badgeContent="Lawyer" color="secondary" size="xs" container />
      ),
      Joined: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          11/01/19
        </SoftTypography>
      ),
      action: (
        // <SoftTypography
        //   component="a"
        //   href="#"
        //   variant="caption"
        //   color="error"
        //   fontWeight="medium"
        // >
        //   <icon>delete</icon>
        //   Delete
        // </SoftTypography>
        <SoftBox mr={1}>
              <SoftButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </SoftButton>
            </SoftBox>
      ),
      }
  ],
};

export default authorsTableData;
