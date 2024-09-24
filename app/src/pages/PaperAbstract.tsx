import { useParams } from "react-router-dom";


const PaperAbstract = () => {
  const { doi } = useParams<{ doi: string }>();


  return (
    <div>
      <h1>Paper abstract{doi}</h1>
      </div>
  );
};

export default PaperAbstract;
