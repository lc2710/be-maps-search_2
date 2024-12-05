import axios from 'axios'

export interface TomTomSearchResult {
    id: string;
    address: {
        streetNumber?: string;
        localName?: string;        
        streetName: string;
        countryCode: string;
        country: string;
        freeformAddress: string;
        municipality: string;
        postalCode: string;
    }

}

interface TomTomResponse {
    results: TomTomSearchResult[];
}

export interface ProcessedResult {
    placeId: string;
    streetNumber: string | null;
    localName: string | null;
    countryCode: string;
    streetName: string;
    country: string;
    freeformAddress: string;
    municipality: string;
    postalCode: string;
}

export function transformToProcessedResult(result: TomTomSearchResult): ProcessedResult {
    return {
        placeId: result.id,
        streetName: result.address.streetName,
        countryCode: result.address.countryCode,
        country: result.address.country,
        freeformAddress: result.address.freeformAddress,
        municipality: result.address.municipality,
        postalCode: result.address.postalCode,
        streetNumber: result.address.streetNumber || null,
        localName: result.address.localName || null,
    };
}

export async function getPlaceAutocomplete(key: string, address: string, countrySet: string = 'AU'): Promise<ProcessedResult[]> {
    const autocomplete = await axios.get<TomTomResponse>(`https://api.tomtom.com/search/2/search/${address}.json`, {
        params: {
            key,
            limit: 100,
            countrySet,
        }
    });

    return autocomplete.data.results.map(transformToProcessedResult);
}
