import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  return <>hello {id}</>;
};

export default ProductDetails;
