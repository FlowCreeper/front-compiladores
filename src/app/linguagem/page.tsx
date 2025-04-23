'use client'

import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function Linguagem() {
  const [keyword, setKeyword] = useState("")

  const sendKeyword = async () => {
    try {
      if (!process.env.API_LINK) {
        throw new Error("API link is not defined");
      }
      const response = await fetch(process.env.API_LINK + "analise-lexica/adiciona-token ", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        }, 
        body: JSON.stringify({ token: keyword }),
      })
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const result = await response.json()
      console.log(result)

    } catch (error) {
      console.error("Failed to send keyword: ", error)
    }
  }

  return (
    <Grid container spacing={10} sx={{ margin: '2%' }}>
      <Grid size={8}>
        <TextField label="Keyword" sx={{backgroundColor: "white", outlineColor: "green", borderRadius: 1}} onChange={(e) => setKeyword(e.currentTarget.value)}/>
      </Grid>
      <Button onClick={sendKeyword}>Enviar</Button>
    </Grid>
  );
}
