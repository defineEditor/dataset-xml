import path from 'path';
import { read } from '../../src/main';

describe('Read file', () => {
    it('Read dataset with ReferenceData', async () => {
        let result = await read(path.join(__dirname, '../data/TV.xml'));
        expect(result).toMatchSnapshot();
    });
    it('Read dataset with ClinicalData', async () => {
        let result = await read(path.join(__dirname, '../data/CO.xml'));
        expect(result).toMatchSnapshot();
    });
});