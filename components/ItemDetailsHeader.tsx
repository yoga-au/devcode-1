import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

// type import
import type ActivityGroupDetails from "../types/ActivityGroupDetails";
import type ActivityTitleUpdateType from "../types/ActivityTitleUpdateType";

// fetcher and mutation import
import editActivityTitle from "../mutation/editActivityTitle";

// component import
import EditIcon from "./icons/EditIcon";
import BackButton from "./icons/BackButton";
import PlusIcon from "./icons/PlusIcon";

// style reset import
import { ResetInput, ResetButton } from "../styles/reset";

interface Props {
  result: ActivityGroupDetails | undefined;
  id: string;
  openModal: () => void;
}

interface SpanContainerProps {
  iconHeight: number;
}

// styling
const InputTitle = styled(ResetInput)`
  font-size: 2.25rem;
  font-weight: 700;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3em;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SpanContainer = styled.span<SpanContainerProps>`
  display: inline-block;
  height: ${(props) => props.iconHeight}px;
  cursor: pointer;
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

const ItemDetailsHeader = ({ result, id, openModal }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(result && result.title);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value);
  };

  const handleEdit = useMutation(
    (patchTitle: ActivityTitleUpdateType) => editActivityTitle(id, patchTitle),
    {
      onSuccess: () => queryClient.invalidateQueries(`activity-${id}`),
    }
  );

  return (
    <HeaderContainer>
      <TitleContainer>
        <SpanContainer
          onClick={() => router.push("/")}
          iconHeight={32}
          data-cy="todo-back-button"
        >
          <BackButton />
        </SpanContainer>
        <InputTitle
          type="text"
          ref={inputTitleRef}
          value={title}
          onChange={handleChange}
          onBlur={() => title && handleEdit.mutate({ title })}
          style={{ width: `${title && title.length}ch` }}
          data-cy="todo-title"
        />
        <SpanContainer
          onClick={() => inputTitleRef.current?.focus()}
          iconHeight={24}
          data-cy="todo-edit-button"
        >
          <EditIcon />
        </SpanContainer>
      </TitleContainer>
      <NewButton data-cy="activity-add-button" onClick={openModal}>
        <PlusIcon />
        <NewButtonText>Tambah</NewButtonText>
      </NewButton>
    </HeaderContainer>
  );
};

export default ItemDetailsHeader;
