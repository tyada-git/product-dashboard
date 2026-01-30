import type { Product } from "../productsThunks";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../sharedComponents/Button";

interface CardProps {
  product: Product;
}

const CardContainer = styled.div`
  width: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  color: #333;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
const Category = styled.span`
  font-weight: bold;
  color: #aaadb1;
`;
const Stock = styled.span<{ stock: boolean }>`
  display: inline-block;
  margin-left: 8px;
  color: ${({ stock }) => (stock ? "green" : "red")};
  font-weight: 500;
`;

const Description = styled.p`
  margin: 12px 0 0 0;
  font-size: 0.95rem;
  color: #666;
`;

const Card: React.FC<CardProps> = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => setShowDescription((prev) => !prev);

  return (
    <CardContainer>
      {product.image && <Image src={product.image} alt={product.name} />}
      <Content>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Category>{product.category.toLocaleUpperCase()}</Category>
          <Stock stock={product.stock > 0}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </Stock>
        </div>
        <Title>{product.name}</Title>
        <Price>${product.price.toFixed(2)}</Price>
        <Description></Description>
        <Button onClick={toggleDescription}>
          {showDescription ? "Hide Details" : "View Details"}
        </Button>
      </Content>
    </CardContainer>
  );
};

export default Card;
