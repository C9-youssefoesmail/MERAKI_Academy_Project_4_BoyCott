import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Input,
  Link,
  List,
  Paper,
  styled,
} from "@mui/material";
import "./style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { LoginContext } from "../../App";

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
  const { token } = useContext(LoginContext);

  //useState
  const [productDetails, setProductDetails] = useState({});
  const [comm, setComm] = useState("")

  //product id from URL
  const { id } = useParams();
  console.log(id);

  //goToProduct
  const goToProduct = () => {
    axios
      .get(`http://localhost:5000/products/search_1/${id}`)
      .then((result) => {
        setProductDetails(result.data._product[0]);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //createComment
  const createComment = (id) => {
    console.log(id);
    if(comm){
      axios
      .post(`http://localhost:5000/comments`, comm, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result)=>{
        goToProduct()
      })
      .catch((err)=>{
        console.log("error => ", err);
      })
    }
  }

  //useEffect
  useEffect(() => {
    goToProduct();
  }, []);

  const fdjj = {comm , }

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
          </Grid>
          <Grid item xs={12}>
            <Item>
              {productDetails.review &&
                productDetails.review.map((comment, i) => {
                  console.log(comment);
                  return <p>{comment.comment}</p>;
                })}
              <input
                type="text"
                placeholder="comment..."
                onChange={(e) => {
                  setComm(e.target.value)
                  console.log(comm);
                }}
              />
              <Button onClick={() => {
                createComment(productDetails._id)
              }}>Add Comment</Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Details;
// productName, reason, link, productImage, isSafeProduct, categories, oppositeProduct, createdBy, review
