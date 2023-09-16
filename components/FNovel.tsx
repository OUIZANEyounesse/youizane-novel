'use client'
import { ADD_NOVEL, ASSIGN_AUTHOR_TO_NOVEL, UPDATE_NOVEL } from "@/graphql/client/mutations";
import {  GET_NOVELS , GET_AUTHORS} from "@/graphql/client/queries";
import { IAuthor, INovel } from "@/types/typings";
import { useMutation, useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useEffect, useState } from "react";
import ListAuthor from "./ListAuthor";
import { useRouter } from 'next/navigation';
import { Form, Input, Modal, Select } from "antd";

interface FormNovelProps {
  action?: "create"| "edit"
  novel?: INovel
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export default function FNovel({
  open,
  handleOk,
  handleCancel,
  action,
  novel,
}: FormNovelProps) {
  const [addNovel] = useMutation(ADD_NOVEL, {
		refetchQueries: [{ query: GET_NOVELS }]});
    const [updateNovel] = useMutation(UPDATE_NOVEL, {
      refetchQueries: [{ query: GET_NOVELS }]});
      const [assignAuthorToNovel] = useMutation(ASSIGN_AUTHOR_TO_NOVEL);
  const [title , setTitle ] = useState<string>("");
  const [image , setImage ] = useState<string>("");
  const [desccription , setDesccription ] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] =  useState<IAuthor[]>([]);
  const {data } = useQuery(GET_AUTHORS);
  const [idAuthor, setIdAuthor] = useState( '');
  const router = useRouter();
  console.log("list authors",data);
  console.log("id authors selected ", idAuthor);

  const NovelSubmit = () =>{
    if (title === "" || image === "" || desccription === "") {
      alert("All elements are required.");
    
    }
    handleOk();
    if(action !== null && action === "edit" && novel !== null ){
       updateNovel({variables:{updateNovelId:novel?.id,title, image,desccription,idAuthor: idAuthor}})

      if( selectedAuthor?.length > 0 && novel !== null){
        selectedAuthor?.map((author:IAuthor) => 
        assignAuthorToNovel({variables: {authorId: author?.id, novelId:novel?.id }}) 
        )
        
      }
    }else{

      // @ts-ignore
      addNovel({variables:{title, image,desccription,authorId:selectedAuthor[0]?.id}})
      router.push('/');
    }
  }
  useEffect(()=>{

    setTitle(novel?.title || "");
    setImage(novel?.image || "");
    setDesccription(novel?.desccription || "");
    let authors:IAuthor[] = novel?.authors?.map((item) => item.author) || [];
    // @ts-ignore
    setSelectedAuthor<IAuthor[]>(authors);
  },[novel])



  const options = [];
  data.authors.forEach((author:IAuthor) => {
    options.push({
          label: author.name,
          value: author.id,
        });
  });
// data.authors.map(authorItem :IAuthor) {
//   options.push({
//     label: ,
//     value: ,
//   });
}
const handleChange = (value:any) => {
  console.log(`selected ${value}`);
};
  
  
  
  return (

    <>
      <Modal
        title={action === "edit" ? "Update Novel":"Add New Novel"}
        open={open}
        onOk={NovelSubmit}
        onCancel={handleCancel}
        okText={action === "edit" ? "Update Novel": "Create Novel"}
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
            label="Title "
            name="title"
            rules={[
              {
                required: true,
                message: "Please input  Title novel!",
              },
            ]}
          >
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Url Image "
            name="image"
            rules={[
              {
                required: true,
                message: "Please input  Url image",
              },
            ]}
          >
            <Input value={image} onChange={(e) => setImage(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="desccription "
            name="descriptiion"
            rules={[
              {
                required: true,
                message: "Please input  desccription novel!",
              },
            ]}
          >
            <Input value={desccription} onChange={(e) => setDesccription(e.target.value)} />
          </Form.Item>

          {/* <Form.Item
            label="Author "
            name="author"
            rules={[
              {
                required: false,
                message: "Please ",
              },
            ]}
          >
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item> */}
          <Select
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder="Please select"
      defaultValue={[]}
      onChange={handleChange}
      options={options}
    />

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