import { AppProps } from "next/app"
import { Toaster } from "@/components/ui/toaster"
import { Layout } from "@/components/layout/Layout"
import "@/styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  )
}

export default MyApp