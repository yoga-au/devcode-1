// import React, { useRef, useState, useLayoutEffect } from "react";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import styled from "styled-components";

// helper import
import encodeEmailParam from "../../helpers/encodeEmailParam";

// type import
import type { AxiosResponse } from "axios";
import type { ParsedUrlQuery } from "querystring";
import type ActivityGroupData from "../../types/ActivityGroupData";
import type ActivityGroupDetails from "../../types/ActivityGroupDetails";

// style reset import

// component import
import ItemDetailsHeader from "../../components/ItemDetailsHeader";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  result: ActivityGroupDetails;
}

const ActivityDetails = ({ result }: Props) => {
  return (
    <>
      <ItemDetailsHeader result={result} />
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

  const response = await axios.get(`/activity-groups/${id}`);
  const result = await response.data;

  return { props: { result } };
};

export default ActivityDetails;
