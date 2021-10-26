// import React, { useRef, useState, useLayoutEffect } from "react";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import styled from "styled-components";
import { QueryClient, dehydrate, useQuery } from "react-query";

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

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  id: string;
}

const ActivityDetails = ({ id }: Props) => {
  const activityDetails = useQuery(`activity-${id}`, () =>
    fetchActivityDetails(id)
  );

  return (
    <>
      <ItemDetailsHeader result={activityDetails.data} id={id} />
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
