import React, { useEffect, useState } from "react";
import {
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
  Modal,
  Box,
} from "@material-ui/core";
import { useStyles } from "./donorDashboardStyles";
import Avatar from "../../assets/json/Avatar.json";
import Aos from "aos";
import { motion } from "framer-motion";
import { MainWrapper, FormComp } from "./FormBodyComponent";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { useDispatch, useSelector } from "react-redux";
import { donorForm } from "../../Redux/DonoInfoSubmitSlice";
import { updateProfile } from "../../Redux/UpdateProfileSlice";
import { getUser } from "../../Redux/FetchUser";
import Loading from "../Loading/Loading";
import Lottie from "lottie-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const FetchUser = useSelector((state) => state.FetchUser.user);
  const MobileNumber = useSelector((state) => state.SignupOTPSlice.shortData);
  const SigninStatus = useSelector((state) => state.DonorInfo.signupSendStatus);
  const LoginMsg = useSelector((state) => state.LoginSlice.user);

  const [DonorInfo, setDonorInfo] = useState({
    Name: "",
    LastName: "",
    Age: "",
    District: "",
    Mobile:
      MobileNumber !== null
        ? MobileNumber.phone.toString()
        : LoginMsg.phone !== null
        ? LoginMsg.phone.toString()
        : "",
    Lane: "",
    City: "",
    State: "",
    ZipCode: "",
    BloodGroup: "",
  });
  const [Gender, setGender] = useState("");
  const [Terms, setTerms] = useState(false);
  const [isAvailable, setisAvailable] = useState(true);
  const [AlternateMobile, setAlternateMobile] = useState("");

  const xsValue = /xs/.test(width);
  const smValue = /sm/.test(width);

  useEffect(() => {
    Aos.init({ duration: 1000 });
    if (MobileNumber === null && LoginMsg.phone === null) {
      dispatch(getUser());
    }
  }, []);

  useEffect(() => {
    if (SigninStatus) {
      dispatch(getUser());
    }
  }, [SigninStatus]);

  useEffect(() => {
    if (FetchUser !== null && FetchUser !== "") {
      setDonorInfo({
        Name: FetchUser.firstName,
        LastName: FetchUser.lastName,
        Age: FetchUser.age,
        District: FetchUser.address.district,
        Mobile: FetchUser.mobileNo.toString(),
        Lane: FetchUser.address.lane,
        City: FetchUser.address.city,
        State: FetchUser.address.state,
        ZipCode: FetchUser.address.pinCode.toString(),
        BloodGroup: FetchUser.bloodGroup,
      });
      setGender(FetchUser.gender);
      setAlternateMobile(
        FetchUser.alternateNo === null ? "" : FetchUser.alternateNo
      );
    }
  }, [FetchUser]);

  const isLoading = useSelector((state) => state.FetchUser.isLoading);

  if (isLoading) {
    return <Loading />;
  }

  const handleChangeEvents = (event) => {
    setDonorInfo({ ...DonorInfo, [event.target.id]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      Name,
      LastName,
      Age,
      Mobile,
      Lane,
      City,
      District,
      State,
      ZipCode,
      BloodGroup,
    } = DonorInfo;
    function checkEmpty() {
      for (var key in DonorInfo) {
        if (DonorInfo[key] === "") {
          return false;
        }
      }
      return true;
    }

    if (checkEmpty && Gender !== "") {
      const data = {
        firstName: Name,
        lastName: LastName,
        age: Age,
        mobileNo: parseInt(Mobile),
        alternateNo: parseInt(AlternateMobile),
        gender: Gender,
        address: {
          lane: Lane,
          city: City,
          district: District,
          state: State,
          pinCode: parseInt(ZipCode),
        },
        bloodGroup: BloodGroup,
        isAvailable: isAvailable,
      };
      if (FetchUser !== null && FetchUser !== "") {
        dispatch(updateProfile(data));
      } else {
        if (Terms) {
          dispatch(donorForm(data));
        } else {
          window.alert("Please accept our terms!!");
        }
      }
    } else {
      window.alert("Please enter all the Mandatory field!!");
    }
  };

  return (
    <>
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
          <Lottie animationData={Avatar} className={styles.profileImage} />
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
                value: AlternateMobile,
                onchangeCall: (e) => setAlternateMobile(e.target.value),
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
              label="City/Town"
              required={true}
              inputProps={{
                id: "City",
                placeholder: "eg: Belgaum",
                value: DonorInfo.City,
                onchangeCall: handleChangeEvents,
              }}
            />
          </MainWrapper>
          <MainWrapper xsValue={xsValue} smValue={smValue}>
            <FormComp
              xs={10}
              sm={4}
              md={5}
              label="District"
              required={false}
              inputProps={{
                id: "District",
                placeholder: "eg: Belgaum",
                value: DonorInfo.District,
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
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
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
              <FormControl
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography varient="subtitle1" className={styles.lableStyle}>
                  Available For Donating:
                </Typography>
                <Checkbox
                  checked={isAvailable}
                  onChange={() => setisAvailable(!isAvailable)}
                  inputProps={{ "aria-label": "checkbox" }}
                />
              </FormControl>
            </Grid>
          </MainWrapper>
          {FetchUser === null || FetchUser === "" ? (
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
                    checked={Terms}
                    onChange={() => setTerms(!Terms)}
                    inputProps={{ "aria-label": "checkbox" }}
                  />
                  <Typography
                    variant="subtitle1"
                    style={{ fontFamily: "Gotham" }}
                  >
                    I declare that the given information is correct and i
                    eligible for donation and my information can be presented in
                    public domain for the welfare of the society.
                  </Typography>
                </div>
              </Grid>
            </MainWrapper>
          ) : null}
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
                onClick={handleSubmit}
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
