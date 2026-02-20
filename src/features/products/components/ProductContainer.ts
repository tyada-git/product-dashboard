import styled from "styled-components";
const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;

  max-width: 100%;
  width: 100%;
  margin: 0;

  @media (max-width: 900px) {
    padding: 0;
    gap: 14px;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;
export default ProductContainer;
