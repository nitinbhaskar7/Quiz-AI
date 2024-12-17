"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import dynamic from "next/dynamic"
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
export default dynamic (() => Promise.resolve(ThemeProvider), {ssr: false})
