import { useState, useRef } from "react";
import NextImage from "next/image";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import styled, { css } from "styled-components";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

// helper import
import encodeEmailParam from "../../helpers/encodeEmailParam";

// type import
import type { AxiosResponse } from "axios";
import type { ParsedUrlQuery } from "querystring";
import type ActivityGroupData from "../../types/ActivityGroupData";

// fetcher and mutation import
import fetchActivityDetails from "../../fetcher/fetchActivityDetails";

// style reset import

// component import
import ItemDetailsHeader from "../../components/ItemDetailsHeader";
import DialogNewTodo from "../../components/DialogNewTodo";
import EditIcon from "../../components/icons/EditIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";

// image import
import emptyStateImage from "../../public/assets/images/todo-empty-state.svg";

interface SpanContainerProps {
  iconHeight: number;
}

interface PriorityIndicatorProps {
  priority: string;
}

interface TodoTitlePRops {
  isActive: number;
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  id: string;
}

// styling
const mixinPriorityColor = (priority: string) => {
  switch (priority) {
    case "very-high":
      return "hsla(354, 82%, 61%, 1)";
    case "high":
      return "hsla(46, 100%, 60%, 1)";
    case "normal":
      return "hsla(172, 100%, 33%, 1)";
    case "low":
      return "hsla(192, 74%, 58%, 1)";
    case "very-low":
      return "hsla(279, 100%, 55%, 1)";
    default:
      break;
  }
};

const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3.75em 0;
`;

const TodoItemContainer = styled.div`
  background: white;
  padding: 1.875em 1.75em;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 0.625em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoItemContent = styled.div`
  display: flex;
  align-items: center;
`;

const SpanContainer = styled.span<SpanContainerProps>`
  display: inline-block;
  height: ${(props) => props.iconHeight}px;
  cursor: pointer;
  margin-left: 1em;
`;

const PriorityIndicator = styled.span<PriorityIndicatorProps>`
  width: 9px;
  height: 9px;
  background-color: ${(props) => mixinPriorityColor(props.priority)};
  border-radius: 50%;
  margin-right: 1em;
`;

const CheckBox = styled.input`
  margin-right: 1.375em;
`;

const TodoTitle = styled.h3<TodoTitlePRops>`
  text-decoration: ${(props) => (props.isActive ? "solid" : "line-through")};
  color: ${(props) => (props.isActive ? "black" : "hsla(0, 0%, 53%, 1)")};
  font-weight: 500;
`;

const ActivityDetails = ({ id }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const activityDetails = useQuery(`activity-${id}`, () =>
    fetchActivityDetails(id)
  );

  const todoData = activityDetails.data && activityDetails.data.todo_items;

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <ItemDetailsHeader
        result={activityDetails.data}
        id={id}
        openModal={openModal}
      />
      {todoData && todoData.length === 0 && (
        <EmptyStateContainer
          data-cy="activity-empty-state"
          onClick={() => setShowModal(true)}
        >
          <NextImage src={emptyStateImage} alt="Buat List Item kamu" />
        </EmptyStateContainer>
      )}
      {todoData &&
        todoData.length !== 0 &&
        todoData.map((todo) => {
          return (
            <TodoItemContainer key={todo.id}>
              <TodoItemContent>
                <CheckBox type="checkbox" checked={!todo.is_active} />
                <PriorityIndicator
                  priority={todo.priority}
                  data-cy="todo-item-priority-indicator"
                />
                <TodoTitle isActive={todo.is_active}>{todo.title}</TodoTitle>
                <SpanContainer iconHeight={24} data-cy="todo-item-edit-button">
                  <EditIcon />
                </SpanContainer>
              </TodoItemContent>
              <SpanContainer iconHeight={24}>
                <DeleteIcon />
              </SpanContainer>
            </TodoItemContainer>
          );
        })}
      <DialogNewTodo showModal={showModal} closeModal={closeModal} id={id} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response: AxiosResponse<ActivityGroupData> = await axios.get(
    `/activity-groups?email=${encodeEmailParam()}`
  );
  const result = response.data;
  const paths = result.data.map((item) => {
    return { params: { id: item.id.toString() } };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(`activity-${id}`, () =>
    fetchActivityDetails(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
};

export default ActivityDetails;
