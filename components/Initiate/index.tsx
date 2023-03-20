import * as React from "react";
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface formFields {
  name: string;
  selectiontype: string;
  selectionValueL: string;
}

const Initiate = (props: any) => {
  useEffect(() => {
    props.id ? setMode("edit") : setMode("add");
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      selectiontype: "",
      selectionValueL: "",
    },
    onSubmit: (
      values: formFields,
      { setSubmitting }: FormikHelpers<formFields>
    ) => {
      router.push({
        pathname: "/result/[id]",
        query: { id: "1234", name: "Anshu" },
      });
      setSubmitting(false);
    },
  });

  const [mode, setMode] = useState<string>("");
  const router = useRouter();

  return (
    <div>
      {mode === "add" ? (
        <h4>Create A New Randomly</h4>
      ) : (
        <h4>Add Your Choice</h4>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
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
          <TextField
            variant="outlined"
            size="small"
            margin="dense"
            label="Enter Your Purpose"
            fullWidth
            name="selectiontype"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={mode === "edit"}
            value={formik.values.selectiontype}
          />
          <TextField
            variant="outlined"
            size="small"
            margin="dense"
            label="Enter Your Choice"
            fullWidth
            name="selectionValueL"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.selectionValueL}
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
        >
          {mode === "add" ? "Create" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Initiate;
