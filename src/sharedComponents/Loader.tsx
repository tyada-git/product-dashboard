import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Text = styled.p`
  font-size: 14px;
  color: #64748b;
`;

type LoaderProps = {
  label?: string;
};

const Loader = ({ label = "Loading..." }: LoaderProps) => {
  return (
    <Wrapper>
      <Spinner />
      <Text>{label}</Text>
    </Wrapper>
  );
};

export default Loader;
