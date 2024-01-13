import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../App";
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import "./style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

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
  //useState
  const [productDetails, setProductDetails] = useState("");
  const [idItem, setIdItem] = useState("");

  //let x = await productDetails
  const { id } = useParams();
  console.log(id);
  // console.log(idItem);
  const goToProduct = () => {
    axios
      .get(`http://localhost:5000/products/search_1/${id}`)
      .then((result) => {
        console.log(result.data._product[0]);
        setProductDetails(result.data._product[0]);
        console.log(productDetails);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  useEffect(() => {
    goToProduct();
  }, []);
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
              {productDetails.isSafeProduct ? <ThumbUpAltIcon /> : <ThumbDownAltIcon/>}
            </Item>
            <Item>{productDetails.categories}</Item>
          </Grid>
          <Grid item xs={12}>
            <Item>{productDetails.review}</Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Details;
// productName, reason, link, productImage, isSafeProduct, categories, oppositeProduct, createdBy, review
