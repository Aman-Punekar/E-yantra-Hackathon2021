import React, { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  IconButton,
  Divider,
  Container,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  NativeSelect,
  InputBase,
  withStyles,
  Checkbox,
  Button,
  withWidth,
} from "@material-ui/core";
import { useStyles } from "./donorDashboardStyles";
import DashboardHeader from "../DashboardHeaders/DashboardHeader";
import profileImage from "../../assets/image/profileImage.jpg";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Aos from "aos";
import { motion } from "framer-motion";
import { MainWrapper, FormComp } from "./FormBodyComponent";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: "Roboto",
    fontWeight: "bold",
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

function DonorDashboard({ width }) {
  const styles = useStyles();

  const [DonorInfo, setDonorInfo] = useState({
    Name: "",
    LastName: "",
    Age: "",
    // Gender: "female",
    Email: "",
    Mobile: "",
    AlternateMobile: "",
    Lane: "",
    Landmark: "",
    City: "",
    State: "",
    ZipCode: "",
    BloodGroup: "",
    TestTaken: "Yes",
    Injury: "No",
    Terms: false,
  });
  const [Gender, setGender] = useState("female");

  const xsValue = /xs/.test(width);
  const smValue = /sm/.test(width);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleChangeEvents = (event) => {
    setDonorInfo({ ...DonorInfo, [event.target.id]: event.target.value });
  };

  return (
    <>
      <DashboardHeader />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={styles.mainContainer}
      >
        <Typography
          component="div"
          className={styles.profilePicContainer}
          data-aos="fade-down"
        >
          <Avatar
            alt="his name"
            src={profileImage}
            className={styles.profileImage}
          />
          <input
            accept="image/*"
            className={styles.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label
            htmlFor="contained-button-file"
            className={styles.iconLableStyle}
          >
            <IconButton
              aria-label="edit"
              className={styles.editButton}
              component="span"
            >
              <EditRoundedIcon />
            </IconButton>
          </label>
        </Typography>
        <Container
          maxWidth="md"
          component="form"
          className={styles.containerStyle}
        >
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <FormComp
              xs={10}
              sm={8}
              md={5}
              label="Name"
              required={true}
              inputProps={{
                id: "Name",
                placeholder: "Enter your name",
                value: DonorInfo.Name,
                onchangeCall: handleChangeEvents,
              }}
            />
            <FormComp
              xs={10}
              sm={8}
              md={5}
              label="Last Name"
              required={true}
              inputProps={{
                id: "LastName",
                placeholder: "Enter your last name",
                value: DonorInfo.LastName,
                onchangeCall: handleChangeEvents,
              }}
            />
          </MainWrapper>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <FormComp
              xs={10}
              sm={2}
              label="Age"
              required={true}
              inputProps={{
                id: "Age",
                placeholder: "18+ only",
                value: DonorInfo.Age,
                type: "number",
                onchangeCall: handleChangeEvents,
              }}
            />
            <Grid
              item
              container
              xs={10}
              sm={6}
              md={5}
              direction="row"
              justify="space-between"
              className={styles.formBodySection}
            >
              <FormControl style={{ width: "100%" }}>
                <Typography varient="subtitle1" className={styles.lableStyle}>
                  Gender:<span style={{ color: "red" }}>*</span>
                </Typography>
                <RadioGroup
                  aria-label="Gender"
                  name="Gender"
                  value={Gender}
                  onChange={(event) => setGender(event.target.value)}
                  id="Gender"
                  row
                  style={{ flexWrap: "nowrap" }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </MainWrapper>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <FormComp
              xs={10}
              sm={8}
              label="Email"
              required={true}
              inputProps={{
                id: "Email",
                placeholder: "abc@xyz.com",
                value: DonorInfo.Email,
                onchangeCall: handleChangeEvents,
              }}
            />
          </MainWrapper>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <FormComp
              xs={10}
              sm={4}
              md={5}
              label="Mobile"
              required={true}
              inputProps={{
                id: "Mobile",
                placeholder: "+91 ...",
                value: DonorInfo.Mobile,
                onchangeCall: handleChangeEvents,
              }}
            />
            <FormComp
              xs={10}
              sm={4}
              md={5}
              label="AlternateMobile"
              required={false}
              inputProps={{
                id: "AlternateMobile",
                placeholder: "+91 ...",
                value: DonorInfo.AlternateMobile,
                onchangeCall: handleChangeEvents,
              }}
            />
          </MainWrapper>
          <Divider
            style={{
              width: "100%",
              alignSelf: "center",
              marginTop: 50,
            }}
            data-aos="fade-up"
          />
          <Typography
            varient="subtitle1"
            className={styles.lableStyle}
            style={{ opacity: 0.6 }}
            data-aos="fade-up"
          >
            Address:<span style={{ color: "red" }}>*</span>
          </Typography>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <FormComp
              xs={10}
              sm={4}
              md={5}
              label="Lane/H-No."
              required={true}
              inputProps={{
                id: "Lane",
                placeholder: "eg: 365-11/ 5th Lane",
                value: DonorInfo.Lane,
                onchangeCall: handleChangeEvents,
              }}
            />
            <FormComp
              xs={10}
              sm={4}
              md={5}
              label="Landmark"
              required={false}
              inputProps={{
                id: "Landmark",
                placeholder: "eg: Pepsi factory / Rang Layout",
                value: DonorInfo.Landmark,
                onchangeCall: handleChangeEvents,
              }}
            />
          </MainWrapper>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <FormComp
              xs={10}
              sm={4}
              md={5}
              label="City/Town"
              required={true}
              inputProps={{
                id: "City",
                placeholder: "eg: Belgaum",
                value: DonorInfo.City,
                onchangeCall: handleChangeEvents,
              }}
            />
            <FormComp
              xs={10}
              sm={4}
              md={5}
              label="State"
              required={false}
              inputProps={{
                id: "State",
                placeholder: "eg: Karnataka",
                value: DonorInfo.State,
                onchangeCall: handleChangeEvents,
              }}
            />
          </MainWrapper>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <FormComp
              xs={10}
              sm={4}
              md={5}
              label="Zip Code"
              required={true}
              inputProps={{
                id: "ZipCode",
                placeholder: "eg: Belgaum",
                value: DonorInfo.ZipCode,
                onchangeCall: handleChangeEvents,
              }}
            />
            <FormComp xs={10} sm={4} md={5} component={false} />
          </MainWrapper>
          <Divider
            style={{
              width: "100%",
              alignSelf: "center",
              marginTop: 50,
            }}
            data-aos="fade-up"
          />
          <Typography
            varient="subtitle1"
            className={styles.lableStyle}
            style={{ opacity: 0.6 }}
            data-aos="fade-up"
          >
            Medical Info:<span style={{ color: "red" }}>*</span>
          </Typography>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <Grid
              item
              container
              xs={10}
              sm={6}
              md={5}
              direction="row"
              justify="space-between"
              className={styles.formBodySection}
            >
              <FormControl style={{ width: "100%" }}>
                <Typography varient="subtitle1" className={styles.lableStyle}>
                  Blood Group:<span style={{ color: "red" }}>*</span>
                </Typography>
                <NativeSelect
                  id="BloodGroup"
                  value={DonorInfo.BloodGroup}
                  onChange={handleChangeEvents}
                  input={<BootstrapInput />}
                  inputProps={{
                    style: { fontFamily: "Roboto", fontWeight: "bold" },
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>B+</option>
                  <option value={20}>A+</option>
                  <option value={30}>O+</option>
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid
              item
              container
              xs={10}
              sm={6}
              md={5}
              direction="row"
              justify="space-between"
              className={styles.formBodySection}
            >
              <FormControl style={{ width: "100%" }}>
                <Typography varient="subtitle1" className={styles.lableStyle}>
                  Covid-19 Report:
                </Typography>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <InsertDriveFileIcon />
                  </IconButton>
                </label>
              </FormControl>
            </Grid>
          </MainWrapper>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <Grid
              item
              container
              xs={10}
              sm={6}
              md={5}
              direction="row"
              justify="space-between"
              className={styles.formBodySection}
            >
              <FormControl style={{ width: "100%" }}>
                <Typography varient="subtitle1" className={styles.lableStyle}>
                  Have you recovered from COVID-19 recently with a RCT-PCR
                  test??
                  <span style={{ color: "red" }}>*</span>
                </Typography>
                <RadioGroup
                  aria-label="SomeInfo"
                  name="TestTaken"
                  value={DonorInfo.TestTaken}
                  onChange={handleChangeEvents}
                  id="TestTaken"
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </MainWrapper>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <Grid
              item
              container
              xs={10}
              sm={6}
              md={5}
              direction="row"
              justify="space-between"
              className={styles.formBodySection}
            >
              <FormControl style={{ width: "100%" }}>
                <Typography varient="subtitle1" className={styles.lableStyle}>
                  Are you currently suffering from a medical condition, illness,
                  or injury?
                  <span style={{ color: "red" }}>*</span>
                </Typography>
                <RadioGroup
                  aria-label="SomeInfo"
                  name="Injury"
                  value={DonorInfo.Injury}
                  onChange={handleChangeEvents}
                  id="Injury"
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </MainWrapper>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <Grid
              item
              container
              xs={10}
              direction="row"
              justify="space-between"
              className={styles.formBodySection}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Checkbox
                  checked={DonorInfo.Terms}
                  onChange={handleChangeEvents}
                  inputProps={{ "aria-label": "checkbox" }}
                />
                <Typography
                  variant="subtitle1"
                  style={{ fontFamily: "Gotham" }}
                >
                  I declare that bla bla bla Laborum velit velit voluptate
                  cillum labore mollit ullamco veniam laborum mollit commodo
                  nulla nulla eu. Exercitation sint tempor enim occaecat ex duis
                  pariatur qui laboris occaecat incididunt aute.
                </Typography>
              </div>
            </Grid>
          </MainWrapper>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <Grid
              item
              container
              xs={10}
              direction="row"
              justify="center"
              className={styles.formBodySection}
            >
              <Button
                variant="outlined"
                className={styles.submitButon}
                component={motion.a}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.3 },
                }}
              >
                Submit
              </Button>
            </Grid>
          </MainWrapper>
        </Container>
      </Grid>
    </>
  );
}

export default withWidth()(DonorDashboard);
