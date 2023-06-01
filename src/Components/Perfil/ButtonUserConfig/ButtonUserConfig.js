import React, { Component } from "react";
import { Box, Button, Modal, Typography, TextField, Grid } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import './ButtonUserConfig.css';
import { API_URL } from "../../../configuracion";

class ButtonUserConfig extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: "",
      email: "",
      password: "",
      selectedFile: null,
      selectedFileName: "",
      isNameValid: false,
      isPasswordValid: false,
      isEmailValid: false,
      errorMessage: "",
      showModal: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSaveName = async () => {
    const { name } = this.state;

    const usuarioName = {
      nombre: name
    };

    const id = sessionStorage.getItem("id");

    try {
      const response = await fetch(`${API_URL}/dveritas/usuarios/${id}?nombre=${usuarioName.nombre}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioName)
      });
      const isOk = response.ok;
      if (isOk) {
        console.log("Cambios realizados correctamente");
        this.setState({
          errorMessage: "Cambios realizados correctamente",
          showModal: true,
          name: ""
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.setState({ errorMessage: "Error intente de nuevo", showModal: true });
      }
    } catch (error) {
      console.error("Error intente de nuevo", error);
      this.setState({ errorMessage: "Error intente de nuevo", showModal: true });
    }
  };

  handleSaveEmail = async () => {
    const { email } = this.state;

    const usuarioEmail = {
      correo: email
    };

    const id = sessionStorage.getItem("id");

    try {
      const response = await fetch(`${API_URL}/dveritas/usuarios/${id}?correo=${usuarioEmail.correo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioEmail)
      });
      const isOk = response.ok;
      if (isOk) {
        console.log("Cambios realizados correctamente");
        this.setState({
          errorMessage: "Cambios realizados correctamente",
          showModal: true,
          name: ""
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.setState({ errorMessage: "Error intente de nuevo", showModal: true });
      }
    } catch (error) {
      console.error("Error intente de nuevo", error);
      this.setState({ errorMessage: "Error intente de nuevo", showModal: true });
    }
  };

  handleSavePassword = async () => {
    const { password } = this.state;

    const usuarioPassword = {
      password: password
    };

    const id = sessionStorage.getItem("id");

    try {
      const response = await fetch(`${API_URL}/dveritas/usuarios/${id}?password=${usuarioPassword.password}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioPassword)
      });
      const isOk = response.ok;
      if (isOk) {
        console.log("Cambios realizados correctamente");
        this.setState({
          errorMessage: "Cambios realizados correctamente",
          showModal: true,
          name: ""
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.setState({ errorMessage: "Error intente de nuevo", showModal: true });
      }
    } catch (error) {
      console.error("Error intente de nuevo", error);
      this.setState({ errorMessage: "Error intente de nuevo", showModal: true });
    }
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file, selectedFileName: file.name });
  };

  handleUploadClick = () => {
    console.log(this.state.selectedFile);
  };

  componentDidMount() {
    this.validateName();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      this.validateName();
    }
  }

  validateName = () => {
    const { name } = this.state;
    const isNameValid = name !== "";
    this.setState({ isNameValid });
  };

  render() {
    const {
      open,
      name,
      email,
      password,
      selectedFile,
      selectedFileName,
      isNameValid,
      isEmailValid,
      isPasswordValid,
      errorMessage,
      showModal
    } = this.state;

    return (
      <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
        <Button variant="outlined" onClick={this.handleOpen} endIcon={<EditRoundedIcon />} sx={{ fontFamily: "Lato, sans-serif", color: "#276678" }}>
          Editar perfil
        </Button>
        <Modal open={open} onClose={this.handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: "400px",
              maxWidth: "100%",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontFamily: "Lato, sans-serif", color: "#276678" }}>
              Personaliza tu perfil...
            </Typography>
            <form>
              <TextField
                className="textField"
                id="name"
                type="text"
                label="Nuevo nombre de usuario"
                variant="outlined"
                margin="dense"
                value={name}
                onChange={(event) => this.setState({ name: event.target.value })}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Button variant="contained" onClick={this.handleSaveName} disabled={!isNameValid} sx={{ fontFamily: 'lato', color: '#D3E0EA', bgcolor: '#1687A7', '&:hover': { bgcolor: '#125E75' } }}>
                      Enviar
                    </Button>
                  ),
                }}
              />
              <TextField
                className="textField"
                id="email"
                type="email"
                label="Nuevo correo electrónico"
                variant="outlined"
                margin="dense"
                value={email}
                onChange={(event) => this.setState({ email: event.target.value })}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Button variant="contained" onClick={this.handleSaveEmail} disabled={!isEmailValid} sx={{ fontFamily: 'lato', color: '#D3E0EA', bgcolor: '#1687A7', '&:hover': { bgcolor: '#125E75' } }}>
                      Enviar
                    </Button>
                  ),
                }}
              />
              <TextField
                className="textField"
                id="contraseña"
                type="password"
                label="Nueva contraseña"
                variant="outlined"
                margin="dense"
                value={password}
                onChange={(event) => this.setState({ password: event.target.value })}
                InputProps={{
                  endAdornment: (
                    <Button variant="contained" onClick={this.handleSavePassword} disabled={!isPasswordValid} sx={{ fontFamily: 'lato', color: '#D3E0EA', bgcolor: '#1687A7', '&:hover': { bgcolor: '#125E75' } }}>
                      Enviar
                    </Button>
                  ),
                }}
              />

              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-photo"
                type="file"
                onChange={this.handleFileChange}
              />

              <label htmlFor="upload-photo">
                <Button variant="text" color="primary" component="span" sx={{ color: '#125E75' }}>
                  Selecciona una nueva imagen
                </Button>
              </label>
              <Button variant="contained" onClick={this.handleUploadClick} sx={{ fontFamily: 'lato', color: '#D3E0EA', bgcolor: '#1687A7', '&:hover': { bgcolor: '#125E75' }, marginLeft: '30px' }} disabled={!selectedFile}>
                Enviar
              </Button>
              {selectedFileName && (
                <Typography
                  variant="subtitle1"
                  style={{ color: 'gray', fontSize: '0.7rem' }}
                >
                  {selectedFileName}
                </Typography>
              )}

              <Box sx={{ display: "flex", mt: 3, justifyContent: 'space-between' }}>
                <Button variant="contained" onClick={this.handleClose} sx={{ fontFamily: 'lato', color: '#D3E0EA', bgcolor: '#1687A7', '&:hover': { bgcolor: '#125E75' } }}>
                  Borrar Usuario
                </Button>
                <Button onClick={this.handleClose} sx={{ mr: 2, color: '#125E75' }}>
                  Cancelar
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
        <Modal open={showModal} onClose={this.handleCloseVal}>
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: "400px",
            maxWidth: "100%",
          }}>
            <Typography variant="h6" sx={{ fontFamily: "Lato, sans-serif", color: "#276678", textAlign: 'center' }}>{errorMessage}</Typography>
          </Box>
        </Modal>
      </Grid>
    );
  }
}

export default ButtonUserConfig;
