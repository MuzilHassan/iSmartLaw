// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import OpenedCases from "layouts/openedCases";
import ClosedCases from "layouts/closedCases";
import Queries from "layouts/queries"
import AssignJudge from "layouts/assignJudge"
import SignIn from "layouts/authentication/sign-in";
import Judges from "layouts/judges";
import Profile from "layouts/profile"
import NewJudge from "layouts/newJudge";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Users",
    key: "Users",
    route: "/Users",
    icon: <Document size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Judges",
    key: "judges_details",
    route: "/judges_details",
    icon: <CustomerSupport size="12px" />,
    component: <Judges/>,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Case Requests",
    key: "Case_Requests",
    route: "/Case_Requests",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Opened Cases",
    key: "Opened-Cases",
    route: "/Opened-Cases",
    icon: <Cube size="12px" />,
    component: <OpenedCases />,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Closed Cases",
    key: "Closed-Cases",
    route: "/Closed-Cases",
    icon: <Office size="12px" />,
    component: <ClosedCases/>,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "User Queries",
    key: "queries",
    route: "/queries",
    icon: <Settings size="12px" />,
    component: <Queries/>,
    noCollapse: true,
  },
  
  
  
  {
    route: "/judge",
    component: <AssignJudge/>, 
  },
  
  {
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    route: "/profile",
    component: <Profile />,
  },
  
  {
    route: "/newJudge",
    component: <NewJudge />,
  },
 
  
];

export default routes;
