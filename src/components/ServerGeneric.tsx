export function ServerGeneric({ element }: { element: React.ReactNode | (() => Promise<Element>) }) {
  return <>{element}</>
}
