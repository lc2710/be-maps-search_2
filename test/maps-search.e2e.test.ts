import { config } from 'dotenv';
import { describe } from '@jest/globals';
import { getAutoCompleteDetails } from '../src';

config();

describe('Tomtom Places E2E Tests', () => {
    describe('getAutoCompleteDetails', () => {
        it('returns a promise', () => {
            const res = getAutoCompleteDetails('Charlotte Street')
            expect(res).toBeInstanceOf(Promise)
        })

        it('can fetch from the autocomplete api', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street')
            const firstRes = res[0];
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes).toHaveProperty('localName')
            expect(firstRes).toHaveProperty('streetName')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes).toHaveProperty('municipality')
            expect(firstRes).toHaveProperty('postalCode')
        })

        it('handles no results', async () => {
            const res = await getAutoCompleteDetails('asfasffasfasafsafs');
            expect(res).toStrictEqual([])
        })

        it('handles error', async () => {
            expect(getAutoCompleteDetails('')).rejects.toThrow()
        })

        it('returns expected number of results', async () => {
            const res = await getAutoCompleteDetails('Main Street');
            expect(res.length).toBeLessThanOrEqual(100);
        });
    })
}) 