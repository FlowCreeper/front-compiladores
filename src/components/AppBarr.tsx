'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Link from 'next/link';

export default function CustomAppBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  const menuItems = [
    { label: 'Editor de linguagem', path: '/linguagem' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "black" }} elevation={3}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Nome do site */}
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            <a href='/' style={{textDecoration: "none"}}> Codiguin </a>
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Link para página de serviços */}
            <Button
              color="inherit"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #ff0000,rgb(255, 149, 0), #33cc33, #0099ff, #9900cc, #ff3399, #ff0000)',
                backgroundSize: '400% 400%',
                animation: 'fadeRainbow 3s ease infinite',
                color: 'white',
                borderRadius: '4px',
                padding: '6px 12px',
                '&:hover': {
                  backgroundPosition: 'right center',
                },
              }}
              component={Link}
              href="https://www.youtube.com/watch?v=BBGEG21CGo0"
            >
              Não clique
            </Button>

            {/* Botão de menu */}
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral com links */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component={Link} href={item.path}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
