import React, { Component } from 'react';
import './Login.css';
import { Grid, Box, Typography, TextField, Button, Modal } from "@mui/material";
import { API_URL } from '../../configuracion';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      credentialsError: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/dveritas/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === true) {
          console.log('Login successful');
          fetch(`${API_URL}/dveritas/login/${this.state.email}`)
            .then(response => response.json())
            .then(data => {
              console.log(data)
              const id = "id";
              sessionStorage.setItem(id, JSON.stringify(data));
              setTimeout(() => {
                this.props.history.push('/perfil');
                window.location.reload();
              }, 50);
            })
        } else {
          this.setState({ credentialsError: true });
          console.log('Login failed');
        }
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }

  handleClose = () => {
    this.setState({ credentialsError: false });
  };

  componentDidMount() {
    if (sessionStorage.getItem('id')) {
      console.log('Ya estas logeado');
      setTimeout(() => {
        this.props.history.push('/perfil');
      }, 50);
    }
  }

  render() {
    return (
      <div className="my-componentLogin">
        <Grid container sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
          <Grid item xs={10} sm={8} md={4} >
            <form onSubmit={this.handleSubmit}>
              <Box className="animatedLogin"
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
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: '1rem',
                    marginBottom: '4rem',
                    color: '#276678',
                    fontFamily: 'Lato',
                    fontSize: { xs: '2.5rem', sm: '3rem' },
                    textAlign: 'center'
                  }}
                >
                  ¿Estas listo para ingresar al Anonimato?
                </Typography>
                <TextField
                  required
                  id="outlined-email"
                  label="Correo electronico"
                  type="email"
                  variant="outlined"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  sx={{ fontFamily: "Lato, sans-serif", mb: 5, width: "100%" }}
                />
                <TextField
                  required
                  id="outlined-password"
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  sx={{ fontFamily: "Lato, sans-serif", mb: 4, width: "100%" }}
                />
                <Button
                  variant="contained"
                  id="botonlogin"
                  type="submit"
                  sx={{ marginTop: '3rem', width: "100%", height: '40px', fontFamily: 'lato', color: '#D3E0EA', bgcolor: '#1687A7', '&:hover': { bgcolor: '#125E75' }, }}>
                  Iniciar Sesión
                </Button>
                <Modal open={this.state.credentialsError} onClose={this.handleClose}>
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
                    <Typography variant="h6" sx={{ fontFamily: "Lato, sans-serif", color: "#276678", textAlign: 'center' }}>El correo o la contraseña son incorrectos</Typography>
                    <Typography variant="body1" sx={{ fontFamily: "Lato, sans-serif", textAlign: 'center' }}>
                      Por favor vuelve a intentarlo
                    </Typography>
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

export default Login;
