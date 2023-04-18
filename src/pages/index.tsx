import { NextPage, GetStaticProps } from "next";
import { Grid } from "@nextui-org/react";
import { pokeApi } from "../../api";
import {Layout} from "../../components/layouts";
import { PokemonListResponse, SmallPokemon } from "../../interfaces";
import PokemonCard from "../../components/pokemon/PokemonCard";

interface Props {
  pokemons: SmallPokemon[];
}
const Home : NextPage<Props>= ({pokemons}) => {

  return (
    <Layout title="Pokemon -  Home">
      <Grid.Container gap={2} justify="flex-start">
        {
          pokemons.map((element) => (
            <PokemonCard pokemon={element} key={element.id}/>
          ))
        }
      </Grid.Container>
    </Layout>
    
  )
}

export const getStaticProps : GetStaticProps = async (context) => {

  const {data} = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");


  const pokemons : SmallPokemon[]= data.results.map( (element, index) => ({
    ...element,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }, // will be passed to the page component as props
  }
}

export default Home