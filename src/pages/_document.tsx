import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head />
      <body className="overflow-y-hidden">
        <Main />
        <NextScript />
        <div id="portal"></div>
      </body>
    </Html>
  )
}
