import styled from "styled-components";
import { ResetButton } from "../styles/reset";
import NextImage from "next/image";

// image import
import emptyStateImage from "../public/assets/images/activity-empty-state.png";

// component import
import PlusIcon from "../components/icons/PlusIcon";

// styling
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 2.25rem;
`;

const NewButton = styled(ResetButton)`
  background-color: ${(props) => props.theme.blue};
  color: white;
  border-radius: 45px;
  display: flex;
  align-items: center;
  padding: 0 1.75em;
`;

const NewButtonText = styled.span`
  margin-left: 0.75em;
  font-weight: 600;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3.75em 0;
`;

const Home = () => {
  return (
    <>
      <HeaderContainer>
        <Title data-cy="activity-title">Activity</Title>
        <NewButton data-cy="activity-add-button">
          <PlusIcon />
          <NewButtonText>Tambah</NewButtonText>
        </NewButton>
      </HeaderContainer>
      <EmptyStateContainer>
        <NextImage
          src={emptyStateImage}
          alt="Buat activity pertamamu"
          data-cy="activity-empty-state"
        />
      </EmptyStateContainer>
    </>
  );
};

export default Home;
