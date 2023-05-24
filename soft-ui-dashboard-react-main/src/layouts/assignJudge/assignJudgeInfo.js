import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import JudgeDetails from "./judge";
import { useState, useEffect } from "react";
import axios from "axios";

function AssignJudgeInfo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/cases/pending");
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Case Requests
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {data.length > 0 ? (
            data.map((item) => (
              <JudgeDetails
                key={item._id}
                lawyerName={item.lawyerName}
                case_type={item.caseType}
                email={item.email}
                desc={item.description}
                JudgeName={item.judgeName}
                caseId={item._id}
              />
            ))
          ) : (
            <JudgeDetails
              lawyerName="Muzil"
              case_type="civil"
              email="oliver@burrito.com"
              desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              JudgeName="Judge Name"
            />
          )}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default AssignJudgeInfo;
