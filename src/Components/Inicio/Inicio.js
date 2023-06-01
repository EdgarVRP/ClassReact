import React, { Component } from "react";
import "./Inicio.css";
import imgContent from "../../img/LandingPage/imgContent.png";
import publicationImg from "../../img/LandingPage/catPublic.jpg";

import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { red } from "@mui/material/colors";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";

import { API_URL } from "../../configuracion";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: null,
      publicaciones: null,
    };
  }

  componentDidMount() {
    this.fetchUsuarios();
    this.fetchPublicaciones();
  }

  fetchUsuarios = async () => {
    try {
      const response = await fetch(`${API_URL}/dveritas/usuarios/totalusuarios`);
      const jsonData = await response.json();
      this.setState({ usuarios: jsonData });
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error);
    }
  };

  fetchPublicaciones = async () => {
    try {
      const response = await fetch(`${API_URL}/dveritas/publicaciones/totalpublicaciones`);
      const jsonData = await response.json();
      this.setState({ publicaciones: jsonData });
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error);
    }
  };

  render() {
    const { usuarios, publicaciones } = this.state;

    return (
    <div>

      <Grid
        container
        className="firstSection"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={10}>
          <Typography
            className="latoBold" 
            sx={{
              marginY: { xs: 12, md: 25 },
              color: "#D3E0EA",
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", sm: "5rem", lg: "7rem" },
            }}
          >
            Publica sin temor
          </Typography>
        </Grid>

        <Grid item xs={10} sx={{ marginTop: 5, marginBottom: 10 }}>
          <Link className="buttonInicio" to="/ingresar" underline="none">
            <Button
              variant="contained"
              size="large"
              sx={{
                my: 2,
                color: "#D3E0EA",
                bgcolor: "#1687A7",
                fontSize: { xs: ".8rem", sm: "1.2rem", lg: "2rem" },
                "&:hover": { bgcolor: "#125E75" },
              }}
            >
              Ingresar
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginY: 5,
        }}
      >

        <Grid item xs={10} sx={{ marginTop: { xs: 3, sm: 5, lg: 7 } }}>
          <Typography
            className="latoBold" 
            sx={{
              color: "#276678",
              fontWeight: "bold",
              fontSize: { xs: "2rem", sm: "2.5rem", lg: "3rem" },
            }}
          >
            ¿Qué es D'Veritas?
          </Typography>
        </Grid>
        <Grid
          item
          xs={10}
          md={5}
          lg={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography
            className="lato" 
            sx={{
              textAlign: "justify",
              p: { xs: 1, sm: 3 },
              fontSize: { xs: "1.2rem", sm: "1.5rem", lg: "1.8rem" },
              marginY: { xs: 2 },
            }}
          >
            Una red social que permite a sus usuarios hacer publicaciones y
            comentarios de manera anónima, ¿Tienes una idea? Pública sin temor.
            Encontrarás gente que quiera compartir ideas contigo.
          </Typography>
        </Grid>
        <Grid item xs={12} md={5} sx={{ marginY: { xs: 5, lg: 8 } }}>
          <img
            id="img"
            className="imgContent"
            src={imgContent}
            alt="Imagen Contenido"
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          margin: "0 auto",
          bgcolor: "#D3E0EA",
        }}
      >

        <Grid item xs={12} sx={{ p: 1 }}>
          <Typography
            className="latoBold" 
            sx={{
              fontWeight: "bold",
              marginTop: "50px",
              color: "#276678",
              fontSize: { xs: "2rem", sm: "2.5rem", lg: "3rem" },
            }}
          >
            Nuestra comunidad
          </Typography>
        </Grid>

        <Grid item xs={10} sx={{ p: 1 }}>
          <Typography
            className="lato" 
            sx={{
              textAlign: "justify",
              p: { xs: 1, sm: 5 },
              fontSize: { xs: "1.2rem", sm: "1.5rem", lg: "1.8rem" },
            }}
          >
            Una comunidad que crece día a día permitiendo a sus usuarios
            comentar sus ideas más abtractas sin prejuicios.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={1}
        justifyContent="center"
        sx={{ paddingY: 4, textAlign: "center", bgcolor: "#D3E0EA" }}
      >
        <Grid item xs={10} md={5}>
          <Typography
            className="latoBold" 
            sx={{
              color: "#276678",
              fontSize: { xs: "1.2rem", sm: "1.6rem", lg: "1.8rem" },
            }}
          >
          +{usuarios} <br /> 
            USUARIOS
          </Typography>
        </Grid>

        <Grid item xs={10} md={5}>
          <Typography
            className="latoBold" 
            sx={{
              color: "#276678",
              marginTop: { xs: 5, md: 0 },
              fontSize: { xs: "1.2rem", sm: "1.6rem", lg: "1.8rem" },
            }}
          >
           +{publicaciones} <br /> 
            PUBLICACIONES
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowSpacing={1}
        sx={{ paddingY: 3, bgcolor: "#D3E0EA" }}
      >

        <Grid
          item
          sm={10}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              maxWidth: { xs: "95%", sm: "80%", md: "60%" },
              margin: "auto",
              borderRadius: "15px",
              my: "20px",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/603.jpg"
                />
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="royThompson"
              subheader="22/03/2023" 
            />
            <Divider />

            <CardMedia
              component="img"
              image={publicationImg}
              alt="Cat"
            />
            <Divider />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                My cat is so beautiful
              </Typography>
            </CardContent>

      
            <Divider />

            <CardActions disableSpacing>
              
              <Button
                aria-label="add to favorites"
                startIcon={<FavoriteIcon />}
              >
                6
              </Button>

              <Button
                aria-label="add to favorites"
                startIcon={<ChatIcon />}
                sx={{ marginLeft: "auto" }}
              >
                1
              </Button>
            </CardActions>
          </Card>

        </Grid>

        <Grid
          item
          sm={10}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignContent: "center",
          }}
        >
          <Card
            sx={{
              maxWidth: { xs: "95%", sm: "100%", md: "100%" },
              margin: "auto",
              borderRadius: "15px",
              my: "20px",
            }}
          >
        
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src="" />
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="anon233"
              subheader="06/03/2023" 
            />
            <Divider />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Fin de semana de ir al cine, ¿Ustedes qué planes tienen? ¿Qué peliculas recomiendan?
              </Typography>
            </CardContent>

            <Divider />
            <CardActions disableSpacing>
              <Button
                aria-label="add to favorites"
                startIcon={<FavoriteIcon />}
              >
                2
              </Button>

              <Button
                aria-label="add to favorites"
                startIcon={<ChatIcon />}
                sx={{ marginLeft: "auto" }}
              >
                10
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              maxWidth: { xs: "95%", sm: "100%", md: "100%" },
              margin: "auto",
              borderRadius: "15px",
              my: "20px",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/712.jpg"
                />
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="dWindler"
              subheader="22/02/2023" 
            />
            <Divider />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                ¿Quién es su personaje favorito de Harry Potter? El mío siempre
                será Severus Snape.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions disableSpacing>
              <Button
                aria-label="add to favorites"
                startIcon={<FavoriteIcon />}
              >
                20
              </Button>
            <Button
                aria-label="add to favorites"
                startIcon={<ChatIcon />}
                sx={{ marginLeft: "auto" }}
              >
                3
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
}
export default LandingPage;
