import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

// type import
import type ActivityGroupDetails from "../types/ActivityGroupDetails";

// component import
import EditIcon from "./icons/EditIcon";
import BackButton from "./icons/BackButton";
import PlusIcon from "./icons/PlusIcon";

// style reset import
import { ResetInput, ResetButton } from "../styles/reset";

interface Props {
  result: ActivityGroupDetails;
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

const ItemDetailsHeader = ({ result }: Props) => {
  const router = useRouter();
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(result.title);
  }, []);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value);
  };

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
          style={{ width: `${title.length}ch` }}
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
      <NewButton data-cy="activity-add-button">
        <PlusIcon />
        <NewButtonText>Tambah</NewButtonText>
      </NewButton>
    </HeaderContainer>
  );
};

export default ItemDetailsHeader;
