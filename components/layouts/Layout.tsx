import { FC } from "react";
import  Head  from "next/head";
import { Navbar } from "../ui";

interface  LayoutProps {
    children: JSX.Element,
    title? : string
}

const origin = (typeof window === 'undefined') ? '' :  window.location.origin;

export const Layout: FC<LayoutProps>= ({children, title}) => {

  return (
    <div>
        <Head>
            <title>{title || "Pokemon App"}</title>
            <meta name="author" content="Raquel Vazquez" />
            <meta name="description" content="Informacion sobre el pokemon xxx" />
            <meta name="keywords"  content="xxx, pokemon, pokedex" />
            <meta property="og:title" content={`Información sobre ${title}`}/>
            <meta property="og:description" content={`Pagina especifica de  ${title}`}/>
            <meta property="og:image" content={`${origin}/img/banner.png`}/>
        </Head>
        <Navbar />

        <main style={{
          padding: "0 20px"
        }}>
            {children}
        </main>
    </div>
  )
}
