import { useParams } from "react-router-dom";
import HTMLViewer from "../components/HTMLViewer";

const Paper = () => {
  const { doi } = useParams<{ doi: string }>();


  return (
    <div>
      <h1>Paper {doi}</h1>
      <HTMLViewer />
      </div>
  );
};

export default Paper;
