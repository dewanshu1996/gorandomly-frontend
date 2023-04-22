import React, { useEffect, useState } from "react";
import Initiate from "../../components/Initiate";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

const InitiatePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      setLoader(false);
    }
  }, [router.isReady]);

  return loader ? <CircularProgress /> : <Initiate id={id} />;
};

export default InitiatePage;
