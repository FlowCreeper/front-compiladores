'use client'

import { Button, TextField, Typography, Box, Snackbar } from "@mui/material";
import { useState } from "react";

export default function Linguagem() {
  const [keyword, setKeyword] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("")

  const sendKeyword = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_API_LINK) {
        setSnackMessage("Failed to find API link")
        setSnackOpen(true)
        throw new Error("API link is not defined");
      }
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_LINK + "analise-lexica/adiciona-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: keyword }),
        }
      );

      if (!response.ok) {
        setSnackMessage(response.statusText)
        setSnackOpen(true)
        throw new Error(response.statusText);
      }

      const result = await response.json();
      console.log(result);
    } catch (error: any) {
      if (error.message == "Not Found") {
        setSnackMessage("Failed to find the API")
        setSnackOpen(true)
      }
      console.error("Failed to send keyword: ", error);
    }
  };

  return (
    <Box
      sx={{
        height: "90vh",
        width: "99vw",
        padding: 2,
        margin: 0,
        bgcolor: "#1e1e1e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#fff", marginBottom: 2, fontFamily: "monospace" }}
      >
        Adicionar Token
      </Typography>
      <TextField
        label="Keyword"
        variant="outlined"
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          width: "50%",
          marginBottom: 2,
        }}
        onChange={(e) => setKeyword(e.currentTarget.value)}
      />
      <Button
        onClick={sendKeyword}
        variant="contained"
        sx={{
          bgcolor: "#007bff",
          color: "#fff",
          "&:hover": { bgcolor: "#0056b3" },
        }}
      >
        Enviar
      </Button>
      <Snackbar 
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={snackOpen}
        autoHideDuration={5000}
        message={snackMessage}
      />
    </Box>
  );
}
