import "./styles.css";
import { useState, useMemo } from "react";
import {
  Box,
  ButtonBase,
  TextField,
  Typography,
  Grid,
  FormControl,
  MenuItem,
  Select,
  IconButton
} from "@mui/material";
import { withStyles } from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import { lightTheme, darkTheme } from "./themes";
import { GlobalStyles } from "./globalStyles";
import { ThemeProvider } from "styled-components";

import axios from "axios";

import { ReactComponent as KidsLogo } from "./kidsloop_min_logo.svg";

const StyledTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `12px`
      }
    }
  }
})(TextField);

export default function App() {
  const [draftEmail, setDraftEmail] = useState("");
  const [draftNumber, setDraftNumber] = useState("");
  const [draftPassword, setDraftPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState("");
  const [numberValidationError, setNumberValidationError] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [english, setEnglish] = useState(true);
  const [loading, setLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState("light");
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const language = useMemo(
    () =>
      english
        ? {
            signIn: "Sign in",
            contact: "Email or Phone",
            password: "Password",
            forgot: "Forgot Password?",
            create: "Create an Account",
            sign: "Sign In",
            select: "Select Language",
            help: "Help",
            privacy: "Privacy",
            terms: "Terms",
            passwordValidation:
              "Your password must be at least 6 characters long",
            emailValidation: "Please enter your email in the correct format",
            phoneValidation:
              "Your phone number must have between 8 and 15 digits"
          }
        : {
            signIn: "가입",
            contact: "이메일 주소 또는 전화번호",
            password: "비밀번호",
            forgot: "비밀 번호 찾기",
            create: "계좌 만들기",
            sign: "가입 하기",
            select: "언어 선택",
            help: "도움",
            privacy: "프라이버시",
            terms: "조건",
            passwordValidation: "6자리 이상 입력해 주세요",
            emailValidation: "잘못된 이메일 방식입니다",
            phoneValidation: "숫자 8에서 15까지 입력해 주세요"
          },
    [english]
  );

  const handleChange = (e) => {
    const numRegex = /^(\+?)[0-9]+$/;

    if (e.target.value.length === 0) {
      setNumberValidationError("");
      setEmailValidationError("");
    } else {
      if (e.target.value.match(numRegex)) {
        setDraftNumber(e.target.value);
        setDraftEmail("");
        const numberErrorMessage = checkNumberValidation(e.target.value);
        if (numberErrorMessage) {
          setIsValid(false);
          setNumberValidationError(numberErrorMessage);
          setEmailValidationError("");
        } else {
          setIsValid(true);
          setNumberValidationError("");
        }
      } else {
        setDraftEmail(e.target.value);
        setDraftNumber("");
        const emailErrorMessage = checkEmailValidation(e.target.value);
        if (emailErrorMessage) {
          setIsValid(false);
          setEmailValidationError(emailErrorMessage);
          setNumberValidationError("");
        } else {
          setIsValid(true);
          setEmailValidationError("");
        }
      }
    }
  };
  const handlePasswordChange = (e) => {
    if (e.target.value.length === 0) {
      setPasswordValidationError("");
    } else {
      if (e.target.value.length < 6) {
        setDraftPassword("");
        const passwordErrorMessage = language.passwordValidation;

        setIsPasswordValid(false);
        setPasswordValidationError(passwordErrorMessage);
      } else {
        setDraftPassword(e.target.value);
        setIsPasswordValid(true);
        setPasswordValidationError("");
      }
    }
  };

  const checkEmailValidation = (checkEmail) => {
    if (!checkEmail.toLowerCase().match(/\S+@\S+\.\S+/)) {
      return language.emailValidation;
    } else {
      return "";
    }
  };

  const checkNumberValidation = (checkNumber) => {
    if (!checkNumber.match(/^(?!0)(\+?)\d{8,15}$/)) {
      return language.phoneValidation;
    } else {
      return "";
    }
  };

  const handleSubmit = () => {
    if (draftEmail.length > 0) {
      setLoading(true);
      axios({
        method: "patch",
        url:
          "https://my-json-server.typicode.com/kidsloop-test/accounts/sign-in",
        data: {
          email: draftEmail,
          password: draftPassword
        }
      }).then((response) => {
        console.log(`Welcome, ${response.data.name}!`);
        setLoading(false);
      });
    } else {
      setLoading(true);
      axios({
        method: "patch",
        url:
          "https://my-json-server.typicode.com/kidsloop-test/accounts/sign-in",
        data: {
          number: draftNumber,
          password: draftPassword
        }
      }).then((response) => {
        console.log(`Welcome, ${response.data.name}!`);
        setLoading(false);
      });
    }
  };

  const themeToggler = () => {
    setDarkMode(!darkMode);
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Box
          fullWidth
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "100vh",
            maxHeight: "100vh",
            backgroundColor: themeMode.background
          }}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh" }}
          >
            <Box
              component="form"
              borderRadius="12px"
              verticalAlignment="center"
              sx={{
                width: "80%",
                backgroundColor: themeMode.card,
                maxWidth: "320px"
              }}
              p={3}
              display="flex"
              flexDirection="column"
              boxShadow={`0px 0px 20px 5px ${themeMode.cardShadow}`}
            >
              <Box>
                <KidsLogo style={{ fill: "#FFBF00", height: "70px" }} />
              </Box>

              <Box sx={{ mt: 1.5 }}>
                <Typography fontSize="36px" color={themeMode.text}>
                  {language.signIn}
                </Typography>
              </Box>
              <StyledTextField
                type="text"
                placeholder={language.contact}
                id="outlined-basic"
                variant="outlined"
                error={!!emailValidationError}
                onChange={(e) => handleChange(e)}
                autoComplete="phone"
                fullWidth
                sx={{
                  mb: 1.5,
                  mt: 1.5,
                  input: { color: themeMode.labelText },
                  borderColor: { color: themeMode.inputBorder }
                }}
              />
              {emailValidationError && (
                <Typography
                  variant="caption"
                  color="error"
                  paragraph
                  sx={{ whiteSpace: "pre" }}
                >
                  {emailValidationError}
                </Typography>
              )}
              {numberValidationError && (
                <Typography
                  variant="caption"
                  color="error"
                  paragraph
                  sx={{ whiteSpace: "pre" }}
                >
                  {numberValidationError}
                </Typography>
              )}
              <StyledTextField
                type="password"
                id="outlined-basic"
                variant="outlined"
                placeholder={language.password}
                error={!!passwordValidationError}
                onChange={handlePasswordChange}
                fullWidth
                sx={{
                  mb: 1.5,
                  input: { color: themeMode.labelText },
                  border: { color: themeMode.text }
                }}
              />
              {passwordValidationError && (
                <Typography
                  variant="caption"
                  color="error"
                  paragraph
                  sx={{ whiteSpace: "pre" }}
                >
                  {passwordValidationError}
                </Typography>
              )}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1.5}
              >
                <ButtonBase component="a" disableRipple disableTouchRipple>
                  <Typography fontSize="16px" color={themeMode.secondary}>
                    {language.forgot}
                  </Typography>
                </ButtonBase>
                <LoadingButton
                  sx={{
                    borderRadius: "12px",
                    px: 3,
                    py: 1,
                    ":disabled": { color: themeMode.text }
                  }}
                  variant="contained"
                  size="medium"
                  fontSize="16px"
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={isValid && isPasswordValid ? false : true}
                >
                  {language.sign}
                </LoadingButton>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <ButtonBase>
                  <Typography fontSize="16px" color={themeMode.secondary}>
                    {language.create}
                  </Typography>
                </ButtonBase>
              </Box>
            </Box>
            <Grid container direction="column" alignItems="center">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ maxWidth: "390px" }}
              >
                <Box>
                  {!darkMode ? (
                    <IconButton
                      sx={{ color: themeMode.secondary }}
                      edge="end"
                      onClick={() => themeToggler()}
                      fontSize="16px"
                    >
                      <Brightness3Icon />
                    </IconButton>
                  ) : (
                    <IconButton
                      sx={{ color: themeMode.secondary }}
                      edge="end"
                      onClick={() => themeToggler()}
                      fontSize="16px"
                    >
                      <Brightness7Icon />
                    </IconButton>
                  )}
                </Box>
                <FormControl sx={{ minWidth: 140, ml: 1.5 }}>
                  <Select
                    variant="standard"
                    labelId="demo-simple-select-label"
                    value={10}
                    id="demo-simple-select"
                    label="Select Language"
                    disableUnderline
                    sx={{ color: themeMode.secondary }}
                  >
                    <MenuItem disabled value={10}>
                      {language.select}
                    </MenuItem>
                    <MenuItem onClick={() => setEnglish(true)} value={20}>
                      English
                    </MenuItem>
                    <MenuItem onClick={() => setEnglish(false)} value={30}>
                      Korean
                    </MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ ml: 2 }}>
                  <ButtonBase>
                    <Typography
                      fontSize="16px"
                      sx={{ color: themeMode.secondary }}
                    >
                      {language.help}
                    </Typography>
                  </ButtonBase>
                  <ButtonBase sx={{ ml: 1.5 }}>
                    <Typography
                      fontSize="16px"
                      sx={{ color: themeMode.secondary }}
                    >
                      {language.privacy}
                    </Typography>
                  </ButtonBase>
                  <ButtonBase sx={{ ml: 1.5 }}>
                    <Typography
                      fontSize="16px"
                      sx={{ color: themeMode.secondary }}
                    >
                      {language.terms}
                    </Typography>
                  </ButtonBase>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    </ThemeProvider>
  );
}
