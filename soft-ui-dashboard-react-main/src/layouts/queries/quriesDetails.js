
import PropTypes from "prop-types";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

function queriesDetails({ userName, email, desc, noGutter }) {
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
            User Name :&nbsp;&nbsp;&nbsp; {userName}
          </SoftTypography>

          

          
        </SoftBox>
        
        
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Email Address:&nbsp;;&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {email}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

        <SoftTypography variant="caption" color="text">
          Message Query:&nbsp;&nbsp;&nbsp;
          <SoftTypography variant="caption" fontWeight="medium">
            {desc}
          </SoftTypography>
        </SoftTypography>
      
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

export default queriesDetails;
