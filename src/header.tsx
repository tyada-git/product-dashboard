import styled from "styled-components";
import { NavLink } from "react-router-dom";

const HeaderWrap = styled.header`
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 220px;
`;

const LogoBox = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #2563eb;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #111827;
`;

const Center = styled.nav`
  display: flex;
  align-items: center;
  gap: 18px;
  flex: 1;
  justify-content: flex-end;
  padding-right: 18px;

  @media (max-width: 760px) {
    display: none; /* mobile: hide links */
  }
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  font-size: 15px;
  color: #4b5563;
  padding: 6px 8px;
  border-radius: 8px;

  &:hover {
    color: #111827;
    background: #f3f4f6;
  }

  &.active {
    color: #2563eb;
    background: #eff6ff;
    font-weight: 600;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  cursor: pointer;

  display: grid;
  place-items: center;
  color: #374151;
  font-weight: 700;
`;

export default function Header() {
  return (
    <HeaderWrap>
      <Left>
        <LogoBox>⌁</LogoBox>
        <Title>Inventory System</Title>
      </Left>

      <Center>
        <NavItem to="/products">Products</NavItem>
        <NavItem to="/inventory">Inventory</NavItem>
      </Center>

      <Right>
        <Avatar aria-label="Profile">👤</Avatar>
      </Right>
    </HeaderWrap>
  );
}
