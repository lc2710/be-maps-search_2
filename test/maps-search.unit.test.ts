import { transformToProcessedResult } from '../src/maps-api';
import type { TomTomSearchResult } from '../src/maps-api';

describe('Tomtom Places Unit Tests', () => {
    describe('transformToProcessedResult', () => {
        it('correctly transforms complete TomTom result', () => {
            const rawResult: TomTomSearchResult = {
                id: '123',
                address: {
                    streetName: 'Test St',
                    countryCode: 'AU',
                    country: 'Australia',
                    freeformAddress: '123 Test St',
                    municipality: 'Sydney',
                    postalCode: '2000',
                    streetNumber: '123',
                    localName: 'CBD'
                }
            };

            const processed = transformToProcessedResult(rawResult);

            expect(processed).toEqual({
                placeId: '123',
                streetName: 'Test St',
                countryCode: 'AU',
                country: 'Australia',
                freeformAddress: '123 Test St',
                municipality: 'Sydney',
                postalCode: '2000',
                streetNumber: '123',
                localName: 'CBD'
            });
        });

        it('handles missing optional fields', () => {
            const rawResult: TomTomSearchResult = {
                id: '123',
                address: {
                    streetName: 'Test St',
                    countryCode: 'AU',
                    country: 'Australia',
                    freeformAddress: 'Test St',
                    municipality: 'Sydney',
                    postalCode: '2000'
                }
            };

            const processed = transformToProcessedResult(rawResult);

            expect(processed.streetNumber).toBeNull();
            expect(processed.localName).toBeNull();
            expect(processed.streetName).toBe(rawResult.address.streetName);
        });
    });

}); 