'use client'

import { Grid, TextField } from "@mui/material";

export default function Linguagem() {
  return (
    <Grid container spacing={10} sx={{ margin: '2%' }}>
      <Grid size={8}>
      <TextField label="Keyword" variant="standard" />
      </Grid>
      <TextField label="Function" variant="filled" />
      <TextField label="Parameters" />
    </Grid>
  );
}
