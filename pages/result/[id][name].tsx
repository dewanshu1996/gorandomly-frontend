import Result from "@/components/result";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const ResultPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const { id, name } = router.query;

  useEffect(() => {
    if (router.isReady) {
      setLoader(false);
    }
  }, [router.isReady]);

  return loader ? <CircularProgress /> : <Result id={id} name={name} />;
};

export default ResultPage;
