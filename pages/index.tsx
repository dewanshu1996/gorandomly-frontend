import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "next/link";

const Home = () => {
  return (
    <div style={{}}>
      <div
        style={{
          padding: "1px",
          paddingTop: "60px",
          textAlign: "center",
        }}
      >
        {" "}
        <h1
          style={{
            color: "#0e7324",
            fontSize: "70px",
          }}
        >
          Go Randomly
        </h1>
      </div>
      <div
        style={{
          height: "25vh",
          padding: "5px",
          textAlign: "center",
        }}
      >
        <p>Having trouble deciding, What to do. Go Randomly</p>
        <br />
        <br />
        <br />
        <Stack
          spacing={2}
          direction="column"
          style={{
            textAlign: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: "darkgreen",
            }}
            variant="contained"
          >
            <Link
              href="/initiate"
              style={{
                color: "white",
              }}
            >
              Create!
            </Link>
          </Button>
          {/* <h4>Or</h4>
          <Button
            variant="outlined"
            sx={{
              border: "1px solid #0e7324",
              backgroundColor: "white",
            }}
          >
            <Link
              href="/join"
              style={{
                color: "darkgreen",
              }}
            >
              Join!
            </Link>
          </Button> */}
        </Stack>
      </div>
    </div>
  );
};

export default Home;
