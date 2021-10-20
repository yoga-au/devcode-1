import styled from "styled-components";

// styling section
const NavContainer = styled.nav`
  min-height: 105px;
  background-color: ${(props) => props.theme.blue};
  position: sticky;
  top: 0;
  z-index: 3;
  margin-bottom: 2.6875em;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
      <TitleContainer>
        <NavTitle data-cy="header-title">TO DO LIST APP</NavTitle>
      </TitleContainer>
    </NavContainer>
  );
};

export default Navbar;
