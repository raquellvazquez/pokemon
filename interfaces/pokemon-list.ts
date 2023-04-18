export interface PokemonListResponse {
    count:    number;
    next?:     string;
    previous?: string;
    results:  SmallPokemon[];
}

export interface SmallPokemon {
    map(arg0: (element: any) => JSX.Element): import("react").ReactNode;
    name: string;
    url:  string;
    id: number;
    img: string;
}
