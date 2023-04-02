export const metadata = {
  title: "Autenticação",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen overflow-hidden">
      {children}
    </section>
  )
}
