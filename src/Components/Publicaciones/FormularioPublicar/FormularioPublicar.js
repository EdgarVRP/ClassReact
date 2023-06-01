import React, { Component } from "react";
import { API_URL } from '../../../configuracion';

/* Imporaciones de componentes de Material UI */
import { Grid, Box, TextField, Button, IconButton, Stack } from "@mui/material";

import PhotoCamera from '@mui/icons-material/PhotoCamera';


/* Creacion del componete de formulario para las publicaciones */
class FormnularioPublicar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioActual: null,
      publicacion: "",
      imagen: null,
    };
  }

  componentDidMount() {
    this.setState({ usuarioActual: sessionStorage.getItem("id") });
  }

  handleChange = (event) => {
    const fileName = event.target.files[0].name;
    this.setState({ imagen: fileName });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { publicacion, imagen, usuarioActual } = this.state;
    console.log({ publicacion, imagen, usuarioActual });
    fetch(`${API_URL}/dveritas/publicaciones/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        descripcion: publicacion,
        imagen: imagen,
        usuario: { id: usuarioActual }
      })
    })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 50);
      });
  }

  render() {
    const { publicacion, imagen } = this.state;

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={8} sx={{ marginTop: "1rem", marginBottom: "-1rem", display: "flex" }}>
          <form onSubmit={this.handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: { xs: "300px", sm: "550px" } }}>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Crea una nueva publicación..."
                placeholder="Escribe lo que piensas..."
                multiline
                value={publicacion}
                inputProps={{
                  maxLength: 280,
                }}
                onChange={(e) => this.setState({ publicacion: e.target.value })}
                sx={{ fontFamily: "Lato, sans-serif", mb: 1 }}
              />
              <Stack direction="row" alignItems="center" spacing={18}>
                <IconButton sx={{ color: "#1687A7", '&:hover': { color: '#125E75' } }} aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" onChange={this.handleChange} />
                  <PhotoCamera />
                  <p>{imagen}</p>
                </IconButton>
                <Button variant="contained" type="submit" sx={{
                  fontFamily: "Lato, sans-serif",
                  bgcolor: '#1687A7',
                  '&:hover': {
                    bgcolor: '#125E75',
                  },
                }}>
                  Publicar
                </Button>
              </Stack>
            </Box>
          </form>
        </Grid>
      </div>
    );
  }
}

export default FormnularioPublicar;
