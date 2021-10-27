import { useState } from "react";
import NextImage from "next/image";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import styled from "styled-components";
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

// image import
import emptyStateImage from "../../public/assets/images/todo-empty-state.svg";

// styling
const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3.75em 0;
`;

const DialogOverlayStyled = styled(DialogOverlay)`
  z-index: 4;
`;

const DialogContentStyled = styled(DialogContent)`
  border-radius: 12px;
`;

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  id: string;
}

const ActivityDetails = ({ id }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const activityDetails = useQuery(`activity-${id}`, () =>
    fetchActivityDetails(id)
  );

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
      <EmptyStateContainer
        data-cy="activity-empty-state"
        onClick={() => setShowModal(true)}
      >
        <NextImage src={emptyStateImage} alt="Buat List Item kamu" />
      </EmptyStateContainer>
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
