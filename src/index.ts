import { getPlaceAutocomplete, ProcessedResult } from './maps-api'

export async function getAutoCompleteDetails(
    address: string, 
    countrySet?: string
): Promise<ProcessedResult[]> {
    const apiKey = process.env.TOMTOM_API_KEY;
    if (!apiKey) throw new Error('TOMTOM_API_KEY is not defined');
    
    try {
        const autocompleteResults = await getPlaceAutocomplete(apiKey, address, countrySet);
        
        return autocompleteResults;

    } catch (error) {
        console.error('Error fetching autocomplete results:', error);
        throw error;
    }
}