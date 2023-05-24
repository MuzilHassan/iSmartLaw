import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

function closedCasesDetails({
  Judgename,
  courtNo,
  nextHearing,
  PreviousComments,
  lawyerName,
  clientName,
  case_type,
  desc,
  initiatedOn,

  noGutter,
}) {
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <SoftBox width="100%" display="flex" flexDirection="column">
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
            Hounorable Judge Name : {Judgename}
          </SoftTypography>

          <SoftBox
            display="flex"
            alignItems="center"
            lineHeight={0}
            ml={3}
            sx={{ cursor: "poiner" }}
          >
            <SoftButton variant="outlined" color="dark" size="small">
              <Icon fontSize="small">picture_as_pdf</Icon>
              &nbsp;Detailed Decision
            </SoftButton>
          </SoftBox>
        </SoftBox>

        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            court
            No:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {courtNo}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Next Hearing Date:&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {nextHearing}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Last Comments:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {PreviousComments}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Lawyer Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {lawyerName}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Client Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {clientName}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Case
            Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {case_type}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

        <br />
        <SoftTypography variant="caption" color="text">
          Case Description:&nbsp;&nbsp;&nbsp;
          <SoftTypography variant="caption" fontWeight="medium">
            {desc}
          </SoftTypography>
        </SoftTypography>
        <br />
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Initiated On:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {initiatedOn}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of opened Cases
open.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Opened
open.propTypes = {
  name: PropTypes.string.isRequired,
  case_type: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default closedCasesDetails;
