import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { InputAdornment } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./Contact.css";
import { API_URL } from '../../configuracion';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nombre: "",
      email: "",
      mensaje: "",
      errorMail: false,
      asunto: "",
      comentario: "",
      isFormValid: true,
      modalMessage: ""
    };
  }

  componentDidMount() {
    const { email, asunto, comentario, errorMail } = this.state;
    this.setState({
      isFormValid: email !== '' && asunto !== '' && comentario !== '' && errorMail === false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = `${API_URL}/dveritas/contactos/`;

    const postContacto = async (contacto) => {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contacto)
      });

      if (!response.ok) {
        throw new Error('Error al crear el contacto');
      }
    }

    const { nombre, email, asunto, comentario } = this.state;
    const newContacto = {
      nombre: nombre,
      correo: email,
      asunto: asunto,
      comentario: comentario
    };

    postContacto(newContacto)
      .then(() => {
        this.setState({ modalMessage: 'Contacto creado correctamente', open: true });
        setTimeout(() => {
          window.location.replace('');
        }, 1000);
      })
      .catch(error => console.error(error));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, nombre, email, asunto, comentario, errorMail, isFormValid, modalMessage } = this.state;
    const buttonDisabled = !isFormValid;

    return (
      <div className="formulary-contactus">
        <Grid container sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
          <Grid item xs={10} sm={8} md={8} lg={4}>
            <form onSubmit={this.handleSubmit} className="only-formulary">
              <Box className="animated"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "fit-content",
                  bgcolor: "#F2F2F2",
                  borderRadius: "20px",
                  border: "4px solid #276678",
                  padding: "32px",
                  maxWidth: "100%",
                  margin: "0 auto",
                }}
                noValidate
                autoComplete="off">
                <Typography
                  variant="h5"
                  sx={{
                    marginBottom: '2rem',
                    color: '#276678',
                    fontFamily: 'Lato',
                    fontSize: { xs: '2.5rem', sm: '3rem' },
                    textAlign: 'center'
                  }}>
                  ¡Contáctanos!
                </Typography>
                <Typography sx={{
                  marginBottom: '2rem',
                  fontFamily: 'Lato',
                  fontSize: { xs: '1rem', sm: '1rem' },
                  textAlign: 'center'
                }}>
                  Comparte tus comentarios o sugerencias al equipo de JavaWizard, recuerda que toda la información será guardada de manera anónima
                </Typography>
                <TextField
                  id="outlined-name"
                  label="Nombre"
                  placeholder="Ingresar tu nombre es opcional"
                  variant="outlined"
                  value={nombre}
                  onChange={(e) => this.setState({ nombre: e.target.value })}
                  sx={{ fontFamily: "Lato, sans-serif", mb: 5, width: "100%" }}
                />
                <TextField
                  required
                  error={errorMail}
                  helperText={this.state.mensaje}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  id="outlined-email"
                  label="Correo electronico"
                  type="email"
                  variant="outlined"
                  value={email}
                  sx={{ fontFamily: "Lato, sans-serif", mb: 5, width: "100%" }}
                />
                <TextField
                  required
                  id="outlined-asunto"
                  label="Asunto"
                  variant="outlined"
                  value={asunto}
                  onChange={(e) => this.setState({ asunto: e.target.value })}
                  sx={{ fontFamily: "Lato, sans-serif", mb: 4, width: "100%" }}
                />
                <TextField
                  required
                  rowsmax={3} rows={3}
                  id="outlined-comentarios"
                  label="Comentarios"
                  placeholder="Todo tus comentarios serán almacenados de forma anónima"
                  multiline
                  value={comentario}
                  onChange={(e) => this.setState({ comentario: e.target.value })}
                  sx={{ fontFamily: "Lato, sans-serif", bm: 4, width: "100%" }}
                  inputProps={{ maxLength: 700 }}
                />
                <InputAdornment position="end" id="numerito">
                  {comentario.length}/{700}
                </InputAdornment>
                <Button
                  variant="contained"
                  id="boton"
                  type="submit"
                  disabled={buttonDisabled}
                  sx={{
                    marginTop: "3rem",
                    width: "100%",
                    height: "40px",
                    fontFamily: "lato",
                    color: "#D3E0EA",
                    bgcolor: "#1687A7",
                    "&:hover": { bgcolor: "#125E75" },
                  }}
                  onClick={this.handleSubmit}>
                  Enviar
                </Button>
                <Dialog open={open} onClose={this.handleClose}>
                  <DialogTitle>¡Muchas gracias por tus comentarios {nombre}!</DialogTitle>
                  <DialogContent>
                    Apreciamos mucho tu interes en nuestra aplicacion
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose}>Cerrar</Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Contact;
