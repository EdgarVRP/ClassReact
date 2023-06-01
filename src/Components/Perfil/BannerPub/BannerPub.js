import React from "react";
import { Box, Typography, Grid } from "@mui/material";

class BannerPub extends React.Component {
  render() {
    return (
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Box
            sx={{
              backgroundColor: "#276678",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Lato, sans-serif",
                color: "#fff",
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              Mis publicaciones
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default BannerPub;



