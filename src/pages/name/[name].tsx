import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { pokeApi } from '../../../api';
import { Pokemon, PokemonListResponse } from '../../../interfaces';
import { Layout } from '../../../components/layouts';
import { Button, Card, Grid, Text, Container, Image} from '@nextui-org/react';
import { getPokemonInfo, localStorageFavorites } from '../../../utils';
import conffeti from 'canvas-confetti';

interface Props {
    pokemon: Pokemon;
}

const PokemonByName: NextPage<Props> = ({pokemon}) => {
    const [isInFavorites, setIsInFavorites] = useState(localStorageFavorites.exitsInFavorites(pokemon.id));

    const onToggleFavorite = () => {
      localStorageFavorites.toggleFavorite(pokemon.id);
      setIsInFavorites(!isInFavorites);
  
      if(!isInFavorites) {
        conffeti({
          zIndex: 999,
          particleCount: 100,
          spread: 160,
          angle: -100,
          origin: {
            x: 1,
            y: 0        
          }
        })
      }
    } 
  
    return (
      <Layout title={pokemon.name}>
          <Grid.Container css={{ marginTop: '5px' }} gap={2}>
              <Grid xs={12} sm={4}>
                  <Card hoverable css={{ padding: '30px'}}>
                      <Card.Body>
                          <Card.Image 
                            src={pokemon.sprites.other?.dream_world.front_default || '/no-image-found.png'}
                            alt={pokemon.name}
                            width="100%"
                            height={200}
                          />
                      </Card.Body>
                  </Card>
              </Grid>
              <Grid xs={12} sm={8}>
                  <Card>
                  <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                      <Text h1 transform='capitalize'>{pokemon.name}</Text>
                      <Button color='gradient' ghost={!isInFavorites} onClick={onToggleFavorite}>
                        {isInFavorites ?'En Favoritos' : 'Guardar en Favoritos'}  
                      </Button>
                  </Card.Header>
                  <Card.Body>
                  <Text size={30}>Sprites:</Text>
                  <Container direction='row' display='flex' gap={0}>
                      <Image 
                          src={pokemon.sprites.front_default}
                          alt={pokemon.name}
                          width={100}
                          height={100}
                      />
                      <Image 
                          src={pokemon.sprites.back_default}
                          alt={pokemon.name}
                          width={100}
                          height={100}
                      />
                      <Image 
                          src={pokemon.sprites.front_shiny}
                          alt={pokemon.name}
                          width={100}
                          height={100}
                      />
                      <Image 
                          src={pokemon.sprites.back_shiny}
                          alt={pokemon.name}
                          width={100}
                          height={100}
                      />
                  </Container>   
                  </Card.Body>
                  </Card>
              </Grid>
          </Grid.Container>
      </Layout>
    )
}

export const getStaticPaths : GetStaticPaths = async (ctx) => {

    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name);

    return {
      paths: pokemonNames.map(name => ({
        params: { name }
      })),
      //fallback: false, //si el url no esta definida permite mostrar un 404
      fallback: 'blocking'
    }
}

export const getStaticProps : GetStaticProps = async ({params}) => {
  
  //parametro que recibimos por la url
    const {name} = params as {name: string};

    const pokemon = await getPokemonInfo(name)

    if(!pokemon) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return {
      props: {
        pokemon
      }, // will be passed to the page component as props
      revalidate: 86400
    }
  }
export default PokemonByName