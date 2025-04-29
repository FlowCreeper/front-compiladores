'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Typography } from '@mui/material';

// Carrega o Monaco dinamicamente
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function CodeEditor() {
  const [code, setCode] = useState(`function print() {
  console.log('Função print chamada')
}

print()
`);
  const [log, setLog] = useState<string[]>([]);

  // function ConsoleRun() {
  //   const capturedLogs: string[] = [];
  //   const originalConsoleLog = console.log;

  //   // Override console.log to capture logs
  //   console.log = function (...args) {
  //     capturedLogs.push(args.join(' '));
  //     originalConsoleLog.apply(console, args);
  //   };

  //   try {
  //     // Use Function constructor instead of eval for better safety
  //     const func = new Function(code);
  //     func();
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       capturedLogs.push(`~ Error: ${error.message}`);
  //     } else {
  //       capturedLogs.push('~ Error: An unknown error occurred');
  //     }
  //   }

  //   // Restore original console.log
  //   console.log = originalConsoleLog;

  //   setLog(capturedLogs);
  // }
  
  async function consoleRun() {
      if (!process.env.NEXT_PUBLIC_API_LINK) {
        setLog(["Failed to find API link"])
        throw new Error("API link is not defined");
      }
      

      fetch(process.env.NEXT_PUBLIC_API_LINK + "analise-lexica/divide-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ snippet: code }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json()
      })
      .then(data => {
        if (!data.is_success) {
          throw new Error(data.message);
        }
      
        const tokensLog = (data.response as { token: string, type: string }[]).map((tokenObj) => 
          `${tokenObj.token} => ${tokenObj.type}`
        );
      
        setLog([data.message, ...tokensLog]);
      })
      .catch(error => {
        if (error.message == "Not Found") {
          setLog(["Failed to send code", "Failed to find the API"]);
        } else {
          setLog(["Failed to send code", error.message]);
        }
        console.error("Failed to send code: ", error);
      });
  }

  return (
    <Box
      sx={{
        height: '90.9vh',
        padding: 0,
        margin: 0,
        bgcolor: '#1e1e1e',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MonacoEditor
        defaultLanguage="typescript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || '')}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          suggestOnTriggerCharacters: true,
          wordBasedSuggestions: 'currentDocument',
          quickSuggestions: true,
          parameterHints: { enabled: true },
          tabSize: 2,
        }}
      />
      <Box
        sx={{
          height: "20vh",
          bgcolor: '#121212',
          color: '#fff',
          padding: 2,
          margin: 2,
          overflowY: 'auto',
          border: '1px solid #333',
          borderRadius: '4px',
          fontFamily: 'monospace',
        }}
      >
        {log.map((line, index) => (
          <Typography key={index} variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            {line}
          </Typography>
        ))}
      </Box>
      <Button onClick={consoleRun} variant="contained" sx={{ margin: 2 }}>
        Execute
      </Button>
    </Box>
  );
}
