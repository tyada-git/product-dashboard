import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
`;

export const Thead = styled.thead`
  background: #f1f5f9;
`;

export const Th = styled.th`
  text-align: left;
  padding: 14px;
  font-size: 13px;
  color: #475569;
  font-weight: 600;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background: #f8fafc;
  }
`;

export const Td = styled.td`
  padding: 14px;
  font-size: 14px;
`;

export const CategoryBadge = styled.span`
  background: #eef2ff;
  color: #4338ca;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

export const LowStock = styled.span`
  color: #dc2626;
  font-weight: 700;
`;

export const InventoryWrapper = styled.div`
  display: flex;
`;

export const Sidebar = styled.aside`
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
`;
