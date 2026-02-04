import styled from "styled-components";

const Box = styled.div`
  height: 520px;
  border: 2px dashed #dbe4f0;
  border-radius: 14px;
  background: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Content = styled.div`
  max-width: 520px;
  text-align: center;
`;

const IconCircle = styled.div`
  width: 88px;
  height: 88px;
  margin: 0 auto 18px;
  border-radius: 999px;
  background: #f1f5f9;

  display: grid;
  place-items: center;
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 26px;
  font-weight: 900;
  color: #0f172a;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
`;

const SearchIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
    <path
      d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      stroke="#94A3B8"
      strokeWidth="2"
    />
    <path
      d="M16.5 16.5 21 21"
      stroke="#94A3B8"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

type EmptyStateProps = {
  title?: string;
  subtitle?: string;
};

const ProductNotFound = ({
  title = "No products found",
  subtitle = "Try adjusting your filters or search terms to find what you are looking for.",
}: EmptyStateProps) => {
  return (
    <Box>
      <Content>
        <IconCircle>
          <SearchIcon />
        </IconCircle>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Content>
    </Box>
  );
};

export default ProductNotFound;
