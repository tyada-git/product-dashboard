import styled from "styled-components";

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 998px;
  float: right;
`;
export default ProductContainer;
