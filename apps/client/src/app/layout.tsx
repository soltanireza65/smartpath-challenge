import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";
// import theme from '@/theme';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CssBaseline />
      <body>
        <ThemeProvider theme={theme}>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <CssBaseline />
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}