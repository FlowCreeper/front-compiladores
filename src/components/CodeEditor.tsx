'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Typography } from '@mui/material';

// Carrega o Monaco dinamicamente
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function CodeEditor() {
  const [code, setCode] = useState(`// Experimente escrever funções aqui
function print() {
  console.log('Função print chamada');
}

print();  // Deve chamar a função print()
`);
  const [log, setLog] = useState<string[]>([]);

  function ConsoleRun() {
    const capturedLogs: string[] = [];
    const originalConsoleLog = console.log;

    // Override console.log to capture logs
    console.log = function (...args) {
      capturedLogs.push(args.join(' '));
      originalConsoleLog.apply(console, args);
    };

    try {
      // Use Function constructor instead of eval for better safety
      const func = new Function(code);
      func();
    } catch (error) {
      if (error instanceof Error) {
        capturedLogs.push(`~ Error: ${error.message}`);
      } else {
        capturedLogs.push('~ Error: An unknown error occurred');
      }
    }

    // Restore original console.log
    console.log = originalConsoleLog;

    setLog(capturedLogs);
  }

  return (
    <Box
      sx={{
        height: '90vh',
        width: '99vw',
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
        }}
      >
        {log.map((line, index) => (
          <Typography key={index} variant="body2">
            {line}
          </Typography>
        ))}
      </Box>
      <Button onClick={ConsoleRun} variant="contained" sx={{ margin: 2 }}>
        Execute
      </Button>
    </Box>
  );
}
