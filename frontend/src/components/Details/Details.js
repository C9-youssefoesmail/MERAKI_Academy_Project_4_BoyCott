import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Link,
  List,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  styled,
} from "@mui/material";
import "./style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { LoginContext } from "../../App";
import { Delete } from "@mui/icons-material";

//styled
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: "10%",
  marginLeft: "10%",
  marginRight: "10%",
}));

//Details function
const Details = () => {
  //useContext
  const { token, userStatus } = useContext(LoginContext);

  //useState
  const [productDetails, setProductDetails] = useState({});
  const [comment, setComment] = useState("");
  const [product, setProduct] = useState("");
  const [productMap, setProductMap] = useState([])

  //product id from URL
  const { id } = useParams();
  console.log(id);

  //goToProduct
  const goToProduct = () => {
    axios
      .get(`http://localhost:5000/products/search_1/${id}`)
      .then((result) => {
        setProduct(id);
        setProductDetails(result.data._product[0]);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //getAllProducts
  const getAllProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        setProductMap(result.data)
        console.log(result.data);
      })
      .catch((err) => {
        console.log("error in getAllProducts function");
      });
  };

  //createComment
  const createComment = (id) => {
    console.log(id);
    if (comment && product) {
      axios
        .post(`http://localhost:5000/comments`, commentVar, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((result) => {
          //! How to filter
          goToProduct();
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    } else {
      console.log("out of IF", comment, product);
    }
  };

  //deleteComment
  const deleteComment = (id) => {
    axios
        .delete(`http://localhost:5000/comments/search_1/${id}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log("Done");
          //! How to filter
          goToProduct();
        })
        .catch((err) => {
          console.log(id, "deleteComment =>",userStatus);
          console.log("error => ", err);
        });
  };

  //deleteCommentFromAdmin
  const deleteCommentFromAdmin = (id) => {
    axios
        .delete(`http://localhost:5000/comments/search_2/${id}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log("Done");
          //! How to filter
          goToProduct();
        })
        .catch((err) => {
          console.log(id,"deleteCommentFromAdmin =>",userStatus);
          console.log("error => ", err);
        });
  };

  //!---------------update product

  //useEffect
  useEffect(() => {
    goToProduct();
    getAllProducts();
  }, []);

  const commentVar = { comment, product };

  //return of the component
  return (
    <div>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Item>
              <List>
                <CardMedia
                  component="img"
                  image={productDetails.productImage}
                />
              </List>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{productDetails.productName}</Item>
            <Item>
              {productDetails.reason}
              <br />
              <Link href={productDetails.link}>Link</Link>
            </Item>
            <Item>
              {productDetails.isSafeProduct ? (
                <ThumbUpAltIcon />
              ) : (
                <ThumbDownAltIcon />
              )}
            </Item>
            <Item>
              {productDetails.categories && productDetails.categories.typeName}
            </Item>
            <Item>
              {productDetails.isSafeProduct ? "" : (productDetails.oppositeProduct
                ? productDetails.oppositeProduct.productName
                : (userStatus==="admin" ? <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="category"
                  onChange={(e)=>{console.log(e.target.value)}}
                >
                  {productMap.map((name, i) => {
                    if(name.isSafeProduct !== productDetails.isSafeProduct)
                    {
                      return <MenuItem value={name._id}>{name.productName}</MenuItem>;
                    }
                  })}
                </Select>
              </FormControl> : "opposite not found"))}
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <TextField
              id="outlined-textarea"
              label="comment..."
              multiline
              onChange={(e) => {
                  setComment(e.target.value);
                  console.log(comment, token);
                }}
            />
              <Button
                onClick={() => {
                  createComment(productDetails._id);
                }}
              >
                Add
              </Button>
              {productDetails.review &&
                productDetails.review.map((comment, i) => {
                  console.log(comment);
                  return (
                    <>
                      <p>
                        {comment.createdBy} comment : {comment.comment}{" "}
                        <IconButton aria-label="delete" size="small">
                          <Delete
                            fontSize="inherit"
                            onClick={() =>{userStatus==="admin" ? deleteCommentFromAdmin(comment._id) : deleteComment(comment._id)}}
                            style={{ color: "red" }}
                          />
                        </IconButton>
                      </p>
                    </>
                  );
                })}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Details;
// productName, reason, link, productImage, isSafeProduct, categories, oppositeProduct, createdBy, review
