import Result from "@/components/result";
import { useRouter } from "next/router";

const ResultPage = () => {
  const router = useRouter();
  const { id, name } = router.query;

  return <Result id={id} name={name} />;
};

export default ResultPage;
