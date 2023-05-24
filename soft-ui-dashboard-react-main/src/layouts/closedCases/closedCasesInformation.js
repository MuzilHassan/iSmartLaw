import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import ClosedCasesDetails from "./closedCasesDetails";
// Opened Cases page components

function closedCasesInformation({ data }) {
  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Closed Cases Details
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        {data.length === 0 ? (
          <SoftTypography>No Closed cases available.</SoftTypography>
        ) : (
          <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {data.map((caseData) => (
              <closedCasesInformation
                key={caseData._id}
                Judgename={caseData.judgeName}
                courtNo={caseData.courtName}
                nextHearing={caseData.nextHearing}
                PreviousComments={caseData.hearingComment[0]}
                clientName={caseData.clientName}
                lawyerName={caseData.lawyerName}
                case_type={caseData.caseType}
                desc={caseData.description}
                initiatedOn={caseData.updateAt}
              />
            ))}
          </SoftBox>
        )}
      </SoftBox>
    </Card>
  );
}

export default closedCasesInformation;
