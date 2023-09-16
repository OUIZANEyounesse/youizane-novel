"use client";
import { ADD_AUTHOR, UPDATE_AUTHOR } from "@/graphql/client/mutations";
import { GET_AUTHORS } from "@/graphql/client/queries";
import { IAuthor } from "@/types/typings";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FAuthorProps = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  action?: "edit" | "create";
  author?: IAuthor;
};

function FAuthor({
  open,
  handleOk,
  handleCancel,
  action,
  author,
}: FAuthorProps) {
  const router = useRouter();
  const [addAuthor] = useMutation(ADD_AUTHOR ,{
    refetchQueries: [{ query: GET_AUTHORS }]});
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });
  const authorSubmit = () => {
    handleOk();
    if (action === "edit") {
      updateAuthor({ variables: { updateAuthorId: author?.id, name: name } });
    } else {
      addAuthor({ variables: { name } });
      router.push("/authors");
    }
  };
  const [name, setName] = useState("");
  useEffect(() => {
    setName(author?.name || "");
  }, [author]);
  return (
    <>
      <Modal
        title={action === "edit" ? "Update Author" : "Add New Author"}
        open={open}
        onOk={authorSubmit}
        onCancel={handleCancel}
        okText={action === "edit" ? "Update" : "Create"}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={() => {}}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item
            label="Autor Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input  author name!",
              },
            ]}
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default FAuthor;
