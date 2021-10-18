import React from "react";
import styled from "styled-components";

// styling
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const BodyContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default BodyContainer;
