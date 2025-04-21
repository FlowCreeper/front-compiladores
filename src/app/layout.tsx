// src/app/layout.tsx
import MuiProvider from '../theme/MuiProvider';
import CustomAppBar from '../components/AppBarr';

export const metadata = {
  title: 'V1 - Luciene',
  description: 'Projeto de Interpretador com Next.js + MUI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{backgroundColor: "rgb(12,12,12)"}}>
        <MuiProvider>
          <CustomAppBar />
          {children}
        </MuiProvider>
      </body>
    </html>
  );
}