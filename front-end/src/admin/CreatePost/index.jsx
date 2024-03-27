import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../../components/ModuleToolbar';
import { useForm } from "react-hook-form";
import { useState } from 'react';


// const validationSchema = yup.object({
//   title: yup
//       .string('Add a post title')
//       .min(4, 'text content should havea minimum of 4 characters ')
//       .required('Post title is required'),
//   content: yup
//       .string('Add text content')
//       .min(10, 'text content should havea minimum of 10 characters ')
//       .required('text content is required'),
// });



const CreatePost = () => {

  // const {
  //     values,
  //     errors,
  //     touched,
  //     handleBlur,
  //     handleChange,
  //     handleSubmit,
  //     setFieldValue
  // } = useFormik({
  //     initialValues: {
  //         title: '',
  //         content: '',
  //         image: null,
  //     },

  //     validationSchema: validationSchema,
  //     onSubmit: (values, actions) => {
  //         createNewPost(values);
  //         //alert(JSON.stringify(values, null, 2));
  //         actions.resetForm();
  //     },
  // });

  const [content, setContent ] = useState("")
  const [image, setImage] = useState(null)

  const {
    register,
    handleSubmit,
    onChange,
    setFieldValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data,"dispach")
    //dispatch(userSignInAction(data));
  };




  const createNewPost = async (values) => {
      try {
          const { data } = await axios.post('/api/post/create', values);
          toast.success('post created');
      } catch (error) {
          console.log(error);
          toast.error(error);
      }
  }


  return (
      <>
          <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
              <Typography variant='h5' sx={{ pb: 4 }}> Create post  </Typography>
              <form component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 1 }}>
                  <TextField sx={{ mb: 3 }}
                      {...register("title", {
                        required: {
                          value: true,
                          message: "Title is required",
                        },
                        minLength: {
                          value: 4,
                          message: "text content should havea minimum of 4 characters ",
                        },
                      })}
                      fullWidth
                      id="title"
                      label="Post title"
                      name='title'
                      // InputLabelProps={{
                      //     shrink: true,
                      // }}
                      // placeholder="Post title"
                      // value={values.title}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      error={errors.title}
                      helperText={errors.title && errors.title?.message}
                  />


                  <Box sx={{ mb: 3 }}>
                      <ReactQuill
                          theme="snow"
                         name="content"
                          placeholder={'Write the post content...'}
                          modules={modules}
                          {...register("content", {
                            required: {
                              value: true,
                              message: "Text content is required",
                            },
                            minLength: {
                              value: 10,
                              message: "text content should havea minimum of 10 characters ",
                            },
                          })}
                          value={content}
                          onChange={(e) => setContent(e)}
                      />
                      {errors.content && <Box component='span' sx={{ color: '#d32f2f', fontSize: "12px", pl: 2 }}>{ errors.content?.message}</Box>}
                  </Box>

                  <Box border='2px dashed blue' sx={{ p: 1 }}>
                      <Dropzone
                          acceptedFiles=".jpg,.jpeg,.png"
                          multiple={false}
                          //maxFiles={3}
                          onDrop={(acceptedFiles) =>
                              acceptedFiles.map((file, index) => {
                                  const reader = new FileReader();
                                  reader.readAsDataURL(file);
                                  reader.onloadend = () => {
                                      setImage(reader.result)
                                  }
                              })
                          }
                      >
                          {({ getRootProps, getInputProps, isDragActive }) => (
                              <Box
                                  {...getRootProps()}

                                  p="1rem"
                                  sx={{ "&:hover": { cursor: "pointer" }, bgcolor: isDragActive ? "#cceffc" : "#fafafa" }}
                              >
                                  <input name="banner" {...getInputProps()} />
                                  {
                                      isDragActive ? (
                                          <>
                                              <p style={{ textAlign: "center" }}><CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} /></p>
                                              <p style={{ textAlign: "center", fontSize: "12px" }}> Drop here!</p>

                                          </>
                                      ) :

                                          image === null ?

                                              <>
                                                  <p style={{ textAlign: "center" }}><CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} /></p>
                                                  <p style={{ textAlign: "center", fontSize: "12px" }}>Drag and Drop here or click to choose</p>
                                              </> :



                                              <>
                                                  <Box sx={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>

                                                      <Box ><img style={{ maxWidth: "100px" }} src={image} alt="" /></Box>
                                                  </Box>
                                              </>
                                  }
                              </Box>
                          )}
                      </Dropzone>
                  </Box>
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      elevation={0}
                      sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px", }}
                  // disabled={loading}
                  >
                      Create post
                  </Button>
              </form>
          </Box>
      </>
  )
}

export default CreatePost