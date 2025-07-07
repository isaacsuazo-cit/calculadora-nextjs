import './globals.css'

export const metadata = {
  title: 'Calculadora Next.js',
  description: 'Una calculadora básica desarrollada con Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}