import { useState, useEffect } from "react";
import styled from "styled-components";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useMutation, useQueryClient } from "react-query";
// import Select, { StylesConfig } from "react-select";
import "@reach/dialog/styles.css";
import { ResetButton } from "../styles/reset";
import createItemTodo from "../mutation/createItemTodo";
import { updateTodoItem } from "../mutation/updateTodoItem";
import type NewItemTodoType from "../types/NewItemTodoType";
import { TodoItem } from "../types/ActivityGroupDetails";

const DialogOverlayStyled = styled(DialogOverlay)`
  z-index: 4;
`;

const DialogContentStyled = styled(DialogContent)`
  border-radius: 12px;
`;

const HeaderModalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.125em;
  border-bottom: 1px solid hsla(0, 0%, 90%, 1);
`;

const Label = styled.label`
  width: 100%;
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  margin: 1.625em 0 0.5em;
`;

const InputName = styled.input`
  width: 100%;
  padding: 0.875em 0 0.875em 1.125em;
  border: 1px solid hsla(0, 0%, 90%, 1);
  border-radius: 6px;
  font-size: 1rem;

  &::placeholder {
    color: hsla(0, 0%, 64%, 1);
  }
`;

const NewButton = styled(ResetButton)`
  background-color: ${(props) => props.theme.blue};
  color: white;
  border-radius: 45px;
  display: flex;
  align-items: center;
  padding: 0.875em 1.75em;
`;

const NewButtonText = styled.span`
  font-weight: 600;
`;

const FooterContainer = styled.div`
  margin-top: 1.5em;
  display: flex;
  justify-content: flex-end;
  padding-top: 1em;
  border-top: 1px solid hsla(0, 0%, 90%, 1);
`;

interface Props {
  showModal: boolean;
  closeModal: () => void;
  id: string;
  editId: number;
  isEdit: boolean;
  doneEdit: () => void;
  todoData: TodoItem[] | undefined;
}

interface Options {
  value: string;
  label: string;
}

const DialogNewTodo = ({
  showModal,
  closeModal,
  id,
  editId,
  isEdit,
  doneEdit,
  todoData,
}: Props) => {
  const queryClient = useQueryClient();
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("very-high");
  const [editData, setEditData] = useState<TodoItem | undefined>(undefined);

  const priorityOptions: Options[] = [
    {
      value: "very-high",
      label: "Very High",
    },
    {
      value: "high",
      label: "High",
    },
    {
      value: "normal",
      label: "Medium",
    },
    {
      value: "low",
      label: "Low",
    },
    {
      value: "very-low",
      label: "Very Low",
    },
  ];

  const handleSubmit = useMutation(
    (newItemTodo: NewItemTodoType) => createItemTodo(id, newItemTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`activity-${id}`);
        setTodoName("");
        setPriority("very-high");
        closeModal();
      },
    }
  );

  const handleEdit = useMutation(
    (editItemTodo: TodoItem) => updateTodoItem(editId, editItemTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`activity-${id}`);
        setTodoName("");
        setPriority("very-high");
        doneEdit();
      },
    }
  );

  useEffect(() => {
    if (isEdit && todoData) {
      const findData = todoData.find((item) => item.id === editId);
      if (findData) {
        setTodoName(findData.title);
        setPriority(findData.priority);
        setEditData(findData);
      }
    }
  }, [isEdit]);

  return (
    <DialogOverlayStyled isOpen={showModal} onDismiss={closeModal}>
      <DialogContentStyled aria-label="Tambah List Item" data-cy="modal-add">
        <HeaderModalContainer>
          <h3 data-cy="modal-add-title">Tambah List Item</h3>
          <svg
            onClick={closeModal}
            data-cy="modal-add-close-button"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="#A4A4A4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#A4A4A4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </HeaderModalContainer>
        <Label data-cy="modal-add-name-title">NAMA LIST ITEM</Label>
        <InputName
          type="text"
          name="list-name"
          placeholder="Tambahkan nama list item"
          data-cy="modal-add-name-input"
          value={todoName}
          onChange={(ev) => setTodoName(ev.target.value)}
        />
        <Label data-cy="modal-add-priority-title">PRIORITY</Label>
        {/* <Select options={priorityOptions} styles={customStyle} /> */}
        <select
          value={priority}
          onChange={(ev) => setPriority(ev.target.value)}
          data-cy="modal-add-priority-dropdown"
        >
          {priorityOptions.map((item, index) => {
            return (
              <option
                value={item.value}
                data-cy="modal-add-priority-item"
                key={index}
              >
                {item.label}
              </option>
            );
          })}
        </select>
        <FooterContainer>
          <NewButton
            data-cy="modal-add-save-button"
            onClick={() => {
              if (isEdit && editData) {
                handleEdit.mutate({
                  activity_group_id: editData.activity_group_id,
                  title: todoName,
                  priority: priority,
                  is_active: editData.is_active,
                  id: editId,
                });
                return;
              }
              handleSubmit.mutate({
                activity_group_id: id,
                title: todoName,
                priority: priority,
                // is_active: false,
                // _comment: "comment",
              });
            }}
          >
            <NewButtonText>Simpan</NewButtonText>
          </NewButton>
        </FooterContainer>
      </DialogContentStyled>
    </DialogOverlayStyled>
  );
};

export default DialogNewTodo;
