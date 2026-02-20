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
  Image,
  BackLink,
  BackIcon,
} from "./ProductDetailsStyles";
import { Button } from "../../../sharedComponents/Button";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProduct, detailsLoading, detailsError } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    if (id) dispatch(fetchProductById(Number(id)));
  }, [id, dispatch]);

  if (detailsLoading) return <p>Loading...</p>;
  if (detailsError) return <p>{detailsError}</p>;
  if (!selectedProduct) return <p>No product found</p>;

  return (
    <Page>
      <BackLink to="/products">
        <BackIcon>←</BackIcon>
        Back to Products
      </BackLink>

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
            <Thumb $active />
            <Thumb />
            <Thumb />
            <Thumb $add>+</Thumb>
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
            <Button $variant="primary">Add to Cart</Button>
            <Button onClick={() => navigate(`/inventory`)}>
              View Inventory
            </Button>
          </Actions>
        </InfoCol>
      </TopGrid>
    </Page>
  );
};

export default ProductDetails;
