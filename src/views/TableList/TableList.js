import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Radio from "@material-ui/core/Radio";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import data from "../../assets/data/HR.json";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  departmentTable: {
    "& tbody tr:hover": {
      background: "lavender",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();

  const [selectedDepartment, setSelectedDepartment] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (selectedDepartment)
      fetch(`https://randomuser.me/api/?seed=${selectedDepartment}&results=10`)
        .then((x) => x.json())
        .then((x) => setUsers(x.results));
  }, [selectedDepartment]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Departments</h4>
            <p className={classes.cardCategoryWhite}>
              List of all available departments
            </p>
          </CardHeader>
          <CardBody className={classes.departmentTable}>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "",
                "department",
                "Location",
                "First Name",
                "Last Name",
              ]}
              tableData={data.departments.map((x) => [
                <Radio
                  key={x.department}
                  checked={selectedDepartment === x.department}
                  onChange={() => {
                    setSelectedDepartment(x.department);
                    setUsers([]);
                  }}
                />,
                x.department,
                x.location,
                x.manager.name.first,
                x.manager.name.last,
              ])}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              {selectedDepartment ?? "Please select a department."}
            </h4>
            <p className={classes.cardCategoryWhite}>
              {selectedDepartment &&
                `Here is a list of all employees in the ${selectedDepartment} department.`}
            </p>
          </CardHeader>
          <CardBody>
            {selectedDepartment && (
              <Table
                tableHeaderColor="primary"
                tableHead={["", "Name", "Country", "City"]}
                tableData={users.map((x) => [
                  <Avatar key={x.id.name} src={x.picture.thumbnail} />,
                  x.name.first,
                  x.location.country,
                  x.location.city,
                ])}
              />
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
