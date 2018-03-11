import pako from 'pako';

const Decodeuint8arr = uint8array => new TextDecoder("utf-8").decode(uint8array);

export default arrayBuffer => Decodeuint8arr(pako.ungzip(arrayBuffer));
