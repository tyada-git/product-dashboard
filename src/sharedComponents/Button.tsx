import styled from "styled-components";

export const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  border: none;

  background: ${({ $variant }) =>
    $variant === "primary" ? "#2563eb" : "#e5e7eb"};

  color: ${({ $variant }) => ($variant === "primary" ? "#fff" : "#111")};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
