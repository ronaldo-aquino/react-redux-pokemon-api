import axios from "axios";

// Constantes
const initialState = {
    count: 0,
    next: null,
    previous: null,
    results: [],
};

// Action
const GET_POKEMONS = "GET_POKEMONS";
const NEXT_POKEMONS = "NEXT_POKEMONS";
const PREVIOUS_POKEMONS = "PREVIOUS_POKEMONS";
const DETAIL_POKEMON = "DETAIL_POKEMON";

// Reducer
export default function pokeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return { ...state, ...action.payload };
        case NEXT_POKEMONS:
            return { ...state, ...action.payload };
        case PREVIOUS_POKEMONS:
            return { ...state, ...action.payload };
        case DETAIL_POKEMON:
            return { ...state, pokemonDetail: action.payload };
        default:
            return state;
    }
}

// actions Creator
export const getPokemonsAction = () => async (dispatch) => {
    if (localStorage.getItem("offset=0")) {
        console.log("Pokemons guardados");
        dispatch({
            type: GET_POKEMONS,
            payload: JSON.parse(localStorage.getItem("offset=0")),
        });
        return;
    }

    try {
        const { data } = await axios.get(
            "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
        );

        console.log("pokemons da api");

        dispatch({
            type: GET_POKEMONS,
            payload: data,
        });

        localStorage.setItem("offset=0", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

export const nextPokemonsAction = () => async (dispatch, getState) => {
    const { next } = getState().pokemons;

    if (localStorage.getItem(next)) {
        console.log("Pokemons guardados");
        dispatch({
            type: GET_POKEMONS,
            payload: JSON.parse(localStorage.getItem(next)),
        });
        return;
    }

    try {
        const { data } = await axios.get(next);

        dispatch({
            type: NEXT_POKEMONS,
            payload: data,
        });

        localStorage.setItem(next, JSON.stringify(data));
    } catch (error) {
        console.log("error");
    }
};

export const previousPokemonsAction = () => async (dispatch, getState) => {
    const { previous } = getState().pokemons;

    if (localStorage.getItem(previous)) {
        console.log("Pokemons guardados");
        dispatch({
            type: GET_POKEMONS,
            payload: JSON.parse(localStorage.getItem(previous)),
        });
        return;
    }

    try {
        const { data } = await axios.get(previous);

        dispatch({
            type: PREVIOUS_POKEMONS,
            payload: data,
        });

        localStorage.setItem(previous, JSON.stringify(data));
    } catch (error) {
        console.log("error");
    }
};

export const pokemonDetalhe = (
    url = "https://pokeapi.co/api/v2/pokemon/1"
) => async (dispatch) => {
    try {
        const { data } = await axios.get(url);
        console.log(data);
        dispatch({
            type: DETAIL_POKEMON,
            payload: {
                name: data.name,
                weight: data.weight,
                height: data.height,
                img: data.sprites.front_default,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
