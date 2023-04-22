import * as React from "react";
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { forwardRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../../env.config";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { AlertColor, Snackbar } from "@mui/material";
import SnakeBarComp from "../ui/snakebar";
import {
  ApiResponseData1,
  ApiResponseData2,
  Task,
  formFields,
  SnakeBar,
} from "@/types/types";
import PaperUp from "../ui/paperup";

let apiResponseData = {} as ApiResponseData1;
let apiResponseData2 = {} as ApiResponseData2;

const Initiate = (props: any) => {
  const [mode, setMode] = useState("add");
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [task, setTask] = useState({} as Task);
  const [clicked, setClicket] = useState(false);
  const [open, setOpen] = useState(false);
  const [snakeBar, setSnakeBar] = useState({} as SnakeBar);

  useEffect(() => {
    try {
      props.id ? setMode("edit") : setMode("add");
      if (props.id) {
        setLoader(true);
        (async () => {
          try {
            await getTaskById(props.id);
          } catch (error) {}
          setTimeout(() => {
            setLoader(false);
          }, 2000);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const redirecttoResultPage = (id: string, name: string) => {
    router.push({
      pathname: "/result/[data]",
      query: { id: id, name: name },
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      purpose: "",
      choice: "",
      totalParticipants: 2,
    },
    onSubmit: async (
      values: formFields,
      { setSubmitting }: FormikHelpers<formFields>
    ) => {
      setLoader(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      if (mode === "add") {
        try {
          const response = await fetch(
            `${API_URL}/task/create`,
            requestOptions
          );
          apiResponseData = await response.json();
          if (response.ok) {
            setTimeout(() => {
              setLoader(false);
              setOpen(true);
            }, 2000);
            openSnakeBar("success", apiResponseData.message);
          } else {
            setLoader(false);
            openSnakeBar("error", apiResponseData.message);
          }
        } catch (error) {
          setLoader(false);
          openSnakeBar("error", "Something went wrong");
        }
      } else {
        setLoader(true);
        requestOptions.method = "PUT";
        try {
          const response = await fetch(
            `${API_URL}/task/update/${props.id}`,
            requestOptions
          );
          apiResponseData = await response.json();
          if (response.ok) {
            setTimeout(() => {
              setLoader(false);
              openSnakeBar("success", apiResponseData.message);
              redirecttoResultPage(apiResponseData.id, values.name);
            }, 2000);
          } else {
            setLoader(false);
            openSnakeBar("error", apiResponseData.message);
          }
        } catch (error) {
          setLoader(false);
          openSnakeBar("error", "Something went wrong");
        }
      }
      setSubmitting(false);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const openSnakeBar = (messageType: AlertColor, message: string) => {
    setSnakeBar({
      message: message,
      messageType: messageType,
      open: true,
    });
  };

  const getTaskById = async (id: string) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(`${API_URL}/task/${id}`, requestOptions);
      apiResponseData2 = await response.json();
      if (response.ok) {
        setTask(apiResponseData2.task);
        formik.setFieldValue("purpose", apiResponseData2.task.purpose);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loader === true ? (
    <PaperUp />
  ) : (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="Confirmation">
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          <div>
            <h1
              style={{
                color: "#0e7324",
                fontSize: "40px",
                textAlign: "center",
              }}
            >
              Congratulations!
            </h1>
            <p
              style={{
                color: "#0e7324",
                fontSize: "16px",
              }}
            >
              You have created the task successfully, Now its time to ask your
              friends.
            </p>
            <p
              style={{
                color: "#0e7324",
                fontSize: "16px",
              }}
            >
              Just copy the link or code and share with your friends
            </p>
            <Stack
              spacing={2}
              direction="column"
              style={{
                textAlign: "center",
              }}
            >
              <Button
                variant="contained"
                endIcon={<CopyAllIcon />}
                sx={{
                  border: "1px solid #0e7324",
                  backgroundColor: "white",
                  color: "#0e7324",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(apiResponseData.link);
                  setClicket(true);
                }}
              >
                Copy Link
              </Button>

              {/* <Button
                variant="contained"
                endIcon={<CopyAllIcon />}
                sx={{
                  border: "1px solid #0e7324",
                  backgroundColor: "white",
                  color: "#0e7324",
                }}
                onClick={() => {
                  setClicket(true);
                }}
              >
                Copy Code
              </Button> */}

              {clicked && (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "#0e7324",
                  }}
                  onClick={() => {
                    redirecttoResultPage(
                      apiResponseData.id,
                      apiResponseData.name
                    );
                  }}
                >
                  Go To Reasult
                </Button>
              )}
            </Stack>
          </div>
        </div>
      </Modal>
      <div
        style={{
          textAlign: "center",
          color: "#0e7324",
          fontSize: "30px",
        }}
      >
        {mode === "add" ? (
          <h4>Create A New Task</h4>
        ) : (
          <h4>{`${task.name} has initiated a new task, Add Your Choice`} </h4>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              size="small"
              margin="dense"
              label="Enter Your Purpose"
              fullWidth
              name="purpose"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={mode === "edit"}
              value={formik.values.purpose}
            />
            <TextField
              variant="outlined"
              size="small"
              margin="dense"
              label="Enter Your Name"
              fullWidth
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {mode === "add" && (
              <TextField
                variant="outlined"
                size="small"
                margin="dense"
                label="Enter Max. Participation Count"
                fullWidth
                name="maxParticipants"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.totalParticipants}
              />
            )}
            <TextField
              variant="outlined"
              size="small"
              margin="dense"
              label="Enter Your Choice"
              fullWidth
              name="choice"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.choice}
            />
          </Stack>
          <br />
          <br />
          <Button
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
            style={{
              display: "block",
              margin: "auto",
            }}
            sx={{
              backgroundColor: "darkgreen",
              color: "white",
            }}
          >
            {mode === "add" ? "Create" : "Submit"}
          </Button>
        </form>
      </div>
      <SnakeBarComp
        message={snakeBar.message}
        messageType={snakeBar.messageType}
        open={snakeBar.open}
      />
    </>
  );
};

export default Initiate;
