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
import React, { useEffect, useState } from "react";

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
  //uaeState
  const [categoryType, setCategoryType] = useState("");
  const [allCategories, setAllCategories] = useState([]);

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

  //useEffect
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Item>
              <Button sx={{ height: 400 }} required>
                add Picture
              </Button>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <TextField
                id="outlined-textarea"
                label="product name"
                multiline
                required
              />
            </Item>
            <Item>
              <TextField
                id="outlined-multiline-static"
                label="reason"
                multiline
                rows={4}
                required
              />
            </Item>
            <Item>
              <TextField
                id="outlined-multiline-static"
                label="link"
                multiline
                rows={4}
                required
              />
            </Item>
            <Item>
              <FormControlLabel
                required
                control={
                  <Checkbox
                    onChange={(e) => {
                      console.log(!e.target.checked);
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
                >
                  {allCategories.map((type, i) => {
                    return <MenuItem value={i}>{type.typeName}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CreateProduct;
// productName, reason, link, productImage, isSafeProduct, categories, oppositeProduct, createdBy, review
