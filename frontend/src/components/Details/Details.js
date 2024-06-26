import React, { useEffect, useState, useContext } from "react";
import {
  Alert,
  Box,
  Button,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  List,
  MenuItem,
  Paper,
  Select,
  TextField,
  styled,
} from "@mui/material";
import "./style.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { LoginContext } from "../../App";
import { Delete } from "@mui/icons-material";

//!----------------------styled
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: "1%",
  marginLeft: "1%",
  marginRight: "1%",
  backgroundColor: "rgba(193, 233, 186, 0.222)",
}));

//!----------------------Details function
const Details = () => {
  //!----------------------useContext
  const { token, userStatus } = useContext(LoginContext);

  //!----------------------useNavigate
  const navigate = useNavigate();

  //!----------------------useState
  const [productDetails, setProductDetails] = useState({});
  const [comment, setComment] = useState("");
  const [product, setProduct] = useState("");
  const [productMap, setProductMap] = useState([]);
  const [oppositeProduct, setOppositeProduct] = useState("");
  const [message, setMessage] = useState("");

  //!----------------------commentArr
  const commentArr = []

  //!----------------------product id from URL
  const { id } = useParams();
  console.log(id);

  //!----------------------goToProduct
  const goToProduct = () => {
    axios
      .get(`https://meraki-academy-project-4-boycott-2.onrender.com/products/search_1/${id}`)
      .then((result) => {
        setProduct(id);
        setProductDetails(result.data._product[0]);
        console.log(result.data._product[0].review);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //!----------------------getAllProducts
  const getAllProducts = () => {
    axios
      .get("https://meraki-academy-project-4-boycott-2.onrender.com/products")
      .then((result) => {
        setProductMap(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log("error in getAllProducts function");
      });
  };

  //!----------------------deleteProduct
  const deleteProduct = () => {
    axios
      .delete(`https://meraki-academy-project-4-boycott-2.onrender.com/products/${id}`)
      .then((result) => {
        console.log("deleted");
        navigate("/");
      })
      .catch((err) => {
        console.log("error in deleteProduct function");
      });
  };

  //!----------------------createComment
  const createComment = (id) => {
    console.log(id);
    if (comment && product) {
      axios
        .post(`https://meraki-academy-project-4-boycott-2.onrender.com/comments`, commentVar, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((result) => {
          goToProduct()
          //! How to filter
          // const newProductDetails = productDetails.review.map((comm, i)=>{
          //   return comm.comment
          // })
          // newProductDetails.push(comment)
          // console.log(product, comment, newProductDetails);
          // productDetails.review = newProductDetails
          // console.log(productDetails);
          // setProductDetails(productDetails)
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    } else {
      setMessage(<Alert severity="error">please Login.</Alert>);
      console.log("out of IF", comment, product);
    }
  };

  //!----------------------deleteComment
  const deleteComment = (id) => {
    axios
      .delete(`https://meraki-academy-project-4-boycott-2.onrender.com/comments/search_1/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log("Done");
        //! How to filter
        goToProduct();
      })
      .catch((err) => {
        console.log(id, "deleteComment =>", userStatus);
        console.log("error => ", err);
      });
  };

  //!----------------------deleteCommentFromAdmin
  console.log(productDetails);
  const deleteCommentFromAdmin = (id) => {
    axios
      .delete(`https://meraki-academy-project-4-boycott-2.onrender.com/comments/search_2/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log("Done");
        //! How to filter
        goToProduct();
      })
      .catch((err) => {
        console.log(id, "deleteCommentFromAdmin =>", userStatus);
        console.log("error => ", err);
      });
  };

  //!----------------------updateProduct
  const updateProduct = () => {
    console.log("updateProduct Function");
    if (newOpposite !== "") {
      axios
        .put(`https://meraki-academy-project-4-boycott-2.onrender.com/products/${id}`, newOpposite)
        .then((result) => {
          console.log("Done");
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    }
  };

  //!----------------------useEffect
  useEffect(() => {
    goToProduct();
    getAllProducts();
  }, []);

  const commentVar = { comment, product };
  const newOpposite = { oppositeProduct };

  //!----------------------return of the component
  return (
    <div className="details">
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Item elevation={3}>
              <List sx={{height:"400px"}}>
                <CardMedia 
                  component="img"
                  image={productDetails.productImage}  sx={{height: "100%",objectFit:"cover",width:"100%"}}
                  
                />
              </List>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item elevation={3}>
              <p sx={{textAlign:"left"}}>product name: </p>
              {productDetails.productName}
              <hr/>
              <p>reason: </p>
              {productDetails.reason}
              <hr />
              <Link target="_blank" href={productDetails.link}>
                Link
              </Link>
              <hr/>
              <div>
                {productDetails.isSafeProduct ? (
                <ThumbUpAltIcon />
              ) : (
                <ThumbDownAltIcon />
              )}
              </div>
              <hr/>
              <p>Type: </p>
              {productDetails.categories && productDetails.categories.typeName}
            </Item>
            {!productDetails.isSafeProduct ? <Item elevation={3}>
              <p>opposite product: </p>
              {productDetails.isSafeProduct ? (
                ""
              ) : productDetails.oppositeProduct ? (
                productDetails.oppositeProduct.productName
              ) : userStatus === "admin" ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    opposite
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="opposite"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setOppositeProduct(e.target.value);
                    }}
                  >
                    {productMap.map((name, i) => {
                      if (name.isSafeProduct !== productDetails.isSafeProduct) {
                        return (
                          <MenuItem value={name._id}>
                            {name.productName}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              ) : (
                "opposite not found"
              )}
            </Item>: ""}
            {userStatus === "admin" && (
              <Item elevation={3}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    deleteProduct();
                    console.log("Delete");
                  }}
                >
                  delete
                </Button>
                {!productDetails.oppositeProduct &&
                  !productDetails.isSafeProduct && (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        marginLeft: "10px",
                      }}
                      onClick={() => {
                        updateProduct();
                        console.log("Update");
                        window.location.reload();
                      }}
                    >
                      update
                    </Button>
                  )}
              </Item>
            )}
          </Grid>
          <Grid item xs={12}>
            <Item elevation={3}>
              <TextField
                sx={{ display: "flex" }}
                id="outlined-textarea"
                label="comment..."
                multiline
                onChange={(e) => {
                  setComment(e.target.value);
                  console.log(comment, token);
                }}
              />
              <Button
                className="add"
                sx={{ marginLeft: "10px", marginTop: "1%" }}
                variant="contained"
                size="small"
                onClick={() => {
                  createComment(productDetails._id);
                }}
              >
                Add
              </Button>
              {message ? <div>{message}</div> : ""}
              {productDetails.review &&
                productDetails.review.map((comment, i) => {
                  console.log(comment);
                  return (
                    <>
                      <p>
                        {comment.createdBy.userName} commented:{" "}
                        {comment.comment}{" "}
                        <IconButton aria-label="delete" size="small">
                          <Delete
                            fontSize="inherit"
                            onClick={() => {
                              userStatus === "admin"
                                ? deleteCommentFromAdmin(comment._id)
                                : deleteComment(comment._id);
                            }}
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
