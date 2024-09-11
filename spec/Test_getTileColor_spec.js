import {getTileColor} from '../script'

describe('getTileColor', () => {

    it('should return correct color for tile value 2', () => {
        expect(getTileColor(2)).toBe("#FAE3D9");
    });

    it('should return correct color for tile value 4', () => {
        expect(getTileColor(4)).toBe("#FFC4C4");
    });

    it('should return correct color for tile value 8', () => {
        expect(getTileColor(8)).toBe("#FFAAA5");
    });

    it('should return correct color for tile value 16', () => {
        expect(getTileColor(16)).toBe("#FFD3B6");
    });

    it('should return correct color for tile value 32', () => {
        expect(getTileColor(32)).toBe("#FF8C94");
    });

    it('should return correct color for tile value 64', () => {
        expect(getTileColor(64)).toBe("#FF847C");
    });

    it('should return correct color for tile value 128', () => {
        expect(getTileColor(128)).toBe("#E7B4B4");
    });

    it('should return correct color for tile value 256', () => {
        expect(getTileColor(256)).toBe("#E9B0E5");
    });

    it('should return correct color for tile value 512', () => {
        expect(getTileColor(512)).toBe("#CC99C9");
    });

    it('should return correct color for tile value 1024', () => {
        expect(getTileColor(1024)).toBe("#CDB4DB");
    });

    it('should return correct color for tile value 2048', () => {
        expect(getTileColor(2048)).toBe("#A4B5A4");
    });

    it('should return default color for tile values not in the map', () => {
        expect(getTileColor(4096)).toBe("#DCD3CB");
        expect(getTileColor(123)).toBe("#DCD3CB");
        expect(getTileColor(-1)).toBe("#DCD3CB");
    });

});
