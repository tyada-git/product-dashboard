import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import type { AppDispatch, RootState } from "../../../store";
import { fetchProductById } from "../productsThunks";
import { timeAgoForStock } from "../../../helper";

const Page = styled.div`
  padding: 32px;
  background: #fafafa;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ImagesCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MainImage = styled.div`
  height: 360px;
  border: 2px dashed #cfd8e3;
  background: #f4f6f8;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #94a3b8;
  font-weight: 600;
`;

const ThumbsRow = styled.div`
  display: flex;
  gap: 12px;
`;

const Thumb = styled.button<{ active?: boolean; add?: boolean }>`
  width: 70px;
  height: 70px;
  border-radius: 6px;
  cursor: pointer;

  border: ${({ active, add }) =>
    active || add ? "2px solid #2563eb" : "1px solid #e2e8f0"};

  background: #f4f6f8;
  color: ${({ add }) => (add ? "#2563eb" : "#94a3b8")};

  font-size: ${({ add }) => (add ? "22px" : "0")};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #2563eb;
  }
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Category = styled.span`
  font-size: 12px;
  color: #2563eb;
  font-weight: 700;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  margin: 0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Price = styled.span`
  font-size: 24px;
  font-weight: 800;
`;

const StockBadge = styled.span`
  background: #dcfce7;
  color: #166534;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 700;
`;

const SectionTitle = styled.h4`
  margin: 8px 0 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

const Description = styled.p`
  color: #475569;
  line-height: 1.6;
  max-width: 560px;
  margin: 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 5px 0;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 40px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SpecLabel = styled.span`
  font-size: 12px;
  color: #94a3b8;
`;

const SpecValue = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const StockCard = styled.div`
  margin-top: 8px;
  background: white;
  border-radius: 10px;
  padding: 8px;
  width: 640px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const StockNumber = styled.span`
  font-size: 30px;
  font-weight: 900;
  margin: 0;
`;

const StockText = styled.span`
  margin-left: 5px;
  color: #64748b;
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

const PrimaryBtn = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 22px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

const SecondaryBtn = styled.button`
  background: #eef2ff;
  color: #2563eb;
  border: none;
  padding: 12px 22px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #e0e7ff;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 356px;
  object-fit: cover;
`;

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    if (id) dispatch(fetchProductById(Number(id)));
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedProduct) return <p>No product found</p>;

  return (
    <Page>
      <a href="/products">Back to Products</a>
      <TopGrid>
        <ImagesCol>
          <MainImage>
            {selectedProduct.image ? (
              <Image src={selectedProduct.image} alt={selectedProduct.name} />
            ) : (
              "No Image"
            )}
          </MainImage>

          <ThumbsRow>
            <Thumb active />
            <Thumb />
            <Thumb />
            <Thumb add>+</Thumb>
          </ThumbsRow>
        </ImagesCol>

        <InfoCol>
          <Category>{selectedProduct.category.toUpperCase()}</Category>

          <Title>{selectedProduct.name}</Title>

          <PriceRow>
            <Price>${selectedProduct.price}</Price>
            <StockBadge>IN STOCK</StockBadge>
          </PriceRow>

          <SectionTitle>Description</SectionTitle>
          <Description>{selectedProduct.fullDescription}</Description>

          <Divider />
          <SectionTitle>Technical Specifications</SectionTitle>

          <SpecsGrid>
            {selectedProduct.specifications.map((spec) => (
              <SpecItem key={spec.label}>
                <SpecLabel>{spec.label}</SpecLabel>
                <SpecValue>{spec.value}</SpecValue>
              </SpecItem>
            ))}
          </SpecsGrid>

          <StockCard>
            <h5>Stock Info</h5>
            <StockNumber>{selectedProduct.stock}</StockNumber>
            <StockText>Units available in Main Warehouse</StockText>
            <StockText>
              {" "}
              Last updated at :{" "}
              {timeAgoForStock(selectedProduct.lastStockUpdate)}
            </StockText>
          </StockCard>

          <Actions>
            <PrimaryBtn>Add to Order</PrimaryBtn>
            <SecondaryBtn>View Inventory</SecondaryBtn>
          </Actions>
        </InfoCol>
      </TopGrid>
    </Page>
  );
};

export default ProductDetails;
