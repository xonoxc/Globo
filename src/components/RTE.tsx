import React from "react"
import { Editor } from "@tinymce/tinymce-react"
import { Control, Controller, UseFormRegister } from "react-hook-form"
import { PostProps } from "../types"
import env from "../config/config"

interface RTEProps {
     name?: "userid" | "content" | "status" | "title"
     control?: Control<PostProps>
     label?: string
     defaultValue?: string
     register?: UseFormRegister<any>
}

const RTE: React.FC<RTEProps> = ({ control, label, defaultValue = "" }) => {
     return (
          <div className="w-full">
               {label && (
                    <label className="inline-block mb-1 pl-1">{label}</label>
               )}

               <Controller
                    name={"content"}
                    control={control}
                    render={({ field: { onChange } }) => (
                         <Editor
                              apiKey={env?.VITE_TINYMICE_API_KEY}
                              initialValue={defaultValue}
                              init={{
                                   initialValue: defaultValue,
                                   height: 500,
                                   content_css: "writer",
                                   menubar: true,
                                   plugins: [
                                        "image",
                                        "advlist",
                                        "autolink",
                                        "lists",
                                        "link",
                                        "image",
                                        "charmap",
                                        "preview",
                                        "anchor",
                                        "searchreplace",
                                        "visualblocks",
                                        "code",
                                        "fullscreen",
                                        "insertdatetime",
                                        "media",
                                        "table",
                                        "code",
                                        "help",
                                        "wordcount",
                                        "anchor",
                                   ],
                                   toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                   content_style:
                                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                              }}
                              onEditorChange={onChange}
                         />
                    )}
               />
          </div>
     )
}

export default RTE
