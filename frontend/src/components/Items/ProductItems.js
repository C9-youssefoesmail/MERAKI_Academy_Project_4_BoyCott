import React, { useEffect, useContext, useState, Profiler } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";

//productItems function
const ProductItems = () => {
  //useState
  const { productDetails, setProductDetails } = useContext(LoginContext);
  const [products, setProducts] = useState([]);

  //useNavigate
  const navigate = useNavigate();

  //getAllProducts
  const getAllProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        setProducts(result.data);
        console.log(result.data);
      })
      .catch((err) => {});
  };

  //goToProduct page
  const goToProduct = (id, name) => {
    console.log(id, name);
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((result) => {console.log(productDetails);
        navigate("/Details");
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //useEffect
  useEffect(() => {
    getAllProducts();
  }, []);

  //return the component
  return (
    <div className="Products">
      {products.map((productItem, i) => {
        return (
          <Box
            flex={1}
            p={2}
            sx={{
              width: "200px",
            }}
          >
            <List>
              <ListItem disablePadding>
                <Card>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={productItem.productImage}
                    title={productItem.productName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {productItem.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {productItem.reason}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button
                      size="small"
                      onClick={() => {
                        setProductDetails(productItem);
                        goToProduct(productItem._id, productItem);
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
