import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

const Result = (props: any) => {
  const router = useRouter();
  const { id, name } = router.query;
  const [resultFlag, setResultFlag] = useState<Boolean>(false);

  useEffect(() => {
    //fetch reasult
  }, []);

  return (
    <>
      {resultFlag ? <div>Result arrived</div> : <div>Waiting for results</div>}
      {headerTemplate(name)}
    </>
  );
};

export function headerTemplate(name: any) {
  return (
    <div>
      Thank You {name} for submiting your response, please wait to see the
      results
    </div>
  );
}

export default Result;
