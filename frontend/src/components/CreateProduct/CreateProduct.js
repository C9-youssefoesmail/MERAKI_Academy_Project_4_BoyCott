import { Height } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, styled } from "@mui/material";
import React, { useState } from "react";

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
  const [accept, setAccept] = useState(false)

  return (
    <div>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Item>
              <Button sx={{ height: 400 }} required>add Picture</Button>
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
            <FormControlLabel required control={<Checkbox onChange={(e)=>{console.log(!e.target.checked);}} />} label="boycott" />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item></Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CreateProduct;
// productName, reason, link, productImage, isSafeProduct, categories, oppositeProduct, createdBy, review
