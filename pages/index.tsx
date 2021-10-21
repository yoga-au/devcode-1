import styled from "styled-components";
import { ResetButton } from "../styles/reset";
import NextImage from "next/image";
import { useQuery } from "react-query";
import dayjs from "dayjs";

// fetcher import
import fetchActivityGroup from "../fetcher/fetchActivityGroup";

// image import
import emptyStateImage from "../public/assets/images/activity-empty-state.png";

// component import
import PlusIcon from "../components/icons/PlusIcon";
import DeleteIconButton from "../components/DeleteIconButton";

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

const ActivityGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25em;
  margin: 3.75em 0;
`;

const ActivityGridItemContainer = styled.div`
  min-height: 234px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.375em 1.625em;
  border-radius: 12px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
`;

const ActivityDateTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActivityTitle = styled.h3`
  color: ${(props) => props.theme.black};
  font-size: 1.125rem;
  font-weight: 700;
`;

const ActivityDate = styled.span`
  color: ${(props) => props.theme.darkGray};
  font-size: 0.875rem;
`;

const Home = () => {
  const activityGroup = useQuery("activityGroup", () => fetchActivityGroup());

  const dummyData = [
    {
      id: 1,
      title: "New Activity",
      created_at: "21 October 2021",
    },
    {
      id: 2,
      title: "New Activity 2",
      created_at: "21 October 2021",
    },
    {
      id: 3,
      title: "New Activity 3",
      created_at: "21 October 2021",
    },
    {
      id: 4,
      title: "New Activity 4",
      created_at: "21 October 2021",
    },
    {
      id: 5,
      title: "New Activity 5",
      created_at: "21 October 2021",
    },
  ];

  return (
    <>
      <HeaderContainer>
        <Title data-cy="activity-title">Activity</Title>
        <NewButton data-cy="activity-add-button">
          <PlusIcon />
          <NewButtonText>Tambah</NewButtonText>
        </NewButton>
      </HeaderContainer>
      {activityGroup.data && activityGroup.data.total === 0 && (
        <EmptyStateContainer>
          <NextImage
            src={emptyStateImage}
            alt="Buat activity pertamamu"
            data-cy="activity-empty-state"
          />
        </EmptyStateContainer>
      )}
      {activityGroup.data && activityGroup.data.total > 0 && (
        <ActivityGridContainer>
          {activityGroup.data.data.map((item) => {
            return (
              <ActivityGridItemContainer key={item.id} data-cy="activity-item">
                <ActivityTitle data-cy="activity-title">
                  {item.title}
                </ActivityTitle>
                <ActivityDateTitleContainer>
                  <ActivityDate data-cy="activity-date">
                    {dayjs(item.created_at).format("DD MMMM YYYY")}
                  </ActivityDate>
                  <DeleteIconButton />
                </ActivityDateTitleContainer>
              </ActivityGridItemContainer>
            );
          })}
        </ActivityGridContainer>
      )}
    </>
  );
};

export default Home;
