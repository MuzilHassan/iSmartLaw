import PropTypes from "prop-types";
import { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import axios from "axios";

function Judge({ caseId, lawyerName, email, case_type, desc, JudgeName, noGutter }) {
  const [judgeName, setJudgeName] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleJudgeNameChange = (event) => {
    setJudgeName(event.target.value);
  };

  const handleServiceNumberChange = (event) => {
    setServiceNumber(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleInitiateCase = () => {
    try {
      const response = axios.put(
        `http://localhost:5000/api/admin/cases/${caseId}/assign-judge/${serviceNumber}`
      );
    } catch (error) {
      alert(error.message);
    }
  };

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
            Lawyer Name: {lawyerName}
          </SoftTypography>
        </SoftBox>

        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Email Address: {email}
          </SoftTypography>
        </SoftBox>

        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Case Type: {case_type}
          </SoftTypography>
        </SoftBox>

        <SoftTypography variant="caption" color="text">
          Case Description: {desc}
        </SoftTypography>
        <br />

        <SoftInput
          placeholder="Honourable Judge Name"
          size="small"
          value={judgeName}
          onChange={handleJudgeNameChange}
        />
        <br />

        <SoftInput
          placeholder="Honourable Judge Service No."
          size="small"
          value={serviceNumber}
          onChange={handleServiceNumberChange}
        />
        <br />

        <SoftInput
          type="date"
          placeholder="Date"
          value={selectedDate}
          onChange={handleDateChange}
          size="small"
        />
        <br />

        <SoftBox display="flex" alignItems="center" sx={{ cursor: "pointer" }}>
          <SoftButton
            variant="outlined"
            color="success"
            size="small"
            width="20rem"
            onClick={handleInitiateCase}
          >
            Initiate Case
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

Judge.defaultProps = {
  noGutter: false,
};

Judge.propTypes = {
  caseId: PropTypes.string.isRequired,
  lawyerName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  case_type: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  JudgeName: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Judge;
