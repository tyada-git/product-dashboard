import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchProductById } from "../productsThunks";
import { timeAgoForStock } from "../../../helper";
import {
  Page,
  TopGrid,
  ImagesCol,
  MainImage,
  ThumbsRow,
  Thumb,
  InfoCol,
  Category,
  Title,
  PriceRow,
  Price,
  StockBadge,
  SectionTitle,
  Description,
  Divider,
  SpecsGrid,
  SpecItem,
  SpecLabel,
  SpecValue,
  StockCard,
  StockNumber,
  StockText,
  Actions,
  PrimaryBtn,
  SecondaryBtn,
  Image,
} from "./ProductDetailsStyles";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <a href="/products"> Back to Products</a>
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
            <PrimaryBtn>Add to Cart</PrimaryBtn>
            <SecondaryBtn onClick={() => navigate(`/inventory`)}>
              View Inventory
            </SecondaryBtn>
          </Actions>
        </InfoCol>
      </TopGrid>
    </Page>
  );
};

export default ProductDetails;
