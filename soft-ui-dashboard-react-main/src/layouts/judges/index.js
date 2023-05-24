// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftButton from "components/SoftButton";
import Table from "examples/Tables/Table";

// Data
import Judges from "layouts/judges/judgesDetails";
import { Link } from "react-router-dom";

function judges() {
  const { columns, rows } = Judges;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Judges Details</SoftTypography>

              <SoftBox
                display="flex"
                alignItems="center"
                lineHeight={0}
                ml={3}
                sx={{ cursor: "poiner" }}
              >
                <Link to="/newJudge">
                  <SoftButton variant="outlined" color="success" size="small" width="20rem">
                    &nbsp;Add New Judge
                  </SoftButton>
                </Link>
              </SoftBox>
            </SoftBox>

            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default judges;
