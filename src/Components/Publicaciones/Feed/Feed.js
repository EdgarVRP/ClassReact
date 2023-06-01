import React, { Component } from "react";

import { API_URL } from "../../../configuracion";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Grid, TextField, Stack, Divider } from "@mui/material";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Chip from "@mui/material/Chip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { sx: "100%" },
  bgcolor: "background.paper",
  border: "2px solid #276678",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioActual: null,
      liked: false,
      comentario: "",
      open: false,
    };
  }

  componentDidMount() {
    this.setState({
      usuarioActual: sessionStorage.getItem("id"),
    });
  }

  handleLike = () => {
    const { usuarioActual, liked } = this.state;
    if (usuarioActual) {
      this.setState({ liked: !liked });
    }
  };

  handleDelete = () => {
    fetch(`${API_URL}/dveritas/publicaciones/${this.props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 50);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log({ comentario: this.state.comentario });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      usuarioActual,
      liked,
      comentario,
      open,
    } = this.state;

    const fecha = new Date();
    const dia = fecha.getDate(this.props.fecha_publicacion).toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();
    const hora = fecha.getHours().toString().padStart(2, "0");
    const minuto = fecha.getMinutes().toString().padStart(2, "0");
    const segundo = fecha.getSeconds().toString().padStart(2, "0");
    const fechaFormateada = `${dia}/${mes}/${anio} a las ${hora}:${minuto}:${segundo}`;

    return (
      <div>
        <Card
          sx={{
            maxWidth: { xs: "300px", sm: "80%", md: "60%" },
            margin: "auto",
            borderRadius: "15px",
            my: "20px",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                src={this.props.usuario.avatar}
              />
            }
            action={
              usuarioActual === this.props.usuario.id ? (
                <IconButton aria-label="settings" onClick={this.handleDelete}>
                  <HighlightOffIcon />
                </IconButton>
              ) : null
            }
            title={this.props.usuario.nombre}
            subheader={fechaFormateada}
          />
          <Divider />
          {this.props.imagen != null ? (
            <CardMedia
              component="img"
              image={this.props.imagen}
              alt="Paella dish"
            />
          ) : null}
          <Divider />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {this.props.descripcion}
            </Typography>
          </CardContent>
          <Divider />
          <CardActions disableSpacing>
            <Button aria-label="add to favorites" onClick={this.handleLike}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
            <Button
              aria-label="add to favorites"
              onClick={this.handleOpen}
              startIcon={<ChatIcon />}
              sx={{ marginLeft: "auto" }}
            ></Button>
          </CardActions>
          <Modal
            open={open}
            onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <List
                id="outlined-comentarios"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 300,
                  "& ul": { padding: 0 },
                }}
                subheader={<li />}
              >
                {[0, 1, 2, 3, 4].map((sectionId) => (
                  <li key={sectionId}>
                    <ul>
                      <Box>
                        <ListSubheader
                          sx={{ translate: "0px -5px", scrollBehavior: "smooth" }}
                        >
                          <Divider>
                            <Chip
                              label="Usuaiario Manolito"
                              sx={{ color: "#276678", borderColor: "#276678" }}
                              variant="outlined"
                            />
                          </Divider>
                        </ListSubheader>
                        <ListItem key={sectionId}>
                          <ListItemText
                            primary={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
                          />
                        </ListItem>
                      </Box>
                    </ul>
                  </li>
                ))}
              </List>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Grid
                  item
                  xs={12}
                  md={8}
                  sx={{
                    marginTop: "1rem",
                    marginBottom: "-1rem",
                    display: "flex",
                  }}
                >
                  {usuarioActual ? (
                    <form onSubmit={this.handleSubmit}>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: { xs: "300px", sm: "550px" },
                        }}
                      >
                        <TextField
                          fullWidth
                          id="outlined-textarea"
                          label="Comenta algo"
                          placeholder="Escribe lo que piensas..."
                          multiline
                          value={comentario}
                          inputProps={{
                            maxLength: 280,
                          }}
                          onChange={(e) => this.setComentario(e.target.value)}
                          sx={{ fontFamily: "Lato, sans-serif", mb: 1 }}
                        />
                        <Stack direction="row" alignItems="center" spacing={18}>
                          <Button
                            variant="contained"
                            type="submit"
                            sx={{
                              fontFamily: "Lato, sans-serif",
                              bgcolor: "#1687A7",
                              "&:hover": {
                                bgcolor: "#125E75",
                              },
                            }}
                          >
                            Publicar
                          </Button>
                        </Stack>
                      </Box>
                    </form>
                  ) : null}
                </Grid>
              </div>
            </Box>
          </Modal>
        </Card>
      </div>
    );
  }
}

export default Feed;
