import React, { useRef, useState, Dispatch, SetStateAction } from "react";
import NextImage from "next/image";
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

import SortIcon from "../public/assets/icons/todo-sort-button.svg";
import SortIconTerbaru from "../public/assets/icons/sort-selection-icon-terbaru.svg";
import SortIconTerlama from "../public/assets/icons/sort-selection-icon-terlama.svg";
import SortIconBelumSelesai from "../public/assets/icons/sort-selection-icon-belum-selesai.svg";
import SortIconAZ from "../public/assets/icons/sort-selection-icon-a-z.svg";
import SortIconZA from "../public/assets/icons/sort-selection-icon-z-a.svg";
import SortIconSelected from "../public/assets/icons/sort-selection-selected.svg";

interface Props {
  result: ActivityGroupDetails | undefined;
  id: string;
  openModal: () => void;
  setSortType: Dispatch<SetStateAction<string>>;
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
  margin-left: 1.125em;
  padding: 0 1.75em;
`;

const NewButtonText = styled.span`
  margin-left: 0.75em;
  font-weight: 600;
`;

const SortContainer = styled.div`
  position: relative;
`;

const SortOptionsParent = styled.div`
  position: absolute;
  /* padding: 1px 1px; */
  right: 0;
  left: -235px;
  border-radius: 6px;
  box-shadow: 0px 6px 15px 5px rgba(0, 0, 0, 0.1);
`;

const SortOptionContainer = styled.div`
  padding: 1.0625em 1.3125em;
  border-bottom: 1px solid hsla(0, 0%, 90%, 1);
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background: white;

  &:hover {
    background: hsla(0, 0%, 95%, 1);
  }
`;

const ItemDetailsHeader = ({ result, id, openModal, setSortType }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(result && result.title);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortOptionChecked, setSortOptionChecked] = useState("");

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value);
  };

  const handleEdit = useMutation(
    (patchTitle: ActivityTitleUpdateType) => editActivityTitle(id, patchTitle),
    {
      onSuccess: () => queryClient.invalidateQueries(`activity-${id}`),
    }
  );

  const SortOptions = [
    {
      title: "Terbaru",
      iconSrc: SortIconTerbaru,
      type: "terbaru",
    },
    {
      title: "Terlama",
      iconSrc: SortIconTerlama,
      type: "terlama",
    },
    {
      title: "A - Z",
      iconSrc: SortIconAZ,
      type: "a-z",
    },
    {
      title: "Z - A",
      iconSrc: SortIconZA,
      type: "z-a",
    },
    {
      title: "Belum Selesai",
      iconSrc: SortIconBelumSelesai,
      type: "belum-selesai",
    },
  ];

  const handleSortSelected = (sortType: string) => {
    switch (sortType) {
      case "terbaru":
        setSortOptionChecked("terbaru");
        setSortType("terbaru");
        setShowSortOptions(false);
        break;
      case "terlama":
        setSortOptionChecked("terlama");
        setSortType("terlama");
        setShowSortOptions(false);
        break;
      case "a-z":
        setSortOptionChecked("a-z");
        setSortType("a-z");
        setShowSortOptions(false);
        break;
      case "z-a":
        setSortOptionChecked("z-a");
        setSortType("z-a");
        setShowSortOptions(false);
        break;
      case "belum-selesai":
        setSortOptionChecked("belum-selesai");
        setSortType("belum-selesai");
        setShowSortOptions(false);
        break;
      default:
        break;
    }
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
      <div style={{ display: "flex" }}>
        <SortContainer data-cy="todo-sort-button">
          <NextImage
            src={SortIcon}
            onClick={() => setShowSortOptions(!showSortOptions)}
          />
          {showSortOptions && (
            <SortOptionsParent data-cy="sort-parent">
              {SortOptions.map((item, index) => {
                return (
                  <SortOptionContainer
                    key={index}
                    onClick={() => handleSortSelected(item.type)}
                    data-cy="sort-selection"
                  >
                    <div>
                      <NextImage
                        src={item.iconSrc}
                        data-cy="sort-selection-icon"
                      />
                      <span
                        style={{ marginLeft: "0.9375em" }}
                        data-cy="sort-selection-title"
                      >
                        {item.title}
                      </span>
                    </div>
                    {item.type === sortOptionChecked && (
                      <NextImage
                        src={SortIconSelected}
                        data-cy="sort-selection-checked"
                      />
                    )}
                  </SortOptionContainer>
                );
              })}
            </SortOptionsParent>
          )}
        </SortContainer>
        <NewButton data-cy="activity-add-button" onClick={openModal}>
          <PlusIcon />
          <NewButtonText>Tambah</NewButtonText>
        </NewButton>
      </div>
    </HeaderContainer>
  );
};

export default ItemDetailsHeader;
