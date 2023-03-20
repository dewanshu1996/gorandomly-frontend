import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "next/link";

const Home = () => {
  return (
    <Stack spacing={2} direction="column" style={{ textAlign: "center" }}>
      <Button variant="contained">
        <Link href="/initiate">Create!</Link>
      </Button>
      <h4>Or</h4>
      <Button variant="outlined" onClick={() => {}}>
        <Link href="/join">Join!</Link>
      </Button>
    </Stack>
  );
};

export default Home;
