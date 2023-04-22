import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import io from "socket.io-client";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import PapaerDown from "../ui/paperdown";

import { API_URL } from "../../env.config";

const socket = io("http://13.233.147.4:8000");

const Result = (props: any) => {
  const router = useRouter();
  const { id, name } = router.query;
  const [resultFlag, setResultFlag] = useState<Boolean>(false);
  const [participants, setParticipants] = useState({
    participantsList: [],
    participantsCount: 0,
  });
  const [result, setResult] = useState({ name: "", choice: "" });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    try {
      socket.emit("join", id);
      socket.on("result_send", (msg: any) => {
        setResultFlag(true);
        setResult(msg.result);
      });

      socket.on("participants-list", (msg: any) => {
        setParticipants(msg);
      });
    } catch (error) {
      console.log(error);
    }

    return () => {
      socket.off("result_send");
      socket.off("participants-list");
    };
  }, []);

  const initiateResult = async () => {
    setLoader(true);
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        `${API_URL}/result/findResult/${id}`,
        requestOptions
      );
      if (response.ok) {
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loader ? (
    <PapaerDown />
  ) : (
    <div
      style={{
        padding: "1.25rem",
      }}
    >
      {resultFlag ? (
        <>
          <div
            style={{
              color: "#0e7324",
              fontSize: "40px",
              textAlign: "center",
            }}
          >
            Result arrived
          </div>
          <br />
          <p
            style={{
              color: "#0e7324",
              fontSize: "16px",
            }}
          >
            Walla, we have picked for you. The choice is{" "}
            <b> {result.choice} </b> . And it is made by <b>{result.name}</b>
          </p>
          <p
            style={{
              color: "#0e7324",
              fontSize: "16px",
            }}
          >
            Thanks for playing this game, Whant to try again. Click the button
            below
          </p>
          <br />
          <Button
            fullWidth
            sx={{
              backgroundColor: "darkgreen",
            }}
            variant="contained"
            href="/"
          >
            Try Again
          </Button>
        </>
      ) : (
        <>
          <div
            style={{
              color: "#0e7324",
              fontSize: "40px",
              textAlign: "center",
            }}
          >
            Waiting for results
          </div>
          <br />
          <div
            style={{
              color: "#0e7324",
              fontSize: "16px",
            }}
          >
            Thank You {name} for submiting your response, please wait to see the
            results
          </div>
          <br />
          <div
            style={{
              color: "#0e7324",
              fontSize: "23px",
              textAlign: "center",
            }}
          >
            Participants list
          </div>
          {participants.participantsList.map((participant: string) => {
            return (
              <div key={participant}>
                <div
                  style={{
                    paddingTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: "10PX",
                  }}
                >
                  {" "}
                  <AccountCircleIcon />
                  <div>{participant}</div>
                </div>
                <Divider />
              </div>
            );
          })}
          <br />
          <Button
            fullWidth
            sx={{
              backgroundColor: "darkgreen",
            }}
            variant="contained"
            onClick={initiateResult}
          >
            Ask for result!
          </Button>
        </>
      )}
    </div>
  );
};

export default Result;
