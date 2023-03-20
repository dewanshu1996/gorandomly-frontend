import React, { use } from "react";
import Initiate from "../../components/Initiate";
import { useRouter } from "next/router";

const InitiatePage = () => {
  const router = useRouter();
  const id = router.query.id;
  return <Initiate id={id} />;
};

export default InitiatePage;
