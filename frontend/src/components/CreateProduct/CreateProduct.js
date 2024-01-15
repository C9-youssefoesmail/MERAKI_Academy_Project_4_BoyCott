import {
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

const CreateProduct = () => {
  
  //useContext
  const { token, userId } = useContext(LoginContext);

  //uaeState
  const [allCategories, setAllCategories] = useState([]);
  const [createdBy, setCreatedBy] = useState(userId)
  const [isSafeProduct, setIsSafeProduct] = useState(true)
  const [categories, setCategories] = useState("");
  //image setImage
  const [productImage,setProductImage] = useState("")
  const [url, setUrl] = useState("")
  const [productName,setProductName] = useState("")
  const [reason, setReason] = useState("")
  const [oppositeProduct, setOppositeProduct] = useState("")
  const [link, setLink] = useState("")

  //tot ==> q4e4jqhi
  //goToProduct
  const getCategories = () => {
    axios
      .get(`http://localhost:5000/categories`)
      .then((result) => {
        setAllCategories(result.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //createNewProduct
  const createNewProduct = () => {
    if(createdBy, isSafeProduct !== null, categories, productImage, productName, reason, link){
      axios
        .post(`http://localhost:5000/products`, newProduct, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
    else
    {
      console.log("something is missed");
    }
  }

  //useEffect
  useEffect(() => {
    getCategories();
  }, []);

  const newProduct = {createdBy, isSafeProduct, categories, productImage, productName, reason, link}

  const uploadImage = () => {
    const data = new FormData()
  data.append("file", productImage)
  data.append("upload_preset", "q4e4jqhi")
  data.append("cloud_name","dc4vljqsd")
  fetch("https://api.cloudinary.com/v1_1/dc4vljqsd/productImage/upload",{
    method: "post",
    body: data
  }).then(resp => resp.json())
  .then(data => {
    setUrl(data.url)
  })
  .catch(err => console.log(err))
  }
  

  return (
    <div>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Item>
            <input type="file" onChange={(e)=>setProductImage(e.target.files[0])}></input>
            <button onClick={uploadImage}>Upload</button>
            </Item>
            <Item>
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
            <Item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="category"
                  onChange={(e)=>{setCategories(e.target.value)}}
                >
                  {allCategories.map((type, i) => {
                    return <MenuItem value={type._id}>{type.typeName}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Item>
            <Button
                onClick={() => {
                  createNewProduct()
                  console.log(" createdBy =>",createdBy," isSafeProduct =>", isSafeProduct," categories =>",categories , "productImage =>", productImage , " productName =>" , productName , " reason =>", reason, " oppositeProduct =>", oppositeProduct, " link =>",link)
                }}
              >
                Add
              </Button>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <TextField
                id="outlined-textarea"
                label="product name"
                multiline
                required
                onChange={(e)=>{setProductName(e.target.value)}}
              />
            </Item>
            <Item>
              <TextField
                id="outlined-multiline-static"
                label="reason"
                multiline
                rows={4}
                required
                onChange={(e)=>{setReason(e.target.value)}}
              />
            </Item>
            <Item>
              <TextField
                id="outlined-multiline-static"
                label="link"
                multiline
                rows={4}
                required
                onChange={(e)=>{setLink(e.target.value)}}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CreateProduct;
// productName, reason, link, productImage, isSafeProduct, categories, oppositeProduct, createdBy, review
