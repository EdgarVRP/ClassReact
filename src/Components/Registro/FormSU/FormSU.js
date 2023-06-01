import React, { Component } from 'react';
import { Grid, Box, Typography, TextField, Button, Checkbox, FormControlLabel, Modal } from "@mui/material";
import './FormSU.css';
import terminos from './images/Terminos_condiciones_dveritas.pdf';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../../configuracion";

class FormSU extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      isChecked: false,
      isFormValid: false,
      passwordError: false,
      errorMessage: "",
      showModal: false,
      usuarioActual: null
    };
  }

  componentDidMount() {
    const usuarioActual = sessionStorage.getItem("id");
    this.setState({ usuarioActual });
  }

  componentDidUpdate(prevProps, prevState) {
    const { email, username, password, isChecked } = this.state;

    if (
      email !== prevState.email ||
      username !== prevState.username ||
      password !== prevState.password ||
      isChecked !== prevState.isChecked
    ) {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const isFormValid = email !== '' && username !== '' && password !== '' && isChecked && emailRegex.test(email);
      this.setState({ isFormValid });
    }

    if (this.state.usuarioActual) {
      console.log('Ya estás logeado');
      setTimeout(() => {
        const navigate = useNavigate();
        navigate('/perfil');
      }, 50);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, password } = this.state;

    const usuario = {
      nombre: username,
      correo: email,
      password: password,
      avatar: "https://cdn-icons-png.flaticon.com/512/1534/1534082.png"
    };

    if (password.length >= 8) {
      try {
        const response = await fetch(`${API_URL}/dveritas/usuarios/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(usuario)
        });
        const data = await response.json();
        const isOk = response.ok;

        if (isOk) {
          console.log(data.mensaje);

          fetch(`${API_URL}/dveritas/login/${usuario.correo}`)
            .then(response => response.json())
            .then(data => {
              console.log(data);

              const id = "id";
              sessionStorage.setItem(id, JSON.stringify(data));
              setTimeout(() => {
                const navigate = useNavigate();
                navigate('/perfil');
                window.location.reload();
              }, 50);
            });
        } else {
          this.setState({ errorMessage: data.mensaje, showModal: true });
          console.log(data.mensaje);
        }
      } catch (error) {
        console.error("No pudimos guardar el usuario", error);
      }
    } else {
      this.setState({ passwordError: true });
    }
  };

  handleClose = () => {
    this.setState({ passwordError: false });
  };

  handleCloseVal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { email, username, password, isChecked, isFormValid, passwordError, showModal, errorMessage } = this.state;

    return (
      <div className="my-component">
        <Grid container className="containerForm">
          <Grid item className="gridForm" xs={10} md={6} lg={5}>
            <form onSubmit={this.handleSubmit} className="only-formulary">
              <Box
                className="animated"
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
                autoComplete="off"
              >
                <Typography className="tittleForm" variant="h5">
                  ¡Únete y libera tus pensamientos sin temor a ser juzgado!
                </Typography>
                <TextField
                  id="correo"
                  className="textField"
                  label="Correo electrónico"
                  variant="outlined"
                  type="email"
                  value={email}
                  helperText="No te preocupes esto sera anonimo"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <TextField
                  className="textField"
                  label="Nombre de usuario"
                  variant="outlined"
                  type="text"
                  value={username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
                <TextField
                  className="textField"
                  label="Contraseña (minimo 8 caracteres)"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <FormControlLabel
                  control={<Checkbox checked={isChecked} onChange={() => this.setState({ isChecked: !isChecked })} />}
                  label={
                    <Typography component='a' href={terminos} target="_blank">
                      Acepto los términos y condiciones
                    </Typography>
                  }
                  sx={{ fontFamily: "Lato, sans-serif", mb: 3 }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!isFormValid}
                  sx={{
                    marginTop: '3rem',
                    width: "100%",
                    height: '40px',
                    fontFamily: 'lato',
                    color: '#D3E0EA',
                    bgcolor: '#1687A7',
                    '&:hover': { bgcolor: '#125E75' },
                  }}
                >
                  Registrarme
                </Button>
                <Modal open={passwordError} onClose={this.handleClose}>
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
                    <Typography variant="h6" sx={{ fontFamily: "Lato, sans-serif", color: "#276678", textAlign: 'center' }}>Contraseña invalida</Typography>
                    <Typography variant="body1" sx={{ fontFamily: "Lato, sans-serif", textAlign: 'center' }}>
                      Asegúrese de que la contraseña tenga una longitud mínima de 8 caracteres.
                    </Typography>
                  </Box>
                </Modal>

                <Modal open={showModal} onClose={this.handleCloseVal}>
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
                    <Typography variant="h6" sx={{ fontFamily: "Lato, sans-serif", color: "#276678", textAlign: 'center' }}>{errorMessage}</Typography>
                  </Box>
                </Modal>
              </Box>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default FormSU;
