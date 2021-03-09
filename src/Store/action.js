export const LOADING = 'LOADING';
export const HAS_LOADED = 'HAS_LOADED';
export const IS_LOADING = 'IS_LOADING';
export const STOP_LOADING = 'STOP_LOADING';



export const loading = (loaded, total) => {
    return  {
        type: LOADING,
        loaded: loaded,
        total: total

    }
}
export const hasLoaded = () => {
    return {
        type: HAS_LOADED
    }
}

export const isLoading = () => {
    return {
        type: IS_LOADING
    }
}

export const stopLoading = () => {
    return {
        type: STOP_LOADING
    }
}