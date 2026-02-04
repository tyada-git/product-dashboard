import styled from "styled-components";
import { Link } from "react-router-dom";

export const Page = styled.div`
  padding: 32px;
  background: #fafafa;
`;

export const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ImagesCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MainImage = styled.div`
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

export const ThumbsRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const Thumb = styled.button<{ active?: boolean; add?: boolean }>`
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

export const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Category = styled.span`
  font-size: 12px;
  color: #2563eb;
  font-weight: 700;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  margin: 0;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Price = styled.span`
  font-size: 24px;
  font-weight: 800;
`;

export const StockBadge = styled.span`
  background: #dcfce7;
  color: #166534;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 700;
`;

export const SectionTitle = styled.h4`
  margin: 8px 0 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

export const Description = styled.p`
  color: #475569;
  line-height: 1.6;
  max-width: 560px;
  margin: 0;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 5px 0;
`;

export const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 40px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SpecLabel = styled.span`
  font-size: 12px;
  color: #94a3b8;
`;

export const SpecValue = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const StockCard = styled.div`
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

export const StockNumber = styled.span`
  font-size: 30px;
  font-weight: 900;
  margin: 0;
`;

export const StockText = styled.span`
  margin-left: 5px;
  color: #64748b;
  font-size: 14px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 356px;
  object-fit: cover;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 16px;
  text-decoration: none;

  color: #2563eb;
  font-weight: 700;
  font-size: 14px;

  padding: 6px 10px;
  border-radius: 10px;

  &:hover {
    background: #eef2ff;
  }

  &:active {
    transform: translateY(1px);
  }
`;
export const BackIcon = styled.span`
  font-size: 16px;
  line-height: 1;
`;
