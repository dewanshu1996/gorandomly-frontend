import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

interface formFields {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
}

const Join = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
    },
    onSubmit: (
      values: formFields,
      { setSubmitting }: FormikHelpers<formFields>
    ) => {
      router.push({
        pathname: "/initiate/[id]",
        query: { id: "1234" },
      });
      setSubmitting(false);
    },
  });

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const nextField = (event: any) => {
    try {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 2].focus();
    } catch (error) {}
  };

  const previousField = (event: any) => {
    try {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index - 2].focus();
    } catch (error) {}
  };

  const keyDownHandler = (event: any) => {
    if (event.keyCode === 37 || event.keyCode === 8) {
      previousField(event);
    } else if (event.keyCode === 39) {
      nextField(event);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Enter The Joining Code"
    >
      <form
        style={{
          backgroundColor: "white",
          width: "80%",
          padding: "30px",
        }}
        onSubmit={formik.handleSubmit}
      >
        <Stack spacing={4} direction="row">
          <TextField
            variant="outlined"
            size="small"
            onChange={(event: any) => {
              event.preventDefault();
              formik.setFieldValue("code1", event.target.value);
              nextField(event);
            }}
            onKeyDown={keyDownHandler}
            onBlur={formik.handleBlur}
            value={formik.values.code1}
            inputProps={{ maxLength: 1 }}
          />
          <TextField
            variant="outlined"
            size="small"
            onChange={(event: any) => {
              event.preventDefault();
              formik.setFieldValue("code2", event.target.value);
              nextField(event);
            }}
            onKeyDown={keyDownHandler}
            onBlur={formik.handleBlur}
            value={formik.values.code2}
            inputProps={{ maxLength: 1 }}
          />
          <TextField
            variant="outlined"
            size="small"
            onChange={(event: any) => {
              event.preventDefault();
              formik.setFieldValue("code3", event.target.value);
              nextField(event);
            }}
            onKeyDown={keyDownHandler}
            onBlur={formik.handleBlur}
            value={formik.values.code3}
            inputProps={{ maxLength: 1 }}
          />
          <TextField
            variant="outlined"
            size="small"
            onChange={(event: any) => {
              event.preventDefault();
              formik.setFieldValue("code4", event.target.value);
              nextField(event);
            }}
            onKeyDown={keyDownHandler}
            onBlur={formik.handleBlur}
            value={formik.values.code4}
            inputProps={{ maxLength: 1 }}
          />
        </Stack>
        <br />
        <br />
        <Button
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
          style={{ margin: "auto", display: "block" }}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default Join;
