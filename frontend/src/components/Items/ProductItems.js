import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LoginContext } from "../../App";

//!----------------------productItems function
const ProductItems = () => {
  //!----------------------useContext
  const { isTrue, isFalse} = useContext(LoginContext);

  //!----------------------useState
  const [products, setProducts] = useState([]);

  //!----------------------useNavigate
  const navigate = useNavigate();

  //!----------------------getAllProducts
  const getAllProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        setProducts(result.data);
        console.log(result.data);
      })
      .catch((err) => {});
  };

  //!----------------------goToProduct page
  const goToProduct = (id) => {
    axios
      .get(`http://localhost:5000/products/search_1/${id}`)
      .then((result) => {
        navigate(`/${id}/Details`);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //!----------------------useEffect
  useEffect(() => {
    getAllProducts();
  }, []);

  //!----------------------copyURL
  const copyURL = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/${id}/Details`);
  };

  //!----------------------return the component
  return (
    <div className="Products">
      {products
        .filter(
          (product) =>
            product.isSafeProduct === isTrue ||
            product.isSafeProduct === isFalse
        )
        .map((productItem, i) => {
          return (
            <Box flex={1} p={2}>
              <List>
                <ListItem disablePadding>
                  <Card elevation={3} className="cards">
                    <CardMedia
                      sx={{ height: 200, width: 200 }}
                      image={productItem.productImage}
                      title={productItem.productName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {productItem.productName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {productItem.isSafeProduct ? (
                          <ThumbUpAltIcon />
                        ) : (
                          <ThumbDownAltIcon />
                        )}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          copyURL(productItem._id);
                        }}
                      >
                        <ContentCopyIcon />
                      </Button>
                      <Button
                        size="small"
                        onClick={() => {
                          goToProduct(productItem._id);
                        }}
                      >
                        read more
                      </Button>
                    </CardActions>
                  </Card>
                </ListItem>
              </List>
            </Box>
          );
        })}
    </div>
  );
};

export default ProductItems;
