import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../App";
import "./style.css";

//!----------------styled
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: "1%",
  marginLeft: "3%",
  marginRight: "3%",
  marginBottom: "4%",
  backgroundColor: "rgba(193, 233, 186, 0.222)"
}));

const CreateProduct = () => {
  //!----------------useContext
  const { token, userId } = useContext(LoginContext);

  //!----------------useState
  const [warningAlert, setWarningAlert] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [createdBy, setCreatedBy] = useState(userId);
  const [isSafeProduct, setIsSafeProduct] = useState(true);
  const [categories, setCategories] = useState("");
  //image setImage
  const [productImage, setProductImage] = useState("");
  const [url, setUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [reason, setReason] = useState("");
  const [oppositeProduct, setOppositeProduct] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState(false);

  //!----------------goToProduct
  const getCategories = () => {
    axios
      .get(`https://meraki-academy-project-4-boycott-2.onrender.com/categories`)
      .then((result) => {
        setAllCategories(result.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //!----------------createNewProduct
  const createNewProduct = () => {
    if (
      (createdBy,
      isSafeProduct !== null,
      categories,
      productImage,
      productName,
      reason,
      link)
    ) {
      setWarningAlert(false);
      axios
        .post(`https://meraki-academy-project-4-boycott-2.onrender.com/products`, newProduct, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log(result.data);
          setMessage(true);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    } else {
      setWarningAlert(true);
    }
  };

  //!----------------useEffect
  useEffect(() => {
    getCategories();
  }, []);

  //!----------------newProduct
  const newProduct = {
    createdBy,
    isSafeProduct,
    categories,
    productImage: url,
    productName,
    reason,
    link,
  };

  //!----------------uploadImage
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", productImage);
    data.append("upload_preset", "q4e4jqhi");
    data.append("cloud_name", "dc4vljqsd");
    fetch("https://api.cloudinary.com/v1_1/dc4vljqsd/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.url);
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="createProduct">
      <Box>
        <Grid container spacing={0} >
          <Grid item xs={4}>
            <Item elevation={3}>
              <input
                type="file"
                onChange={(e) => setProductImage(e.target.files[0])}
              ></input>
              <button onClick={uploadImage}>Upload</button>
            </Item>
            <Item elevation={3}>
              <FormControlLabel
                required
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(!e.target.checked);
                      setIsSafeProduct(!e.target.checked);
                    }}
                  />
                }
                label="boycott"
              />
            </Item>
            <Item elevation={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="category"
                  onChange={(e) => {
                    setCategories(e.target.value);
                  }}
                >
                  {allCategories.map((type, i) => {
                    return (
                      <MenuItem value={type._id}>{type.typeName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Item>
            {!message && (
              <Button 
                variant="contained"
                size="small"
                sx={{ marginTop: "20px" }}
                onClick={() => {
                  createNewProduct();
                  console.log(
                    " createdBy =>",
                    createdBy,
                    " isSafeProduct =>",
                    isSafeProduct,
                    " categories =>",
                    categories,
                    "productImage =>",
                    productImage,
                    " productName =>",
                    productName,
                    " reason =>",
                    reason,
                    " oppositeProduct =>",
                    oppositeProduct,
                    " link =>",
                    link
                  );
                }}
              >
                Add product
              </Button>
            )}
            {message && (
              <Alert severity="success">
                Product has been added successfully.
              </Alert>
            )}
            {warningAlert && (
              <Alert severity="warning" sx={{ marginTop: "10px" }}>
                This is a warning Alert.
              </Alert>
            )}
          </Grid>
          <Grid item xs={8}>
            <Item elevation={3}>
              <div>
                <TextField
                sx={{margin: "10px"}}
                  id="filled-multiline-flexible"
                  label="product name"
                  multiline
                  maxRows={4}
                  variant="filled"
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                />
                <TextField
                sx={{margin: "10px"}}
                  id="filled-multiline-static"
                  label="reason"
                  multiline
                  rows={8}
                  variant="filled"
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                />
                <TextField
                sx={{margin: "10px"}}
                  id="filled-multiline-static"
                  label="link"
                  multiline
                  rows={8}
                  variant="filled"
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                />
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CreateProduct;
// productName, reason, link, productImage, isSafeProduct, categories, oppositeProduct, createdBy, review
