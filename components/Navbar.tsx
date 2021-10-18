import styled from "styled-components";

// styling section
const NavContainer = styled.nav`
  min-height: 105px;
  background-color: ${(props) => props.theme.blue};
  position: relative;
`;

const TitleContainer = styled.div`
  width: 1000px;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NavTitle = styled.h3`
  font-size: 1.5em;
  font-weight: 700;
`;

const Navbar = () => {
  return (
    <NavContainer data-cy="header-background">
      <TitleContainer data-cy="header-title">
        <NavTitle>TO DO LIST APP</NavTitle>
      </TitleContainer>
    </NavContainer>
  );
};

export default Navbar;
