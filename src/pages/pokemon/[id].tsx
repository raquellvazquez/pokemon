import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Pokemon } from '../../../interfaces';
import { pokeApi } from '../../../api';
import { Layout } from '../../../components/layouts';
import { Button, Card, Grid, Text, Container, Image} from '@nextui-org/react';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage : NextPage<Props> = ({pokemon}) => {

  const onToggleFavorite = () => {
    console.log("pokemon", pokemon.id)
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
                    <Button color='gradient' ghost onClick={onToggleFavorite}>Guardar en Favoritos</Button>
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

/**
 * GetStaticPaths, requerido para paginas dinamicas ej: [id].tsx
 */

export const getStaticPaths : GetStaticPaths = async (ctx) => {

    const pokemonPaths = [... Array(151)].map((value, index) => `${index+1}`);

    return {
      paths: pokemonPaths.map(id => ({
        params: { id}
      })),
      fallback: false, //si el url no esta definida permite mostrar un 404
    }
}

/**
 * Despues de ejecutarse getStaticPaths, en getStaticProps podemos acceder a los argumentos del contexto
 * Contexto : ruta, parametros...
 * 
 * En build time se genera toda la información
 */

export const getStaticProps : GetStaticProps = async ({params}) => {
  
    const {id} = params as {id: string};

    const {data} = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

    return {
      props: {
        pokemon: data
      }, // will be passed to the page component as props
    }
  }
export default PokemonPage;