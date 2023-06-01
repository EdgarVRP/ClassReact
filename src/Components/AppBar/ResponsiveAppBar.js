import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

import './ResponsiveAppBar.css';

class ResponsiveAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElNav: null,
      usuarioActual: null,
    };
  }

  componentDidMount() {
    const usuarioActual = sessionStorage.getItem("id");
    this.setState({ usuarioActual });
  }

  deleteStorage() {
    sessionStorage.removeItem("id");
    this.setState({ usuarioActual: null });
  }

  handleOpenNavMenu(event) {
    this.setState({ anchorElNav: event.currentTarget });
  }

  handleCloseNavMenu() {
    this.setState({ anchorElNav: null });
  }

  render() {
    const { anchorElNav, usuarioActual } = this.state;

    return (
      <AppBar position="static" sx={{ bgcolor: "#276678"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: "#D3E0EA",
                textDecoration: 'none',
              }}
            >
              D´Veritas
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => this.handleOpenNavMenu()}
                sx={{ color: "#D3E0EA" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={() => this.handleCloseNavMenu()}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={() => this.handleCloseNavMenu()}>
                  <Link to="/" className='link-decoration'>
                    <Typography textAlign="center" sx={{ color:"black" }}>Inicio</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => this.handleCloseNavMenu()}>
                  <Link to="/publicaciones" className='link-decoration'>
                    <Typography textAlign="center" sx={{ color:"black" }}>Publicaciones</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => this.handleCloseNavMenu()}>
                  <Link to="/nosotros" className='link-decoration'>
                    <Typography textAlign="center" sx={{ color:"black" }}>Nosotros</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => this.handleCloseNavMenu()}>
                  <Link to="/contacto" className='link-decoration'>
                    <Typography textAlign="center"  sx={{ color:"black" }}>Contacto</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => this.handleCloseNavMenu()}>
                  {!usuarioActual 
                    ? <Link to="/registrar" className='link-decoration'>
                        <Typography textAlign="center" className='link-decoration'>Registrarse</Typography>
                      </Link>
                    : <Link to="/perfil" className='link-decoration'>
                        <Typography textAlign="center" className='link-decoration'>Perfil</Typography>
                      </Link>
                  }
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'none', sm: 'flex', md:'none'},
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: "#D3E0EA",
                textDecoration: 'none',
              }}
            >
              D´Veritas
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, color: "#D3E0EA" }}>
              <Link to="/" className='link-decoration'>
                <Button sx={{ my: 2, color: "#D3E0EA", display: 'block'}}>
                  Inicio
                </Button>
              </Link>

              <Link to="/publicaciones" className='link-decoration'>
                <Button sx={{ my: 2, color: "#D3E0EA", display: 'block' }}>
                  Publicaciones
                </Button>
              </Link>

              <Link to="/nosotros" className='link-decoration'>
                <Button sx={{ my: 2, color: "#D3E0EA", display: 'block' }} >
                  Nosotros
                </Button>
              </Link>

              <Link to="/contacto" className="link-decoration">
                <Button sx={{ my: 2, color: "#D3E0EA", display: 'block'}}>
                  Contacto
                </Button>
              </Link>

              { !usuarioActual 
                ? <Link to="/registrar" className="link-decoration">
                    <Button  sx={{ my: 2, color: '#D3E0EA', display: 'block' }}>
                      Registrarse
                    </Button>
                  </Link>
                : <Link to="/perfil" className="link-decoration">
                    <Button  sx={{ my: 2, color: '#D3E0EA', display: 'block' }}>
                      Perfil
                    </Button>
                  </Link>
              }
            </Box>
            
            <Box sx={{ flexGrow: 0 }}>
              { !usuarioActual 
                ? <Link to="/ingresar" className="link-decoration">
                    <Button variant="contained"  sx={{ my: 2, color: "#D3E0EA", bgcolor:"#1687A7" , '&:hover': { bgcolor: '#125E75'} }}>
                      Ingresar
                    </Button>
                  </Link>
                : <Link to="/" className="link-decoration">
                    <Button variant="contained"  sx={{ my: 2, color: "#D3E0EA", bgcolor:"#1687A7" , '&:hover': { bgcolor: '#125E75'} }} onClick={() => this.deleteStorage()}>
                      Cerrar Sesión
                    </Button>
                  </Link>
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default ResponsiveAppBar;
