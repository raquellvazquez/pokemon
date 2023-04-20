import { Spacer, Text, useTheme, Link } from "@nextui-org/react"
import NextLink from 'next/link';
import Image from "next/image";
export const Navbar = () => {

   const {theme} = useTheme();

  return (
    <div style={{
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "start",
      padding: "0 20px",
      backgroundColor: theme?.colors.gray900.value,
    }}>
        <Image 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="icono de la app"
            width={70}
            height={70}
        />
        <NextLink href="/" passHref>
          {/* <Link> */}
          <div style={{display: 'flex', alignItems: 'center'}}>
          <Text color="white" h2>
                P
            </Text>
            <Text color="white" h3>
                okémon
            </Text>
          </div>
            
          {/* </Link> */}
        </NextLink>
        <Spacer css={{flex: 1}} />
        <NextLink href="/favorites" passHref>
          {/* <Link> */}
            <Text color="white" h3>
                Favoritos
            </Text>
          {/* </Link> */}
        </NextLink>
    </div>
  )
}
