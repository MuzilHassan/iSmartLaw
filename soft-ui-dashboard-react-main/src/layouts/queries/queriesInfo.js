import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import QueriesDetails from "./quriesDetails";
// Queries page components

function queriesInfo({ data }) {
  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          User Queries Details
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {data?.map((user) => (
            <QueriesDetails
              userName={user.name}
              email={user.email}
              desc={user.description}
              key={user._id}
            />
          ))}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default queriesInfo;
