//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@caffeineai+object-storage@1.1.2/node_modules/@caffeineai/object-storage/dist/blob.js
var ExternalBlob$1 = class ExternalBlob$1 {
	_blob;
	directURL;
	contentType;
	filename;
	onProgress = void 0;
	constructor(directURL, blob) {
		if (blob) this._blob = blob;
		this.directURL = directURL;
	}
	static fromURL(url) {
		return new ExternalBlob$1(url, null);
	}
	static fromBytes(blob, contentType, filename) {
		const url = URL.createObjectURL(new Blob([new Uint8Array(blob)], { type: contentType?.trim() || "application/octet-stream" }));
		const externalBlob = new ExternalBlob$1(url, blob);
		if (contentType?.trim()) externalBlob.contentType = contentType.trim();
		if (filename?.trim()) externalBlob.filename = filename.trim();
		return externalBlob;
	}
	async getBytes() {
		if (this._blob) return this._blob;
		const blob = await (await fetch(this.directURL)).blob();
		this._blob = new Uint8Array(await blob.arrayBuffer());
		return this._blob;
	}
	getDirectURL() {
		return this.directURL;
	}
	withUploadProgress(onProgress) {
		this.onProgress = onProgress;
		return this;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/agent/api.js
/**
* Codes used by the replica for rejecting a message.
* See {@link https://sdk.dfinity.org/docs/interface-spec/#reject-codes | the interface spec}.
*/
var ReplicaRejectCode;
(function(ReplicaRejectCode) {
	ReplicaRejectCode[ReplicaRejectCode["SysFatal"] = 1] = "SysFatal";
	ReplicaRejectCode[ReplicaRejectCode["SysTransient"] = 2] = "SysTransient";
	ReplicaRejectCode[ReplicaRejectCode["DestinationInvalid"] = 3] = "DestinationInvalid";
	ReplicaRejectCode[ReplicaRejectCode["CanisterReject"] = 4] = "CanisterReject";
	ReplicaRejectCode[ReplicaRejectCode["CanisterError"] = 5] = "CanisterError";
})(ReplicaRejectCode || (ReplicaRejectCode = {}));
var QueryResponseStatus;
(function(QueryResponseStatus) {
	QueryResponseStatus["Replied"] = "replied";
	QueryResponseStatus["Rejected"] = "rejected";
})(QueryResponseStatus || (QueryResponseStatus = {}));
/**
* Utility function to check if a body is a v2ResponseBody for type safety.
* @param body The body to check
* @returns boolean indicating if the body is a v2ResponseBody
*/
function isV2ResponseBody(body) {
	return body !== null && body !== void 0 && "reject_code" in body;
}
/**
* Utility function to check if a body is a v4ResponseBody for type safety.
* @param body The body to check
* @returns boolean indicating if the body is a v4ResponseBody
*/
function isV4ResponseBody(body) {
	return body !== null && body !== void 0 && "certificate" in body;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/principal/utils/base32.js
var alphabet = "abcdefghijklmnopqrstuvwxyz234567";
var lookupTable = Object.create(null);
for (let i = 0; i < 32; i++) lookupTable[alphabet[i]] = i;
lookupTable["0"] = lookupTable.o;
lookupTable["1"] = lookupTable.i;
/**
* @param input The Uint8Array to encode.
* @returns A Base32 string encoding the input.
*/
function base32Encode(input) {
	let skip = 0;
	let bits = 0;
	let output = "";
	function encodeByte(byte) {
		if (skip < 0) bits |= byte >> -skip;
		else bits = byte << skip & 248;
		if (skip > 3) {
			skip -= 8;
			return 1;
		}
		if (skip < 4) {
			output += alphabet[bits >> 3];
			skip += 5;
		}
		return 0;
	}
	for (let i = 0; i < input.length;) i += encodeByte(input[i]);
	return output + (skip < 0 ? alphabet[bits >> 3] : "");
}
/**
* @param input The base32 encoded string to decode.
*/
function base32Decode(input) {
	let skip = 0;
	let byte = 0;
	const output = new Uint8Array(input.length * 4 / 3 | 0);
	let o = 0;
	function decodeChar(char) {
		let val = lookupTable[char.toLowerCase()];
		if (val === void 0) throw new Error(`Invalid character: ${JSON.stringify(char)}`);
		val <<= 3;
		byte |= val >>> skip;
		skip += 5;
		if (skip >= 8) {
			output[o++] = byte;
			skip -= 8;
			if (skip > 0) byte = val << 5 - skip & 255;
			else byte = 0;
		}
	}
	for (const c of input) decodeChar(c);
	return output.slice(0, o);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/principal/utils/getCrc.js
var lookUpTable = new Uint32Array([
	0,
	1996959894,
	3993919788,
	2567524794,
	124634137,
	1886057615,
	3915621685,
	2657392035,
	249268274,
	2044508324,
	3772115230,
	2547177864,
	162941995,
	2125561021,
	3887607047,
	2428444049,
	498536548,
	1789927666,
	4089016648,
	2227061214,
	450548861,
	1843258603,
	4107580753,
	2211677639,
	325883990,
	1684777152,
	4251122042,
	2321926636,
	335633487,
	1661365465,
	4195302755,
	2366115317,
	997073096,
	1281953886,
	3579855332,
	2724688242,
	1006888145,
	1258607687,
	3524101629,
	2768942443,
	901097722,
	1119000684,
	3686517206,
	2898065728,
	853044451,
	1172266101,
	3705015759,
	2882616665,
	651767980,
	1373503546,
	3369554304,
	3218104598,
	565507253,
	1454621731,
	3485111705,
	3099436303,
	671266974,
	1594198024,
	3322730930,
	2970347812,
	795835527,
	1483230225,
	3244367275,
	3060149565,
	1994146192,
	31158534,
	2563907772,
	4023717930,
	1907459465,
	112637215,
	2680153253,
	3904427059,
	2013776290,
	251722036,
	2517215374,
	3775830040,
	2137656763,
	141376813,
	2439277719,
	3865271297,
	1802195444,
	476864866,
	2238001368,
	4066508878,
	1812370925,
	453092731,
	2181625025,
	4111451223,
	1706088902,
	314042704,
	2344532202,
	4240017532,
	1658658271,
	366619977,
	2362670323,
	4224994405,
	1303535960,
	984961486,
	2747007092,
	3569037538,
	1256170817,
	1037604311,
	2765210733,
	3554079995,
	1131014506,
	879679996,
	2909243462,
	3663771856,
	1141124467,
	855842277,
	2852801631,
	3708648649,
	1342533948,
	654459306,
	3188396048,
	3373015174,
	1466479909,
	544179635,
	3110523913,
	3462522015,
	1591671054,
	702138776,
	2966460450,
	3352799412,
	1504918807,
	783551873,
	3082640443,
	3233442989,
	3988292384,
	2596254646,
	62317068,
	1957810842,
	3939845945,
	2647816111,
	81470997,
	1943803523,
	3814918930,
	2489596804,
	225274430,
	2053790376,
	3826175755,
	2466906013,
	167816743,
	2097651377,
	4027552580,
	2265490386,
	503444072,
	1762050814,
	4150417245,
	2154129355,
	426522225,
	1852507879,
	4275313526,
	2312317920,
	282753626,
	1742555852,
	4189708143,
	2394877945,
	397917763,
	1622183637,
	3604390888,
	2714866558,
	953729732,
	1340076626,
	3518719985,
	2797360999,
	1068828381,
	1219638859,
	3624741850,
	2936675148,
	906185462,
	1090812512,
	3747672003,
	2825379669,
	829329135,
	1181335161,
	3412177804,
	3160834842,
	628085408,
	1382605366,
	3423369109,
	3138078467,
	570562233,
	1426400815,
	3317316542,
	2998733608,
	733239954,
	1555261956,
	3268935591,
	3050360625,
	752459403,
	1541320221,
	2607071920,
	3965973030,
	1969922972,
	40735498,
	2617837225,
	3943577151,
	1913087877,
	83908371,
	2512341634,
	3803740692,
	2075208622,
	213261112,
	2463272603,
	3855990285,
	2094854071,
	198958881,
	2262029012,
	4057260610,
	1759359992,
	534414190,
	2176718541,
	4139329115,
	1873836001,
	414664567,
	2282248934,
	4279200368,
	1711684554,
	285281116,
	2405801727,
	4167216745,
	1634467795,
	376229701,
	2685067896,
	3608007406,
	1308918612,
	956543938,
	2808555105,
	3495958263,
	1231636301,
	1047427035,
	2932959818,
	3654703836,
	1088359270,
	936918e3,
	2847714899,
	3736837829,
	1202900863,
	817233897,
	3183342108,
	3401237130,
	1404277552,
	615818150,
	3134207493,
	3453421203,
	1423857449,
	601450431,
	3009837614,
	3294710456,
	1567103746,
	711928724,
	3020668471,
	3272380065,
	1510334235,
	755167117
]);
/**
* Calculate the CRC32 of a Uint8Array.
* @param buf The Uint8Array to calculate the CRC32 of.
*/
function getCrc32(buf) {
	let crc = -1;
	for (let i = 0; i < buf.length; i++) crc = lookUpTable[(buf[i] ^ crc) & 255] ^ crc >>> 8;
	return (crc ^ -1) >>> 0;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/esm/crypto.js
var crypto$1 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/esm/utils.js
/**
* Utilities for hex, bytes, CSPRNG.
* @module
*/
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
/** Checks if something is Uint8Array. Be careful: nodejs Buffer will return true. */
function isBytes(a) {
	return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
/** Asserts something is positive integer. */
function anumber(n) {
	if (!Number.isSafeInteger(n) || n < 0) throw new Error("positive integer expected, got " + n);
}
/** Asserts something is Uint8Array. */
function abytes(b, ...lengths) {
	if (!isBytes(b)) throw new Error("Uint8Array expected");
	if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
/** Asserts a hash instance has not been destroyed / finished */
function aexists(instance, checkFinished = true) {
	if (instance.destroyed) throw new Error("Hash instance has been destroyed");
	if (checkFinished && instance.finished) throw new Error("Hash#digest() has already been called");
}
/** Asserts output is properly-sized byte array */
function aoutput(out, instance) {
	abytes(out);
	const min = instance.outputLen;
	if (out.length < min) throw new Error("digestInto() expects output buffer of length at least " + min);
}
/** Zeroize a byte array. Warning: JS provides no guarantees. */
function clean(...arrays) {
	for (let i = 0; i < arrays.length; i++) arrays[i].fill(0);
}
/** Create DataView of an array for easy byte-level manipulation. */
function createView(arr) {
	return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
/** The rotate right (circular right shift) operation for uint32 */
function rotr(word, shift) {
	return word << 32 - shift | word >>> shift;
}
var hasHexBuiltin = /* @__PURE__ */ (() => typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function")();
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
/**
* Convert byte array to hex string. Uses built-in function, when available.
* @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
*/
function bytesToHex(bytes) {
	abytes(bytes);
	if (hasHexBuiltin) return bytes.toHex();
	let hex = "";
	for (let i = 0; i < bytes.length; i++) hex += hexes[bytes[i]];
	return hex;
}
var asciis = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function asciiToBase16(ch) {
	if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0;
	if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10);
	if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10);
}
/**
* Convert hex string to byte array. Uses built-in function, when available.
* @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
*/
function hexToBytes(hex) {
	if (typeof hex !== "string") throw new Error("hex string expected, got " + typeof hex);
	if (hasHexBuiltin) return Uint8Array.fromHex(hex);
	const hl = hex.length;
	const al = hl / 2;
	if (hl % 2) throw new Error("hex string expected, got unpadded hex of length " + hl);
	const array = new Uint8Array(al);
	for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
		const n1 = asciiToBase16(hex.charCodeAt(hi));
		const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
		if (n1 === void 0 || n2 === void 0) {
			const char = hex[hi] + hex[hi + 1];
			throw new Error("hex string expected, got non-hex character \"" + char + "\" at index " + hi);
		}
		array[ai] = n1 * 16 + n2;
	}
	return array;
}
/**
* Converts string to bytes using UTF8 encoding.
* @example utf8ToBytes('abc') // Uint8Array.from([97, 98, 99])
*/
function utf8ToBytes(str) {
	if (typeof str !== "string") throw new Error("string expected");
	return new Uint8Array(new TextEncoder().encode(str));
}
/**
* Normalizes (non-hex) string or Uint8Array to Uint8Array.
* Warning: when Uint8Array is passed, it would NOT get copied.
* Keep in mind for future mutable operations.
*/
function toBytes(data) {
	if (typeof data === "string") data = utf8ToBytes(data);
	abytes(data);
	return data;
}
/** Copies several Uint8Arrays into one. */
function concatBytes(...arrays) {
	let sum = 0;
	for (let i = 0; i < arrays.length; i++) {
		const a = arrays[i];
		abytes(a);
		sum += a.length;
	}
	const res = new Uint8Array(sum);
	for (let i = 0, pad = 0; i < arrays.length; i++) {
		const a = arrays[i];
		res.set(a, pad);
		pad += a.length;
	}
	return res;
}
/** For runtime check if class implements interface */
var Hash = class {};
/** Wraps hash function, creating an interface on top of it */
function createHasher$1(hashCons) {
	const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
	const tmp = hashCons();
	hashC.outputLen = tmp.outputLen;
	hashC.blockLen = tmp.blockLen;
	hashC.create = () => hashCons();
	return hashC;
}
/** Cryptographically secure PRNG. Uses internal OS-level `crypto.getRandomValues`. */
function randomBytes(bytesLength = 32) {
	if (crypto$1 && typeof crypto$1.getRandomValues === "function") return crypto$1.getRandomValues(new Uint8Array(bytesLength));
	if (crypto$1 && typeof crypto$1.randomBytes === "function") return Uint8Array.from(crypto$1.randomBytes(bytesLength));
	throw new Error("crypto.getRandomValues must be defined");
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/esm/_md.js
/**
* Internal Merkle-Damgard hash utils.
* @module
*/
/** Polyfill for Safari 14. https://caniuse.com/mdn-javascript_builtins_dataview_setbiguint64 */
function setBigUint64(view, byteOffset, value, isLE) {
	if (typeof view.setBigUint64 === "function") return view.setBigUint64(byteOffset, value, isLE);
	const _32n = BigInt(32);
	const _u32_max = BigInt(4294967295);
	const wh = Number(value >> _32n & _u32_max);
	const wl = Number(value & _u32_max);
	const h = isLE ? 4 : 0;
	const l = isLE ? 0 : 4;
	view.setUint32(byteOffset + h, wh, isLE);
	view.setUint32(byteOffset + l, wl, isLE);
}
/** Choice: a ? b : c */
function Chi(a, b, c) {
	return a & b ^ ~a & c;
}
/** Majority function, true if any two inputs is true. */
function Maj(a, b, c) {
	return a & b ^ a & c ^ b & c;
}
/**
* Merkle-Damgard hash construction base class.
* Could be used to create MD5, RIPEMD, SHA1, SHA2.
*/
var HashMD = class extends Hash {
	constructor(blockLen, outputLen, padOffset, isLE) {
		super();
		this.finished = false;
		this.length = 0;
		this.pos = 0;
		this.destroyed = false;
		this.blockLen = blockLen;
		this.outputLen = outputLen;
		this.padOffset = padOffset;
		this.isLE = isLE;
		this.buffer = new Uint8Array(blockLen);
		this.view = createView(this.buffer);
	}
	update(data) {
		aexists(this);
		data = toBytes(data);
		abytes(data);
		const { view, buffer, blockLen } = this;
		const len = data.length;
		for (let pos = 0; pos < len;) {
			const take = Math.min(blockLen - this.pos, len - pos);
			if (take === blockLen) {
				const dataView = createView(data);
				for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
				continue;
			}
			buffer.set(data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			pos += take;
			if (this.pos === blockLen) {
				this.process(view, 0);
				this.pos = 0;
			}
		}
		this.length += data.length;
		this.roundClean();
		return this;
	}
	digestInto(out) {
		aexists(this);
		aoutput(out, this);
		this.finished = true;
		const { buffer, view, blockLen, isLE } = this;
		let { pos } = this;
		buffer[pos++] = 128;
		clean(this.buffer.subarray(pos));
		if (this.padOffset > blockLen - pos) {
			this.process(view, 0);
			pos = 0;
		}
		for (let i = pos; i < blockLen; i++) buffer[i] = 0;
		setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
		this.process(view, 0);
		const oview = createView(out);
		const len = this.outputLen;
		if (len % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
		const outLen = len / 4;
		const state = this.get();
		if (outLen > state.length) throw new Error("_sha2: outputLen bigger than state");
		for (let i = 0; i < outLen; i++) oview.setUint32(4 * i, state[i], isLE);
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
	_cloneInto(to) {
		to || (to = new this.constructor());
		to.set(...this.get());
		const { blockLen, buffer, length, finished, destroyed, pos } = this;
		to.destroyed = destroyed;
		to.finished = finished;
		to.length = length;
		to.pos = pos;
		if (length % blockLen) to.buffer.set(buffer);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
};
/**
* Initial SHA-2 state: fractional parts of square roots of first 16 primes 2..53.
* Check out `test/misc/sha2-gen-iv.js` for recomputation guide.
*/
/** Initial SHA256 state. Bits 0..32 of frac part of sqrt of primes 2..19 */
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]);
/** Initial SHA224 state. Bits 32..64 of frac part of sqrt of primes 23..53 */
var SHA224_IV = /* @__PURE__ */ Uint32Array.from([
	3238371032,
	914150663,
	812702999,
	4144912697,
	4290775857,
	1750603025,
	1694076839,
	3204075428
]);
/** Initial SHA512 state. Bits 0..64 of frac part of sqrt of primes 2..19 */
var SHA512_IV = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	4089235720,
	3144134277,
	2227873595,
	1013904242,
	4271175723,
	2773480762,
	1595750129,
	1359893119,
	2917565137,
	2600822924,
	725511199,
	528734635,
	4215389547,
	1541459225,
	327033209
]);
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/esm/_u64.js
/**
* Internal helpers for u64. BigUint64Array is too slow as per 2025, so we implement it using Uint32Array.
* @todo re-check https://issues.chromium.org/issues/42212588
* @module
*/
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
	if (le) return {
		h: Number(n & U32_MASK64),
		l: Number(n >> _32n & U32_MASK64)
	};
	return {
		h: Number(n >> _32n & U32_MASK64) | 0,
		l: Number(n & U32_MASK64) | 0
	};
}
function split(lst, le = false) {
	const len = lst.length;
	let Ah = new Uint32Array(len);
	let Al = new Uint32Array(len);
	for (let i = 0; i < len; i++) {
		const { h, l } = fromBig(lst[i], le);
		[Ah[i], Al[i]] = [h, l];
	}
	return [Ah, Al];
}
var shrSH = (h, _l, s) => h >>> s;
var shrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
function add(Ah, Al, Bh, Bl) {
	const l = (Al >>> 0) + (Bl >>> 0);
	return {
		h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
		l: l | 0
	};
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/esm/sha2.js
/**
* SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
* SHA256 is the fastest hash implementable in JS, even faster than Blake3.
* Check out [RFC 4634](https://datatracker.ietf.org/doc/html/rfc4634) and
* [FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).
* @module
*/
/**
* Round constants:
* First 32 bits of fractional parts of the cube roots of the first 64 primes 2..311)
*/
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]);
/** Reusable temporary buffer. "W" comes straight from spec. */
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends HashMD {
	constructor(outputLen = 32) {
		super(64, outputLen, 8, false);
		this.A = SHA256_IV[0] | 0;
		this.B = SHA256_IV[1] | 0;
		this.C = SHA256_IV[2] | 0;
		this.D = SHA256_IV[3] | 0;
		this.E = SHA256_IV[4] | 0;
		this.F = SHA256_IV[5] | 0;
		this.G = SHA256_IV[6] | 0;
		this.H = SHA256_IV[7] | 0;
	}
	get() {
		const { A, B, C, D, E, F, G, H } = this;
		return [
			A,
			B,
			C,
			D,
			E,
			F,
			G,
			H
		];
	}
	set(A, B, C, D, E, F, G, H) {
		this.A = A | 0;
		this.B = B | 0;
		this.C = C | 0;
		this.D = D | 0;
		this.E = E | 0;
		this.F = F | 0;
		this.G = G | 0;
		this.H = H | 0;
	}
	process(view, offset) {
		for (let i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);
		for (let i = 16; i < 64; i++) {
			const W15 = SHA256_W[i - 15];
			const W2 = SHA256_W[i - 2];
			const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
			const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
			SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
		}
		let { A, B, C, D, E, F, G, H } = this;
		for (let i = 0; i < 64; i++) {
			const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
			const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
			const T2 = (rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22)) + Maj(A, B, C) | 0;
			H = G;
			G = F;
			F = E;
			E = D + T1 | 0;
			D = C;
			C = B;
			B = A;
			A = T1 + T2 | 0;
		}
		A = A + this.A | 0;
		B = B + this.B | 0;
		C = C + this.C | 0;
		D = D + this.D | 0;
		E = E + this.E | 0;
		F = F + this.F | 0;
		G = G + this.G | 0;
		H = H + this.H | 0;
		this.set(A, B, C, D, E, F, G, H);
	}
	roundClean() {
		clean(SHA256_W);
	}
	destroy() {
		this.set(0, 0, 0, 0, 0, 0, 0, 0);
		clean(this.buffer);
	}
};
var SHA224 = class extends SHA256 {
	constructor() {
		super(28);
		this.A = SHA224_IV[0] | 0;
		this.B = SHA224_IV[1] | 0;
		this.C = SHA224_IV[2] | 0;
		this.D = SHA224_IV[3] | 0;
		this.E = SHA224_IV[4] | 0;
		this.F = SHA224_IV[5] | 0;
		this.G = SHA224_IV[6] | 0;
		this.H = SHA224_IV[7] | 0;
	}
};
var K512 = /* @__PURE__ */ (() => split([
	"0x428a2f98d728ae22",
	"0x7137449123ef65cd",
	"0xb5c0fbcfec4d3b2f",
	"0xe9b5dba58189dbbc",
	"0x3956c25bf348b538",
	"0x59f111f1b605d019",
	"0x923f82a4af194f9b",
	"0xab1c5ed5da6d8118",
	"0xd807aa98a3030242",
	"0x12835b0145706fbe",
	"0x243185be4ee4b28c",
	"0x550c7dc3d5ffb4e2",
	"0x72be5d74f27b896f",
	"0x80deb1fe3b1696b1",
	"0x9bdc06a725c71235",
	"0xc19bf174cf692694",
	"0xe49b69c19ef14ad2",
	"0xefbe4786384f25e3",
	"0x0fc19dc68b8cd5b5",
	"0x240ca1cc77ac9c65",
	"0x2de92c6f592b0275",
	"0x4a7484aa6ea6e483",
	"0x5cb0a9dcbd41fbd4",
	"0x76f988da831153b5",
	"0x983e5152ee66dfab",
	"0xa831c66d2db43210",
	"0xb00327c898fb213f",
	"0xbf597fc7beef0ee4",
	"0xc6e00bf33da88fc2",
	"0xd5a79147930aa725",
	"0x06ca6351e003826f",
	"0x142929670a0e6e70",
	"0x27b70a8546d22ffc",
	"0x2e1b21385c26c926",
	"0x4d2c6dfc5ac42aed",
	"0x53380d139d95b3df",
	"0x650a73548baf63de",
	"0x766a0abb3c77b2a8",
	"0x81c2c92e47edaee6",
	"0x92722c851482353b",
	"0xa2bfe8a14cf10364",
	"0xa81a664bbc423001",
	"0xc24b8b70d0f89791",
	"0xc76c51a30654be30",
	"0xd192e819d6ef5218",
	"0xd69906245565a910",
	"0xf40e35855771202a",
	"0x106aa07032bbd1b8",
	"0x19a4c116b8d2d0c8",
	"0x1e376c085141ab53",
	"0x2748774cdf8eeb99",
	"0x34b0bcb5e19b48a8",
	"0x391c0cb3c5c95a63",
	"0x4ed8aa4ae3418acb",
	"0x5b9cca4f7763e373",
	"0x682e6ff3d6b2b8a3",
	"0x748f82ee5defb2fc",
	"0x78a5636f43172f60",
	"0x84c87814a1f0ab72",
	"0x8cc702081a6439ec",
	"0x90befffa23631e28",
	"0xa4506cebde82bde9",
	"0xbef9a3f7b2c67915",
	"0xc67178f2e372532b",
	"0xca273eceea26619c",
	"0xd186b8c721c0c207",
	"0xeada7dd6cde0eb1e",
	"0xf57d4f7fee6ed178",
	"0x06f067aa72176fba",
	"0x0a637dc5a2c898a6",
	"0x113f9804bef90dae",
	"0x1b710b35131c471b",
	"0x28db77f523047d84",
	"0x32caab7b40c72493",
	"0x3c9ebe0a15c9bebc",
	"0x431d67c49c100d4c",
	"0x4cc5d4becb3e42b6",
	"0x597f299cfc657e2a",
	"0x5fcb6fab3ad6faec",
	"0x6c44198c4a475817"
].map((n) => BigInt(n))))();
var SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
var SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
var SHA512 = class extends HashMD {
	constructor(outputLen = 64) {
		super(128, outputLen, 16, false);
		this.Ah = SHA512_IV[0] | 0;
		this.Al = SHA512_IV[1] | 0;
		this.Bh = SHA512_IV[2] | 0;
		this.Bl = SHA512_IV[3] | 0;
		this.Ch = SHA512_IV[4] | 0;
		this.Cl = SHA512_IV[5] | 0;
		this.Dh = SHA512_IV[6] | 0;
		this.Dl = SHA512_IV[7] | 0;
		this.Eh = SHA512_IV[8] | 0;
		this.El = SHA512_IV[9] | 0;
		this.Fh = SHA512_IV[10] | 0;
		this.Fl = SHA512_IV[11] | 0;
		this.Gh = SHA512_IV[12] | 0;
		this.Gl = SHA512_IV[13] | 0;
		this.Hh = SHA512_IV[14] | 0;
		this.Hl = SHA512_IV[15] | 0;
	}
	get() {
		const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
		return [
			Ah,
			Al,
			Bh,
			Bl,
			Ch,
			Cl,
			Dh,
			Dl,
			Eh,
			El,
			Fh,
			Fl,
			Gh,
			Gl,
			Hh,
			Hl
		];
	}
	set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
		this.Ah = Ah | 0;
		this.Al = Al | 0;
		this.Bh = Bh | 0;
		this.Bl = Bl | 0;
		this.Ch = Ch | 0;
		this.Cl = Cl | 0;
		this.Dh = Dh | 0;
		this.Dl = Dl | 0;
		this.Eh = Eh | 0;
		this.El = El | 0;
		this.Fh = Fh | 0;
		this.Fl = Fl | 0;
		this.Gh = Gh | 0;
		this.Gl = Gl | 0;
		this.Hh = Hh | 0;
		this.Hl = Hl | 0;
	}
	process(view, offset) {
		for (let i = 0; i < 16; i++, offset += 4) {
			SHA512_W_H[i] = view.getUint32(offset);
			SHA512_W_L[i] = view.getUint32(offset += 4);
		}
		for (let i = 16; i < 80; i++) {
			const W15h = SHA512_W_H[i - 15] | 0;
			const W15l = SHA512_W_L[i - 15] | 0;
			const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
			const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
			const W2h = SHA512_W_H[i - 2] | 0;
			const W2l = SHA512_W_L[i - 2] | 0;
			const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
			const SUMl = add4L(s0l, rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6), SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
			const SUMh = add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
			SHA512_W_H[i] = SUMh | 0;
			SHA512_W_L[i] = SUMl | 0;
		}
		let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
		for (let i = 0; i < 80; i++) {
			const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
			const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
			const CHIh = Eh & Fh ^ ~Eh & Gh;
			const CHIl = El & Fl ^ ~El & Gl;
			const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
			const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
			const T1l = T1ll | 0;
			const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
			const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
			const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
			const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
			Hh = Gh | 0;
			Hl = Gl | 0;
			Gh = Fh | 0;
			Gl = Fl | 0;
			Fh = Eh | 0;
			Fl = El | 0;
			({h: Eh, l: El} = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
			Dh = Ch | 0;
			Dl = Cl | 0;
			Ch = Bh | 0;
			Cl = Bl | 0;
			Bh = Ah | 0;
			Bl = Al | 0;
			const All = add3L(T1l, sigma0l, MAJl);
			Ah = add3H(All, T1h, sigma0h, MAJh);
			Al = All | 0;
		}
		({h: Ah, l: Al} = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
		({h: Bh, l: Bl} = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
		({h: Ch, l: Cl} = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
		({h: Dh, l: Dl} = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
		({h: Eh, l: El} = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
		({h: Fh, l: Fl} = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
		({h: Gh, l: Gl} = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
		({h: Hh, l: Hl} = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
		this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
	}
	roundClean() {
		clean(SHA512_W_H, SHA512_W_L);
	}
	destroy() {
		clean(this.buffer);
		this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	}
};
/**
* SHA2-256 hash function from RFC 4634.
*
* It is the fastest JS hash, even faster than Blake3.
* To break sha256 using birthday attack, attackers need to try 2^128 hashes.
* BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
*/
var sha256 = /* @__PURE__ */ createHasher$1(() => new SHA256());
/** SHA2-224 hash function from RFC 4634 */
var sha224 = /* @__PURE__ */ createHasher$1(() => new SHA224());
/** SHA2-512 hash function from RFC 4634. */
var sha512 = /* @__PURE__ */ createHasher$1(() => new SHA512());
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/principal/principal.js
var JSON_KEY_PRINCIPAL = "__principal__";
var SELF_AUTHENTICATING_SUFFIX = 2;
var ANONYMOUS_SUFFIX = 4;
var MANAGEMENT_CANISTER_PRINCIPAL_TEXT_STR = "aaaaa-aa";
var Principal$1 = class Principal$1 {
	static anonymous() {
		return new this(new Uint8Array([ANONYMOUS_SUFFIX]));
	}
	/**
	* Utility method, returning the principal representing the management canister, decoded from the hex string `'aaaaa-aa'`
	* @returns {Principal} principal of the management canister
	*/
	static managementCanister() {
		return this.fromText(MANAGEMENT_CANISTER_PRINCIPAL_TEXT_STR);
	}
	static selfAuthenticating(publicKey) {
		const sha = sha224(publicKey);
		return new this(new Uint8Array([...sha, SELF_AUTHENTICATING_SUFFIX]));
	}
	static from(other) {
		if (typeof other === "string") return Principal$1.fromText(other);
		if (Object.getPrototypeOf(other) === Uint8Array.prototype) return new Principal$1(other);
		if (Principal$1.isPrincipal(other)) return new Principal$1(other._arr);
		throw new Error(`Impossible to convert ${JSON.stringify(other)} to Principal.`);
	}
	static fromHex(hex) {
		return new this(hexToBytes(hex));
	}
	static fromText(text) {
		let maybePrincipal = text;
		if (text.includes("__principal__")) {
			const obj = JSON.parse(text);
			if ("__principal__" in obj) maybePrincipal = obj[JSON_KEY_PRINCIPAL];
		}
		let arr = base32Decode(maybePrincipal.toLowerCase().replace(/-/g, ""));
		arr = arr.slice(4, arr.length);
		const principal = new this(arr);
		if (principal.toText() !== maybePrincipal) throw new Error(`Principal "${principal.toText()}" does not have a valid checksum (original value "${maybePrincipal}" may not be a valid Principal ID).`);
		return principal;
	}
	static fromUint8Array(arr) {
		return new this(arr);
	}
	static isPrincipal(other) {
		return other instanceof Principal$1 || typeof other === "object" && other !== null && "_isPrincipal" in other && other["_isPrincipal"] === true && "_arr" in other && other["_arr"] instanceof Uint8Array;
	}
	constructor(_arr) {
		this._arr = _arr;
		this._isPrincipal = true;
	}
	isAnonymous() {
		return this._arr.byteLength === 1 && this._arr[0] === ANONYMOUS_SUFFIX;
	}
	toUint8Array() {
		return this._arr;
	}
	toHex() {
		return bytesToHex(this._arr).toUpperCase();
	}
	toText() {
		const checksumArrayBuf = /* @__PURE__ */ new ArrayBuffer(4);
		new DataView(checksumArrayBuf).setUint32(0, getCrc32(this._arr));
		const checksum = new Uint8Array(checksumArrayBuf);
		const matches = base32Encode(new Uint8Array([...checksum, ...this._arr])).match(/.{1,5}/g);
		if (!matches) throw new Error();
		return matches.join("-");
	}
	toString() {
		return this.toText();
	}
	/**
	* Serializes to JSON
	* @returns {JsonnablePrincipal} a JSON object with a single key, {@link JSON_KEY_PRINCIPAL}, whose value is the principal as a string
	*/
	toJSON() {
		return { [JSON_KEY_PRINCIPAL]: this.toText() };
	}
	/**
	* Utility method taking a Principal to compare against. Used for determining canister ranges in certificate verification
	* @param {Principal} other - a {@link Principal} to compare
	* @returns {'lt' | 'eq' | 'gt'} `'lt' | 'eq' | 'gt'` a string, representing less than, equal to, or greater than
	*/
	compareTo(other) {
		for (let i = 0; i < Math.min(this._arr.length, other._arr.length); i++) {
			if (this._arr[i] < other._arr[i]) return "lt";
			if (this._arr[i] > other._arr[i]) return "gt";
		}
		if (this._arr.length < other._arr.length) return "lt";
		if (this._arr.length > other._arr.length) return "gt";
		return "eq";
	}
	/**
	* Utility method checking whether a provided Principal is less than or equal to the current one using the {@link Principal.compareTo} method
	* @param other a {@link Principal} to compare
	* @returns {boolean} boolean
	*/
	ltEq(other) {
		const cmp = this.compareTo(other);
		return cmp == "lt" || cmp == "eq";
	}
	/**
	* Utility method checking whether a provided Principal is greater than or equal to the current one using the {@link Principal.compareTo} method
	* @param other a {@link Principal} to compare
	* @returns {boolean} boolean
	*/
	gtEq(other) {
		const cmp = this.compareTo(other);
		return cmp == "gt" || cmp == "eq";
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/errors.js
var ErrorKindEnum;
(function(ErrorKindEnum) {
	ErrorKindEnum["Trust"] = "Trust";
	ErrorKindEnum["Protocol"] = "Protocol";
	ErrorKindEnum["Reject"] = "Reject";
	ErrorKindEnum["Transport"] = "Transport";
	ErrorKindEnum["External"] = "External";
	ErrorKindEnum["Limit"] = "Limit";
	ErrorKindEnum["Input"] = "Input";
	ErrorKindEnum["Unknown"] = "Unknown";
})(ErrorKindEnum || (ErrorKindEnum = {}));
/**
* Controls the level of detail included in error messages.
* - `Normal` (default): includes error message, call context, and HTTP details, but omits large binary fields (arg, certificate, nonce).
* - `Verbose`: same as Normal, but includes hex-encoded binary fields.
*
* To enable verbose mode: `ErrorCode.verbosity = ErrorVerbosity.Verbose`
*/
var ErrorVerbosity;
(function(ErrorVerbosity) {
	ErrorVerbosity["Normal"] = "normal";
	ErrorVerbosity["Verbose"] = "verbose";
})(ErrorVerbosity || (ErrorVerbosity = {}));
var VERBOSE_ONLY_KEYS = /* @__PURE__ */ new Set([
	"arg",
	"certificate",
	"nonce"
]);
function bytesReplacer(verbosity) {
	return (key, value) => {
		if (value instanceof Uint8Array) {
			if (verbosity === ErrorVerbosity.Normal && VERBOSE_ONLY_KEYS.has(key)) return `<${value.length} bytes, set ErrorCode.verbosity = ErrorVerbosity.Verbose to display>`;
			return `hex(${value.length}):${bytesToHex(value)}`;
		}
		return value;
	};
}
var ErrorCode = class ErrorCode {
	static {
		this.verbosity = ErrorVerbosity.Normal;
	}
	constructor(isCertified = false) {
		this.isCertified = isCertified;
	}
	toString() {
		let errorMessage = this.toErrorMessage();
		if (this.requestContext) errorMessage += `\nRequest context:\n  Request ID (hex): ${this.requestContext.requestId ? bytesToHex(this.requestContext.requestId) : "undefined"}\n  Sender pubkey (hex): ${bytesToHex(this.requestContext.senderPubKey)}\n  Sender signature (hex): ${bytesToHex(this.requestContext.senderSignature)}\n  Ingress expiry: ${this.requestContext.ingressExpiry.toString()}`;
		if (this.callContext) {
			errorMessage += `\nCall context:\n  Canister ID: ${this.callContext.canisterId.toText()}\n  Method name: ${this.callContext.methodName}`;
			if ("httpDetails" in this.callContext) errorMessage += `\n  HTTP details: ${JSON.stringify(this.callContext.httpDetails, bytesReplacer(ErrorCode.verbosity), 2)}`;
		}
		return errorMessage;
	}
};
/**
* An error that happens in the Agent. This is the root of all errors and should be used
* everywhere in the Agent code (this package).
*
* To know if the error is certified, use the `isCertified` getter.
*/
var AgentError = class AgentError extends Error {
	get code() {
		return this.cause.code;
	}
	set code(code) {
		this.cause.code = code;
	}
	get kind() {
		return this.cause.kind;
	}
	set kind(kind) {
		this.cause.kind = kind;
	}
	/**
	* Reads the `isCertified` property of the underlying error code.
	* @returns `true` if the error is certified, `false` otherwise.
	*/
	get isCertified() {
		return this.code.isCertified;
	}
	constructor(code, kind) {
		super(code.toString());
		this.name = "AgentError";
		this.cause = {
			code,
			kind
		};
		Object.setPrototypeOf(this, AgentError.prototype);
	}
	hasCode(code) {
		return this.code instanceof code;
	}
	toString() {
		return `${this.name} (${this.kind}): ${this.message}`;
	}
};
var ErrorKind = class extends AgentError {
	static fromCode(code) {
		return new this(code);
	}
};
var TrustError = class TrustError extends ErrorKind {
	constructor(code) {
		super(code, ErrorKindEnum.Trust);
		this.name = "TrustError";
		Object.setPrototypeOf(this, TrustError.prototype);
	}
};
var ProtocolError = class ProtocolError extends ErrorKind {
	constructor(code) {
		super(code, ErrorKindEnum.Protocol);
		this.name = "ProtocolError";
		Object.setPrototypeOf(this, ProtocolError.prototype);
	}
};
var RejectError = class RejectError extends ErrorKind {
	constructor(code) {
		super(code, ErrorKindEnum.Reject);
		this.name = "RejectError";
		Object.setPrototypeOf(this, RejectError.prototype);
	}
};
var TransportError = class TransportError extends ErrorKind {
	constructor(code) {
		super(code, ErrorKindEnum.Transport);
		this.name = "TransportError";
		Object.setPrototypeOf(this, TransportError.prototype);
	}
};
var ExternalError = class ExternalError extends ErrorKind {
	constructor(code) {
		super(code, ErrorKindEnum.External);
		this.name = "ExternalError";
		Object.setPrototypeOf(this, ExternalError.prototype);
	}
};
var InputError = class InputError extends ErrorKind {
	constructor(code) {
		super(code, ErrorKindEnum.Input);
		this.name = "InputError";
		Object.setPrototypeOf(this, InputError.prototype);
	}
};
var UnknownError = class UnknownError extends ErrorKind {
	constructor(code) {
		super(code, ErrorKindEnum.Unknown);
		this.name = "UnknownError";
		Object.setPrototypeOf(this, UnknownError.prototype);
	}
};
var CertificateVerificationErrorCode = class CertificateVerificationErrorCode extends ErrorCode {
	constructor(reason, error) {
		super();
		this.reason = reason;
		this.error = error;
		this.name = "CertificateVerificationErrorCode";
		Object.setPrototypeOf(this, CertificateVerificationErrorCode.prototype);
	}
	toErrorMessage() {
		let errorMessage = this.reason;
		if (this.error) errorMessage += `: ${formatUnknownError(this.error)}`;
		return `Certificate verification error: "${errorMessage}"`;
	}
};
var CertificateTimeErrorCode = class CertificateTimeErrorCode extends ErrorCode {
	constructor(maxAgeInMinutes, certificateTime, currentTime, timeDiffMsecs, ageType) {
		super();
		this.maxAgeInMinutes = maxAgeInMinutes;
		this.certificateTime = certificateTime;
		this.currentTime = currentTime;
		this.timeDiffMsecs = timeDiffMsecs;
		this.ageType = ageType;
		this.name = "CertificateTimeErrorCode";
		Object.setPrototypeOf(this, CertificateTimeErrorCode.prototype);
	}
	toErrorMessage() {
		return `Certificate is signed more than ${this.maxAgeInMinutes} minutes in the ${this.ageType}. Certificate time: ${this.certificateTime.toISOString()} Current time: ${this.currentTime.toISOString()} Clock drift: ${this.timeDiffMsecs}ms`;
	}
};
var CertificateHasTooManyDelegationsErrorCode = class CertificateHasTooManyDelegationsErrorCode extends ErrorCode {
	constructor() {
		super();
		this.name = "CertificateHasTooManyDelegationsErrorCode";
		Object.setPrototypeOf(this, CertificateHasTooManyDelegationsErrorCode.prototype);
	}
	toErrorMessage() {
		return "Certificate has too many delegations";
	}
};
var CertificateNotAuthorizedErrorCode = class CertificateNotAuthorizedErrorCode extends ErrorCode {
	constructor(canisterId, subnetId) {
		super();
		this.canisterId = canisterId;
		this.subnetId = subnetId;
		this.name = "CertificateNotAuthorizedErrorCode";
		Object.setPrototypeOf(this, CertificateNotAuthorizedErrorCode.prototype);
	}
	toErrorMessage() {
		return `The certificate contains a delegation that does not include the canister ${this.canisterId.toText()} in the canister_ranges field. Subnet ID: ${this.subnetId.toText()}`;
	}
};
var CertificateNotAuthorizedForSubnetErrorCode = class CertificateNotAuthorizedForSubnetErrorCode extends ErrorCode {
	constructor(subnetId) {
		super();
		this.subnetId = subnetId;
		this.name = "CertificateNotAuthorizedForSubnetErrorCode";
		Object.setPrototypeOf(this, CertificateNotAuthorizedForSubnetErrorCode.prototype);
	}
	toErrorMessage() {
		return `The certificate is not authorized for subnet ${this.subnetId.toText()}`;
	}
};
var LookupErrorCode = class LookupErrorCode extends ErrorCode {
	constructor(message, lookupStatus) {
		super();
		this.message = message;
		this.lookupStatus = lookupStatus;
		this.name = "LookupErrorCode";
		Object.setPrototypeOf(this, LookupErrorCode.prototype);
	}
	toErrorMessage() {
		return `${this.message}. Lookup status: ${this.lookupStatus}`;
	}
};
var MalformedLookupFoundValueErrorCode = class MalformedLookupFoundValueErrorCode extends ErrorCode {
	constructor(message) {
		super();
		this.message = message;
		this.name = "MalformedLookupFoundValueErrorCode";
		Object.setPrototypeOf(this, MalformedLookupFoundValueErrorCode.prototype);
	}
	toErrorMessage() {
		return this.message;
	}
};
var MissingLookupValueErrorCode = class MissingLookupValueErrorCode extends ErrorCode {
	constructor(message) {
		super();
		this.message = message;
		this.name = "MissingLookupValueErrorCode";
		Object.setPrototypeOf(this, MissingLookupValueErrorCode.prototype);
	}
	toErrorMessage() {
		return this.message;
	}
};
var DerKeyLengthMismatchErrorCode = class DerKeyLengthMismatchErrorCode extends ErrorCode {
	constructor(expectedLength, actualLength) {
		super();
		this.expectedLength = expectedLength;
		this.actualLength = actualLength;
		this.name = "DerKeyLengthMismatchErrorCode";
		Object.setPrototypeOf(this, DerKeyLengthMismatchErrorCode.prototype);
	}
	toErrorMessage() {
		return `BLS DER-encoded public key must be ${this.expectedLength} bytes long, but is ${this.actualLength} bytes long`;
	}
};
var DerPrefixMismatchErrorCode = class DerPrefixMismatchErrorCode extends ErrorCode {
	constructor(expectedPrefix, actualPrefix) {
		super();
		this.expectedPrefix = expectedPrefix;
		this.actualPrefix = actualPrefix;
		this.name = "DerPrefixMismatchErrorCode";
		Object.setPrototypeOf(this, DerPrefixMismatchErrorCode.prototype);
	}
	toErrorMessage() {
		return `BLS DER-encoded public key is invalid. Expected the following prefix: ${bytesToHex(this.expectedPrefix)}, but got ${bytesToHex(this.actualPrefix)}`;
	}
};
var DerDecodeLengthMismatchErrorCode = class DerDecodeLengthMismatchErrorCode extends ErrorCode {
	constructor(expectedLength, actualLength) {
		super();
		this.expectedLength = expectedLength;
		this.actualLength = actualLength;
		this.name = "DerDecodeLengthMismatchErrorCode";
		Object.setPrototypeOf(this, DerDecodeLengthMismatchErrorCode.prototype);
	}
	toErrorMessage() {
		return `DER payload mismatch: Expected length ${this.expectedLength}, actual length: ${this.actualLength}`;
	}
};
var DerDecodeErrorCode = class DerDecodeErrorCode extends ErrorCode {
	constructor(error) {
		super();
		this.error = error;
		this.name = "DerDecodeErrorCode";
		Object.setPrototypeOf(this, DerDecodeErrorCode.prototype);
	}
	toErrorMessage() {
		return `Failed to decode DER: ${this.error}`;
	}
};
var DerEncodeErrorCode = class DerEncodeErrorCode extends ErrorCode {
	constructor(error) {
		super();
		this.error = error;
		this.name = "DerEncodeErrorCode";
		Object.setPrototypeOf(this, DerEncodeErrorCode.prototype);
	}
	toErrorMessage() {
		return `Failed to encode DER: ${this.error}`;
	}
};
var CborDecodeErrorCode = class CborDecodeErrorCode extends ErrorCode {
	constructor(error, input) {
		super();
		this.error = error;
		this.input = input;
		this.name = "CborDecodeErrorCode";
		Object.setPrototypeOf(this, CborDecodeErrorCode.prototype);
	}
	toErrorMessage() {
		return `Failed to decode CBOR: ${formatUnknownError(this.error)}, input: ${bytesToHex(this.input)}`;
	}
};
var CborEncodeErrorCode = class CborEncodeErrorCode extends ErrorCode {
	constructor(error, value) {
		super();
		this.error = error;
		this.value = value;
		this.name = "CborEncodeErrorCode";
		Object.setPrototypeOf(this, CborEncodeErrorCode.prototype);
	}
	toErrorMessage() {
		return `Failed to encode CBOR: ${formatUnknownError(this.error)}, input: ${this.value}`;
	}
};
var TimeoutWaitingForResponseErrorCode = class TimeoutWaitingForResponseErrorCode extends ErrorCode {
	constructor(message, requestId, status) {
		super();
		this.message = message;
		this.requestId = requestId;
		this.status = status;
		this.name = "TimeoutWaitingForResponseErrorCode";
		Object.setPrototypeOf(this, TimeoutWaitingForResponseErrorCode.prototype);
	}
	toErrorMessage() {
		let errorMessage = `${this.message}\n`;
		if (this.requestId) errorMessage += `  Request ID: ${bytesToHex(this.requestId)}\n`;
		if (this.status) errorMessage += `  Request status: ${this.status}\n`;
		return errorMessage;
	}
};
var CertificateOutdatedErrorCode = class CertificateOutdatedErrorCode extends ErrorCode {
	constructor(maxIngressExpiryInMinutes, requestId, retryTimes) {
		super();
		this.maxIngressExpiryInMinutes = maxIngressExpiryInMinutes;
		this.requestId = requestId;
		this.retryTimes = retryTimes;
		this.name = "CertificateOutdatedErrorCode";
		Object.setPrototypeOf(this, CertificateOutdatedErrorCode.prototype);
	}
	toErrorMessage() {
		let errorMessage = `Certificate is stale (over ${this.maxIngressExpiryInMinutes} minutes). Is the computer's clock synchronized?\n  Request ID: ${bytesToHex(this.requestId)}\n`;
		if (this.retryTimes !== void 0) errorMessage += `  Retried ${this.retryTimes} times.`;
		return errorMessage;
	}
};
var CertifiedRejectErrorCode = class CertifiedRejectErrorCode extends ErrorCode {
	constructor(requestId, rejectCode, rejectMessage, rejectErrorCode) {
		super(true);
		this.requestId = requestId;
		this.rejectCode = rejectCode;
		this.rejectMessage = rejectMessage;
		this.rejectErrorCode = rejectErrorCode;
		this.name = "CertifiedRejectErrorCode";
		Object.setPrototypeOf(this, CertifiedRejectErrorCode.prototype);
	}
	toErrorMessage() {
		return `The replica returned a rejection error:\n  Request ID: ${bytesToHex(this.requestId)}\n  Reject code: ${this.rejectCode}\n  Reject text: ${this.rejectMessage}\n  Error code: ${this.rejectErrorCode}\n`;
	}
};
var UncertifiedRejectErrorCode = class UncertifiedRejectErrorCode extends ErrorCode {
	constructor(requestId, rejectCode, rejectMessage, rejectErrorCode, signatures) {
		super();
		this.requestId = requestId;
		this.rejectCode = rejectCode;
		this.rejectMessage = rejectMessage;
		this.rejectErrorCode = rejectErrorCode;
		this.signatures = signatures;
		this.name = "UncertifiedRejectErrorCode";
		Object.setPrototypeOf(this, UncertifiedRejectErrorCode.prototype);
	}
	toErrorMessage() {
		return `The replica returned a rejection error:\n  Request ID: ${bytesToHex(this.requestId)}\n  Reject code: ${this.rejectCode}\n  Reject text: ${this.rejectMessage}\n  Error code: ${this.rejectErrorCode}\n`;
	}
};
var UncertifiedRejectUpdateErrorCode = class UncertifiedRejectUpdateErrorCode extends ErrorCode {
	constructor(requestId, rejectCode, rejectMessage, rejectErrorCode) {
		super();
		this.requestId = requestId;
		this.rejectCode = rejectCode;
		this.rejectMessage = rejectMessage;
		this.rejectErrorCode = rejectErrorCode;
		this.name = "UncertifiedRejectUpdateErrorCode";
		Object.setPrototypeOf(this, UncertifiedRejectUpdateErrorCode.prototype);
	}
	toErrorMessage() {
		return `The replica returned a rejection error:\n  Request ID: ${bytesToHex(this.requestId)}\n  Reject code: ${this.rejectCode}\n  Reject text: ${this.rejectMessage}\n  Error code: ${this.rejectErrorCode}\n`;
	}
};
var RequestStatusDoneNoReplyErrorCode = class RequestStatusDoneNoReplyErrorCode extends ErrorCode {
	constructor(requestId) {
		super();
		this.requestId = requestId;
		this.name = "RequestStatusDoneNoReplyErrorCode";
		Object.setPrototypeOf(this, RequestStatusDoneNoReplyErrorCode.prototype);
	}
	toErrorMessage() {
		return `Call was marked as done but we never saw the reply:\n  Request ID: ${bytesToHex(this.requestId)}\n`;
	}
};
var MissingRootKeyErrorCode = class MissingRootKeyErrorCode extends ErrorCode {
	constructor(shouldFetchRootKey) {
		super();
		this.shouldFetchRootKey = shouldFetchRootKey;
		this.name = "MissingRootKeyErrorCode";
		Object.setPrototypeOf(this, MissingRootKeyErrorCode.prototype);
	}
	toErrorMessage() {
		if (this.shouldFetchRootKey === void 0) return "Agent is missing root key";
		return `Agent is missing root key and the shouldFetchRootKey value is set to ${this.shouldFetchRootKey}. The root key should only be unknown if you are in local development. Otherwise you should avoid fetching and use the default IC Root Key or the known root key of your environment.`;
	}
};
var HashValueErrorCode = class HashValueErrorCode extends ErrorCode {
	constructor(value) {
		super();
		this.value = value;
		this.name = "HashValueErrorCode";
		Object.setPrototypeOf(this, HashValueErrorCode.prototype);
	}
	toErrorMessage() {
		return `Attempt to hash a value of unsupported type: ${this.value}`;
	}
};
var IdentityInvalidErrorCode = class IdentityInvalidErrorCode extends ErrorCode {
	constructor() {
		super();
		this.name = "IdentityInvalidErrorCode";
		Object.setPrototypeOf(this, IdentityInvalidErrorCode.prototype);
	}
	toErrorMessage() {
		return "This identity has expired due this application's security policy. Please refresh your authentication.";
	}
};
var IngressExpiryInvalidErrorCode = class IngressExpiryInvalidErrorCode extends ErrorCode {
	constructor(message, providedIngressExpiryInMinutes) {
		super();
		this.message = message;
		this.providedIngressExpiryInMinutes = providedIngressExpiryInMinutes;
		this.name = "IngressExpiryInvalidErrorCode";
		Object.setPrototypeOf(this, IngressExpiryInvalidErrorCode.prototype);
	}
	toErrorMessage() {
		return `${this.message}. Provided ingress expiry time is ${this.providedIngressExpiryInMinutes} minutes.`;
	}
};
var MissingFetchErrorCode = class MissingFetchErrorCode extends ErrorCode {
	constructor() {
		super();
		this.name = "MissingFetchErrorCode";
		Object.setPrototypeOf(this, MissingFetchErrorCode.prototype);
	}
	toErrorMessage() {
		return "No fetch implementation available. Provide a `fetch` function in HttpAgentOptions or ensure `globalThis.fetch` is defined.";
	}
};
var CreateHttpAgentErrorCode = class CreateHttpAgentErrorCode extends ErrorCode {
	constructor() {
		super();
		this.name = "CreateHttpAgentErrorCode";
		Object.setPrototypeOf(this, CreateHttpAgentErrorCode.prototype);
	}
	toErrorMessage() {
		return "Failed to create agent from provided agent";
	}
};
var ExcessiveSignaturesErrorCode = class ExcessiveSignaturesErrorCode extends ErrorCode {
	constructor(signatureCount, maxExpected) {
		super();
		this.signatureCount = signatureCount;
		this.maxExpected = maxExpected;
		this.name = "ExcessiveSignaturesErrorCode";
		Object.setPrototypeOf(this, ExcessiveSignaturesErrorCode.prototype);
	}
	toErrorMessage() {
		return `Query response contains ${this.signatureCount} signatures, which exceeds the subnet size of ${this.maxExpected}. This suggests a malformed or malicious response.`;
	}
};
var MalformedSignatureErrorCode = class MalformedSignatureErrorCode extends ErrorCode {
	constructor(error) {
		super();
		this.error = error;
		this.name = "MalformedSignatureErrorCode";
		Object.setPrototypeOf(this, MalformedSignatureErrorCode.prototype);
	}
	toErrorMessage() {
		return `Query response contained a malformed signature: ${this.error}`;
	}
};
var MalformedPublicKeyErrorCode = class MalformedPublicKeyErrorCode extends ErrorCode {
	constructor() {
		super();
		this.name = "MalformedPublicKeyErrorCode";
		Object.setPrototypeOf(this, MalformedPublicKeyErrorCode.prototype);
	}
	toErrorMessage() {
		return "Read state response contained a malformed public key";
	}
};
var QuerySignatureVerificationFailedErrorCode = class QuerySignatureVerificationFailedErrorCode extends ErrorCode {
	constructor(nodeId) {
		super();
		this.nodeId = nodeId;
		this.name = "QuerySignatureVerificationFailedErrorCode";
		Object.setPrototypeOf(this, QuerySignatureVerificationFailedErrorCode.prototype);
	}
	toErrorMessage() {
		return `Query signature verification failed. Node ID: ${this.nodeId}`;
	}
};
var UnexpectedErrorCode = class UnexpectedErrorCode extends ErrorCode {
	constructor(error) {
		super();
		this.error = error;
		this.name = "UnexpectedErrorCode";
		Object.setPrototypeOf(this, UnexpectedErrorCode.prototype);
	}
	toErrorMessage() {
		return `Unexpected error: ${formatUnknownError(this.error)}`;
	}
};
var UnexpectedV4StatusErrorCode = class UnexpectedV4StatusErrorCode extends ErrorCode {
	constructor(status, requestId, response, rawCertificate) {
		super();
		this.status = status;
		this.requestId = requestId;
		this.response = response;
		this.rawCertificate = rawCertificate;
		this.name = "UnexpectedV4StatusErrorCode";
		Object.setPrototypeOf(this, UnexpectedV4StatusErrorCode.prototype);
	}
	toErrorMessage() {
		const replacer = (_k, v) => v instanceof Uint8Array ? `hex(${v.length}):${bytesToHex(v)}` : v;
		return `Unexpected request status in v4 sync response: "${this.status}"\n  Request ID (hex): ${bytesToHex(this.requestId)}\n  Response: ${JSON.stringify(this.response, replacer, 2)}`;
	}
};
var HashTreeDecodeErrorCode = class HashTreeDecodeErrorCode extends ErrorCode {
	constructor(error) {
		super();
		this.error = error;
		this.name = "HashTreeDecodeErrorCode";
		Object.setPrototypeOf(this, HashTreeDecodeErrorCode.prototype);
	}
	toErrorMessage() {
		return `Failed to decode certificate: ${this.error}`;
	}
};
var HttpErrorCode = class HttpErrorCode extends ErrorCode {
	constructor(status, statusText, headers, bodyText) {
		super();
		this.status = status;
		this.statusText = statusText;
		this.headers = headers;
		this.bodyText = bodyText;
		this.name = "HttpErrorCode";
		Object.setPrototypeOf(this, HttpErrorCode.prototype);
	}
	toErrorMessage() {
		let errorMessage = `HTTP request failed:
  Status: ${this.status} (${this.statusText})\n  Headers: ${JSON.stringify(this.headers, bytesReplacer(ErrorCode.verbosity))}\n`;
		if (this.bodyText) errorMessage += `  Body: ${this.bodyText}\n`;
		return errorMessage;
	}
};
var HttpV4ApiNotSupportedErrorCode = class HttpV4ApiNotSupportedErrorCode extends ErrorCode {
	constructor() {
		super();
		this.name = "HttpV4ApiNotSupportedErrorCode";
		Object.setPrototypeOf(this, HttpV4ApiNotSupportedErrorCode.prototype);
	}
	toErrorMessage() {
		return "HTTP request failed: v4 API is not supported";
	}
};
var HttpFetchErrorCode = class HttpFetchErrorCode extends ErrorCode {
	constructor(error) {
		super();
		this.error = error;
		this.name = "HttpFetchErrorCode";
		Object.setPrototypeOf(this, HttpFetchErrorCode.prototype);
	}
	toErrorMessage() {
		return `Failed to fetch HTTP request: ${formatUnknownError(this.error)}`;
	}
};
var MissingCanisterIdErrorCode = class MissingCanisterIdErrorCode extends ErrorCode {
	constructor(receivedCanisterId) {
		super();
		this.receivedCanisterId = receivedCanisterId;
		this.name = "MissingCanisterIdErrorCode";
		Object.setPrototypeOf(this, MissingCanisterIdErrorCode.prototype);
	}
	toErrorMessage() {
		return `Canister ID is required, but received ${typeof this.receivedCanisterId} instead. If you are using automatically generated declarations, this may be because your application is not setting the canister ID in process.env correctly.`;
	}
};
var InvalidReadStateRequestErrorCode = class InvalidReadStateRequestErrorCode extends ErrorCode {
	constructor(request) {
		super();
		this.request = request;
		this.name = "InvalidReadStateRequestErrorCode";
		Object.setPrototypeOf(this, InvalidReadStateRequestErrorCode.prototype);
	}
	toErrorMessage() {
		return `Invalid read state request: ${this.request}`;
	}
};
var ExpiryJsonDeserializeErrorCode = class ExpiryJsonDeserializeErrorCode extends ErrorCode {
	constructor(error) {
		super();
		this.error = error;
		this.name = "ExpiryJsonDeserializeErrorCode";
		Object.setPrototypeOf(this, ExpiryJsonDeserializeErrorCode.prototype);
	}
	toErrorMessage() {
		return `Failed to deserialize expiry: ${this.error}`;
	}
};
function formatUnknownError(error) {
	if (error instanceof Error) return error.stack ?? error.message;
	try {
		return JSON.stringify(error, bytesReplacer(ErrorCode.verbosity));
	} catch {
		return String(error);
	}
}
/**
* Special error used to indicate that a code path is unreachable.
*
* For internal use only.
*/
var UNREACHABLE_ERROR = /* @__PURE__ */ new Error("unreachable");
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/candid/utils/buffer.js
/**
* Concatenate multiple Uint8Arrays.
* @param uint8Arrays The Uint8Arrays to concatenate.
*/
function concat(...uint8Arrays) {
	const result = new Uint8Array(uint8Arrays.reduce((acc, curr) => acc + curr.byteLength, 0));
	let index = 0;
	for (const b of uint8Arrays) {
		result.set(b, index);
		index += b.byteLength;
	}
	return result;
}
/**
* A class that abstracts a pipe-like Uint8Array.
*/
var PipeArrayBuffer = class {
	/**
	* Save a checkpoint of the reading view (for backtracking)
	*/
	save() {
		return this._view;
	}
	/**
	* Restore a checkpoint of the reading view (for backtracking)
	* @param checkPoint a previously saved checkpoint
	*/
	restore(checkPoint) {
		if (!(checkPoint instanceof Uint8Array)) throw new Error("Checkpoint must be a Uint8Array");
		this._view = checkPoint;
	}
	/**
	* Creates a new instance of a pipe
	* @param buffer an optional buffer to start with
	* @param length an optional amount of bytes to use for the length.
	*/
	constructor(buffer, length = buffer?.byteLength || 0) {
		if (buffer && !(buffer instanceof Uint8Array)) try {
			buffer = uint8FromBufLike$1(buffer);
		} catch {
			throw new Error("Buffer must be a Uint8Array");
		}
		if (length < 0 || !Number.isInteger(length)) throw new Error("Length must be a non-negative integer");
		if (buffer && length > buffer.byteLength) throw new Error("Length cannot exceed buffer length");
		this._buffer = buffer || /* @__PURE__ */ new Uint8Array(0);
		this._view = new Uint8Array(this._buffer.buffer, 0, length);
	}
	get buffer() {
		return this._view.slice();
	}
	get byteLength() {
		return this._view.byteLength;
	}
	/**
	* Read `num` number of bytes from the front of the pipe.
	* @param num The number of bytes to read.
	*/
	read(num) {
		const result = this._view.subarray(0, num);
		this._view = this._view.subarray(num);
		return result.slice();
	}
	readUint8() {
		if (this._view.byteLength === 0) return;
		const result = this._view[0];
		this._view = this._view.subarray(1);
		return result;
	}
	/**
	* Write a buffer to the end of the pipe.
	* @param buf The bytes to write.
	*/
	write(buf) {
		if (!(buf instanceof Uint8Array)) throw new Error("Buffer must be a Uint8Array");
		const offset = this._view.byteLength;
		if (this._view.byteOffset + this._view.byteLength + buf.byteLength >= this._buffer.byteLength) this.alloc(buf.byteLength);
		else this._view = new Uint8Array(this._buffer.buffer, this._view.byteOffset, this._view.byteLength + buf.byteLength);
		this._view.set(buf, offset);
	}
	/**
	* Whether or not there is more data to read from the buffer
	*/
	get end() {
		return this._view.byteLength === 0;
	}
	/**
	* Allocate a fixed amount of memory in the buffer. This does not affect the view.
	* @param amount A number of bytes to add to the buffer.
	*/
	alloc(amount) {
		if (amount <= 0 || !Number.isInteger(amount)) throw new Error("Amount must be a positive integer");
		const b = new Uint8Array((this._buffer.byteLength + amount) * 1.2 | 0);
		const v = new Uint8Array(b.buffer, 0, this._view.byteLength + amount);
		v.set(this._view);
		this._buffer = b;
		this._view = v;
	}
};
/**
* Returns a true Uint8Array from an ArrayBufferLike object.
* @param bufLike a buffer-like object
* @returns Uint8Array
*/
function uint8FromBufLike$1(bufLike) {
	if (!bufLike) throw new Error("Input cannot be null or undefined");
	if (bufLike instanceof Uint8Array) return bufLike;
	if (bufLike instanceof ArrayBuffer) return new Uint8Array(bufLike);
	if (Array.isArray(bufLike)) return new Uint8Array(bufLike);
	if ("buffer" in bufLike) return uint8FromBufLike$1(bufLike.buffer);
	return new Uint8Array(bufLike);
}
/**
*
* @param u1 uint8Array 1
* @param u2 uint8Array 2
* @returns number - negative if u1 < u2, positive if u1 > u2, 0 if u1 === u2
*/
function compare(u1, u2) {
	if (u1.byteLength !== u2.byteLength) return u1.byteLength - u2.byteLength;
	for (let i = 0; i < u1.length; i++) if (u1[i] !== u2[i]) return u1[i] - u2[i];
	return 0;
}
/**
* Helpers to convert a Uint8Array to a DataView.
* @param uint8 Uint8Array
* @returns DataView
*/
function uint8ToDataView(uint8) {
	if (!(uint8 instanceof Uint8Array)) throw new Error("Input must be a Uint8Array");
	return new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/candid/utils/hash.js
/**
* Hashes a string to a number. Algorithm can be found here:
* https://caml.inria.fr/pub/papers/garrigue-polymorphic_variants-ml98.pdf
* @param s - string to hash
* @returns number representing hashed string
*/
function idlHash(s) {
	const array = new TextEncoder().encode(s);
	let h = 0;
	for (const c of array) h = (h * 223 + c) % 2 ** 32;
	return h;
}
/**
*
* @param label string
* @returns number representing hashed label
*/
function idlLabelToId(label) {
	if (/^_\d+_$/.test(label) || /^_0x[0-9a-fA-F]+_$/.test(label)) {
		const num = +label.slice(1, -1);
		if (Number.isSafeInteger(num) && num >= 0 && num < 2 ** 32) return num;
	}
	return idlHash(label);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/candid/utils/bigint-math.js
/**
* Equivalent to `Math.log2(n)` with support for `BigInt` values
* @param n bigint or integer
* @returns integer
*/
function ilog2(n) {
	const nBig = BigInt(n);
	if (n <= 0) throw new RangeError("Input must be positive");
	return nBig.toString(2).length - 1;
}
/**
* Equivalent to `2 ** n` with support for `BigInt` values
* (necessary for browser preprocessors which replace the `**` operator with `Math.pow`)
* @param n bigint or integer
* @returns bigint
*/
function iexp2(n) {
	const nBig = BigInt(n);
	if (n < 0) throw new RangeError("Input must be non-negative");
	return BigInt(1) << nBig;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/candid/utils/leb128.js
function eob() {
	throw new Error("unexpected end of buffer");
}
/**
*
* @param pipe Pipe from buffer-pipe
* @param num number
* @returns Uint8Array
*/
function safeRead(pipe, num) {
	if (pipe.byteLength < num) eob();
	return pipe.read(num);
}
/**
* @param pipe - PipeArrayBuffer simulating buffer-pipe api
*/
function safeReadUint8(pipe) {
	const byte = pipe.readUint8();
	if (byte === void 0) eob();
	return byte;
}
/**
* Encode a positive number (or bigint) into a Buffer. The number will be floored to the
* nearest integer.
* @param value The number to encode.
*/
function lebEncode(value) {
	if (typeof value === "number") value = BigInt(value);
	if (value < BigInt(0)) throw new Error("Cannot leb encode negative values.");
	const byteLength = (value === BigInt(0) ? 0 : ilog2(value)) + 1;
	const pipe = new PipeArrayBuffer(new Uint8Array(byteLength), 0);
	while (true) {
		const i = Number(value & BigInt(127));
		value /= BigInt(128);
		if (value === BigInt(0)) {
			pipe.write(new Uint8Array([i]));
			break;
		} else pipe.write(new Uint8Array([i | 128]));
	}
	return pipe.buffer;
}
/**
* Decode a leb encoded buffer into a bigint. The number will always be positive (does not
* support signed leb encoding).
* @param pipe A Buffer containing the leb encoded bits.
*/
function lebDecode(pipe) {
	let weight = BigInt(1);
	let value = BigInt(0);
	let byte;
	do {
		byte = safeReadUint8(pipe);
		value += BigInt(byte & 127).valueOf() * weight;
		weight *= BigInt(128);
	} while (byte >= 128);
	return value;
}
/**
* Encode a number (or bigint) into a Buffer, with support for negative numbers. The number
* will be floored to the nearest integer.
* @param value The number to encode.
*/
function slebEncode(value) {
	if (typeof value === "number") value = BigInt(value);
	const isNeg = value < BigInt(0);
	if (isNeg) value = -value - BigInt(1);
	const byteLength = (value === BigInt(0) ? 0 : ilog2(value)) + 1;
	const pipe = new PipeArrayBuffer(new Uint8Array(byteLength), 0);
	while (true) {
		const i = getLowerBytes(value);
		value /= BigInt(128);
		if (isNeg && value === BigInt(0) && (i & 64) !== 0 || !isNeg && value === BigInt(0) && (i & 64) === 0) {
			pipe.write(new Uint8Array([i]));
			break;
		} else pipe.write(new Uint8Array([i | 128]));
	}
	function getLowerBytes(num) {
		const bytes = num % BigInt(128);
		if (isNeg) return Number(BigInt(128) - bytes - BigInt(1));
		return Number(bytes);
	}
	return pipe.buffer;
}
/**
* Decode a leb encoded buffer into a bigint. The number is decoded with support for negative
* signed-leb encoding.
* @param pipe A Buffer containing the signed leb encoded bits.
*/
function slebDecode(pipe) {
	const pipeView = new Uint8Array(pipe.buffer);
	let len = 0;
	for (; len < pipeView.byteLength; len++) if (pipeView[len] < 128) {
		if ((pipeView[len] & 64) === 0) return lebDecode(pipe);
		break;
	}
	const bytes = new Uint8Array(safeRead(pipe, len + 1));
	let value = BigInt(0);
	for (let i = bytes.byteLength - 1; i >= 0; i--) value = value * BigInt(128) + BigInt(128 - (bytes[i] & 127) - 1);
	return -value - BigInt(1);
}
/**
*
* @param value bigint or number
* @param byteLength number
* @returns Uint8Array
*/
function writeUIntLE(value, byteLength) {
	if (BigInt(value) < BigInt(0)) throw new Error("Cannot write negative values.");
	return writeIntLE(value, byteLength);
}
/**
*
* @param value - bigint or number
* @param byteLength - number
* @returns Uint8Array
*/
function writeIntLE(value, byteLength) {
	value = BigInt(value);
	const pipe = new PipeArrayBuffer(new Uint8Array(Math.min(1, byteLength)), 0);
	let i = 0;
	let mul = BigInt(256);
	let sub = BigInt(0);
	let byte = Number(value % mul);
	pipe.write(new Uint8Array([byte]));
	while (++i < byteLength) {
		if (value < 0 && sub === BigInt(0) && byte !== 0) sub = BigInt(1);
		byte = Number((value / mul - sub) % BigInt(256));
		pipe.write(new Uint8Array([byte]));
		mul *= BigInt(256);
	}
	return pipe.buffer;
}
/**
*
* @param pipe Pipe from buffer-pipe
* @param byteLength number
* @returns bigint
*/
function readUIntLE(pipe, byteLength) {
	if (byteLength <= 0 || !Number.isInteger(byteLength)) throw new Error("Byte length must be a positive integer");
	let val = BigInt(safeReadUint8(pipe));
	let mul = BigInt(1);
	let i = 0;
	while (++i < byteLength) {
		mul *= BigInt(256);
		const byte = BigInt(safeReadUint8(pipe));
		val = val + mul * byte;
	}
	return val;
}
/**
*
* @param pipe Pipe from buffer-pipe
* @param byteLength number
* @returns bigint
*/
function readIntLE(pipe, byteLength) {
	if (byteLength <= 0 || !Number.isInteger(byteLength)) throw new Error("Byte length must be a positive integer");
	let val = readUIntLE(pipe, byteLength);
	const mul = BigInt(2) ** (BigInt(8) * BigInt(byteLength - 1) + BigInt(7));
	if (val >= mul) val -= mul * BigInt(2);
	return val;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/candid/idl.js
var idl_exports = /* @__PURE__ */ __exportAll({
	Bool: () => Bool,
	BoolClass: () => BoolClass,
	CandidDecodeError: () => CandidDecodeError,
	ConstructType: () => ConstructType,
	Empty: () => Empty,
	EmptyClass: () => EmptyClass,
	FixedIntClass: () => FixedIntClass,
	FixedNatClass: () => FixedNatClass,
	Float32: () => Float32,
	Float64: () => Float64,
	FloatClass: () => FloatClass,
	Func: () => Func,
	FuncClass: () => FuncClass,
	Int: () => Int,
	Int16: () => Int16,
	Int32: () => Int32,
	Int64: () => Int64,
	Int8: () => Int8,
	IntClass: () => IntClass,
	Nat: () => Nat,
	Nat16: () => Nat16,
	Nat32: () => Nat32,
	Nat64: () => Nat64,
	Nat8: () => Nat8,
	NatClass: () => NatClass,
	Null: () => Null,
	NullClass: () => NullClass,
	Opt: () => Opt,
	OptClass: () => OptClass,
	PrimitiveType: () => PrimitiveType,
	Principal: () => Principal,
	PrincipalClass: () => PrincipalClass,
	Rec: () => Rec,
	RecClass: () => RecClass,
	Record: () => Record,
	RecordClass: () => RecordClass,
	Reserved: () => Reserved,
	ReservedClass: () => ReservedClass,
	Service: () => Service,
	ServiceClass: () => ServiceClass,
	Text: () => Text,
	TextClass: () => TextClass,
	Tuple: () => Tuple,
	TupleClass: () => TupleClass,
	Type: () => Type,
	Unknown: () => Unknown,
	UnknownClass: () => UnknownClass,
	Variant: () => Variant$1,
	VariantClass: () => VariantClass,
	Vec: () => Vec,
	VecClass: () => VecClass,
	Visitor: () => Visitor,
	decode: () => decode$1,
	encode: () => encode$1,
	resetSubtypeCache: () => resetSubtypeCache,
	subtype: () => subtype
});
/**
* This module provides a combinator library to create serializers/deserializers
* between JavaScript values and IDL used by canisters on the Internet Computer,
* as documented at https://github.com/dfinity/candid/blob/119703ba342d2fef6ab4972d2541b9fe36ae8e36/spec/Candid.md
*/
/**
* Error thrown when candid decoding fails due to a type mismatch
* between the expected and received types.
*/
var CandidDecodeError = class CandidDecodeError extends Error {
	constructor(message) {
		super(message);
		this.name = "CandidDecodeError";
		Object.setPrototypeOf(this, CandidDecodeError.prototype);
	}
};
var IDLTypeIds;
(function(IDLTypeIds) {
	IDLTypeIds[IDLTypeIds["Null"] = -1] = "Null";
	IDLTypeIds[IDLTypeIds["Bool"] = -2] = "Bool";
	IDLTypeIds[IDLTypeIds["Nat"] = -3] = "Nat";
	IDLTypeIds[IDLTypeIds["Int"] = -4] = "Int";
	IDLTypeIds[IDLTypeIds["Float32"] = -13] = "Float32";
	IDLTypeIds[IDLTypeIds["Float64"] = -14] = "Float64";
	IDLTypeIds[IDLTypeIds["Text"] = -15] = "Text";
	IDLTypeIds[IDLTypeIds["Reserved"] = -16] = "Reserved";
	IDLTypeIds[IDLTypeIds["Empty"] = -17] = "Empty";
	IDLTypeIds[IDLTypeIds["Opt"] = -18] = "Opt";
	IDLTypeIds[IDLTypeIds["Vector"] = -19] = "Vector";
	IDLTypeIds[IDLTypeIds["Record"] = -20] = "Record";
	IDLTypeIds[IDLTypeIds["Variant"] = -21] = "Variant";
	IDLTypeIds[IDLTypeIds["Func"] = -22] = "Func";
	IDLTypeIds[IDLTypeIds["Service"] = -23] = "Service";
	IDLTypeIds[IDLTypeIds["Principal"] = -24] = "Principal";
})(IDLTypeIds || (IDLTypeIds = {}));
var magicNumber = "DIDL";
var magicNumberBytes = new TextEncoder().encode(magicNumber);
var toReadableString_max = 400;
function zipWith(xs, ys, f) {
	return xs.map((x, i) => f(x, ys[i]));
}
/**
* An IDL Type Table, which precedes the data in the stream.
*/
var TypeTable = class {
	constructor() {
		this._typs = [];
		this._idx = /* @__PURE__ */ new Map();
		this._idxRefCount = /* @__PURE__ */ new Map();
	}
	has(obj) {
		return this._idx.has(obj.name);
	}
	add(type, buf) {
		const idx = this._typs.length;
		this._idx.set(type.name, idx);
		this._idxRefCount.set(idx, 1);
		this._typs.push(buf);
	}
	merge(obj, knot) {
		const idx = this._idx.get(obj.name);
		const knotIdx = this._idx.get(knot);
		if (idx === void 0) throw new Error(`Missing type index for ${obj}`);
		if (knotIdx === void 0) throw new Error(`Missing type index for ${knot}`);
		this._typs[idx] = this._typs[knotIdx];
		const idxRefCount = this._getIdxRefCount(idx);
		const knotRefCount = this._getIdxRefCount(knotIdx);
		this._idxRefCount.set(idx, idxRefCount + knotRefCount);
		this._idx.set(knot, idx);
		this._idxRefCount.set(knotIdx, 0);
		this._compactFromEnd();
	}
	_getIdxRefCount(idx) {
		return this._idxRefCount.get(idx) || 0;
	}
	_compactFromEnd() {
		while (this._typs.length > 0) {
			const lastIndex = this._typs.length - 1;
			if (this._getIdxRefCount(lastIndex) > 0) break;
			this._typs.pop();
			this._idxRefCount.delete(lastIndex);
		}
	}
	encode() {
		return concat(lebEncode(this._typs.length), concat(...this._typs));
	}
	indexOf(typeName) {
		if (!this._idx.has(typeName)) throw new Error(`Missing type index for ${typeName}`);
		return slebEncode(this._idx.get(typeName) || 0);
	}
};
var Visitor = class {
	visitType(_t, _data) {
		throw new Error("Not implemented");
	}
	visitPrimitive(t, data) {
		return this.visitType(t, data);
	}
	visitEmpty(t, data) {
		return this.visitPrimitive(t, data);
	}
	visitBool(t, data) {
		return this.visitPrimitive(t, data);
	}
	visitNull(t, data) {
		return this.visitPrimitive(t, data);
	}
	visitReserved(t, data) {
		return this.visitPrimitive(t, data);
	}
	visitText(t, data) {
		return this.visitPrimitive(t, data);
	}
	visitNumber(t, data) {
		return this.visitPrimitive(t, data);
	}
	visitInt(t, data) {
		return this.visitNumber(t, data);
	}
	visitNat(t, data) {
		return this.visitNumber(t, data);
	}
	visitFloat(t, data) {
		return this.visitPrimitive(t, data);
	}
	visitFixedInt(t, data) {
		return this.visitNumber(t, data);
	}
	visitFixedNat(t, data) {
		return this.visitNumber(t, data);
	}
	visitPrincipal(t, data) {
		return this.visitPrimitive(t, data);
	}
	visitConstruct(t, data) {
		return this.visitType(t, data);
	}
	visitVec(t, _ty, data) {
		return this.visitConstruct(t, data);
	}
	visitOpt(t, _ty, data) {
		return this.visitConstruct(t, data);
	}
	visitRecord(t, _fields, data) {
		return this.visitConstruct(t, data);
	}
	visitTuple(t, components, data) {
		const fields = components.map((ty, i) => [`_${i}_`, ty]);
		return this.visitRecord(t, fields, data);
	}
	visitVariant(t, _fields, data) {
		return this.visitConstruct(t, data);
	}
	visitRec(_t, ty, data) {
		return this.visitConstruct(ty, data);
	}
	visitFunc(t, data) {
		return this.visitConstruct(t, data);
	}
	visitService(t, data) {
		return this.visitConstruct(t, data);
	}
};
var IdlTypeName;
(function(IdlTypeName) {
	IdlTypeName["EmptyClass"] = "__IDL_EmptyClass__";
	IdlTypeName["UnknownClass"] = "__IDL_UnknownClass__";
	IdlTypeName["BoolClass"] = "__IDL_BoolClass__";
	IdlTypeName["NullClass"] = "__IDL_NullClass__";
	IdlTypeName["ReservedClass"] = "__IDL_ReservedClass__";
	IdlTypeName["TextClass"] = "__IDL_TextClass__";
	IdlTypeName["IntClass"] = "__IDL_IntClass__";
	IdlTypeName["NatClass"] = "__IDL_NatClass__";
	IdlTypeName["FloatClass"] = "__IDL_FloatClass__";
	IdlTypeName["FixedIntClass"] = "__IDL_FixedIntClass__";
	IdlTypeName["FixedNatClass"] = "__IDL_FixedNatClass__";
	IdlTypeName["VecClass"] = "__IDL_VecClass__";
	IdlTypeName["OptClass"] = "__IDL_OptClass__";
	IdlTypeName["RecordClass"] = "__IDL_RecordClass__";
	IdlTypeName["TupleClass"] = "__IDL_TupleClass__";
	IdlTypeName["VariantClass"] = "__IDL_VariantClass__";
	IdlTypeName["RecClass"] = "__IDL_RecClass__";
	IdlTypeName["PrincipalClass"] = "__IDL_PrincipalClass__";
	IdlTypeName["FuncClass"] = "__IDL_FuncClass__";
	IdlTypeName["ServiceClass"] = "__IDL_ServiceClass__";
})(IdlTypeName || (IdlTypeName = {}));
/**
* Represents an IDL type.
*/
var Type = class {
	display() {
		return this.name;
	}
	valueToString(x) {
		return toReadableString(x);
	}
	buildTypeTable(typeTable) {
		if (!typeTable.has(this)) this._buildTypeTableImpl(typeTable);
	}
};
var PrimitiveType = class extends Type {
	checkType(t) {
		if (this.name !== t.name) throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
		return t;
	}
	_buildTypeTableImpl(_typeTable) {}
};
var ConstructType = class extends Type {
	checkType(t) {
		if (t instanceof RecClass) {
			const ty = t.getType();
			if (typeof ty === "undefined") throw new CandidDecodeError("Type mismatch: cannot decode from uninitialized recursive type");
			return ty;
		}
		throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
	}
	encodeType(typeTable) {
		return typeTable.indexOf(this.name);
	}
};
/**
* Represents an IDL Empty, a type which has no inhabitants.
* Since no values exist for this type, it cannot be serialised or deserialised.
* Result types like `Result<Text, Empty>` should always succeed.
*/
var EmptyClass = class extends PrimitiveType {
	get typeName() {
		return IdlTypeName.EmptyClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.EmptyClass;
	}
	accept(v, d) {
		return v.visitEmpty(this, d);
	}
	covariant(x) {
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue() {
		throw new Error("Empty cannot appear as a function argument");
	}
	valueToString() {
		throw new Error("Empty cannot appear as a value");
	}
	encodeType() {
		return slebEncode(IDLTypeIds.Empty);
	}
	decodeValue() {
		throw new Error("Empty cannot appear as an output");
	}
	get name() {
		return "empty";
	}
};
/**
* Represents an IDL Unknown, a placeholder type for deserialization only.
* When decoding a value as Unknown, all fields will be retained but the names are only available in
* hashed form.
* A deserialized unknown will offer it's actual type by calling the `type()` function.
* Unknown cannot be serialized and attempting to do so will throw an error.
*/
var UnknownClass = class extends Type {
	get typeName() {
		return IdlTypeName.UnknownClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.UnknownClass;
	}
	checkType(_t) {
		throw new Error("Method not implemented for unknown.");
	}
	accept(v, d) {
		throw v.visitType(this, d);
	}
	covariant(x) {
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue() {
		throw new Error("Unknown cannot appear as a function argument");
	}
	valueToString() {
		throw new Error("Unknown cannot appear as a value");
	}
	encodeType() {
		throw new Error("Unknown cannot be serialized");
	}
	decodeValue(b, t) {
		let decodedValue = t.decodeValue(b, t);
		if (Object(decodedValue) !== decodedValue) decodedValue = Object(decodedValue);
		let typeFunc;
		if (t instanceof RecClass) typeFunc = () => t.getType();
		else typeFunc = () => t;
		Object.defineProperty(decodedValue, "type", {
			value: typeFunc,
			writable: true,
			enumerable: false,
			configurable: true
		});
		return decodedValue;
	}
	_buildTypeTableImpl() {
		throw new Error("Unknown cannot be serialized");
	}
	get name() {
		return "Unknown";
	}
};
/**
* Represents an IDL Bool
*/
var BoolClass = class extends PrimitiveType {
	get typeName() {
		return IdlTypeName.BoolClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.BoolClass;
	}
	accept(v, d) {
		return v.visitBool(this, d);
	}
	covariant(x) {
		if (typeof x === "boolean") return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		return new Uint8Array([x ? 1 : 0]);
	}
	encodeType() {
		return slebEncode(IDLTypeIds.Bool);
	}
	decodeValue(b, t) {
		this.checkType(t);
		switch (safeReadUint8(b)) {
			case 0: return false;
			case 1: return true;
			default: throw new Error("Boolean value out of range");
		}
	}
	get name() {
		return "bool";
	}
};
/**
* Represents an IDL Null
*/
var NullClass = class extends PrimitiveType {
	get typeName() {
		return IdlTypeName.NullClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.NullClass;
	}
	accept(v, d) {
		return v.visitNull(this, d);
	}
	covariant(x) {
		if (x === null) return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue() {
		return /* @__PURE__ */ new Uint8Array(0);
	}
	encodeType() {
		return slebEncode(IDLTypeIds.Null);
	}
	decodeValue(_b, t) {
		this.checkType(t);
		return null;
	}
	get name() {
		return "null";
	}
};
/**
* Represents an IDL Reserved
*/
var ReservedClass = class extends PrimitiveType {
	get typeName() {
		return IdlTypeName.ReservedClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.ReservedClass;
	}
	accept(v, d) {
		return v.visitReserved(this, d);
	}
	covariant(_x) {
		return true;
	}
	encodeValue() {
		return /* @__PURE__ */ new Uint8Array(0);
	}
	encodeType() {
		return slebEncode(IDLTypeIds.Reserved);
	}
	decodeValue(b, t) {
		if (t.name !== this.name) t.decodeValue(b, t);
		return null;
	}
	get name() {
		return "reserved";
	}
};
/**
* Represents an IDL Text
*/
var TextClass = class extends PrimitiveType {
	get typeName() {
		return IdlTypeName.TextClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.TextClass;
	}
	accept(v, d) {
		return v.visitText(this, d);
	}
	covariant(x) {
		if (typeof x === "string") return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		const buf = new TextEncoder().encode(x);
		return concat(lebEncode(buf.byteLength), buf);
	}
	encodeType() {
		return slebEncode(IDLTypeIds.Text);
	}
	decodeValue(b, t) {
		this.checkType(t);
		const len = lebDecode(b);
		const buf = safeRead(b, Number(len));
		return new TextDecoder("utf8", { fatal: true }).decode(buf);
	}
	get name() {
		return "text";
	}
	valueToString(x) {
		return `"${x}"`;
	}
};
/**
* Represents an IDL Int
*/
var IntClass = class extends PrimitiveType {
	get typeName() {
		return IdlTypeName.IntClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.IntClass;
	}
	accept(v, d) {
		return v.visitInt(this, d);
	}
	covariant(x) {
		if (typeof x === "bigint" || Number.isInteger(x)) return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		return slebEncode(x);
	}
	encodeType() {
		return slebEncode(IDLTypeIds.Int);
	}
	decodeValue(b, t) {
		this.checkType(t);
		return slebDecode(b);
	}
	get name() {
		return "int";
	}
	valueToString(x) {
		return x.toString();
	}
};
/**
* Represents an IDL Nat
*/
var NatClass = class extends PrimitiveType {
	get typeName() {
		return IdlTypeName.NatClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.NatClass;
	}
	accept(v, d) {
		return v.visitNat(this, d);
	}
	covariant(x) {
		if (typeof x === "bigint" && x >= BigInt(0) || Number.isInteger(x) && x >= 0) return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		return lebEncode(x);
	}
	encodeType() {
		return slebEncode(IDLTypeIds.Nat);
	}
	decodeValue(b, t) {
		this.checkType(t);
		return lebDecode(b);
	}
	get name() {
		return "nat";
	}
	valueToString(x) {
		return x.toString();
	}
};
/**
* Represents an IDL Float
*/
var FloatClass = class extends PrimitiveType {
	get typeName() {
		return IdlTypeName.FloatClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.FloatClass;
	}
	constructor(_bits) {
		super();
		this._bits = _bits;
		if (_bits !== 32 && _bits !== 64) throw new Error("not a valid float type");
	}
	accept(v, d) {
		return v.visitFloat(this, d);
	}
	covariant(x) {
		if (typeof x === "number" || x instanceof Number) return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		const buf = /* @__PURE__ */ new ArrayBuffer(this._bits / 8);
		const view = new DataView(buf);
		if (this._bits === 32) view.setFloat32(0, x, true);
		else view.setFloat64(0, x, true);
		return new Uint8Array(buf);
	}
	encodeType() {
		return slebEncode(this._bits === 32 ? IDLTypeIds.Float32 : IDLTypeIds.Float64);
	}
	decodeValue(b, t) {
		this.checkType(t);
		const view = uint8ToDataView(safeRead(b, this._bits / 8));
		if (this._bits === 32) return view.getFloat32(0, true);
		return view.getFloat64(0, true);
	}
	get name() {
		return `float${this._bits}`;
	}
	valueToString(x) {
		return x.toString();
	}
};
/**
* Represents an IDL fixed-width Int(n)
*/
var FixedIntClass = class extends PrimitiveType {
	get typeName() {
		return IdlTypeName.FixedIntClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.FixedIntClass;
	}
	constructor(_bits) {
		super();
		this._bits = _bits;
	}
	accept(v, d) {
		return v.visitFixedInt(this, d);
	}
	covariant(x) {
		const min = iexp2(this._bits - 1) * BigInt(-1);
		const max = iexp2(this._bits - 1) - BigInt(1);
		if (typeof x === "bigint") {
			if (x >= min && x <= max) return true;
		} else if (Number.isInteger(x)) {
			const v = BigInt(x);
			if (v >= min && v <= max) return true;
		}
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		return writeIntLE(x, this._bits / 8);
	}
	encodeType() {
		return slebEncode(-9 - (Math.log2(this._bits) - 3));
	}
	decodeValue(b, t) {
		this.checkType(t);
		const num = readIntLE(b, this._bits / 8);
		if (this._bits <= 32) return Number(num);
		return num;
	}
	get name() {
		return `int${this._bits}`;
	}
	valueToString(x) {
		return x.toString();
	}
};
/**
* Represents an IDL fixed-width Nat(n)
*/
var FixedNatClass = class extends PrimitiveType {
	get typeName() {
		return IdlTypeName.FixedNatClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.FixedNatClass;
	}
	constructor(_bits) {
		super();
		this._bits = _bits;
	}
	accept(v, d) {
		return v.visitFixedNat(this, d);
	}
	covariant(x) {
		const max = iexp2(this._bits);
		if (typeof x === "bigint" && x >= BigInt(0)) {
			if (x < max) return true;
		} else if (Number.isInteger(x) && x >= 0) {
			if (BigInt(x) < max) return true;
		}
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		return writeUIntLE(x, this._bits / 8);
	}
	encodeType() {
		return slebEncode(-5 - (Math.log2(this._bits) - 3));
	}
	decodeValue(b, t) {
		this.checkType(t);
		const num = readUIntLE(b, this._bits / 8);
		if (this._bits <= 32) return Number(num);
		return num;
	}
	get name() {
		return `nat${this._bits}`;
	}
	valueToString(x) {
		return x.toString();
	}
};
/**
* Represents an IDL Array
*
* Arrays of fixed-sized nat/int type (e.g. nat8), are encoded from and decoded to TypedArrays (e.g. Uint8Array).
* Arrays of float or other non-primitive types are encoded/decoded as untyped array in Javascript.
* @param {Type} t
*/
var VecClass = class VecClass extends ConstructType {
	get typeName() {
		return IdlTypeName.VecClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.VecClass;
	}
	constructor(_type) {
		super();
		this._type = _type;
		this._blobOptimization = false;
		if (_type instanceof FixedNatClass && _type._bits === 8) this._blobOptimization = true;
	}
	accept(v, d) {
		return v.visitVec(this, this._type, d);
	}
	covariant(x) {
		const bits = this._type instanceof FixedNatClass ? this._type._bits : this._type instanceof FixedIntClass ? this._type._bits : 0;
		if (ArrayBuffer.isView(x) && bits == x.BYTES_PER_ELEMENT * 8 || Array.isArray(x) && x.every((v, idx) => {
			try {
				return this._type.covariant(v);
			} catch (e) {
				throw new Error(`Invalid ${this.display()} argument: \n\nindex ${idx} -> ${e.message}`, { cause: e });
			}
		})) return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		const len = lebEncode(x.length);
		if (this._blobOptimization) return concat(len, new Uint8Array(x));
		if (ArrayBuffer.isView(x)) {
			if (x instanceof Int16Array || x instanceof Uint16Array) {
				const buffer = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(x.length * 2));
				for (let i = 0; i < x.length; i++) if (x instanceof Int16Array) buffer.setInt16(i * 2, x[i], true);
				else buffer.setUint16(i * 2, x[i], true);
				return concat(len, new Uint8Array(buffer.buffer));
			}
			if (x instanceof Int32Array || x instanceof Uint32Array) {
				const buffer = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(x.length * 4));
				for (let i = 0; i < x.length; i++) if (x instanceof Int32Array) buffer.setInt32(i * 4, x[i], true);
				else buffer.setUint32(i * 4, x[i], true);
				return concat(len, new Uint8Array(buffer.buffer));
			}
			if (x instanceof BigInt64Array || x instanceof BigUint64Array) {
				const buffer = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(x.length * 8));
				for (let i = 0; i < x.length; i++) if (x instanceof BigInt64Array) buffer.setBigInt64(i * 8, x[i], true);
				else buffer.setBigUint64(i * 8, x[i], true);
				return concat(len, new Uint8Array(buffer.buffer));
			}
			return concat(len, new Uint8Array(x.buffer, x.byteOffset, x.byteLength));
		}
		const buf = new PipeArrayBuffer(new Uint8Array(len.byteLength + x.length), 0);
		buf.write(len);
		for (const d of x) {
			const encoded = this._type.encodeValue(d);
			buf.write(new Uint8Array(encoded));
		}
		return buf.buffer;
	}
	_buildTypeTableImpl(typeTable) {
		this._type.buildTypeTable(typeTable);
		const opCode = slebEncode(IDLTypeIds.Vector);
		const buffer = this._type.encodeType(typeTable);
		typeTable.add(this, concat(opCode, buffer));
	}
	decodeValue(b, t) {
		const vec = this.checkType(t);
		if (!(vec instanceof VecClass)) throw new CandidDecodeError(`Expected type '${this.display()}', but received non-vector type '${vec.display()}'`);
		const len = Number(lebDecode(b));
		if (this._type instanceof FixedNatClass) {
			if (this._type._bits == 8) return new Uint8Array(b.read(len));
			if (this._type._bits == 16) {
				const bytes = b.read(len * 2);
				return new Uint16Array(bytes.buffer, bytes.byteOffset, len);
			}
			if (this._type._bits == 32) {
				const bytes = b.read(len * 4);
				return new Uint32Array(bytes.buffer, bytes.byteOffset, len);
			}
			if (this._type._bits == 64) return new BigUint64Array(b.read(len * 8).buffer);
		}
		if (this._type instanceof FixedIntClass) {
			if (this._type._bits == 8) return new Int8Array(b.read(len));
			if (this._type._bits == 16) {
				const bytes = b.read(len * 2);
				const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
				const result = new Int16Array(len);
				for (let i = 0; i < len; i++) result[i] = view.getInt16(i * 2, true);
				return result;
			}
			if (this._type._bits == 32) {
				const bytes = b.read(len * 4);
				const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
				const result = new Int32Array(len);
				for (let i = 0; i < len; i++) result[i] = view.getInt32(i * 4, true);
				return result;
			}
			if (this._type._bits == 64) {
				const bytes = b.read(len * 8);
				const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
				const result = new BigInt64Array(len);
				for (let i = 0; i < len; i++) result[i] = view.getBigInt64(i * 8, true);
				return result;
			}
		}
		const rets = [];
		for (let i = 0; i < len; i++) rets.push(this._type.decodeValue(b, vec._type));
		return rets;
	}
	get name() {
		return `vec ${this._type.name}`;
	}
	display() {
		return `vec ${this._type.display()}`;
	}
	valueToString(x) {
		return `vec {${x.map((e) => this._type.valueToString(e)).join("; ")}}`;
	}
};
/**
* Represents an IDL Option
* @param {Type} t
*/
var OptClass = class OptClass extends ConstructType {
	get typeName() {
		return IdlTypeName.OptClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.OptClass;
	}
	constructor(_type) {
		super();
		this._type = _type;
	}
	accept(v, d) {
		return v.visitOpt(this, this._type, d);
	}
	covariant(x) {
		try {
			if (Array.isArray(x) && (x.length === 0 || x.length === 1 && this._type.covariant(x[0]))) return true;
		} catch (e) {
			throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)} \n\n-> ${e.message}`, { cause: e });
		}
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		if (x.length === 0) return new Uint8Array([0]);
		return concat(new Uint8Array([1]), this._type.encodeValue(x[0]));
	}
	_buildTypeTableImpl(typeTable) {
		this._type.buildTypeTable(typeTable);
		const opCode = slebEncode(IDLTypeIds.Opt);
		const buffer = this._type.encodeType(typeTable);
		typeTable.add(this, concat(opCode, buffer));
	}
	decodeValue(b, t) {
		if (t instanceof NullClass) return [];
		if (t instanceof ReservedClass) return [];
		let wireType = t;
		if (t instanceof RecClass) {
			const ty = t.getType();
			if (typeof ty === "undefined") throw new CandidDecodeError("Type mismatch: cannot decode from uninitialized recursive type");
			else wireType = ty;
		}
		if (wireType instanceof OptClass) switch (safeReadUint8(b)) {
			case 0: return [];
			case 1: {
				const checkpoint = b.save();
				try {
					return [this._type.decodeValue(b, wireType._type)];
				} catch (e) {
					b.restore(checkpoint);
					wireType._type.decodeValue(b, wireType._type);
					return [];
				}
			}
			default: throw new CandidDecodeError(`Invalid option value: expected 0 (None) or 1 (Some) for type '${this.display()}'`);
		}
		else if (this._type instanceof NullClass || this._type instanceof OptClass || this._type instanceof ReservedClass) {
			wireType.decodeValue(b, wireType);
			return [];
		} else {
			const checkpoint = b.save();
			try {
				return [this._type.decodeValue(b, t)];
			} catch (e) {
				b.restore(checkpoint);
				wireType.decodeValue(b, t);
				return [];
			}
		}
	}
	get name() {
		return `opt ${this._type.name}`;
	}
	display() {
		return `opt ${this._type.display()}`;
	}
	valueToString(x) {
		if (x.length === 0) return "null";
		return `opt ${this._type.valueToString(x[0])}`;
	}
};
/**
* Represents an IDL Record
* @param {object} [fields] - mapping of function name to Type
*/
var RecordClass = class RecordClass extends ConstructType {
	get typeName() {
		return IdlTypeName.RecordClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.RecordClass || instance.typeName === IdlTypeName.TupleClass;
	}
	constructor(fields = {}) {
		super();
		this._fields = Object.entries(fields).sort((a, b) => idlLabelToId(a[0]) - idlLabelToId(b[0]));
	}
	accept(v, d) {
		return v.visitRecord(this, this._fields, d);
	}
	tryAsTuple() {
		const res = [];
		for (let i = 0; i < this._fields.length; i++) {
			const [key, type] = this._fields[i];
			if (key !== `_${i}_`) return null;
			res.push(type);
		}
		return res;
	}
	covariant(x) {
		if (typeof x === "object" && this._fields.every(([k, t]) => {
			if (!x.hasOwnProperty(k)) throw new Error(`Record is missing key "${k}".`);
			try {
				return t.covariant(x[k]);
			} catch (e) {
				throw new Error(`Invalid ${this.display()} argument: \n\nfield ${k} -> ${e.message}`, { cause: e });
			}
		})) return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		const values = this._fields.map(([key]) => x[key]);
		return concat(...zipWith(this._fields, values, ([, c], d) => c.encodeValue(d)));
	}
	_buildTypeTableImpl(T) {
		this._fields.forEach(([_, value]) => value.buildTypeTable(T));
		const opCode = slebEncode(IDLTypeIds.Record);
		const len = lebEncode(this._fields.length);
		const fields = this._fields.map(([key, value]) => concat(lebEncode(idlLabelToId(key)), value.encodeType(T)));
		T.add(this, concat(opCode, len, concat(...fields)));
	}
	decodeValue(b, t) {
		const record = this.checkType(t);
		if (!(record instanceof RecordClass)) throw new CandidDecodeError(`Expected type '${this.display()}', but received non-record type '${record.display()}'`);
		const x = {};
		let expectedRecordIdx = 0;
		let actualRecordIdx = 0;
		while (actualRecordIdx < record._fields.length) {
			const [hash, type] = record._fields[actualRecordIdx];
			if (expectedRecordIdx >= this._fields.length) {
				type.decodeValue(b, type);
				actualRecordIdx++;
				continue;
			}
			const [expectKey, expectType] = this._fields[expectedRecordIdx];
			const expectedId = idlLabelToId(this._fields[expectedRecordIdx][0]);
			const actualId = idlLabelToId(hash);
			if (expectedId === actualId) {
				x[expectKey] = expectType.decodeValue(b, type);
				expectedRecordIdx++;
				actualRecordIdx++;
			} else if (actualId > expectedId) {
				if (expectType instanceof OptClass || expectType instanceof ReservedClass) {
					x[expectKey] = [];
					expectedRecordIdx++;
				} else throw new CandidDecodeError(`Cannot find required field '${expectKey}' in record, expected fields: [${this._fields.map(([name]) => name).join(", ")}], received fields: [${record._fields.map(([name]) => name).join(", ")}]`);
			} else {
				type.decodeValue(b, type);
				actualRecordIdx++;
			}
		}
		for (const [expectKey, expectType] of this._fields.slice(expectedRecordIdx)) if (expectType instanceof OptClass || expectType instanceof ReservedClass) x[expectKey] = [];
		else throw new CandidDecodeError(`Cannot find required field '${expectKey}' in record, expected fields: [${this._fields.map(([name]) => name).join(", ")}], received fields: [${record._fields.map(([name]) => name).join(", ")}]`);
		return x;
	}
	get fieldsAsObject() {
		const fields = {};
		for (const [name, ty] of this._fields) fields[idlLabelToId(name)] = ty;
		return fields;
	}
	get name() {
		return `record {${this._fields.map(([key, value]) => `${key}:${value.name}`).join("; ")}}`;
	}
	display() {
		return `record {${this._fields.map(([key, value]) => `${key}:${value.display()}`).join("; ")}}`;
	}
	valueToString(x) {
		const values = this._fields.map(([key]) => x[key]);
		return `record {${zipWith(this._fields, values, ([k, c], d) => `${k}=${c.valueToString(d)}`).join("; ")}}`;
	}
};
/**
* Represents Tuple, a syntactic sugar for Record.
* @param {Type} components
*/
var TupleClass = class TupleClass extends RecordClass {
	get typeName() {
		return IdlTypeName.TupleClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.TupleClass;
	}
	constructor(_components) {
		const x = {};
		_components.forEach((e, i) => x[`_${i}_`] = e);
		super(x);
		this._components = _components;
	}
	accept(v, d) {
		return v.visitTuple(this, this._components, d);
	}
	covariant(x) {
		if (Array.isArray(x) && x.length >= this._fields.length && this._components.every((t, i) => {
			try {
				return t.covariant(x[i]);
			} catch (e) {
				throw new Error(`Invalid ${this.display()} argument: \n\nindex ${i} -> ${e.message}`, { cause: e });
			}
		})) return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		return concat(...zipWith(this._components, x, (c, d) => c.encodeValue(d)));
	}
	decodeValue(b, t) {
		const tuple = this.checkType(t);
		if (!(tuple instanceof TupleClass)) throw new CandidDecodeError(`Expected type '${this.display()}', but received non-tuple type '${tuple.display()}'`);
		if (tuple._components.length < this._components.length) throw new CandidDecodeError(`Tuple mismatch: expected ${this._components.length} components, but received ${tuple._components.length}`);
		const res = [];
		for (const [i, wireType] of tuple._components.entries()) if (i >= this._components.length) wireType.decodeValue(b, wireType);
		else res.push(this._components[i].decodeValue(b, wireType));
		return res;
	}
	display() {
		return `record {${this._components.map((value) => value.display()).join("; ")}}`;
	}
	valueToString(values) {
		return `record {${zipWith(this._components, values, (c, d) => c.valueToString(d)).join("; ")}}`;
	}
};
/**
* Represents an IDL Variant
* @param {object} [fields] - mapping of function name to Type
*/
var VariantClass = class VariantClass extends ConstructType {
	get typeName() {
		return IdlTypeName.VariantClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.VariantClass;
	}
	constructor(fields = {}) {
		super();
		this._fields = Object.entries(fields).sort((a, b) => idlLabelToId(a[0]) - idlLabelToId(b[0]));
	}
	accept(v, d) {
		return v.visitVariant(this, this._fields, d);
	}
	covariant(x) {
		if (typeof x === "object" && Object.entries(x).length === 1 && this._fields.every(([k, v]) => {
			try {
				return !x.hasOwnProperty(k) || v.covariant(x[k]);
			} catch (e) {
				throw new Error(`Invalid ${this.display()} argument: \n\nvariant ${k} -> ${e.message}`, { cause: e });
			}
		})) return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		for (let i = 0; i < this._fields.length; i++) {
			const [name, type] = this._fields[i];
			if (x.hasOwnProperty(name)) return concat(lebEncode(i), type.encodeValue(x[name]));
		}
		throw Error(`Variant has no data: ${x}`);
	}
	_buildTypeTableImpl(typeTable) {
		this._fields.forEach(([, type]) => {
			type.buildTypeTable(typeTable);
		});
		const opCode = slebEncode(IDLTypeIds.Variant);
		const len = lebEncode(this._fields.length);
		const fields = this._fields.map(([key, value]) => concat(lebEncode(idlLabelToId(key)), value.encodeType(typeTable)));
		typeTable.add(this, concat(opCode, len, ...fields));
	}
	decodeValue(b, t) {
		const variant = this.checkType(t);
		if (!(variant instanceof VariantClass)) throw new CandidDecodeError(`Expected type '${this.display()}', but received non-variant type '${variant.display()}'`);
		const idx = Number(lebDecode(b));
		if (idx >= variant._fields.length) throw Error(`Invalid variant index: ${idx}`);
		const [wireHash, wireType] = variant._fields[idx];
		for (const [key, expectType] of this._fields) if (idlLabelToId(wireHash) === idlLabelToId(key)) {
			const value = expectType.decodeValue(b, wireType);
			return { [key]: value };
		}
		throw new CandidDecodeError(`Cannot find field hash ${wireHash} in variant, expected fields: [${this._fields.map(([name]) => name).join(", ")}]`);
	}
	get name() {
		return `variant {${this._fields.map(([key, type]) => `${key}:${type.name}`).join("; ")}}`;
	}
	display() {
		return `variant {${this._fields.map(([key, type]) => key + (type.name === "null" ? "" : `:${type.display()}`)).join("; ")}}`;
	}
	valueToString(x) {
		for (const [name, type] of this._fields) if (x.hasOwnProperty(name)) {
			const value = type.valueToString(x[name]);
			if (value === "null") return `variant {${name}}`;
			return `variant {${name}=${value}}`;
		}
		throw new Error(`Variant has no data: ${x}`);
	}
	get alternativesAsObject() {
		const alternatives = {};
		for (const [name, ty] of this._fields) alternatives[idlLabelToId(name)] = ty;
		return alternatives;
	}
};
/**
* Represents a reference to an IDL type, used for defining recursive data
* types.
*/
var RecClass = class RecClass extends ConstructType {
	constructor() {
		super(...arguments);
		this._id = RecClass._counter++;
	}
	get typeName() {
		return IdlTypeName.RecClass;
	}
	static {
		this._counter = 0;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.RecClass;
	}
	accept(v, d) {
		if (!this._type) throw Error("Recursive type uninitialized.");
		return v.visitRec(this, this._type, d);
	}
	fill(t) {
		this._type = t;
	}
	getType() {
		return this._type;
	}
	covariant(x) {
		if (this._type ? this._type.covariant(x) : false) return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		if (!this._type) throw Error("Recursive type uninitialized.");
		return this._type.encodeValue(x);
	}
	_buildTypeTableImpl(typeTable) {
		if (!this._type) throw Error("Recursive type uninitialized.");
		typeTable.add(this, new Uint8Array([]));
		this._type.buildTypeTable(typeTable);
		typeTable.merge(this, this._type.name);
	}
	decodeValue(b, t) {
		if (!this._type) throw Error("Recursive type uninitialized.");
		return this._type.decodeValue(b, t);
	}
	get name() {
		return `rec_${this._id}`;
	}
	display() {
		if (!this._type) throw Error("Recursive type uninitialized.");
		return `μ${this.name}.${this._type.name}`;
	}
	valueToString(x) {
		if (!this._type) throw Error("Recursive type uninitialized.");
		return this._type.valueToString(x);
	}
};
function decodePrincipalId(b) {
	if (safeReadUint8(b) !== 1) throw new Error("Cannot decode principal");
	const len = Number(lebDecode(b));
	return Principal$1.fromUint8Array(new Uint8Array(safeRead(b, len)));
}
/**
* Represents an IDL principal reference
*/
var PrincipalClass = class extends PrimitiveType {
	get typeName() {
		return IdlTypeName.PrincipalClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.PrincipalClass;
	}
	accept(v, d) {
		return v.visitPrincipal(this, d);
	}
	covariant(x) {
		if (x && x._isPrincipal) return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		const buf = x.toUint8Array();
		const len = lebEncode(buf.byteLength);
		return concat(new Uint8Array([1]), len, buf);
	}
	encodeType() {
		return slebEncode(IDLTypeIds.Principal);
	}
	decodeValue(b, t) {
		this.checkType(t);
		return decodePrincipalId(b);
	}
	get name() {
		return "principal";
	}
	valueToString(x) {
		return `${this.name} "${x.toText()}"`;
	}
};
/**
* Represents an IDL function reference.
* @param argTypes Argument types.
* @param retTypes Return types.
* @param annotations Function annotations.
*/
var FuncClass = class extends ConstructType {
	get typeName() {
		return IdlTypeName.FuncClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.FuncClass;
	}
	static argsToString(types, v) {
		if (types.length !== v.length) throw new Error("arity mismatch");
		return `(${types.map((t, i) => t.valueToString(v[i])).join(", ")})`;
	}
	constructor(argTypes, retTypes, annotations = []) {
		super();
		this.argTypes = argTypes;
		this.retTypes = retTypes;
		this.annotations = annotations;
	}
	accept(v, d) {
		return v.visitFunc(this, d);
	}
	covariant(x) {
		if (Array.isArray(x) && x.length === 2 && x[0] && x[0]._isPrincipal && typeof x[1] === "string") return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue([principal, methodName]) {
		const buf = principal.toUint8Array();
		const len = lebEncode(buf.byteLength);
		const canister = concat(new Uint8Array([1]), len, buf);
		const method = new TextEncoder().encode(methodName);
		const methodLen = lebEncode(method.byteLength);
		return concat(new Uint8Array([1]), canister, methodLen, method);
	}
	_buildTypeTableImpl(T) {
		this.argTypes.forEach((arg) => arg.buildTypeTable(T));
		this.retTypes.forEach((arg) => arg.buildTypeTable(T));
		const opCode = slebEncode(IDLTypeIds.Func);
		const argLen = lebEncode(this.argTypes.length);
		const args = concat(...this.argTypes.map((arg) => arg.encodeType(T)));
		const retLen = lebEncode(this.retTypes.length);
		const rets = concat(...this.retTypes.map((arg) => arg.encodeType(T)));
		const annLen = lebEncode(this.annotations.length);
		const anns = concat(...this.annotations.map((a) => this.encodeAnnotation(a)));
		T.add(this, concat(opCode, argLen, args, retLen, rets, annLen, anns));
	}
	decodeValue(b, t) {
		const tt = t instanceof RecClass ? t.getType() ?? t : t;
		if (!subtype(tt, this)) throw new Error(`Cannot decode function reference at type ${this.display()} from wire type ${tt.display()}`);
		if (safeReadUint8(b) !== 1) throw new Error("Cannot decode function reference");
		const canister = decodePrincipalId(b);
		const buf = safeRead(b, Number(lebDecode(b)));
		return [canister, new TextDecoder("utf8", { fatal: true }).decode(buf)];
	}
	get name() {
		return `(${this.argTypes.map((arg) => arg.name).join(", ")}) -> (${this.retTypes.map((arg) => arg.name).join(", ")})${` ${this.annotations.join(" ")}`}`;
	}
	valueToString([principal, str]) {
		return `func "${principal.toText()}".${str}`;
	}
	display() {
		return `(${this.argTypes.map((arg) => arg.display()).join(", ")}) → (${this.retTypes.map((arg) => arg.display()).join(", ")})${` ${this.annotations.join(" ")}`}`;
	}
	encodeAnnotation(ann) {
		if (ann === "query") return new Uint8Array([1]);
		if (ann === "oneway") return new Uint8Array([2]);
		if (ann === "composite_query") return new Uint8Array([3]);
		throw new Error("Illegal function annotation");
	}
};
var ServiceClass = class extends ConstructType {
	get typeName() {
		return IdlTypeName.ServiceClass;
	}
	static [Symbol.hasInstance](instance) {
		return instance.typeName === IdlTypeName.ServiceClass;
	}
	constructor(fields) {
		super();
		this._fields = Object.entries(fields).sort((a, b) => {
			if (a[0] < b[0]) return -1;
			if (a[0] > b[0]) return 1;
			return 0;
		});
	}
	accept(v, d) {
		return v.visitService(this, d);
	}
	covariant(x) {
		if (x && x._isPrincipal) return true;
		throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x)}`);
	}
	encodeValue(x) {
		const buf = x.toUint8Array();
		const len = lebEncode(buf.length);
		return concat(new Uint8Array([1]), len, buf);
	}
	_buildTypeTableImpl(T) {
		this._fields.forEach(([_, func]) => func.buildTypeTable(T));
		const opCode = slebEncode(IDLTypeIds.Service);
		const len = lebEncode(this._fields.length);
		const meths = this._fields.map(([label, func]) => {
			const labelBuf = new TextEncoder().encode(label);
			return concat(lebEncode(labelBuf.length), labelBuf, func.encodeType(T));
		});
		T.add(this, concat(opCode, len, ...meths));
	}
	decodeValue(b, t) {
		const tt = t instanceof RecClass ? t.getType() ?? t : t;
		if (!subtype(tt, this)) throw new Error(`Cannot decode service reference at type ${this.display()} from wire type ${tt.display()}`);
		return decodePrincipalId(b);
	}
	get name() {
		return `service {${this._fields.map(([key, value]) => `${key}:${value.name}`).join("; ")}}`;
	}
	valueToString(x) {
		return `service "${x.toText()}"`;
	}
	fieldsAsObject() {
		const fields = {};
		for (const [name, ty] of this._fields) fields[name] = ty;
		return fields;
	}
};
/**
* Takes an unknown value and returns a string representation of it.
* @param x - unknown value
* @returns {string} string representation of the value
*/
function toReadableString(x) {
	const str = JSON.stringify(x, (_key, value) => typeof value === "bigint" ? `BigInt(${value})` : value);
	return str && str.length > toReadableString_max ? `${str.substring(0, 397)}...` : str;
}
/**
* Encode a array of values
* @param argTypes - array of Types
* @param args - array of values
* @returns {Uint8Array} serialised value
*/
function encode$1(argTypes, args) {
	if (args.length < argTypes.length) throw Error("Wrong number of message arguments");
	const typeTable = new TypeTable();
	argTypes.forEach((t) => t.buildTypeTable(typeTable));
	return concat(magicNumberBytes, typeTable.encode(), lebEncode(args.length), concat(...argTypes.map((t) => t.encodeType(typeTable))), concat(...zipWith(argTypes, args, (t, x) => {
		try {
			t.covariant(x);
		} catch (e) {
			throw /* @__PURE__ */ new Error(`${e.message}\n\n`);
		}
		return t.encodeValue(x);
	})));
}
/**
* Decode a binary value
* @param retTypes - Types expected in the buffer.
* @param bytes - hex-encoded string, or buffer.
* @returns Value deserialised to JS type
*/
function decode$1(retTypes, bytes) {
	const b = new PipeArrayBuffer(bytes);
	if (bytes.byteLength < 4) throw new Error("Message length smaller than magic number");
	const magicBuffer = safeRead(b, 4);
	const magic = new TextDecoder().decode(magicBuffer);
	if (magic !== magicNumber) throw new Error(`Wrong magic number: ${JSON.stringify(magic)}`);
	function readTypeTable(pipe) {
		const typeTable = [];
		const len = Number(lebDecode(pipe));
		for (let i = 0; i < len; i++) {
			const ty = Number(slebDecode(pipe));
			switch (ty) {
				case IDLTypeIds.Opt:
				case IDLTypeIds.Vector: {
					const t = Number(slebDecode(pipe));
					typeTable.push([ty, t]);
					break;
				}
				case IDLTypeIds.Record:
				case IDLTypeIds.Variant: {
					const fields = [];
					let objectLength = Number(lebDecode(pipe));
					let prevHash;
					while (objectLength--) {
						const hash = Number(lebDecode(pipe));
						if (hash >= Math.pow(2, 32)) throw new Error("field id out of 32-bit range");
						if (typeof prevHash === "number" && prevHash >= hash) throw new Error("field id collision or not sorted");
						prevHash = hash;
						const t = Number(slebDecode(pipe));
						fields.push([hash, t]);
					}
					typeTable.push([ty, fields]);
					break;
				}
				case IDLTypeIds.Func: {
					const args = [];
					let argLength = Number(lebDecode(pipe));
					while (argLength--) args.push(Number(slebDecode(pipe)));
					const returnValues = [];
					let returnValuesLength = Number(lebDecode(pipe));
					while (returnValuesLength--) returnValues.push(Number(slebDecode(pipe)));
					const annotations = [];
					let annotationLength = Number(lebDecode(pipe));
					while (annotationLength--) switch (Number(lebDecode(pipe))) {
						case 1:
							annotations.push("query");
							break;
						case 2:
							annotations.push("oneway");
							break;
						case 3:
							annotations.push("composite_query");
							break;
						default: throw new Error("unknown annotation");
					}
					typeTable.push([ty, [
						args,
						returnValues,
						annotations
					]]);
					break;
				}
				case IDLTypeIds.Service: {
					let servLength = Number(lebDecode(pipe));
					const methods = [];
					while (servLength--) {
						const nameLength = Number(lebDecode(pipe));
						const funcName = new TextDecoder().decode(safeRead(pipe, nameLength));
						const funcType = slebDecode(pipe);
						methods.push([funcName, funcType]);
					}
					typeTable.push([ty, methods]);
					break;
				}
				default: throw new Error(`Illegal op_code: ${ty}`);
			}
		}
		const rawList = [];
		const length = Number(lebDecode(pipe));
		for (let i = 0; i < length; i++) rawList.push(Number(slebDecode(pipe)));
		return [typeTable, rawList];
	}
	const [rawTable, rawTypes] = readTypeTable(b);
	if (rawTypes.length < retTypes.length) throw new Error("Wrong number of return values");
	const table = rawTable.map((_) => Rec());
	function getType(t) {
		if (t < -24) throw new Error("future value not supported");
		if (t < 0) switch (t) {
			case -1: return Null;
			case -2: return Bool;
			case -3: return Nat;
			case -4: return Int;
			case -5: return Nat8;
			case -6: return Nat16;
			case -7: return Nat32;
			case -8: return Nat64;
			case -9: return Int8;
			case -10: return Int16;
			case -11: return Int32;
			case -12: return Int64;
			case -13: return Float32;
			case -14: return Float64;
			case -15: return Text;
			case -16: return Reserved;
			case -17: return Empty;
			case -24: return Principal;
			default: throw new Error(`Illegal op_code: ${t}`);
		}
		if (t >= rawTable.length) throw new Error("type index out of range");
		return table[t];
	}
	function buildType(entry) {
		switch (entry[0]) {
			case IDLTypeIds.Vector: return Vec(getType(entry[1]));
			case IDLTypeIds.Opt: return Opt(getType(entry[1]));
			case IDLTypeIds.Record: {
				const fields = {};
				for (const [hash, ty] of entry[1]) {
					const name = `_${hash}_`;
					fields[name] = getType(ty);
				}
				const record = Record(fields);
				const tuple = record.tryAsTuple();
				if (Array.isArray(tuple)) return Tuple(...tuple);
				return record;
			}
			case IDLTypeIds.Variant: {
				const fields = {};
				for (const [hash, ty] of entry[1]) {
					const name = `_${hash}_`;
					fields[name] = getType(ty);
				}
				return Variant$1(fields);
			}
			case IDLTypeIds.Func: {
				const [args, returnValues, annotations] = entry[1];
				return Func(args.map((t) => getType(t)), returnValues.map((t) => getType(t)), annotations);
			}
			case IDLTypeIds.Service: {
				const rec = {};
				const methods = entry[1];
				for (const [name, typeRef] of methods) {
					let type = getType(typeRef);
					if (type instanceof RecClass) type = type.getType();
					if (!(type instanceof FuncClass)) throw new Error("Illegal service definition: services can only contain functions");
					rec[name] = type;
				}
				return Service(rec);
			}
			default: throw new Error(`Illegal op_code: ${entry[0]}`);
		}
	}
	rawTable.forEach((entry, i) => {
		if (entry[0] === IDLTypeIds.Func) {
			const t = buildType(entry);
			table[i].fill(t);
		}
	});
	rawTable.forEach((entry, i) => {
		if (entry[0] !== IDLTypeIds.Func) {
			const t = buildType(entry);
			table[i].fill(t);
		}
	});
	resetSubtypeCache();
	const types = rawTypes.map((t) => getType(t));
	try {
		const output = retTypes.map((t, i) => {
			return t.decodeValue(b, types[i]);
		});
		for (let ind = retTypes.length; ind < types.length; ind++) types[ind].decodeValue(b, types[ind]);
		if (b.byteLength > 0) throw new Error("decode: Left-over bytes");
		return output;
	} finally {
		resetSubtypeCache();
	}
}
var Empty = new EmptyClass();
var Reserved = new ReservedClass();
/**
* Client-only type for deserializing unknown data. Not supported by Candid, and its use is discouraged.
*/
var Unknown = new UnknownClass();
var Bool = new BoolClass();
var Null = new NullClass();
var Text = new TextClass();
var Int = new IntClass();
var Nat = new NatClass();
var Float32 = new FloatClass(32);
var Float64 = new FloatClass(64);
var Int8 = new FixedIntClass(8);
var Int16 = new FixedIntClass(16);
var Int32 = new FixedIntClass(32);
var Int64 = new FixedIntClass(64);
var Nat8 = new FixedNatClass(8);
var Nat16 = new FixedNatClass(16);
var Nat32 = new FixedNatClass(32);
var Nat64 = new FixedNatClass(64);
var Principal = new PrincipalClass();
/**
*
* @param types array of any types
* @returns TupleClass from those types
*/
function Tuple(...types) {
	return new TupleClass(types);
}
/**
*
* @param t IDL Type
* @returns VecClass from that type
*/
function Vec(t) {
	return new VecClass(t);
}
/**
*
* @param t IDL Type
* @returns OptClass of Type
*/
function Opt(t) {
	return new OptClass(t);
}
/**
*
* @param t Record of string and IDL Type
* @returns RecordClass of string and Type
*/
function Record(t) {
	return new RecordClass(t);
}
/**
*
* @param fields Record of string and IDL Type
* @returns VariantClass
*/
function Variant$1(fields) {
	return new VariantClass(fields);
}
/**
*
* @returns new RecClass
*/
function Rec() {
	return new RecClass();
}
/**
*
* @param args array of IDL Types
* @param ret array of IDL Types
* @param annotations array of strings, [] by default
* @returns new FuncClass
*/
function Func(args, ret, annotations = []) {
	return new FuncClass(args, ret, annotations);
}
/**
*
* @param t Record of string and FuncClass
* @returns ServiceClass
*/
function Service(t) {
	return new ServiceClass(t);
}
/**
* The list of relations between types we assume to hold. Uses the types .name property as key
*/
var Relations = class Relations {
	constructor(relations = /* @__PURE__ */ new Map()) {
		this.rels = relations;
	}
	copy() {
		const copy = /* @__PURE__ */ new Map();
		for (const [key, value] of this.rels.entries()) {
			const valCopy = new Map(value);
			copy.set(key, valCopy);
		}
		return new Relations(copy);
	}
	known(t1, t2) {
		return this.rels.get(t1.name)?.get(t2.name);
	}
	addNegative(t1, t2) {
		this.addNames(t1.name, t2.name, false);
	}
	add(t1, t2) {
		this.addNames(t1.name, t2.name, true);
	}
	display() {
		let result = "";
		for (const [t1, v] of this.rels) for (const [t2, known] of v) result += `${t1} ${known ? ":<" : "!<:"} ${t2}\n`;
		return result;
	}
	addNames(t1, t2, isSubtype) {
		const t1Map = this.rels.get(t1);
		if (t1Map == void 0) {
			const newMap = /* @__PURE__ */ new Map();
			newMap.set(t2, isSubtype);
			this.rels.set(t1, newMap);
		} else t1Map.set(t2, isSubtype);
	}
};
var subtypeCache = new Relations();
/** Resets the global subtyping cache */
function resetSubtypeCache() {
	subtypeCache = new Relations();
}
function eqFunctionAnnotations(t1, t2) {
	const t1Annotations = new Set(t1.annotations);
	const t2Annotations = new Set(t2.annotations);
	if (t1Annotations.size !== t2Annotations.size) return false;
	for (const a of t1Annotations) if (!t2Annotations.has(a)) return false;
	return true;
}
function canBeOmmitted(t) {
	return t instanceof OptClass || t instanceof NullClass || t instanceof ReservedClass;
}
/**
* Subtyping on Candid types t1 <: t2 (Exported for testing)
* @param t1 The potential subtype
* @param t2 The potential supertype
*/
function subtype(t1, t2) {
	const isSubtype = subtype_(subtypeCache.copy(), t1, t2);
	if (isSubtype) subtypeCache.add(t1, t2);
	else subtypeCache.addNegative(t1, t2);
	return isSubtype;
}
function subtype_(relations, t1, t2) {
	if (t1.name === t2.name) return true;
	const known = relations.known(t1, t2);
	if (known !== void 0) return known;
	relations.add(t1, t2);
	if (t2 instanceof ReservedClass) return true;
	if (t1 instanceof EmptyClass) return true;
	if (t1 instanceof NatClass && t2 instanceof IntClass) return true;
	if (t1 instanceof VecClass && t2 instanceof VecClass) return subtype_(relations, t1._type, t2._type);
	if (t2 instanceof OptClass) return true;
	if (t1 instanceof RecordClass && t2 instanceof RecordClass) {
		const t1Object = t1.fieldsAsObject;
		for (const [label, ty2] of t2._fields) {
			const ty1 = t1Object[idlLabelToId(label)];
			if (!ty1) {
				if (!canBeOmmitted(ty2)) return false;
			} else if (!subtype_(relations, ty1, ty2)) return false;
		}
		return true;
	}
	if (t1 instanceof FuncClass && t2 instanceof FuncClass) {
		if (!eqFunctionAnnotations(t1, t2)) return false;
		for (let i = 0; i < t1.argTypes.length; i++) {
			const argTy1 = t1.argTypes[i];
			if (i < t2.argTypes.length) {
				if (!subtype_(relations, t2.argTypes[i], argTy1)) return false;
			} else if (!canBeOmmitted(argTy1)) return false;
		}
		for (let i = 0; i < t2.retTypes.length; i++) {
			const retTy2 = t2.retTypes[i];
			if (i < t1.retTypes.length) {
				if (!subtype_(relations, t1.retTypes[i], retTy2)) return false;
			} else if (!canBeOmmitted(retTy2)) return false;
		}
		return true;
	}
	if (t1 instanceof VariantClass && t2 instanceof VariantClass) {
		const t2Object = t2.alternativesAsObject;
		for (const [label, ty1] of t1._fields) {
			const ty2 = t2Object[idlLabelToId(label)];
			if (!ty2) return false;
			if (!subtype_(relations, ty1, ty2)) return false;
		}
		return true;
	}
	if (t1 instanceof ServiceClass && t2 instanceof ServiceClass) {
		const t1Object = t1.fieldsAsObject();
		for (const [name, ty2] of t2._fields) {
			const ty1 = t1Object[name];
			if (!ty1) return false;
			if (!subtype_(relations, ty1, ty2)) return false;
		}
		return true;
	}
	if (t1 instanceof RecClass) return subtype_(relations, t1.getType(), t2);
	if (t2 instanceof RecClass) return subtype_(relations, t1, t2.getType());
	return false;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/candid/candid-core.js
var InputBox = class {
	constructor(idl, ui) {
		this.idl = idl;
		this.ui = ui;
		this.label = null;
		this.value = void 0;
		const status = document.createElement("span");
		status.className = "status";
		this.status = status;
		if (ui.input) {
			ui.input.addEventListener("blur", () => {
				if (ui.input.value === "") return;
				this.parse();
			});
			ui.input.addEventListener("input", () => {
				status.style.display = "none";
				ui.input.classList.remove("reject");
			});
		}
	}
	isRejected() {
		return this.value === void 0;
	}
	parse(config = {}) {
		if (this.ui.form) {
			const value = this.ui.form.parse(config);
			this.value = value;
			return value;
		}
		if (this.ui.input) {
			const input = this.ui.input;
			try {
				const value = this.ui.parse(this.idl, config, input.value);
				if (!this.idl.covariant(value)) throw new Error(`${input.value} is not of type ${this.idl.display()}`);
				this.status.style.display = "none";
				this.value = value;
				return value;
			} catch (err) {
				input.classList.add("reject");
				this.status.style.display = "block";
				this.status.innerHTML = `InputError: ${err.message}`;
				this.value = void 0;
				return;
			}
		}
		return null;
	}
	render(dom) {
		const container = document.createElement("span");
		if (this.label) {
			const label = document.createElement("label");
			label.innerText = this.label;
			container.appendChild(label);
		}
		if (this.ui.input) {
			container.appendChild(this.ui.input);
			container.appendChild(this.status);
		}
		if (this.ui.form) this.ui.form.render(container);
		dom.appendChild(container);
	}
};
var InputForm = class {
	constructor(ui) {
		this.ui = ui;
		this.form = [];
	}
	renderForm(dom) {
		if (this.ui.container) {
			this.form.forEach((e) => e.render(this.ui.container));
			dom.appendChild(this.ui.container);
		} else this.form.forEach((e) => e.render(dom));
	}
	render(dom) {
		if (this.ui.open && this.ui.event) {
			dom.appendChild(this.ui.open);
			const form = this;
			form.ui.open.addEventListener(form.ui.event, () => {
				if (form.ui.container) form.ui.container.innerHTML = "";
				else {
					const oldContainer = form.ui.open.nextElementSibling;
					if (oldContainer) oldContainer.parentNode.removeChild(oldContainer);
				}
				form.generateForm();
				form.renderForm(dom);
			});
		} else {
			this.generateForm();
			this.renderForm(dom);
		}
	}
};
var RecordForm = class extends InputForm {
	constructor(fields, ui) {
		super(ui);
		this.fields = fields;
		this.ui = ui;
	}
	generateForm() {
		this.form = this.fields.map(([key, type]) => {
			const input = this.ui.render(type);
			if (this.ui.labelMap && this.ui.labelMap.hasOwnProperty(key)) input.label = `${this.ui.labelMap[key]} `;
			else input.label = `${key} `;
			return input;
		});
	}
	parse(config) {
		const v = {};
		this.fields.forEach(([key, _], i) => {
			const value = this.form[i].parse(config);
			v[key] = value;
		});
		if (this.form.some((input) => input.isRejected())) return;
		return v;
	}
};
var TupleForm = class extends InputForm {
	constructor(components, ui) {
		super(ui);
		this.components = components;
		this.ui = ui;
	}
	generateForm() {
		this.form = this.components.map((type) => {
			return this.ui.render(type);
		});
	}
	parse(config) {
		const v = [];
		this.components.forEach((_, i) => {
			const value = this.form[i].parse(config);
			v.push(value);
		});
		if (this.form.some((input) => input.isRejected())) return;
		return v;
	}
};
var VariantForm = class extends InputForm {
	constructor(fields, ui) {
		super(ui);
		this.fields = fields;
		this.ui = ui;
	}
	generateForm() {
		const index = this.ui.open.selectedIndex;
		const [_, type] = this.fields[index];
		const variant = this.ui.render(type);
		this.form = [variant];
	}
	parse(config) {
		const select = this.ui.open;
		const selected = select.options[select.selectedIndex].value;
		const value = this.form[0].parse(config);
		if (value === void 0) return;
		const v = {};
		v[selected] = value;
		return v;
	}
};
var OptionForm = class extends InputForm {
	constructor(ty, ui) {
		super(ui);
		this.ty = ty;
		this.ui = ui;
	}
	generateForm() {
		if (this.ui.open.checked) {
			const opt = this.ui.render(this.ty);
			this.form = [opt];
		} else this.form = [];
	}
	parse(config) {
		if (this.form.length === 0) return [];
		const value = this.form[0].parse(config);
		if (value === void 0) return;
		return [value];
	}
};
var VecForm = class extends InputForm {
	constructor(ty, ui) {
		super(ui);
		this.ty = ty;
		this.ui = ui;
	}
	generateForm() {
		const len = +this.ui.open.value;
		this.form = [];
		for (let i = 0; i < len; i++) {
			const t = this.ui.render(this.ty);
			this.form.push(t);
		}
	}
	parse(config) {
		const value = this.form.map((input) => {
			return input.parse(config);
		});
		if (this.form.some((input) => input.isRejected())) return;
		return value;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/candid/candid-ui.js
var InputConfig = { parse: parsePrimitive };
var FormConfig = { render: renderInput };
var inputBox = (t, config) => {
	return new InputBox(t, {
		...InputConfig,
		...config
	});
};
var recordForm = (fields, config) => {
	return new RecordForm(fields, {
		...FormConfig,
		...config
	});
};
var tupleForm = (components, config) => {
	return new TupleForm(components, {
		...FormConfig,
		...config
	});
};
var variantForm = (fields, config) => {
	return new VariantForm(fields, {
		...FormConfig,
		...config
	});
};
var optForm = (ty, config) => {
	return new OptionForm(ty, {
		...FormConfig,
		...config
	});
};
var vecForm = (ty, config) => {
	return new VecForm(ty, {
		...FormConfig,
		...config
	});
};
var Render = class extends Visitor {
	visitType(t, _d) {
		const input = document.createElement("input");
		input.classList.add("argument");
		input.placeholder = t.display();
		return inputBox(t, { input });
	}
	visitNull(t, _d) {
		return inputBox(t, {});
	}
	visitRecord(t, fields, _d) {
		let config = {};
		if (fields.length > 1) {
			const container = document.createElement("div");
			container.classList.add("popup-form");
			config = { container };
		}
		return inputBox(t, { form: recordForm(fields, config) });
	}
	visitTuple(t, components, _d) {
		let config = {};
		if (components.length > 1) {
			const container = document.createElement("div");
			container.classList.add("popup-form");
			config = { container };
		}
		return inputBox(t, { form: tupleForm(components, config) });
	}
	visitVariant(t, fields, _d) {
		const select = document.createElement("select");
		for (const [key, _type] of fields) {
			const option = new Option(key);
			select.add(option);
		}
		select.selectedIndex = -1;
		select.classList.add("open");
		return inputBox(t, { form: variantForm(fields, {
			open: select,
			event: "change"
		}) });
	}
	visitOpt(t, ty, _d) {
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.classList.add("open");
		return inputBox(t, { form: optForm(ty, {
			open: checkbox,
			event: "change"
		}) });
	}
	visitVec(t, ty, _d) {
		const len = document.createElement("input");
		len.type = "number";
		len.min = "0";
		len.max = "100";
		len.style.width = "8rem";
		len.placeholder = "len";
		len.classList.add("open");
		const container = document.createElement("div");
		container.classList.add("popup-form");
		return inputBox(t, { form: vecForm(ty, {
			open: len,
			event: "change",
			container
		}) });
	}
	visitRec(_t, ty, _d) {
		return renderInput(ty);
	}
};
var Parse = class extends Visitor {
	visitNull(_t, _v) {
		return null;
	}
	visitBool(_t, v) {
		if (v === "true") return true;
		if (v === "false") return false;
		throw new Error(`Cannot parse ${v} as boolean`);
	}
	visitText(_t, v) {
		return v;
	}
	visitFloat(_t, v) {
		return parseFloat(v);
	}
	visitFixedInt(t, v) {
		if (t._bits <= 32) return parseInt(v, 10);
		return BigInt(v);
	}
	visitFixedNat(t, v) {
		if (t._bits <= 32) return parseInt(v, 10);
		return BigInt(v);
	}
	visitNumber(_t, v) {
		return BigInt(v);
	}
	visitPrincipal(_t, v) {
		return Principal$1.fromText(v);
	}
	visitService(_t, v) {
		return Principal$1.fromText(v);
	}
	visitFunc(_t, v) {
		const x = v.split(".", 2);
		return [Principal$1.fromText(x[0]), x[1]];
	}
};
var Random = class extends Visitor {
	visitNull(_t, _v) {
		return null;
	}
	visitBool(_t, _v) {
		return Math.random() < .5;
	}
	visitText(_t, _v) {
		return Math.random().toString(36).substring(6);
	}
	visitFloat(_t, _v) {
		return Math.random();
	}
	visitInt(_t, _v) {
		return BigInt(this.generateNumber(true));
	}
	visitNat(_t, _v) {
		return BigInt(this.generateNumber(false));
	}
	visitFixedInt(t, v) {
		const x = this.generateNumber(true);
		if (t._bits <= 32) return x;
		return BigInt(v);
	}
	visitFixedNat(t, v) {
		const x = this.generateNumber(false);
		if (t._bits <= 32) return x;
		return BigInt(v);
	}
	generateNumber(signed) {
		const num = Math.floor(Math.random() * 100);
		if (signed && Math.random() < .5) return -num;
		return num;
	}
};
function parsePrimitive(t, config, d) {
	if (config.random && d === "") return t.accept(new Random(), d);
	return t.accept(new Parse(), d);
}
/**
*
* @param t an IDL type
* @returns an input for that type
*/
function renderInput(t) {
	return t.accept(new Render(), null);
}
/**
*
* @param t an IDL Type
* @param input an InputBox
* @param value any
* @returns rendering that value to the provided input
*/
function renderValue(t, input, value) {
	return t.accept(new RenderValue(), {
		input,
		value
	});
}
var RenderValue = class extends Visitor {
	visitType(t, d) {
		d.input.ui.input.value = t.valueToString(d.value);
	}
	visitNull(_t, _d) {}
	visitText(_t, d) {
		d.input.ui.input.value = d.value;
	}
	visitRec(_t, ty, d) {
		renderValue(ty, d.input, d.value);
	}
	visitOpt(_t, ty, d) {
		if (d.value.length !== 0) {
			const form = d.input.ui.form;
			const open = form.ui.open;
			open.checked = true;
			open.dispatchEvent(new Event(form.ui.event));
			renderValue(ty, form.form[0], d.value[0]);
		}
	}
	visitRecord(_t, fields, d) {
		const form = d.input.ui.form;
		fields.forEach(([key, type], i) => {
			renderValue(type, form.form[i], d.value[key]);
		});
	}
	visitTuple(_t, components, d) {
		const form = d.input.ui.form;
		components.forEach((type, i) => {
			renderValue(type, form.form[i], d.value[i]);
		});
	}
	visitVariant(_t, fields, d) {
		const form = d.input.ui.form;
		const selected = Object.entries(d.value)[0];
		fields.forEach(([key, type], i) => {
			if (key === selected[0]) {
				const open = form.ui.open;
				open.selectedIndex = i;
				open.dispatchEvent(new Event(form.ui.event));
				renderValue(type, form.form[0], selected[1]);
			}
		});
	}
	visitVec(_t, ty, d) {
		const form = d.input.ui.form;
		const len = d.value.length;
		const open = form.ui.open;
		open.value = len;
		open.dispatchEvent(new Event(form.ui.event));
		d.value.forEach((v, i) => {
			renderValue(ty, form.form[i], v);
		});
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/utils/buffer.js
/**
* Returns a true Uint8Array from an ArrayBufferLike object.
* @param bufLike a buffer-like object
* @returns Uint8Array
*/
function uint8FromBufLike(bufLike) {
	if (!bufLike) throw new Error("Input cannot be null or undefined");
	if (bufLike instanceof Uint8Array) return bufLike;
	if (bufLike instanceof ArrayBuffer) return new Uint8Array(bufLike);
	if (Array.isArray(bufLike)) return new Uint8Array(bufLike);
	if ("buffer" in bufLike) return uint8FromBufLike(bufLike.buffer);
	return new Uint8Array(bufLike);
}
/**
* Compares two Uint8Arrays for equality.
* @param a The first Uint8Array.
* @param b The second Uint8Array.
* @returns True if the Uint8Arrays are equal, false otherwise.
*/
function uint8Equals(a, b) {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/request_id.js
/**
*
* @param value unknown value
* @returns Uint8Array
*/
function hashValue(value) {
	if (typeof value === "string") return hashString(value);
	if (typeof value === "number") return sha256(lebEncode(value));
	if (value instanceof Uint8Array || ArrayBuffer.isView(value)) return sha256(uint8FromBufLike(value));
	if (Array.isArray(value)) return sha256(concatBytes(...value.map(hashValue)));
	if (value && typeof value === "object" && value._isPrincipal) return sha256(value.toUint8Array());
	if (typeof value === "object" && value !== null && typeof value.toHash === "function") return hashValue(value.toHash());
	if (typeof value === "object") return hashOfMap(value);
	if (typeof value === "bigint") return sha256(lebEncode(value));
	throw InputError.fromCode(new HashValueErrorCode(value));
}
var hashString = (value) => {
	return sha256(new TextEncoder().encode(value));
};
/**
* Get the RequestId of the provided ic-ref request.
* RequestId is the result of the representation-independent-hash function.
* https://sdk.dfinity.org/docs/interface-spec/index.html#hash-of-map
* @param request - ic-ref request to hash into RequestId
*/
function requestIdOf(request) {
	return hashOfMap(request);
}
/**
* Hash a map into a Uint8Array using the representation-independent-hash function.
* https://sdk.dfinity.org/docs/interface-spec/index.html#hash-of-map
* @param map - Any non-nested object
* @returns Uint8Array
*/
function hashOfMap(map) {
	return sha256(concatBytes(...Object.entries(map).filter(([, value]) => value !== void 0).map(([key, value]) => {
		return [hashString(key), hashValue(value)];
	}).sort(([k1], [k2]) => {
		return compare(k1, k2);
	}).map((x) => concatBytes(...x))));
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/constants.js
/**
* The `\x0Dic-state-root` domain separator used in the root hash of IC certificates.
*/
var IC_STATE_ROOT_DOMAIN_SEPARATOR = new TextEncoder().encode("\ric-state-root");
/**
* The `\x0Aic-request` domain separator used in the signature of IC requests.
*/
var IC_REQUEST_DOMAIN_SEPARATOR = new TextEncoder().encode("\nic-request");
/**
* The `\x0Bic-response` domain separator used in the signature of IC responses.
*/
var IC_RESPONSE_DOMAIN_SEPARATOR = new TextEncoder().encode("\vic-response");
/**
* The `\x1Aic-request-auth-delegation` domain separator used in the signature of delegations.
*/
var IC_REQUEST_AUTH_DELEGATION_DOMAIN_SEPARATOR = new TextEncoder().encode("ic-request-auth-delegation");
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/auth.js
/**
* An Identity that can sign blobs.
*/
var SignIdentity = class {
	/**
	* Get the principal represented by this identity. Normally should be a
	* `Principal.selfAuthenticating()`.
	*/
	getPrincipal() {
		if (!this._principal) this._principal = Principal$1.selfAuthenticating(new Uint8Array(this.getPublicKey().toDer()));
		return this._principal;
	}
	/**
	* Transform a request into a signed version of the request. This is done last
	* after the transforms on the body of a request. The returned object can be
	* anything, but must be serializable to CBOR.
	* @param request - internet computer request to transform
	*/
	async transformRequest(request) {
		const { body, ...fields } = request;
		const requestId = requestIdOf(body);
		return {
			...fields,
			body: {
				content: body,
				sender_pubkey: this.getPublicKey().toDer(),
				sender_sig: await this.sign(concatBytes(IC_REQUEST_DOMAIN_SEPARATOR, requestId))
			}
		};
	}
};
var AnonymousIdentity = class {
	getPrincipal() {
		return Principal$1.anonymous();
	}
	async transformRequest(request) {
		return {
			...request,
			body: { content: request.body }
		};
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@dfinity+cbor@0.2.3/node_modules/@dfinity/cbor/dist/cbor.mjs
var w = class extends Error {
	constructor(e) {
		super(e), this.name = "DecodingError";
	}
};
var L = 55799;
var R = /* @__PURE__ */ Symbol("CBOR_STOP_CODE");
var u = /* @__PURE__ */ ((t) => (t[t.False = 20] = "False", t[t.True = 21] = "True", t[t.Null = 22] = "Null", t[t.Undefined = 23] = "Undefined", t[t.Break = 31] = "Break", t))(u || {});
var c = /* @__PURE__ */ ((t) => (t[t.UnsignedInteger = 0] = "UnsignedInteger", t[t.NegativeInteger = 1] = "NegativeInteger", t[t.ByteString = 2] = "ByteString", t[t.TextString = 3] = "TextString", t[t.Array = 4] = "Array", t[t.Map = 5] = "Map", t[t.Tag = 6] = "Tag", t[t.Simple = 7] = "Simple", t))(c || {});
var Y = 23;
var G = 255;
var P = 65535;
var H = 4294967295;
var W = BigInt("0xffffffffffffffff");
var f = /* @__PURE__ */ ((t) => (t[t.Value = 23] = "Value", t[t.OneByte = 24] = "OneByte", t[t.TwoBytes = 25] = "TwoBytes", t[t.FourBytes = 26] = "FourBytes", t[t.EightBytes = 27] = "EightBytes", t[t.Indefinite = 31] = "Indefinite", t))(f || {});
var l = !1;
function K(t) {
	return t == null;
}
function Z(t, e) {
	const n = new Uint8Array(e);
	return n.set(t), n;
}
var q = new TextDecoder();
function J(t) {
	return (t & 224) >> 5;
}
function Q(t) {
	return t & 31;
}
var S = /* @__PURE__ */ new Uint8Array();
var U;
var d = 0;
function ut(t, e) {
	S = t, d = 0;
	const n = B(e);
	return e?.(n) ?? n;
}
function B(t) {
	const [e, n] = N();
	switch (e) {
		case c.UnsignedInteger: return h(n);
		case c.NegativeInteger: return M(n);
		case c.ByteString: return $(n);
		case c.TextString: return F(n);
		case c.Array: return p(n, t);
		case c.Map: return j(n, t);
		case c.Tag: return v(n, t);
		case c.Simple: return b(n);
	}
	throw new w(`Unsupported major type: ${e}`);
}
function N() {
	const t = S.at(d);
	if (K(t)) throw new w("Provided CBOR data is empty");
	const e = J(t), n = Q(t);
	return d++, [e, n];
}
function p(t, e) {
	const n = h(t);
	if (n === 1 / 0) {
		const o = [];
		let i = B(e);
		for (; i !== R;) o.push(e?.(i) ?? i), i = B(e);
		return o;
	}
	const s = new Array(n);
	for (let o = 0; o < n; o++) {
		const i = B(e);
		s[o] = e?.(i) ?? i;
	}
	return s;
}
function b(t) {
	switch (t) {
		case u.False: return !1;
		case u.True: return !0;
		case u.Null: return null;
		case u.Undefined: return;
		case u.Break: return R;
	}
	throw new w(`Unrecognized simple type: ${t.toString(2)}`);
}
function j(t, e) {
	const n = h(t), s = {};
	if (n === 1 / 0) {
		let [o, i] = N();
		for (; o !== c.Simple && i !== u.Break;) {
			const A = F(i), I = B(e);
			s[A] = e?.(I, A) ?? I, [o, i] = N();
		}
		return s;
	}
	for (let o = 0; o < n; o++) {
		const [i, A] = N();
		if (i !== c.TextString) throw new w("Map keys must be text strings");
		const I = F(A), D = B(e);
		s[I] = e?.(D, I) ?? D;
	}
	return s;
}
function h(t) {
	if (t <= f.Value) return t;
	switch (U = new DataView(S.buffer, S.byteOffset + d), t) {
		case f.OneByte: return d++, U.getUint8(0);
		case f.TwoBytes: return d += 2, U.getUint16(0, l);
		case f.FourBytes: return d += 4, U.getUint32(0, l);
		case f.EightBytes: return d += 8, U.getBigUint64(0, l);
		case f.Indefinite: return 1 / 0;
		default: throw new w(`Unsupported integer info: ${t.toString(2)}`);
	}
}
function M(t) {
	const e = h(t);
	return typeof e == "number" ? -1 - e : -1n - e;
}
function $(t) {
	const e = h(t);
	if (e > Number.MAX_SAFE_INTEGER) throw new w("Byte length is too large");
	const n = Number(e);
	return d += n, S.slice(d - n, d);
}
function F(t) {
	const e = $(t);
	return q.decode(e);
}
function v(t, e) {
	const n = h(t);
	if (n === L) return B(e);
	throw new w(`Unsupported tag: ${n}.`);
}
var x = class extends Error {
	constructor(e) {
		super(e), this.name = "SerializationError";
	}
};
var C = 2048;
var V = 100;
var tt = new TextEncoder();
function y(t) {
	return t << 5;
}
var a = new Uint8Array(C);
var g = new DataView(a.buffer);
var r = 0;
var O = [];
function gt(t, e) {
	r = 0;
	return ft(L, e?.(t) ?? t, e), a.slice(0, r);
}
function k(t) {
	let e = a.length * 2;
	for (; e < t;) e *= 2;
	a = Z(a, e), g = new DataView(a.buffer);
}
function _(t, e) {
	if (t === !1 || t === !0 || t === null || t === void 0) {
		rt(t);
		return;
	}
	if (typeof t == "number" || typeof t == "bigint") {
		ot(t);
		return;
	}
	if (typeof t == "string") {
		z(t);
		return;
	}
	if (t instanceof Uint8Array) {
		m(t);
		return;
	}
	if (t instanceof ArrayBuffer) {
		m(new Uint8Array(t));
		return;
	}
	if (Array.isArray(t)) {
		et(t, e);
		return;
	}
	if (typeof t == "object") {
		nt(t, e);
		return;
	}
	throw new x(`Unsupported type: ${typeof t}`);
}
function et(t, e) {
	E(c.Array, t.length), t.forEach((n, s) => {
		_(e?.(n, s.toString()) ?? n, e);
	});
}
function nt(t, e) {
	O = Object.entries(t), E(c.Map, O.length), O.forEach(([n, s]) => {
		z(n), _(e?.(s, n) ?? s, e);
	});
}
function E(t, e) {
	if (r > a.length - V && k(r + V), e <= Y) {
		g.setUint8(r++, y(t) | Number(e));
		return;
	}
	if (e <= G) {
		g.setUint8(r++, y(t) | f.OneByte), g.setUint8(r, Number(e)), r += 1;
		return;
	}
	if (e <= P) {
		g.setUint8(r++, y(t) | f.TwoBytes), g.setUint16(r, Number(e), l), r += 2;
		return;
	}
	if (e <= H) {
		g.setUint8(r++, y(t) | f.FourBytes), g.setUint32(r, Number(e), l), r += 4;
		return;
	}
	if (e <= W) {
		g.setUint8(r++, y(t) | f.EightBytes), g.setBigUint64(r, BigInt(e), l), r += 8;
		return;
	}
	throw new x(`Value too large to encode: ${e}`);
}
function rt(t) {
	E(c.Simple, ct(t));
}
function ct(t) {
	if (t === !1) return u.False;
	if (t === !0) return u.True;
	if (t === null) return u.Null;
	if (t === void 0) return u.Undefined;
	throw new x(`Unrecognized simple value: ${t.toString()}`);
}
function T(t, e) {
	E(t, e.length), r > a.length - e.length && k(r + e.length), a.set(e, r), r += e.length;
}
function X(t, e) {
	E(t, e);
}
function it(t) {
	X(c.UnsignedInteger, t);
}
function st(t) {
	X(c.NegativeInteger, typeof t == "bigint" ? -1n - t : -1 - t);
}
function ot(t) {
	t >= 0 ? it(t) : st(t);
}
function z(t) {
	T(c.TextString, tt.encode(t));
}
function m(t) {
	T(c.ByteString, t);
}
function ft(t, e, n) {
	E(c.Tag, t), _(e, n);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/agent/http/expiry.js
var JSON_KEY_EXPIRY = "__expiry__";
var SECONDS_TO_MILLISECONDS = BigInt(1e3);
var MILLISECONDS_TO_NANOSECONDS = BigInt(1e6);
var MINUTES_TO_MILLISECONDS = BigInt(60) * SECONDS_TO_MILLISECONDS;
var EXPIRY_DELTA_THRESHOLD_MILLISECONDS = BigInt(1) * MINUTES_TO_MILLISECONDS;
function roundToSecond(millis) {
	return millis / SECONDS_TO_MILLISECONDS * SECONDS_TO_MILLISECONDS;
}
function roundToMinute(millis) {
	return millis / MINUTES_TO_MILLISECONDS * MINUTES_TO_MILLISECONDS;
}
var Expiry = class Expiry {
	constructor(__expiry__) {
		this.__expiry__ = __expiry__;
		this._isExpiry = true;
	}
	/**
	* Creates an Expiry object from a delta in milliseconds.
	* The expiry is calculated as: current_time + delta + clock_drift
	* The resulting expiry is then rounded:
	* - If rounding down to the nearest minute still provides at least 60 seconds in the future, use minute precision
	* - Otherwise, use second precision
	* @param deltaInMs The milliseconds to add to the current time.
	* @param clockDriftInMs The milliseconds to add to the current time, typically the clock drift between IC network clock and the client's clock. Defaults to `0` if not provided.
	* @returns {Expiry} The constructed Expiry object.
	*/
	static fromDeltaInMilliseconds(deltaInMs, clockDriftInMs = 0) {
		const correctedNowMs = BigInt(Date.now()) + BigInt(clockDriftInMs);
		const expiryMs = correctedNowMs + BigInt(deltaInMs);
		const roundedToMinute = roundToMinute(expiryMs);
		let roundedExpiryMs;
		if (roundedToMinute >= correctedNowMs + EXPIRY_DELTA_THRESHOLD_MILLISECONDS) roundedExpiryMs = roundedToMinute;
		else roundedExpiryMs = roundToSecond(expiryMs);
		return new Expiry(roundedExpiryMs * MILLISECONDS_TO_NANOSECONDS);
	}
	toBigInt() {
		return this.__expiry__;
	}
	toHash() {
		return lebEncode(this.__expiry__);
	}
	toString() {
		return this.__expiry__.toString();
	}
	/**
	* Serializes to JSON
	* @returns {JsonnableExpiry} a JSON object with a single key, {@link JSON_KEY_EXPIRY}, whose value is the expiry as a string
	*/
	toJSON() {
		return { [JSON_KEY_EXPIRY]: this.toString() };
	}
	/**
	* Deserializes a {@link JsonnableExpiry} object from a JSON string.
	* @param input The JSON string to deserialize.
	* @returns {Expiry} The deserialized Expiry object.
	*/
	static fromJSON(input) {
		const obj = JSON.parse(input);
		if (obj["__expiry__"]) try {
			const expiry = BigInt(obj[JSON_KEY_EXPIRY]);
			return new Expiry(expiry);
		} catch (error) {
			throw new InputError(new ExpiryJsonDeserializeErrorCode(`Not a valid BigInt: ${error}`));
		}
		throw new InputError(new ExpiryJsonDeserializeErrorCode(`The input does not contain the key ${JSON_KEY_EXPIRY}`));
	}
	static isExpiry(other) {
		return other instanceof Expiry || typeof other === "object" && other !== null && "_isExpiry" in other && other["_isExpiry"] === true && "__expiry__" in other && typeof other["__expiry__"] === "bigint";
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/cbor.js
function hasCborValueMethod(value) {
	return typeof value === "object" && value !== null && "toCborValue" in value;
}
/**
* Encode a JavaScript value into CBOR. If the value is an instance of {@link ToCborValue},
* the {@link ToCborValue.toCborValue} method will be called to get the value to encode.
* @param value The value to encode
*/
function encode(value) {
	try {
		return gt(value, (value) => {
			if (Principal$1.isPrincipal(value)) return value.toUint8Array();
			if (Expiry.isExpiry(value)) return value.toBigInt();
			if (hasCborValueMethod(value)) return value.toCborValue();
			return value;
		});
	} catch (error) {
		throw InputError.fromCode(new CborEncodeErrorCode(error, value));
	}
}
/**
* Decode a CBOR encoded value into a JavaScript value.
* @param input The CBOR encoded value
*/
function decode(input) {
	try {
		return ut(input);
	} catch (error) {
		throw InputError.fromCode(new CborDecodeErrorCode(error, input));
	}
}
var Cbor = {
	encode,
	decode
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/utils/random.js
/**
* Generates a random unsigned 32-bit integer between 0 and 0xffffffff
* @returns {number} a random number
*/
var randomNumber = () => {
	if (typeof window !== "undefined" && !!window.crypto && !!window.crypto.getRandomValues) {
		const array = /* @__PURE__ */ new Uint32Array(1);
		window.crypto.getRandomValues(array);
		return array[0];
	}
	if (typeof crypto !== "undefined" && crypto.getRandomValues) {
		const array = /* @__PURE__ */ new Uint32Array(1);
		crypto.getRandomValues(array);
		return array[0];
	}
	if (typeof crypto !== "undefined" && crypto.randomInt) return crypto.randomInt(0, 4294967295);
	return Math.floor(Math.random() * 4294967295);
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/agent/http/types.js
/**
* @internal
*/
var Endpoint;
(function(Endpoint) {
	Endpoint["Query"] = "read";
	Endpoint["ReadState"] = "read_state";
	Endpoint["Call"] = "call";
})(Endpoint || (Endpoint = {}));
var SubmitRequestType;
(function(SubmitRequestType) {
	SubmitRequestType["Call"] = "call";
})(SubmitRequestType || (SubmitRequestType = {}));
var ReadRequestType;
(function(ReadRequestType) {
	ReadRequestType["Query"] = "query";
	ReadRequestType["ReadState"] = "read_state";
})(ReadRequestType || (ReadRequestType = {}));
/**
* Possible values for the request status in the IC state tree.
* @see https://internetcomputer.org/docs/references/ic-interface-spec#state-tree-request-status
*/
var RequestStatusResponseStatus;
(function(RequestStatusResponseStatus) {
	/** The call has made it past the endpoint into the IC's state. */
	RequestStatusResponseStatus["Received"] = "received";
	/** The initial effect of the call has happened or will happen. */
	RequestStatusResponseStatus["Processing"] = "processing";
	/** The call completed successfully; the reply is available at `/request_status/<id>/reply`. */
	RequestStatusResponseStatus["Replied"] = "replied";
	/** The call failed; reject code and message are available at `/request_status/<id>/reject_code` and `/request_status/<id>/reject_message`. */
	RequestStatusResponseStatus["Rejected"] = "rejected";
	/** The request status path is absent from the state tree, the request is unknown to the IC (never received or pruned after expiry). */
	RequestStatusResponseStatus["Unknown"] = "unknown";
	/** The IC has pruned the response data but remembers the request to prevent replay attacks. */
	RequestStatusResponseStatus["Done"] = "done";
})(RequestStatusResponseStatus || (RequestStatusResponseStatus = {}));
/**
* Create a random Nonce, based on random values
*/
function makeNonce() {
	const buffer = /* @__PURE__ */ new ArrayBuffer(16);
	const view = new DataView(buffer);
	const rand1 = randomNumber();
	const rand2 = randomNumber();
	const rand3 = randomNumber();
	const rand4 = randomNumber();
	view.setUint32(0, rand1);
	view.setUint32(4, rand2);
	view.setUint32(8, rand3);
	view.setUint32(12, rand4);
	return Object.assign(new Uint8Array(buffer), { __nonce__: void 0 });
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/agent/http/transforms.js
/**
* Create a Nonce transform, which takes a function that returns a Buffer, and adds it
* as the nonce to every call requests.
* @param nonceFn A function that returns a buffer. By default uses a semi-random method.
*/
function makeNonceTransform(nonceFn = makeNonce) {
	return async (request) => {
		const headers = request.request.headers;
		request.request.headers = headers;
		if (request.endpoint === Endpoint.Call) request.body.nonce = nonceFn();
	};
}
/**
* Maps the default fetch headers field to the serializable HttpHeaderField.
* @param headers Fetch definition of the headers type
* @returns array of header fields
*/
function httpHeadersTransform(headers) {
	const headerFields = [];
	headers.forEach((value, key) => {
		headerFields.push([key, value]);
	});
	return headerFields;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+curves@1.9.7/node_modules/@noble/curves/esm/utils.js
/**
* Hex, bytes and number utilities.
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n$8 = /* @__PURE__ */ BigInt(0);
var _1n$8 = /* @__PURE__ */ BigInt(1);
function _abool2(value, title = "") {
	if (typeof value !== "boolean") {
		const prefix = title && `"${title}"`;
		throw new Error(prefix + "expected boolean, got type=" + typeof value);
	}
	return value;
}
/** Asserts something is Uint8Array. */
function _abytes2(value, length, title = "") {
	const bytes = isBytes(value);
	const len = value?.length;
	const needsLen = length !== void 0;
	if (!bytes || needsLen && len !== length) {
		const prefix = title && `"${title}" `;
		const ofLen = needsLen ? ` of length ${length}` : "";
		const got = bytes ? `length=${len}` : `type=${typeof value}`;
		throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
	}
	return value;
}
function hexToNumber(hex) {
	if (typeof hex !== "string") throw new Error("hex string expected, got " + typeof hex);
	return hex === "" ? _0n$8 : BigInt("0x" + hex);
}
function bytesToNumberBE(bytes) {
	return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
	abytes(bytes);
	return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n, len) {
	return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
	return numberToBytesBE(n, len).reverse();
}
/**
* Takes hex string or Uint8Array, converts to Uint8Array.
* Validates output length.
* Will throw error for other types.
* @param title descriptive title for an error e.g. 'secret key'
* @param hex hex string or Uint8Array
* @param expectedLength optional, will compare to result array's length
* @returns
*/
function ensureBytes(title, hex, expectedLength) {
	let res;
	if (typeof hex === "string") try {
		res = hexToBytes(hex);
	} catch (e) {
		throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
	}
	else if (isBytes(hex)) res = Uint8Array.from(hex);
	else throw new Error(title + " must be hex string or Uint8Array");
	const len = res.length;
	if (typeof expectedLength === "number" && len !== expectedLength) throw new Error(title + " of length " + expectedLength + " expected, got " + len);
	return res;
}
function equalBytes(a, b) {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
	return diff === 0;
}
/**
* Copies Uint8Array. We can't use u8a.slice(), because u8a can be Buffer,
* and Buffer#slice creates mutable copy. Never use Buffers!
*/
function copyBytes(bytes) {
	return Uint8Array.from(bytes);
}
/**
* @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
*/
/**
* Converts bytes to string using UTF8 encoding.
* @example bytesToUtf8(Uint8Array.from([97, 98, 99])) // 'abc'
*/
var isPosBig = (n) => typeof n === "bigint" && _0n$8 <= n;
function inRange(n, min, max) {
	return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
/**
* Asserts min <= n < max. NOTE: It's < max and not <= max.
* @example
* aInRange('x', x, 1n, 256n); // would assume x is in (1n..255n)
*/
function aInRange(title, n, min, max) {
	if (!inRange(n, min, max)) throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
}
/**
* Calculates amount of bits in a bigint.
* Same as `n.toString(2).length`
* TODO: merge with nLength in modular
*/
function bitLen(n) {
	let len = 0;
	for (; n > _0n$8; n >>= _1n$8, len += 1);
	return len;
}
/**
* Gets single bit at position.
* NOTE: first bit position is 0 (same as arrays)
* Same as `!!+Array.from(n.toString(2)).reverse()[pos]`
*/
function bitGet(n, pos) {
	return n >> BigInt(pos) & _1n$8;
}
/**
* Calculate mask for N bits. Not using ** operator with bigints because of old engines.
* Same as BigInt(`0b${Array(i).fill('1').join('')}`)
*/
var bitMask = (n) => (_1n$8 << BigInt(n)) - _1n$8;
function isHash(val) {
	return typeof val === "function" && Number.isSafeInteger(val.outputLen);
}
function _validateObject(object, fields, optFields = {}) {
	if (!object || typeof object !== "object") throw new Error("expected valid options object");
	function checkField(fieldName, expectedType, isOpt) {
		const val = object[fieldName];
		if (isOpt && val === void 0) return;
		const current = typeof val;
		if (current !== expectedType || val === null) throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
	}
	Object.entries(fields).forEach(([k, v]) => checkField(k, v, false));
	Object.entries(optFields).forEach(([k, v]) => checkField(k, v, true));
}
/**
* throws not implemented error
*/
var notImplemented = () => {
	throw new Error("not implemented");
};
/**
* Memoizes (caches) computation result.
* Uses WeakMap: the value is going auto-cleaned by GC after last reference is removed.
*/
function memoized(fn) {
	const map = /* @__PURE__ */ new WeakMap();
	return (arg, ...args) => {
		const val = map.get(arg);
		if (val !== void 0) return val;
		const computed = fn(arg, ...args);
		map.set(arg, computed);
		return computed;
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+curves@1.9.7/node_modules/@noble/curves/esm/abstract/modular.js
/**
* Utils for modular division and fields.
* Field over 11 is a finite (Galois) field is integer number operations `mod 11`.
* There is no division: it is replaced by modular multiplicative inverse.
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n$7 = BigInt(0);
var _1n$7 = BigInt(1);
var _2n$6 = /* @__PURE__ */ BigInt(2);
var _3n$4 = /* @__PURE__ */ BigInt(3);
var _4n$2 = /* @__PURE__ */ BigInt(4);
var _5n$1 = /* @__PURE__ */ BigInt(5);
var _7n = /* @__PURE__ */ BigInt(7);
var _8n$2 = /* @__PURE__ */ BigInt(8);
var _9n = /* @__PURE__ */ BigInt(9);
var _16n = /* @__PURE__ */ BigInt(16);
function mod(a, b) {
	const result = a % b;
	return result >= _0n$7 ? result : b + result;
}
/** Does `x^(2^power)` mod p. `pow2(30, 4)` == `30^(2^4)` */
function pow2(x, power, modulo) {
	let res = x;
	while (power-- > _0n$7) {
		res *= res;
		res %= modulo;
	}
	return res;
}
/**
* Inverses number over modulo.
* Implemented using [Euclidean GCD](https://brilliant.org/wiki/extended-euclidean-algorithm/).
*/
function invert(number, modulo) {
	if (number === _0n$7) throw new Error("invert: expected non-zero number");
	if (modulo <= _0n$7) throw new Error("invert: expected positive modulus, got " + modulo);
	let a = mod(number, modulo);
	let b = modulo;
	let x = _0n$7, y = _1n$7, u = _1n$7, v = _0n$7;
	while (a !== _0n$7) {
		const q = b / a;
		const r = b % a;
		const m = x - u * q;
		const n = y - v * q;
		b = a, a = r, x = u, y = v, u = m, v = n;
	}
	if (b !== _1n$7) throw new Error("invert: does not exist");
	return mod(x, modulo);
}
function assertIsSquare(Fp, root, n) {
	if (!Fp.eql(Fp.sqr(root), n)) throw new Error("Cannot find square root");
}
function sqrt3mod4(Fp, n) {
	const p1div4 = (Fp.ORDER + _1n$7) / _4n$2;
	const root = Fp.pow(n, p1div4);
	assertIsSquare(Fp, root, n);
	return root;
}
function sqrt5mod8(Fp, n) {
	const p5div8 = (Fp.ORDER - _5n$1) / _8n$2;
	const n2 = Fp.mul(n, _2n$6);
	const v = Fp.pow(n2, p5div8);
	const nv = Fp.mul(n, v);
	const i = Fp.mul(Fp.mul(nv, _2n$6), v);
	const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
	assertIsSquare(Fp, root, n);
	return root;
}
function sqrt9mod16(P) {
	const Fp_ = Field(P);
	const tn = tonelliShanks(P);
	const c1 = tn(Fp_, Fp_.neg(Fp_.ONE));
	const c2 = tn(Fp_, c1);
	const c3 = tn(Fp_, Fp_.neg(c1));
	const c4 = (P + _7n) / _16n;
	return (Fp, n) => {
		let tv1 = Fp.pow(n, c4);
		let tv2 = Fp.mul(tv1, c1);
		const tv3 = Fp.mul(tv1, c2);
		const tv4 = Fp.mul(tv1, c3);
		const e1 = Fp.eql(Fp.sqr(tv2), n);
		const e2 = Fp.eql(Fp.sqr(tv3), n);
		tv1 = Fp.cmov(tv1, tv2, e1);
		tv2 = Fp.cmov(tv4, tv3, e2);
		const e3 = Fp.eql(Fp.sqr(tv2), n);
		const root = Fp.cmov(tv1, tv2, e3);
		assertIsSquare(Fp, root, n);
		return root;
	};
}
/**
* Tonelli-Shanks square root search algorithm.
* 1. https://eprint.iacr.org/2012/685.pdf (page 12)
* 2. Square Roots from 1; 24, 51, 10 to Dan Shanks
* @param P field order
* @returns function that takes field Fp (created from P) and number n
*/
function tonelliShanks(P) {
	if (P < _3n$4) throw new Error("sqrt is not defined for small field");
	let Q = P - _1n$7;
	let S = 0;
	while (Q % _2n$6 === _0n$7) {
		Q /= _2n$6;
		S++;
	}
	let Z = _2n$6;
	const _Fp = Field(P);
	while (FpLegendre(_Fp, Z) === 1) if (Z++ > 1e3) throw new Error("Cannot find square root: probably non-prime P");
	if (S === 1) return sqrt3mod4;
	let cc = _Fp.pow(Z, Q);
	const Q1div2 = (Q + _1n$7) / _2n$6;
	return function tonelliSlow(Fp, n) {
		if (Fp.is0(n)) return n;
		if (FpLegendre(Fp, n) !== 1) throw new Error("Cannot find square root");
		let M = S;
		let c = Fp.mul(Fp.ONE, cc);
		let t = Fp.pow(n, Q);
		let R = Fp.pow(n, Q1div2);
		while (!Fp.eql(t, Fp.ONE)) {
			if (Fp.is0(t)) return Fp.ZERO;
			let i = 1;
			let t_tmp = Fp.sqr(t);
			while (!Fp.eql(t_tmp, Fp.ONE)) {
				i++;
				t_tmp = Fp.sqr(t_tmp);
				if (i === M) throw new Error("Cannot find square root");
			}
			const exponent = _1n$7 << BigInt(M - i - 1);
			const b = Fp.pow(c, exponent);
			M = i;
			c = Fp.sqr(b);
			t = Fp.mul(t, c);
			R = Fp.mul(R, b);
		}
		return R;
	};
}
/**
* Square root for a finite field. Will try optimized versions first:
*
* 1. P ≡ 3 (mod 4)
* 2. P ≡ 5 (mod 8)
* 3. P ≡ 9 (mod 16)
* 4. Tonelli-Shanks algorithm
*
* Different algorithms can give different roots, it is up to user to decide which one they want.
* For example there is FpSqrtOdd/FpSqrtEven to choice root based on oddness (used for hash-to-curve).
*/
function FpSqrt(P) {
	if (P % _4n$2 === _3n$4) return sqrt3mod4;
	if (P % _8n$2 === _5n$1) return sqrt5mod8;
	if (P % _16n === _9n) return sqrt9mod16(P);
	return tonelliShanks(P);
}
var isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n$7) === _1n$7;
var FIELD_FIELDS = [
	"create",
	"isValid",
	"is0",
	"neg",
	"inv",
	"sqrt",
	"sqr",
	"eql",
	"add",
	"sub",
	"mul",
	"pow",
	"div",
	"addN",
	"subN",
	"mulN",
	"sqrN"
];
function validateField(field) {
	_validateObject(field, FIELD_FIELDS.reduce((map, val) => {
		map[val] = "function";
		return map;
	}, {
		ORDER: "bigint",
		MASK: "bigint",
		BYTES: "number",
		BITS: "number"
	}));
	return field;
}
/**
* Same as `pow` but for Fp: non-constant-time.
* Unsafe in some contexts: uses ladder, so can expose bigint bits.
*/
function FpPow(Fp, num, power) {
	if (power < _0n$7) throw new Error("invalid exponent, negatives unsupported");
	if (power === _0n$7) return Fp.ONE;
	if (power === _1n$7) return num;
	let p = Fp.ONE;
	let d = num;
	while (power > _0n$7) {
		if (power & _1n$7) p = Fp.mul(p, d);
		d = Fp.sqr(d);
		power >>= _1n$7;
	}
	return p;
}
/**
* Efficiently invert an array of Field elements.
* Exception-free. Will return `undefined` for 0 elements.
* @param passZero map 0 to 0 (instead of undefined)
*/
function FpInvertBatch(Fp, nums, passZero = false) {
	const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
	const multipliedAcc = nums.reduce((acc, num, i) => {
		if (Fp.is0(num)) return acc;
		inverted[i] = acc;
		return Fp.mul(acc, num);
	}, Fp.ONE);
	const invertedAcc = Fp.inv(multipliedAcc);
	nums.reduceRight((acc, num, i) => {
		if (Fp.is0(num)) return acc;
		inverted[i] = Fp.mul(acc, inverted[i]);
		return Fp.mul(acc, num);
	}, invertedAcc);
	return inverted;
}
/**
* Legendre symbol.
* Legendre constant is used to calculate Legendre symbol (a | p)
* which denotes the value of a^((p-1)/2) (mod p).
*
* * (a | p) ≡ 1    if a is a square (mod p), quadratic residue
* * (a | p) ≡ -1   if a is not a square (mod p), quadratic non residue
* * (a | p) ≡ 0    if a ≡ 0 (mod p)
*/
function FpLegendre(Fp, n) {
	const p1mod2 = (Fp.ORDER - _1n$7) / _2n$6;
	const powered = Fp.pow(n, p1mod2);
	const yes = Fp.eql(powered, Fp.ONE);
	const zero = Fp.eql(powered, Fp.ZERO);
	const no = Fp.eql(powered, Fp.neg(Fp.ONE));
	if (!yes && !zero && !no) throw new Error("invalid Legendre symbol result");
	return yes ? 1 : zero ? 0 : -1;
}
function nLength(n, nBitLength) {
	if (nBitLength !== void 0) anumber(nBitLength);
	const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
	return {
		nBitLength: _nBitLength,
		nByteLength: Math.ceil(_nBitLength / 8)
	};
}
/**
* Creates a finite field. Major performance optimizations:
* * 1. Denormalized operations like mulN instead of mul.
* * 2. Identical object shape: never add or remove keys.
* * 3. `Object.freeze`.
* Fragile: always run a benchmark on a change.
* Security note: operations don't check 'isValid' for all elements for performance reasons,
* it is caller responsibility to check this.
* This is low-level code, please make sure you know what you're doing.
*
* Note about field properties:
* * CHARACTERISTIC p = prime number, number of elements in main subgroup.
* * ORDER q = similar to cofactor in curves, may be composite `q = p^m`.
*
* @param ORDER field order, probably prime, or could be composite
* @param bitLen how many bits the field consumes
* @param isLE (default: false) if encoding / decoding should be in little-endian
* @param redef optional faster redefinitions of sqrt and other methods
*/
function Field(ORDER, bitLenOrOpts, isLE = false, opts = {}) {
	if (ORDER <= _0n$7) throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
	let _nbitLength = void 0;
	let _sqrt = void 0;
	let modFromBytes = false;
	let allowedLengths = void 0;
	if (typeof bitLenOrOpts === "object" && bitLenOrOpts != null) {
		if (opts.sqrt || isLE) throw new Error("cannot specify opts in two arguments");
		const _opts = bitLenOrOpts;
		if (_opts.BITS) _nbitLength = _opts.BITS;
		if (_opts.sqrt) _sqrt = _opts.sqrt;
		if (typeof _opts.isLE === "boolean") isLE = _opts.isLE;
		if (typeof _opts.modFromBytes === "boolean") modFromBytes = _opts.modFromBytes;
		allowedLengths = _opts.allowedLengths;
	} else {
		if (typeof bitLenOrOpts === "number") _nbitLength = bitLenOrOpts;
		if (opts.sqrt) _sqrt = opts.sqrt;
	}
	const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, _nbitLength);
	if (BYTES > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
	let sqrtP;
	const f = Object.freeze({
		ORDER,
		isLE,
		BITS,
		BYTES,
		MASK: bitMask(BITS),
		ZERO: _0n$7,
		ONE: _1n$7,
		allowedLengths,
		create: (num) => mod(num, ORDER),
		isValid: (num) => {
			if (typeof num !== "bigint") throw new Error("invalid field element: expected bigint, got " + typeof num);
			return _0n$7 <= num && num < ORDER;
		},
		is0: (num) => num === _0n$7,
		isValidNot0: (num) => !f.is0(num) && f.isValid(num),
		isOdd: (num) => (num & _1n$7) === _1n$7,
		neg: (num) => mod(-num, ORDER),
		eql: (lhs, rhs) => lhs === rhs,
		sqr: (num) => mod(num * num, ORDER),
		add: (lhs, rhs) => mod(lhs + rhs, ORDER),
		sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
		mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
		pow: (num, power) => FpPow(f, num, power),
		div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
		sqrN: (num) => num * num,
		addN: (lhs, rhs) => lhs + rhs,
		subN: (lhs, rhs) => lhs - rhs,
		mulN: (lhs, rhs) => lhs * rhs,
		inv: (num) => invert(num, ORDER),
		sqrt: _sqrt || ((n) => {
			if (!sqrtP) sqrtP = FpSqrt(ORDER);
			return sqrtP(f, n);
		}),
		toBytes: (num) => isLE ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
		fromBytes: (bytes, skipValidation = true) => {
			if (allowedLengths) {
				if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) throw new Error("Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length);
				const padded = new Uint8Array(BYTES);
				padded.set(bytes, isLE ? 0 : padded.length - bytes.length);
				bytes = padded;
			}
			if (bytes.length !== BYTES) throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
			let scalar = isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
			if (modFromBytes) scalar = mod(scalar, ORDER);
			if (!skipValidation) {
				if (!f.isValid(scalar)) throw new Error("invalid field element: outside of range 0..ORDER");
			}
			return scalar;
		},
		invertBatch: (lst) => FpInvertBatch(f, lst),
		cmov: (a, b, c) => c ? b : a
	});
	return Object.freeze(f);
}
/**
* Returns total number of bytes consumed by the field element.
* For example, 32 bytes for usual 256-bit weierstrass curve.
* @param fieldOrder number of field elements, usually CURVE.n
* @returns byte length of field
*/
function getFieldBytesLength(fieldOrder) {
	if (typeof fieldOrder !== "bigint") throw new Error("field order must be bigint");
	const bitLength = fieldOrder.toString(2).length;
	return Math.ceil(bitLength / 8);
}
/**
* Returns minimal amount of bytes that can be safely reduced
* by field order.
* Should be 2^-128 for 128-bit curve such as P256.
* @param fieldOrder number of field elements, usually CURVE.n
* @returns byte length of target hash
*/
function getMinHashLength(fieldOrder) {
	const length = getFieldBytesLength(fieldOrder);
	return length + Math.ceil(length / 2);
}
/**
* "Constant-time" private key generation utility.
* Can take (n + n/2) or more bytes of uniform input e.g. from CSPRNG or KDF
* and convert them into private scalar, with the modulo bias being negligible.
* Needs at least 48 bytes of input for 32-byte private key.
* https://research.kudelskisecurity.com/2020/07/28/the-definitive-guide-to-modulo-bias-and-how-to-avoid-it/
* FIPS 186-5, A.2 https://csrc.nist.gov/publications/detail/fips/186/5/final
* RFC 9380, https://www.rfc-editor.org/rfc/rfc9380#section-5
* @param hash hash output from SHA3 or a similar function
* @param groupOrder size of subgroup - (e.g. secp256k1.CURVE.n)
* @param isLE interpret hash bytes as LE num
* @returns valid private scalar
*/
function mapHashToField(key, fieldOrder, isLE = false) {
	const len = key.length;
	const fieldLen = getFieldBytesLength(fieldOrder);
	const minLen = getMinHashLength(fieldOrder);
	if (len < 16 || len < minLen || len > 1024) throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
	const reduced = mod(isLE ? bytesToNumberLE(key) : bytesToNumberBE(key), fieldOrder - _1n$7) + _1n$7;
	return isLE ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+curves@1.9.7/node_modules/@noble/curves/esm/abstract/curve.js
/**
* Methods for elliptic curve multiplication by scalars.
* Contains wNAF, pippenger.
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n$6 = BigInt(0);
var _1n$6 = BigInt(1);
function negateCt(condition, item) {
	const neg = item.negate();
	return condition ? neg : item;
}
/**
* Takes a bunch of Projective Points but executes only one
* inversion on all of them. Inversion is very slow operation,
* so this improves performance massively.
* Optimization: converts a list of projective points to a list of identical points with Z=1.
*/
function normalizeZ(c, points) {
	const invertedZs = FpInvertBatch(c.Fp, points.map((p) => p.Z));
	return points.map((p, i) => c.fromAffine(p.toAffine(invertedZs[i])));
}
function validateW(W, bits) {
	if (!Number.isSafeInteger(W) || W <= 0 || W > bits) throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts(W, scalarBits) {
	validateW(W, scalarBits);
	const windows = Math.ceil(scalarBits / W) + 1;
	const windowSize = 2 ** (W - 1);
	const maxNumber = 2 ** W;
	return {
		windows,
		windowSize,
		mask: bitMask(W),
		maxNumber,
		shiftBy: BigInt(W)
	};
}
function calcOffsets(n, window, wOpts) {
	const { windowSize, mask, maxNumber, shiftBy } = wOpts;
	let wbits = Number(n & mask);
	let nextN = n >> shiftBy;
	if (wbits > windowSize) {
		wbits -= maxNumber;
		nextN += _1n$6;
	}
	const offsetStart = window * windowSize;
	const offset = offsetStart + Math.abs(wbits) - 1;
	const isZero = wbits === 0;
	const isNeg = wbits < 0;
	const isNegF = window % 2 !== 0;
	return {
		nextN,
		offset,
		isZero,
		isNeg,
		isNegF,
		offsetF: offsetStart
	};
}
function validateMSMPoints(points, c) {
	if (!Array.isArray(points)) throw new Error("array expected");
	points.forEach((p, i) => {
		if (!(p instanceof c)) throw new Error("invalid point at index " + i);
	});
}
function validateMSMScalars(scalars, field) {
	if (!Array.isArray(scalars)) throw new Error("array of scalars expected");
	scalars.forEach((s, i) => {
		if (!field.isValid(s)) throw new Error("invalid scalar at index " + i);
	});
}
var pointPrecomputes = /* @__PURE__ */ new WeakMap();
var pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P) {
	return pointWindowSizes.get(P) || 1;
}
function assert0(n) {
	if (n !== _0n$6) throw new Error("invalid wNAF");
}
/**
* Elliptic curve multiplication of Point by scalar. Fragile.
* Table generation takes **30MB of ram and 10ms on high-end CPU**,
* but may take much longer on slow devices. Actual generation will happen on
* first call of `multiply()`. By default, `BASE` point is precomputed.
*
* Scalars should always be less than curve order: this should be checked inside of a curve itself.
* Creates precomputation tables for fast multiplication:
* - private scalar is split by fixed size windows of W bits
* - every window point is collected from window's table & added to accumulator
* - since windows are different, same point inside tables won't be accessed more than once per calc
* - each multiplication is 'Math.ceil(CURVE_ORDER / 𝑊) + 1' point additions (fixed for any scalar)
* - +1 window is neccessary for wNAF
* - wNAF reduces table size: 2x less memory + 2x faster generation, but 10% slower multiplication
*
* @todo Research returning 2d JS array of windows, instead of a single window.
* This would allow windows to be in different memory locations
*/
var wNAF = class {
	constructor(Point, bits) {
		this.BASE = Point.BASE;
		this.ZERO = Point.ZERO;
		this.Fn = Point.Fn;
		this.bits = bits;
	}
	_unsafeLadder(elm, n, p = this.ZERO) {
		let d = elm;
		while (n > _0n$6) {
			if (n & _1n$6) p = p.add(d);
			d = d.double();
			n >>= _1n$6;
		}
		return p;
	}
	/**
	* Creates a wNAF precomputation window. Used for caching.
	* Default window size is set by `utils.precompute()` and is equal to 8.
	* Number of precomputed points depends on the curve size:
	* 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
	* - 𝑊 is the window size
	* - 𝑛 is the bitlength of the curve order.
	* For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
	* @param point Point instance
	* @param W window size
	* @returns precomputed point tables flattened to a single array
	*/
	precomputeWindow(point, W) {
		const { windows, windowSize } = calcWOpts(W, this.bits);
		const points = [];
		let p = point;
		let base = p;
		for (let window = 0; window < windows; window++) {
			base = p;
			points.push(base);
			for (let i = 1; i < windowSize; i++) {
				base = base.add(p);
				points.push(base);
			}
			p = base.double();
		}
		return points;
	}
	/**
	* Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
	* More compact implementation:
	* https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
	* @returns real and fake (for const-time) points
	*/
	wNAF(W, precomputes, n) {
		if (!this.Fn.isValid(n)) throw new Error("invalid scalar");
		let p = this.ZERO;
		let f = this.BASE;
		const wo = calcWOpts(W, this.bits);
		for (let window = 0; window < wo.windows; window++) {
			const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window, wo);
			n = nextN;
			if (isZero) f = f.add(negateCt(isNegF, precomputes[offsetF]));
			else p = p.add(negateCt(isNeg, precomputes[offset]));
		}
		assert0(n);
		return {
			p,
			f
		};
	}
	/**
	* Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
	* @param acc accumulator point to add result of multiplication
	* @returns point
	*/
	wNAFUnsafe(W, precomputes, n, acc = this.ZERO) {
		const wo = calcWOpts(W, this.bits);
		for (let window = 0; window < wo.windows; window++) {
			if (n === _0n$6) break;
			const { nextN, offset, isZero, isNeg } = calcOffsets(n, window, wo);
			n = nextN;
			if (isZero) continue;
			else {
				const item = precomputes[offset];
				acc = acc.add(isNeg ? item.negate() : item);
			}
		}
		assert0(n);
		return acc;
	}
	getPrecomputes(W, point, transform) {
		let comp = pointPrecomputes.get(point);
		if (!comp) {
			comp = this.precomputeWindow(point, W);
			if (W !== 1) {
				if (typeof transform === "function") comp = transform(comp);
				pointPrecomputes.set(point, comp);
			}
		}
		return comp;
	}
	cached(point, scalar, transform) {
		const W = getW(point);
		return this.wNAF(W, this.getPrecomputes(W, point, transform), scalar);
	}
	unsafe(point, scalar, transform, prev) {
		const W = getW(point);
		if (W === 1) return this._unsafeLadder(point, scalar, prev);
		return this.wNAFUnsafe(W, this.getPrecomputes(W, point, transform), scalar, prev);
	}
	createCache(P, W) {
		validateW(W, this.bits);
		pointWindowSizes.set(P, W);
		pointPrecomputes.delete(P);
	}
	hasCache(elm) {
		return getW(elm) !== 1;
	}
};
/**
* Endomorphism-specific multiplication for Koblitz curves.
* Cost: 128 dbl, 0-256 adds.
*/
function mulEndoUnsafe(Point, point, k1, k2) {
	let acc = point;
	let p1 = Point.ZERO;
	let p2 = Point.ZERO;
	while (k1 > _0n$6 || k2 > _0n$6) {
		if (k1 & _1n$6) p1 = p1.add(acc);
		if (k2 & _1n$6) p2 = p2.add(acc);
		acc = acc.double();
		k1 >>= _1n$6;
		k2 >>= _1n$6;
	}
	return {
		p1,
		p2
	};
}
/**
* Pippenger algorithm for multi-scalar multiplication (MSM, Pa + Qb + Rc + ...).
* 30x faster vs naive addition on L=4096, 10x faster than precomputes.
* For N=254bit, L=1, it does: 1024 ADD + 254 DBL. For L=5: 1536 ADD + 254 DBL.
* Algorithmically constant-time (for same L), even when 1 point + scalar, or when scalar = 0.
* @param c Curve Point constructor
* @param fieldN field over CURVE.N - important that it's not over CURVE.P
* @param points array of L curve points
* @param scalars array of L scalars (aka secret keys / bigints)
*/
function pippenger(c, fieldN, points, scalars) {
	validateMSMPoints(points, c);
	validateMSMScalars(scalars, fieldN);
	const plength = points.length;
	const slength = scalars.length;
	if (plength !== slength) throw new Error("arrays of points and scalars must have equal length");
	const zero = c.ZERO;
	const wbits = bitLen(BigInt(plength));
	let windowSize = 1;
	if (wbits > 12) windowSize = wbits - 3;
	else if (wbits > 4) windowSize = wbits - 2;
	else if (wbits > 0) windowSize = 2;
	const MASK = bitMask(windowSize);
	const buckets = new Array(Number(MASK) + 1).fill(zero);
	const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
	let sum = zero;
	for (let i = lastBits; i >= 0; i -= windowSize) {
		buckets.fill(zero);
		for (let j = 0; j < slength; j++) {
			const scalar = scalars[j];
			const wbits = Number(scalar >> BigInt(i) & MASK);
			buckets[wbits] = buckets[wbits].add(points[j]);
		}
		let resI = zero;
		for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
			sumI = sumI.add(buckets[j]);
			resI = resI.add(sumI);
		}
		sum = sum.add(resI);
		if (i !== 0) for (let j = 0; j < windowSize; j++) sum = sum.double();
	}
	return sum;
}
function createField(order, field, isLE) {
	if (field) {
		if (field.ORDER !== order) throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
		validateField(field);
		return field;
	} else return Field(order, { isLE });
}
/** Validates CURVE opts and creates fields */
function _createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
	if (FpFnLE === void 0) FpFnLE = type === "edwards";
	if (!CURVE || typeof CURVE !== "object") throw new Error(`expected valid ${type} CURVE object`);
	for (const p of [
		"p",
		"n",
		"h"
	]) {
		const val = CURVE[p];
		if (!(typeof val === "bigint" && val > _0n$6)) throw new Error(`CURVE.${p} must be positive bigint`);
	}
	const Fp = createField(CURVE.p, curveOpts.Fp, FpFnLE);
	const Fn = createField(CURVE.n, curveOpts.Fn, FpFnLE);
	const params = [
		"Gx",
		"Gy",
		"a",
		type === "weierstrass" ? "b" : "d"
	];
	for (const p of params) if (!Fp.isValid(CURVE[p])) throw new Error(`CURVE.${p} must be valid field element of CURVE.Fp`);
	CURVE = Object.freeze(Object.assign({}, CURVE));
	return {
		CURVE,
		Fp,
		Fn
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+curves@1.9.7/node_modules/@noble/curves/esm/abstract/hash-to-curve.js
var os2ip = bytesToNumberBE;
function i2osp(value, length) {
	anum(value);
	anum(length);
	if (value < 0 || value >= 1 << 8 * length) throw new Error("invalid I2OSP input: " + value);
	const res = Array.from({ length }).fill(0);
	for (let i = length - 1; i >= 0; i--) {
		res[i] = value & 255;
		value >>>= 8;
	}
	return new Uint8Array(res);
}
function strxor(a, b) {
	const arr = new Uint8Array(a.length);
	for (let i = 0; i < a.length; i++) arr[i] = a[i] ^ b[i];
	return arr;
}
function anum(item) {
	if (!Number.isSafeInteger(item)) throw new Error("number expected");
}
function normDST(DST) {
	if (!isBytes(DST) && typeof DST !== "string") throw new Error("DST must be Uint8Array or string");
	return typeof DST === "string" ? utf8ToBytes(DST) : DST;
}
/**
* Produces a uniformly random byte string using a cryptographic hash function H that outputs b bits.
* [RFC 9380 5.3.1](https://www.rfc-editor.org/rfc/rfc9380#section-5.3.1).
*/
function expand_message_xmd(msg, DST, lenInBytes, H) {
	abytes(msg);
	anum(lenInBytes);
	DST = normDST(DST);
	if (DST.length > 255) DST = H(concatBytes(utf8ToBytes("H2C-OVERSIZE-DST-"), DST));
	const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
	const ell = Math.ceil(lenInBytes / b_in_bytes);
	if (lenInBytes > 65535 || ell > 255) throw new Error("expand_message_xmd: invalid lenInBytes");
	const DST_prime = concatBytes(DST, i2osp(DST.length, 1));
	const Z_pad = i2osp(0, r_in_bytes);
	const l_i_b_str = i2osp(lenInBytes, 2);
	const b = new Array(ell);
	const b_0 = H(concatBytes(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
	b[0] = H(concatBytes(b_0, i2osp(1, 1), DST_prime));
	for (let i = 1; i <= ell; i++) {
		const args = [
			strxor(b_0, b[i - 1]),
			i2osp(i + 1, 1),
			DST_prime
		];
		b[i] = H(concatBytes(...args));
	}
	return concatBytes(...b).slice(0, lenInBytes);
}
/**
* Produces a uniformly random byte string using an extendable-output function (XOF) H.
* 1. The collision resistance of H MUST be at least k bits.
* 2. H MUST be an XOF that has been proved indifferentiable from
*    a random oracle under a reasonable cryptographic assumption.
* [RFC 9380 5.3.2](https://www.rfc-editor.org/rfc/rfc9380#section-5.3.2).
*/
function expand_message_xof(msg, DST, lenInBytes, k, H) {
	abytes(msg);
	anum(lenInBytes);
	DST = normDST(DST);
	if (DST.length > 255) {
		const dkLen = Math.ceil(2 * k / 8);
		DST = H.create({ dkLen }).update(utf8ToBytes("H2C-OVERSIZE-DST-")).update(DST).digest();
	}
	if (lenInBytes > 65535 || DST.length > 255) throw new Error("expand_message_xof: invalid lenInBytes");
	return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
}
/**
* Hashes arbitrary-length byte strings to a list of one or more elements of a finite field F.
* [RFC 9380 5.2](https://www.rfc-editor.org/rfc/rfc9380#section-5.2).
* @param msg a byte string containing the message to hash
* @param count the number of elements of F to output
* @param options `{DST: string, p: bigint, m: number, k: number, expand: 'xmd' | 'xof', hash: H}`, see above
* @returns [u_0, ..., u_(count - 1)], a list of field elements.
*/
function hash_to_field(msg, count, options) {
	_validateObject(options, {
		p: "bigint",
		m: "number",
		k: "number",
		hash: "function"
	});
	const { p, k, m, hash, expand, DST } = options;
	if (!isHash(options.hash)) throw new Error("expected valid hash");
	abytes(msg);
	anum(count);
	const log2p = p.toString(2).length;
	const L = Math.ceil((log2p + k) / 8);
	const len_in_bytes = count * m * L;
	let prb;
	if (expand === "xmd") prb = expand_message_xmd(msg, DST, len_in_bytes, hash);
	else if (expand === "xof") prb = expand_message_xof(msg, DST, len_in_bytes, k, hash);
	else if (expand === "_internal_pass") prb = msg;
	else throw new Error("expand must be \"xmd\" or \"xof\"");
	const u = new Array(count);
	for (let i = 0; i < count; i++) {
		const e = new Array(m);
		for (let j = 0; j < m; j++) {
			const elm_offset = L * (j + i * m);
			const tv = prb.subarray(elm_offset, elm_offset + L);
			e[j] = mod(os2ip(tv), p);
		}
		u[i] = e;
	}
	return u;
}
function isogenyMap(field, map) {
	const coeff = map.map((i) => Array.from(i).reverse());
	return (x, y) => {
		const [xn, xd, yn, yd] = coeff.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x), i)));
		const [xd_inv, yd_inv] = FpInvertBatch(field, [xd, yd], true);
		x = field.mul(xn, xd_inv);
		y = field.mul(y, field.mul(yn, yd_inv));
		return {
			x,
			y
		};
	};
}
var _DST_scalar = utf8ToBytes("HashToScalar-");
/** Creates hash-to-curve methods from EC Point and mapToCurve function. See {@link H2CHasher}. */
function createHasher(Point, mapToCurve, defaults) {
	if (typeof mapToCurve !== "function") throw new Error("mapToCurve() must be defined");
	function map(num) {
		return Point.fromAffine(mapToCurve(num));
	}
	function clear(initial) {
		const P = initial.clearCofactor();
		if (P.equals(Point.ZERO)) return Point.ZERO;
		P.assertValidity();
		return P;
	}
	return {
		defaults,
		hashToCurve(msg, options) {
			const u = hash_to_field(msg, 2, Object.assign({}, defaults, options));
			const u0 = map(u[0]);
			const u1 = map(u[1]);
			return clear(u0.add(u1));
		},
		encodeToCurve(msg, options) {
			const optsDst = defaults.encodeDST ? { DST: defaults.encodeDST } : {};
			return clear(map(hash_to_field(msg, 1, Object.assign({}, defaults, optsDst, options))[0]));
		},
		/** See {@link H2CHasher} */
		mapToCurve(scalars) {
			if (!Array.isArray(scalars)) throw new Error("expected array of bigints");
			for (const i of scalars) if (typeof i !== "bigint") throw new Error("expected array of bigints");
			return clear(map(scalars));
		},
		hashToScalar(msg, options) {
			const N = Point.Fn.ORDER;
			return hash_to_field(msg, 1, Object.assign({}, defaults, {
				p: N,
				m: 1,
				DST: _DST_scalar
			}, options))[0][0];
		}
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+curves@1.9.7/node_modules/@noble/curves/esm/abstract/weierstrass.js
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var divNearest = (num, den) => (num + (num >= 0 ? den : -den) / _2n$5) / den;
/**
* Splits scalar for GLV endomorphism.
*/
function _splitEndoScalar(k, basis, n) {
	const [[a1, b1], [a2, b2]] = basis;
	const c1 = divNearest(b2 * k, n);
	const c2 = divNearest(-b1 * k, n);
	let k1 = k - c1 * a1 - c2 * a2;
	let k2 = -c1 * b1 - c2 * b2;
	const k1neg = k1 < _0n$5;
	const k2neg = k2 < _0n$5;
	if (k1neg) k1 = -k1;
	if (k2neg) k2 = -k2;
	const MAX_NUM = bitMask(Math.ceil(bitLen(n) / 2)) + _1n$5;
	if (k1 < _0n$5 || k1 >= MAX_NUM || k2 < _0n$5 || k2 >= MAX_NUM) throw new Error("splitScalar (endomorphism): failed, k=" + k);
	return {
		k1neg,
		k1,
		k2neg,
		k2
	};
}
var _0n$5 = BigInt(0);
var _1n$5 = BigInt(1);
var _2n$5 = BigInt(2);
var _3n$3 = BigInt(3);
var _4n$1 = BigInt(4);
function _normFnElement(Fn, key) {
	const { BYTES: expected } = Fn;
	let num;
	if (typeof key === "bigint") num = key;
	else {
		let bytes = ensureBytes("private key", key);
		try {
			num = Fn.fromBytes(bytes);
		} catch (error) {
			throw new Error(`invalid private key: expected ui8a of size ${expected}, got ${typeof key}`);
		}
	}
	if (!Fn.isValidNot0(num)) throw new Error("invalid private key: out of range [1..N-1]");
	return num;
}
/**
* Creates weierstrass Point constructor, based on specified curve options.
*
* @example
```js
const opts = {
p: BigInt('0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff'),
n: BigInt('0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551'),
h: BigInt(1),
a: BigInt('0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc'),
b: BigInt('0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b'),
Gx: BigInt('0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296'),
Gy: BigInt('0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5'),
};
const p256_Point = weierstrass(opts);
```
*/
function weierstrassN(params, extraOpts = {}) {
	const validated = _createCurveFields("weierstrass", params, extraOpts);
	const { Fp, Fn } = validated;
	let CURVE = validated.CURVE;
	const { h: cofactor, n: CURVE_ORDER } = CURVE;
	_validateObject(extraOpts, {}, {
		allowInfinityPoint: "boolean",
		clearCofactor: "function",
		isTorsionFree: "function",
		fromBytes: "function",
		toBytes: "function",
		endo: "object",
		wrapPrivateKey: "boolean"
	});
	const { endo } = extraOpts;
	if (endo) {
		if (!Fp.is0(CURVE.a) || typeof endo.beta !== "bigint" || !Array.isArray(endo.basises)) throw new Error("invalid endo: expected \"beta\": bigint and \"basises\": array");
	}
	const lengths = getWLengths(Fp, Fn);
	function assertCompressionIsSupported() {
		if (!Fp.isOdd) throw new Error("compression is not supported: Field does not have .isOdd()");
	}
	function pointToBytes(_c, point, isCompressed) {
		const { x, y } = point.toAffine();
		const bx = Fp.toBytes(x);
		_abool2(isCompressed, "isCompressed");
		if (isCompressed) {
			assertCompressionIsSupported();
			return concatBytes(pprefix(!Fp.isOdd(y)), bx);
		} else return concatBytes(Uint8Array.of(4), bx, Fp.toBytes(y));
	}
	function pointFromBytes(bytes) {
		_abytes2(bytes, void 0, "Point");
		const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
		const length = bytes.length;
		const head = bytes[0];
		const tail = bytes.subarray(1);
		if (length === comp && (head === 2 || head === 3)) {
			const x = Fp.fromBytes(tail);
			if (!Fp.isValid(x)) throw new Error("bad point: is not on curve, wrong x");
			const y2 = weierstrassEquation(x);
			let y;
			try {
				y = Fp.sqrt(y2);
			} catch (sqrtError) {
				const err = sqrtError instanceof Error ? ": " + sqrtError.message : "";
				throw new Error("bad point: is not on curve, sqrt error" + err);
			}
			assertCompressionIsSupported();
			const isYOdd = Fp.isOdd(y);
			if ((head & 1) === 1 !== isYOdd) y = Fp.neg(y);
			return {
				x,
				y
			};
		} else if (length === uncomp && head === 4) {
			const L = Fp.BYTES;
			const x = Fp.fromBytes(tail.subarray(0, L));
			const y = Fp.fromBytes(tail.subarray(L, L * 2));
			if (!isValidXY(x, y)) throw new Error("bad point: is not on curve");
			return {
				x,
				y
			};
		} else throw new Error(`bad point: got length ${length}, expected compressed=${comp} or uncompressed=${uncomp}`);
	}
	const encodePoint = extraOpts.toBytes || pointToBytes;
	const decodePoint = extraOpts.fromBytes || pointFromBytes;
	function weierstrassEquation(x) {
		const x2 = Fp.sqr(x);
		const x3 = Fp.mul(x2, x);
		return Fp.add(Fp.add(x3, Fp.mul(x, CURVE.a)), CURVE.b);
	}
	/** Checks whether equation holds for given x, y: y² == x³ + ax + b */
	function isValidXY(x, y) {
		const left = Fp.sqr(y);
		const right = weierstrassEquation(x);
		return Fp.eql(left, right);
	}
	if (!isValidXY(CURVE.Gx, CURVE.Gy)) throw new Error("bad curve params: generator point");
	const _4a3 = Fp.mul(Fp.pow(CURVE.a, _3n$3), _4n$1);
	const _27b2 = Fp.mul(Fp.sqr(CURVE.b), BigInt(27));
	if (Fp.is0(Fp.add(_4a3, _27b2))) throw new Error("bad curve params: a or b");
	/** Asserts coordinate is valid: 0 <= n < Fp.ORDER. */
	function acoord(title, n, banZero = false) {
		if (!Fp.isValid(n) || banZero && Fp.is0(n)) throw new Error(`bad point coordinate ${title}`);
		return n;
	}
	function aprjpoint(other) {
		if (!(other instanceof Point)) throw new Error("ProjectivePoint expected");
	}
	function splitEndoScalarN(k) {
		if (!endo || !endo.basises) throw new Error("no endo");
		return _splitEndoScalar(k, endo.basises, Fn.ORDER);
	}
	const toAffineMemo = memoized((p, iz) => {
		const { X, Y, Z } = p;
		if (Fp.eql(Z, Fp.ONE)) return {
			x: X,
			y: Y
		};
		const is0 = p.is0();
		if (iz == null) iz = is0 ? Fp.ONE : Fp.inv(Z);
		const x = Fp.mul(X, iz);
		const y = Fp.mul(Y, iz);
		const zz = Fp.mul(Z, iz);
		if (is0) return {
			x: Fp.ZERO,
			y: Fp.ZERO
		};
		if (!Fp.eql(zz, Fp.ONE)) throw new Error("invZ was invalid");
		return {
			x,
			y
		};
	});
	const assertValidMemo = memoized((p) => {
		if (p.is0()) {
			if (extraOpts.allowInfinityPoint && !Fp.is0(p.Y)) return;
			throw new Error("bad point: ZERO");
		}
		const { x, y } = p.toAffine();
		if (!Fp.isValid(x) || !Fp.isValid(y)) throw new Error("bad point: x or y not field elements");
		if (!isValidXY(x, y)) throw new Error("bad point: equation left != right");
		if (!p.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
		return true;
	});
	function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
		k2p = new Point(Fp.mul(k2p.X, endoBeta), k2p.Y, k2p.Z);
		k1p = negateCt(k1neg, k1p);
		k2p = negateCt(k2neg, k2p);
		return k1p.add(k2p);
	}
	/**
	* Projective Point works in 3d / projective (homogeneous) coordinates:(X, Y, Z) ∋ (x=X/Z, y=Y/Z).
	* Default Point works in 2d / affine coordinates: (x, y).
	* We're doing calculations in projective, because its operations don't require costly inversion.
	*/
	class Point {
		/** Does NOT validate if the point is valid. Use `.assertValidity()`. */
		constructor(X, Y, Z) {
			this.X = acoord("x", X);
			this.Y = acoord("y", Y, true);
			this.Z = acoord("z", Z);
			Object.freeze(this);
		}
		static CURVE() {
			return CURVE;
		}
		/** Does NOT validate if the point is valid. Use `.assertValidity()`. */
		static fromAffine(p) {
			const { x, y } = p || {};
			if (!p || !Fp.isValid(x) || !Fp.isValid(y)) throw new Error("invalid affine point");
			if (p instanceof Point) throw new Error("projective point not allowed");
			if (Fp.is0(x) && Fp.is0(y)) return Point.ZERO;
			return new Point(x, y, Fp.ONE);
		}
		static fromBytes(bytes) {
			const P = Point.fromAffine(decodePoint(_abytes2(bytes, void 0, "point")));
			P.assertValidity();
			return P;
		}
		static fromHex(hex) {
			return Point.fromBytes(ensureBytes("pointHex", hex));
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		/**
		*
		* @param windowSize
		* @param isLazy true will defer table computation until the first multiplication
		* @returns
		*/
		precompute(windowSize = 8, isLazy = true) {
			wnaf.createCache(this, windowSize);
			if (!isLazy) this.multiply(_3n$3);
			return this;
		}
		/** A point on curve is valid if it conforms to equation. */
		assertValidity() {
			assertValidMemo(this);
		}
		hasEvenY() {
			const { y } = this.toAffine();
			if (!Fp.isOdd) throw new Error("Field doesn't support isOdd");
			return !Fp.isOdd(y);
		}
		/** Compare one point to another. */
		equals(other) {
			aprjpoint(other);
			const { X: X1, Y: Y1, Z: Z1 } = this;
			const { X: X2, Y: Y2, Z: Z2 } = other;
			const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
			const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
			return U1 && U2;
		}
		/** Flips point to one corresponding to (x, -y) in Affine coordinates. */
		negate() {
			return new Point(this.X, Fp.neg(this.Y), this.Z);
		}
		double() {
			const { a, b } = CURVE;
			const b3 = Fp.mul(b, _3n$3);
			const { X: X1, Y: Y1, Z: Z1 } = this;
			let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
			let t0 = Fp.mul(X1, X1);
			let t1 = Fp.mul(Y1, Y1);
			let t2 = Fp.mul(Z1, Z1);
			let t3 = Fp.mul(X1, Y1);
			t3 = Fp.add(t3, t3);
			Z3 = Fp.mul(X1, Z1);
			Z3 = Fp.add(Z3, Z3);
			X3 = Fp.mul(a, Z3);
			Y3 = Fp.mul(b3, t2);
			Y3 = Fp.add(X3, Y3);
			X3 = Fp.sub(t1, Y3);
			Y3 = Fp.add(t1, Y3);
			Y3 = Fp.mul(X3, Y3);
			X3 = Fp.mul(t3, X3);
			Z3 = Fp.mul(b3, Z3);
			t2 = Fp.mul(a, t2);
			t3 = Fp.sub(t0, t2);
			t3 = Fp.mul(a, t3);
			t3 = Fp.add(t3, Z3);
			Z3 = Fp.add(t0, t0);
			t0 = Fp.add(Z3, t0);
			t0 = Fp.add(t0, t2);
			t0 = Fp.mul(t0, t3);
			Y3 = Fp.add(Y3, t0);
			t2 = Fp.mul(Y1, Z1);
			t2 = Fp.add(t2, t2);
			t0 = Fp.mul(t2, t3);
			X3 = Fp.sub(X3, t0);
			Z3 = Fp.mul(t2, t1);
			Z3 = Fp.add(Z3, Z3);
			Z3 = Fp.add(Z3, Z3);
			return new Point(X3, Y3, Z3);
		}
		add(other) {
			aprjpoint(other);
			const { X: X1, Y: Y1, Z: Z1 } = this;
			const { X: X2, Y: Y2, Z: Z2 } = other;
			let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
			const a = CURVE.a;
			const b3 = Fp.mul(CURVE.b, _3n$3);
			let t0 = Fp.mul(X1, X2);
			let t1 = Fp.mul(Y1, Y2);
			let t2 = Fp.mul(Z1, Z2);
			let t3 = Fp.add(X1, Y1);
			let t4 = Fp.add(X2, Y2);
			t3 = Fp.mul(t3, t4);
			t4 = Fp.add(t0, t1);
			t3 = Fp.sub(t3, t4);
			t4 = Fp.add(X1, Z1);
			let t5 = Fp.add(X2, Z2);
			t4 = Fp.mul(t4, t5);
			t5 = Fp.add(t0, t2);
			t4 = Fp.sub(t4, t5);
			t5 = Fp.add(Y1, Z1);
			X3 = Fp.add(Y2, Z2);
			t5 = Fp.mul(t5, X3);
			X3 = Fp.add(t1, t2);
			t5 = Fp.sub(t5, X3);
			Z3 = Fp.mul(a, t4);
			X3 = Fp.mul(b3, t2);
			Z3 = Fp.add(X3, Z3);
			X3 = Fp.sub(t1, Z3);
			Z3 = Fp.add(t1, Z3);
			Y3 = Fp.mul(X3, Z3);
			t1 = Fp.add(t0, t0);
			t1 = Fp.add(t1, t0);
			t2 = Fp.mul(a, t2);
			t4 = Fp.mul(b3, t4);
			t1 = Fp.add(t1, t2);
			t2 = Fp.sub(t0, t2);
			t2 = Fp.mul(a, t2);
			t4 = Fp.add(t4, t2);
			t0 = Fp.mul(t1, t4);
			Y3 = Fp.add(Y3, t0);
			t0 = Fp.mul(t5, t4);
			X3 = Fp.mul(t3, X3);
			X3 = Fp.sub(X3, t0);
			t0 = Fp.mul(t3, t1);
			Z3 = Fp.mul(t5, Z3);
			Z3 = Fp.add(Z3, t0);
			return new Point(X3, Y3, Z3);
		}
		subtract(other) {
			return this.add(other.negate());
		}
		is0() {
			return this.equals(Point.ZERO);
		}
		/**
		* Constant time multiplication.
		* Uses wNAF method. Windowed method may be 10% faster,
		* but takes 2x longer to generate and consumes 2x memory.
		* Uses precomputes when available.
		* Uses endomorphism for Koblitz curves.
		* @param scalar by which the point would be multiplied
		* @returns New point
		*/
		multiply(scalar) {
			const { endo } = extraOpts;
			if (!Fn.isValidNot0(scalar)) throw new Error("invalid scalar: out of range");
			let point, fake;
			const mul = (n) => wnaf.cached(this, n, (p) => normalizeZ(Point, p));
			/** See docs for {@link EndomorphismOpts} */
			if (endo) {
				const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(scalar);
				const { p: k1p, f: k1f } = mul(k1);
				const { p: k2p, f: k2f } = mul(k2);
				fake = k1f.add(k2f);
				point = finishEndo(endo.beta, k1p, k2p, k1neg, k2neg);
			} else {
				const { p, f } = mul(scalar);
				point = p;
				fake = f;
			}
			return normalizeZ(Point, [point, fake])[0];
		}
		/**
		* Non-constant-time multiplication. Uses double-and-add algorithm.
		* It's faster, but should only be used when you don't care about
		* an exposed secret key e.g. sig verification, which works over *public* keys.
		*/
		multiplyUnsafe(sc) {
			const { endo } = extraOpts;
			const p = this;
			if (!Fn.isValid(sc)) throw new Error("invalid scalar: out of range");
			if (sc === _0n$5 || p.is0()) return Point.ZERO;
			if (sc === _1n$5) return p;
			if (wnaf.hasCache(this)) return this.multiply(sc);
			if (endo) {
				const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(sc);
				const { p1, p2 } = mulEndoUnsafe(Point, p, k1, k2);
				return finishEndo(endo.beta, p1, p2, k1neg, k2neg);
			} else return wnaf.unsafe(p, sc);
		}
		multiplyAndAddUnsafe(Q, a, b) {
			const sum = this.multiplyUnsafe(a).add(Q.multiplyUnsafe(b));
			return sum.is0() ? void 0 : sum;
		}
		/**
		* Converts Projective point to affine (x, y) coordinates.
		* @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
		*/
		toAffine(invertedZ) {
			return toAffineMemo(this, invertedZ);
		}
		/**
		* Checks whether Point is free of torsion elements (is in prime subgroup).
		* Always torsion-free for cofactor=1 curves.
		*/
		isTorsionFree() {
			const { isTorsionFree } = extraOpts;
			if (cofactor === _1n$5) return true;
			if (isTorsionFree) return isTorsionFree(Point, this);
			return wnaf.unsafe(this, CURVE_ORDER).is0();
		}
		clearCofactor() {
			const { clearCofactor } = extraOpts;
			if (cofactor === _1n$5) return this;
			if (clearCofactor) return clearCofactor(Point, this);
			return this.multiplyUnsafe(cofactor);
		}
		isSmallOrder() {
			return this.multiplyUnsafe(cofactor).is0();
		}
		toBytes(isCompressed = true) {
			_abool2(isCompressed, "isCompressed");
			this.assertValidity();
			return encodePoint(Point, this, isCompressed);
		}
		toHex(isCompressed = true) {
			return bytesToHex(this.toBytes(isCompressed));
		}
		toString() {
			return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
		}
		get px() {
			return this.X;
		}
		get py() {
			return this.X;
		}
		get pz() {
			return this.Z;
		}
		toRawBytes(isCompressed = true) {
			return this.toBytes(isCompressed);
		}
		_setWindowSize(windowSize) {
			this.precompute(windowSize);
		}
		static normalizeZ(points) {
			return normalizeZ(Point, points);
		}
		static msm(points, scalars) {
			return pippenger(Point, Fn, points, scalars);
		}
		static fromPrivateKey(privateKey) {
			return Point.BASE.multiply(_normFnElement(Fn, privateKey));
		}
	}
	Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
	Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
	Point.Fp = Fp;
	Point.Fn = Fn;
	const bits = Fn.BITS;
	const wnaf = new wNAF(Point, extraOpts.endo ? Math.ceil(bits / 2) : bits);
	Point.BASE.precompute(8);
	return Point;
}
function pprefix(hasEvenY) {
	return Uint8Array.of(hasEvenY ? 2 : 3);
}
/**
* Implementation of the Shallue and van de Woestijne method for any weierstrass curve.
* TODO: check if there is a way to merge this with uvRatio in Edwards; move to modular.
* b = True and y = sqrt(u / v) if (u / v) is square in F, and
* b = False and y = sqrt(Z * (u / v)) otherwise.
* @param Fp
* @param Z
* @returns
*/
function SWUFpSqrtRatio(Fp, Z) {
	const q = Fp.ORDER;
	let l = _0n$5;
	for (let o = q - _1n$5; o % _2n$5 === _0n$5; o /= _2n$5) l += _1n$5;
	const c1 = l;
	const _2n_pow_c1_1 = _2n$5 << c1 - _1n$5 - _1n$5;
	const _2n_pow_c1 = _2n_pow_c1_1 * _2n$5;
	const c2 = (q - _1n$5) / _2n_pow_c1;
	const c3 = (c2 - _1n$5) / _2n$5;
	const c4 = _2n_pow_c1 - _1n$5;
	const c5 = _2n_pow_c1_1;
	const c6 = Fp.pow(Z, c2);
	const c7 = Fp.pow(Z, (c2 + _1n$5) / _2n$5);
	let sqrtRatio = (u, v) => {
		let tv1 = c6;
		let tv2 = Fp.pow(v, c4);
		let tv3 = Fp.sqr(tv2);
		tv3 = Fp.mul(tv3, v);
		let tv5 = Fp.mul(u, tv3);
		tv5 = Fp.pow(tv5, c3);
		tv5 = Fp.mul(tv5, tv2);
		tv2 = Fp.mul(tv5, v);
		tv3 = Fp.mul(tv5, u);
		let tv4 = Fp.mul(tv3, tv2);
		tv5 = Fp.pow(tv4, c5);
		let isQR = Fp.eql(tv5, Fp.ONE);
		tv2 = Fp.mul(tv3, c7);
		tv5 = Fp.mul(tv4, tv1);
		tv3 = Fp.cmov(tv2, tv3, isQR);
		tv4 = Fp.cmov(tv5, tv4, isQR);
		for (let i = c1; i > _1n$5; i--) {
			let tv5 = i - _2n$5;
			tv5 = _2n$5 << tv5 - _1n$5;
			let tvv5 = Fp.pow(tv4, tv5);
			const e1 = Fp.eql(tvv5, Fp.ONE);
			tv2 = Fp.mul(tv3, tv1);
			tv1 = Fp.mul(tv1, tv1);
			tvv5 = Fp.mul(tv4, tv1);
			tv3 = Fp.cmov(tv2, tv3, e1);
			tv4 = Fp.cmov(tvv5, tv4, e1);
		}
		return {
			isValid: isQR,
			value: tv3
		};
	};
	if (Fp.ORDER % _4n$1 === _3n$3) {
		const c1 = (Fp.ORDER - _3n$3) / _4n$1;
		const c2 = Fp.sqrt(Fp.neg(Z));
		sqrtRatio = (u, v) => {
			let tv1 = Fp.sqr(v);
			const tv2 = Fp.mul(u, v);
			tv1 = Fp.mul(tv1, tv2);
			let y1 = Fp.pow(tv1, c1);
			y1 = Fp.mul(y1, tv2);
			const y2 = Fp.mul(y1, c2);
			const tv3 = Fp.mul(Fp.sqr(y1), v);
			const isQR = Fp.eql(tv3, u);
			return {
				isValid: isQR,
				value: Fp.cmov(y2, y1, isQR)
			};
		};
	}
	return sqrtRatio;
}
/**
* Simplified Shallue-van de Woestijne-Ulas Method
* https://www.rfc-editor.org/rfc/rfc9380#section-6.6.2
*/
function mapToCurveSimpleSWU(Fp, opts) {
	validateField(Fp);
	const { A, B, Z } = opts;
	if (!Fp.isValid(A) || !Fp.isValid(B) || !Fp.isValid(Z)) throw new Error("mapToCurveSimpleSWU: invalid opts");
	const sqrtRatio = SWUFpSqrtRatio(Fp, Z);
	if (!Fp.isOdd) throw new Error("Field does not have .isOdd()");
	return (u) => {
		let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
		tv1 = Fp.sqr(u);
		tv1 = Fp.mul(tv1, Z);
		tv2 = Fp.sqr(tv1);
		tv2 = Fp.add(tv2, tv1);
		tv3 = Fp.add(tv2, Fp.ONE);
		tv3 = Fp.mul(tv3, B);
		tv4 = Fp.cmov(Z, Fp.neg(tv2), !Fp.eql(tv2, Fp.ZERO));
		tv4 = Fp.mul(tv4, A);
		tv2 = Fp.sqr(tv3);
		tv6 = Fp.sqr(tv4);
		tv5 = Fp.mul(tv6, A);
		tv2 = Fp.add(tv2, tv5);
		tv2 = Fp.mul(tv2, tv3);
		tv6 = Fp.mul(tv6, tv4);
		tv5 = Fp.mul(tv6, B);
		tv2 = Fp.add(tv2, tv5);
		x = Fp.mul(tv1, tv3);
		const { isValid, value } = sqrtRatio(tv2, tv6);
		y = Fp.mul(tv1, u);
		y = Fp.mul(y, value);
		x = Fp.cmov(x, tv3, isValid);
		y = Fp.cmov(y, value, isValid);
		const e1 = Fp.isOdd(u) === Fp.isOdd(y);
		y = Fp.cmov(Fp.neg(y), y, e1);
		const tv4_inv = FpInvertBatch(Fp, [tv4], true)[0];
		x = Fp.mul(x, tv4_inv);
		return {
			x,
			y
		};
	};
}
function getWLengths(Fp, Fn) {
	return {
		secretKey: Fn.BYTES,
		publicKey: 1 + Fp.BYTES,
		publicKeyUncompressed: 1 + 2 * Fp.BYTES,
		publicKeyHasPrefix: true,
		signature: 2 * Fn.BYTES
	};
}
/** @deprecated use `weierstrass` in newer releases */
function weierstrassPoints(c) {
	const { CURVE, curveOpts } = _weierstrass_legacy_opts_to_new(c);
	return _weierstrass_new_output_to_legacy(c, weierstrassN(CURVE, curveOpts));
}
function _weierstrass_legacy_opts_to_new(c) {
	const CURVE = {
		a: c.a,
		b: c.b,
		p: c.Fp.ORDER,
		n: c.n,
		h: c.h,
		Gx: c.Gx,
		Gy: c.Gy
	};
	const Fp = c.Fp;
	let allowedLengths = c.allowedPrivateKeyLengths ? Array.from(new Set(c.allowedPrivateKeyLengths.map((l) => Math.ceil(l / 2)))) : void 0;
	return {
		CURVE,
		curveOpts: {
			Fp,
			Fn: Field(CURVE.n, {
				BITS: c.nBitLength,
				allowedLengths,
				modFromBytes: c.wrapPrivateKey
			}),
			allowInfinityPoint: c.allowInfinityPoint,
			endo: c.endo,
			isTorsionFree: c.isTorsionFree,
			clearCofactor: c.clearCofactor,
			fromBytes: c.fromBytes,
			toBytes: c.toBytes
		}
	};
}
function _legacyHelperEquat(Fp, a, b) {
	/**
	* y² = x³ + ax + b: Short weierstrass curve formula. Takes x, returns y².
	* @returns y²
	*/
	function weierstrassEquation(x) {
		const x2 = Fp.sqr(x);
		const x3 = Fp.mul(x2, x);
		return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
	}
	return weierstrassEquation;
}
function _weierstrass_new_output_to_legacy(c, Point) {
	const { Fp, Fn } = Point;
	function isWithinCurveOrder(num) {
		return inRange(num, _1n$5, Fn.ORDER);
	}
	const weierstrassEquation = _legacyHelperEquat(Fp, c.a, c.b);
	return Object.assign({}, {
		CURVE: c,
		Point,
		ProjectivePoint: Point,
		normPrivateKeyToScalar: (key) => _normFnElement(Fn, key),
		weierstrassEquation,
		isWithinCurveOrder
	});
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+curves@1.9.7/node_modules/@noble/curves/esm/abstract/bls.js
/**
* BLS != BLS.
* The file implements BLS (Boneh-Lynn-Shacham) signatures.
* Used in both BLS (Barreto-Lynn-Scott) and BN (Barreto-Naehrig)
* families of pairing-friendly curves.
* Consists of two curves: G1 and G2:
* - G1 is a subgroup of (x, y) E(Fq) over y² = x³ + 4.
* - G2 is a subgroup of ((x₁, x₂+i), (y₁, y₂+i)) E(Fq²) over y² = x³ + 4(1 + i) where i is √-1
* - Gt, created by bilinear (ate) pairing e(G1, G2), consists of p-th roots of unity in
*   Fq^k where k is embedding degree. Only degree 12 is currently supported, 24 is not.
* Pairing is used to aggregate and verify signatures.
* There are two modes of operation:
* - Long signatures:  X-byte keys + 2X-byte sigs (G1 keys + G2 sigs).
* - Short signatures: 2X-byte keys + X-byte sigs (G2 keys + G1 sigs).
* @module
**/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n$4 = BigInt(0);
var _1n$4 = BigInt(1);
var _2n$4 = BigInt(2);
var _3n$2 = BigInt(3);
function NAfDecomposition(a) {
	const res = [];
	for (; a > _1n$4; a >>= _1n$4) if ((a & _1n$4) === _0n$4) res.unshift(0);
	else if ((a & _3n$2) === _3n$2) {
		res.unshift(-1);
		a += _1n$4;
	} else res.unshift(1);
	return res;
}
function aNonEmpty(arr) {
	if (!Array.isArray(arr) || arr.length === 0) throw new Error("expected non-empty array");
}
function createBlsPairing(fields, G1, G2, params) {
	const { Fp2, Fp12 } = fields;
	const { twistType, ateLoopSize, xNegative, postPrecompute } = params;
	let lineFunction;
	if (twistType === "multiplicative") lineFunction = (c0, c1, c2, f, Px, Py) => Fp12.mul014(f, c0, Fp2.mul(c1, Px), Fp2.mul(c2, Py));
	else if (twistType === "divisive") lineFunction = (c0, c1, c2, f, Px, Py) => Fp12.mul034(f, Fp2.mul(c2, Py), Fp2.mul(c1, Px), c0);
	else throw new Error("bls: unknown twist type");
	const Fp2div2 = Fp2.div(Fp2.ONE, Fp2.mul(Fp2.ONE, _2n$4));
	function pointDouble(ell, Rx, Ry, Rz) {
		const t0 = Fp2.sqr(Ry);
		const t1 = Fp2.sqr(Rz);
		const t2 = Fp2.mulByB(Fp2.mul(t1, _3n$2));
		const t3 = Fp2.mul(t2, _3n$2);
		const t4 = Fp2.sub(Fp2.sub(Fp2.sqr(Fp2.add(Ry, Rz)), t1), t0);
		const c0 = Fp2.sub(t2, t0);
		const c1 = Fp2.mul(Fp2.sqr(Rx), _3n$2);
		const c2 = Fp2.neg(t4);
		ell.push([
			c0,
			c1,
			c2
		]);
		Rx = Fp2.mul(Fp2.mul(Fp2.mul(Fp2.sub(t0, t3), Rx), Ry), Fp2div2);
		Ry = Fp2.sub(Fp2.sqr(Fp2.mul(Fp2.add(t0, t3), Fp2div2)), Fp2.mul(Fp2.sqr(t2), _3n$2));
		Rz = Fp2.mul(t0, t4);
		return {
			Rx,
			Ry,
			Rz
		};
	}
	function pointAdd(ell, Rx, Ry, Rz, Qx, Qy) {
		const t0 = Fp2.sub(Ry, Fp2.mul(Qy, Rz));
		const t1 = Fp2.sub(Rx, Fp2.mul(Qx, Rz));
		const c0 = Fp2.sub(Fp2.mul(t0, Qx), Fp2.mul(t1, Qy));
		const c1 = Fp2.neg(t0);
		const c2 = t1;
		ell.push([
			c0,
			c1,
			c2
		]);
		const t2 = Fp2.sqr(t1);
		const t3 = Fp2.mul(t2, t1);
		const t4 = Fp2.mul(t2, Rx);
		const t5 = Fp2.add(Fp2.sub(t3, Fp2.mul(t4, _2n$4)), Fp2.mul(Fp2.sqr(t0), Rz));
		Rx = Fp2.mul(t1, t5);
		Ry = Fp2.sub(Fp2.mul(Fp2.sub(t4, t5), t0), Fp2.mul(t3, Ry));
		Rz = Fp2.mul(Rz, t3);
		return {
			Rx,
			Ry,
			Rz
		};
	}
	const ATE_NAF = NAfDecomposition(ateLoopSize);
	const calcPairingPrecomputes = memoized((point) => {
		const { x, y } = point.toAffine();
		const Qx = x, Qy = y, negQy = Fp2.neg(y);
		let Rx = Qx, Ry = Qy, Rz = Fp2.ONE;
		const ell = [];
		for (const bit of ATE_NAF) {
			const cur = [];
			({Rx, Ry, Rz} = pointDouble(cur, Rx, Ry, Rz));
			if (bit) ({Rx, Ry, Rz} = pointAdd(cur, Rx, Ry, Rz, Qx, bit === -1 ? negQy : Qy));
			ell.push(cur);
		}
		if (postPrecompute) {
			const last = ell[ell.length - 1];
			postPrecompute(Rx, Ry, Rz, Qx, Qy, pointAdd.bind(null, last));
		}
		return ell;
	});
	function millerLoopBatch(pairs, withFinalExponent = false) {
		let f12 = Fp12.ONE;
		if (pairs.length) {
			const ellLen = pairs[0][0].length;
			for (let i = 0; i < ellLen; i++) {
				f12 = Fp12.sqr(f12);
				for (const [ell, Px, Py] of pairs) for (const [c0, c1, c2] of ell[i]) f12 = lineFunction(c0, c1, c2, f12, Px, Py);
			}
		}
		if (xNegative) f12 = Fp12.conjugate(f12);
		return withFinalExponent ? Fp12.finalExponentiate(f12) : f12;
	}
	function pairingBatch(pairs, withFinalExponent = true) {
		const res = [];
		normalizeZ(G1, pairs.map(({ g1 }) => g1));
		normalizeZ(G2, pairs.map(({ g2 }) => g2));
		for (const { g1, g2 } of pairs) {
			if (g1.is0() || g2.is0()) throw new Error("pairing is not available for ZERO point");
			g1.assertValidity();
			g2.assertValidity();
			const Qa = g1.toAffine();
			res.push([
				calcPairingPrecomputes(g2),
				Qa.x,
				Qa.y
			]);
		}
		return millerLoopBatch(res, withFinalExponent);
	}
	function pairing(Q, P, withFinalExponent = true) {
		return pairingBatch([{
			g1: Q,
			g2: P
		}], withFinalExponent);
	}
	return {
		Fp12,
		millerLoopBatch,
		pairing,
		pairingBatch,
		calcPairingPrecomputes
	};
}
function createBlsSig(blsPairing, PubCurve, SigCurve, SignatureCoder, isSigG1) {
	const { Fp12, pairingBatch } = blsPairing;
	function normPub(point) {
		return point instanceof PubCurve.Point ? point : PubCurve.Point.fromHex(point);
	}
	function normSig(point) {
		return point instanceof SigCurve.Point ? point : SigCurve.Point.fromHex(point);
	}
	function amsg(m) {
		if (!(m instanceof SigCurve.Point)) throw new Error(`expected valid message hashed to ${!isSigG1 ? "G2" : "G1"} curve`);
		return m;
	}
	const pair = !isSigG1 ? (a, b) => ({
		g1: a,
		g2: b
	}) : (a, b) => ({
		g1: b,
		g2: a
	});
	return {
		getPublicKey(secretKey) {
			const sec = _normFnElement(PubCurve.Point.Fn, secretKey);
			return PubCurve.Point.BASE.multiply(sec);
		},
		sign(message, secretKey, unusedArg) {
			if (unusedArg != null) throw new Error("sign() expects 2 arguments");
			const sec = _normFnElement(PubCurve.Point.Fn, secretKey);
			amsg(message).assertValidity();
			return message.multiply(sec);
		},
		verify(signature, message, publicKey, unusedArg) {
			if (unusedArg != null) throw new Error("verify() expects 3 arguments");
			signature = normSig(signature);
			publicKey = normPub(publicKey);
			const P = publicKey.negate();
			const G = PubCurve.Point.BASE;
			const Hm = amsg(message);
			const S = signature;
			const exp = pairingBatch([pair(P, Hm), pair(G, S)]);
			return Fp12.eql(exp, Fp12.ONE);
		},
		verifyBatch(signature, messages, publicKeys) {
			aNonEmpty(messages);
			if (publicKeys.length !== messages.length) throw new Error("amount of public keys and messages should be equal");
			const sig = normSig(signature);
			const nMessages = messages;
			const nPublicKeys = publicKeys.map(normPub);
			const messagePubKeyMap = /* @__PURE__ */ new Map();
			for (let i = 0; i < nPublicKeys.length; i++) {
				const pub = nPublicKeys[i];
				const msg = nMessages[i];
				let keys = messagePubKeyMap.get(msg);
				if (keys === void 0) {
					keys = [];
					messagePubKeyMap.set(msg, keys);
				}
				keys.push(pub);
			}
			const paired = [];
			const G = PubCurve.Point.BASE;
			try {
				for (const [msg, keys] of messagePubKeyMap) {
					const groupPublicKey = keys.reduce((acc, msg) => acc.add(msg));
					paired.push(pair(groupPublicKey, msg));
				}
				paired.push(pair(G.negate(), sig));
				return Fp12.eql(pairingBatch(paired), Fp12.ONE);
			} catch {
				return false;
			}
		},
		aggregatePublicKeys(publicKeys) {
			aNonEmpty(publicKeys);
			publicKeys = publicKeys.map((pub) => normPub(pub));
			const agg = publicKeys.reduce((sum, p) => sum.add(p), PubCurve.Point.ZERO);
			agg.assertValidity();
			return agg;
		},
		aggregateSignatures(signatures) {
			aNonEmpty(signatures);
			signatures = signatures.map((sig) => normSig(sig));
			const agg = signatures.reduce((sum, s) => sum.add(s), SigCurve.Point.ZERO);
			agg.assertValidity();
			return agg;
		},
		hash(messageBytes, DST) {
			abytes(messageBytes);
			const opts = DST ? { DST } : void 0;
			return SigCurve.hashToCurve(messageBytes, opts);
		},
		Signature: SignatureCoder
	};
}
function bls(CURVE) {
	const { Fp, Fr, Fp2, Fp6, Fp12 } = CURVE.fields;
	const G1_ = weierstrassPoints(CURVE.G1);
	const G1 = Object.assign(G1_, createHasher(G1_.Point, CURVE.G1.mapToCurve, {
		...CURVE.htfDefaults,
		...CURVE.G1.htfDefaults
	}));
	const G2_ = weierstrassPoints(CURVE.G2);
	const G2 = Object.assign(G2_, createHasher(G2_.Point, CURVE.G2.mapToCurve, {
		...CURVE.htfDefaults,
		...CURVE.G2.htfDefaults
	}));
	const pairingRes = createBlsPairing(CURVE.fields, G1.Point, G2.Point, {
		...CURVE.params,
		postPrecompute: CURVE.postPrecompute
	});
	const { millerLoopBatch, pairing, pairingBatch, calcPairingPrecomputes } = pairingRes;
	const longSignatures = createBlsSig(pairingRes, G1, G2, CURVE.G2.Signature, false);
	const shortSignatures = createBlsSig(pairingRes, G2, G1, CURVE.G1.ShortSignature, true);
	const rand = CURVE.randomBytes || randomBytes;
	const randomSecretKey = () => {
		const length = getMinHashLength(Fr.ORDER);
		return mapHashToField(rand(length), Fr.ORDER);
	};
	const utils = {
		randomSecretKey,
		randomPrivateKey: randomSecretKey,
		calcPairingPrecomputes
	};
	const { ShortSignature } = CURVE.G1;
	const { Signature } = CURVE.G2;
	function normP1Hash(point, htfOpts) {
		return point instanceof G1.Point ? point : shortSignatures.hash(ensureBytes("point", point), htfOpts?.DST);
	}
	function normP2Hash(point, htfOpts) {
		return point instanceof G2.Point ? point : longSignatures.hash(ensureBytes("point", point), htfOpts?.DST);
	}
	function getPublicKey(privateKey) {
		return longSignatures.getPublicKey(privateKey).toBytes(true);
	}
	function getPublicKeyForShortSignatures(privateKey) {
		return shortSignatures.getPublicKey(privateKey).toBytes(true);
	}
	function sign(message, privateKey, htfOpts) {
		const Hm = normP2Hash(message, htfOpts);
		const S = longSignatures.sign(Hm, privateKey);
		return message instanceof G2.Point ? S : Signature.toBytes(S);
	}
	function signShortSignature(message, privateKey, htfOpts) {
		const Hm = normP1Hash(message, htfOpts);
		const S = shortSignatures.sign(Hm, privateKey);
		return message instanceof G1.Point ? S : ShortSignature.toBytes(S);
	}
	function verify(signature, message, publicKey, htfOpts) {
		const Hm = normP2Hash(message, htfOpts);
		return longSignatures.verify(signature, Hm, publicKey);
	}
	function verifyShortSignature(signature, message, publicKey, htfOpts) {
		const Hm = normP1Hash(message, htfOpts);
		return shortSignatures.verify(signature, Hm, publicKey);
	}
	function aggregatePublicKeys(publicKeys) {
		const agg = longSignatures.aggregatePublicKeys(publicKeys);
		return publicKeys[0] instanceof G1.Point ? agg : agg.toBytes(true);
	}
	function aggregateSignatures(signatures) {
		const agg = longSignatures.aggregateSignatures(signatures);
		return signatures[0] instanceof G2.Point ? agg : Signature.toBytes(agg);
	}
	function aggregateShortSignatures(signatures) {
		const agg = shortSignatures.aggregateSignatures(signatures);
		return signatures[0] instanceof G1.Point ? agg : ShortSignature.toBytes(agg);
	}
	function verifyBatch(signature, messages, publicKeys, htfOpts) {
		const Hm = messages.map((m) => normP2Hash(m, htfOpts));
		return longSignatures.verifyBatch(signature, Hm, publicKeys);
	}
	G1.Point.BASE.precompute(4);
	return {
		longSignatures,
		shortSignatures,
		millerLoopBatch,
		pairing,
		pairingBatch,
		verifyBatch,
		fields: {
			Fr,
			Fp,
			Fp2,
			Fp6,
			Fp12
		},
		params: {
			ateLoopSize: CURVE.params.ateLoopSize,
			twistType: CURVE.params.twistType,
			r: CURVE.params.r,
			G1b: CURVE.G1.b,
			G2b: CURVE.G2.b
		},
		utils,
		getPublicKey,
		getPublicKeyForShortSignatures,
		sign,
		signShortSignature,
		verify,
		verifyShortSignature,
		aggregatePublicKeys,
		aggregateSignatures,
		aggregateShortSignatures,
		G1,
		G2,
		Signature,
		ShortSignature
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+curves@1.9.7/node_modules/@noble/curves/esm/abstract/tower.js
/**
* Towered extension fields.
* Rather than implementing a massive 12th-degree extension directly, it is more efficient
* to build it up from smaller extensions: a tower of extensions.
*
* For BLS12-381, the Fp12 field is implemented as a quadratic (degree two) extension,
* on top of a cubic (degree three) extension, on top of a quadratic extension of Fp.
*
* For more info: "Pairings for beginners" by Costello, section 7.3.
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n$3 = BigInt(0);
var _1n$3 = BigInt(1);
var _2n$3 = BigInt(2);
var _3n$1 = BigInt(3);
function calcFrobeniusCoefficients(Fp, nonResidue, modulus, degree, num = 1, divisor) {
	const _divisor = BigInt(divisor === void 0 ? degree : divisor);
	const towerModulus = modulus ** BigInt(degree);
	const res = [];
	for (let i = 0; i < num; i++) {
		const a = BigInt(i + 1);
		const powers = [];
		for (let j = 0, qPower = _1n$3; j < degree; j++) {
			const power = (a * qPower - a) / _divisor % towerModulus;
			powers.push(Fp.pow(nonResidue, power));
			qPower *= modulus;
		}
		res.push(powers);
	}
	return res;
}
function psiFrobenius(Fp, Fp2, base) {
	const PSI_X = Fp2.pow(base, (Fp.ORDER - _1n$3) / _3n$1);
	const PSI_Y = Fp2.pow(base, (Fp.ORDER - _1n$3) / _2n$3);
	function psi(x, y) {
		return [Fp2.mul(Fp2.frobeniusMap(x, 1), PSI_X), Fp2.mul(Fp2.frobeniusMap(y, 1), PSI_Y)];
	}
	const PSI2_X = Fp2.pow(base, (Fp.ORDER ** _2n$3 - _1n$3) / _3n$1);
	const PSI2_Y = Fp2.pow(base, (Fp.ORDER ** _2n$3 - _1n$3) / _2n$3);
	if (!Fp2.eql(PSI2_Y, Fp2.neg(Fp2.ONE))) throw new Error("psiFrobenius: PSI2_Y!==-1");
	function psi2(x, y) {
		return [Fp2.mul(x, PSI2_X), Fp2.neg(y)];
	}
	const mapAffine = (fn) => (c, P) => {
		const affine = P.toAffine();
		const p = fn(affine.x, affine.y);
		return c.fromAffine({
			x: p[0],
			y: p[1]
		});
	};
	return {
		psi,
		psi2,
		G2psi: mapAffine(psi),
		G2psi2: mapAffine(psi2),
		PSI_X,
		PSI_Y,
		PSI2_X,
		PSI2_Y
	};
}
var Fp2fromBigTuple = (Fp, tuple) => {
	if (tuple.length !== 2) throw new Error("invalid tuple");
	const fps = tuple.map((n) => Fp.create(n));
	return {
		c0: fps[0],
		c1: fps[1]
	};
};
var _Field2 = class {
	constructor(Fp, opts = {}) {
		this.MASK = _1n$3;
		const ORDER = Fp.ORDER;
		const FP2_ORDER = ORDER * ORDER;
		this.Fp = Fp;
		this.ORDER = FP2_ORDER;
		this.BITS = bitLen(FP2_ORDER);
		this.BYTES = Math.ceil(bitLen(FP2_ORDER) / 8);
		this.isLE = Fp.isLE;
		this.ZERO = {
			c0: Fp.ZERO,
			c1: Fp.ZERO
		};
		this.ONE = {
			c0: Fp.ONE,
			c1: Fp.ZERO
		};
		this.Fp_NONRESIDUE = Fp.create(opts.NONRESIDUE || BigInt(-1));
		this.Fp_div2 = Fp.div(Fp.ONE, _2n$3);
		this.NONRESIDUE = Fp2fromBigTuple(Fp, opts.FP2_NONRESIDUE);
		this.FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp, this.Fp_NONRESIDUE, Fp.ORDER, 2)[0];
		this.mulByB = opts.Fp2mulByB;
		Object.seal(this);
	}
	fromBigTuple(tuple) {
		return Fp2fromBigTuple(this.Fp, tuple);
	}
	create(num) {
		return num;
	}
	isValid({ c0, c1 }) {
		function isValidC(num, ORDER) {
			return typeof num === "bigint" && _0n$3 <= num && num < ORDER;
		}
		return isValidC(c0, this.ORDER) && isValidC(c1, this.ORDER);
	}
	is0({ c0, c1 }) {
		return this.Fp.is0(c0) && this.Fp.is0(c1);
	}
	isValidNot0(num) {
		return !this.is0(num) && this.isValid(num);
	}
	eql({ c0, c1 }, { c0: r0, c1: r1 }) {
		return this.Fp.eql(c0, r0) && this.Fp.eql(c1, r1);
	}
	neg({ c0, c1 }) {
		return {
			c0: this.Fp.neg(c0),
			c1: this.Fp.neg(c1)
		};
	}
	pow(num, power) {
		return FpPow(this, num, power);
	}
	invertBatch(nums) {
		return FpInvertBatch(this, nums);
	}
	add(f1, f2) {
		const { c0, c1 } = f1;
		const { c0: r0, c1: r1 } = f2;
		return {
			c0: this.Fp.add(c0, r0),
			c1: this.Fp.add(c1, r1)
		};
	}
	sub({ c0, c1 }, { c0: r0, c1: r1 }) {
		return {
			c0: this.Fp.sub(c0, r0),
			c1: this.Fp.sub(c1, r1)
		};
	}
	mul({ c0, c1 }, rhs) {
		const { Fp } = this;
		if (typeof rhs === "bigint") return {
			c0: Fp.mul(c0, rhs),
			c1: Fp.mul(c1, rhs)
		};
		const { c0: r0, c1: r1 } = rhs;
		let t1 = Fp.mul(c0, r0);
		let t2 = Fp.mul(c1, r1);
		return {
			c0: Fp.sub(t1, t2),
			c1: Fp.sub(Fp.mul(Fp.add(c0, c1), Fp.add(r0, r1)), Fp.add(t1, t2))
		};
	}
	sqr({ c0, c1 }) {
		const { Fp } = this;
		const a = Fp.add(c0, c1);
		const b = Fp.sub(c0, c1);
		const c = Fp.add(c0, c0);
		return {
			c0: Fp.mul(a, b),
			c1: Fp.mul(c, c1)
		};
	}
	addN(a, b) {
		return this.add(a, b);
	}
	subN(a, b) {
		return this.sub(a, b);
	}
	mulN(a, b) {
		return this.mul(a, b);
	}
	sqrN(a) {
		return this.sqr(a);
	}
	div(lhs, rhs) {
		const { Fp } = this;
		return this.mul(lhs, typeof rhs === "bigint" ? Fp.inv(Fp.create(rhs)) : this.inv(rhs));
	}
	inv({ c0: a, c1: b }) {
		const { Fp } = this;
		const factor = Fp.inv(Fp.create(a * a + b * b));
		return {
			c0: Fp.mul(factor, Fp.create(a)),
			c1: Fp.mul(factor, Fp.create(-b))
		};
	}
	sqrt(num) {
		const { Fp } = this;
		const Fp2 = this;
		const { c0, c1 } = num;
		if (Fp.is0(c1)) {
			if (FpLegendre(Fp, c0) === 1) return Fp2.create({
				c0: Fp.sqrt(c0),
				c1: Fp.ZERO
			});
			else return Fp2.create({
				c0: Fp.ZERO,
				c1: Fp.sqrt(Fp.div(c0, this.Fp_NONRESIDUE))
			});
		}
		const a = Fp.sqrt(Fp.sub(Fp.sqr(c0), Fp.mul(Fp.sqr(c1), this.Fp_NONRESIDUE)));
		let d = Fp.mul(Fp.add(a, c0), this.Fp_div2);
		if (FpLegendre(Fp, d) === -1) d = Fp.sub(d, a);
		const a0 = Fp.sqrt(d);
		const candidateSqrt = Fp2.create({
			c0: a0,
			c1: Fp.div(Fp.mul(c1, this.Fp_div2), a0)
		});
		if (!Fp2.eql(Fp2.sqr(candidateSqrt), num)) throw new Error("Cannot find square root");
		const x1 = candidateSqrt;
		const x2 = Fp2.neg(x1);
		const { re: re1, im: im1 } = Fp2.reim(x1);
		const { re: re2, im: im2 } = Fp2.reim(x2);
		if (im1 > im2 || im1 === im2 && re1 > re2) return x1;
		return x2;
	}
	isOdd(x) {
		const { re: x0, im: x1 } = this.reim(x);
		const sign_0 = x0 % _2n$3;
		const zero_0 = x0 === _0n$3;
		const sign_1 = x1 % _2n$3;
		return BigInt(sign_0 || zero_0 && sign_1) == _1n$3;
	}
	fromBytes(b) {
		const { Fp } = this;
		if (b.length !== this.BYTES) throw new Error("fromBytes invalid length=" + b.length);
		return {
			c0: Fp.fromBytes(b.subarray(0, Fp.BYTES)),
			c1: Fp.fromBytes(b.subarray(Fp.BYTES))
		};
	}
	toBytes({ c0, c1 }) {
		return concatBytes(this.Fp.toBytes(c0), this.Fp.toBytes(c1));
	}
	cmov({ c0, c1 }, { c0: r0, c1: r1 }, c) {
		return {
			c0: this.Fp.cmov(c0, r0, c),
			c1: this.Fp.cmov(c1, r1, c)
		};
	}
	reim({ c0, c1 }) {
		return {
			re: c0,
			im: c1
		};
	}
	Fp4Square(a, b) {
		const Fp2 = this;
		const a2 = Fp2.sqr(a);
		const b2 = Fp2.sqr(b);
		return {
			first: Fp2.add(Fp2.mulByNonresidue(b2), a2),
			second: Fp2.sub(Fp2.sub(Fp2.sqr(Fp2.add(a, b)), a2), b2)
		};
	}
	mulByNonresidue({ c0, c1 }) {
		return this.mul({
			c0,
			c1
		}, this.NONRESIDUE);
	}
	frobeniusMap({ c0, c1 }, power) {
		return {
			c0,
			c1: this.Fp.mul(c1, this.FROBENIUS_COEFFICIENTS[power % 2])
		};
	}
};
var _Field6 = class {
	constructor(Fp2) {
		this.MASK = _1n$3;
		this.Fp2 = Fp2;
		this.ORDER = Fp2.ORDER;
		this.BITS = 3 * Fp2.BITS;
		this.BYTES = 3 * Fp2.BYTES;
		this.isLE = Fp2.isLE;
		this.ZERO = {
			c0: Fp2.ZERO,
			c1: Fp2.ZERO,
			c2: Fp2.ZERO
		};
		this.ONE = {
			c0: Fp2.ONE,
			c1: Fp2.ZERO,
			c2: Fp2.ZERO
		};
		const { Fp } = Fp2;
		const frob = calcFrobeniusCoefficients(Fp2, Fp2.NONRESIDUE, Fp.ORDER, 6, 2, 3);
		this.FROBENIUS_COEFFICIENTS_1 = frob[0];
		this.FROBENIUS_COEFFICIENTS_2 = frob[1];
		Object.seal(this);
	}
	add({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
		const { Fp2 } = this;
		return {
			c0: Fp2.add(c0, r0),
			c1: Fp2.add(c1, r1),
			c2: Fp2.add(c2, r2)
		};
	}
	sub({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
		const { Fp2 } = this;
		return {
			c0: Fp2.sub(c0, r0),
			c1: Fp2.sub(c1, r1),
			c2: Fp2.sub(c2, r2)
		};
	}
	mul({ c0, c1, c2 }, rhs) {
		const { Fp2 } = this;
		if (typeof rhs === "bigint") return {
			c0: Fp2.mul(c0, rhs),
			c1: Fp2.mul(c1, rhs),
			c2: Fp2.mul(c2, rhs)
		};
		const { c0: r0, c1: r1, c2: r2 } = rhs;
		const t0 = Fp2.mul(c0, r0);
		const t1 = Fp2.mul(c1, r1);
		const t2 = Fp2.mul(c2, r2);
		return {
			c0: Fp2.add(t0, Fp2.mulByNonresidue(Fp2.sub(Fp2.mul(Fp2.add(c1, c2), Fp2.add(r1, r2)), Fp2.add(t1, t2)))),
			c1: Fp2.add(Fp2.sub(Fp2.mul(Fp2.add(c0, c1), Fp2.add(r0, r1)), Fp2.add(t0, t1)), Fp2.mulByNonresidue(t2)),
			c2: Fp2.sub(Fp2.add(t1, Fp2.mul(Fp2.add(c0, c2), Fp2.add(r0, r2))), Fp2.add(t0, t2))
		};
	}
	sqr({ c0, c1, c2 }) {
		const { Fp2 } = this;
		let t0 = Fp2.sqr(c0);
		let t1 = Fp2.mul(Fp2.mul(c0, c1), _2n$3);
		let t3 = Fp2.mul(Fp2.mul(c1, c2), _2n$3);
		let t4 = Fp2.sqr(c2);
		return {
			c0: Fp2.add(Fp2.mulByNonresidue(t3), t0),
			c1: Fp2.add(Fp2.mulByNonresidue(t4), t1),
			c2: Fp2.sub(Fp2.sub(Fp2.add(Fp2.add(t1, Fp2.sqr(Fp2.add(Fp2.sub(c0, c1), c2))), t3), t0), t4)
		};
	}
	addN(a, b) {
		return this.add(a, b);
	}
	subN(a, b) {
		return this.sub(a, b);
	}
	mulN(a, b) {
		return this.mul(a, b);
	}
	sqrN(a) {
		return this.sqr(a);
	}
	create(num) {
		return num;
	}
	isValid({ c0, c1, c2 }) {
		const { Fp2 } = this;
		return Fp2.isValid(c0) && Fp2.isValid(c1) && Fp2.isValid(c2);
	}
	is0({ c0, c1, c2 }) {
		const { Fp2 } = this;
		return Fp2.is0(c0) && Fp2.is0(c1) && Fp2.is0(c2);
	}
	isValidNot0(num) {
		return !this.is0(num) && this.isValid(num);
	}
	neg({ c0, c1, c2 }) {
		const { Fp2 } = this;
		return {
			c0: Fp2.neg(c0),
			c1: Fp2.neg(c1),
			c2: Fp2.neg(c2)
		};
	}
	eql({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
		const { Fp2 } = this;
		return Fp2.eql(c0, r0) && Fp2.eql(c1, r1) && Fp2.eql(c2, r2);
	}
	sqrt(_) {
		return notImplemented();
	}
	div(lhs, rhs) {
		const { Fp2 } = this;
		const { Fp } = Fp2;
		return this.mul(lhs, typeof rhs === "bigint" ? Fp.inv(Fp.create(rhs)) : this.inv(rhs));
	}
	pow(num, power) {
		return FpPow(this, num, power);
	}
	invertBatch(nums) {
		return FpInvertBatch(this, nums);
	}
	inv({ c0, c1, c2 }) {
		const { Fp2 } = this;
		let t0 = Fp2.sub(Fp2.sqr(c0), Fp2.mulByNonresidue(Fp2.mul(c2, c1)));
		let t1 = Fp2.sub(Fp2.mulByNonresidue(Fp2.sqr(c2)), Fp2.mul(c0, c1));
		let t2 = Fp2.sub(Fp2.sqr(c1), Fp2.mul(c0, c2));
		let t4 = Fp2.inv(Fp2.add(Fp2.mulByNonresidue(Fp2.add(Fp2.mul(c2, t1), Fp2.mul(c1, t2))), Fp2.mul(c0, t0)));
		return {
			c0: Fp2.mul(t4, t0),
			c1: Fp2.mul(t4, t1),
			c2: Fp2.mul(t4, t2)
		};
	}
	fromBytes(b) {
		const { Fp2 } = this;
		if (b.length !== this.BYTES) throw new Error("fromBytes invalid length=" + b.length);
		const B2 = Fp2.BYTES;
		return {
			c0: Fp2.fromBytes(b.subarray(0, B2)),
			c1: Fp2.fromBytes(b.subarray(B2, B2 * 2)),
			c2: Fp2.fromBytes(b.subarray(2 * B2))
		};
	}
	toBytes({ c0, c1, c2 }) {
		const { Fp2 } = this;
		return concatBytes(Fp2.toBytes(c0), Fp2.toBytes(c1), Fp2.toBytes(c2));
	}
	cmov({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }, c) {
		const { Fp2 } = this;
		return {
			c0: Fp2.cmov(c0, r0, c),
			c1: Fp2.cmov(c1, r1, c),
			c2: Fp2.cmov(c2, r2, c)
		};
	}
	fromBigSix(t) {
		const { Fp2 } = this;
		if (!Array.isArray(t) || t.length !== 6) throw new Error("invalid Fp6 usage");
		return {
			c0: Fp2.fromBigTuple(t.slice(0, 2)),
			c1: Fp2.fromBigTuple(t.slice(2, 4)),
			c2: Fp2.fromBigTuple(t.slice(4, 6))
		};
	}
	frobeniusMap({ c0, c1, c2 }, power) {
		const { Fp2 } = this;
		return {
			c0: Fp2.frobeniusMap(c0, power),
			c1: Fp2.mul(Fp2.frobeniusMap(c1, power), this.FROBENIUS_COEFFICIENTS_1[power % 6]),
			c2: Fp2.mul(Fp2.frobeniusMap(c2, power), this.FROBENIUS_COEFFICIENTS_2[power % 6])
		};
	}
	mulByFp2({ c0, c1, c2 }, rhs) {
		const { Fp2 } = this;
		return {
			c0: Fp2.mul(c0, rhs),
			c1: Fp2.mul(c1, rhs),
			c2: Fp2.mul(c2, rhs)
		};
	}
	mulByNonresidue({ c0, c1, c2 }) {
		const { Fp2 } = this;
		return {
			c0: Fp2.mulByNonresidue(c2),
			c1: c0,
			c2: c1
		};
	}
	mul1({ c0, c1, c2 }, b1) {
		const { Fp2 } = this;
		return {
			c0: Fp2.mulByNonresidue(Fp2.mul(c2, b1)),
			c1: Fp2.mul(c0, b1),
			c2: Fp2.mul(c1, b1)
		};
	}
	mul01({ c0, c1, c2 }, b0, b1) {
		const { Fp2 } = this;
		let t0 = Fp2.mul(c0, b0);
		let t1 = Fp2.mul(c1, b1);
		return {
			c0: Fp2.add(Fp2.mulByNonresidue(Fp2.sub(Fp2.mul(Fp2.add(c1, c2), b1), t1)), t0),
			c1: Fp2.sub(Fp2.sub(Fp2.mul(Fp2.add(b0, b1), Fp2.add(c0, c1)), t0), t1),
			c2: Fp2.add(Fp2.sub(Fp2.mul(Fp2.add(c0, c2), b0), t0), t1)
		};
	}
};
var _Field12 = class {
	constructor(Fp6, opts) {
		this.MASK = _1n$3;
		const { Fp2 } = Fp6;
		const { Fp } = Fp2;
		this.Fp6 = Fp6;
		this.ORDER = Fp2.ORDER;
		this.BITS = 2 * Fp6.BITS;
		this.BYTES = 2 * Fp6.BYTES;
		this.isLE = Fp6.isLE;
		this.ZERO = {
			c0: Fp6.ZERO,
			c1: Fp6.ZERO
		};
		this.ONE = {
			c0: Fp6.ONE,
			c1: Fp6.ZERO
		};
		this.FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp2, Fp2.NONRESIDUE, Fp.ORDER, 12, 1, 6)[0];
		this.X_LEN = opts.X_LEN;
		this.finalExponentiate = opts.Fp12finalExponentiate;
	}
	create(num) {
		return num;
	}
	isValid({ c0, c1 }) {
		const { Fp6 } = this;
		return Fp6.isValid(c0) && Fp6.isValid(c1);
	}
	is0({ c0, c1 }) {
		const { Fp6 } = this;
		return Fp6.is0(c0) && Fp6.is0(c1);
	}
	isValidNot0(num) {
		return !this.is0(num) && this.isValid(num);
	}
	neg({ c0, c1 }) {
		const { Fp6 } = this;
		return {
			c0: Fp6.neg(c0),
			c1: Fp6.neg(c1)
		};
	}
	eql({ c0, c1 }, { c0: r0, c1: r1 }) {
		const { Fp6 } = this;
		return Fp6.eql(c0, r0) && Fp6.eql(c1, r1);
	}
	sqrt(_) {
		notImplemented();
	}
	inv({ c0, c1 }) {
		const { Fp6 } = this;
		let t = Fp6.inv(Fp6.sub(Fp6.sqr(c0), Fp6.mulByNonresidue(Fp6.sqr(c1))));
		return {
			c0: Fp6.mul(c0, t),
			c1: Fp6.neg(Fp6.mul(c1, t))
		};
	}
	div(lhs, rhs) {
		const { Fp6 } = this;
		const { Fp2 } = Fp6;
		const { Fp } = Fp2;
		return this.mul(lhs, typeof rhs === "bigint" ? Fp.inv(Fp.create(rhs)) : this.inv(rhs));
	}
	pow(num, power) {
		return FpPow(this, num, power);
	}
	invertBatch(nums) {
		return FpInvertBatch(this, nums);
	}
	add({ c0, c1 }, { c0: r0, c1: r1 }) {
		const { Fp6 } = this;
		return {
			c0: Fp6.add(c0, r0),
			c1: Fp6.add(c1, r1)
		};
	}
	sub({ c0, c1 }, { c0: r0, c1: r1 }) {
		const { Fp6 } = this;
		return {
			c0: Fp6.sub(c0, r0),
			c1: Fp6.sub(c1, r1)
		};
	}
	mul({ c0, c1 }, rhs) {
		const { Fp6 } = this;
		if (typeof rhs === "bigint") return {
			c0: Fp6.mul(c0, rhs),
			c1: Fp6.mul(c1, rhs)
		};
		let { c0: r0, c1: r1 } = rhs;
		let t1 = Fp6.mul(c0, r0);
		let t2 = Fp6.mul(c1, r1);
		return {
			c0: Fp6.add(t1, Fp6.mulByNonresidue(t2)),
			c1: Fp6.sub(Fp6.mul(Fp6.add(c0, c1), Fp6.add(r0, r1)), Fp6.add(t1, t2))
		};
	}
	sqr({ c0, c1 }) {
		const { Fp6 } = this;
		let ab = Fp6.mul(c0, c1);
		return {
			c0: Fp6.sub(Fp6.sub(Fp6.mul(Fp6.add(Fp6.mulByNonresidue(c1), c0), Fp6.add(c0, c1)), ab), Fp6.mulByNonresidue(ab)),
			c1: Fp6.add(ab, ab)
		};
	}
	addN(a, b) {
		return this.add(a, b);
	}
	subN(a, b) {
		return this.sub(a, b);
	}
	mulN(a, b) {
		return this.mul(a, b);
	}
	sqrN(a) {
		return this.sqr(a);
	}
	fromBytes(b) {
		const { Fp6 } = this;
		if (b.length !== this.BYTES) throw new Error("fromBytes invalid length=" + b.length);
		return {
			c0: Fp6.fromBytes(b.subarray(0, Fp6.BYTES)),
			c1: Fp6.fromBytes(b.subarray(Fp6.BYTES))
		};
	}
	toBytes({ c0, c1 }) {
		const { Fp6 } = this;
		return concatBytes(Fp6.toBytes(c0), Fp6.toBytes(c1));
	}
	cmov({ c0, c1 }, { c0: r0, c1: r1 }, c) {
		const { Fp6 } = this;
		return {
			c0: Fp6.cmov(c0, r0, c),
			c1: Fp6.cmov(c1, r1, c)
		};
	}
	fromBigTwelve(t) {
		const { Fp6 } = this;
		return {
			c0: Fp6.fromBigSix(t.slice(0, 6)),
			c1: Fp6.fromBigSix(t.slice(6, 12))
		};
	}
	frobeniusMap(lhs, power) {
		const { Fp6 } = this;
		const { Fp2 } = Fp6;
		const { c0, c1, c2 } = Fp6.frobeniusMap(lhs.c1, power);
		const coeff = this.FROBENIUS_COEFFICIENTS[power % 12];
		return {
			c0: Fp6.frobeniusMap(lhs.c0, power),
			c1: Fp6.create({
				c0: Fp2.mul(c0, coeff),
				c1: Fp2.mul(c1, coeff),
				c2: Fp2.mul(c2, coeff)
			})
		};
	}
	mulByFp2({ c0, c1 }, rhs) {
		const { Fp6 } = this;
		return {
			c0: Fp6.mulByFp2(c0, rhs),
			c1: Fp6.mulByFp2(c1, rhs)
		};
	}
	conjugate({ c0, c1 }) {
		return {
			c0,
			c1: this.Fp6.neg(c1)
		};
	}
	mul014({ c0, c1 }, o0, o1, o4) {
		const { Fp6 } = this;
		const { Fp2 } = Fp6;
		let t0 = Fp6.mul01(c0, o0, o1);
		let t1 = Fp6.mul1(c1, o4);
		return {
			c0: Fp6.add(Fp6.mulByNonresidue(t1), t0),
			c1: Fp6.sub(Fp6.sub(Fp6.mul01(Fp6.add(c1, c0), o0, Fp2.add(o1, o4)), t0), t1)
		};
	}
	mul034({ c0, c1 }, o0, o3, o4) {
		const { Fp6 } = this;
		const { Fp2 } = Fp6;
		const a = Fp6.create({
			c0: Fp2.mul(c0.c0, o0),
			c1: Fp2.mul(c0.c1, o0),
			c2: Fp2.mul(c0.c2, o0)
		});
		const b = Fp6.mul01(c1, o3, o4);
		const e = Fp6.mul01(Fp6.add(c0, c1), Fp2.add(o0, o3), o4);
		return {
			c0: Fp6.add(Fp6.mulByNonresidue(b), a),
			c1: Fp6.sub(e, Fp6.add(a, b))
		};
	}
	_cyclotomicSquare({ c0, c1 }) {
		const { Fp6 } = this;
		const { Fp2 } = Fp6;
		const { c0: c0c0, c1: c0c1, c2: c0c2 } = c0;
		const { c0: c1c0, c1: c1c1, c2: c1c2 } = c1;
		const { first: t3, second: t4 } = Fp2.Fp4Square(c0c0, c1c1);
		const { first: t5, second: t6 } = Fp2.Fp4Square(c1c0, c0c2);
		const { first: t7, second: t8 } = Fp2.Fp4Square(c0c1, c1c2);
		const t9 = Fp2.mulByNonresidue(t8);
		return {
			c0: Fp6.create({
				c0: Fp2.add(Fp2.mul(Fp2.sub(t3, c0c0), _2n$3), t3),
				c1: Fp2.add(Fp2.mul(Fp2.sub(t5, c0c1), _2n$3), t5),
				c2: Fp2.add(Fp2.mul(Fp2.sub(t7, c0c2), _2n$3), t7)
			}),
			c1: Fp6.create({
				c0: Fp2.add(Fp2.mul(Fp2.add(t9, c1c0), _2n$3), t9),
				c1: Fp2.add(Fp2.mul(Fp2.add(t4, c1c1), _2n$3), t4),
				c2: Fp2.add(Fp2.mul(Fp2.add(t6, c1c2), _2n$3), t6)
			})
		};
	}
	_cyclotomicExp(num, n) {
		let z = this.ONE;
		for (let i = this.X_LEN - 1; i >= 0; i--) {
			z = this._cyclotomicSquare(z);
			if (bitGet(n, i)) z = this.mul(z, num);
		}
		return z;
	}
};
function tower12(opts) {
	const Fp = Field(opts.ORDER);
	const Fp2 = new _Field2(Fp, opts);
	const Fp6 = new _Field6(Fp2);
	return {
		Fp,
		Fp2,
		Fp6,
		Fp12: new _Field12(Fp6, opts)
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+curves@1.9.7/node_modules/@noble/curves/esm/bls12-381.js
/**
* bls12-381 is pairing-friendly Barreto-Lynn-Scott elliptic curve construction allowing to:

* Construct zk-SNARKs at the ~120-bit security, as per [Barbulescu-Duquesne 2017](https://hal.science/hal-01534101/file/main.pdf)
* Efficiently verify N aggregate signatures with 1 pairing and N ec additions:
the Boneh-Lynn-Shacham signature scheme is orders of magnitude more efficient than Schnorr

BLS can mean 2 different things:

* Barreto-Lynn-Scott: BLS12, a Pairing Friendly Elliptic Curve
* Boneh-Lynn-Shacham: A Signature Scheme.

### Summary

1. BLS Relies on expensive bilinear pairing
2. Secret Keys: 32 bytes
3. Public Keys: 48 OR 96 bytes - big-endian x coordinate of point on G1 OR G2 curve
4. Signatures: 96 OR 48 bytes - big-endian x coordinate of point on G2 OR G1 curve
5. The 12 stands for the Embedding degree.

Modes of operation:

* Long signatures:  48-byte keys + 96-byte sigs (G1 keys + G2 sigs).
* Short signatures: 96-byte keys + 48-byte sigs (G2 keys + G1 sigs).

### Formulas

- `P = pk x G` - public keys
- `S = pk x H(m)` - signing, uses hash-to-curve on m
- `e(P, H(m)) == e(G, S)` - verification using pairings
- `e(G, S) = e(G, SUM(n)(Si)) = MUL(n)(e(G, Si))` - signature aggregation

### Curves

G1 is ordinary elliptic curve. G2 is extension field curve, think "over complex numbers".

- G1: y² = x³ + 4
- G2: y² = x³ + 4(u + 1) where u = √−1; r-order subgroup of E'(Fp²), M-type twist

### Towers

Pairing G1 + G2 produces element in Fp₁₂, 12-degree polynomial.
Fp₁₂ is usually implemented using tower of lower-degree polynomials for speed.

- Fp₁₂ = Fp₆² => Fp₂³
- Fp(u) / (u² - β) where β = -1
- Fp₂(v) / (v³ - ξ) where ξ = u + 1
- Fp₆(w) / (w² - γ) where γ = v
- Fp²[u] = Fp/u²+1
- Fp⁶[v] = Fp²/v³-1-u
- Fp¹²[w] = Fp⁶/w²-v

### Params

* Embedding degree (k): 12
* Seed is sometimes named x or t
* t = -15132376222941642752
* p = (t-1)² * (t⁴-t²+1)/3 + t
* r = t⁴-t²+1
* Ate loop size: X

To verify curve parameters, see
[pairing-friendly-curves spec](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-pairing-friendly-curves-11).
Basic math is done over finite fields over p.
More complicated math is done over polynominal extension fields.

### Compatibility and notes
1. It is compatible with Algorand, Chia, Dfinity, Ethereum, Filecoin, ZEC.
Filecoin uses little endian byte arrays for secret keys - make sure to reverse byte order.
2. Make sure to correctly select mode: "long signature" or "short signature".
3. Compatible with specs:
RFC 9380,
[cfrg-pairing-friendly-curves-11](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-pairing-friendly-curves-11),
[cfrg-bls-signature-05](https://datatracker.ietf.org/doc/draft-irtf-cfrg-bls-signature/).

*
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n$2 = BigInt(0);
var _1n$2 = BigInt(1);
var _2n$2 = BigInt(2);
var _3n = BigInt(3);
var _4n = BigInt(4);
var BLS_X = BigInt("0xd201000000010000");
var BLS_X_LEN = bitLen(BLS_X);
var bls12_381_CURVE_G1 = {
	p: BigInt("0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab"),
	n: BigInt("0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001"),
	h: BigInt("0x396c8c005555e1568c00aaab0000aaab"),
	a: _0n$2,
	b: _4n,
	Gx: BigInt("0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb"),
	Gy: BigInt("0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1")
};
var bls12_381_Fr = Field(bls12_381_CURVE_G1.n, {
	modFromBytes: true,
	isLE: true
});
var { Fp: Fp$1, Fp2, Fp6, Fp12 } = tower12({
	ORDER: bls12_381_CURVE_G1.p,
	X_LEN: BLS_X_LEN,
	FP2_NONRESIDUE: [_1n$2, _1n$2],
	Fp2mulByB: ({ c0, c1 }) => {
		const t0 = Fp$1.mul(c0, _4n);
		const t1 = Fp$1.mul(c1, _4n);
		return {
			c0: Fp$1.sub(t0, t1),
			c1: Fp$1.add(t0, t1)
		};
	},
	Fp12finalExponentiate: (num) => {
		const x = BLS_X;
		const t0 = Fp12.div(Fp12.frobeniusMap(num, 6), num);
		const t1 = Fp12.mul(Fp12.frobeniusMap(t0, 2), t0);
		const t2 = Fp12.conjugate(Fp12._cyclotomicExp(t1, x));
		const t3 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicSquare(t1)), t2);
		const t4 = Fp12.conjugate(Fp12._cyclotomicExp(t3, x));
		const t5 = Fp12.conjugate(Fp12._cyclotomicExp(t4, x));
		const t6 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicExp(t5, x)), Fp12._cyclotomicSquare(t2));
		const t7 = Fp12.conjugate(Fp12._cyclotomicExp(t6, x));
		const t2_t5_pow_q2 = Fp12.frobeniusMap(Fp12.mul(t2, t5), 2);
		const t4_t1_pow_q3 = Fp12.frobeniusMap(Fp12.mul(t4, t1), 3);
		const t6_t1c_pow_q1 = Fp12.frobeniusMap(Fp12.mul(t6, Fp12.conjugate(t1)), 1);
		const t7_t3c_t1 = Fp12.mul(Fp12.mul(t7, Fp12.conjugate(t3)), t1);
		return Fp12.mul(Fp12.mul(Fp12.mul(t2_t5_pow_q2, t4_t1_pow_q3), t6_t1c_pow_q1), t7_t3c_t1);
	}
});
var { G2psi, G2psi2 } = psiFrobenius(Fp$1, Fp2, Fp2.div(Fp2.ONE, Fp2.NONRESIDUE));
/**
* Default hash_to_field / hash-to-curve for BLS.
* m: 1 for G1, 2 for G2
* k: target security level in bits
* hash: any function, e.g. BBS+ uses BLAKE2: see [github](https://github.com/hyperledger/aries-framework-go/issues/2247).
* Parameter values come from [section 8.8.2 of RFC 9380](https://www.rfc-editor.org/rfc/rfc9380#section-8.8.2).
*/
var htfDefaults = Object.freeze({
	DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
	encodeDST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
	p: Fp$1.ORDER,
	m: 2,
	k: 128,
	expand: "xmd",
	hash: sha256
});
var bls12_381_CURVE_G2 = {
	p: Fp2.ORDER,
	n: bls12_381_CURVE_G1.n,
	h: BigInt("0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5"),
	a: Fp2.ZERO,
	b: Fp2.fromBigTuple([_4n, _4n]),
	Gx: Fp2.fromBigTuple([BigInt("0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8"), BigInt("0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e")]),
	Gy: Fp2.fromBigTuple([BigInt("0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801"), BigInt("0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79be")])
};
var COMPZERO = setMask(Fp$1.toBytes(_0n$2), {
	infinity: true,
	compressed: true
});
function parseMask(bytes) {
	bytes = bytes.slice();
	const mask = bytes[0] & 224;
	const compressed = !!(mask >> 7 & 1);
	const infinity = !!(mask >> 6 & 1);
	const sort = !!(mask >> 5 & 1);
	bytes[0] &= 31;
	return {
		compressed,
		infinity,
		sort,
		value: bytes
	};
}
function setMask(bytes, mask) {
	if (bytes[0] & 224) throw new Error("setMask: non-empty mask");
	if (mask.compressed) bytes[0] |= 128;
	if (mask.infinity) bytes[0] |= 64;
	if (mask.sort) bytes[0] |= 32;
	return bytes;
}
function pointG1ToBytes(_c, point, isComp) {
	const { BYTES: L, ORDER: P } = Fp$1;
	const is0 = point.is0();
	const { x, y } = point.toAffine();
	if (isComp) {
		if (is0) return COMPZERO.slice();
		const sort = Boolean(y * _2n$2 / P);
		return setMask(numberToBytesBE(x, L), {
			compressed: true,
			sort
		});
	} else if (is0) return concatBytes(Uint8Array.of(64), new Uint8Array(2 * L - 1));
	else return concatBytes(numberToBytesBE(x, L), numberToBytesBE(y, L));
}
function signatureG1ToBytes(point) {
	point.assertValidity();
	const { BYTES: L, ORDER: P } = Fp$1;
	const { x, y } = point.toAffine();
	if (point.is0()) return COMPZERO.slice();
	const sort = Boolean(y * _2n$2 / P);
	return setMask(numberToBytesBE(x, L), {
		compressed: true,
		sort
	});
}
function pointG1FromBytes(bytes) {
	const { compressed, infinity, sort, value } = parseMask(bytes);
	const { BYTES: L, ORDER: P } = Fp$1;
	if (value.length === 48 && compressed) {
		const compressedValue = bytesToNumberBE(value);
		const x = Fp$1.create(compressedValue & bitMask(Fp$1.BITS));
		if (infinity) {
			if (x !== _0n$2) throw new Error("invalid G1 point: non-empty, at infinity, with compression");
			return {
				x: _0n$2,
				y: _0n$2
			};
		}
		const right = Fp$1.add(Fp$1.pow(x, _3n), Fp$1.create(bls12_381_CURVE_G1.b));
		let y = Fp$1.sqrt(right);
		if (!y) throw new Error("invalid G1 point: compressed point");
		if (y * _2n$2 / P !== BigInt(sort)) y = Fp$1.neg(y);
		return {
			x: Fp$1.create(x),
			y: Fp$1.create(y)
		};
	} else if (value.length === 96 && !compressed) {
		const x = bytesToNumberBE(value.subarray(0, L));
		const y = bytesToNumberBE(value.subarray(L));
		if (infinity) {
			if (x !== _0n$2 || y !== _0n$2) throw new Error("G1: non-empty point at infinity");
			return bls12_381.G1.Point.ZERO.toAffine();
		}
		return {
			x: Fp$1.create(x),
			y: Fp$1.create(y)
		};
	} else throw new Error("invalid G1 point: expected 48/96 bytes");
}
function signatureG1FromBytes(hex) {
	const { infinity, sort, value } = parseMask(ensureBytes("signatureHex", hex, 48));
	const P = Fp$1.ORDER;
	const Point = bls12_381.G1.Point;
	const compressedValue = bytesToNumberBE(value);
	if (infinity) return Point.ZERO;
	const x = Fp$1.create(compressedValue & bitMask(Fp$1.BITS));
	const right = Fp$1.add(Fp$1.pow(x, _3n), Fp$1.create(bls12_381_CURVE_G1.b));
	let y = Fp$1.sqrt(right);
	if (!y) throw new Error("invalid G1 point: compressed");
	const aflag = BigInt(sort);
	if (y * _2n$2 / P !== aflag) y = Fp$1.neg(y);
	const point = Point.fromAffine({
		x,
		y
	});
	point.assertValidity();
	return point;
}
function pointG2ToBytes(_c, point, isComp) {
	const { BYTES: L, ORDER: P } = Fp$1;
	const is0 = point.is0();
	const { x, y } = point.toAffine();
	if (isComp) {
		if (is0) return concatBytes(COMPZERO, numberToBytesBE(_0n$2, L));
		const flag = Boolean(y.c1 === _0n$2 ? y.c0 * _2n$2 / P : y.c1 * _2n$2 / P);
		return concatBytes(setMask(numberToBytesBE(x.c1, L), {
			compressed: true,
			sort: flag
		}), numberToBytesBE(x.c0, L));
	} else {
		if (is0) return concatBytes(Uint8Array.of(64), new Uint8Array(4 * L - 1));
		const { re: x0, im: x1 } = Fp2.reim(x);
		const { re: y0, im: y1 } = Fp2.reim(y);
		return concatBytes(numberToBytesBE(x1, L), numberToBytesBE(x0, L), numberToBytesBE(y1, L), numberToBytesBE(y0, L));
	}
}
function signatureG2ToBytes(point) {
	point.assertValidity();
	const { BYTES: L } = Fp$1;
	if (point.is0()) return concatBytes(COMPZERO, numberToBytesBE(_0n$2, L));
	const { x, y } = point.toAffine();
	const { re: x0, im: x1 } = Fp2.reim(x);
	const { re: y0, im: y1 } = Fp2.reim(y);
	const tmp = y1 > _0n$2 ? y1 * _2n$2 : y0 * _2n$2;
	const sort = Boolean(tmp / Fp$1.ORDER & _1n$2);
	const z2 = x0;
	return concatBytes(setMask(numberToBytesBE(x1, L), {
		sort,
		compressed: true
	}), numberToBytesBE(z2, L));
}
function pointG2FromBytes(bytes) {
	const { BYTES: L, ORDER: P } = Fp$1;
	const { compressed, infinity, sort, value } = parseMask(bytes);
	if (!compressed && !infinity && sort || !compressed && infinity && sort || sort && infinity && compressed) throw new Error("invalid encoding flag: " + (bytes[0] & 224));
	const slc = (b, from, to) => bytesToNumberBE(b.slice(from, to));
	if (value.length === 96 && compressed) {
		if (infinity) {
			if (value.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) throw new Error("invalid G2 point: compressed");
			return {
				x: Fp2.ZERO,
				y: Fp2.ZERO
			};
		}
		const x_1 = slc(value, 0, L);
		const x_0 = slc(value, L, 2 * L);
		const x = Fp2.create({
			c0: Fp$1.create(x_0),
			c1: Fp$1.create(x_1)
		});
		const right = Fp2.add(Fp2.pow(x, _3n), bls12_381_CURVE_G2.b);
		let y = Fp2.sqrt(right);
		const Y_bit = y.c1 === _0n$2 ? y.c0 * _2n$2 / P : y.c1 * _2n$2 / P ? _1n$2 : _0n$2;
		y = sort && Y_bit > 0 ? y : Fp2.neg(y);
		return {
			x,
			y
		};
	} else if (value.length === 192 && !compressed) {
		if (infinity) {
			if (value.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) throw new Error("invalid G2 point: uncompressed");
			return {
				x: Fp2.ZERO,
				y: Fp2.ZERO
			};
		}
		const x1 = slc(value, 0 * L, 1 * L);
		const x0 = slc(value, 1 * L, 2 * L);
		const y1 = slc(value, 2 * L, 3 * L);
		const y0 = slc(value, 3 * L, 4 * L);
		return {
			x: Fp2.fromBigTuple([x0, x1]),
			y: Fp2.fromBigTuple([y0, y1])
		};
	} else throw new Error("invalid G2 point: expected 96/192 bytes");
}
function signatureG2FromBytes(hex) {
	const { ORDER: P } = Fp$1;
	const { infinity, sort, value } = parseMask(ensureBytes("signatureHex", hex));
	const Point = bls12_381.G2.Point;
	const half = value.length / 2;
	if (half !== 48 && half !== 96) throw new Error("invalid compressed signature length, expected 96/192 bytes");
	const z1 = bytesToNumberBE(value.slice(0, half));
	const z2 = bytesToNumberBE(value.slice(half));
	if (infinity) return Point.ZERO;
	const x1 = Fp$1.create(z1 & bitMask(Fp$1.BITS));
	const x2 = Fp$1.create(z2);
	const x = Fp2.create({
		c0: x2,
		c1: x1
	});
	const y2 = Fp2.add(Fp2.pow(x, _3n), bls12_381_CURVE_G2.b);
	let y = Fp2.sqrt(y2);
	if (!y) throw new Error("Failed to find a square root");
	const { re: y0, im: y1 } = Fp2.reim(y);
	const aflag1 = BigInt(sort);
	const isGreater = y1 > _0n$2 && y1 * _2n$2 / P !== aflag1;
	const is0 = y1 === _0n$2 && y0 * _2n$2 / P !== aflag1;
	if (isGreater || is0) y = Fp2.neg(y);
	const point = Point.fromAffine({
		x,
		y
	});
	point.assertValidity();
	return point;
}
/**
* bls12-381 pairing-friendly curve.
* @example
* import { bls12_381 as bls } from '@noble/curves/bls12-381';
* // G1 keys, G2 signatures
* const privateKey = '67d53f170b908cabb9eb326c3c337762d59289a8fec79f7bc9254b584b73265c';
* const message = '64726e3da8';
* const publicKey = bls.getPublicKey(privateKey);
* const signature = bls.sign(message, privateKey);
* const isValid = bls.verify(signature, message, publicKey);
*/
var bls12_381 = bls({
	fields: {
		Fp: Fp$1,
		Fp2,
		Fp6,
		Fp12,
		Fr: bls12_381_Fr
	},
	G1: {
		...bls12_381_CURVE_G1,
		Fp: Fp$1,
		htfDefaults: {
			...htfDefaults,
			m: 1,
			DST: "BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL_"
		},
		wrapPrivateKey: true,
		allowInfinityPoint: true,
		isTorsionFree: (c, point) => {
			const beta = BigInt("0x5f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe");
			const phi = new c(Fp$1.mul(point.X, beta), point.Y, point.Z);
			return point.multiplyUnsafe(BLS_X).negate().multiplyUnsafe(BLS_X).equals(phi);
		},
		clearCofactor: (_c, point) => {
			return point.multiplyUnsafe(BLS_X).add(point);
		},
		mapToCurve: mapToG1,
		fromBytes: pointG1FromBytes,
		toBytes: pointG1ToBytes,
		ShortSignature: {
			fromBytes(bytes) {
				abytes(bytes);
				return signatureG1FromBytes(bytes);
			},
			fromHex(hex) {
				return signatureG1FromBytes(hex);
			},
			toBytes(point) {
				return signatureG1ToBytes(point);
			},
			toRawBytes(point) {
				return signatureG1ToBytes(point);
			},
			toHex(point) {
				return bytesToHex(signatureG1ToBytes(point));
			}
		}
	},
	G2: {
		...bls12_381_CURVE_G2,
		Fp: Fp2,
		hEff: BigInt("0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551"),
		htfDefaults: { ...htfDefaults },
		wrapPrivateKey: true,
		allowInfinityPoint: true,
		mapToCurve: mapToG2,
		isTorsionFree: (c, P) => {
			return P.multiplyUnsafe(BLS_X).negate().equals(G2psi(c, P));
		},
		clearCofactor: (c, P) => {
			const x = BLS_X;
			let t1 = P.multiplyUnsafe(x).negate();
			let t2 = G2psi(c, P);
			let t3 = P.double();
			t3 = G2psi2(c, t3);
			t3 = t3.subtract(t2);
			t2 = t1.add(t2);
			t2 = t2.multiplyUnsafe(x).negate();
			t3 = t3.add(t2);
			t3 = t3.subtract(t1);
			return t3.subtract(P);
		},
		fromBytes: pointG2FromBytes,
		toBytes: pointG2ToBytes,
		Signature: {
			fromBytes(bytes) {
				abytes(bytes);
				return signatureG2FromBytes(bytes);
			},
			fromHex(hex) {
				return signatureG2FromBytes(hex);
			},
			toBytes(point) {
				return signatureG2ToBytes(point);
			},
			toRawBytes(point) {
				return signatureG2ToBytes(point);
			},
			toHex(point) {
				return bytesToHex(signatureG2ToBytes(point));
			}
		}
	},
	params: {
		ateLoopSize: BLS_X,
		r: bls12_381_CURVE_G1.n,
		xNegative: true,
		twistType: "multiplicative"
	},
	htfDefaults,
	hash: sha256
});
var isogenyMapG2 = isogenyMap(Fp2, [
	[
		["0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6", "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6"],
		["0x0", "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71a"],
		["0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71e", "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38d"],
		["0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1", "0x0"]
	],
	[
		["0x0", "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63"],
		["0xc", "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9f"],
		["0x1", "0x0"]
	],
	[
		["0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706", "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706"],
		["0x0", "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97be"],
		["0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71c", "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38f"],
		["0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10", "0x0"]
	],
	[
		["0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb", "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb"],
		["0x0", "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3"],
		["0x12", "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99"],
		["0x1", "0x0"]
	]
].map((i) => i.map((pair) => Fp2.fromBigTuple(pair.map(BigInt)))));
var isogenyMapG1 = isogenyMap(Fp$1, [
	[
		"0x11a05f2b1e833340b809101dd99815856b303e88a2d7005ff2627b56cdb4e2c85610c2d5f2e62d6eaeac1662734649b7",
		"0x17294ed3e943ab2f0588bab22147a81c7c17e75b2f6a8417f565e33c70d1e86b4838f2a6f318c356e834eef1b3cb83bb",
		"0xd54005db97678ec1d1048c5d10a9a1bce032473295983e56878e501ec68e25c958c3e3d2a09729fe0179f9dac9edcb0",
		"0x1778e7166fcc6db74e0609d307e55412d7f5e4656a8dbf25f1b33289f1b330835336e25ce3107193c5b388641d9b6861",
		"0xe99726a3199f4436642b4b3e4118e5499db995a1257fb3f086eeb65982fac18985a286f301e77c451154ce9ac8895d9",
		"0x1630c3250d7313ff01d1201bf7a74ab5db3cb17dd952799b9ed3ab9097e68f90a0870d2dcae73d19cd13c1c66f652983",
		"0xd6ed6553fe44d296a3726c38ae652bfb11586264f0f8ce19008e218f9c86b2a8da25128c1052ecaddd7f225a139ed84",
		"0x17b81e7701abdbe2e8743884d1117e53356de5ab275b4db1a682c62ef0f2753339b7c8f8c8f475af9ccb5618e3f0c88e",
		"0x80d3cf1f9a78fc47b90b33563be990dc43b756ce79f5574a2c596c928c5d1de4fa295f296b74e956d71986a8497e317",
		"0x169b1f8e1bcfa7c42e0c37515d138f22dd2ecb803a0c5c99676314baf4bb1b7fa3190b2edc0327797f241067be390c9e",
		"0x10321da079ce07e272d8ec09d2565b0dfa7dccdde6787f96d50af36003b14866f69b771f8c285decca67df3f1605fb7b",
		"0x6e08c248e260e70bd1e962381edee3d31d79d7e22c837bc23c0bf1bc24c6b68c24b1b80b64d391fa9c8ba2e8ba2d229"
	],
	[
		"0x8ca8d548cff19ae18b2e62f4bd3fa6f01d5ef4ba35b48ba9c9588617fc8ac62b558d681be343df8993cf9fa40d21b1c",
		"0x12561a5deb559c4348b4711298e536367041e8ca0cf0800c0126c2588c48bf5713daa8846cb026e9e5c8276ec82b3bff",
		"0xb2962fe57a3225e8137e629bff2991f6f89416f5a718cd1fca64e00b11aceacd6a3d0967c94fedcfcc239ba5cb83e19",
		"0x3425581a58ae2fec83aafef7c40eb545b08243f16b1655154cca8abc28d6fd04976d5243eecf5c4130de8938dc62cd8",
		"0x13a8e162022914a80a6f1d5f43e7a07dffdfc759a12062bb8d6b44e833b306da9bd29ba81f35781d539d395b3532a21e",
		"0xe7355f8e4e667b955390f7f0506c6e9395735e9ce9cad4d0a43bcef24b8982f7400d24bc4228f11c02df9a29f6304a5",
		"0x772caacf16936190f3e0c63e0596721570f5799af53a1894e2e073062aede9cea73b3538f0de06cec2574496ee84a3a",
		"0x14a7ac2a9d64a8b230b3f5b074cf01996e7f63c21bca68a81996e1cdf9822c580fa5b9489d11e2d311f7d99bbdcc5a5e",
		"0xa10ecf6ada54f825e920b3dafc7a3cce07f8d1d7161366b74100da67f39883503826692abba43704776ec3a79a1d641",
		"0x95fc13ab9e92ad4476d6e3eb3a56680f682b4ee96f7d03776df533978f31c1593174e4b4b7865002d6384d168ecdd0a",
		"0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
	],
	[
		"0x90d97c81ba24ee0259d1f094980dcfa11ad138e48a869522b52af6c956543d3cd0c7aee9b3ba3c2be9845719707bb33",
		"0x134996a104ee5811d51036d776fb46831223e96c254f383d0f906343eb67ad34d6c56711962fa8bfe097e75a2e41c696",
		"0xcc786baa966e66f4a384c86a3b49942552e2d658a31ce2c344be4b91400da7d26d521628b00523b8dfe240c72de1f6",
		"0x1f86376e8981c217898751ad8746757d42aa7b90eeb791c09e4a3ec03251cf9de405aba9ec61deca6355c77b0e5f4cb",
		"0x8cc03fdefe0ff135caf4fe2a21529c4195536fbe3ce50b879833fd221351adc2ee7f8dc099040a841b6daecf2e8fedb",
		"0x16603fca40634b6a2211e11db8f0a6a074a7d0d4afadb7bd76505c3d3ad5544e203f6326c95a807299b23ab13633a5f0",
		"0x4ab0b9bcfac1bbcb2c977d027796b3ce75bb8ca2be184cb5231413c4d634f3747a87ac2460f415ec961f8855fe9d6f2",
		"0x987c8d5333ab86fde9926bd2ca6c674170a05bfe3bdd81ffd038da6c26c842642f64550fedfe935a15e4ca31870fb29",
		"0x9fc4018bd96684be88c9e221e4da1bb8f3abd16679dc26c1e8b6e6a1f20cabe69d65201c78607a360370e577bdba587",
		"0xe1bba7a1186bdb5223abde7ada14a23c42a0ca7915af6fe06985e7ed1e4d43b9b3f7055dd4eba6f2bafaaebca731c30",
		"0x19713e47937cd1be0dfd0b8f1d43fb93cd2fcbcb6caf493fd1183e416389e61031bf3a5cce3fbafce813711ad011c132",
		"0x18b46a908f36f6deb918c143fed2edcc523559b8aaf0c2462e6bfe7f911f643249d9cdf41b44d606ce07c8a4d0074d8e",
		"0xb182cac101b9399d155096004f53f447aa7b12a3426b08ec02710e807b4633f06c851c1919211f20d4c04f00b971ef8",
		"0x245a394ad1eca9b72fc00ae7be315dc757b3b080d4c158013e6632d3c40659cc6cf90ad1c232a6442d9d3f5db980133",
		"0x5c129645e44cf1102a159f748c4a3fc5e673d81d7e86568d9ab0f5d396a7ce46ba1049b6579afb7866b1e715475224b",
		"0x15e6be4e990f03ce4ea50b3b42df2eb5cb181d8f84965a3957add4fa95af01b2b665027efec01c7704b456be69c8b604"
	],
	[
		"0x16112c4c3a9c98b252181140fad0eae9601a6de578980be6eec3232b5be72e7a07f3688ef60c206d01479253b03663c1",
		"0x1962d75c2381201e1a0cbd6c43c348b885c84ff731c4d59ca4a10356f453e01f78a4260763529e3532f6102c2e49a03d",
		"0x58df3306640da276faaae7d6e8eb15778c4855551ae7f310c35a5dd279cd2eca6757cd636f96f891e2538b53dbf67f2",
		"0x16b7d288798e5395f20d23bf89edb4d1d115c5dbddbcd30e123da489e726af41727364f2c28297ada8d26d98445f5416",
		"0xbe0e079545f43e4b00cc912f8228ddcc6d19c9f0f69bbb0542eda0fc9dec916a20b15dc0fd2ededda39142311a5001d",
		"0x8d9e5297186db2d9fb266eaac783182b70152c65550d881c5ecd87b6f0f5a6449f38db9dfa9cce202c6477faaf9b7ac",
		"0x166007c08a99db2fc3ba8734ace9824b5eecfdfa8d0cf8ef5dd365bc400a0051d5fa9c01a58b1fb93d1a1399126a775c",
		"0x16a3ef08be3ea7ea03bcddfabba6ff6ee5a4375efa1f4fd7feb34fd206357132b920f5b00801dee460ee415a15812ed9",
		"0x1866c8ed336c61231a1be54fd1d74cc4f9fb0ce4c6af5920abc5750c4bf39b4852cfe2f7bb9248836b233d9d55535d4a",
		"0x167a55cda70a6e1cea820597d94a84903216f763e13d87bb5308592e7ea7d4fbc7385ea3d529b35e346ef48bb8913f55",
		"0x4d2f259eea405bd48f010a01ad2911d9c6dd039bb61a6290e591b36e636a5c871a5c29f4f83060400f8b49cba8f6aa8",
		"0xaccbb67481d033ff5852c1e48c50c477f94ff8aefce42d28c0f9a88cea7913516f968986f7ebbea9684b529e2561092",
		"0xad6b9514c767fe3c3613144b45f1496543346d98adf02267d5ceef9a00d9b8693000763e3b90ac11e99b138573345cc",
		"0x2660400eb2e4f3b628bdd0d53cd76f2bf565b94e72927c1cb748df27942480e420517bd8714cc80d1fadc1326ed06f7",
		"0xe0fa1d816ddc03e6b24255e0d7819c171c40f65e273b853324efcd6356caa205ca2f570f13497804415473a1d634b8f",
		"0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
	]
].map((i) => i.map((j) => BigInt(j))));
var G1_SWU = mapToCurveSimpleSWU(Fp$1, {
	A: Fp$1.create(BigInt("0x144698a3b8e9433d693a02c96d4982b0ea985383ee66a8d8e8981aefd881ac98936f8da0e0f97f5cf428082d584c1d")),
	B: Fp$1.create(BigInt("0x12e2908d11688030018b12e8753eee3b2016c1f0f24f4070a0b9c14fcef35ef55a23215a316ceaa5d1cc48e98e172be0")),
	Z: Fp$1.create(BigInt(11))
});
var G2_SWU = mapToCurveSimpleSWU(Fp2, {
	A: Fp2.create({
		c0: Fp$1.create(_0n$2),
		c1: Fp$1.create(BigInt(240))
	}),
	B: Fp2.create({
		c0: Fp$1.create(BigInt(1012)),
		c1: Fp$1.create(BigInt(1012))
	}),
	Z: Fp2.create({
		c0: Fp$1.create(BigInt(-2)),
		c1: Fp$1.create(BigInt(-1))
	})
});
function mapToG1(scalars) {
	const { x, y } = G1_SWU(Fp$1.create(scalars[0]));
	return isogenyMapG1(x, y);
}
function mapToG2(scalars) {
	const { x, y } = G2_SWU(Fp2.fromBigTuple(scalars));
	return isogenyMapG2(x, y);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/utils/bls.js
/**
*
* @param pk primary key: Uint8Array
* @param sig signature: Uint8Array
* @param msg message: Uint8Array
* @returns boolean
*/
function blsVerify(pk, sig, msg) {
	const primaryKey = typeof pk === "string" ? pk : bytesToHex(pk);
	const signature = typeof sig === "string" ? sig : bytesToHex(sig);
	const message = typeof msg === "string" ? msg : bytesToHex(msg);
	return bls12_381.verifyShortSignature(signature, message, primaryKey);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/utils/leb.js
var MILLISECOND_TO_NANOSECONDS = BigInt(1e6);
var decodeLeb128 = (buf) => {
	return lebDecode(new PipeArrayBuffer(buf));
};
var decodeTime = (buf) => {
	const timestampMs = decodeLeb128(buf) / MILLISECOND_TO_NANOSECONDS;
	return new Date(Number(timestampMs));
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/certificate.js
var MINUTES_TO_MSEC = 6e4;
var DAYS_TO_MINUTES = 1440;
var DEFAULT_CERTIFICATE_MAX_AGE_IN_MINUTES = 5;
var DEFAULT_CERTIFICATE_MAX_MINUTES_IN_FUTURE = 5;
var DEFAULT_CERTIFICATE_DELEGATION_MAX_AGE_IN_MINUTES = 30 * DAYS_TO_MINUTES;
var NodeType;
(function(NodeType) {
	NodeType[NodeType["Empty"] = 0] = "Empty";
	NodeType[NodeType["Fork"] = 1] = "Fork";
	NodeType[NodeType["Labeled"] = 2] = "Labeled";
	NodeType[NodeType["Leaf"] = 3] = "Leaf";
	NodeType[NodeType["Pruned"] = 4] = "Pruned";
})(NodeType || (NodeType = {}));
function isBufferGreaterThan(a, b) {
	for (let i = 0; i < a.length; i++) if (a[i] > b[i]) return true;
	return false;
}
var Certificate = class Certificate {
	#disableTimeVerification = false;
	#agent = void 0;
	/**
	* Create a new instance of a certificate, automatically verifying it.
	* @param {CreateCertificateOptions} options {@link CreateCertificateOptions}
	* @throws {Error} if the verification of the certificate fails
	*/
	static async create(options) {
		const cert = Certificate.createUnverified(options);
		await cert.verify();
		return cert;
	}
	static createUnverified(options) {
		return new Certificate(options.certificate, options.rootKey, options.principal, options.blsVerify ?? blsVerify, options.maxAgeInMinutes, options.disableTimeVerification, options.agent);
	}
	constructor(certificate, _rootKey, _principal, _blsVerify, _maxAgeInMinutes = DEFAULT_CERTIFICATE_MAX_AGE_IN_MINUTES, disableTimeVerification = false, agent) {
		this._rootKey = _rootKey;
		this._principal = _principal;
		this._blsVerify = _blsVerify;
		this._maxAgeInMinutes = _maxAgeInMinutes;
		this.#disableTimeVerification = disableTimeVerification;
		this.cert = decode(certificate);
		if (agent && "getTimeDiffMsecs" in agent && "hasSyncedTime" in agent && "syncTime" in agent && "syncTimeWithSubnet" in agent) this.#agent = agent;
	}
	/**
	* Lookup a path in the certificate tree, using {@link lookup_path}.
	* @param path The path to lookup.
	* @returns The result of the lookup.
	*/
	lookup_path(path) {
		return lookup_path(path, this.cert.tree);
	}
	/**
	* Lookup a subtree in the certificate tree, using {@link lookup_subtree}.
	* @param path The path to lookup.
	* @returns The result of the lookup.
	*/
	lookup_subtree(path) {
		return lookup_subtree(path, this.cert.tree);
	}
	async verify() {
		const rootHash = await reconstruct(this.cert.tree);
		const derKey = await this._checkDelegationAndGetKey(this.cert.delegation);
		const sig = this.cert.signature;
		const key = extractDER(derKey);
		const msg = concatBytes(IC_STATE_ROOT_DOMAIN_SEPARATOR, rootHash);
		const lookupTime = lookupResultToBuffer(this.lookup_path(["time"]));
		if (!lookupTime) throw ProtocolError.fromCode(new CertificateVerificationErrorCode("Certificate does not contain a time"));
		if (!this.#disableTimeVerification) {
			const timeDiffMsecs = this.#agent?.getTimeDiffMsecs() ?? 0;
			const maxAgeInMsec = this._maxAgeInMinutes * MINUTES_TO_MSEC;
			const now = /* @__PURE__ */ new Date();
			const adjustedNow = now.getTime() + timeDiffMsecs;
			const earliestCertificateTime = adjustedNow - maxAgeInMsec;
			const latestCertificateTime = adjustedNow + DEFAULT_CERTIFICATE_MAX_MINUTES_IN_FUTURE * MINUTES_TO_MSEC;
			const certTime = decodeTime(lookupTime);
			const isCertificateTimePast = certTime.getTime() < earliestCertificateTime;
			const isCertificateTimeFuture = certTime.getTime() > latestCertificateTime;
			if ((isCertificateTimePast || isCertificateTimeFuture) && this.#agent && !this.#agent.hasSyncedTime()) {
				await this._syncTime();
				return await this.verify();
			}
			if (isCertificateTimePast) throw TrustError.fromCode(new CertificateTimeErrorCode(this._maxAgeInMinutes, certTime, now, timeDiffMsecs, "past"));
			else if (isCertificateTimeFuture) {
				if (this.#agent?.hasSyncedTime()) throw UnknownError.fromCode(new UnexpectedErrorCode("System time has been synced with the IC network, but certificate is still too far in the future."));
				throw TrustError.fromCode(new CertificateTimeErrorCode(5, certTime, now, timeDiffMsecs, "future"));
			}
		}
		try {
			if (!await this._blsVerify(key, sig, msg)) throw TrustError.fromCode(new CertificateVerificationErrorCode("Invalid signature"));
		} catch (err) {
			throw TrustError.fromCode(new CertificateVerificationErrorCode("Signature verification failed", err));
		}
	}
	async _checkDelegationAndGetKey(d) {
		if (!d) return this._rootKey;
		const cert = Certificate.createUnverified({
			certificate: d.certificate,
			rootKey: this._rootKey,
			principal: this._principal,
			blsVerify: this._blsVerify,
			disableTimeVerification: this.#disableTimeVerification,
			maxAgeInMinutes: DEFAULT_CERTIFICATE_DELEGATION_MAX_AGE_IN_MINUTES,
			agent: this.#agent
		});
		if (cert.cert.delegation) throw ProtocolError.fromCode(new CertificateHasTooManyDelegationsErrorCode());
		await cert.verify();
		let subnetId;
		if (isCanisterPrincipal(this._principal)) {
			const canisterId = this._principal.canisterId;
			subnetId = Principal$1.fromUint8Array(d.subnet_id);
			if (!check_canister_ranges({
				canisterId,
				subnetId,
				tree: cert.cert.tree
			})) throw TrustError.fromCode(new CertificateNotAuthorizedErrorCode(canisterId, subnetId));
		} else if (isSubnetPrincipal(this._principal)) subnetId = this._principal.subnetId;
		else throw UNREACHABLE_ERROR;
		const publicKeyLookup = lookupResultToBuffer(cert.lookup_path([
			"subnet",
			subnetId.toUint8Array(),
			"public_key"
		]));
		if (!publicKeyLookup) {
			if (isSubnetPrincipal(this._principal)) throw TrustError.fromCode(new CertificateNotAuthorizedForSubnetErrorCode(subnetId));
			else throw TrustError.fromCode(new MissingLookupValueErrorCode(`Could not find subnet key for subnet ID ${subnetId.toText()}`));
		}
		return publicKeyLookup;
	}
	async _syncTime() {
		if (!this.#agent) return;
		if (isCanisterPrincipal(this._principal)) await this.#agent.syncTime(this._principal.canisterId);
		else await this.#agent.syncTimeWithSubnet(this._principal.subnetId);
	}
};
function isSubnetPrincipal(principal) {
	return "subnetId" in principal;
}
function isCanisterPrincipal(principal) {
	return "canisterId" in principal;
}
var DER_PREFIX = hexToBytes("308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100");
var KEY_LENGTH = 96;
function extractDER(buf) {
	const expectedLength = DER_PREFIX.byteLength + KEY_LENGTH;
	if (buf.byteLength !== expectedLength) throw ProtocolError.fromCode(new DerKeyLengthMismatchErrorCode(expectedLength, buf.byteLength));
	const prefix = buf.slice(0, DER_PREFIX.byteLength);
	if (!uint8Equals(prefix, DER_PREFIX)) throw ProtocolError.fromCode(new DerPrefixMismatchErrorCode(DER_PREFIX, prefix));
	return buf.slice(DER_PREFIX.byteLength);
}
/**
* Utility function to constrain the type of a lookup result
* @param result the result of a lookup
* @returns {Uint8Array | undefined} the value if the lookup was found, `undefined` otherwise
*/
function lookupResultToBuffer(result) {
	if (result.status !== LookupPathStatus.Found) return;
	if (result.value instanceof Uint8Array) return result.value;
}
/**
* @param t The hash tree to reconstruct
*/
async function reconstruct(t) {
	switch (t[0]) {
		case NodeType.Empty: return sha256(domain_sep("ic-hashtree-empty"));
		case NodeType.Pruned: return t[1];
		case NodeType.Leaf: return sha256(concatBytes(domain_sep("ic-hashtree-leaf"), t[1]));
		case NodeType.Labeled: return sha256(concatBytes(domain_sep("ic-hashtree-labeled"), t[1], await reconstruct(t[2])));
		case NodeType.Fork: return sha256(concatBytes(domain_sep("ic-hashtree-fork"), await reconstruct(t[1]), await reconstruct(t[2])));
		default: throw UNREACHABLE_ERROR;
	}
}
/**
* Creates a domain separator for hashing by encoding the input string
* with its length as a prefix.
* @param s - The input string to encode.
* @returns A Uint8Array containing the encoded domain separator.
*/
function domain_sep(s) {
	return concatBytes(new Uint8Array([s.length]), new TextEncoder().encode(s));
}
function pathToLabel(path) {
	return typeof path[0] === "string" ? utf8ToBytes(path[0]) : path[0];
}
var LookupPathStatus;
(function(LookupPathStatus) {
	LookupPathStatus["Unknown"] = "Unknown";
	LookupPathStatus["Absent"] = "Absent";
	LookupPathStatus["Found"] = "Found";
	LookupPathStatus["Error"] = "Error";
})(LookupPathStatus || (LookupPathStatus = {}));
var LookupSubtreeStatus;
(function(LookupSubtreeStatus) {
	LookupSubtreeStatus["Absent"] = "Absent";
	LookupSubtreeStatus["Unknown"] = "Unknown";
	LookupSubtreeStatus["Found"] = "Found";
})(LookupSubtreeStatus || (LookupSubtreeStatus = {}));
var LookupLabelStatus;
(function(LookupLabelStatus) {
	LookupLabelStatus["Absent"] = "Absent";
	LookupLabelStatus["Unknown"] = "Unknown";
	LookupLabelStatus["Found"] = "Found";
	LookupLabelStatus["Less"] = "Less";
	LookupLabelStatus["Greater"] = "Greater";
})(LookupLabelStatus || (LookupLabelStatus = {}));
/**
* Lookup a path in a tree. If the path is a subtree, use {@link lookup_subtree} instead.
* @param path the path to look up
* @param tree the tree to search
* @returns {LookupResult} the result of the lookup
*/
function lookup_path(path, tree) {
	if (path.length === 0) switch (tree[0]) {
		case NodeType.Empty: return { status: LookupPathStatus.Absent };
		case NodeType.Leaf:
			if (!tree[1]) throw UnknownError.fromCode(new HashTreeDecodeErrorCode("Invalid tree structure for leaf"));
			if (tree[1] instanceof Uint8Array) return {
				status: LookupPathStatus.Found,
				value: tree[1].slice(tree[1].byteOffset, tree[1].byteLength + tree[1].byteOffset)
			};
			throw UNREACHABLE_ERROR;
		case NodeType.Pruned: return { status: LookupPathStatus.Unknown };
		case NodeType.Labeled:
		case NodeType.Fork: return { status: LookupPathStatus.Error };
		default: throw UNREACHABLE_ERROR;
	}
	const lookupResult = find_label(pathToLabel(path), tree);
	switch (lookupResult.status) {
		case LookupLabelStatus.Found: return lookup_path(path.slice(1), lookupResult.value);
		case LookupLabelStatus.Absent:
		case LookupLabelStatus.Greater:
		case LookupLabelStatus.Less: return { status: LookupPathStatus.Absent };
		case LookupLabelStatus.Unknown: return { status: LookupPathStatus.Unknown };
		default: throw UNREACHABLE_ERROR;
	}
}
/**
* Lookup a subtree in a tree.
* @param path the path to look up
* @param tree the tree to search
* @returns {SubtreeLookupResult} the result of the lookup
*/
function lookup_subtree(path, tree) {
	if (path.length === 0) return {
		status: LookupSubtreeStatus.Found,
		value: tree
	};
	const lookupResult = find_label(pathToLabel(path), tree);
	switch (lookupResult.status) {
		case LookupLabelStatus.Found: return lookup_subtree(path.slice(1), lookupResult.value);
		case LookupLabelStatus.Unknown: return { status: LookupSubtreeStatus.Unknown };
		case LookupLabelStatus.Absent:
		case LookupLabelStatus.Greater:
		case LookupLabelStatus.Less: return { status: LookupSubtreeStatus.Absent };
		default: throw UNREACHABLE_ERROR;
	}
}
/**
* If the tree is a fork, flatten it into an array of trees
* @param {HashTree} t the tree to flatten
* @returns {HashTree[]} the flattened tree
*/
function flatten_forks(t) {
	switch (t[0]) {
		case NodeType.Empty: return [];
		case NodeType.Fork: return flatten_forks(t[1]).concat(flatten_forks(t[2]));
		default: return [t];
	}
}
/**
* Find a label in a tree
* @param label the label to find
* @param tree the tree to search
* @returns {LabelLookupResult} the result of the label lookup
*/
function find_label(label, tree) {
	switch (tree[0]) {
		case NodeType.Labeled:
			if (isBufferGreaterThan(label, tree[1])) return { status: LookupLabelStatus.Greater };
			if (uint8Equals(label, tree[1])) return {
				status: LookupLabelStatus.Found,
				value: tree[2]
			};
			return { status: LookupLabelStatus.Less };
		case NodeType.Fork: {
			const leftLookupResult = find_label(label, tree[1]);
			switch (leftLookupResult.status) {
				case LookupLabelStatus.Greater: {
					const rightLookupResult = find_label(label, tree[2]);
					if (rightLookupResult.status === LookupLabelStatus.Less) return { status: LookupLabelStatus.Absent };
					return rightLookupResult;
				}
				case LookupLabelStatus.Unknown: {
					const rightLookupResult = find_label(label, tree[2]);
					if (rightLookupResult.status === LookupLabelStatus.Less) return { status: LookupLabelStatus.Unknown };
					return rightLookupResult;
				}
				default: return leftLookupResult;
			}
		}
		case NodeType.Pruned: return { status: LookupLabelStatus.Unknown };
		default: return { status: LookupLabelStatus.Absent };
	}
}
/**
* Ported from https://github.com/dfinity/response-verification/blob/a4b8b46bcf93f44ac30b5698e60bfd245e33ad4e/packages/ic-certification/src/hash_tree/mod.rs#L527-L541.
* @param path the path to prepend to the paths of the tree
* @param tree the tree to list the paths of
* @returns the paths of the tree
*/
function list_paths(path, tree) {
	switch (tree[0]) {
		case NodeType.Empty | NodeType.Pruned: return [];
		case NodeType.Leaf: return [path];
		case NodeType.Fork: return list_paths(path, tree[1]).concat(list_paths(path, tree[2]));
		case NodeType.Labeled: {
			const label = tree[1];
			const subtree = tree[2];
			return list_paths([...path, label], subtree);
		}
		default: throw UNREACHABLE_ERROR;
	}
}
/**
* Check if a canister ID falls within the canister ranges of a given subnet
* @param params the parameters with which to check the canister ranges
* @param params.canisterId the canister ID to check
* @param params.subnetId the subnet ID from which to check the canister ranges
* @param params.tree the hash tree in which to lookup the subnet's canister ranges
* @returns {boolean} `true` if the canister is in the range, `false` otherwise
*/
function check_canister_ranges(params) {
	const ranges = decodeCanisterRanges(lookupCanisterRanges(params));
	const { canisterId } = params;
	return ranges.some((r) => r[0].ltEq(canisterId) && r[1].gtEq(canisterId));
}
/**
* Lookup the canister ranges using the `/canister_ranges/<subnet_id>/<ranges>` path.
* Certificates returned by `/api/v4/canister/<effective_canister_id>/call`
* and `/api/v3/canister/<effective_canister_id>/read_state` use this path.
*
* If the new lookup is not found, it tries the fallback lookup with {@link lookupCanisterRangesFallback}.
* @param params the parameters with which to lookup the canister ranges
* @param params.subnetId the subnet ID to lookup the canister ranges for
* @param params.tree the tree to search
* @param params.canisterId the canister ID to check
* @returns the encoded canister ranges. Use {@link decodeCanisterRanges} to decode them.
* @see https://internetcomputer.org/docs/references/ic-interface-spec#http-read-state
* @see https://internetcomputer.org/docs/references/ic-interface-spec#state-tree-canister-ranges
*/
function lookupCanisterRanges(params) {
	const { subnetId, tree, canisterId } = params;
	const canisterRangeShardsLookup = lookup_subtree(["canister_ranges", subnetId.toUint8Array()], tree);
	if (canisterRangeShardsLookup.status !== LookupSubtreeStatus.Found) return lookupCanisterRangesFallback(subnetId, tree);
	const canisterRangeShards = canisterRangeShardsLookup.value;
	const shardPaths = getCanisterRangeShardPaths(canisterRangeShards);
	if (shardPaths.length === 0) throw ProtocolError.fromCode(new CertificateNotAuthorizedErrorCode(canisterId, subnetId));
	shardPaths.sort(compare);
	const maxPotentialShard = shardPaths[getCanisterRangeShardPartitionPoint(shardPaths, canisterId)];
	return getCanisterRangeFromShards(maxPotentialShard, canisterRangeShards);
}
/**
* Lookup the canister ranges using the `/subnet/<subnet_id>/canister_ranges` path.
* Certificates returned by `/api/v3/canister/<effective_canister_id>/call`
* and `/api/v2/canister/<effective_canister_id>/read_state` use this path.
* @param subnetId the subnet ID to lookup the canister ranges for
* @param tree the tree to search
* @returns the encoded canister ranges. Use {@link decodeCanisterRanges} to decode them.
* @see https://internetcomputer.org/docs/references/ic-interface-spec#http-read-state
*/
function lookupCanisterRangesFallback(subnetId, tree) {
	const lookupResult = lookup_path([
		"subnet",
		subnetId.toUint8Array(),
		"canister_ranges"
	], tree);
	if (lookupResult.status !== LookupPathStatus.Found) throw ProtocolError.fromCode(new LookupErrorCode(`Could not find canister ranges for subnet ${subnetId.toText()}`, lookupResult.status));
	return lookupResult.value;
}
/**
* Decode canister ranges from CBOR-encoded buffer
* @param lookupValue the CBOR-encoded value read from the certificate
* @returns an array of canister range tuples [start, end]
*/
function decodeCanisterRanges(lookupValue) {
	return decode(lookupValue).map((v) => [Principal$1.fromUint8Array(v[0]), Principal$1.fromUint8Array(v[1])]);
}
function getCanisterRangeShardPaths(canisterRangeShards) {
	const shardPaths = [];
	for (const path of list_paths([], canisterRangeShards)) {
		const firstLabel = path[0];
		if (!firstLabel) throw ProtocolError.fromCode(new CertificateVerificationErrorCode("Path is invalid"));
		shardPaths.push(firstLabel);
	}
	return shardPaths;
}
/**
* Finds the partition point that divides shard paths into two groups based on canister ID comparison.
* Uses binary search to partition the array where:
* - Elements at indices [0, partitionPoint) have values >= canisterId
* - Elements at indices [partitionPoint, length) have values < canisterId
* @param shardPaths Sorted array of shard paths to search through
* @param canisterId The canister ID to compare against
* @returns The index of the first shard that is less than the canister ID, or last index if all shards are >= canisterId
*/
function getCanisterRangeShardPartitionPoint(shardPaths, canisterId) {
	const canisterIdBytes = canisterId.toUint8Array();
	let left = 0;
	let right = shardPaths.length - 1;
	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		if (compare(shardPaths[mid], canisterIdBytes) <= 0) right = mid;
		else left = mid + 1;
	}
	return left;
}
function getCanisterRangeFromShards(maxShardPath, canisterRangeShards) {
	const canisterRange = lookup_path([maxShardPath], canisterRangeShards);
	if (canisterRange.status !== LookupPathStatus.Found) throw ProtocolError.fromCode(new LookupErrorCode(`Could not find canister range for shard ${maxShardPath.toString()}`, canisterRange.status));
	return canisterRange.value;
}
/**
* Get the subnet ID from a certificate
* If the certificate has a delegation, it returns the subnet ID from the delegation.
* If the certificate has no delegation, it returns the root subnet ID.
* @param certificate the certificate to get the subnet ID from
* @param rootKey the root key to use to get the subnet ID
* @returns the subnet ID
*/
function getSubnetIdFromCertificate(certificate, rootKey) {
	if (certificate.delegation) return Principal$1.fromUint8Array(certificate.delegation.subnet_id);
	return Principal$1.selfAuthenticating(rootKey);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/utils/readState.js
/**
* The root subnet ID for IC mainnet
*/
var IC_ROOT_SUBNET_ID = Principal$1.fromText("tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe");
/**
* Decode a value based on the specified strategy
* @param data the raw data to decode
* @param strategy the decode strategy to use
* @returns the decoded value
*/
function decodeValue(data, strategy) {
	switch (strategy) {
		case "raw": return data;
		case "leb128": return decodeLeb128(data);
		case "cbor": return decode(data);
		case "hex": return bytesToHex(data);
		case "utf-8": return new TextDecoder().decode(data);
	}
}
/**
* Decode controllers from CBOR-encoded buffer
* @param buf the CBOR-encoded buffer to decode
* @returns an array of principal IDs
*/
function decodeControllers(buf) {
	return decode(buf).map((buf) => {
		return Principal$1.fromUint8Array(buf);
	});
}
/**
* Encode a metadata path for canister metadata queries
* @param metaPath the metadata path (string or Uint8Array)
* @param canisterUint8Array the canister ID as Uint8Array
* @returns the encoded path
*/
function encodeMetadataPath(metaPath, canisterUint8Array) {
	const encoded = typeof metaPath === "string" ? utf8ToBytes(metaPath) : metaPath;
	return [
		utf8ToBytes("canister"),
		canisterUint8Array,
		utf8ToBytes("metadata"),
		encoded
	];
}
/**
* Check if a path object has custom path signature (has 'key' and 'path' properties)
* @param path the path to check
* @returns true if the path has custom path signature, false otherwise
*/
function isCustomPath(path) {
	return typeof path === "object" && path !== null && "key" in path && "path" in path;
}
/**
* Lookup node keys from a certificate for a given subnet
* This can be used for both canister and subnet status queries
* @param certificate the certificate to fetch node keys from
* @param subnetId the subnet ID to fetch node keys for
* @returns a map of node IDs to public keys
*/
function lookupNodeKeysFromCertificate(certificate, subnetId) {
	const subnetLookupResult = lookup_subtree([
		"subnet",
		subnetId.toUint8Array(),
		"node"
	], certificate.tree);
	if (subnetLookupResult.status !== LookupSubtreeStatus.Found) throw ProtocolError.fromCode(new LookupErrorCode("Node not found", subnetLookupResult.status));
	if (subnetLookupResult.value instanceof Uint8Array) throw UnknownError.fromCode(new HashTreeDecodeErrorCode("Invalid node tree"));
	const nodeForks = flatten_forks(subnetLookupResult.value);
	const nodeKeys = /* @__PURE__ */ new Map();
	nodeForks.forEach((fork) => {
		const node_id = Principal$1.from(fork[1]).toText();
		const publicKeyLookupResult = lookup_path(["public_key"], fork[2]);
		if (publicKeyLookupResult.status !== LookupPathStatus.Found) throw ProtocolError.fromCode(new LookupErrorCode("Public key not found", publicKeyLookupResult.status));
		const derEncodedPublicKey = publicKeyLookupResult.value;
		if (derEncodedPublicKey.byteLength !== 44) throw ProtocolError.fromCode(new DerKeyLengthMismatchErrorCode(44, derEncodedPublicKey.byteLength));
		else nodeKeys.set(node_id, derEncodedPublicKey);
	});
	return nodeKeys;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/canisterStatus/index.js
/**
* Requests information from a canister's `read_state` endpoint.
* Can be used to request information about the canister's controllers, time, module hash, candid interface, and more.
*
* > [!WARNING]
* > Requesting the `subnet` path from the canister status might be deprecated in the future.
* > Use {@link https://js.icp.build/core/latest/libs/agent/api/namespaces/subnetstatus/functions/request | SubnetStatus.request} to fetch subnet information instead.
* @param {CanisterStatusOptions} options The configuration for the canister status request.
* @see {@link CanisterStatusOptions} for detailed options.
* @returns {Promise<StatusMap>} A map populated with data from the requested paths. Each path is a key in the map, and the value is the data obtained from the certificate for that path.
* @example
* const status = await canisterStatus({
*   paths: ['controllers', 'candid'],
*   ...options
* });
*
* const controllers = status.get('controllers');
*/
var request$1 = async (options) => {
	const { agent, paths, disableCertificateTimeVerification = false } = options;
	const canisterId = Principal$1.from(options.canisterId);
	const uniquePaths = [...new Set(paths)];
	const status = /* @__PURE__ */ new Map();
	const promises = uniquePaths.map((path, index) => {
		const encodedPath = encodePath$1(path, canisterId);
		return (async () => {
			try {
				if (agent.rootKey === null) throw ExternalError.fromCode(new MissingRootKeyErrorCode());
				const rootKey = agent.rootKey;
				const response = await agent.readState(canisterId, { paths: [encodedPath] });
				const certificate = await Certificate.create({
					certificate: response.certificate,
					rootKey,
					principal: { canisterId },
					disableTimeVerification: disableCertificateTimeVerification,
					agent
				});
				const lookup = (cert, path) => {
					if (path === "subnet") return {
						path,
						data: fetchNodeKeys(response.certificate, canisterId, rootKey)
					};
					return {
						path,
						data: lookupResultToBuffer(cert.lookup_path(encodedPath))
					};
				};
				const { path, data } = lookup(certificate, uniquePaths[index]);
				if (!data) {
					if (typeof path === "string") status.set(path, null);
					else status.set(path.key, null);
				} else switch (path) {
					case "time":
						status.set(path, decodeTime(data));
						break;
					case "controllers":
						status.set(path, decodeControllers(data));
						break;
					case "module_hash":
						status.set(path, bytesToHex(data));
						break;
					case "subnet":
						status.set(path, data);
						break;
					case "candid":
						status.set(path, new TextDecoder().decode(data));
						break;
					default: if (isCustomPath(path)) status.set(path.key, decodeValue(data, path.decodeStrategy));
				}
			} catch (error) {
				if (error instanceof AgentError && (error.hasCode(CertificateVerificationErrorCode) || error.hasCode(CertificateTimeErrorCode))) throw error;
				if (isCustomPath(path)) status.set(path.key, null);
				else status.set(path, null);
			}
		})();
	});
	await Promise.all(promises);
	return status;
};
/**
* Lookup node keys from a certificate for a given canister.
* The certificate is assumed to be already verified, including whether the canister is in range of the subnet.
* @param certificate the certificate to lookup node keys from
* @param canisterId the canister ID to lookup node keys for
* @param root_key the root key to use to lookup node keys
* @returns a map of node IDs to public keys
*/
var fetchNodeKeys = (certificate, canisterId, root_key) => {
	if (!canisterId._isPrincipal) throw InputError.fromCode(new UnexpectedErrorCode("Invalid canisterId"));
	const cert = decode(certificate);
	const { delegation } = cert;
	let subnetId;
	if (delegation && delegation.subnet_id) subnetId = Principal$1.fromUint8Array(new Uint8Array(delegation.subnet_id));
	else if (!delegation && typeof root_key !== "undefined") subnetId = Principal$1.selfAuthenticating(new Uint8Array(root_key));
	else subnetId = IC_ROOT_SUBNET_ID;
	const nodeKeys = lookupNodeKeysFromCertificate(cert, subnetId);
	return {
		subnetId: subnetId.toText(),
		nodeKeys
	};
};
var encodePath$1 = (path, canisterId) => {
	const canisterUint8Array = canisterId.toUint8Array();
	switch (path) {
		case "time": return [utf8ToBytes("time")];
		case "controllers": return [
			utf8ToBytes("canister"),
			canisterUint8Array,
			utf8ToBytes("controllers")
		];
		case "module_hash": return [
			utf8ToBytes("canister"),
			canisterUint8Array,
			utf8ToBytes("module_hash")
		];
		case "subnet": return [utf8ToBytes("subnet")];
		case "candid": return [
			utf8ToBytes("canister"),
			canisterUint8Array,
			utf8ToBytes("metadata"),
			utf8ToBytes("candid:service")
		];
		default: if (isCustomPath(path)) {
			if (typeof path["path"] === "string" || path["path"] instanceof Uint8Array) return encodeMetadataPath(path.path, canisterUint8Array);
			return path["path"];
		}
	}
	throw UnknownError.fromCode(new UnexpectedErrorCode(`Error while encoding your path for canister status. Please ensure that your path ${path} was formatted correctly.`));
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/subnetStatus/index.js
/**
* Requests information from a subnet's `read_state` endpoint.
* Can be used to request information about the subnet's time, canister ranges, public key, node keys, and metrics.
* @param {SubnetStatusOptions} options The configuration for the subnet status request.
* @see {@link SubnetStatusOptions} for detailed options.
* @returns {Promise<StatusMap>} A map populated with data from the requested paths. Each path is a key in the map, and the value is the data obtained from the certificate for that path.
* @example
* const status = await subnetStatus.request({
*   subnetId: IC_ROOT_SUBNET_ID,
*   paths: ['time', 'nodeKeys'],
*   agent,
* });
*
* const time = status.get('time');
* const nodeKeys = status.get('nodeKeys');
*/
async function request(options) {
	const { agent, paths, disableCertificateTimeVerification = false } = options;
	const subnetId = Principal$1.from(options.subnetId);
	const uniquePaths = [...new Set(paths)];
	const status = /* @__PURE__ */ new Map();
	const promises = uniquePaths.map((path, index) => {
		const encodedPath = encodePath(path, subnetId);
		return (async () => {
			try {
				if (agent.rootKey === null) throw ExternalError.fromCode(new MissingRootKeyErrorCode());
				const rootKey = agent.rootKey;
				const response = await agent.readSubnetState(subnetId, { paths: [encodedPath] });
				const certificate = await Certificate.create({
					certificate: response.certificate,
					rootKey,
					principal: { subnetId },
					disableTimeVerification: disableCertificateTimeVerification,
					agent
				});
				const lookup = (cert, lookupPath) => {
					if (lookupPath === "nodeKeys") return {
						path: lookupPath,
						data: lookupNodeKeysFromCertificate(cert.cert, subnetId)
					};
					return {
						path: lookupPath,
						data: lookupResultToBuffer(cert.lookup_path(encodedPath))
					};
				};
				const { path, data } = lookup(certificate, uniquePaths[index]);
				if (!data) {
					if (typeof path === "string") status.set(path, null);
					else status.set(path.key, null);
				} else switch (path) {
					case "time":
						status.set(path, decodeTime(data));
						break;
					case "canisterRanges":
						status.set(path, decodeCanisterRanges(data));
						break;
					case "publicKey":
						status.set(path, data);
						break;
					case "nodeKeys":
						status.set(path, data);
						break;
					default: if (isCustomPath(path)) status.set(path.key, decodeValue(data, path.decodeStrategy));
				}
			} catch (error) {
				if (error instanceof AgentError && (error.hasCode(CertificateVerificationErrorCode) || error.hasCode(CertificateTimeErrorCode))) throw error;
				if (isCustomPath(path)) status.set(path.key, null);
				else status.set(path, null);
			}
		})();
	});
	await Promise.all(promises);
	return status;
}
/**
* Encode a path for subnet state queries
* @param path the path to encode
* @param subnetId the subnet ID
* @returns the encoded path as an array of Uint8Arrays
*/
function encodePath(path, subnetId) {
	const subnetUint8Array = subnetId.toUint8Array();
	switch (path) {
		case "time": return [utf8ToBytes("time")];
		case "canisterRanges": return [utf8ToBytes("canister_ranges"), subnetUint8Array];
		case "publicKey": return [
			utf8ToBytes("subnet"),
			subnetUint8Array,
			utf8ToBytes("public_key")
		];
		case "nodeKeys": return [
			utf8ToBytes("subnet"),
			subnetUint8Array,
			utf8ToBytes("node")
		];
		default: if (isCustomPath(path)) {
			if (typeof path["path"] === "string" || path["path"] instanceof Uint8Array) {
				const encoded = typeof path["path"] === "string" ? utf8ToBytes(path["path"]) : path["path"];
				return [
					utf8ToBytes("subnet"),
					subnetUint8Array,
					encoded
				];
			}
			return path["path"];
		}
	}
	throw UnknownError.fromCode(new UnexpectedErrorCode(`Error while encoding your path for subnet status. Please ensure that your path ${path} was formatted correctly.`));
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/utils/certificateReject.js
/**
* Read certified reject details from a certificate at the given request status path.
* @param certificate The certificate to read reject details from.
* @param path The lookup path prefix (e.g. `['request_status', requestId]`).
* @param requestId The request ID associated with the rejection.
*/
function readCertifiedReject(certificate, path, requestId) {
	const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
	const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
	const errorCodeBuf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
	return new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+curves@1.9.7/node_modules/@noble/curves/esm/abstract/edwards.js
/**
* Twisted Edwards curve. The formula is: ax² + y² = 1 + dx²y².
* For design rationale of types / exports, see weierstrass module documentation.
* Untwisted Edwards curves exist, but they aren't used in real-world protocols.
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n$1 = BigInt(0);
var _1n$1 = BigInt(1);
var _2n$1 = BigInt(2);
var _8n$1 = BigInt(8);
function isEdValidXY(Fp, CURVE, x, y) {
	const x2 = Fp.sqr(x);
	const y2 = Fp.sqr(y);
	const left = Fp.add(Fp.mul(CURVE.a, x2), y2);
	const right = Fp.add(Fp.ONE, Fp.mul(CURVE.d, Fp.mul(x2, y2)));
	return Fp.eql(left, right);
}
function edwards(params, extraOpts = {}) {
	const validated = _createCurveFields("edwards", params, extraOpts, extraOpts.FpFnLE);
	const { Fp, Fn } = validated;
	let CURVE = validated.CURVE;
	const { h: cofactor } = CURVE;
	_validateObject(extraOpts, {}, { uvRatio: "function" });
	const MASK = _2n$1 << BigInt(Fn.BYTES * 8) - _1n$1;
	const modP = (n) => Fp.create(n);
	const uvRatio = extraOpts.uvRatio || ((u, v) => {
		try {
			return {
				isValid: true,
				value: Fp.sqrt(Fp.div(u, v))
			};
		} catch (e) {
			return {
				isValid: false,
				value: _0n$1
			};
		}
	});
	if (!isEdValidXY(Fp, CURVE, CURVE.Gx, CURVE.Gy)) throw new Error("bad curve params: generator point");
	/**
	* Asserts coordinate is valid: 0 <= n < MASK.
	* Coordinates >= Fp.ORDER are allowed for zip215.
	*/
	function acoord(title, n, banZero = false) {
		const min = banZero ? _1n$1 : _0n$1;
		aInRange("coordinate " + title, n, min, MASK);
		return n;
	}
	function aextpoint(other) {
		if (!(other instanceof Point)) throw new Error("ExtendedPoint expected");
	}
	const toAffineMemo = memoized((p, iz) => {
		const { X, Y, Z } = p;
		const is0 = p.is0();
		if (iz == null) iz = is0 ? _8n$1 : Fp.inv(Z);
		const x = modP(X * iz);
		const y = modP(Y * iz);
		const zz = Fp.mul(Z, iz);
		if (is0) return {
			x: _0n$1,
			y: _1n$1
		};
		if (zz !== _1n$1) throw new Error("invZ was invalid");
		return {
			x,
			y
		};
	});
	const assertValidMemo = memoized((p) => {
		const { a, d } = CURVE;
		if (p.is0()) throw new Error("bad point: ZERO");
		const { X, Y, Z, T } = p;
		const X2 = modP(X * X);
		const Y2 = modP(Y * Y);
		const Z2 = modP(Z * Z);
		const Z4 = modP(Z2 * Z2);
		const aX2 = modP(X2 * a);
		if (modP(Z2 * modP(aX2 + Y2)) !== modP(Z4 + modP(d * modP(X2 * Y2)))) throw new Error("bad point: equation left != right (1)");
		if (modP(X * Y) !== modP(Z * T)) throw new Error("bad point: equation left != right (2)");
		return true;
	});
	class Point {
		constructor(X, Y, Z, T) {
			this.X = acoord("x", X);
			this.Y = acoord("y", Y);
			this.Z = acoord("z", Z, true);
			this.T = acoord("t", T);
			Object.freeze(this);
		}
		static CURVE() {
			return CURVE;
		}
		static fromAffine(p) {
			if (p instanceof Point) throw new Error("extended point not allowed");
			const { x, y } = p || {};
			acoord("x", x);
			acoord("y", y);
			return new Point(x, y, _1n$1, modP(x * y));
		}
		static fromBytes(bytes, zip215 = false) {
			const len = Fp.BYTES;
			const { a, d } = CURVE;
			bytes = copyBytes(_abytes2(bytes, len, "point"));
			_abool2(zip215, "zip215");
			const normed = copyBytes(bytes);
			const lastByte = bytes[len - 1];
			normed[len - 1] = lastByte & -129;
			const y = bytesToNumberLE(normed);
			aInRange("point.y", y, _0n$1, zip215 ? MASK : Fp.ORDER);
			const y2 = modP(y * y);
			const u = modP(y2 - _1n$1);
			const v = modP(d * y2 - a);
			let { isValid, value: x } = uvRatio(u, v);
			if (!isValid) throw new Error("bad point: invalid y coordinate");
			const isXOdd = (x & _1n$1) === _1n$1;
			const isLastByteOdd = (lastByte & 128) !== 0;
			if (!zip215 && x === _0n$1 && isLastByteOdd) throw new Error("bad point: x=0 and x_0=1");
			if (isLastByteOdd !== isXOdd) x = modP(-x);
			return Point.fromAffine({
				x,
				y
			});
		}
		static fromHex(bytes, zip215 = false) {
			return Point.fromBytes(ensureBytes("point", bytes), zip215);
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		precompute(windowSize = 8, isLazy = true) {
			wnaf.createCache(this, windowSize);
			if (!isLazy) this.multiply(_2n$1);
			return this;
		}
		assertValidity() {
			assertValidMemo(this);
		}
		equals(other) {
			aextpoint(other);
			const { X: X1, Y: Y1, Z: Z1 } = this;
			const { X: X2, Y: Y2, Z: Z2 } = other;
			const X1Z2 = modP(X1 * Z2);
			const X2Z1 = modP(X2 * Z1);
			const Y1Z2 = modP(Y1 * Z2);
			const Y2Z1 = modP(Y2 * Z1);
			return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
		}
		is0() {
			return this.equals(Point.ZERO);
		}
		negate() {
			return new Point(modP(-this.X), this.Y, this.Z, modP(-this.T));
		}
		double() {
			const { a } = CURVE;
			const { X: X1, Y: Y1, Z: Z1 } = this;
			const A = modP(X1 * X1);
			const B = modP(Y1 * Y1);
			const C = modP(_2n$1 * modP(Z1 * Z1));
			const D = modP(a * A);
			const x1y1 = X1 + Y1;
			const E = modP(modP(x1y1 * x1y1) - A - B);
			const G = D + B;
			const F = G - C;
			const H = D - B;
			const X3 = modP(E * F);
			const Y3 = modP(G * H);
			const T3 = modP(E * H);
			const Z3 = modP(F * G);
			return new Point(X3, Y3, Z3, T3);
		}
		add(other) {
			aextpoint(other);
			const { a, d } = CURVE;
			const { X: X1, Y: Y1, Z: Z1, T: T1 } = this;
			const { X: X2, Y: Y2, Z: Z2, T: T2 } = other;
			const A = modP(X1 * X2);
			const B = modP(Y1 * Y2);
			const C = modP(T1 * d * T2);
			const D = modP(Z1 * Z2);
			const E = modP((X1 + Y1) * (X2 + Y2) - A - B);
			const F = D - C;
			const G = D + C;
			const H = modP(B - a * A);
			const X3 = modP(E * F);
			const Y3 = modP(G * H);
			const T3 = modP(E * H);
			const Z3 = modP(F * G);
			return new Point(X3, Y3, Z3, T3);
		}
		subtract(other) {
			return this.add(other.negate());
		}
		multiply(scalar) {
			if (!Fn.isValidNot0(scalar)) throw new Error("invalid scalar: expected 1 <= sc < curve.n");
			const { p, f } = wnaf.cached(this, scalar, (p) => normalizeZ(Point, p));
			return normalizeZ(Point, [p, f])[0];
		}
		multiplyUnsafe(scalar, acc = Point.ZERO) {
			if (!Fn.isValid(scalar)) throw new Error("invalid scalar: expected 0 <= sc < curve.n");
			if (scalar === _0n$1) return Point.ZERO;
			if (this.is0() || scalar === _1n$1) return this;
			return wnaf.unsafe(this, scalar, (p) => normalizeZ(Point, p), acc);
		}
		isSmallOrder() {
			return this.multiplyUnsafe(cofactor).is0();
		}
		isTorsionFree() {
			return wnaf.unsafe(this, CURVE.n).is0();
		}
		toAffine(invertedZ) {
			return toAffineMemo(this, invertedZ);
		}
		clearCofactor() {
			if (cofactor === _1n$1) return this;
			return this.multiplyUnsafe(cofactor);
		}
		toBytes() {
			const { x, y } = this.toAffine();
			const bytes = Fp.toBytes(y);
			bytes[bytes.length - 1] |= x & _1n$1 ? 128 : 0;
			return bytes;
		}
		toHex() {
			return bytesToHex(this.toBytes());
		}
		toString() {
			return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
		}
		get ex() {
			return this.X;
		}
		get ey() {
			return this.Y;
		}
		get ez() {
			return this.Z;
		}
		get et() {
			return this.T;
		}
		static normalizeZ(points) {
			return normalizeZ(Point, points);
		}
		static msm(points, scalars) {
			return pippenger(Point, Fn, points, scalars);
		}
		_setWindowSize(windowSize) {
			this.precompute(windowSize);
		}
		toRawBytes() {
			return this.toBytes();
		}
	}
	Point.BASE = new Point(CURVE.Gx, CURVE.Gy, _1n$1, modP(CURVE.Gx * CURVE.Gy));
	Point.ZERO = new Point(_0n$1, _1n$1, _1n$1, _0n$1);
	Point.Fp = Fp;
	Point.Fn = Fn;
	const wnaf = new wNAF(Point, Fn.BITS);
	Point.BASE.precompute(8);
	return Point;
}
/**
* Base class for prime-order points like Ristretto255 and Decaf448.
* These points eliminate cofactor issues by representing equivalence classes
* of Edwards curve points.
*/
var PrimeEdwardsPoint = class {
	constructor(ep) {
		this.ep = ep;
	}
	static fromBytes(_bytes) {
		notImplemented();
	}
	static fromHex(_hex) {
		notImplemented();
	}
	get x() {
		return this.toAffine().x;
	}
	get y() {
		return this.toAffine().y;
	}
	clearCofactor() {
		return this;
	}
	assertValidity() {
		this.ep.assertValidity();
	}
	toAffine(invertedZ) {
		return this.ep.toAffine(invertedZ);
	}
	toHex() {
		return bytesToHex(this.toBytes());
	}
	toString() {
		return this.toHex();
	}
	isTorsionFree() {
		return true;
	}
	isSmallOrder() {
		return false;
	}
	add(other) {
		this.assertSame(other);
		return this.init(this.ep.add(other.ep));
	}
	subtract(other) {
		this.assertSame(other);
		return this.init(this.ep.subtract(other.ep));
	}
	multiply(scalar) {
		return this.init(this.ep.multiply(scalar));
	}
	multiplyUnsafe(scalar) {
		return this.init(this.ep.multiplyUnsafe(scalar));
	}
	double() {
		return this.init(this.ep.double());
	}
	negate() {
		return this.init(this.ep.negate());
	}
	precompute(windowSize, isLazy) {
		return this.init(this.ep.precompute(windowSize, isLazy));
	}
	/** @deprecated use `toBytes` */
	toRawBytes() {
		return this.toBytes();
	}
};
/**
* Initializes EdDSA signatures over given Edwards curve.
*/
function eddsa(Point, cHash, eddsaOpts = {}) {
	if (typeof cHash !== "function") throw new Error("\"hash\" function param is required");
	_validateObject(eddsaOpts, {}, {
		adjustScalarBytes: "function",
		randomBytes: "function",
		domain: "function",
		prehash: "function",
		mapToCurve: "function"
	});
	const { prehash } = eddsaOpts;
	const { BASE, Fp, Fn } = Point;
	const randomBytes$1 = eddsaOpts.randomBytes || randomBytes;
	const adjustScalarBytes = eddsaOpts.adjustScalarBytes || ((bytes) => bytes);
	const domain = eddsaOpts.domain || ((data, ctx, phflag) => {
		_abool2(phflag, "phflag");
		if (ctx.length || phflag) throw new Error("Contexts/pre-hash are not supported");
		return data;
	});
	function modN_LE(hash) {
		return Fn.create(bytesToNumberLE(hash));
	}
	function getPrivateScalar(key) {
		const len = lengths.secretKey;
		key = ensureBytes("private key", key, len);
		const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
		const head = adjustScalarBytes(hashed.slice(0, len));
		return {
			head,
			prefix: hashed.slice(len, 2 * len),
			scalar: modN_LE(head)
		};
	}
	/** Convenience method that creates public key from scalar. RFC8032 5.1.5 */
	function getExtendedPublicKey(secretKey) {
		const { head, prefix, scalar } = getPrivateScalar(secretKey);
		const point = BASE.multiply(scalar);
		return {
			head,
			prefix,
			scalar,
			point,
			pointBytes: point.toBytes()
		};
	}
	/** Calculates EdDSA pub key. RFC8032 5.1.5. */
	function getPublicKey(secretKey) {
		return getExtendedPublicKey(secretKey).pointBytes;
	}
	function hashDomainToScalar(context = Uint8Array.of(), ...msgs) {
		const msg = concatBytes(...msgs);
		return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
	}
	/** Signs message with privateKey. RFC8032 5.1.6 */
	function sign(msg, secretKey, options = {}) {
		msg = ensureBytes("message", msg);
		if (prehash) msg = prehash(msg);
		const { prefix, scalar, pointBytes } = getExtendedPublicKey(secretKey);
		const r = hashDomainToScalar(options.context, prefix, msg);
		const R = BASE.multiply(r).toBytes();
		const k = hashDomainToScalar(options.context, R, pointBytes, msg);
		const s = Fn.create(r + k * scalar);
		if (!Fn.isValid(s)) throw new Error("sign failed: invalid s");
		return _abytes2(concatBytes(R, Fn.toBytes(s)), lengths.signature, "result");
	}
	const verifyOpts = { zip215: true };
	/**
	* Verifies EdDSA signature against message and public key. RFC8032 5.1.7.
	* An extended group equation is checked.
	*/
	function verify(sig, msg, publicKey, options = verifyOpts) {
		const { context, zip215 } = options;
		const len = lengths.signature;
		sig = ensureBytes("signature", sig, len);
		msg = ensureBytes("message", msg);
		publicKey = ensureBytes("publicKey", publicKey, lengths.publicKey);
		if (zip215 !== void 0) _abool2(zip215, "zip215");
		if (prehash) msg = prehash(msg);
		const mid = len / 2;
		const r = sig.subarray(0, mid);
		const s = bytesToNumberLE(sig.subarray(mid, len));
		let A, R, SB;
		try {
			A = Point.fromBytes(publicKey, zip215);
			R = Point.fromBytes(r, zip215);
			SB = BASE.multiplyUnsafe(s);
		} catch (error) {
			return false;
		}
		if (!zip215 && A.isSmallOrder()) return false;
		const k = hashDomainToScalar(context, R.toBytes(), A.toBytes(), msg);
		return R.add(A.multiplyUnsafe(k)).subtract(SB).clearCofactor().is0();
	}
	const _size = Fp.BYTES;
	const lengths = {
		secretKey: _size,
		publicKey: _size,
		signature: 2 * _size,
		seed: _size
	};
	function randomSecretKey(seed = randomBytes$1(lengths.seed)) {
		return _abytes2(seed, lengths.seed, "seed");
	}
	function keygen(seed) {
		const secretKey = utils.randomSecretKey(seed);
		return {
			secretKey,
			publicKey: getPublicKey(secretKey)
		};
	}
	function isValidSecretKey(key) {
		return isBytes(key) && key.length === Fn.BYTES;
	}
	function isValidPublicKey(key, zip215) {
		try {
			return !!Point.fromBytes(key, zip215);
		} catch (error) {
			return false;
		}
	}
	const utils = {
		getExtendedPublicKey,
		randomSecretKey,
		isValidSecretKey,
		isValidPublicKey,
		/**
		* Converts ed public key to x public key. Uses formula:
		* - ed25519:
		*   - `(u, v) = ((1+y)/(1-y), sqrt(-486664)*u/x)`
		*   - `(x, y) = (sqrt(-486664)*u/v, (u-1)/(u+1))`
		* - ed448:
		*   - `(u, v) = ((y-1)/(y+1), sqrt(156324)*u/x)`
		*   - `(x, y) = (sqrt(156324)*u/v, (1+u)/(1-u))`
		*/
		toMontgomery(publicKey) {
			const { y } = Point.fromBytes(publicKey);
			const size = lengths.publicKey;
			const is25519 = size === 32;
			if (!is25519 && size !== 57) throw new Error("only defined for 25519 and 448");
			const u = is25519 ? Fp.div(_1n$1 + y, _1n$1 - y) : Fp.div(y - _1n$1, y + _1n$1);
			return Fp.toBytes(u);
		},
		toMontgomerySecret(secretKey) {
			const size = lengths.secretKey;
			_abytes2(secretKey, size);
			const hashed = cHash(secretKey.subarray(0, size));
			return adjustScalarBytes(hashed).subarray(0, size);
		},
		/** @deprecated */
		randomPrivateKey: randomSecretKey,
		/** @deprecated */
		precompute(windowSize = 8, point = Point.BASE) {
			return point.precompute(windowSize, false);
		}
	};
	return Object.freeze({
		keygen,
		getPublicKey,
		sign,
		verify,
		utils,
		Point,
		lengths
	});
}
function _eddsa_legacy_opts_to_new(c) {
	const CURVE = {
		a: c.a,
		d: c.d,
		p: c.Fp.ORDER,
		n: c.n,
		h: c.h,
		Gx: c.Gx,
		Gy: c.Gy
	};
	const curveOpts = {
		Fp: c.Fp,
		Fn: Field(CURVE.n, c.nBitLength, true),
		uvRatio: c.uvRatio
	};
	const eddsaOpts = {
		randomBytes: c.randomBytes,
		adjustScalarBytes: c.adjustScalarBytes,
		domain: c.domain,
		prehash: c.prehash,
		mapToCurve: c.mapToCurve
	};
	return {
		CURVE,
		curveOpts,
		hash: c.hash,
		eddsaOpts
	};
}
function _eddsa_new_output_to_legacy(c, eddsa) {
	const Point = eddsa.Point;
	return Object.assign({}, eddsa, {
		ExtendedPoint: Point,
		CURVE: c,
		nBitLength: Point.Fn.BITS,
		nByteLength: Point.Fn.BYTES
	});
}
function twistedEdwards(c) {
	const { CURVE, curveOpts, hash, eddsaOpts } = _eddsa_legacy_opts_to_new(c);
	return _eddsa_new_output_to_legacy(c, eddsa(edwards(CURVE, curveOpts), hash, eddsaOpts));
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@noble+curves@1.9.7/node_modules/@noble/curves/esm/ed25519.js
/**
* ed25519 Twisted Edwards curve with following addons:
* - X25519 ECDH
* - Ristretto cofactor elimination
* - Elligator hash-to-group / point indistinguishability
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n = /* @__PURE__ */ BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _5n = BigInt(5);
var _8n = BigInt(8);
var ed25519_CURVE_p = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed");
var ed25519_CURVE = /* @__PURE__ */ (() => ({
	p: ed25519_CURVE_p,
	n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
	h: _8n,
	a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
	d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
	Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
	Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
}))();
function ed25519_pow_2_252_3(x) {
	const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
	const P = ed25519_CURVE_p;
	const b2 = x * x % P * x % P;
	const b5 = pow2(pow2(b2, _2n, P) * b2 % P, _1n, P) * x % P;
	const b10 = pow2(b5, _5n, P) * b5 % P;
	const b20 = pow2(b10, _10n, P) * b10 % P;
	const b40 = pow2(b20, _20n, P) * b20 % P;
	const b80 = pow2(b40, _40n, P) * b40 % P;
	return {
		pow_p_5_8: pow2(pow2(pow2(pow2(b80, _80n, P) * b80 % P, _80n, P) * b80 % P, _10n, P) * b10 % P, _2n, P) * x % P,
		b2
	};
}
function adjustScalarBytes(bytes) {
	bytes[0] &= 248;
	bytes[31] &= 127;
	bytes[31] |= 64;
	return bytes;
}
var ED25519_SQRT_M1 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
function uvRatio(u, v) {
	const P = ed25519_CURVE_p;
	const v3 = mod(v * v * v, P);
	const pow = ed25519_pow_2_252_3(u * mod(v3 * v3 * v, P)).pow_p_5_8;
	let x = mod(u * v3 * pow, P);
	const vx2 = mod(v * x * x, P);
	const root1 = x;
	const root2 = mod(x * ED25519_SQRT_M1, P);
	const useRoot1 = vx2 === u;
	const useRoot2 = vx2 === mod(-u, P);
	const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P);
	if (useRoot1) x = root1;
	if (useRoot2 || noRoot) x = root2;
	if (isNegativeLE(x, P)) x = mod(-x, P);
	return {
		isValid: useRoot1 || useRoot2,
		value: x
	};
}
var Fp = /* @__PURE__ */ (() => Field(ed25519_CURVE.p, { isLE: true }))();
var Fn = /* @__PURE__ */ (() => Field(ed25519_CURVE.n, { isLE: true }))();
var ed25519Defaults = /* @__PURE__ */ (() => ({
	...ed25519_CURVE,
	Fp,
	hash: sha512,
	adjustScalarBytes,
	uvRatio
}))();
/**
* ed25519 curve with EdDSA signatures.
* @example
* import { ed25519 } from '@noble/curves/ed25519';
* const { secretKey, publicKey } = ed25519.keygen();
* const msg = new TextEncoder().encode('hello');
* const sig = ed25519.sign(msg, priv);
* ed25519.verify(sig, msg, pub); // Default mode: follows ZIP215
* ed25519.verify(sig, msg, pub, { zip215: false }); // RFC8032 / FIPS 186-5
*/
var ed25519 = /* @__PURE__ */ (() => twistedEdwards(ed25519Defaults))();
var SQRT_M1 = ED25519_SQRT_M1;
var SQRT_AD_MINUS_ONE = /* @__PURE__ */ BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
var INVSQRT_A_MINUS_D = /* @__PURE__ */ BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
var ONE_MINUS_D_SQ = /* @__PURE__ */ BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
var D_MINUS_ONE_SQ = /* @__PURE__ */ BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
var invertSqrt = (number) => uvRatio(_1n, number);
var MAX_255B = /* @__PURE__ */ BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var bytes255ToNumberLE = (bytes) => ed25519.Point.Fp.create(bytesToNumberLE(bytes) & MAX_255B);
/**
* Computes Elligator map for Ristretto255.
* Described in [RFC9380](https://www.rfc-editor.org/rfc/rfc9380#appendix-B) and on
* the [website](https://ristretto.group/formulas/elligator.html).
*/
function calcElligatorRistrettoMap(r0) {
	const { d } = ed25519_CURVE;
	const P = ed25519_CURVE_p;
	const mod = (n) => Fp.create(n);
	const r = mod(SQRT_M1 * r0 * r0);
	const Ns = mod((r + _1n) * ONE_MINUS_D_SQ);
	let c = BigInt(-1);
	const D = mod((c - d * r) * mod(r + d));
	let { isValid: Ns_D_is_sq, value: s } = uvRatio(Ns, D);
	let s_ = mod(s * r0);
	if (!isNegativeLE(s_, P)) s_ = mod(-s_);
	if (!Ns_D_is_sq) s = s_;
	if (!Ns_D_is_sq) c = r;
	const Nt = mod(c * (r - _1n) * D_MINUS_ONE_SQ - D);
	const s2 = s * s;
	const W0 = mod((s + s) * D);
	const W1 = mod(Nt * SQRT_AD_MINUS_ONE);
	const W2 = mod(_1n - s2);
	const W3 = mod(_1n + s2);
	return new ed25519.Point(mod(W0 * W3), mod(W2 * W1), mod(W1 * W3), mod(W0 * W2));
}
function ristretto255_map(bytes) {
	abytes(bytes, 64);
	const R1 = calcElligatorRistrettoMap(bytes255ToNumberLE(bytes.subarray(0, 32)));
	const R2 = calcElligatorRistrettoMap(bytes255ToNumberLE(bytes.subarray(32, 64)));
	return new _RistrettoPoint(R1.add(R2));
}
/**
* Wrapper over Edwards Point for ristretto255.
*
* Each ed25519/ExtendedPoint has 8 different equivalent points. This can be
* a source of bugs for protocols like ring signatures. Ristretto was created to solve this.
* Ristretto point operates in X:Y:Z:T extended coordinates like ExtendedPoint,
* but it should work in its own namespace: do not combine those two.
* See [RFC9496](https://www.rfc-editor.org/rfc/rfc9496).
*/
var _RistrettoPoint = class _RistrettoPoint extends PrimeEdwardsPoint {
	constructor(ep) {
		super(ep);
	}
	static fromAffine(ap) {
		return new _RistrettoPoint(ed25519.Point.fromAffine(ap));
	}
	assertSame(other) {
		if (!(other instanceof _RistrettoPoint)) throw new Error("RistrettoPoint expected");
	}
	init(ep) {
		return new _RistrettoPoint(ep);
	}
	/** @deprecated use `import { ristretto255_hasher } from '@noble/curves/ed25519.js';` */
	static hashToCurve(hex) {
		return ristretto255_map(ensureBytes("ristrettoHash", hex, 64));
	}
	static fromBytes(bytes) {
		abytes(bytes, 32);
		const { a, d } = ed25519_CURVE;
		const P = ed25519_CURVE_p;
		const mod = (n) => Fp.create(n);
		const s = bytes255ToNumberLE(bytes);
		if (!equalBytes(Fp.toBytes(s), bytes) || isNegativeLE(s, P)) throw new Error("invalid ristretto255 encoding 1");
		const s2 = mod(s * s);
		const u1 = mod(_1n + a * s2);
		const u2 = mod(_1n - a * s2);
		const u1_2 = mod(u1 * u1);
		const u2_2 = mod(u2 * u2);
		const v = mod(a * d * u1_2 - u2_2);
		const { isValid, value: I } = invertSqrt(mod(v * u2_2));
		const Dx = mod(I * u2);
		const Dy = mod(I * Dx * v);
		let x = mod((s + s) * Dx);
		if (isNegativeLE(x, P)) x = mod(-x);
		const y = mod(u1 * Dy);
		const t = mod(x * y);
		if (!isValid || isNegativeLE(t, P) || y === _0n) throw new Error("invalid ristretto255 encoding 2");
		return new _RistrettoPoint(new ed25519.Point(x, y, _1n, t));
	}
	/**
	* Converts ristretto-encoded string to ristretto point.
	* Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-decode).
	* @param hex Ristretto-encoded 32 bytes. Not every 32-byte string is valid ristretto encoding
	*/
	static fromHex(hex) {
		return _RistrettoPoint.fromBytes(ensureBytes("ristrettoHex", hex, 32));
	}
	static msm(points, scalars) {
		return pippenger(_RistrettoPoint, ed25519.Point.Fn, points, scalars);
	}
	/**
	* Encodes ristretto point to Uint8Array.
	* Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-encode).
	*/
	toBytes() {
		let { X, Y, Z, T } = this.ep;
		const P = ed25519_CURVE_p;
		const mod = (n) => Fp.create(n);
		const u1 = mod(mod(Z + Y) * mod(Z - Y));
		const u2 = mod(X * Y);
		const { value: invsqrt } = invertSqrt(mod(u1 * mod(u2 * u2)));
		const D1 = mod(invsqrt * u1);
		const D2 = mod(invsqrt * u2);
		const zInv = mod(D1 * D2 * T);
		let D;
		if (isNegativeLE(T * zInv, P)) {
			let _x = mod(Y * SQRT_M1);
			let _y = mod(X * SQRT_M1);
			X = _x;
			Y = _y;
			D = mod(D1 * INVSQRT_A_MINUS_D);
		} else D = D2;
		if (isNegativeLE(X * zInv, P)) Y = mod(-Y);
		let s = mod((Z - Y) * D);
		if (isNegativeLE(s, P)) s = mod(-s);
		return Fp.toBytes(s);
	}
	/**
	* Compares two Ristretto points.
	* Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-equals).
	*/
	equals(other) {
		this.assertSame(other);
		const { X: X1, Y: Y1 } = this.ep;
		const { X: X2, Y: Y2 } = other.ep;
		const mod = (n) => Fp.create(n);
		const one = mod(X1 * Y2) === mod(Y1 * X2);
		const two = mod(Y1 * Y2) === mod(X1 * X2);
		return one || two;
	}
	is0() {
		return this.equals(_RistrettoPoint.ZERO);
	}
};
_RistrettoPoint.BASE = /* @__PURE__ */ (() => new _RistrettoPoint(ed25519.Point.BASE))();
_RistrettoPoint.ZERO = /* @__PURE__ */ (() => new _RistrettoPoint(ed25519.Point.ZERO))();
_RistrettoPoint.Fp = /* @__PURE__ */ (() => Fp)();
_RistrettoPoint.Fn = /* @__PURE__ */ (() => Fn)();
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/utils/expirableStore.js
/**
* Validates that expirationTime is a positive finite number.
* @param expirationTime - Time in milliseconds after which entries expire.
* @throws {Error} if expirationTime is not valid.
*/
function validateExpirationTime(expirationTime) {
	if (!Number.isFinite(expirationTime) || expirationTime <= 0) throw new Error(`expirationTime must be a positive finite number, got ${expirationTime}`);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/utils/indexedDBExpirableStore.js
/**
* Key-value store backed by IndexedDB with time-based expiration.
* Enables sharing cached data across multiple instances and page reloads.
*/
var IndexedDBExpirableStore = class {
	#dbName;
	#storeName;
	#dbPromise = null;
	constructor(options) {
		if (typeof globalThis.indexedDB === "undefined") throw new Error("IndexedDBExpirableStore requires IndexedDB, which is not available in this environment");
		validateExpirationTime(options.expirationTime);
		this.#dbName = options.dbName;
		this.#storeName = options.storeName;
		this.expirationTime = options.expirationTime;
	}
	#getDb() {
		if (!this.#dbPromise) this.#dbPromise = this.#openDb().catch((error) => {
			this.#dbPromise = null;
			throw error;
		});
		return this.#dbPromise;
	}
	async #openDb() {
		const db = await this.#openRequest();
		if (db.objectStoreNames.contains(this.#storeName)) return db;
		const nextVersion = db.version + 1;
		db.close();
		return this.#openRequest(nextVersion);
	}
	#openRequest(version) {
		const storeName = this.#storeName;
		return new Promise((resolve, reject) => {
			const request = globalThis.indexedDB.open(this.#dbName, version);
			request.onupgradeneeded = () => {
				const db = request.result;
				if (!db.objectStoreNames.contains(storeName)) db.createObjectStore(storeName, { keyPath: "key" });
			};
			request.onsuccess = () => {
				const db = request.result;
				db.onversionchange = () => {
					db.close();
					this.#dbPromise = null;
				};
				resolve(db);
			};
			request.onerror = () => reject(request.error);
		});
	}
	async get(key) {
		const db = await this.#getDb();
		return new Promise((resolve, reject) => {
			const request = db.transaction(this.#storeName, "readonly").objectStore(this.#storeName).get(key);
			request.onsuccess = () => {
				const record = request.result;
				if (!record) {
					resolve(void 0);
					return;
				}
				if (Date.now() - record.timestamp > this.expirationTime) {
					this.delete(key).then(() => resolve(void 0), () => resolve(void 0));
					return;
				}
				resolve(record.value);
			};
			request.onerror = () => reject(request.error);
		});
	}
	async set(key, value) {
		await this.#prune();
		const db = await this.#getDb();
		return new Promise((resolve, reject) => {
			const tx = db.transaction(this.#storeName, "readwrite");
			const store = tx.objectStore(this.#storeName);
			const record = {
				key,
				value,
				timestamp: Date.now()
			};
			store.put(record);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	}
	async delete(key) {
		const db = await this.#getDb();
		return new Promise((resolve, reject) => {
			const tx = db.transaction(this.#storeName, "readwrite");
			tx.objectStore(this.#storeName).delete(key);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	}
	async #prune() {
		const db = await this.#getDb();
		const now = Date.now();
		return new Promise((resolve, reject) => {
			const tx = db.transaction(this.#storeName, "readwrite");
			const request = tx.objectStore(this.#storeName).openCursor();
			request.onsuccess = () => {
				const cursor = request.result;
				if (!cursor) return;
				const record = cursor.value;
				if (now - record.timestamp > this.expirationTime) cursor.delete();
				cursor.continue();
			};
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/utils/inMemoryExpirableStore.js
/**
* In-memory key-value store with timestamp-based expiration.
* Prunes all expired entries on every {@link set} call.
*/
var InMemoryExpirableStore = class {
	#entries;
	constructor(options) {
		validateExpirationTime(options.expirationTime);
		this.expirationTime = options.expirationTime;
		this.#entries = /* @__PURE__ */ new Map();
	}
	get(key) {
		const entry = this.#entries.get(key);
		if (!entry) return Promise.resolve(void 0);
		if (Date.now() - entry.timestamp > this.expirationTime) {
			this.#entries.delete(key);
			return Promise.resolve(void 0);
		}
		return Promise.resolve(entry.value);
	}
	set(key, value) {
		this.#prune();
		this.#entries.set(key, {
			value,
			timestamp: Date.now()
		});
		return Promise.resolve();
	}
	delete(key) {
		this.#entries.delete(key);
		return Promise.resolve();
	}
	#prune() {
		const now = Date.now();
		for (const [key, entry] of this.#entries) if (now - entry.timestamp > this.expirationTime) this.#entries.delete(key);
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/utils/createExpirableStore.js
/**
* Creates an {@link ExpirableStore} with automatic runtime detection.
* Uses {@link IndexedDBExpirableStore} in browser environments (when IndexedDB is available),
* falls back to {@link InMemoryExpirableStore} otherwise.
* @param options - Configuration for the store (dbName, storeName, and expirationTime).
*/
function createExpirableStore(options) {
	if (typeof globalThis.indexedDB !== "undefined") return new IndexedDBExpirableStore(options);
	return new InMemoryExpirableStore({ expirationTime: options.expirationTime });
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/der.js
var encodeLenBytes = (len) => {
	if (len <= 127) return 1;
	if (len <= 255) return 2;
	if (len <= 65535) return 3;
	if (len <= 16777215) return 4;
	throw InputError.fromCode(new DerEncodeErrorCode("Length too long (> 4 bytes)"));
};
var encodeLen = (buf, offset, len) => {
	if (len <= 127) {
		buf[offset] = len;
		return 1;
	}
	if (len <= 255) {
		buf[offset] = 129;
		buf[offset + 1] = len;
		return 2;
	}
	if (len <= 65535) {
		buf[offset] = 130;
		buf[offset + 1] = len >> 8;
		buf[offset + 2] = len;
		return 3;
	}
	if (len <= 16777215) {
		buf[offset] = 131;
		buf[offset + 1] = len >> 16;
		buf[offset + 2] = len >> 8;
		buf[offset + 3] = len;
		return 4;
	}
	throw InputError.fromCode(new DerEncodeErrorCode("Length too long (> 4 bytes)"));
};
var decodeLenBytes = (buf, offset) => {
	if (buf[offset] < 128) return 1;
	if (buf[offset] === 128) throw InputError.fromCode(new DerDecodeErrorCode("Invalid length 0"));
	if (buf[offset] === 129) return 2;
	if (buf[offset] === 130) return 3;
	if (buf[offset] === 131) return 4;
	throw InputError.fromCode(new DerDecodeErrorCode("Length too long (> 4 bytes)"));
};
var decodeLen = (buf, offset) => {
	const lenBytes = decodeLenBytes(buf, offset);
	if (lenBytes === 1) return buf[offset];
	if (lenBytes === 2) return buf[offset + 1];
	if (lenBytes === 3) return (buf[offset + 1] << 8) + buf[offset + 2];
	if (lenBytes === 4) return (buf[offset + 1] << 16) + (buf[offset + 2] << 8) + buf[offset + 3];
	throw InputError.fromCode(new DerDecodeErrorCode("Length too long (> 4 bytes)"));
};
Uint8Array.from([
	...[48, 12],
	...[6, 10],
	...[
		43,
		6,
		1,
		4,
		1,
		131,
		184,
		67,
		1,
		1
	]
]);
/**
* A DER encoded `SEQUENCE(OID)` for the Ed25519 algorithm
*/
var ED25519_OID = Uint8Array.from([
	...[48, 5],
	...[6, 3],
	...[
		43,
		101,
		112
	]
]);
Uint8Array.from([
	...[48, 16],
	...[6, 7],
	...[
		42,
		134,
		72,
		206,
		61,
		2,
		1
	],
	...[6, 5],
	...[
		43,
		129,
		4,
		0,
		10
	]
]);
Uint8Array.from([
	...[48, 29],
	...[6, 13],
	...[
		43,
		6,
		1,
		4,
		1,
		130,
		220,
		124,
		5,
		3,
		1,
		2,
		1
	],
	...[6, 12],
	...[
		43,
		6,
		1,
		4,
		1,
		130,
		220,
		124,
		5,
		3,
		2,
		1
	]
]);
/**
* Wraps the given `payload` in a DER encoding tagged with the given encoded `oid` like so:
* `SEQUENCE(oid, BITSTRING(payload))`
* @param payload The payload to encode as the bit string
* @param oid The DER encoded (and SEQUENCE wrapped!) OID to tag the payload with
*/
function wrapDER(payload, oid) {
	const bitStringHeaderLength = 2 + encodeLenBytes(payload.byteLength + 1);
	const len = oid.byteLength + bitStringHeaderLength + payload.byteLength;
	let offset = 0;
	const buf = new Uint8Array(1 + encodeLenBytes(len) + len);
	buf[offset++] = 48;
	offset += encodeLen(buf, offset, len);
	buf.set(oid, offset);
	offset += oid.byteLength;
	buf[offset++] = 3;
	offset += encodeLen(buf, offset, payload.byteLength + 1);
	buf[offset++] = 0;
	buf.set(new Uint8Array(payload), offset);
	return buf;
}
/**
* Extracts a payload from the given `derEncoded` data, and checks that it was tagged with the given `oid`.
*
* `derEncoded = SEQUENCE(oid, BITSTRING(payload))`
* @param derEncoded The DER encoded and tagged data
* @param oid The DER encoded (and SEQUENCE wrapped!) expected OID
* @returns The unwrapped payload
*/
var unwrapDER = (derEncoded, oid) => {
	let offset = 0;
	const expect = (n, msg) => {
		if (buf[offset++] !== n) throw InputError.fromCode(new DerDecodeErrorCode(`Expected ${msg} at offset ${offset}`));
	};
	const buf = new Uint8Array(derEncoded);
	expect(48, "sequence");
	offset += decodeLenBytes(buf, offset);
	if (!uint8Equals(buf.slice(offset, offset + oid.byteLength), oid)) throw InputError.fromCode(new DerDecodeErrorCode("Not the expected OID."));
	offset += oid.byteLength;
	expect(3, "bit string");
	const payloadLen = decodeLen(buf, offset) - 1;
	offset += decodeLenBytes(buf, offset);
	expect(0, "0 padding");
	const result = buf.slice(offset);
	if (payloadLen !== result.length) throw InputError.fromCode(new DerDecodeLengthMismatchErrorCode(payloadLen, result.length));
	return result;
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/public_key.js
var Ed25519PublicKey$1 = class Ed25519PublicKey$1 {
	static from(key) {
		return this.fromDer(key.toDer());
	}
	static fromRaw(rawKey) {
		return new Ed25519PublicKey$1(rawKey);
	}
	static fromDer(derKey) {
		return new Ed25519PublicKey$1(this.derDecode(derKey));
	}
	static {
		this.RAW_KEY_LENGTH = 32;
	}
	static derEncode(publicKey) {
		return wrapDER(publicKey, ED25519_OID);
	}
	static derDecode(key) {
		const unwrapped = unwrapDER(key, ED25519_OID);
		if (unwrapped.length !== this.RAW_KEY_LENGTH) throw InputError.fromCode(new DerDecodeErrorCode("An Ed25519 public key must be exactly 32 bytes long"));
		return unwrapped;
	}
	#rawKey;
	get rawKey() {
		return this.#rawKey;
	}
	#derKey;
	get derKey() {
		return this.#derKey;
	}
	constructor(key) {
		if (key.byteLength !== Ed25519PublicKey$1.RAW_KEY_LENGTH) throw InputError.fromCode(new DerDecodeErrorCode("An Ed25519 public key must be exactly 32 bytes long"));
		this.#rawKey = key;
		this.#derKey = Ed25519PublicKey$1.derEncode(key);
	}
	toDer() {
		return this.derKey;
	}
	toRaw() {
		return this.rawKey;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/observable.js
var Observable = class {
	constructor() {
		this.observers = [];
	}
	subscribe(func) {
		this.observers.push(func);
	}
	unsubscribe(func) {
		this.observers = this.observers.filter((observer) => observer !== func);
	}
	notify(data, ...rest) {
		this.observers.forEach((observer) => observer(data, ...rest));
	}
};
var ObservableLog = class extends Observable {
	constructor() {
		super();
	}
	print(message, ...rest) {
		this.notify({
			message,
			level: "info"
		}, ...rest);
	}
	warn(message, ...rest) {
		this.notify({
			message,
			level: "warn"
		}, ...rest);
	}
	error(message, error, ...rest) {
		this.notify({
			message,
			level: "error",
			error
		}, ...rest);
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/polling/backoff.js
var RANDOMIZATION_FACTOR = .5;
var MULTIPLIER = 1.5;
var INITIAL_INTERVAL_MSEC = 500;
var MAX_INTERVAL_MSEC = 6e4;
var MAX_ELAPSED_TIME_MSEC = 9e5;
var MAX_ITERATIONS = 10;
/**
* Exponential backoff strategy.
*/
var ExponentialBackoff = class ExponentialBackoff {
	#currentInterval;
	#randomizationFactor;
	#multiplier;
	#maxInterval;
	#startTime;
	#maxElapsedTime;
	#maxIterations;
	#date;
	#count = 0;
	static {
		this.default = {
			initialInterval: INITIAL_INTERVAL_MSEC,
			randomizationFactor: RANDOMIZATION_FACTOR,
			multiplier: MULTIPLIER,
			maxInterval: MAX_INTERVAL_MSEC,
			maxElapsedTime: MAX_ELAPSED_TIME_MSEC,
			maxIterations: MAX_ITERATIONS,
			date: Date
		};
	}
	constructor(options = ExponentialBackoff.default) {
		const { initialInterval = INITIAL_INTERVAL_MSEC, randomizationFactor = RANDOMIZATION_FACTOR, multiplier = MULTIPLIER, maxInterval = MAX_INTERVAL_MSEC, maxElapsedTime = MAX_ELAPSED_TIME_MSEC, maxIterations = MAX_ITERATIONS, date = Date } = options;
		this.#currentInterval = initialInterval;
		this.#randomizationFactor = randomizationFactor;
		this.#multiplier = multiplier;
		this.#maxInterval = maxInterval;
		this.#date = date;
		this.#startTime = date.now();
		this.#maxElapsedTime = maxElapsedTime;
		this.#maxIterations = maxIterations;
	}
	get ellapsedTimeInMsec() {
		return this.#date.now() - this.#startTime;
	}
	get currentInterval() {
		return this.#currentInterval;
	}
	get count() {
		return this.#count;
	}
	get randomValueFromInterval() {
		const delta = this.#randomizationFactor * this.#currentInterval;
		const min = this.#currentInterval - delta;
		const max = this.#currentInterval + delta;
		return Math.random() * (max - min) + min;
	}
	incrementCurrentInterval() {
		this.#currentInterval = Math.min(this.#currentInterval * this.#multiplier, this.#maxInterval);
		this.#count++;
		return this.#currentInterval;
	}
	next() {
		if (this.ellapsedTimeInMsec >= this.#maxElapsedTime || this.#count >= this.#maxIterations) return null;
		this.incrementCurrentInterval();
		return this.randomValueFromInterval;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/polling/strategy.js
var FIVE_MINUTES_IN_MSEC = 3e5;
/**
* A best practices polling strategy: wait 2 seconds before the first poll, then 1 second
* with an exponential backoff factor of 1.2. Timeout after 5 minutes.
*
* Note that calling this function will create the strategy chain described above and already start the 5 minutes timeout.
* You should only call this function when you want to start the polling, and not before, to avoid exhausting the 5 minutes timeout in advance.
*/
function defaultStrategy() {
	return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
/**
* Predicate that returns true once.
*/
function once() {
	let first = true;
	return async () => {
		if (first) {
			first = false;
			return true;
		}
		return false;
	};
}
/**
* Delay the polling once.
* @param condition A predicate that indicates when to delay.
* @param timeInMsec The amount of time to delay.
*/
function conditionalDelay(condition, timeInMsec) {
	return async (canisterId, requestId, status) => {
		if (await condition(canisterId, requestId, status)) return new Promise((resolve) => setTimeout(resolve, timeInMsec));
	};
}
/**
* Reject a call after a certain amount of time.
* @param timeInMsec Time in milliseconds before the polling should be rejected.
*/
function timeout(timeInMsec) {
	const end = Date.now() + timeInMsec;
	return async (_canisterId, requestId, status) => {
		if (Date.now() > end) throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
	};
}
/**
* A strategy that throttle, but using an exponential backoff strategy.
* @param startingThrottleInMsec The throttle in milliseconds to start with.
* @param backoffFactor The factor to multiple the throttle time between every poll. For
*   example if using 2, the throttle will double between every run.
*/
function backoff(startingThrottleInMsec, backoffFactor) {
	let currentThrottling = startingThrottleInMsec;
	return () => new Promise((resolve) => setTimeout(() => {
		currentThrottling *= backoffFactor;
		resolve();
	}, currentThrottling));
}
/**
* Chain multiple polling strategy. This _chains_ the strategies, so if you pass in,
* say, two throttling strategy of 1 second, it will result in a throttle of 2 seconds.
* @param strategies A strategy list to chain.
*/
function chain(...strategies) {
	return async (canisterId, requestId, status) => {
		for (const a of strategies) await a(canisterId, requestId, status);
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/polling/index.js
var DEFAULT_POLLING_OPTIONS = { preSignReadStateRequest: false };
/**
* Check if an object has a property
* @param value the object that might have the property
* @param property the key of property we're looking for
*/
function hasProperty(value, property) {
	return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
	return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
	return hasProperty(value, property) && typeof value[property] === "function";
}
/**
* Check if value is a signed read state request with expiry
* @param value to check
*/
function isSignedReadStateRequestWithExpiry(value) {
	return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
/**
* Polls the IC to check the status of the given request then
* returns the response bytes once the request has been processed.
* @param agent The agent to use to poll read_state.
* @param canisterId The effective canister ID.
* @param requestId The Request ID to poll status for.
* @param options polling options to control behavior
* @returns The certificate, reply bytes, and raw certificate bytes for the request.
* @throws {ExternalError} If the agent's root key is not available.
* @throws {RejectError} If the request was rejected by the canister.
* @throws {UnknownError} If the request reached `done` status without a reply.
*/
async function pollForResponse(agent, canisterId, requestId, options = {}) {
	const path = [utf8ToBytes("request_status"), requestId];
	let state;
	let currentRequest;
	if (options.preSignReadStateRequest ?? false) {
		currentRequest = await constructRequest({
			paths: [path],
			agent,
			pollingOptions: options
		});
		state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
	} else state = await agent.readState(canisterId, { paths: [path] });
	if (agent.rootKey == null) throw ExternalError.fromCode(new MissingRootKeyErrorCode());
	const cert = await Certificate.create({
		certificate: state.certificate,
		rootKey: agent.rootKey,
		principal: { canisterId },
		blsVerify: options.blsVerify,
		agent
	});
	const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
	let status;
	if (typeof maybeBuf === "undefined") status = RequestStatusResponseStatus.Unknown;
	else status = new TextDecoder().decode(maybeBuf);
	switch (status) {
		case RequestStatusResponseStatus.Replied: return {
			reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
			certificate: cert,
			rawCertificate: state.certificate
		};
		case RequestStatusResponseStatus.Received:
		case RequestStatusResponseStatus.Unknown:
		case RequestStatusResponseStatus.Processing: {
			const strategy = options.strategy ?? defaultStrategy();
			await strategy(canisterId, requestId, status);
			return pollForResponse(agent, canisterId, requestId, {
				...options,
				strategy,
				request: currentRequest
			});
		}
		case RequestStatusResponseStatus.Rejected: throw RejectError.fromCode(readCertifiedReject(cert, path, requestId));
		case RequestStatusResponseStatus.Done: throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
	}
	throw UNREACHABLE_ERROR;
}
/**
* Constructs a read state request for the given paths.
* If the request is already signed and has an expiry, it will be returned as is.
* Otherwise, a new request will be created.
* @param options The options to use for creating the request.
* @param options.paths The paths to read from.
* @param options.agent The agent to use to create the request.
* @param options.pollingOptions The options to use for creating the request.
* @returns The read state request.
*/
async function constructRequest(options) {
	const { paths, agent, pollingOptions } = options;
	if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) return pollingOptions.request;
	const request = await agent.createReadStateRequest?.({ paths }, void 0);
	if (!isSignedReadStateRequestWithExpiry(request)) throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
	return request;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/agent/http/index.js
var MINUTE_TO_MSECS = 6e4;
var MSECS_TO_NANOSECONDS = 1e6;
var DEFAULT_TIME_DIFF_MSECS = 0;
var IC_ROOT_KEY = "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100814c0e6ec71fab583b08bd81373c255c3c371b2e84863c98a4f1e08b74235d14fb5d9c0cd546d9685f913a0c0b2cc5341583bf4b4392e467db96d65b9bb4cb717112f8472e0d5a4d14505ffd7484b01291091c5f87b98883463f98091a0baaae";
var IC0_DOMAIN = "ic0.app";
var IC0_SUB_DOMAIN = ".ic0.app";
var ICP0_DOMAIN = "icp0.io";
var ICP0_SUB_DOMAIN = ".icp0.io";
var ICP_API_DOMAIN = "icp-api.io";
var ICP_API_SUB_DOMAIN = ".icp-api.io";
var HTTP_STATUS_OK = 200;
var HTTP_STATUS_ACCEPTED = 202;
var HTTP_STATUS_NOT_FOUND = 404;
function determineHost(configuredHost) {
	let host;
	if (configuredHost !== void 0) {
		if (!configuredHost.match(/^[a-z]+:/) && typeof window !== "undefined") host = new URL(`${window.location.protocol}//${configuredHost}`);
		else host = new URL(configuredHost);
	} else {
		const knownHosts = [
			"ic0.app",
			"icp0.io",
			"127.0.0.1",
			"localhost"
		];
		const remoteHosts = [".github.dev", ".gitpod.io"];
		const location = typeof window !== "undefined" ? window.location : void 0;
		const hostname = location?.hostname;
		let knownHost;
		if (hostname && typeof hostname === "string") {
			if (remoteHosts.some((host) => hostname.endsWith(host))) knownHost = hostname;
			else knownHost = knownHosts.find((host) => hostname.endsWith(host));
		}
		if (location && knownHost) host = new URL(`${location.protocol}//${knownHost}${location.port ? `:${location.port}` : ""}`);
		else host = new URL("https://icp-api.io");
	}
	return host.toString();
}
/**
* A HTTP agent allows users to interact with a client of the internet computer
using the available methods. It exposes an API that closely follows the
public view of the internet computer, and is not intended to be exposed
directly to the majority of users due to its low-level interface.
* There is a pipeline to apply transformations to the request before sending
it to the client. This is to decouple signature, nonce generation and
other computations so that this class can stay as simple as possible while
allowing extensions.
*/
var HttpAgent = class HttpAgent {
	#rootKeyPromise;
	#shouldFetchRootKey;
	#timeDiffMsecs;
	#hasSyncedTime;
	#syncTimePromise;
	#shouldSyncTime;
	#identity;
	#fetch;
	#fetchOptions;
	#callOptions;
	#credentials;
	#retryTimes;
	#backoffStrategy;
	#maxIngressExpiryInMinutes;
	#subnetNodeKeyExpirableStore;
	get #maxIngressExpiryInMs() {
		return this.#maxIngressExpiryInMinutes * MINUTE_TO_MSECS;
	}
	#queryPipeline;
	#updatePipeline;
	#subnetKeysFetching;
	#verifyQuerySignatures;
	/**
	* @param options - Options for the HttpAgent
	* @deprecated Use `HttpAgent.create` or `HttpAgent.createSync` instead
	*/
	constructor(options = {}) {
		this.#rootKeyPromise = null;
		this.#shouldFetchRootKey = false;
		this.#timeDiffMsecs = DEFAULT_TIME_DIFF_MSECS;
		this.#hasSyncedTime = false;
		this.#syncTimePromise = null;
		this.#shouldSyncTime = false;
		this._isAgent = true;
		this.config = {};
		this.log = new ObservableLog();
		this.#queryPipeline = [];
		this.#updatePipeline = [];
		this.#subnetKeysFetching = /* @__PURE__ */ new Map();
		this.#verifyQuerySignatures = true;
		/**
		* See https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-query for details on validation
		* @param queryResponse - The response from the query
		* @param subnetNodeKeys - The subnet node keys
		* @returns ApiQueryResponse
		*/
		this.#verifyQueryResponse = (queryResponse, subnetNodeKeys) => {
			if (this.#verifyQuerySignatures === false) return queryResponse;
			const { status, signatures = [], requestId } = queryResponse;
			const maxSignatures = subnetNodeKeys.size;
			if (signatures.length > maxSignatures) throw ProtocolError.fromCode(new ExcessiveSignaturesErrorCode(signatures.length, maxSignatures));
			for (const sig of signatures) {
				const { timestamp, identity } = sig;
				const nodeId = Principal$1.fromUint8Array(identity).toText();
				let hash;
				if (status === QueryResponseStatus.Replied) {
					const { reply } = queryResponse;
					hash = hashOfMap({
						status,
						reply,
						timestamp: BigInt(timestamp),
						request_id: requestId
					});
				} else if (status === QueryResponseStatus.Rejected) {
					const { reject_code, reject_message, error_code } = queryResponse;
					hash = hashOfMap({
						status,
						reject_code,
						reject_message,
						error_code,
						timestamp: BigInt(timestamp),
						request_id: requestId
					});
				} else throw UnknownError.fromCode(new UnexpectedErrorCode(`Unknown status: ${status}`));
				const separatorWithHash = concatBytes(IC_RESPONSE_DOMAIN_SEPARATOR, hash);
				const pubKey = subnetNodeKeys.get(nodeId);
				if (!pubKey) throw ProtocolError.fromCode(new MalformedPublicKeyErrorCode());
				const rawKey = Ed25519PublicKey$1.fromDer(pubKey).rawKey;
				if (!ed25519.verify(sig.signature, separatorWithHash, rawKey)) throw TrustError.fromCode(new QuerySignatureVerificationFailedErrorCode(nodeId));
			}
			return queryResponse;
		};
		this.config = options;
		if (options.fetch) this.#fetch = options.fetch;
		else {
			const globalFetch = globalThis.fetch;
			if (typeof globalFetch !== "function") throw InputError.fromCode(new MissingFetchErrorCode());
			this.#fetch = globalFetch.bind(globalThis);
		}
		this.#fetchOptions = options.fetchOptions;
		this.#callOptions = options.callOptions;
		this.#shouldFetchRootKey = options.shouldFetchRootKey ?? false;
		this.#shouldSyncTime = options.shouldSyncTime ?? false;
		if (options.rootKey) this.rootKey = options.rootKey;
		else if (this.#shouldFetchRootKey) this.rootKey = null;
		else this.rootKey = hexToBytes(IC_ROOT_KEY);
		const host = determineHost(options.host);
		this.host = new URL(host);
		if (this.host.hostname.endsWith(IC0_SUB_DOMAIN)) this.host.hostname = IC0_DOMAIN;
		else if (this.host.hostname.endsWith(ICP0_SUB_DOMAIN)) this.host.hostname = ICP0_DOMAIN;
		else if (this.host.hostname.endsWith(ICP_API_SUB_DOMAIN)) this.host.hostname = ICP_API_DOMAIN;
		if (options.verifyQuerySignatures !== void 0) this.#verifyQuerySignatures = options.verifyQuerySignatures;
		this.#subnetNodeKeyExpirableStore = options.subnetNodeKeyExpirableStore ?? createExpirableStore({
			dbName: `icp-sdk-${this.host.host}`,
			storeName: "subnetNodeKeys",
			expirationTime: 5 * MINUTE_TO_MSECS
		});
		this.#retryTimes = options.retryTimes ?? 3;
		const defaultBackoffFactory = () => new ExponentialBackoff({ maxIterations: this.#retryTimes });
		this.#backoffStrategy = options.backoffStrategy || defaultBackoffFactory;
		if (options.credentials) {
			const { name, password } = options.credentials;
			this.#credentials = `${name}${password ? `:${password}` : ""}`;
		}
		this.#identity = Promise.resolve(options.identity || new AnonymousIdentity());
		if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes > 5) throw InputError.fromCode(new IngressExpiryInvalidErrorCode("The maximum ingress expiry time is 5 minutes.", options.ingressExpiryInMinutes));
		if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes <= 0) throw InputError.fromCode(new IngressExpiryInvalidErrorCode("Ingress expiry time must be greater than 0.", options.ingressExpiryInMinutes));
		this.#maxIngressExpiryInMinutes = options.ingressExpiryInMinutes || 5;
		this.addTransform("update", makeNonceTransform(makeNonce));
		if (options.useQueryNonces) this.addTransform("query", makeNonceTransform(makeNonce));
		if (options.logToConsole) this.log.subscribe((log) => {
			if (log.level === "error") console.error(log.message);
			else if (log.level === "warn") console.warn(log.message);
			else console.log(log.message);
		});
	}
	static createSync(options = {}) {
		return new this({ ...options });
	}
	static async create(options = {}) {
		const agent = HttpAgent.createSync(options);
		await agent.#asyncGuard();
		return agent;
	}
	static async from(agent) {
		try {
			if ("config" in agent) return await HttpAgent.create(agent.config);
			return await HttpAgent.create({
				fetch: agent._fetch,
				fetchOptions: agent._fetchOptions,
				callOptions: agent._callOptions,
				host: agent._host.toString(),
				identity: agent._identity ?? void 0
			});
		} catch {
			throw InputError.fromCode(new CreateHttpAgentErrorCode());
		}
	}
	isLocal() {
		const hostname = this.host.hostname;
		return hostname === "127.0.0.1" || hostname.endsWith("127.0.0.1");
	}
	addTransform(type, fn, priority = fn.priority || 0) {
		if (type === "update") {
			const i = this.#updatePipeline.findIndex((x) => (x.priority || 0) < priority);
			this.#updatePipeline.splice(i >= 0 ? i : this.#updatePipeline.length, 0, Object.assign(fn, { priority }));
		} else if (type === "query") {
			const i = this.#queryPipeline.findIndex((x) => (x.priority || 0) < priority);
			this.#queryPipeline.splice(i >= 0 ? i : this.#queryPipeline.length, 0, Object.assign(fn, { priority }));
		}
	}
	async getPrincipal() {
		if (!this.#identity) throw ExternalError.fromCode(new IdentityInvalidErrorCode());
		return (await this.#identity).getPrincipal();
	}
	/**
	* Makes a call to a canister method.
	* @param canisterId - The ID of the canister to call. Can be a Principal or a string.
	* @param options - Options for the call.
	* @param identity - (Optional) The identity to use for the call. If not provided, the agent's current identity will be used.
	* @returns A promise that resolves to the response of the call, including the request ID and response details.
	*/
	async call(canisterId, options, identity) {
		const callSync = options.callSync ?? true;
		const id = await (identity ?? this.#identity);
		if (!id) throw ExternalError.fromCode(new IdentityInvalidErrorCode());
		const canister = Principal$1.from(canisterId);
		const ecid = options.effectiveCanisterId ? Principal$1.from(options.effectiveCanisterId) : canister;
		await this.#asyncGuard(ecid);
		const sender = id.getPrincipal();
		const ingress_expiry = calculateIngressExpiry(this.#maxIngressExpiryInMinutes, this.#timeDiffMsecs);
		const submit = {
			request_type: SubmitRequestType.Call,
			canister_id: canister,
			method_name: options.methodName,
			arg: options.arg,
			sender,
			ingress_expiry
		};
		let transformedRequest = await this._transform({
			request: {
				body: null,
				method: "POST",
				headers: {
					"Content-Type": "application/cbor",
					...this.#credentials ? { Authorization: `Basic ${btoa(this.#credentials)}` } : {}
				}
			},
			endpoint: Endpoint.Call,
			body: submit
		});
		let nonce;
		if (options?.nonce) nonce = toNonce(options.nonce);
		else if (transformedRequest.body.nonce) nonce = toNonce(transformedRequest.body.nonce);
		else nonce = void 0;
		submit.nonce = nonce;
		/**
		* Converts a Uint8Array to a Nonce type.
		* @param buf - The buffer to convert.
		* @returns The buffer as a Nonce.
		*/
		function toNonce(buf) {
			return Object.assign(buf, { __nonce__: void 0 });
		}
		transformedRequest = await id.transformRequest(transformedRequest);
		const requestId = requestIdOf(transformedRequest.body.content ?? submit);
		const body = encode(transformedRequest.body);
		const backoff = this.#backoffStrategy();
		try {
			const requestSync = () => {
				const url = new URL(`/api/v4/canister/${ecid.toText()}/call`, this.host);
				this.log.print(`fetching "${url.pathname}" with request:`, transformedRequest);
				return this.#fetch(url, {
					...this.#callOptions,
					...transformedRequest.request,
					body
				});
			};
			const requestAsync = () => {
				const url = new URL(`/api/v2/canister/${ecid.toText()}/call`, this.host);
				this.log.print(`fetching "${url.pathname}" with request:`, transformedRequest);
				return this.#fetch(url, {
					...this.#callOptions,
					...transformedRequest.request,
					body
				});
			};
			const requestFn = callSync ? requestSync : requestAsync;
			const { responseBodyBytes, ...response } = await this.#requestAndRetry({
				requestFn,
				backoff,
				tries: 0
			});
			const responseBody = responseBodyBytes.byteLength > 0 ? decode(responseBodyBytes) : null;
			return {
				requestId,
				response: {
					...response,
					body: responseBody
				},
				requestDetails: submit
			};
		} catch (error) {
			let callError;
			if (error instanceof AgentError) {
				if (error.hasCode(HttpV4ApiNotSupportedErrorCode)) {
					this.log.warn("v4 api not supported. Fall back to v2");
					return this.call(canisterId, {
						...options,
						callSync: false
					}, identity);
				}
				if (error.hasCode(IngressExpiryInvalidErrorCode) && !this.#hasSyncedTime) {
					await this.syncTime(canister);
					return this.call(canister, options, identity);
				}
				error.code.requestContext = {
					requestId,
					senderPubKey: transformedRequest.body.sender_pubkey,
					senderSignature: transformedRequest.body.sender_sig,
					ingressExpiry: transformedRequest.body.content.ingress_expiry
				};
				callError = error;
			} else callError = UnknownError.fromCode(new UnexpectedErrorCode(error));
			this.log.error(`Error while making call: ${callError.message}`, callError);
			throw callError;
		}
	}
	/**
	* Executes an update call to a canister and returns the certified result.
	* @param canisterId The canister to call.
	* @param fields The call options (method name, arg, effective canister ID, optional nonce).
	* @param pollingOptions Optional polling configuration.
	* @returns The certified result including the certificate, reply bytes, and raw certificate bytes.
	*/
	async update(canisterId, fields, pollingOptions = {}) {
		const effectiveCanisterId = Principal$1.from(fields.effectiveCanisterId);
		const { requestId, response, requestDetails } = await this.call(canisterId, fields);
		const { body, ...httpDetails } = response;
		if (isV4ResponseBody(body)) return this.#handleV4SyncResponse(body, response, requestId, effectiveCanisterId, fields.methodName, httpDetails, requestDetails, pollingOptions, fields.onPollingStarted);
		if (isV2ResponseBody(body)) this.#handleV2Rejection(body, requestId, effectiveCanisterId, fields.methodName, httpDetails);
		if (response.status === HTTP_STATUS_ACCEPTED) {
			fields.onPollingStarted?.();
			return {
				...await pollForResponse(this, effectiveCanisterId, requestId, pollingOptions),
				requestDetails,
				callResponse: response
			};
		}
		const unexpectedErrorCode = new UnexpectedErrorCode(`Unexpected response from call: status ${response.status} with unrecognized body`);
		unexpectedErrorCode.callContext = {
			canisterId: effectiveCanisterId,
			methodName: fields.methodName,
			httpDetails
		};
		throw UnknownError.fromCode(unexpectedErrorCode);
	}
	async #handleV4SyncResponse(body, response, requestId, effectiveCanisterId, methodName, httpDetails, requestDetails, pollingOptions, onPollingStarted) {
		if (this.rootKey == null) throw ExternalError.fromCode(new MissingRootKeyErrorCode());
		const rawCertificate = body.certificate;
		const certificate = await Certificate.create({
			certificate: rawCertificate,
			rootKey: this.rootKey,
			principal: { canisterId: effectiveCanisterId },
			blsVerify: pollingOptions.blsVerify,
			agent: this
		});
		const path = [utf8ToBytes("request_status"), requestId];
		const maybeBuf = lookupResultToBuffer(certificate.lookup_path([...path, utf8ToBytes("status")]));
		const status = maybeBuf ? new TextDecoder().decode(maybeBuf) : void 0;
		switch (status) {
			case RequestStatusResponseStatus.Replied: return {
				reply: lookupResultToBuffer(certificate.lookup_path([...path, "reply"])),
				certificate,
				rawCertificate,
				requestDetails,
				callResponse: response
			};
			case RequestStatusResponseStatus.Rejected: {
				const error = readCertifiedReject(certificate, path, requestId);
				error.callContext = {
					canisterId: effectiveCanisterId,
					methodName,
					httpDetails
				};
				throw RejectError.fromCode(error);
			}
			case void 0:
				this.log.warn(`v4 sync response certificate does not contain request ID ${bytesToHex(requestId)} status. Falling back to polling.`);
				onPollingStarted?.();
				return {
					...await pollForResponse(this, effectiveCanisterId, requestId, pollingOptions),
					requestDetails,
					callResponse: response
				};
			default: {
				const errorCode = new UnexpectedV4StatusErrorCode(status, requestId, response, rawCertificate);
				errorCode.callContext = {
					canisterId: effectiveCanisterId,
					methodName,
					httpDetails
				};
				throw UnknownError.fromCode(errorCode);
			}
		}
	}
	#handleV2Rejection(body, requestId, effectiveCanisterId, methodName, httpDetails) {
		const { reject_code, reject_message, error_code } = body;
		const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
		errorCode.callContext = {
			canisterId: effectiveCanisterId,
			methodName,
			httpDetails
		};
		throw RejectError.fromCode(errorCode);
	}
	async #requestAndRetryQuery(args) {
		const { ecid, transformedRequest, body, requestId, backoff, tries } = args;
		const delay = tries === 0 ? 0 : backoff.next();
		const url = new URL(`/api/v3/canister/${ecid.toString()}/query`, this.host);
		this.log.print(`fetching "${url.pathname}" with tries:`, {
			tries,
			backoff,
			delay
		});
		if (delay === null) throw UnknownError.fromCode(new TimeoutWaitingForResponseErrorCode(`Backoff strategy exhausted after ${tries} attempts.`, requestId));
		if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
		let fetchResponse;
		try {
			this.log.print(`fetching "${url.pathname}" with request:`, transformedRequest);
			fetchResponse = await this.#fetch(url, {
				...this.#fetchOptions,
				...transformedRequest.request,
				body
			});
		} catch (error) {
			if (tries < this.#retryTimes) {
				this.log.warn(`Caught exception while attempting to make query:\n  ${error}\n  Retrying query.`);
				return await this.#requestAndRetryQuery({
					...args,
					tries: tries + 1
				});
			}
			throw TransportError.fromCode(new HttpFetchErrorCode(error));
		}
		const headers = httpHeadersTransform(fetchResponse.headers);
		if (fetchResponse.status !== HTTP_STATUS_OK) {
			const responseText = await fetchResponse.text();
			if (isIngressExpiryInvalidResponse(responseText)) throw InputError.fromCode(new IngressExpiryInvalidErrorCode(responseText, this.#maxIngressExpiryInMinutes));
			if (tries < this.#retryTimes) return await this.#requestAndRetryQuery({
				...args,
				tries: tries + 1
			});
			throw ProtocolError.fromCode(new HttpErrorCode(fetchResponse.status, fetchResponse.statusText, headers, responseText));
		}
		const response = {
			...decode(uint8FromBufLike(await fetchResponse.arrayBuffer())),
			httpDetails: {
				ok: fetchResponse.ok,
				status: fetchResponse.status,
				statusText: fetchResponse.statusText,
				headers
			},
			requestId
		};
		if (!this.#verifyQuerySignatures) return response;
		const signatureTimestampNs = response.signatures?.[0]?.timestamp;
		if (!signatureTimestampNs) throw ProtocolError.fromCode(new MalformedSignatureErrorCode("Timestamp not found in query response. This suggests a malformed or malicious response."));
		const signatureTimestampMs = Number(BigInt(signatureTimestampNs) / BigInt(MSECS_TO_NANOSECONDS));
		if (Date.now() + this.#timeDiffMsecs - signatureTimestampMs > this.#maxIngressExpiryInMs) {
			if (tries < this.#retryTimes) {
				this.log.warn("Timestamp is older than the max ingress expiry. Retrying query.", {
					requestId,
					signatureTimestampMs
				});
				await this.syncTime(ecid);
				return await this.#requestAndRetryQuery({
					...args,
					tries: tries + 1
				});
			}
			throw TrustError.fromCode(new CertificateOutdatedErrorCode(this.#maxIngressExpiryInMinutes, requestId, tries));
		}
		return response;
	}
	/**
	* Makes a request and retries if it fails.
	* @param args - The arguments for the request.
	* @param args.requestFn - A function that returns a Promise resolving to a Response.
	* @param args.backoff - The backoff strategy to use for retries.
	* @param args.tries - The number of retry attempts made so far.
	* @returns The response from the request, if the status is 200 or 202.
	* See the https://internetcomputer.org/docs/references/ic-interface-spec#http-interface for details on the response statuses.
	* @throws {ProtocolError} if the response status is not 200 or 202, and the retry limit has been reached.
	* @throws {TransportError} if the request fails, and the retry limit has been reached.
	*/
	async #requestAndRetry(args) {
		const { requestFn, backoff, tries } = args;
		const delay = tries === 0 ? 0 : backoff.next();
		if (delay === null) throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Retry strategy exhausted after ${tries} attempts.`));
		if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
		let response;
		let responseBodyBytes = /* @__PURE__ */ new Uint8Array();
		try {
			response = await requestFn();
			if (response.status === HTTP_STATUS_OK) responseBodyBytes = uint8FromBufLike(await response.clone().arrayBuffer());
		} catch (error) {
			if (tries < this.#retryTimes) {
				this.log.warn(`Caught exception while attempting to make request:\n  ${error}\n  Retrying request.`);
				return await this.#requestAndRetry({
					requestFn,
					backoff,
					tries: tries + 1
				});
			}
			throw TransportError.fromCode(new HttpFetchErrorCode(error));
		}
		const headers = httpHeadersTransform(response.headers);
		if (response.status === HTTP_STATUS_OK || response.status === HTTP_STATUS_ACCEPTED) return {
			ok: response.ok,
			status: response.status,
			statusText: response.statusText,
			responseBodyBytes,
			headers
		};
		const responseText = await response.text();
		if (response.status === HTTP_STATUS_NOT_FOUND && response.url.includes("api/v4")) throw ProtocolError.fromCode(new HttpV4ApiNotSupportedErrorCode());
		if (isIngressExpiryInvalidResponse(responseText)) throw InputError.fromCode(new IngressExpiryInvalidErrorCode(responseText, this.#maxIngressExpiryInMinutes));
		if (tries < this.#retryTimes) return await this.#requestAndRetry({
			requestFn,
			backoff,
			tries: tries + 1
		});
		throw ProtocolError.fromCode(new HttpErrorCode(response.status, response.statusText, headers, responseText));
	}
	async query(canisterId, fields, identity) {
		const backoff = this.#backoffStrategy();
		const ecid = fields.effectiveCanisterId ? Principal$1.from(fields.effectiveCanisterId) : Principal$1.from(canisterId);
		await this.#asyncGuard(ecid);
		this.log.print(`ecid ${ecid.toString()}`);
		this.log.print(`canisterId ${canisterId.toString()}`);
		let transformedRequest;
		const id = await (identity ?? this.#identity);
		if (!id) throw ExternalError.fromCode(new IdentityInvalidErrorCode());
		const canister = Principal$1.from(canisterId);
		const sender = id.getPrincipal();
		const ingressExpiry = calculateIngressExpiry(this.#maxIngressExpiryInMinutes, this.#timeDiffMsecs);
		const request = {
			request_type: ReadRequestType.Query,
			canister_id: canister,
			method_name: fields.methodName,
			arg: fields.arg,
			sender,
			ingress_expiry: ingressExpiry
		};
		transformedRequest = await this._transform({
			request: {
				method: "POST",
				headers: {
					"Content-Type": "application/cbor",
					...this.#credentials ? { Authorization: `Basic ${btoa(this.#credentials)}` } : {}
				}
			},
			endpoint: Endpoint.Query,
			body: request
		});
		transformedRequest = await id.transformRequest(transformedRequest);
		const requestId = requestIdOf(transformedRequest.body.content ?? request);
		const body = encode(transformedRequest.body);
		const args = {
			canister: canister.toText(),
			ecid,
			transformedRequest,
			body,
			requestId,
			backoff,
			tries: 0
		};
		const makeQuery = async () => {
			const query = await this.#requestAndRetryQuery(args);
			return {
				requestDetails: request,
				...query
			};
		};
		try {
			if (!this.#verifyQuerySignatures) return await makeQuery();
			const [queryWithDetails, subnetNodeKeys] = await Promise.all([makeQuery(), this.fetchSubnetKeys(ecid)]);
			try {
				return this.#verifyQueryResponse(queryWithDetails, subnetNodeKeys);
			} catch {
				this.log.warn("Query response verification failed. Retrying with fresh subnet keys.");
				await this.#subnetNodeKeyExpirableStore.delete(ecid.toString());
				const updatedSubnetNodeKeys = await this.fetchSubnetKeys(ecid);
				return this.#verifyQueryResponse(queryWithDetails, updatedSubnetNodeKeys);
			}
		} catch (error) {
			let queryError;
			if (error instanceof AgentError) {
				if (error.hasCode(IngressExpiryInvalidErrorCode) && !this.#hasSyncedTime) {
					await this.syncTime(ecid);
					return this.query(canisterId, fields, identity);
				}
				error.code.requestContext = {
					requestId,
					senderPubKey: transformedRequest.body.sender_pubkey,
					senderSignature: transformedRequest.body.sender_sig,
					ingressExpiry: transformedRequest.body.content.ingress_expiry
				};
				queryError = error;
			} else queryError = UnknownError.fromCode(new UnexpectedErrorCode(error));
			this.log.error(`Error while making query: ${queryError.message}`, queryError);
			throw queryError;
		}
	}
	/**
	* See https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-query for details on validation
	* @param queryResponse - The response from the query
	* @param subnetNodeKeys - The subnet node keys
	* @returns ApiQueryResponse
	*/
	#verifyQueryResponse;
	async createReadStateRequest(fields, identity) {
		await this.#asyncGuard();
		const id = await (identity ?? this.#identity);
		if (!id) throw ExternalError.fromCode(new IdentityInvalidErrorCode());
		const sender = id.getPrincipal();
		const transformedRequest = await this._transform({
			request: {
				method: "POST",
				headers: {
					"Content-Type": "application/cbor",
					...this.#credentials ? { Authorization: `Basic ${btoa(this.#credentials)}` } : {}
				}
			},
			endpoint: Endpoint.ReadState,
			body: {
				request_type: ReadRequestType.ReadState,
				paths: fields.paths,
				sender,
				ingress_expiry: calculateIngressExpiry(this.#maxIngressExpiryInMinutes, this.#timeDiffMsecs)
			}
		});
		return id.transformRequest(transformedRequest);
	}
	async readState(canisterId, fields, _identity, request) {
		await this.#rootKeyGuard();
		const canister = Principal$1.from(canisterId);
		function getRequestId(options) {
			for (const path of options.paths) {
				const [pathName, value] = path;
				if (uint8Equals(pathName, new TextEncoder().encode("request_status"))) return value;
			}
		}
		let transformedRequest;
		let requestId;
		if (request) transformedRequest = request;
		else {
			requestId = getRequestId(fields);
			const identity = await this.#identity;
			if (!identity) throw ExternalError.fromCode(new IdentityInvalidErrorCode());
			transformedRequest = await this.createReadStateRequest(fields, identity);
		}
		const url = new URL(`/api/v3/canister/${canister.toString()}/read_state`, this.host);
		return await this.#readStateInner(url, { canisterId: canister }, transformedRequest, requestId);
	}
	/**
	* Reads the state of a subnet from the `/api/v3/subnet/{subnetId}/read_state` endpoint.
	* @param subnetId The ID of the subnet to read the state of. If you have a canister ID, you can use {@link HttpAgent.getSubnetIdFromCanister | getSubnetIdFromCanister} to get the subnet ID.
	* @param options The options for the read state request.
	* @returns The response from the read state request.
	*/
	async readSubnetState(subnetId, options) {
		await this.#rootKeyGuard();
		const subnet = Principal$1.from(subnetId);
		const url = new URL(`/api/v3/subnet/${subnet.toString()}/read_state`, this.host);
		const transformedRequest = await this.createReadStateRequest(options, this.#identity ?? void 0);
		return await this.#readStateInner(url, { subnetId: subnet }, transformedRequest);
	}
	async #readStateInner(url, principal, transformedRequest, requestId) {
		const backoff = this.#backoffStrategy();
		try {
			const { responseBodyBytes } = await this.#requestAndRetry({
				requestFn: () => this.#fetch(url, {
					...this.#fetchOptions,
					...transformedRequest.request,
					body: encode(transformedRequest.body)
				}),
				backoff,
				tries: 0
			});
			return decode(responseBodyBytes);
		} catch (error) {
			let readStateError;
			if (error instanceof AgentError) {
				if (error.hasCode(IngressExpiryInvalidErrorCode) && !this.#hasSyncedTime) {
					if ("canisterId" in principal) await this.syncTime(principal.canisterId);
					else if ("subnetId" in principal) await this.syncTimeWithSubnet(principal.subnetId);
					else throw UNREACHABLE_ERROR;
					return await this.#readStateInner(url, principal, transformedRequest, requestId);
				}
				error.code.requestContext = {
					requestId: requestId ?? requestIdOf(transformedRequest),
					senderPubKey: transformedRequest.body.sender_pubkey,
					senderSignature: transformedRequest.body.sender_sig,
					ingressExpiry: transformedRequest.body.content.ingress_expiry
				};
				readStateError = error;
			} else readStateError = UnknownError.fromCode(new UnexpectedErrorCode(error));
			this.log.error(`Error while making read state: ${readStateError.message}`, readStateError);
			throw readStateError;
		}
	}
	parseTimeFromResponse(response) {
		let tree;
		if (response.certificate) {
			const decoded = decode(response.certificate);
			if (decoded && "tree" in decoded) tree = decoded.tree;
			else throw ProtocolError.fromCode(new HashTreeDecodeErrorCode("Could not decode time from response"));
			const timeLookup = lookup_path(["time"], tree);
			if (timeLookup.status !== LookupPathStatus.Found) throw ProtocolError.fromCode(new LookupErrorCode("Time was not found in the response or was not in its expected format.", timeLookup.status));
			if (!(timeLookup.value instanceof Uint8Array) && !ArrayBuffer.isView(timeLookup)) throw ProtocolError.fromCode(new MalformedLookupFoundValueErrorCode("Time was not in its expected format."));
			const date = decodeTime(timeLookup.value);
			this.log.print("Time from response:", date);
			this.log.print("Time from response in milliseconds:", date.getTime());
			return date.getTime();
		}
		this.log.warn("No certificate found in response");
		return 0;
	}
	/**
	* Allows agent to sync its time with the network. Can be called during initialization or mid-lifecycle if the device's clock has drifted away from the network time. This is necessary to set the Expiry for a request
	* @param {Principal} canisterIdOverride - Pass a canister ID if you need to sync the time with a particular subnet. Uses the ICP ledger canister by default.
	*/
	async syncTime(canisterIdOverride) {
		this.#syncTimePromise = this.#syncTimePromise ?? (async () => {
			await this.#rootKeyGuard();
			const callTime = Date.now();
			try {
				if (!canisterIdOverride) this.log.print("Syncing time with the IC. No canisterId provided, so falling back to ryjl3-tyaaa-aaaaa-aaaba-cai");
				const canisterId = canisterIdOverride ?? Principal$1.from("ryjl3-tyaaa-aaaaa-aaaba-cai");
				const anonymousAgent = HttpAgent.createSync({
					identity: new AnonymousIdentity(),
					host: this.host.toString(),
					fetch: this.#fetch,
					retryTimes: 0,
					rootKey: this.rootKey ?? void 0,
					shouldSyncTime: false
				});
				const replicaTimes = await Promise.all(Array(3).fill(null).map(async () => {
					const date = (await request$1({
						canisterId,
						agent: anonymousAgent,
						paths: ["time"],
						disableCertificateTimeVerification: true
					})).get("time");
					if (date instanceof Date) return date.getTime();
				}, []));
				this.#setTimeDiffMsecs(callTime, replicaTimes);
			} catch (error) {
				const syncTimeError = error instanceof AgentError ? error : UnknownError.fromCode(new UnexpectedErrorCode(error));
				this.log.error("Caught exception while attempting to sync time", syncTimeError);
				throw syncTimeError;
			}
		})();
		await this.#syncTimePromise.finally(() => {
			this.#syncTimePromise = null;
		});
	}
	/**
	* Allows agent to sync its time with the network.
	* @param {Principal} subnetId - Pass the subnet ID you need to sync the time with.
	*/
	async syncTimeWithSubnet(subnetId) {
		await this.#rootKeyGuard();
		const callTime = Date.now();
		try {
			const anonymousAgent = HttpAgent.createSync({
				identity: new AnonymousIdentity(),
				host: this.host.toString(),
				fetch: this.#fetch,
				retryTimes: 0,
				rootKey: this.rootKey ?? void 0,
				shouldSyncTime: false
			});
			const replicaTimes = await Promise.all(Array(3).fill(null).map(async () => {
				const date = (await request({
					subnetId,
					agent: anonymousAgent,
					paths: ["time"],
					disableCertificateTimeVerification: true
				})).get("time");
				if (date instanceof Date) return date.getTime();
			}, []));
			this.#setTimeDiffMsecs(callTime, replicaTimes);
		} catch (error) {
			const syncTimeError = error instanceof AgentError ? error : UnknownError.fromCode(new UnexpectedErrorCode(error));
			this.log.error("Caught exception while attempting to sync time with subnet", syncTimeError);
			throw syncTimeError;
		}
	}
	#setTimeDiffMsecs(callTime, replicaTimes) {
		const maxReplicaTime = replicaTimes.reduce((max, current) => {
			return typeof current === "number" && current > max ? current : max;
		}, 0);
		if (maxReplicaTime > 0) {
			this.#timeDiffMsecs = maxReplicaTime - callTime;
			this.#hasSyncedTime = true;
			this.log.notify({
				message: `Syncing time: offset of ${this.#timeDiffMsecs}`,
				level: "info"
			});
		}
	}
	async status() {
		const headers = this.#credentials ? { Authorization: `Basic ${btoa(this.#credentials)}` } : {};
		const url = new URL(`/api/v2/status`, this.host);
		this.log.print(`fetching "${url.pathname}"`);
		const backoff = this.#backoffStrategy();
		const { responseBodyBytes } = await this.#requestAndRetry({
			backoff,
			requestFn: () => this.#fetch(url, {
				headers,
				...this.#fetchOptions
			}),
			tries: 0
		});
		return decode(responseBodyBytes);
	}
	async fetchRootKey() {
		this.#rootKeyPromise = this.#rootKeyPromise ?? (async () => {
			const value = await this.status();
			this.rootKey = value.root_key;
			return this.rootKey;
		})();
		return await this.#rootKeyPromise.finally(() => {
			this.#rootKeyPromise = null;
		});
	}
	async #asyncGuard(canisterIdOverride) {
		await Promise.all([this.#rootKeyGuard(), this.#syncTimeGuard(canisterIdOverride)]);
	}
	async #rootKeyGuard() {
		if (this.rootKey) return;
		if (this.rootKey === null && this.host.toString() !== "https://icp-api.io" && this.#shouldFetchRootKey) await this.fetchRootKey();
		else throw ExternalError.fromCode(new MissingRootKeyErrorCode(this.#shouldFetchRootKey));
	}
	async #syncTimeGuard(canisterIdOverride) {
		if (this.#shouldSyncTime && !this.hasSyncedTime()) await this.syncTime(canisterIdOverride);
	}
	invalidateIdentity() {
		this.#identity = null;
	}
	replaceIdentity(identity) {
		this.#identity = Promise.resolve(identity);
	}
	async fetchSubnetKeys(canisterId) {
		const effectiveCanisterId = Principal$1.from(canisterId);
		const cached = await this.#subnetNodeKeyExpirableStore.get(effectiveCanisterId.toText());
		if (cached) return cached;
		const inflight = this.#subnetKeysFetching.get(effectiveCanisterId.toText());
		if (inflight) return inflight;
		const fetchPromise = this.#doFetchSubnetKeys(effectiveCanisterId).finally(() => {
			this.#subnetKeysFetching.delete(effectiveCanisterId.toText());
		});
		this.#subnetKeysFetching.set(effectiveCanisterId.toText(), fetchPromise);
		return fetchPromise;
	}
	async #doFetchSubnetKeys(effectiveCanisterId) {
		await this.#asyncGuard(effectiveCanisterId);
		const rootKey = this.rootKey;
		const canisterReadState = await this.readState(effectiveCanisterId, { paths: [[utf8ToBytes("subnet")]] });
		const canisterCertificate = await Certificate.create({
			certificate: canisterReadState.certificate,
			rootKey,
			principal: { canisterId: effectiveCanisterId },
			agent: this
		});
		if (!canisterCertificate.cert.delegation) {
			const subnetId = Principal$1.selfAuthenticating(rootKey);
			if (!check_canister_ranges({
				canisterId: effectiveCanisterId,
				subnetId,
				tree: canisterCertificate.cert.tree
			})) throw TrustError.fromCode(new CertificateNotAuthorizedErrorCode(effectiveCanisterId, subnetId));
		}
		const subnetId = getSubnetIdFromCertificate(canisterCertificate.cert, rootKey);
		const nodeKeys = lookupNodeKeysFromCertificate(canisterCertificate.cert, subnetId);
		await this.#subnetNodeKeyExpirableStore.set(effectiveCanisterId.toText(), nodeKeys);
		return nodeKeys;
	}
	/**
	* Returns the subnet ID for a given canister ID, by looking at the certificate delegation
	* returned by the canister's state obtained by requesting the `/time` path with {@link HttpAgent.readState | readState}.
	* @param canisterId The canister ID to get the subnet ID for.
	* @returns The subnet ID for the given canister ID.
	*/
	async getSubnetIdFromCanister(canisterId) {
		const effectiveCanisterId = Principal$1.from(canisterId);
		await this.#asyncGuard(effectiveCanisterId);
		const canisterReadState = await this.readState(effectiveCanisterId, { paths: [[utf8ToBytes("time")]] });
		return getSubnetIdFromCertificate((await Certificate.create({
			certificate: canisterReadState.certificate,
			rootKey: this.rootKey,
			principal: { canisterId: effectiveCanisterId },
			agent: this
		})).cert, this.rootKey);
	}
	_transform(request) {
		let p = Promise.resolve(request);
		if (request.endpoint === Endpoint.Call) for (const fn of this.#updatePipeline) p = p.then((r) => fn(r).then((r2) => r2 || r));
		else for (const fn of this.#queryPipeline) p = p.then((r) => fn(r).then((r2) => r2 || r));
		return p;
	}
	/**
	* Returns the time difference in milliseconds between the IC network clock and the client's clock,
	* after the clock has been synced.
	*
	* If the time has not been synced, returns `0`.
	*/
	getTimeDiffMsecs() {
		return this.#timeDiffMsecs;
	}
	/**
	* Returns `true` if the time has been synced at least once with the IC network, `false` otherwise.
	*/
	hasSyncedTime() {
		return this.#hasSyncedTime;
	}
};
/**
* Calculates the ingress expiry time based on the maximum allowed expiry in minutes and the time difference in milliseconds.
* The expiry is rounded down according to the {@link Expiry.fromDeltaInMilliseconds} method.
* @param maxIngressExpiryInMinutes - The maximum ingress expiry time in minutes.
* @param timeDiffMsecs - The time difference in milliseconds to adjust the expiry.
* @returns The calculated ingress expiry as an Expiry object.
*/
function calculateIngressExpiry(maxIngressExpiryInMinutes, timeDiffMsecs) {
	const ingressExpiryMs = maxIngressExpiryInMinutes * MINUTE_TO_MSECS;
	return Expiry.fromDeltaInMilliseconds(ingressExpiryMs, timeDiffMsecs);
}
/**
* Checks if the response text is an ingress expiry invalid response.
* @see https://github.com/dfinity/ic/blob/23d5990bfc5277c32e54f0087b5a38fa412171e1/rs/validator/src/ingress_validation.rs#L233
* @param responseText The response body as string.
* @returns `true` if the response text is an ingress expiry invalid response, `false` otherwise.
*/
function isIngressExpiryInvalidResponse(responseText) {
	return responseText.includes("Invalid request expiry: ");
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/agent/actor.js
var metadataSymbol = Symbol.for("ic-agent-metadata");
/**
* An actor base class. An actor is an object containing only functions that will
* return a promise. These functions are derived from the IDL definition.
*/
var Actor = class {
	/**
	* Get the Agent class this Actor would call, or undefined if the Actor would use
	* the default agent (global.ic.agent).
	* @param actor The actor to get the agent of.
	*/
	static agentOf(actor) {
		return actor[metadataSymbol].config.agent;
	}
	/**
	* Get the interface of an actor, in the form of an instance of a Service.
	* @param actor The actor to get the interface of.
	*/
	static interfaceOf(actor) {
		return actor[metadataSymbol].service;
	}
	static canisterIdOf(actor) {
		return Principal$1.from(actor[metadataSymbol].config.canisterId);
	}
	static createActorClass(interfaceFactory, options) {
		const service = interfaceFactory({ IDL: idl_exports });
		class CanisterActor extends Actor {
			constructor(config) {
				if (!config.canisterId) throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
				const canisterId = typeof config.canisterId === "string" ? Principal$1.fromText(config.canisterId) : config.canisterId;
				super({
					config: {
						...DEFAULT_ACTOR_CONFIG,
						...config,
						canisterId
					},
					service
				});
				for (const [methodName, func] of service._fields) {
					if (options?.httpDetails) func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
					if (options?.certificate) func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
					this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
				}
			}
		}
		return CanisterActor;
	}
	/**
	* Creates an actor with the given interface factory and configuration.
	*
	* The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
	* @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
	* @param configuration - the configuration for the actor
	* @returns an actor with the given interface factory and configuration
	* @see The {@link https://js.icp.build/core/latest/canister-environment/ | Canister Environment Guide} for more details on how to configure an actor using the canister environment.
	* @example
	* Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
	* ```ts
	* import { Actor, HttpAgent } from '@icp-sdk/core/agent';
	* import { Principal } from '@icp-sdk/core/principal';
	* import { idlFactory } from './api/declarations/hello-world.did';
	*
	* // For a convenient way to get the canister ID,
	* // see the https://js.icp.build/core/latest/canister-environment/ guide.
	* const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
	*
	* const agent = await HttpAgent.create({
	*   host: 'https://icp-api.io',
	* });
	*
	* const actor = Actor.createActor(idlFactory, {
	*   agent,
	*   canisterId,
	* });
	*
	* const response = await actor.greet('world');
	* console.log(response);
	* ```
	* @example
	* Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
	* ```ts
	* import { HttpAgent } from '@icp-sdk/core/agent';
	* import { Principal } from '@icp-sdk/core/principal';
	* import { createActor } from './api/hello-world';
	*
	* // For a convenient way to get the canister ID,
	* // see the https://js.icp.build/core/latest/canister-environment/ guide.
	* const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
	*
	* const agent = await HttpAgent.create({
	*   host: 'https://icp-api.io',
	* });
	*
	* const actor = createActor(canisterId, {
	*   agent,
	* });
	*
	* const response = await actor.greet('world');
	* console.log(response);
	* ```
	*/
	static createActor(interfaceFactory, configuration) {
		if (!configuration.canisterId) throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
		return new (this.createActorClass(interfaceFactory))(configuration);
	}
	/**
	* Returns an actor with methods that return the http response details along with the result
	* @param interfaceFactory - the interface factory for the actor
	* @param configuration - the configuration for the actor
	* @deprecated - use createActor with actorClassOptions instead
	*/
	static createActorWithHttpDetails(interfaceFactory, configuration) {
		return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
	}
	/**
	* Returns an actor with methods that return the http response details along with the result
	* @param interfaceFactory - the interface factory for the actor
	* @param configuration - the configuration for the actor
	* @param actorClassOptions - options for the actor class extended details to return with the result
	*/
	static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
		httpDetails: true,
		certificate: true
	}) {
		return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
	}
	constructor(metadata) {
		this[metadataSymbol] = Object.freeze(metadata);
	}
};
function decodeReturnValue(types, msg) {
	const returnValues = decode$1(types, msg);
	switch (returnValues.length) {
		case 0: return;
		case 1: return returnValues[0];
		default: return returnValues;
	}
}
var DEFAULT_ACTOR_CONFIG = {
	pollingOptions: DEFAULT_POLLING_OPTIONS,
	queryStrategy: "query"
};
var ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
var ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
	let caller;
	const isQueryAnnotated = func.annotations.includes("query") || func.annotations.includes("composite_query");
	const queryStrategy = actor[metadataSymbol].config.queryStrategy;
	if (isQueryAnnotated && queryStrategy === "query") caller = async (options, ...args) => {
		options = {
			...options,
			...actor[metadataSymbol].config.queryTransform?.(methodName, args, {
				...actor[metadataSymbol].config,
				...options
			})
		};
		const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
		const cid = Principal$1.from(options.canisterId || actor[metadataSymbol].config.canisterId);
		const arg = encode$1(func.argTypes, args);
		const result = await agent.query(cid, {
			methodName,
			arg,
			effectiveCanisterId: options.effectiveCanisterId
		});
		const httpDetails = {
			...result.httpDetails,
			requestDetails: result.requestDetails
		};
		switch (result.status) {
			case QueryResponseStatus.Rejected: {
				const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
				uncertifiedRejectErrorCode.callContext = {
					canisterId: cid,
					methodName,
					httpDetails
				};
				throw RejectError.fromCode(uncertifiedRejectErrorCode);
			}
			case QueryResponseStatus.Replied: return func.annotations.includes("http-details") ? {
				httpDetails,
				result: decodeReturnValue(func.retTypes, result.reply.arg)
			} : decodeReturnValue(func.retTypes, result.reply.arg);
		}
	};
	else caller = async (options, ...args) => {
		options = {
			...options,
			...actor[metadataSymbol].config.callTransform?.(methodName, args, {
				...actor[metadataSymbol].config,
				...options
			})
		};
		const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
		const { canisterId, effectiveCanisterId, pollingOptions } = {
			...DEFAULT_ACTOR_CONFIG,
			...actor[metadataSymbol].config,
			...options
		};
		const cid = Principal$1.from(canisterId);
		const ecid = effectiveCanisterId !== void 0 ? Principal$1.from(effectiveCanisterId) : cid;
		const arg = encode$1(func.argTypes, args);
		let reply;
		let certificate;
		let callResponse;
		let requestDetails;
		try {
			({reply, certificate, callResponse, requestDetails} = await agent.update(cid, {
				methodName,
				arg,
				effectiveCanisterId: ecid,
				nonce: options.nonce
			}, {
				...pollingOptions,
				blsVerify
			}));
		} catch (e) {
			if (e instanceof RejectError) {
				const enrichedCode = Object.create(Object.getPrototypeOf(e.code), Object.getOwnPropertyDescriptors(e.code));
				enrichedCode.callContext = {
					...e.code.callContext,
					canisterId: cid,
					methodName
				};
				throw RejectError.fromCode(enrichedCode);
			}
			throw e;
		}
		const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
		const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
		const httpDetails = {
			...callResponse,
			requestDetails
		};
		if (shouldIncludeHttpDetails && shouldIncludeCertificate) return {
			httpDetails,
			certificate,
			result: decodeReturnValue(func.retTypes, reply)
		};
		if (shouldIncludeCertificate) return {
			certificate,
			result: decodeReturnValue(func.retTypes, reply)
		};
		if (shouldIncludeHttpDetails) return {
			httpDetails,
			result: decodeReturnValue(func.retTypes, reply)
		};
		return decodeReturnValue(func.retTypes, reply);
	};
	const handler = (...args) => caller({}, ...args);
	handler.withOptions = (options) => (...args) => caller(options, ...args);
	return handler;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@caffeineai+object-storage@1.1.2/node_modules/@caffeineai/object-storage/dist/formatBlobContentDisposition.js
/** Value for the `Content-Disposition` blob-tree header (gateway-persisted metadata). */
function formatBlobContentDisposition(filename) {
	const trimmed = filename?.trim();
	if (!trimmed) return;
	if (/^[A-Za-z0-9._-]+$/.test(trimmed)) return `attachment; filename=${trimmed}`;
	if (/[^\x20-\x7E]/.test(trimmed)) return `attachment; filename*=UTF-8''${encodeURIComponent(trimmed)}`;
	return `attachment; filename="${trimmed.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"`;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@caffeineai+object-storage@1.1.2/node_modules/@caffeineai/object-storage/dist/formatCertificateRejectionError.js
var CERTIFICATE_METHOD = "_immutableObjectStorageCreateCertificate";
/**
* Build an Error for a certified IC call rejection of
* `_immutableObjectStorageCreateCertificate`.
*
* Per the IC interface spec, reject_code is protocol-fixed:
* - DESTINATION_INVALID (3): invalid destination (missing canister/method)
* - CANISTER_REJECT (4): explicit canister reject
* - CANISTER_ERROR (5): trap / canister error
*
* Missing update methods surface as DESTINATION_INVALID with a message like
* `Canister has no update method '...'.` (see execution-errors "Method not found").
*/
function formatCertificateRejectionError(options) {
	const { rejectCode, rejectMessage, errorCode } = options;
	if (rejectCode === ReplicaRejectCode.DestinationInvalid && typeof rejectMessage === "string" && /has no update method/i.test(rejectMessage)) return /* @__PURE__ */ new Error(`method not found on backend canister; install the caffeineai-object-storage mops package`);
	const details = [
		rejectCode !== void 0 ? `reject_code=${rejectCode}` : void 0,
		rejectMessage ? `reject_message=${rejectMessage}` : void 0,
		errorCode ? `error_code=${errorCode}` : void 0
	].filter((part) => part !== void 0).join(", ");
	return /* @__PURE__ */ new Error(details.length > 0 ? `backend canister rejected ${CERTIFICATE_METHOD} (${details})` : `backend canister rejected ${CERTIFICATE_METHOD}`);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@borewit+text-codec@0.2.2/node_modules/@borewit/text-codec/lib/index.js
var WINDOWS_1252_EXTRA = {
	128: "€",
	130: "‚",
	131: "ƒ",
	132: "„",
	133: "…",
	134: "†",
	135: "‡",
	136: "ˆ",
	137: "‰",
	138: "Š",
	139: "‹",
	140: "Œ",
	142: "Ž",
	145: "‘",
	146: "’",
	147: "“",
	148: "”",
	149: "•",
	150: "–",
	151: "—",
	152: "˜",
	153: "™",
	154: "š",
	155: "›",
	156: "œ",
	158: "ž",
	159: "Ÿ"
};
var WINDOWS_1252_REVERSE = {};
for (const [code, char] of Object.entries(WINDOWS_1252_EXTRA)) WINDOWS_1252_REVERSE[char] = Number.parseInt(code, 10);
var _utf8Decoder;
function utf8Decoder() {
	if (typeof globalThis.TextDecoder === "undefined") return void 0;
	return _utf8Decoder !== null && _utf8Decoder !== void 0 ? _utf8Decoder : _utf8Decoder = new globalThis.TextDecoder("utf-8");
}
var CHUNK = 32768;
var REPLACEMENT = 65533;
/**
* Decode text from binary data
*/
function textDecode(bytes, encoding = "utf-8") {
	switch (encoding.toLowerCase()) {
		case "utf-8":
		case "utf8": {
			const dec = utf8Decoder();
			return dec ? dec.decode(bytes) : decodeUTF8(bytes);
		}
		case "utf-16le": return decodeUTF16LE(bytes);
		case "us-ascii":
		case "ascii": return decodeASCII(bytes);
		case "latin1":
		case "iso-8859-1": return decodeLatin1(bytes);
		case "windows-1252": return decodeWindows1252(bytes);
		default: throw new RangeError(`Encoding '${encoding}' not supported`);
	}
}
function flushChunk(parts, chunk) {
	if (chunk.length === 0) return;
	parts.push(String.fromCharCode.apply(null, chunk));
	chunk.length = 0;
}
function pushCodeUnit(parts, chunk, codeUnit) {
	chunk.push(codeUnit);
	if (chunk.length >= CHUNK) flushChunk(parts, chunk);
}
function pushCodePoint(parts, chunk, cp) {
	if (cp <= 65535) {
		pushCodeUnit(parts, chunk, cp);
		return;
	}
	cp -= 65536;
	pushCodeUnit(parts, chunk, 55296 + (cp >> 10));
	pushCodeUnit(parts, chunk, 56320 + (cp & 1023));
}
function decodeUTF8(bytes) {
	const parts = [];
	const chunk = [];
	let i = 0;
	if (bytes.length >= 3 && bytes[0] === 239 && bytes[1] === 187 && bytes[2] === 191) i = 3;
	while (i < bytes.length) {
		const b1 = bytes[i];
		if (b1 <= 127) {
			pushCodeUnit(parts, chunk, b1);
			i++;
			continue;
		}
		if (b1 < 194 || b1 > 244) {
			pushCodeUnit(parts, chunk, REPLACEMENT);
			i++;
			continue;
		}
		if (b1 <= 223) {
			if (i + 1 >= bytes.length) {
				pushCodeUnit(parts, chunk, REPLACEMENT);
				i++;
				continue;
			}
			const b2 = bytes[i + 1];
			if ((b2 & 192) !== 128) {
				pushCodeUnit(parts, chunk, REPLACEMENT);
				i++;
				continue;
			}
			pushCodeUnit(parts, chunk, (b1 & 31) << 6 | b2 & 63);
			i += 2;
			continue;
		}
		if (b1 <= 239) {
			if (i + 2 >= bytes.length) {
				pushCodeUnit(parts, chunk, REPLACEMENT);
				i++;
				continue;
			}
			const b2 = bytes[i + 1];
			const b3 = bytes[i + 2];
			if (!((b2 & 192) === 128 && (b3 & 192) === 128 && !(b1 === 224 && b2 < 160) && !(b1 === 237 && b2 >= 160))) {
				pushCodeUnit(parts, chunk, REPLACEMENT);
				i++;
				continue;
			}
			pushCodeUnit(parts, chunk, (b1 & 15) << 12 | (b2 & 63) << 6 | b3 & 63);
			i += 3;
			continue;
		}
		if (i + 3 >= bytes.length) {
			pushCodeUnit(parts, chunk, REPLACEMENT);
			i++;
			continue;
		}
		const b2 = bytes[i + 1];
		const b3 = bytes[i + 2];
		const b4 = bytes[i + 3];
		if (!((b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128 && !(b1 === 240 && b2 < 144) && !(b1 === 244 && b2 > 143))) {
			pushCodeUnit(parts, chunk, REPLACEMENT);
			i++;
			continue;
		}
		pushCodePoint(parts, chunk, (b1 & 7) << 18 | (b2 & 63) << 12 | (b3 & 63) << 6 | b4 & 63);
		i += 4;
	}
	flushChunk(parts, chunk);
	return parts.join("");
}
function decodeUTF16LE(bytes) {
	const parts = [];
	const chunk = [];
	const len = bytes.length;
	let i = 0;
	while (i + 1 < len) {
		const u1 = bytes[i] | bytes[i + 1] << 8;
		i += 2;
		if (u1 >= 55296 && u1 <= 56319) {
			if (i + 1 < len) {
				const u2 = bytes[i] | bytes[i + 1] << 8;
				if (u2 >= 56320 && u2 <= 57343) {
					pushCodeUnit(parts, chunk, u1);
					pushCodeUnit(parts, chunk, u2);
					i += 2;
				} else pushCodeUnit(parts, chunk, REPLACEMENT);
			} else pushCodeUnit(parts, chunk, REPLACEMENT);
			continue;
		}
		if (u1 >= 56320 && u1 <= 57343) {
			pushCodeUnit(parts, chunk, REPLACEMENT);
			continue;
		}
		pushCodeUnit(parts, chunk, u1);
	}
	if (i < len) pushCodeUnit(parts, chunk, REPLACEMENT);
	flushChunk(parts, chunk);
	return parts.join("");
}
function decodeASCII(bytes) {
	const parts = [];
	for (let i = 0; i < bytes.length; i += CHUNK) {
		const end = Math.min(bytes.length, i + CHUNK);
		const codes = new Array(end - i);
		for (let j = i, k = 0; j < end; j++, k++) codes[k] = bytes[j] & 127;
		parts.push(String.fromCharCode.apply(null, codes));
	}
	return parts.join("");
}
function decodeLatin1(bytes) {
	const parts = [];
	for (let i = 0; i < bytes.length; i += CHUNK) {
		const end = Math.min(bytes.length, i + CHUNK);
		const codes = new Array(end - i);
		for (let j = i, k = 0; j < end; j++, k++) codes[k] = bytes[j];
		parts.push(String.fromCharCode.apply(null, codes));
	}
	return parts.join("");
}
function decodeWindows1252(bytes) {
	const parts = [];
	let out = "";
	for (let i = 0; i < bytes.length; i++) {
		const b = bytes[i];
		const extra = b >= 128 && b <= 159 ? WINDOWS_1252_EXTRA[b] : void 0;
		out += extra !== null && extra !== void 0 ? extra : String.fromCharCode(b);
		if (out.length >= CHUNK) {
			parts.push(out);
			out = "";
		}
	}
	if (out) parts.push(out);
	return parts.join("");
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/token-types@6.1.2/node_modules/token-types/lib/index.js
function dv(array) {
	return new DataView(array.buffer, array.byteOffset);
}
var UINT8 = {
	len: 1,
	get(array, offset) {
		return dv(array).getUint8(offset);
	},
	put(array, offset, value) {
		dv(array).setUint8(offset, value);
		return offset + 1;
	}
};
/**
* 16-bit unsigned integer, Little Endian byte order
*/
var UINT16_LE = {
	len: 2,
	get(array, offset) {
		return dv(array).getUint16(offset, true);
	},
	put(array, offset, value) {
		dv(array).setUint16(offset, value, true);
		return offset + 2;
	}
};
/**
* 16-bit unsigned integer, Big Endian byte order
*/
var UINT16_BE = {
	len: 2,
	get(array, offset) {
		return dv(array).getUint16(offset);
	},
	put(array, offset, value) {
		dv(array).setUint16(offset, value);
		return offset + 2;
	}
};
/**
* 32-bit unsigned integer, Little Endian byte order
*/
var UINT32_LE = {
	len: 4,
	get(array, offset) {
		return dv(array).getUint32(offset, true);
	},
	put(array, offset, value) {
		dv(array).setUint32(offset, value, true);
		return offset + 4;
	}
};
/**
* 32-bit unsigned integer, Big Endian byte order
*/
var UINT32_BE = {
	len: 4,
	get(array, offset) {
		return dv(array).getUint32(offset);
	},
	put(array, offset, value) {
		dv(array).setUint32(offset, value);
		return offset + 4;
	}
};
/**
* 32-bit signed integer, Big Endian byte order
*/
var INT32_BE = {
	len: 4,
	get(array, offset) {
		return dv(array).getInt32(offset);
	},
	put(array, offset, value) {
		dv(array).setInt32(offset, value);
		return offset + 4;
	}
};
/**
* 64-bit unsigned integer, Little Endian byte order
*/
var UINT64_LE = {
	len: 8,
	get(array, offset) {
		return dv(array).getBigUint64(offset, true);
	},
	put(array, offset, value) {
		dv(array).setBigUint64(offset, value, true);
		return offset + 8;
	}
};
/**
* Consume a fixed number of bytes from the stream and return a string with a specified encoding.
* Supports all encodings supported by TextDecoder, plus 'windows-1252'.
*/
var StringType = class {
	constructor(len, encoding) {
		this.len = len;
		this.encoding = encoding;
	}
	get(data, offset = 0) {
		return textDecode(data.subarray(offset, offset + this.len), this.encoding);
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/strtok3@10.3.5/node_modules/strtok3/lib/stream/Errors.js
var defaultMessages = "End-Of-Stream";
/**
* Thrown on read operation of the end of file or stream has been reached
*/
var EndOfStreamError = class extends Error {
	constructor() {
		super(defaultMessages);
		this.name = "EndOfStreamError";
	}
};
var AbortError = class extends Error {
	constructor(message = "The operation was aborted") {
		super(message);
		this.name = "AbortError";
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/strtok3@10.3.5/node_modules/strtok3/lib/stream/AbstractStreamReader.js
var AbstractStreamReader = class {
	constructor() {
		this.endOfStream = false;
		this.interrupted = false;
		/**
		* Store peeked data
		* @type {Array}
		*/
		this.peekQueue = [];
	}
	async peek(uint8Array, mayBeLess = false) {
		const bytesRead = await this.read(uint8Array, mayBeLess);
		this.peekQueue.push(uint8Array.subarray(0, bytesRead));
		return bytesRead;
	}
	async read(buffer, mayBeLess = false) {
		if (buffer.length === 0) return 0;
		let bytesRead = this.readFromPeekBuffer(buffer);
		if (!this.endOfStream) bytesRead += await this.readRemainderFromStream(buffer.subarray(bytesRead), mayBeLess);
		if (bytesRead === 0 && !mayBeLess) throw new EndOfStreamError();
		return bytesRead;
	}
	/**
	* Read chunk from stream
	* @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
	* @returns Number of bytes read
	*/
	readFromPeekBuffer(buffer) {
		let remaining = buffer.length;
		let bytesRead = 0;
		while (this.peekQueue.length > 0 && remaining > 0) {
			const peekData = this.peekQueue.pop();
			if (!peekData) throw new Error("peekData should be defined");
			const lenCopy = Math.min(peekData.length, remaining);
			buffer.set(peekData.subarray(0, lenCopy), bytesRead);
			bytesRead += lenCopy;
			remaining -= lenCopy;
			if (lenCopy < peekData.length) this.peekQueue.push(peekData.subarray(lenCopy));
		}
		return bytesRead;
	}
	async readRemainderFromStream(buffer, mayBeLess) {
		let bytesRead = 0;
		while (bytesRead < buffer.length && !this.endOfStream) {
			if (this.interrupted) throw new AbortError();
			const chunkLen = await this.readFromStream(buffer.subarray(bytesRead), mayBeLess);
			if (chunkLen === 0) break;
			bytesRead += chunkLen;
		}
		if (!mayBeLess && bytesRead < buffer.length) throw new EndOfStreamError();
		return bytesRead;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/strtok3@10.3.5/node_modules/strtok3/lib/stream/WebStreamReader.js
var WebStreamReader = class extends AbstractStreamReader {
	constructor(reader) {
		super();
		this.reader = reader;
	}
	async abort() {
		return this.close();
	}
	async close() {
		this.reader.releaseLock();
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/strtok3@10.3.5/node_modules/strtok3/lib/stream/WebStreamByobReader.js
/**
* Read from a WebStream using a BYOB reader
* Reference: https://nodejs.org/api/webstreams.html#class-readablestreambyobreader
*/
var WebStreamByobReader = class extends WebStreamReader {
	/**
	* Read from stream
	* @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
	* @param mayBeLess - If true, may fill the buffer partially
	* @protected Bytes read
	*/
	async readFromStream(buffer, mayBeLess) {
		if (buffer.length === 0) return 0;
		const result = await this.reader.read(new Uint8Array(buffer.length), { min: mayBeLess ? void 0 : buffer.length });
		if (result.done) this.endOfStream = result.done;
		if (result.value) {
			buffer.set(result.value);
			return result.value.length;
		}
		return 0;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/strtok3@10.3.5/node_modules/strtok3/lib/stream/WebStreamDefaultReader.js
var WebStreamDefaultReader = class extends AbstractStreamReader {
	constructor(reader) {
		super();
		this.reader = reader;
		this.buffer = null;
	}
	/**
	* Copy chunk to target, and store the remainder in this.buffer
	*/
	writeChunk(target, chunk) {
		const written = Math.min(chunk.length, target.length);
		target.set(chunk.subarray(0, written));
		if (written < chunk.length) this.buffer = chunk.subarray(written);
		else this.buffer = null;
		return written;
	}
	/**
	* Read from stream
	* @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
	* @param mayBeLess - If true, may fill the buffer partially
	* @protected Bytes read
	*/
	async readFromStream(buffer, mayBeLess) {
		if (buffer.length === 0) return 0;
		let totalBytesRead = 0;
		if (this.buffer) totalBytesRead += this.writeChunk(buffer, this.buffer);
		while (totalBytesRead < buffer.length && !this.endOfStream) {
			const result = await this.reader.read();
			if (result.done) {
				this.endOfStream = true;
				break;
			}
			if (result.value) totalBytesRead += this.writeChunk(buffer.subarray(totalBytesRead), result.value);
		}
		if (!mayBeLess && totalBytesRead === 0 && this.endOfStream) throw new EndOfStreamError();
		return totalBytesRead;
	}
	abort() {
		this.interrupted = true;
		return this.reader.cancel();
	}
	async close() {
		await this.abort();
		this.reader.releaseLock();
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/strtok3@10.3.5/node_modules/strtok3/lib/stream/WebStreamReaderFactory.js
function makeWebStreamReader(stream) {
	try {
		const reader = stream.getReader({ mode: "byob" });
		if (reader instanceof ReadableStreamDefaultReader) return new WebStreamDefaultReader(reader);
		return new WebStreamByobReader(reader);
	} catch (error) {
		if (error instanceof TypeError) return new WebStreamDefaultReader(stream.getReader());
		throw error;
	}
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/strtok3@10.3.5/node_modules/strtok3/lib/AbstractTokenizer.js
/**
* Core tokenizer
*/
var AbstractTokenizer = class {
	/**
	* Constructor
	* @param options Tokenizer options
	* @protected
	*/
	constructor(options) {
		this.numBuffer = /* @__PURE__ */ new Uint8Array(8);
		/**
		* Tokenizer-stream position
		*/
		this.position = 0;
		this.onClose = options?.onClose;
		if (options?.abortSignal) options.abortSignal.addEventListener("abort", () => {
			this.abort();
		});
	}
	/**
	* Read a token from the tokenizer-stream
	* @param token - The token to read
	* @param position - If provided, the desired position in the tokenizer-stream
	* @returns Promise with token data
	*/
	async readToken(token, position = this.position) {
		const uint8Array = new Uint8Array(token.len);
		if (await this.readBuffer(uint8Array, { position }) < token.len) throw new EndOfStreamError();
		return token.get(uint8Array, 0);
	}
	/**
	* Peek a token from the tokenizer-stream.
	* @param token - Token to peek from the tokenizer-stream.
	* @param position - Offset where to begin reading within the file. If position is null, data will be read from the current file position.
	* @returns Promise with token data
	*/
	async peekToken(token, position = this.position) {
		const uint8Array = new Uint8Array(token.len);
		if (await this.peekBuffer(uint8Array, { position }) < token.len) throw new EndOfStreamError();
		return token.get(uint8Array, 0);
	}
	/**
	* Read a numeric token from the stream
	* @param token - Numeric token
	* @returns Promise with number
	*/
	async readNumber(token) {
		if (await this.readBuffer(this.numBuffer, { length: token.len }) < token.len) throw new EndOfStreamError();
		return token.get(this.numBuffer, 0);
	}
	/**
	* Read a numeric token from the stream
	* @param token - Numeric token
	* @returns Promise with number
	*/
	async peekNumber(token) {
		if (await this.peekBuffer(this.numBuffer, { length: token.len }) < token.len) throw new EndOfStreamError();
		return token.get(this.numBuffer, 0);
	}
	/**
	* Ignore number of bytes, advances the pointer in under tokenizer-stream.
	* @param length - Number of bytes to ignore.  Must be ≥ 0.
	* @return resolves the number of bytes ignored, equals length if this available, otherwise the number of bytes available
	*/
	async ignore(length) {
		if (length < 0) throw new RangeError("ignore length must be ≥ 0 bytes");
		if (this.fileInfo.size !== void 0) {
			const bytesLeft = this.fileInfo.size - this.position;
			if (length > bytesLeft) {
				this.position += bytesLeft;
				return bytesLeft;
			}
		}
		this.position += length;
		return length;
	}
	async close() {
		await this.abort();
		await this.onClose?.();
	}
	normalizeOptions(uint8Array, options) {
		if (!this.supportsRandomAccess() && options && options.position !== void 0 && options.position < this.position) throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
		return {
			mayBeLess: false,
			offset: 0,
			length: uint8Array.length,
			position: this.position,
			...options
		};
	}
	abort() {
		return Promise.resolve();
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/strtok3@10.3.5/node_modules/strtok3/lib/ReadStreamTokenizer.js
var maxBufferSize = 256e3;
var ReadStreamTokenizer = class extends AbstractTokenizer {
	/**
	* Constructor
	* @param streamReader stream-reader to read from
	* @param options Tokenizer options
	*/
	constructor(streamReader, options) {
		super(options);
		this.streamReader = streamReader;
		this.fileInfo = options?.fileInfo ?? {};
	}
	/**
	* Read buffer from tokenizer
	* @param uint8Array - Target Uint8Array to fill with data read from the tokenizer-stream
	* @param options - Read behaviour options
	* @returns Promise with number of bytes read
	*/
	async readBuffer(uint8Array, options) {
		const normOptions = this.normalizeOptions(uint8Array, options);
		const skipBytes = normOptions.position - this.position;
		if (skipBytes > 0) {
			await this.ignore(skipBytes);
			return this.readBuffer(uint8Array, options);
		}
		if (skipBytes < 0) throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
		if (normOptions.length === 0) return 0;
		const bytesRead = await this.streamReader.read(uint8Array.subarray(0, normOptions.length), normOptions.mayBeLess);
		this.position += bytesRead;
		if ((!options || !options.mayBeLess) && bytesRead < normOptions.length) throw new EndOfStreamError();
		return bytesRead;
	}
	/**
	* Peek (read ahead) buffer from tokenizer
	* @param uint8Array - Uint8Array (or Buffer) to write data to
	* @param options - Read behaviour options
	* @returns Promise with number of bytes peeked
	*/
	async peekBuffer(uint8Array, options) {
		const normOptions = this.normalizeOptions(uint8Array, options);
		let bytesRead = 0;
		if (normOptions.position) {
			const skipBytes = normOptions.position - this.position;
			if (skipBytes > 0) {
				const skipBuffer = new Uint8Array(normOptions.length + skipBytes);
				bytesRead = await this.peekBuffer(skipBuffer, { mayBeLess: normOptions.mayBeLess });
				uint8Array.set(skipBuffer.subarray(skipBytes));
				return bytesRead - skipBytes;
			}
			if (skipBytes < 0) throw new Error("Cannot peek from a negative offset in a stream");
		}
		if (normOptions.length > 0) {
			try {
				bytesRead = await this.streamReader.peek(uint8Array.subarray(0, normOptions.length), normOptions.mayBeLess);
			} catch (err) {
				if (options?.mayBeLess && err instanceof EndOfStreamError) return 0;
				throw err;
			}
			if (!normOptions.mayBeLess && bytesRead < normOptions.length) throw new EndOfStreamError();
		}
		return bytesRead;
	}
	/**
	* @param length Number of bytes to ignore. Must be ≥ 0.
	*/
	async ignore(length) {
		if (length < 0) throw new RangeError("ignore length must be ≥ 0 bytes");
		const bufSize = Math.min(maxBufferSize, length);
		const buf = new Uint8Array(bufSize);
		let totBytesRead = 0;
		while (totBytesRead < length) {
			const remaining = length - totBytesRead;
			const bytesRead = await this.readBuffer(buf, { length: Math.min(bufSize, remaining) });
			if (bytesRead < 0) return bytesRead;
			totBytesRead += bytesRead;
		}
		return totBytesRead;
	}
	abort() {
		return this.streamReader.abort();
	}
	async close() {
		return this.streamReader.close();
	}
	supportsRandomAccess() {
		return false;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/strtok3@10.3.5/node_modules/strtok3/lib/BufferTokenizer.js
var BufferTokenizer = class extends AbstractTokenizer {
	/**
	* Construct BufferTokenizer
	* @param uint8Array - Uint8Array to tokenize
	* @param options Tokenizer options
	*/
	constructor(uint8Array, options) {
		super(options);
		this.uint8Array = uint8Array;
		this.fileInfo = {
			...options?.fileInfo ?? {},
			size: uint8Array.length
		};
	}
	/**
	* Read buffer from tokenizer
	* @param uint8Array - Uint8Array to tokenize
	* @param options - Read behaviour options
	* @returns {Promise<number>}
	*/
	async readBuffer(uint8Array, options) {
		if (options?.position) this.position = options.position;
		const bytesRead = await this.peekBuffer(uint8Array, options);
		this.position += bytesRead;
		return bytesRead;
	}
	/**
	* Peek (read ahead) buffer from tokenizer
	* @param uint8Array
	* @param options - Read behaviour options
	* @returns {Promise<number>}
	*/
	async peekBuffer(uint8Array, options) {
		const normOptions = this.normalizeOptions(uint8Array, options);
		const bytes2read = Math.min(this.uint8Array.length - normOptions.position, normOptions.length);
		if (!normOptions.mayBeLess && bytes2read < normOptions.length) throw new EndOfStreamError();
		uint8Array.set(this.uint8Array.subarray(normOptions.position, normOptions.position + bytes2read));
		return bytes2read;
	}
	close() {
		return super.close();
	}
	supportsRandomAccess() {
		return true;
	}
	setPosition(position) {
		this.position = position;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/strtok3@10.3.5/node_modules/strtok3/lib/BlobTokenizer.js
var BlobTokenizer = class extends AbstractTokenizer {
	/**
	* Construct BufferTokenizer
	* @param blob - Uint8Array to tokenize
	* @param options Tokenizer options
	*/
	constructor(blob, options) {
		super(options);
		this.blob = blob;
		this.fileInfo = {
			...options?.fileInfo ?? {},
			size: blob.size,
			mimeType: blob.type
		};
	}
	/**
	* Read buffer from tokenizer
	* @param uint8Array - Uint8Array to tokenize
	* @param options - Read behaviour options
	* @returns {Promise<number>}
	*/
	async readBuffer(uint8Array, options) {
		if (options?.position) this.position = options.position;
		const bytesRead = await this.peekBuffer(uint8Array, options);
		this.position += bytesRead;
		return bytesRead;
	}
	/**
	* Peek (read ahead) buffer from tokenizer
	* @param buffer
	* @param options - Read behaviour options
	* @returns {Promise<number>}
	*/
	async peekBuffer(buffer, options) {
		const normOptions = this.normalizeOptions(buffer, options);
		const bytes2read = Math.min(this.blob.size - normOptions.position, normOptions.length);
		if (!normOptions.mayBeLess && bytes2read < normOptions.length) throw new EndOfStreamError();
		const arrayBuffer = await this.blob.slice(normOptions.position, normOptions.position + bytes2read).arrayBuffer();
		buffer.set(new Uint8Array(arrayBuffer));
		return bytes2read;
	}
	close() {
		return super.close();
	}
	supportsRandomAccess() {
		return true;
	}
	setPosition(position) {
		this.position = position;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/strtok3@10.3.5/node_modules/strtok3/lib/core.js
/**
* Construct ReadStreamTokenizer from given ReadableStream (WebStream API).
* Will set fileSize, if provided given Stream has set the .path property/
* @param webStream - Read from Node.js Stream.Readable (must be a byte stream)
* @param options - Tokenizer options
* @returns ReadStreamTokenizer
*/
function fromWebStream(webStream, options) {
	const webStreamReader = makeWebStreamReader(webStream);
	const _options = options ?? {};
	const chainedClose = _options.onClose;
	_options.onClose = async () => {
		await webStreamReader.close();
		if (chainedClose) return chainedClose();
	};
	return new ReadStreamTokenizer(webStreamReader, _options);
}
/**
* Construct ReadStreamTokenizer from given Buffer.
* @param uint8Array - Uint8Array to tokenize
* @param options - Tokenizer options
* @returns BufferTokenizer
*/
function fromBuffer(uint8Array, options) {
	return new BufferTokenizer(uint8Array, options);
}
/**
* Construct ReadStreamTokenizer from given Blob.
* @param blob - Uint8Array to tokenize
* @param options - Tokenizer options
* @returns BufferTokenizer
*/
function fromBlob(blob, options) {
	return new BlobTokenizer(blob, options);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Helpers.
	*/
	var s = 1e3;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;
	/**
	* Parse or format the given `val`.
	*
	* Options:
	*
	*  - `long` verbose formatting [false]
	*
	* @param {String|Number} val
	* @param {Object} [options]
	* @throws {Error} throw an error if val is not a non-empty string or a number
	* @return {String|Number}
	* @api public
	*/
	module.exports = function(val, options) {
		options = options || {};
		var type = typeof val;
		if (type === "string" && val.length > 0) return parse(val);
		else if (type === "number" && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
	};
	/**
	* Parse the given `str` and return milliseconds.
	*
	* @param {String} str
	* @return {Number}
	* @api private
	*/
	function parse(str) {
		str = String(str);
		if (str.length > 100) return;
		var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
		if (!match) return;
		var n = parseFloat(match[1]);
		switch ((match[2] || "ms").toLowerCase()) {
			case "years":
			case "year":
			case "yrs":
			case "yr":
			case "y": return n * y;
			case "weeks":
			case "week":
			case "w": return n * w;
			case "days":
			case "day":
			case "d": return n * d;
			case "hours":
			case "hour":
			case "hrs":
			case "hr":
			case "h": return n * h;
			case "minutes":
			case "minute":
			case "mins":
			case "min":
			case "m": return n * m;
			case "seconds":
			case "second":
			case "secs":
			case "sec":
			case "s": return n * s;
			case "milliseconds":
			case "millisecond":
			case "msecs":
			case "msec":
			case "ms": return n;
			default: return;
		}
	}
	/**
	* Short format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtShort(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return Math.round(ms / d) + "d";
		if (msAbs >= h) return Math.round(ms / h) + "h";
		if (msAbs >= m) return Math.round(ms / m) + "m";
		if (msAbs >= s) return Math.round(ms / s) + "s";
		return ms + "ms";
	}
	/**
	* Long format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtLong(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return plural(ms, msAbs, d, "day");
		if (msAbs >= h) return plural(ms, msAbs, h, "hour");
		if (msAbs >= m) return plural(ms, msAbs, m, "minute");
		if (msAbs >= s) return plural(ms, msAbs, s, "second");
		return ms + " ms";
	}
	/**
	* Pluralization helper.
	*/
	function plural(ms, msAbs, n, name) {
		var isPlural = msAbs >= n * 1.5;
		return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
	}
}));
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js
var require_common = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the common logic for both the Node.js and web browser
	* implementations of `debug()`.
	*/
	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = require_ms();
		createDebug.destroy = destroy;
		Object.keys(env).forEach((key) => {
			createDebug[key] = env[key];
		});
		/**
		* The currently active debug mode names, and names to skip.
		*/
		createDebug.names = [];
		createDebug.skips = [];
		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};
		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;
			for (let i = 0; i < namespace.length; i++) {
				hash = (hash << 5) - hash + namespace.charCodeAt(i);
				hash |= 0;
			}
			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;
		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;
			function debug(...args) {
				if (!debug.enabled) return;
				const self = debug;
				const curr = Number(/* @__PURE__ */ new Date());
				self.diff = curr - (prevTime || curr);
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;
				args[0] = createDebug.coerce(args[0]);
				if (typeof args[0] !== "string") args.unshift("%O");
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					if (match === "%%") return "%";
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === "function") {
						const val = args[index];
						match = formatter.call(self, val);
						args.splice(index, 1);
						index--;
					}
					return match;
				});
				createDebug.formatArgs.call(self, args);
				(self.log || createDebug.log).apply(self, args);
			}
			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy;
			Object.defineProperty(debug, "enabled", {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) return enableOverride;
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}
					return enabledCache;
				},
				set: (v) => {
					enableOverride = v;
				}
			});
			if (typeof createDebug.init === "function") createDebug.init(debug);
			return debug;
		}
		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}
		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;
			createDebug.names = [];
			createDebug.skips = [];
			const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
			for (const ns of split) if (ns[0] === "-") createDebug.skips.push(ns.slice(1));
			else createDebug.names.push(ns);
		}
		/**
		* Checks if the given string matches a namespace template, honoring
		* asterisks as wildcards.
		*
		* @param {String} search
		* @param {String} template
		* @return {Boolean}
		*/
		function matchesTemplate(search, template) {
			let searchIndex = 0;
			let templateIndex = 0;
			let starIndex = -1;
			let matchIndex = 0;
			while (searchIndex < search.length) if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
				if (template[templateIndex] === "*") {
					starIndex = templateIndex;
					matchIndex = searchIndex;
					templateIndex++;
				} else {
					searchIndex++;
					templateIndex++;
				}
			} else if (starIndex !== -1) {
				templateIndex = starIndex + 1;
				matchIndex++;
				searchIndex = matchIndex;
			} else return false;
			while (templateIndex < template.length && template[templateIndex] === "*") templateIndex++;
			return templateIndex === template.length;
		}
		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [...createDebug.names, ...createDebug.skips.map((namespace) => "-" + namespace)].join(",");
			createDebug.enable("");
			return namespaces;
		}
		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			for (const skip of createDebug.skips) if (matchesTemplate(name, skip)) return false;
			for (const ns of createDebug.names) if (matchesTemplate(name, ns)) return true;
			return false;
		}
		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) return val.stack || val.message;
			return val;
		}
		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
		}
		createDebug.enable(createDebug.load());
		return createDebug;
	}
	module.exports = setup;
}));
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tokenizer+inflate@0.4.1/node_modules/@tokenizer/inflate/lib/ZipToken.js
var import_browser = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the web browser implementation of `debug()`.
	*/
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = localstorage();
	exports.destroy = (() => {
		let warned = false;
		return () => {
			if (!warned) {
				warned = true;
				console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
			}
		};
	})();
	/**
	* Colors.
	*/
	exports.colors = [
		"#0000CC",
		"#0000FF",
		"#0033CC",
		"#0033FF",
		"#0066CC",
		"#0066FF",
		"#0099CC",
		"#0099FF",
		"#00CC00",
		"#00CC33",
		"#00CC66",
		"#00CC99",
		"#00CCCC",
		"#00CCFF",
		"#3300CC",
		"#3300FF",
		"#3333CC",
		"#3333FF",
		"#3366CC",
		"#3366FF",
		"#3399CC",
		"#3399FF",
		"#33CC00",
		"#33CC33",
		"#33CC66",
		"#33CC99",
		"#33CCCC",
		"#33CCFF",
		"#6600CC",
		"#6600FF",
		"#6633CC",
		"#6633FF",
		"#66CC00",
		"#66CC33",
		"#9900CC",
		"#9900FF",
		"#9933CC",
		"#9933FF",
		"#99CC00",
		"#99CC33",
		"#CC0000",
		"#CC0033",
		"#CC0066",
		"#CC0099",
		"#CC00CC",
		"#CC00FF",
		"#CC3300",
		"#CC3333",
		"#CC3366",
		"#CC3399",
		"#CC33CC",
		"#CC33FF",
		"#CC6600",
		"#CC6633",
		"#CC9900",
		"#CC9933",
		"#CCCC00",
		"#CCCC33",
		"#FF0000",
		"#FF0033",
		"#FF0066",
		"#FF0099",
		"#FF00CC",
		"#FF00FF",
		"#FF3300",
		"#FF3333",
		"#FF3366",
		"#FF3399",
		"#FF33CC",
		"#FF33FF",
		"#FF6600",
		"#FF6633",
		"#FF9900",
		"#FF9933",
		"#FFCC00",
		"#FFCC33"
	];
	/**
	* Currently only WebKit-based Web Inspectors, Firefox >= v31,
	* and the Firebug extension (any Firefox version) are known
	* to support "%c" CSS customizations.
	*
	* TODO: add a `localStorage` variable to explicitly enable/disable colors
	*/
	function useColors() {
		if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
		if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
		let m;
		return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	* Colorize log arguments if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
		if (!this.useColors) return;
		const c = "color: " + this.color;
		args.splice(1, 0, c, "color: inherit");
		let index = 0;
		let lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, (match) => {
			if (match === "%%") return;
			index++;
			if (match === "%c") lastC = index;
		});
		args.splice(lastC, 0, c);
	}
	/**
	* Invokes `console.debug()` when available.
	* No-op when `console.debug` is not a "function".
	* If `console.debug` is not available, falls back
	* to `console.log`.
	*
	* @api public
	*/
	exports.log = console.debug || console.log || (() => {});
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		try {
			if (namespaces) exports.storage.setItem("debug", namespaces);
			else exports.storage.removeItem("debug");
		} catch (error) {}
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		let r;
		try {
			r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
		} catch (error) {}
		if (!r && typeof process !== "undefined" && "env" in process) r = {}.DEBUG;
		return r;
	}
	/**
	* Localstorage attempts to return the localstorage.
	*
	* This is necessary because safari throws
	* when a user disables cookies/localstorage
	* and you attempt to access it.
	*
	* @return {LocalStorage}
	* @api private
	*/
	function localstorage() {
		try {
			return localStorage;
		} catch (error) {}
	}
	module.exports = require_common()(exports);
	var { formatters } = module.exports;
	/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/
	formatters.j = function(v) {
		try {
			return JSON.stringify(v);
		} catch (error) {
			return "[UnexpectedJSONParseError]: " + error.message;
		}
	};
})))(), 1);
/**
* Ref https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT
*/
var Signature = {
	LocalFileHeader: 67324752,
	DataDescriptor: 134695760,
	CentralFileHeader: 33639248,
	EndOfCentralDirectory: 101010256
};
var DataDescriptor = {
	get(array) {
		return {
			signature: UINT32_LE.get(array, 0),
			compressedSize: UINT32_LE.get(array, 8),
			uncompressedSize: UINT32_LE.get(array, 12)
		};
	},
	len: 16
};
/**
* First part of the ZIP Local File Header
* Offset | Bytes| Description
* -------|------+-------------------------------------------------------------------
*      0 |    4 | Signature (0x04034b50)
*      4 |    2 | Minimum version needed to extract
*      6 |    2 | Bit flag
*      8 |    2 | Compression method
*     10 |    2 | File last modification time (MS-DOS format)
*     12 |    2 | File last modification date (MS-DOS format)
*     14 |    4 | CRC-32 of uncompressed data
*     18 |    4 | Compressed size
*     22 |    4 | Uncompressed size
*     26 |    2 | File name length (n)
*     28 |    2 | Extra field length (m)
*     30 |    n | File name
* 30 + n |    m | Extra field
*/
var LocalFileHeaderToken = {
	get(array) {
		const flags = UINT16_LE.get(array, 6);
		return {
			signature: UINT32_LE.get(array, 0),
			minVersion: UINT16_LE.get(array, 4),
			dataDescriptor: !!(flags & 8),
			compressedMethod: UINT16_LE.get(array, 8),
			compressedSize: UINT32_LE.get(array, 18),
			uncompressedSize: UINT32_LE.get(array, 22),
			filenameLength: UINT16_LE.get(array, 26),
			extraFieldLength: UINT16_LE.get(array, 28),
			filename: null
		};
	},
	len: 30
};
/**
* 4.3.16  End of central directory record:
*  end of central dir signature (0x06064b50)                                      4 bytes
*  number of this disk                                                            2 bytes
*  number of the disk with the start of the central directory                     2 bytes
*  total number of entries in the central directory on this disk                  2 bytes
*  total number of entries in the size of the central directory                   2 bytes
*  sizeOfTheCentralDirectory                                                      4 bytes
*  offset of start of central directory with respect to the starting disk number  4 bytes
*  .ZIP file comment length                                                       2 bytes
*  .ZIP file comment       (variable size)
*/
var EndOfCentralDirectoryRecordToken = {
	get(array) {
		return {
			signature: UINT32_LE.get(array, 0),
			nrOfThisDisk: UINT16_LE.get(array, 4),
			nrOfThisDiskWithTheStart: UINT16_LE.get(array, 6),
			nrOfEntriesOnThisDisk: UINT16_LE.get(array, 8),
			nrOfEntriesOfSize: UINT16_LE.get(array, 10),
			sizeOfCd: UINT32_LE.get(array, 12),
			offsetOfStartOfCd: UINT32_LE.get(array, 16),
			zipFileCommentLength: UINT16_LE.get(array, 20)
		};
	},
	len: 22
};
/**
* File header:
*    central file header signature   4 bytes   0 (0x02014b50)
*    version made by                 2 bytes   4
*    version needed to extract       2 bytes   6
*    general purpose bit flag        2 bytes   8
*    compression method              2 bytes  10
*    last mod file time              2 bytes  12
*    last mod file date              2 bytes  14
*    crc-32                          4 bytes  16
*    compressed size                 4 bytes  20
*    uncompressed size               4 bytes  24
*    file name length                2 bytes  28
*    extra field length              2 bytes  30
*    file comment length             2 bytes  32
*    disk number start               2 bytes  34
*    internal file attributes        2 bytes  36
*    external file attributes        4 bytes  38
*    relative offset of local header 4 bytes  42
*/
var FileHeader = {
	get(array) {
		const flags = UINT16_LE.get(array, 8);
		return {
			signature: UINT32_LE.get(array, 0),
			minVersion: UINT16_LE.get(array, 6),
			dataDescriptor: !!(flags & 8),
			compressedMethod: UINT16_LE.get(array, 10),
			compressedSize: UINT32_LE.get(array, 20),
			uncompressedSize: UINT32_LE.get(array, 24),
			filenameLength: UINT16_LE.get(array, 28),
			extraFieldLength: UINT16_LE.get(array, 30),
			fileCommentLength: UINT16_LE.get(array, 32),
			relativeOffsetOfLocalHeader: UINT32_LE.get(array, 42),
			filename: null
		};
	},
	len: 46
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tokenizer+inflate@0.4.1/node_modules/@tokenizer/inflate/lib/ZipHandler.js
function signatureToArray(signature) {
	const signatureBytes = new Uint8Array(UINT32_LE.len);
	UINT32_LE.put(signatureBytes, 0, signature);
	return signatureBytes;
}
var debug = (0, import_browser.default)("tokenizer:inflate");
var syncBufferSize = 262144;
var ddSignatureArray = signatureToArray(Signature.DataDescriptor);
var eocdSignatureBytes = signatureToArray(Signature.EndOfCentralDirectory);
var ZipHandler = class ZipHandler {
	constructor(tokenizer) {
		this.tokenizer = tokenizer;
		this.syncBuffer = new Uint8Array(syncBufferSize);
	}
	async isZip() {
		return await this.peekSignature() === Signature.LocalFileHeader;
	}
	peekSignature() {
		return this.tokenizer.peekToken(UINT32_LE);
	}
	async findEndOfCentralDirectoryLocator() {
		const randomReadTokenizer = this.tokenizer;
		const chunkLength = Math.min(16384, randomReadTokenizer.fileInfo.size);
		const buffer = this.syncBuffer.subarray(0, chunkLength);
		await this.tokenizer.readBuffer(buffer, { position: randomReadTokenizer.fileInfo.size - chunkLength });
		for (let i = buffer.length - 4; i >= 0; i--) if (buffer[i] === eocdSignatureBytes[0] && buffer[i + 1] === eocdSignatureBytes[1] && buffer[i + 2] === eocdSignatureBytes[2] && buffer[i + 3] === eocdSignatureBytes[3]) return randomReadTokenizer.fileInfo.size - chunkLength + i;
		return -1;
	}
	async readCentralDirectory() {
		if (!this.tokenizer.supportsRandomAccess()) {
			debug("Cannot reading central-directory without random-read support");
			return;
		}
		debug("Reading central-directory...");
		const pos = this.tokenizer.position;
		const offset = await this.findEndOfCentralDirectoryLocator();
		if (offset > 0) {
			debug("Central-directory 32-bit signature found");
			const eocdHeader = await this.tokenizer.readToken(EndOfCentralDirectoryRecordToken, offset);
			const files = [];
			this.tokenizer.setPosition(eocdHeader.offsetOfStartOfCd);
			for (let n = 0; n < eocdHeader.nrOfEntriesOfSize; ++n) {
				const entry = await this.tokenizer.readToken(FileHeader);
				if (entry.signature !== Signature.CentralFileHeader) throw new Error("Expected Central-File-Header signature");
				entry.filename = await this.tokenizer.readToken(new StringType(entry.filenameLength, "utf-8"));
				await this.tokenizer.ignore(entry.extraFieldLength);
				await this.tokenizer.ignore(entry.fileCommentLength);
				files.push(entry);
				debug(`Add central-directory file-entry: n=${n + 1}/${files.length}: filename=${files[n].filename}`);
			}
			this.tokenizer.setPosition(pos);
			return files;
		}
		this.tokenizer.setPosition(pos);
	}
	async unzip(fileCb) {
		const entries = await this.readCentralDirectory();
		if (entries) return this.iterateOverCentralDirectory(entries, fileCb);
		let stop = false;
		do {
			const zipHeader = await this.readLocalFileHeader();
			if (!zipHeader) break;
			const next = fileCb(zipHeader);
			stop = !!next.stop;
			let fileData;
			await this.tokenizer.ignore(zipHeader.extraFieldLength);
			if (zipHeader.dataDescriptor && zipHeader.compressedSize === 0) {
				const chunks = [];
				let len = syncBufferSize;
				debug("Compressed-file-size unknown, scanning for next data-descriptor-signature....");
				let nextHeaderIndex = -1;
				while (nextHeaderIndex < 0 && len === syncBufferSize) {
					len = await this.tokenizer.peekBuffer(this.syncBuffer, { mayBeLess: true });
					nextHeaderIndex = indexOf(this.syncBuffer.subarray(0, len), ddSignatureArray);
					const size = nextHeaderIndex >= 0 ? nextHeaderIndex : len;
					if (next.handler) {
						const data = new Uint8Array(size);
						await this.tokenizer.readBuffer(data);
						chunks.push(data);
					} else await this.tokenizer.ignore(size);
				}
				debug(`Found data-descriptor-signature at pos=${this.tokenizer.position}`);
				if (next.handler) await this.inflate(zipHeader, mergeArrays(chunks), next.handler);
			} else if (next.handler) {
				debug(`Reading compressed-file-data: ${zipHeader.compressedSize} bytes`);
				fileData = new Uint8Array(zipHeader.compressedSize);
				await this.tokenizer.readBuffer(fileData);
				await this.inflate(zipHeader, fileData, next.handler);
			} else {
				debug(`Ignoring compressed-file-data: ${zipHeader.compressedSize} bytes`);
				await this.tokenizer.ignore(zipHeader.compressedSize);
			}
			debug(`Reading data-descriptor at pos=${this.tokenizer.position}`);
			if (zipHeader.dataDescriptor) {
				if ((await this.tokenizer.readToken(DataDescriptor)).signature !== 134695760) throw new Error(`Expected data-descriptor-signature at position ${this.tokenizer.position - DataDescriptor.len}`);
			}
		} while (!stop);
	}
	async iterateOverCentralDirectory(entries, fileCb) {
		for (const fileHeader of entries) {
			const next = fileCb(fileHeader);
			if (next.handler) {
				this.tokenizer.setPosition(fileHeader.relativeOffsetOfLocalHeader);
				const zipHeader = await this.readLocalFileHeader();
				if (zipHeader) {
					await this.tokenizer.ignore(zipHeader.extraFieldLength);
					const fileData = new Uint8Array(fileHeader.compressedSize);
					await this.tokenizer.readBuffer(fileData);
					await this.inflate(zipHeader, fileData, next.handler);
				}
			}
			if (next.stop) break;
		}
	}
	async inflate(zipHeader, fileData, cb) {
		if (zipHeader.compressedMethod === 0) return cb(fileData);
		if (zipHeader.compressedMethod !== 8) throw new Error(`Unsupported ZIP compression method: ${zipHeader.compressedMethod}`);
		debug(`Decompress filename=${zipHeader.filename}, compressed-size=${fileData.length}`);
		return cb(await ZipHandler.decompressDeflateRaw(fileData));
	}
	static async decompressDeflateRaw(data) {
		const input = new ReadableStream({ start(controller) {
			controller.enqueue(data);
			controller.close();
		} });
		const ds = new DecompressionStream("deflate-raw");
		const output = input.pipeThrough(ds);
		try {
			const buffer = await new Response(output).arrayBuffer();
			return new Uint8Array(buffer);
		} catch (err) {
			const message = err instanceof Error ? `Failed to deflate ZIP entry: ${err.message}` : "Unknown decompression error in ZIP entry";
			throw new TypeError(message);
		}
	}
	async readLocalFileHeader() {
		const signature = await this.tokenizer.peekToken(UINT32_LE);
		if (signature === Signature.LocalFileHeader) {
			const header = await this.tokenizer.readToken(LocalFileHeaderToken);
			header.filename = await this.tokenizer.readToken(new StringType(header.filenameLength, "utf-8"));
			return header;
		}
		if (signature === Signature.CentralFileHeader) return false;
		if (signature === 3759263696) throw new Error("Encrypted ZIP");
		throw new Error("Unexpected signature");
	}
};
function indexOf(buffer, portion) {
	const bufferLength = buffer.length;
	const portionLength = portion.length;
	if (portionLength > bufferLength) return -1;
	for (let i = 0; i <= bufferLength - portionLength; i++) {
		let found = true;
		for (let j = 0; j < portionLength; j++) if (buffer[i + j] !== portion[j]) {
			found = false;
			break;
		}
		if (found) return i;
	}
	return -1;
}
function mergeArrays(chunks) {
	const totalLength = chunks.reduce((acc, curr) => acc + curr.length, 0);
	const mergedArray = new Uint8Array(totalLength);
	let offset = 0;
	for (const chunk of chunks) {
		mergedArray.set(chunk, offset);
		offset += chunk.length;
	}
	return mergedArray;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tokenizer+inflate@0.4.1/node_modules/@tokenizer/inflate/lib/GzipHandler.js
var GzipHandler = class {
	constructor(tokenizer) {
		this.tokenizer = tokenizer;
	}
	inflate() {
		const tokenizer = this.tokenizer;
		return new ReadableStream({ async pull(controller) {
			const buffer = /* @__PURE__ */ new Uint8Array(1024);
			const size = await tokenizer.readBuffer(buffer, { mayBeLess: true });
			if (size === 0) {
				controller.close();
				return;
			}
			controller.enqueue(buffer.subarray(0, size));
		} }).pipeThrough(new DecompressionStream("gzip"));
	}
};
new globalThis.TextDecoder("utf8");
new globalThis.TextEncoder();
Array.from({ length: 256 }, (_, index) => index.toString(16).padStart(2, "0"));
/**
@param {DataView} view
@returns {number}
*/
function getUintBE(view) {
	const { byteLength } = view;
	if (byteLength === 6) return view.getUint16(0) * 2 ** 32 + view.getUint32(2);
	if (byteLength === 5) return view.getUint8(0) * 2 ** 32 + view.getUint32(1);
	if (byteLength === 4) return view.getUint32(0);
	if (byteLength === 3) return view.getUint8(0) * 2 ** 16 + view.getUint16(1);
	if (byteLength === 2) return view.getUint16(0);
	if (byteLength === 1) return view.getUint8(0);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/file-type@21.3.4/node_modules/file-type/util.js
function stringToBytes(string, encoding) {
	if (encoding === "utf-16le") {
		const bytes = [];
		for (let index = 0; index < string.length; index++) {
			const code = string.charCodeAt(index);
			bytes.push(code & 255, code >> 8 & 255);
		}
		return bytes;
	}
	if (encoding === "utf-16be") {
		const bytes = [];
		for (let index = 0; index < string.length; index++) {
			const code = string.charCodeAt(index);
			bytes.push(code >> 8 & 255, code & 255);
		}
		return bytes;
	}
	return [...string].map((character) => character.charCodeAt(0));
}
/**
Checks whether the TAR checksum is valid.

@param {Uint8Array} arrayBuffer - The TAR header `[offset ... offset + 512]`.
@param {number} offset - TAR header offset.
@returns {boolean} `true` if the TAR checksum is valid, otherwise `false`.
*/
function tarHeaderChecksumMatches(arrayBuffer, offset = 0) {
	const readSum = Number.parseInt(new StringType(6).get(arrayBuffer, 148).replace(/\0.*$/, "").trim(), 8);
	if (Number.isNaN(readSum)) return false;
	let sum = 256;
	for (let index = offset; index < offset + 148; index++) sum += arrayBuffer[index];
	for (let index = offset + 156; index < offset + 512; index++) sum += arrayBuffer[index];
	return readSum === sum;
}
/**
ID3 UINT32 sync-safe tokenizer token.
28 bits (representing up to 256MB) integer, the msb is 0 to avoid "false syncsignals".
*/
var uint32SyncSafeToken = {
	get: (buffer, offset) => buffer[offset + 3] & 127 | buffer[offset + 2] << 7 | buffer[offset + 1] << 14 | buffer[offset] << 21,
	len: 4
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/file-type@21.3.4/node_modules/file-type/supported.js
var extensions = [
	"jpg",
	"png",
	"apng",
	"gif",
	"webp",
	"flif",
	"xcf",
	"cr2",
	"cr3",
	"orf",
	"arw",
	"dng",
	"nef",
	"rw2",
	"raf",
	"tif",
	"bmp",
	"icns",
	"jxr",
	"psd",
	"indd",
	"zip",
	"tar",
	"rar",
	"gz",
	"bz2",
	"7z",
	"dmg",
	"mp4",
	"mid",
	"mkv",
	"webm",
	"mov",
	"avi",
	"mpg",
	"mp2",
	"mp3",
	"m4a",
	"oga",
	"ogg",
	"ogv",
	"opus",
	"flac",
	"wav",
	"spx",
	"amr",
	"pdf",
	"epub",
	"elf",
	"macho",
	"exe",
	"swf",
	"rtf",
	"wasm",
	"woff",
	"woff2",
	"eot",
	"ttf",
	"otf",
	"ttc",
	"ico",
	"flv",
	"ps",
	"xz",
	"sqlite",
	"nes",
	"crx",
	"xpi",
	"cab",
	"deb",
	"ar",
	"rpm",
	"Z",
	"lz",
	"cfb",
	"mxf",
	"mts",
	"blend",
	"bpg",
	"docx",
	"pptx",
	"xlsx",
	"3gp",
	"3g2",
	"j2c",
	"jp2",
	"jpm",
	"jpx",
	"mj2",
	"aif",
	"qcp",
	"odt",
	"ods",
	"odp",
	"xml",
	"mobi",
	"heic",
	"cur",
	"ktx",
	"ape",
	"wv",
	"dcm",
	"ics",
	"glb",
	"pcap",
	"dsf",
	"lnk",
	"alias",
	"voc",
	"ac3",
	"m4v",
	"m4p",
	"m4b",
	"f4v",
	"f4p",
	"f4b",
	"f4a",
	"mie",
	"asf",
	"ogm",
	"ogx",
	"mpc",
	"arrow",
	"shp",
	"aac",
	"mp1",
	"it",
	"s3m",
	"xm",
	"skp",
	"avif",
	"eps",
	"lzh",
	"pgp",
	"asar",
	"stl",
	"chm",
	"3mf",
	"zst",
	"jxl",
	"vcf",
	"jls",
	"pst",
	"dwg",
	"parquet",
	"class",
	"arj",
	"cpio",
	"ace",
	"avro",
	"icc",
	"fbx",
	"vsdx",
	"vtt",
	"apk",
	"drc",
	"lz4",
	"potx",
	"xltx",
	"dotx",
	"xltm",
	"ott",
	"ots",
	"otp",
	"odg",
	"otg",
	"xlsm",
	"docm",
	"dotm",
	"potm",
	"pptm",
	"jar",
	"jmp",
	"rm",
	"sav",
	"ppsm",
	"ppsx",
	"tar.gz",
	"reg",
	"dat"
];
var mimeTypes = [
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp",
	"image/flif",
	"image/x-xcf",
	"image/x-canon-cr2",
	"image/x-canon-cr3",
	"image/tiff",
	"image/bmp",
	"image/vnd.ms-photo",
	"image/vnd.adobe.photoshop",
	"application/x-indesign",
	"application/epub+zip",
	"application/x-xpinstall",
	"application/vnd.ms-powerpoint.slideshow.macroenabled.12",
	"application/vnd.oasis.opendocument.text",
	"application/vnd.oasis.opendocument.spreadsheet",
	"application/vnd.oasis.opendocument.presentation",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.openxmlformats-officedocument.presentationml.slideshow",
	"application/zip",
	"application/x-tar",
	"application/x-rar-compressed",
	"application/gzip",
	"application/x-bzip2",
	"application/x-7z-compressed",
	"application/x-apple-diskimage",
	"application/vnd.apache.arrow.file",
	"video/mp4",
	"audio/midi",
	"video/matroska",
	"video/webm",
	"video/quicktime",
	"video/vnd.avi",
	"audio/wav",
	"audio/qcelp",
	"audio/x-ms-asf",
	"video/x-ms-asf",
	"application/vnd.ms-asf",
	"video/mpeg",
	"video/3gpp",
	"audio/mpeg",
	"audio/mp4",
	"video/ogg",
	"audio/ogg",
	"audio/ogg; codecs=opus",
	"application/ogg",
	"audio/flac",
	"audio/ape",
	"audio/wavpack",
	"audio/amr",
	"application/pdf",
	"application/x-elf",
	"application/x-mach-binary",
	"application/x-msdownload",
	"application/x-shockwave-flash",
	"application/rtf",
	"application/wasm",
	"font/woff",
	"font/woff2",
	"application/vnd.ms-fontobject",
	"font/ttf",
	"font/otf",
	"font/collection",
	"image/x-icon",
	"video/x-flv",
	"application/postscript",
	"application/eps",
	"application/x-xz",
	"application/x-sqlite3",
	"application/x-nintendo-nes-rom",
	"application/x-google-chrome-extension",
	"application/vnd.ms-cab-compressed",
	"application/x-deb",
	"application/x-unix-archive",
	"application/x-rpm",
	"application/x-compress",
	"application/x-lzip",
	"application/x-cfb",
	"application/x-mie",
	"application/mxf",
	"video/mp2t",
	"application/x-blender",
	"image/bpg",
	"image/j2c",
	"image/jp2",
	"image/jpx",
	"image/jpm",
	"image/mj2",
	"audio/aiff",
	"application/xml",
	"application/x-mobipocket-ebook",
	"image/heif",
	"image/heif-sequence",
	"image/heic",
	"image/heic-sequence",
	"image/icns",
	"image/ktx",
	"application/dicom",
	"audio/x-musepack",
	"text/calendar",
	"text/vcard",
	"text/vtt",
	"model/gltf-binary",
	"application/vnd.tcpdump.pcap",
	"audio/x-dsf",
	"application/x.ms.shortcut",
	"application/x.apple.alias",
	"audio/x-voc",
	"audio/vnd.dolby.dd-raw",
	"audio/x-m4a",
	"image/apng",
	"image/x-olympus-orf",
	"image/x-sony-arw",
	"image/x-adobe-dng",
	"image/x-nikon-nef",
	"image/x-panasonic-rw2",
	"image/x-fujifilm-raf",
	"video/x-m4v",
	"video/3gpp2",
	"application/x-esri-shape",
	"audio/aac",
	"audio/x-it",
	"audio/x-s3m",
	"audio/x-xm",
	"video/MP1S",
	"video/MP2P",
	"application/vnd.sketchup.skp",
	"image/avif",
	"application/x-lzh-compressed",
	"application/pgp-encrypted",
	"application/x-asar",
	"model/stl",
	"application/vnd.ms-htmlhelp",
	"model/3mf",
	"image/jxl",
	"application/zstd",
	"image/jls",
	"application/vnd.ms-outlook",
	"image/vnd.dwg",
	"application/vnd.apache.parquet",
	"application/java-vm",
	"application/x-arj",
	"application/x-cpio",
	"application/x-ace-compressed",
	"application/avro",
	"application/vnd.iccprofile",
	"application/x.autodesk.fbx",
	"application/vnd.visio",
	"application/vnd.android.package-archive",
	"application/vnd.google.draco",
	"application/x-lz4",
	"application/vnd.openxmlformats-officedocument.presentationml.template",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.template",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
	"application/vnd.ms-excel.template.macroenabled.12",
	"application/vnd.oasis.opendocument.text-template",
	"application/vnd.oasis.opendocument.spreadsheet-template",
	"application/vnd.oasis.opendocument.presentation-template",
	"application/vnd.oasis.opendocument.graphics",
	"application/vnd.oasis.opendocument.graphics-template",
	"application/vnd.ms-excel.sheet.macroenabled.12",
	"application/vnd.ms-word.document.macroenabled.12",
	"application/vnd.ms-word.template.macroenabled.12",
	"application/vnd.ms-powerpoint.template.macroenabled.12",
	"application/vnd.ms-powerpoint.presentation.macroenabled.12",
	"application/java-archive",
	"application/vnd.rn-realmedia",
	"application/x-spss-sav",
	"application/x-ms-regedit",
	"application/x-ft-windows-registry-hive",
	"application/x-jmp-data"
];
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/file-type@21.3.4/node_modules/file-type/core.js
/**
Primary entry point, Node.js specific entry point is index.js
*/
var reasonableDetectionSizeInBytes = 4100;
var maximumMpegOffsetTolerance = 4098;
var maximumZipEntrySizeInBytes = 1048576;
var maximumZipEntryCount = 1024;
var maximumZipBufferedReadSizeInBytes = 2 ** 31 - 1;
var maximumUntrustedSkipSizeInBytes = 16777216;
var maximumUnknownSizePayloadProbeSizeInBytes = maximumZipEntrySizeInBytes;
var maximumZipTextEntrySizeInBytes = maximumZipEntrySizeInBytes;
var maximumNestedGzipDetectionSizeInBytes = maximumUntrustedSkipSizeInBytes;
var maximumNestedGzipProbeDepth = 1;
var unknownSizeGzipProbeTimeoutInMilliseconds = 100;
var maximumId3HeaderSizeInBytes = maximumUntrustedSkipSizeInBytes;
var maximumEbmlDocumentTypeSizeInBytes = 64;
var maximumEbmlElementPayloadSizeInBytes = maximumUnknownSizePayloadProbeSizeInBytes;
var maximumEbmlElementCount = 256;
var maximumPngChunkCount = 512;
var maximumPngStreamScanBudgetInBytes = maximumUntrustedSkipSizeInBytes;
var maximumAsfHeaderObjectCount = 512;
var maximumTiffTagCount = 512;
var maximumDetectionReentryCount = 256;
var maximumPngChunkSizeInBytes = maximumUnknownSizePayloadProbeSizeInBytes;
var maximumAsfHeaderPayloadSizeInBytes = maximumUnknownSizePayloadProbeSizeInBytes;
var maximumTiffStreamIfdOffsetInBytes = maximumUnknownSizePayloadProbeSizeInBytes;
var maximumTiffIfdOffsetInBytes = maximumUntrustedSkipSizeInBytes;
var recoverableZipErrorMessages = /* @__PURE__ */ new Set([
	"Unexpected signature",
	"Encrypted ZIP",
	"Expected Central-File-Header signature"
]);
var recoverableZipErrorMessagePrefixes = [
	"ZIP entry count exceeds ",
	"Unsupported ZIP compression method:",
	"ZIP entry compressed data exceeds ",
	"ZIP entry decompressed data exceeds ",
	"Expected data-descriptor-signature at position "
];
var recoverableZipErrorCodes = /* @__PURE__ */ new Set([
	"Z_BUF_ERROR",
	"Z_DATA_ERROR",
	"ERR_INVALID_STATE"
]);
var ParserHardLimitError = class extends Error {};
function patchWebByobTokenizerClose(tokenizer) {
	const streamReader = tokenizer?.streamReader;
	if (streamReader?.constructor?.name !== "WebStreamByobReader") return tokenizer;
	const { reader } = streamReader;
	const cancelAndRelease = async () => {
		await reader.cancel();
		reader.releaseLock();
	};
	streamReader.close = cancelAndRelease;
	streamReader.abort = async () => {
		streamReader.interrupted = true;
		await cancelAndRelease();
	};
	return tokenizer;
}
function getSafeBound(value, maximum, reason) {
	if (!Number.isFinite(value) || value < 0 || value > maximum) throw new ParserHardLimitError(`${reason} has invalid size ${value} (maximum ${maximum} bytes)`);
	return value;
}
async function safeIgnore(tokenizer, length, { maximumLength = maximumUntrustedSkipSizeInBytes, reason = "skip" } = {}) {
	const safeLength = getSafeBound(length, maximumLength, reason);
	await tokenizer.ignore(safeLength);
}
async function safeReadBuffer(tokenizer, buffer, options, { maximumLength = buffer.length, reason = "read" } = {}) {
	const safeLength = getSafeBound(options?.length ?? buffer.length, maximumLength, reason);
	return tokenizer.readBuffer(buffer, {
		...options,
		length: safeLength
	});
}
async function decompressDeflateRawWithLimit(data, { maximumLength = maximumZipEntrySizeInBytes } = {}) {
	const reader = new ReadableStream({ start(controller) {
		controller.enqueue(data);
		controller.close();
	} }).pipeThrough(new DecompressionStream("deflate-raw")).getReader();
	const chunks = [];
	let totalLength = 0;
	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			totalLength += value.length;
			if (totalLength > maximumLength) {
				await reader.cancel();
				throw new Error(`ZIP entry decompressed data exceeds ${maximumLength} bytes`);
			}
			chunks.push(value);
		}
	} finally {
		reader.releaseLock();
	}
	const uncompressedData = new Uint8Array(totalLength);
	let offset = 0;
	for (const chunk of chunks) {
		uncompressedData.set(chunk, offset);
		offset += chunk.length;
	}
	return uncompressedData;
}
var zipDataDescriptorSignature = 134695760;
var zipDataDescriptorLengthInBytes = 16;
var zipDataDescriptorOverlapLengthInBytes = 15;
function findZipDataDescriptorOffset(buffer, bytesConsumed) {
	if (buffer.length < zipDataDescriptorLengthInBytes) return -1;
	const lastPossibleDescriptorOffset = buffer.length - zipDataDescriptorLengthInBytes;
	for (let index = 0; index <= lastPossibleDescriptorOffset; index++) if (UINT32_LE.get(buffer, index) === zipDataDescriptorSignature && UINT32_LE.get(buffer, index + 8) === bytesConsumed + index) return index;
	return -1;
}
function isPngAncillaryChunk(type) {
	return (type.codePointAt(0) & 32) !== 0;
}
function mergeByteChunks(chunks, totalLength) {
	const merged = new Uint8Array(totalLength);
	let offset = 0;
	for (const chunk of chunks) {
		merged.set(chunk, offset);
		offset += chunk.length;
	}
	return merged;
}
async function readZipDataDescriptorEntryWithLimit(zipHandler, { shouldBuffer, maximumLength = maximumZipEntrySizeInBytes } = {}) {
	const { syncBuffer } = zipHandler;
	const { length: syncBufferLength } = syncBuffer;
	const chunks = [];
	let bytesConsumed = 0;
	for (;;) {
		const length = await zipHandler.tokenizer.peekBuffer(syncBuffer, { mayBeLess: true });
		const dataDescriptorOffset = findZipDataDescriptorOffset(syncBuffer.subarray(0, length), bytesConsumed);
		const retainedLength = dataDescriptorOffset >= 0 ? 0 : length === syncBufferLength ? Math.min(zipDataDescriptorOverlapLengthInBytes, length - 1) : 0;
		const chunkLength = dataDescriptorOffset >= 0 ? dataDescriptorOffset : length - retainedLength;
		if (chunkLength === 0) break;
		bytesConsumed += chunkLength;
		if (bytesConsumed > maximumLength) throw new Error(`ZIP entry compressed data exceeds ${maximumLength} bytes`);
		if (shouldBuffer) {
			const data = new Uint8Array(chunkLength);
			await zipHandler.tokenizer.readBuffer(data);
			chunks.push(data);
		} else await zipHandler.tokenizer.ignore(chunkLength);
		if (dataDescriptorOffset >= 0) break;
	}
	if (!hasUnknownFileSize(zipHandler.tokenizer)) zipHandler.knownSizeDescriptorScannedBytes += bytesConsumed;
	if (!shouldBuffer) return;
	return mergeByteChunks(chunks, bytesConsumed);
}
function getRemainingZipScanBudget(zipHandler, startOffset) {
	if (hasUnknownFileSize(zipHandler.tokenizer)) return Math.max(0, maximumUntrustedSkipSizeInBytes - (zipHandler.tokenizer.position - startOffset));
	return Math.max(0, maximumZipEntrySizeInBytes - zipHandler.knownSizeDescriptorScannedBytes);
}
async function readZipEntryData(zipHandler, zipHeader, { shouldBuffer, maximumDescriptorLength = maximumZipEntrySizeInBytes } = {}) {
	if (zipHeader.dataDescriptor && zipHeader.compressedSize === 0) return readZipDataDescriptorEntryWithLimit(zipHandler, {
		shouldBuffer,
		maximumLength: maximumDescriptorLength
	});
	if (!shouldBuffer) {
		await safeIgnore(zipHandler.tokenizer, zipHeader.compressedSize, {
			maximumLength: hasUnknownFileSize(zipHandler.tokenizer) ? maximumZipEntrySizeInBytes : zipHandler.tokenizer.fileInfo.size,
			reason: "ZIP entry compressed data"
		});
		return;
	}
	const maximumLength = getMaximumZipBufferedReadLength(zipHandler.tokenizer);
	if (!Number.isFinite(zipHeader.compressedSize) || zipHeader.compressedSize < 0 || zipHeader.compressedSize > maximumLength) throw new Error(`ZIP entry compressed data exceeds ${maximumLength} bytes`);
	const fileData = new Uint8Array(zipHeader.compressedSize);
	await zipHandler.tokenizer.readBuffer(fileData);
	return fileData;
}
ZipHandler.prototype.inflate = async function(zipHeader, fileData, callback) {
	if (zipHeader.compressedMethod === 0) return callback(fileData);
	if (zipHeader.compressedMethod !== 8) throw new Error(`Unsupported ZIP compression method: ${zipHeader.compressedMethod}`);
	return callback(await decompressDeflateRawWithLimit(fileData, { maximumLength: maximumZipEntrySizeInBytes }));
};
ZipHandler.prototype.unzip = async function(fileCallback) {
	let stop = false;
	let zipEntryCount = 0;
	const zipScanStart = this.tokenizer.position;
	this.knownSizeDescriptorScannedBytes = 0;
	do {
		if (hasExceededUnknownSizeScanBudget(this.tokenizer, zipScanStart, maximumUntrustedSkipSizeInBytes)) throw new ParserHardLimitError(`ZIP stream probing exceeds ${maximumUntrustedSkipSizeInBytes} bytes`);
		const zipHeader = await this.readLocalFileHeader();
		if (!zipHeader) break;
		zipEntryCount++;
		if (zipEntryCount > maximumZipEntryCount) throw new Error(`ZIP entry count exceeds ${maximumZipEntryCount}`);
		const next = fileCallback(zipHeader);
		stop = Boolean(next.stop);
		await this.tokenizer.ignore(zipHeader.extraFieldLength);
		const fileData = await readZipEntryData(this, zipHeader, {
			shouldBuffer: Boolean(next.handler),
			maximumDescriptorLength: Math.min(maximumZipEntrySizeInBytes, getRemainingZipScanBudget(this, zipScanStart))
		});
		if (next.handler) await this.inflate(zipHeader, fileData, next.handler);
		if (zipHeader.dataDescriptor) {
			const dataDescriptor = new Uint8Array(zipDataDescriptorLengthInBytes);
			await this.tokenizer.readBuffer(dataDescriptor);
			if (UINT32_LE.get(dataDescriptor, 0) !== zipDataDescriptorSignature) throw new Error(`Expected data-descriptor-signature at position ${this.tokenizer.position - dataDescriptor.length}`);
		}
		if (hasExceededUnknownSizeScanBudget(this.tokenizer, zipScanStart, maximumUntrustedSkipSizeInBytes)) throw new ParserHardLimitError(`ZIP stream probing exceeds ${maximumUntrustedSkipSizeInBytes} bytes`);
	} while (!stop);
};
function createByteLimitedReadableStream(stream, maximumBytes) {
	const reader = stream.getReader();
	let emittedBytes = 0;
	let sourceDone = false;
	let sourceCanceled = false;
	const cancelSource = async (reason) => {
		if (sourceDone || sourceCanceled) return;
		sourceCanceled = true;
		await reader.cancel(reason);
	};
	return new ReadableStream({
		async pull(controller) {
			if (emittedBytes >= maximumBytes) {
				controller.close();
				await cancelSource();
				return;
			}
			const { done, value } = await reader.read();
			if (done || !value) {
				sourceDone = true;
				controller.close();
				return;
			}
			const remainingBytes = maximumBytes - emittedBytes;
			if (value.length > remainingBytes) {
				controller.enqueue(value.subarray(0, remainingBytes));
				emittedBytes += remainingBytes;
				controller.close();
				await cancelSource();
				return;
			}
			controller.enqueue(value);
			emittedBytes += value.length;
		},
		async cancel(reason) {
			await cancelSource(reason);
		}
	});
}
async function fileTypeFromBuffer(input, options) {
	return new FileTypeParser(options).fromBuffer(input);
}
function getFileTypeFromMimeType(mimeType) {
	mimeType = mimeType.toLowerCase();
	switch (mimeType) {
		case "application/epub+zip": return {
			ext: "epub",
			mime: mimeType
		};
		case "application/vnd.oasis.opendocument.text": return {
			ext: "odt",
			mime: mimeType
		};
		case "application/vnd.oasis.opendocument.text-template": return {
			ext: "ott",
			mime: mimeType
		};
		case "application/vnd.oasis.opendocument.spreadsheet": return {
			ext: "ods",
			mime: mimeType
		};
		case "application/vnd.oasis.opendocument.spreadsheet-template": return {
			ext: "ots",
			mime: mimeType
		};
		case "application/vnd.oasis.opendocument.presentation": return {
			ext: "odp",
			mime: mimeType
		};
		case "application/vnd.oasis.opendocument.presentation-template": return {
			ext: "otp",
			mime: mimeType
		};
		case "application/vnd.oasis.opendocument.graphics": return {
			ext: "odg",
			mime: mimeType
		};
		case "application/vnd.oasis.opendocument.graphics-template": return {
			ext: "otg",
			mime: mimeType
		};
		case "application/vnd.openxmlformats-officedocument.presentationml.slideshow": return {
			ext: "ppsx",
			mime: mimeType
		};
		case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": return {
			ext: "xlsx",
			mime: mimeType
		};
		case "application/vnd.ms-excel.sheet.macroenabled": return {
			ext: "xlsm",
			mime: "application/vnd.ms-excel.sheet.macroenabled.12"
		};
		case "application/vnd.openxmlformats-officedocument.spreadsheetml.template": return {
			ext: "xltx",
			mime: mimeType
		};
		case "application/vnd.ms-excel.template.macroenabled": return {
			ext: "xltm",
			mime: "application/vnd.ms-excel.template.macroenabled.12"
		};
		case "application/vnd.ms-powerpoint.slideshow.macroenabled": return {
			ext: "ppsm",
			mime: "application/vnd.ms-powerpoint.slideshow.macroenabled.12"
		};
		case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": return {
			ext: "docx",
			mime: mimeType
		};
		case "application/vnd.ms-word.document.macroenabled": return {
			ext: "docm",
			mime: "application/vnd.ms-word.document.macroenabled.12"
		};
		case "application/vnd.openxmlformats-officedocument.wordprocessingml.template": return {
			ext: "dotx",
			mime: mimeType
		};
		case "application/vnd.ms-word.template.macroenabledtemplate": return {
			ext: "dotm",
			mime: "application/vnd.ms-word.template.macroenabled.12"
		};
		case "application/vnd.openxmlformats-officedocument.presentationml.template": return {
			ext: "potx",
			mime: mimeType
		};
		case "application/vnd.ms-powerpoint.template.macroenabled": return {
			ext: "potm",
			mime: "application/vnd.ms-powerpoint.template.macroenabled.12"
		};
		case "application/vnd.openxmlformats-officedocument.presentationml.presentation": return {
			ext: "pptx",
			mime: mimeType
		};
		case "application/vnd.ms-powerpoint.presentation.macroenabled": return {
			ext: "pptm",
			mime: "application/vnd.ms-powerpoint.presentation.macroenabled.12"
		};
		case "application/vnd.ms-visio.drawing": return {
			ext: "vsdx",
			mime: "application/vnd.visio"
		};
		case "application/vnd.ms-package.3dmanufacturing-3dmodel+xml": return {
			ext: "3mf",
			mime: "model/3mf"
		};
	}
}
function _check(buffer, headers, options) {
	options = {
		offset: 0,
		...options
	};
	for (const [index, header] of headers.entries()) if (options.mask) {
		if (header !== (options.mask[index] & buffer[index + options.offset])) return false;
	} else if (header !== buffer[index + options.offset]) return false;
	return true;
}
function normalizeSampleSize(sampleSize) {
	if (!Number.isFinite(sampleSize)) return reasonableDetectionSizeInBytes;
	return Math.max(1, Math.trunc(sampleSize));
}
function readByobReaderWithSignal(reader, buffer, signal) {
	if (signal === void 0) return reader.read(buffer);
	signal.throwIfAborted();
	return new Promise((resolve, reject) => {
		const cleanup = () => {
			signal.removeEventListener("abort", onAbort);
		};
		const onAbort = () => {
			const abortReason = signal.reason;
			cleanup();
			(async () => {
				try {
					await reader.cancel(abortReason);
				} catch {}
			})();
			reject(abortReason);
		};
		signal.addEventListener("abort", onAbort, { once: true });
		(async () => {
			try {
				const result = await reader.read(buffer);
				cleanup();
				resolve(result);
			} catch (error) {
				cleanup();
				reject(error);
			}
		})();
	});
}
function normalizeMpegOffsetTolerance(mpegOffsetTolerance) {
	if (!Number.isFinite(mpegOffsetTolerance)) return 0;
	return Math.max(0, Math.min(maximumMpegOffsetTolerance, Math.trunc(mpegOffsetTolerance)));
}
function getKnownFileSizeOrMaximum(fileSize) {
	if (!Number.isFinite(fileSize)) return Number.MAX_SAFE_INTEGER;
	return Math.max(0, fileSize);
}
function hasUnknownFileSize(tokenizer) {
	const fileSize = tokenizer.fileInfo.size;
	return !Number.isFinite(fileSize) || fileSize === Number.MAX_SAFE_INTEGER;
}
function hasExceededUnknownSizeScanBudget(tokenizer, startOffset, maximumBytes) {
	return hasUnknownFileSize(tokenizer) && tokenizer.position - startOffset > maximumBytes;
}
function getMaximumZipBufferedReadLength(tokenizer) {
	const fileSize = tokenizer.fileInfo.size;
	const remainingBytes = Number.isFinite(fileSize) ? Math.max(0, fileSize - tokenizer.position) : Number.MAX_SAFE_INTEGER;
	return Math.min(remainingBytes, maximumZipBufferedReadSizeInBytes);
}
function isRecoverableZipError(error) {
	if (error instanceof EndOfStreamError) return true;
	if (error instanceof ParserHardLimitError) return true;
	if (!(error instanceof Error)) return false;
	if (recoverableZipErrorMessages.has(error.message)) return true;
	if (recoverableZipErrorCodes.has(error.code)) return true;
	for (const prefix of recoverableZipErrorMessagePrefixes) if (error.message.startsWith(prefix)) return true;
	return false;
}
function canReadZipEntryForDetection(zipHeader, maximumSize = maximumZipEntrySizeInBytes) {
	const sizes = [zipHeader.compressedSize, zipHeader.uncompressedSize];
	for (const size of sizes) if (!Number.isFinite(size) || size < 0 || size > maximumSize) return false;
	return true;
}
function createOpenXmlZipDetectionState() {
	return {
		hasContentTypesEntry: false,
		hasParsedContentTypesEntry: false,
		isParsingContentTypes: false,
		hasUnparseableContentTypes: false,
		hasWordDirectory: false,
		hasPresentationDirectory: false,
		hasSpreadsheetDirectory: false,
		hasThreeDimensionalModelEntry: false
	};
}
function updateOpenXmlZipDetectionStateFromFilename(openXmlState, filename) {
	if (filename.startsWith("word/")) openXmlState.hasWordDirectory = true;
	if (filename.startsWith("ppt/")) openXmlState.hasPresentationDirectory = true;
	if (filename.startsWith("xl/")) openXmlState.hasSpreadsheetDirectory = true;
	if (filename.startsWith("3D/") && filename.endsWith(".model")) openXmlState.hasThreeDimensionalModelEntry = true;
}
function getOpenXmlFileTypeFromZipEntries(openXmlState) {
	if (!openXmlState.hasContentTypesEntry || openXmlState.hasUnparseableContentTypes || openXmlState.isParsingContentTypes || openXmlState.hasParsedContentTypesEntry) return;
	if (openXmlState.hasWordDirectory) return {
		ext: "docx",
		mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	};
	if (openXmlState.hasPresentationDirectory) return {
		ext: "pptx",
		mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
	};
	if (openXmlState.hasSpreadsheetDirectory) return {
		ext: "xlsx",
		mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	};
	if (openXmlState.hasThreeDimensionalModelEntry) return {
		ext: "3mf",
		mime: "model/3mf"
	};
}
function getOpenXmlMimeTypeFromContentTypesXml(xmlContent) {
	const endPosition = xmlContent.indexOf(".main+xml\"");
	if (endPosition === -1) {
		const mimeType = "application/vnd.ms-package.3dmanufacturing-3dmodel+xml";
		if (xmlContent.includes(`ContentType="${mimeType}"`)) return mimeType;
		return;
	}
	const truncatedContent = xmlContent.slice(0, endPosition);
	const firstQuotePosition = truncatedContent.lastIndexOf("\"");
	return truncatedContent.slice(firstQuotePosition + 1);
}
var FileTypeParser = class FileTypeParser {
	constructor(options) {
		const normalizedMpegOffsetTolerance = normalizeMpegOffsetTolerance(options?.mpegOffsetTolerance);
		this.options = {
			...options,
			mpegOffsetTolerance: normalizedMpegOffsetTolerance
		};
		this.detectors = [
			...this.options.customDetectors ?? [],
			{
				id: "core",
				detect: this.detectConfident
			},
			{
				id: "core.imprecise",
				detect: this.detectImprecise
			}
		];
		this.tokenizerOptions = { abortSignal: this.options.signal };
		this.gzipProbeDepth = 0;
	}
	getTokenizerOptions() {
		return { ...this.tokenizerOptions };
	}
	createTokenizerFromWebStream(stream) {
		return patchWebByobTokenizerClose(fromWebStream(stream, this.getTokenizerOptions()));
	}
	async parseTokenizer(tokenizer, detectionReentryCount = 0) {
		this.detectionReentryCount = detectionReentryCount;
		const initialPosition = tokenizer.position;
		for (const detector of this.detectors) {
			let fileType;
			try {
				fileType = await detector.detect(tokenizer);
			} catch (error) {
				if (error instanceof EndOfStreamError) return;
				if (error instanceof ParserHardLimitError) return;
				throw error;
			}
			if (fileType) return fileType;
			if (initialPosition !== tokenizer.position) return;
		}
	}
	async fromTokenizer(tokenizer) {
		try {
			return await this.parseTokenizer(tokenizer);
		} finally {
			await tokenizer.close();
		}
	}
	async fromBuffer(input) {
		if (!(input instanceof Uint8Array || input instanceof ArrayBuffer)) throw new TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof input}\``);
		const buffer = input instanceof Uint8Array ? input : new Uint8Array(input);
		if (!(buffer?.length > 1)) return;
		return this.fromTokenizer(fromBuffer(buffer, this.getTokenizerOptions()));
	}
	async fromBlob(blob) {
		this.options.signal?.throwIfAborted();
		const tokenizer = fromBlob(blob, this.getTokenizerOptions());
		return this.fromTokenizer(tokenizer);
	}
	async fromStream(stream) {
		this.options.signal?.throwIfAborted();
		const tokenizer = this.createTokenizerFromWebStream(stream);
		return this.fromTokenizer(tokenizer);
	}
	async toDetectionStream(stream, options) {
		const sampleSize = normalizeSampleSize(options?.sampleSize ?? 4100);
		let detectedFileType;
		let firstChunk;
		const reader = stream.getReader({ mode: "byob" });
		try {
			const { value: chunk, done } = await readByobReaderWithSignal(reader, new Uint8Array(sampleSize), this.options.signal);
			firstChunk = chunk;
			if (!done && chunk) try {
				detectedFileType = await this.fromBuffer(chunk.subarray(0, sampleSize));
			} catch (error) {
				if (!(error instanceof EndOfStreamError)) throw error;
				detectedFileType = void 0;
			}
			firstChunk = chunk;
		} finally {
			reader.releaseLock();
		}
		const transformStream = new TransformStream({
			async start(controller) {
				controller.enqueue(firstChunk);
			},
			transform(chunk, controller) {
				controller.enqueue(chunk);
			}
		});
		const newStream = stream.pipeThrough(transformStream);
		newStream.fileType = detectedFileType;
		return newStream;
	}
	async detectGzip(tokenizer) {
		if (this.gzipProbeDepth >= maximumNestedGzipProbeDepth) return {
			ext: "gz",
			mime: "application/gzip"
		};
		const limitedInflatedStream = createByteLimitedReadableStream(new GzipHandler(tokenizer).inflate(), maximumNestedGzipDetectionSizeInBytes);
		const hasUnknownSize = hasUnknownFileSize(tokenizer);
		let timeout;
		let probeSignal;
		let probeParser;
		let compressedFileType;
		if (hasUnknownSize) {
			const timeoutController = new AbortController();
			timeout = setTimeout(() => {
				timeoutController.abort(new DOMException(`Operation timed out after ${unknownSizeGzipProbeTimeoutInMilliseconds} ms`, "TimeoutError"));
			}, unknownSizeGzipProbeTimeoutInMilliseconds);
			probeSignal = this.options.signal === void 0 ? timeoutController.signal : AbortSignal.any([this.options.signal, timeoutController.signal]);
			probeParser = new FileTypeParser({
				...this.options,
				signal: probeSignal
			});
			probeParser.gzipProbeDepth = this.gzipProbeDepth + 1;
		} else this.gzipProbeDepth++;
		try {
			compressedFileType = await (probeParser ?? this).fromStream(limitedInflatedStream);
		} catch (error) {
			if (error?.name === "AbortError" && probeSignal?.reason?.name !== "TimeoutError") throw error;
		} finally {
			clearTimeout(timeout);
			if (!hasUnknownSize) this.gzipProbeDepth--;
		}
		if (compressedFileType?.ext === "tar") return {
			ext: "tar.gz",
			mime: "application/gzip"
		};
		return {
			ext: "gz",
			mime: "application/gzip"
		};
	}
	check(header, options) {
		return _check(this.buffer, header, options);
	}
	checkString(header, options) {
		return this.check(stringToBytes(header, options?.encoding), options);
	}
	detectConfident = async (tokenizer) => {
		this.buffer = new Uint8Array(reasonableDetectionSizeInBytes);
		if (tokenizer.fileInfo.size === void 0) tokenizer.fileInfo.size = Number.MAX_SAFE_INTEGER;
		this.tokenizer = tokenizer;
		if (hasUnknownFileSize(tokenizer)) {
			await tokenizer.peekBuffer(this.buffer, {
				length: 3,
				mayBeLess: true
			});
			if (this.check([
				31,
				139,
				8
			])) return this.detectGzip(tokenizer);
		}
		await tokenizer.peekBuffer(this.buffer, {
			length: 32,
			mayBeLess: true
		});
		if (this.check([66, 77])) return {
			ext: "bmp",
			mime: "image/bmp"
		};
		if (this.check([11, 119])) return {
			ext: "ac3",
			mime: "audio/vnd.dolby.dd-raw"
		};
		if (this.check([120, 1])) return {
			ext: "dmg",
			mime: "application/x-apple-diskimage"
		};
		if (this.check([77, 90])) return {
			ext: "exe",
			mime: "application/x-msdownload"
		};
		if (this.check([37, 33])) {
			await tokenizer.peekBuffer(this.buffer, {
				length: 24,
				mayBeLess: true
			});
			if (this.checkString("PS-Adobe-", { offset: 2 }) && this.checkString(" EPSF-", { offset: 14 })) return {
				ext: "eps",
				mime: "application/eps"
			};
			return {
				ext: "ps",
				mime: "application/postscript"
			};
		}
		if (this.check([31, 160]) || this.check([31, 157])) return {
			ext: "Z",
			mime: "application/x-compress"
		};
		if (this.check([199, 113])) return {
			ext: "cpio",
			mime: "application/x-cpio"
		};
		if (this.check([96, 234])) return {
			ext: "arj",
			mime: "application/x-arj"
		};
		if (this.check([
			239,
			187,
			191
		])) {
			if (this.detectionReentryCount >= maximumDetectionReentryCount) return;
			this.detectionReentryCount++;
			await this.tokenizer.ignore(3);
			return this.detectConfident(tokenizer);
		}
		if (this.check([
			71,
			73,
			70
		])) return {
			ext: "gif",
			mime: "image/gif"
		};
		if (this.check([
			73,
			73,
			188
		])) return {
			ext: "jxr",
			mime: "image/vnd.ms-photo"
		};
		if (this.check([
			31,
			139,
			8
		])) return this.detectGzip(tokenizer);
		if (this.check([
			66,
			90,
			104
		])) return {
			ext: "bz2",
			mime: "application/x-bzip2"
		};
		if (this.checkString("ID3")) {
			await safeIgnore(tokenizer, 6, {
				maximumLength: 6,
				reason: "ID3 header prefix"
			});
			const id3HeaderLength = await tokenizer.readToken(uint32SyncSafeToken);
			const isUnknownFileSize = hasUnknownFileSize(tokenizer);
			if (!Number.isFinite(id3HeaderLength) || id3HeaderLength < 0 || isUnknownFileSize && (id3HeaderLength > maximumId3HeaderSizeInBytes || tokenizer.position + id3HeaderLength > maximumId3HeaderSizeInBytes)) return;
			if (tokenizer.position + id3HeaderLength > tokenizer.fileInfo.size) {
				if (isUnknownFileSize) return;
				return {
					ext: "mp3",
					mime: "audio/mpeg"
				};
			}
			try {
				await safeIgnore(tokenizer, id3HeaderLength, {
					maximumLength: isUnknownFileSize ? maximumId3HeaderSizeInBytes : tokenizer.fileInfo.size,
					reason: "ID3 payload"
				});
			} catch (error) {
				if (error instanceof EndOfStreamError) return;
				throw error;
			}
			if (this.detectionReentryCount >= maximumDetectionReentryCount) return;
			this.detectionReentryCount++;
			return this.parseTokenizer(tokenizer, this.detectionReentryCount);
		}
		if (this.checkString("MP+")) return {
			ext: "mpc",
			mime: "audio/x-musepack"
		};
		if ((this.buffer[0] === 67 || this.buffer[0] === 70) && this.check([87, 83], { offset: 1 })) return {
			ext: "swf",
			mime: "application/x-shockwave-flash"
		};
		if (this.check([
			255,
			216,
			255
		])) {
			if (this.check([247], { offset: 3 })) return {
				ext: "jls",
				mime: "image/jls"
			};
			return {
				ext: "jpg",
				mime: "image/jpeg"
			};
		}
		if (this.check([
			79,
			98,
			106,
			1
		])) return {
			ext: "avro",
			mime: "application/avro"
		};
		if (this.checkString("FLIF")) return {
			ext: "flif",
			mime: "image/flif"
		};
		if (this.checkString("8BPS")) return {
			ext: "psd",
			mime: "image/vnd.adobe.photoshop"
		};
		if (this.checkString("MPCK")) return {
			ext: "mpc",
			mime: "audio/x-musepack"
		};
		if (this.checkString("FORM")) return {
			ext: "aif",
			mime: "audio/aiff"
		};
		if (this.checkString("icns", { offset: 0 })) return {
			ext: "icns",
			mime: "image/icns"
		};
		if (this.check([
			80,
			75,
			3,
			4
		])) {
			let fileType;
			const openXmlState = createOpenXmlZipDetectionState();
			try {
				await new ZipHandler(tokenizer).unzip((zipHeader) => {
					updateOpenXmlZipDetectionStateFromFilename(openXmlState, zipHeader.filename);
					const isOpenXmlContentTypesEntry = zipHeader.filename === "[Content_Types].xml";
					const openXmlFileTypeFromEntries = getOpenXmlFileTypeFromZipEntries(openXmlState);
					if (!isOpenXmlContentTypesEntry && openXmlFileTypeFromEntries) {
						fileType = openXmlFileTypeFromEntries;
						return { stop: true };
					}
					switch (zipHeader.filename) {
						case "META-INF/mozilla.rsa":
							fileType = {
								ext: "xpi",
								mime: "application/x-xpinstall"
							};
							return { stop: true };
						case "META-INF/MANIFEST.MF":
							fileType = {
								ext: "jar",
								mime: "application/java-archive"
							};
							return { stop: true };
						case "mimetype":
							if (!canReadZipEntryForDetection(zipHeader, maximumZipTextEntrySizeInBytes)) return {};
							return {
								async handler(fileData) {
									fileType = getFileTypeFromMimeType(new TextDecoder("utf-8").decode(fileData).trim());
								},
								stop: true
							};
						case "[Content_Types].xml":
							openXmlState.hasContentTypesEntry = true;
							if (!canReadZipEntryForDetection(zipHeader, maximumZipTextEntrySizeInBytes)) {
								openXmlState.hasUnparseableContentTypes = true;
								return {};
							}
							openXmlState.isParsingContentTypes = true;
							return {
								async handler(fileData) {
									const mimeType = getOpenXmlMimeTypeFromContentTypesXml(new TextDecoder("utf-8").decode(fileData));
									if (mimeType) fileType = getFileTypeFromMimeType(mimeType);
									openXmlState.hasParsedContentTypesEntry = true;
									openXmlState.isParsingContentTypes = false;
								},
								stop: true
							};
						default:
							if (/classes\d*\.dex/.test(zipHeader.filename)) {
								fileType = {
									ext: "apk",
									mime: "application/vnd.android.package-archive"
								};
								return { stop: true };
							}
							return {};
					}
				});
			} catch (error) {
				if (!isRecoverableZipError(error)) throw error;
				if (openXmlState.isParsingContentTypes) {
					openXmlState.isParsingContentTypes = false;
					openXmlState.hasUnparseableContentTypes = true;
				}
			}
			return fileType ?? getOpenXmlFileTypeFromZipEntries(openXmlState) ?? {
				ext: "zip",
				mime: "application/zip"
			};
		}
		if (this.checkString("OggS")) {
			await tokenizer.ignore(28);
			const type = /* @__PURE__ */ new Uint8Array(8);
			await tokenizer.readBuffer(type);
			if (_check(type, [
				79,
				112,
				117,
				115,
				72,
				101,
				97,
				100
			])) return {
				ext: "opus",
				mime: "audio/ogg; codecs=opus"
			};
			if (_check(type, [
				128,
				116,
				104,
				101,
				111,
				114,
				97
			])) return {
				ext: "ogv",
				mime: "video/ogg"
			};
			if (_check(type, [
				1,
				118,
				105,
				100,
				101,
				111,
				0
			])) return {
				ext: "ogm",
				mime: "video/ogg"
			};
			if (_check(type, [
				127,
				70,
				76,
				65,
				67
			])) return {
				ext: "oga",
				mime: "audio/ogg"
			};
			if (_check(type, [
				83,
				112,
				101,
				101,
				120,
				32,
				32
			])) return {
				ext: "spx",
				mime: "audio/ogg"
			};
			if (_check(type, [
				1,
				118,
				111,
				114,
				98,
				105,
				115
			])) return {
				ext: "ogg",
				mime: "audio/ogg"
			};
			return {
				ext: "ogx",
				mime: "application/ogg"
			};
		}
		if (this.check([80, 75]) && (this.buffer[2] === 3 || this.buffer[2] === 5 || this.buffer[2] === 7) && (this.buffer[3] === 4 || this.buffer[3] === 6 || this.buffer[3] === 8)) return {
			ext: "zip",
			mime: "application/zip"
		};
		if (this.checkString("MThd")) return {
			ext: "mid",
			mime: "audio/midi"
		};
		if (this.checkString("wOFF") && (this.check([
			0,
			1,
			0,
			0
		], { offset: 4 }) || this.checkString("OTTO", { offset: 4 }))) return {
			ext: "woff",
			mime: "font/woff"
		};
		if (this.checkString("wOF2") && (this.check([
			0,
			1,
			0,
			0
		], { offset: 4 }) || this.checkString("OTTO", { offset: 4 }))) return {
			ext: "woff2",
			mime: "font/woff2"
		};
		if (this.check([
			212,
			195,
			178,
			161
		]) || this.check([
			161,
			178,
			195,
			212
		])) return {
			ext: "pcap",
			mime: "application/vnd.tcpdump.pcap"
		};
		if (this.checkString("DSD ")) return {
			ext: "dsf",
			mime: "audio/x-dsf"
		};
		if (this.checkString("LZIP")) return {
			ext: "lz",
			mime: "application/x-lzip"
		};
		if (this.checkString("fLaC")) return {
			ext: "flac",
			mime: "audio/flac"
		};
		if (this.check([
			66,
			80,
			71,
			251
		])) return {
			ext: "bpg",
			mime: "image/bpg"
		};
		if (this.checkString("wvpk")) return {
			ext: "wv",
			mime: "audio/wavpack"
		};
		if (this.checkString("%PDF")) return {
			ext: "pdf",
			mime: "application/pdf"
		};
		if (this.check([
			0,
			97,
			115,
			109
		])) return {
			ext: "wasm",
			mime: "application/wasm"
		};
		if (this.check([73, 73])) {
			const fileType = await this.readTiffHeader(false);
			if (fileType) return fileType;
		}
		if (this.check([77, 77])) {
			const fileType = await this.readTiffHeader(true);
			if (fileType) return fileType;
		}
		if (this.checkString("MAC ")) return {
			ext: "ape",
			mime: "audio/ape"
		};
		if (this.check([
			26,
			69,
			223,
			163
		])) {
			async function readField() {
				const msb = await tokenizer.peekNumber(UINT8);
				let mask = 128;
				let ic = 0;
				while ((msb & mask) === 0 && mask !== 0) {
					++ic;
					mask >>= 1;
				}
				const id = new Uint8Array(ic + 1);
				await safeReadBuffer(tokenizer, id, void 0, {
					maximumLength: id.length,
					reason: "EBML field"
				});
				return id;
			}
			async function readElement() {
				const idField = await readField();
				const lengthField = await readField();
				lengthField[0] ^= 128 >> lengthField.length - 1;
				const nrLength = Math.min(6, lengthField.length);
				const idView = new DataView(idField.buffer);
				const lengthView = new DataView(lengthField.buffer, lengthField.length - nrLength, nrLength);
				return {
					id: getUintBE(idView),
					len: getUintBE(lengthView)
				};
			}
			async function readChildren(children) {
				let ebmlElementCount = 0;
				while (children > 0) {
					ebmlElementCount++;
					if (ebmlElementCount > maximumEbmlElementCount) return;
					if (hasExceededUnknownSizeScanBudget(tokenizer, ebmlScanStart, maximumUntrustedSkipSizeInBytes)) return;
					const previousPosition = tokenizer.position;
					const element = await readElement();
					if (element.id === 17026) {
						if (element.len > maximumEbmlDocumentTypeSizeInBytes) return;
						const documentTypeLength = getSafeBound(element.len, maximumEbmlDocumentTypeSizeInBytes, "EBML DocType");
						return (await tokenizer.readToken(new StringType(documentTypeLength))).replaceAll(/\00.*$/g, "");
					}
					if (hasUnknownFileSize(tokenizer) && (!Number.isFinite(element.len) || element.len < 0 || element.len > maximumEbmlElementPayloadSizeInBytes)) return;
					await safeIgnore(tokenizer, element.len, {
						maximumLength: hasUnknownFileSize(tokenizer) ? maximumEbmlElementPayloadSizeInBytes : tokenizer.fileInfo.size,
						reason: "EBML payload"
					});
					--children;
					if (tokenizer.position <= previousPosition) return;
				}
			}
			const rootElement = await readElement();
			const ebmlScanStart = tokenizer.position;
			switch (await readChildren(rootElement.len)) {
				case "webm": return {
					ext: "webm",
					mime: "video/webm"
				};
				case "matroska": return {
					ext: "mkv",
					mime: "video/matroska"
				};
				default: return;
			}
		}
		if (this.checkString("SQLi")) return {
			ext: "sqlite",
			mime: "application/x-sqlite3"
		};
		if (this.check([
			78,
			69,
			83,
			26
		])) return {
			ext: "nes",
			mime: "application/x-nintendo-nes-rom"
		};
		if (this.checkString("Cr24")) return {
			ext: "crx",
			mime: "application/x-google-chrome-extension"
		};
		if (this.checkString("MSCF") || this.checkString("ISc(")) return {
			ext: "cab",
			mime: "application/vnd.ms-cab-compressed"
		};
		if (this.check([
			237,
			171,
			238,
			219
		])) return {
			ext: "rpm",
			mime: "application/x-rpm"
		};
		if (this.check([
			197,
			208,
			211,
			198
		])) return {
			ext: "eps",
			mime: "application/eps"
		};
		if (this.check([
			40,
			181,
			47,
			253
		])) return {
			ext: "zst",
			mime: "application/zstd"
		};
		if (this.check([
			127,
			69,
			76,
			70
		])) return {
			ext: "elf",
			mime: "application/x-elf"
		};
		if (this.check([
			33,
			66,
			68,
			78
		])) return {
			ext: "pst",
			mime: "application/vnd.ms-outlook"
		};
		if (this.checkString("PAR1") || this.checkString("PARE")) return {
			ext: "parquet",
			mime: "application/vnd.apache.parquet"
		};
		if (this.checkString("ttcf")) return {
			ext: "ttc",
			mime: "font/collection"
		};
		if (this.check([
			254,
			237,
			250,
			206
		]) || this.check([
			254,
			237,
			250,
			207
		]) || this.check([
			206,
			250,
			237,
			254
		]) || this.check([
			207,
			250,
			237,
			254
		])) return {
			ext: "macho",
			mime: "application/x-mach-binary"
		};
		if (this.check([
			4,
			34,
			77,
			24
		])) return {
			ext: "lz4",
			mime: "application/x-lz4"
		};
		if (this.checkString("regf")) return {
			ext: "dat",
			mime: "application/x-ft-windows-registry-hive"
		};
		if (this.checkString("$FL2") || this.checkString("$FL3")) return {
			ext: "sav",
			mime: "application/x-spss-sav"
		};
		if (this.check([
			79,
			84,
			84,
			79,
			0
		])) return {
			ext: "otf",
			mime: "font/otf"
		};
		if (this.checkString("#!AMR")) return {
			ext: "amr",
			mime: "audio/amr"
		};
		if (this.checkString("{\\rtf")) return {
			ext: "rtf",
			mime: "application/rtf"
		};
		if (this.check([
			70,
			76,
			86,
			1
		])) return {
			ext: "flv",
			mime: "video/x-flv"
		};
		if (this.checkString("IMPM")) return {
			ext: "it",
			mime: "audio/x-it"
		};
		if (this.checkString("-lh0-", { offset: 2 }) || this.checkString("-lh1-", { offset: 2 }) || this.checkString("-lh2-", { offset: 2 }) || this.checkString("-lh3-", { offset: 2 }) || this.checkString("-lh4-", { offset: 2 }) || this.checkString("-lh5-", { offset: 2 }) || this.checkString("-lh6-", { offset: 2 }) || this.checkString("-lh7-", { offset: 2 }) || this.checkString("-lzs-", { offset: 2 }) || this.checkString("-lz4-", { offset: 2 }) || this.checkString("-lz5-", { offset: 2 }) || this.checkString("-lhd-", { offset: 2 })) return {
			ext: "lzh",
			mime: "application/x-lzh-compressed"
		};
		if (this.check([
			0,
			0,
			1,
			186
		])) {
			if (this.check([33], {
				offset: 4,
				mask: [241]
			})) return {
				ext: "mpg",
				mime: "video/MP1S"
			};
			if (this.check([68], {
				offset: 4,
				mask: [196]
			})) return {
				ext: "mpg",
				mime: "video/MP2P"
			};
		}
		if (this.checkString("ITSF")) return {
			ext: "chm",
			mime: "application/vnd.ms-htmlhelp"
		};
		if (this.check([
			202,
			254,
			186,
			190
		])) {
			const machOArchitectureCount = UINT32_BE.get(this.buffer, 4);
			const javaClassFileMajorVersion = UINT16_BE.get(this.buffer, 6);
			if (machOArchitectureCount > 0 && machOArchitectureCount <= 30) return {
				ext: "macho",
				mime: "application/x-mach-binary"
			};
			if (javaClassFileMajorVersion > 30) return {
				ext: "class",
				mime: "application/java-vm"
			};
		}
		if (this.checkString(".RMF")) return {
			ext: "rm",
			mime: "application/vnd.rn-realmedia"
		};
		if (this.checkString("DRACO")) return {
			ext: "drc",
			mime: "application/vnd.google.draco"
		};
		if (this.check([
			253,
			55,
			122,
			88,
			90,
			0
		])) return {
			ext: "xz",
			mime: "application/x-xz"
		};
		if (this.checkString("<?xml ")) return {
			ext: "xml",
			mime: "application/xml"
		};
		if (this.check([
			55,
			122,
			188,
			175,
			39,
			28
		])) return {
			ext: "7z",
			mime: "application/x-7z-compressed"
		};
		if (this.check([
			82,
			97,
			114,
			33,
			26,
			7
		]) && (this.buffer[6] === 0 || this.buffer[6] === 1)) return {
			ext: "rar",
			mime: "application/x-rar-compressed"
		};
		if (this.checkString("solid ")) return {
			ext: "stl",
			mime: "model/stl"
		};
		if (this.checkString("AC")) {
			const version = new StringType(4, "latin1").get(this.buffer, 2);
			if (version.match("^d*") && version >= 1e3 && version <= 1050) return {
				ext: "dwg",
				mime: "image/vnd.dwg"
			};
		}
		if (this.checkString("070707")) return {
			ext: "cpio",
			mime: "application/x-cpio"
		};
		if (this.checkString("BLENDER")) return {
			ext: "blend",
			mime: "application/x-blender"
		};
		if (this.checkString("!<arch>")) {
			await tokenizer.ignore(8);
			if (await tokenizer.readToken(new StringType(13, "ascii")) === "debian-binary") return {
				ext: "deb",
				mime: "application/x-deb"
			};
			return {
				ext: "ar",
				mime: "application/x-unix-archive"
			};
		}
		if (this.checkString("WEBVTT") && [
			"\n",
			"\r",
			"	",
			" ",
			"\0"
		].some((char7) => this.checkString(char7, { offset: 6 }))) return {
			ext: "vtt",
			mime: "text/vtt"
		};
		if (this.check([
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		])) {
			const pngFileType = {
				ext: "png",
				mime: "image/png"
			};
			const apngFileType = {
				ext: "apng",
				mime: "image/apng"
			};
			await tokenizer.ignore(8);
			async function readChunkHeader() {
				return {
					length: await tokenizer.readToken(INT32_BE),
					type: await tokenizer.readToken(new StringType(4, "latin1"))
				};
			}
			const isUnknownPngStream = hasUnknownFileSize(tokenizer);
			const pngScanStart = tokenizer.position;
			let pngChunkCount = 0;
			let hasSeenImageHeader = false;
			do {
				pngChunkCount++;
				if (pngChunkCount > maximumPngChunkCount) break;
				if (hasExceededUnknownSizeScanBudget(tokenizer, pngScanStart, maximumPngStreamScanBudgetInBytes)) break;
				const previousPosition = tokenizer.position;
				const chunk = await readChunkHeader();
				if (chunk.length < 0) return;
				if (chunk.type === "IHDR") {
					if (chunk.length !== 13) return;
					hasSeenImageHeader = true;
				}
				switch (chunk.type) {
					case "IDAT": return pngFileType;
					case "acTL": return apngFileType;
					default:
						if (!hasSeenImageHeader && chunk.type !== "CgBI") return;
						if (isUnknownPngStream && chunk.length > maximumPngChunkSizeInBytes) return hasSeenImageHeader && isPngAncillaryChunk(chunk.type) ? pngFileType : void 0;
						try {
							await safeIgnore(tokenizer, chunk.length + 4, {
								maximumLength: isUnknownPngStream ? 1048580 : tokenizer.fileInfo.size,
								reason: "PNG chunk payload"
							});
						} catch (error) {
							if (!isUnknownPngStream && (error instanceof ParserHardLimitError || error instanceof EndOfStreamError)) return pngFileType;
							throw error;
						}
				}
				if (tokenizer.position <= previousPosition) break;
			} while (tokenizer.position + 8 < tokenizer.fileInfo.size);
			return pngFileType;
		}
		if (this.check([
			65,
			82,
			82,
			79,
			87,
			49,
			0,
			0
		])) return {
			ext: "arrow",
			mime: "application/vnd.apache.arrow.file"
		};
		if (this.check([
			103,
			108,
			84,
			70,
			2,
			0,
			0,
			0
		])) return {
			ext: "glb",
			mime: "model/gltf-binary"
		};
		if (this.check([
			102,
			114,
			101,
			101
		], { offset: 4 }) || this.check([
			109,
			100,
			97,
			116
		], { offset: 4 }) || this.check([
			109,
			111,
			111,
			118
		], { offset: 4 }) || this.check([
			119,
			105,
			100,
			101
		], { offset: 4 })) return {
			ext: "mov",
			mime: "video/quicktime"
		};
		if (this.check([
			73,
			73,
			82,
			79,
			8,
			0,
			0,
			0,
			24
		])) return {
			ext: "orf",
			mime: "image/x-olympus-orf"
		};
		if (this.checkString("gimp xcf ")) return {
			ext: "xcf",
			mime: "image/x-xcf"
		};
		if (this.checkString("ftyp", { offset: 4 }) && (this.buffer[8] & 96) !== 0) {
			const brandMajor = new StringType(4, "latin1").get(this.buffer, 8).replace("\0", " ").trim();
			switch (brandMajor) {
				case "avif":
				case "avis": return {
					ext: "avif",
					mime: "image/avif"
				};
				case "mif1": return {
					ext: "heic",
					mime: "image/heif"
				};
				case "msf1": return {
					ext: "heic",
					mime: "image/heif-sequence"
				};
				case "heic":
				case "heix": return {
					ext: "heic",
					mime: "image/heic"
				};
				case "hevc":
				case "hevx": return {
					ext: "heic",
					mime: "image/heic-sequence"
				};
				case "qt": return {
					ext: "mov",
					mime: "video/quicktime"
				};
				case "M4V":
				case "M4VH":
				case "M4VP": return {
					ext: "m4v",
					mime: "video/x-m4v"
				};
				case "M4P": return {
					ext: "m4p",
					mime: "video/mp4"
				};
				case "M4B": return {
					ext: "m4b",
					mime: "audio/mp4"
				};
				case "M4A": return {
					ext: "m4a",
					mime: "audio/x-m4a"
				};
				case "F4V": return {
					ext: "f4v",
					mime: "video/mp4"
				};
				case "F4P": return {
					ext: "f4p",
					mime: "video/mp4"
				};
				case "F4A": return {
					ext: "f4a",
					mime: "audio/mp4"
				};
				case "F4B": return {
					ext: "f4b",
					mime: "audio/mp4"
				};
				case "crx": return {
					ext: "cr3",
					mime: "image/x-canon-cr3"
				};
				default:
					if (brandMajor.startsWith("3g")) {
						if (brandMajor.startsWith("3g2")) return {
							ext: "3g2",
							mime: "video/3gpp2"
						};
						return {
							ext: "3gp",
							mime: "video/3gpp"
						};
					}
					return {
						ext: "mp4",
						mime: "video/mp4"
					};
			}
		}
		if (this.checkString("REGEDIT4\r\n")) return {
			ext: "reg",
			mime: "application/x-ms-regedit"
		};
		if (this.check([
			82,
			73,
			70,
			70
		])) {
			if (this.checkString("WEBP", { offset: 8 })) return {
				ext: "webp",
				mime: "image/webp"
			};
			if (this.check([
				65,
				86,
				73
			], { offset: 8 })) return {
				ext: "avi",
				mime: "video/vnd.avi"
			};
			if (this.check([
				87,
				65,
				86,
				69
			], { offset: 8 })) return {
				ext: "wav",
				mime: "audio/wav"
			};
			if (this.check([
				81,
				76,
				67,
				77
			], { offset: 8 })) return {
				ext: "qcp",
				mime: "audio/qcelp"
			};
		}
		if (this.check([
			73,
			73,
			85,
			0,
			24,
			0,
			0,
			0,
			136,
			231,
			116,
			216
		])) return {
			ext: "rw2",
			mime: "image/x-panasonic-rw2"
		};
		if (this.check([
			48,
			38,
			178,
			117,
			142,
			102,
			207,
			17,
			166,
			217
		])) {
			let isMalformedAsf = false;
			try {
				async function readHeader() {
					const guid = /* @__PURE__ */ new Uint8Array(16);
					await safeReadBuffer(tokenizer, guid, void 0, {
						maximumLength: guid.length,
						reason: "ASF header GUID"
					});
					return {
						id: guid,
						size: Number(await tokenizer.readToken(UINT64_LE))
					};
				}
				await safeIgnore(tokenizer, 30, {
					maximumLength: 30,
					reason: "ASF header prelude"
				});
				const isUnknownFileSize = hasUnknownFileSize(tokenizer);
				const asfHeaderScanStart = tokenizer.position;
				let asfHeaderObjectCount = 0;
				while (tokenizer.position + 24 < tokenizer.fileInfo.size) {
					asfHeaderObjectCount++;
					if (asfHeaderObjectCount > maximumAsfHeaderObjectCount) break;
					if (hasExceededUnknownSizeScanBudget(tokenizer, asfHeaderScanStart, maximumUntrustedSkipSizeInBytes)) break;
					const previousPosition = tokenizer.position;
					const header = await readHeader();
					let payload = header.size - 24;
					if (!Number.isFinite(payload) || payload < 0) {
						isMalformedAsf = true;
						break;
					}
					if (_check(header.id, [
						145,
						7,
						220,
						183,
						183,
						169,
						207,
						17,
						142,
						230,
						0,
						192,
						12,
						32,
						83,
						101
					])) {
						const typeId = /* @__PURE__ */ new Uint8Array(16);
						payload -= await safeReadBuffer(tokenizer, typeId, void 0, {
							maximumLength: typeId.length,
							reason: "ASF stream type GUID"
						});
						if (_check(typeId, [
							64,
							158,
							105,
							248,
							77,
							91,
							207,
							17,
							168,
							253,
							0,
							128,
							95,
							92,
							68,
							43
						])) return {
							ext: "asf",
							mime: "audio/x-ms-asf"
						};
						if (_check(typeId, [
							192,
							239,
							25,
							188,
							77,
							91,
							207,
							17,
							168,
							253,
							0,
							128,
							95,
							92,
							68,
							43
						])) return {
							ext: "asf",
							mime: "video/x-ms-asf"
						};
						break;
					}
					if (isUnknownFileSize && payload > maximumAsfHeaderPayloadSizeInBytes) {
						isMalformedAsf = true;
						break;
					}
					await safeIgnore(tokenizer, payload, {
						maximumLength: isUnknownFileSize ? maximumAsfHeaderPayloadSizeInBytes : tokenizer.fileInfo.size,
						reason: "ASF header payload"
					});
					if (tokenizer.position <= previousPosition) {
						isMalformedAsf = true;
						break;
					}
				}
			} catch (error) {
				if (error instanceof EndOfStreamError || error instanceof ParserHardLimitError) {
					if (hasUnknownFileSize(tokenizer)) isMalformedAsf = true;
				} else throw error;
			}
			if (isMalformedAsf) return;
			return {
				ext: "asf",
				mime: "application/vnd.ms-asf"
			};
		}
		if (this.check([
			171,
			75,
			84,
			88,
			32,
			49,
			49,
			187,
			13,
			10,
			26,
			10
		])) return {
			ext: "ktx",
			mime: "image/ktx"
		};
		if ((this.check([
			126,
			16,
			4
		]) || this.check([
			126,
			24,
			4
		])) && this.check([
			48,
			77,
			73,
			69
		], { offset: 4 })) return {
			ext: "mie",
			mime: "application/x-mie"
		};
		if (this.check([
			39,
			10,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		], { offset: 2 })) return {
			ext: "shp",
			mime: "application/x-esri-shape"
		};
		if (this.check([
			255,
			79,
			255,
			81
		])) return {
			ext: "j2c",
			mime: "image/j2c"
		};
		if (this.check([
			0,
			0,
			0,
			12,
			106,
			80,
			32,
			32,
			13,
			10,
			135,
			10
		])) {
			await tokenizer.ignore(20);
			switch (await tokenizer.readToken(new StringType(4, "ascii"))) {
				case "jp2 ": return {
					ext: "jp2",
					mime: "image/jp2"
				};
				case "jpx ": return {
					ext: "jpx",
					mime: "image/jpx"
				};
				case "jpm ": return {
					ext: "jpm",
					mime: "image/jpm"
				};
				case "mjp2": return {
					ext: "mj2",
					mime: "image/mj2"
				};
				default: return;
			}
		}
		if (this.check([255, 10]) || this.check([
			0,
			0,
			0,
			12,
			74,
			88,
			76,
			32,
			13,
			10,
			135,
			10
		])) return {
			ext: "jxl",
			mime: "image/jxl"
		};
		if (this.check([254, 255])) {
			if (this.checkString("<?xml ", {
				offset: 2,
				encoding: "utf-16be"
			})) return {
				ext: "xml",
				mime: "application/xml"
			};
			return;
		}
		if (this.check([
			208,
			207,
			17,
			224,
			161,
			177,
			26,
			225
		])) return {
			ext: "cfb",
			mime: "application/x-cfb"
		};
		await tokenizer.peekBuffer(this.buffer, {
			length: Math.min(256, tokenizer.fileInfo.size),
			mayBeLess: true
		});
		if (this.check([
			97,
			99,
			115,
			112
		], { offset: 36 })) return {
			ext: "icc",
			mime: "application/vnd.iccprofile"
		};
		if (this.checkString("**ACE", { offset: 7 }) && this.checkString("**", { offset: 12 })) return {
			ext: "ace",
			mime: "application/x-ace-compressed"
		};
		if (this.checkString("BEGIN:")) {
			if (this.checkString("VCARD", { offset: 6 })) return {
				ext: "vcf",
				mime: "text/vcard"
			};
			if (this.checkString("VCALENDAR", { offset: 6 })) return {
				ext: "ics",
				mime: "text/calendar"
			};
		}
		if (this.checkString("FUJIFILMCCD-RAW")) return {
			ext: "raf",
			mime: "image/x-fujifilm-raf"
		};
		if (this.checkString("Extended Module:")) return {
			ext: "xm",
			mime: "audio/x-xm"
		};
		if (this.checkString("Creative Voice File")) return {
			ext: "voc",
			mime: "audio/x-voc"
		};
		if (this.check([
			4,
			0,
			0,
			0
		]) && this.buffer.length >= 16) {
			const jsonSize = new DataView(this.buffer.buffer).getUint32(12, true);
			if (jsonSize > 12 && this.buffer.length >= jsonSize + 16) try {
				const header = new TextDecoder().decode(this.buffer.subarray(16, jsonSize + 16));
				if (JSON.parse(header).files) return {
					ext: "asar",
					mime: "application/x-asar"
				};
			} catch {}
		}
		if (this.check([
			6,
			14,
			43,
			52,
			2,
			5,
			1,
			1,
			13,
			1,
			2,
			1,
			1,
			2
		])) return {
			ext: "mxf",
			mime: "application/mxf"
		};
		if (this.checkString("SCRM", { offset: 44 })) return {
			ext: "s3m",
			mime: "audio/x-s3m"
		};
		if (this.check([71]) && this.check([71], { offset: 188 })) return {
			ext: "mts",
			mime: "video/mp2t"
		};
		if (this.check([71], { offset: 4 }) && this.check([71], { offset: 196 })) return {
			ext: "mts",
			mime: "video/mp2t"
		};
		if (this.check([
			66,
			79,
			79,
			75,
			77,
			79,
			66,
			73
		], { offset: 60 })) return {
			ext: "mobi",
			mime: "application/x-mobipocket-ebook"
		};
		if (this.check([
			68,
			73,
			67,
			77
		], { offset: 128 })) return {
			ext: "dcm",
			mime: "application/dicom"
		};
		if (this.check([
			76,
			0,
			0,
			0,
			1,
			20,
			2,
			0,
			0,
			0,
			0,
			0,
			192,
			0,
			0,
			0,
			0,
			0,
			0,
			70
		])) return {
			ext: "lnk",
			mime: "application/x.ms.shortcut"
		};
		if (this.check([
			98,
			111,
			111,
			107,
			0,
			0,
			0,
			0,
			109,
			97,
			114,
			107,
			0,
			0,
			0,
			0
		])) return {
			ext: "alias",
			mime: "application/x.apple.alias"
		};
		if (this.checkString("Kaydara FBX Binary  \0")) return {
			ext: "fbx",
			mime: "application/x.autodesk.fbx"
		};
		if (this.check([76, 80], { offset: 34 }) && (this.check([
			0,
			0,
			1
		], { offset: 8 }) || this.check([
			1,
			0,
			2
		], { offset: 8 }) || this.check([
			2,
			0,
			2
		], { offset: 8 }))) return {
			ext: "eot",
			mime: "application/vnd.ms-fontobject"
		};
		if (this.check([
			6,
			6,
			237,
			245,
			216,
			29,
			70,
			229,
			189,
			49,
			239,
			231,
			254,
			116,
			183,
			29
		])) return {
			ext: "indd",
			mime: "application/x-indesign"
		};
		if (this.check([
			255,
			255,
			0,
			0,
			7,
			0,
			0,
			0,
			4,
			0,
			0,
			0,
			1,
			0,
			1,
			0
		]) || this.check([
			0,
			0,
			255,
			255,
			0,
			0,
			0,
			7,
			0,
			0,
			0,
			4,
			0,
			1,
			0,
			1
		])) return {
			ext: "jmp",
			mime: "application/x-jmp-data"
		};
		await tokenizer.peekBuffer(this.buffer, {
			length: Math.min(512, tokenizer.fileInfo.size),
			mayBeLess: true
		});
		if (this.checkString("ustar", { offset: 257 }) && (this.checkString("\0", { offset: 262 }) || this.checkString(" ", { offset: 262 })) || this.check([
			0,
			0,
			0,
			0,
			0,
			0
		], { offset: 257 }) && tarHeaderChecksumMatches(this.buffer)) return {
			ext: "tar",
			mime: "application/x-tar"
		};
		if (this.check([255, 254])) {
			const encoding = "utf-16le";
			if (this.checkString("<?xml ", {
				offset: 2,
				encoding
			})) return {
				ext: "xml",
				mime: "application/xml"
			};
			if (this.check([255, 14], { offset: 2 }) && this.checkString("SketchUp Model", {
				offset: 4,
				encoding
			})) return {
				ext: "skp",
				mime: "application/vnd.sketchup.skp"
			};
			if (this.checkString("Windows Registry Editor Version 5.00\r\n", {
				offset: 2,
				encoding
			})) return {
				ext: "reg",
				mime: "application/x-ms-regedit"
			};
			return;
		}
		if (this.checkString("-----BEGIN PGP MESSAGE-----")) return {
			ext: "pgp",
			mime: "application/pgp-encrypted"
		};
	};
	detectImprecise = async (tokenizer) => {
		this.buffer = new Uint8Array(reasonableDetectionSizeInBytes);
		const fileSize = getKnownFileSizeOrMaximum(tokenizer.fileInfo.size);
		await tokenizer.peekBuffer(this.buffer, {
			length: Math.min(8, fileSize),
			mayBeLess: true
		});
		if (this.check([
			0,
			0,
			1,
			186
		]) || this.check([
			0,
			0,
			1,
			179
		])) return {
			ext: "mpg",
			mime: "video/mpeg"
		};
		if (this.check([
			0,
			1,
			0,
			0,
			0
		])) return {
			ext: "ttf",
			mime: "font/ttf"
		};
		if (this.check([
			0,
			0,
			1,
			0
		])) return {
			ext: "ico",
			mime: "image/x-icon"
		};
		if (this.check([
			0,
			0,
			2,
			0
		])) return {
			ext: "cur",
			mime: "image/x-icon"
		};
		await tokenizer.peekBuffer(this.buffer, {
			length: Math.min(2 + this.options.mpegOffsetTolerance, fileSize),
			mayBeLess: true
		});
		if (this.buffer.length >= 2 + this.options.mpegOffsetTolerance) for (let depth = 0; depth <= this.options.mpegOffsetTolerance; ++depth) {
			const type = this.scanMpeg(depth);
			if (type) return type;
		}
	};
	async readTiffTag(bigEndian) {
		const tagId = await this.tokenizer.readToken(bigEndian ? UINT16_BE : UINT16_LE);
		await this.tokenizer.ignore(10);
		switch (tagId) {
			case 50341: return {
				ext: "arw",
				mime: "image/x-sony-arw"
			};
			case 50706: return {
				ext: "dng",
				mime: "image/x-adobe-dng"
			};
		}
	}
	async readTiffIFD(bigEndian) {
		const numberOfTags = await this.tokenizer.readToken(bigEndian ? UINT16_BE : UINT16_LE);
		if (numberOfTags > maximumTiffTagCount) return;
		if (hasUnknownFileSize(this.tokenizer) && 2 + numberOfTags * 12 > maximumTiffIfdOffsetInBytes) return;
		for (let n = 0; n < numberOfTags; ++n) {
			const fileType = await this.readTiffTag(bigEndian);
			if (fileType) return fileType;
		}
	}
	async readTiffHeader(bigEndian) {
		const tiffFileType = {
			ext: "tif",
			mime: "image/tiff"
		};
		const version = (bigEndian ? UINT16_BE : UINT16_LE).get(this.buffer, 2);
		const ifdOffset = (bigEndian ? UINT32_BE : UINT32_LE).get(this.buffer, 4);
		if (version === 42) {
			if (ifdOffset >= 6) {
				if (this.checkString("CR", { offset: 8 })) return {
					ext: "cr2",
					mime: "image/x-canon-cr2"
				};
				if (ifdOffset >= 8) {
					const someId1 = (bigEndian ? UINT16_BE : UINT16_LE).get(this.buffer, 8);
					const someId2 = (bigEndian ? UINT16_BE : UINT16_LE).get(this.buffer, 10);
					if (someId1 === 28 && someId2 === 254 || someId1 === 31 && someId2 === 11) return {
						ext: "nef",
						mime: "image/x-nikon-nef"
					};
				}
			}
			if (hasUnknownFileSize(this.tokenizer) && ifdOffset > maximumTiffStreamIfdOffsetInBytes) return tiffFileType;
			const maximumTiffOffset = hasUnknownFileSize(this.tokenizer) ? maximumTiffIfdOffsetInBytes : this.tokenizer.fileInfo.size;
			try {
				await safeIgnore(this.tokenizer, ifdOffset, {
					maximumLength: maximumTiffOffset,
					reason: "TIFF IFD offset"
				});
			} catch (error) {
				if (error instanceof EndOfStreamError) return;
				throw error;
			}
			let fileType;
			try {
				fileType = await this.readTiffIFD(bigEndian);
			} catch (error) {
				if (error instanceof EndOfStreamError) return;
				throw error;
			}
			return fileType ?? tiffFileType;
		}
		if (version === 43) return tiffFileType;
	}
	/**
	Scan check MPEG 1 or 2 Layer 3 header, or 'layer 0' for ADTS (MPEG sync-word 0xFFE).
	
	@param offset - Offset to scan for sync-preamble.
	@returns {{ext: string, mime: string}}
	*/
	scanMpeg(offset) {
		if (this.check([255, 224], {
			offset,
			mask: [255, 224]
		})) {
			if (this.check([16], {
				offset: offset + 1,
				mask: [22]
			})) {
				if (this.check([8], {
					offset: offset + 1,
					mask: [8]
				})) return {
					ext: "aac",
					mime: "audio/aac"
				};
				return {
					ext: "aac",
					mime: "audio/aac"
				};
			}
			if (this.check([2], {
				offset: offset + 1,
				mask: [6]
			})) return {
				ext: "mp3",
				mime: "audio/mpeg"
			};
			if (this.check([4], {
				offset: offset + 1,
				mask: [6]
			})) return {
				ext: "mp2",
				mime: "audio/mpeg"
			};
			if (this.check([6], {
				offset: offset + 1,
				mask: [6]
			})) return {
				ext: "mp1",
				mime: "audio/mpeg"
			};
		}
	}
};
new Set(extensions);
new Set(mimeTypes);
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@caffeineai+object-storage@1.1.2/node_modules/@caffeineai/object-storage/dist/resolveBlobContentType.js
var DEFAULT_CONTENT_TYPE = "application/octet-stream";
function isUsableContentType(contentType) {
	if (!contentType) return false;
	const trimmed = contentType.trim();
	return trimmed.length > 0 && trimmed !== DEFAULT_CONTENT_TYPE;
}
async function resolveBlobContentType(bytes, hint) {
	if (isUsableContentType(hint)) return hint.trim();
	return (await fileTypeFromBuffer(bytes))?.mime ?? DEFAULT_CONTENT_TYPE;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@caffeineai+object-storage@1.1.2/node_modules/@caffeineai/object-storage/dist/StorageClient.js
var MAXIMUM_CONCURRENT_UPLOADS = 10;
var MAX_RETRIES = 3;
var BASE_DELAY_MS = 1e3;
var MAX_DELAY_MS = 3e4;
var GATEWAY_VERSION = "v1";
var HASH_ALGORITHM = "SHA-256";
var SHA256_PREFIX = "sha256:";
var DOMAIN_SEPARATOR_FOR_CHUNKS = new TextEncoder().encode("icfs-chunk/");
var DOMAIN_SEPARATOR_FOR_METADATA = new TextEncoder().encode("icfs-metadata/");
var DOMAIN_SEPARATOR_FOR_NODES = new TextEncoder().encode("ynode/");
async function withRetry(operation) {
	let lastError;
	for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) try {
		return await operation();
	} catch (error) {
		lastError = error instanceof Error ? error : new Error(String(error));
		const shouldRetry = isRetriableError(error);
		if (attempt === MAX_RETRIES || !shouldRetry) {
			if (!shouldRetry && attempt < MAX_RETRIES) console.warn(`Non-retriable error encountered: ${lastError.message}. Not retrying.`);
			throw error;
		}
		const delay = Math.min(BASE_DELAY_MS * 2 ** attempt + Math.random() * 1e3, MAX_DELAY_MS);
		console.warn(`Request failed (attempt ${attempt + 1}/4): ${lastError.message}. Retrying in ${Math.round(delay)}ms...`);
		await new Promise((resolve) => setTimeout(resolve, delay));
	}
	throw lastError || /* @__PURE__ */ new Error("Unknown error occurred during retry attempts");
}
function isRetriableError(error) {
	const errorMessage = error?.message?.toLowerCase() || "";
	if (error?.response?.status) {
		const status = error.response.status;
		if (status === 408 || status === 429) return true;
		if (status >= 400 && status < 500) return false;
		if (status >= 500) return true;
	}
	if (errorMessage.includes("ssl") || errorMessage.includes("tls") || errorMessage.includes("network error") || errorMessage.includes("connection") || errorMessage.includes("timeout") || errorMessage.includes("fetch")) return true;
	if (errorMessage.includes("validation") || errorMessage.includes("invalid") || errorMessage.includes("malformed") || errorMessage.includes("unauthorized") || errorMessage.includes("forbidden") || errorMessage.includes("not found")) return false;
	return true;
}
function validateHashFormat(hash, context) {
	if (!hash) throw new Error(`${context}: Hash cannot be empty`);
	if (!hash.startsWith(SHA256_PREFIX)) throw new Error(`${context}: Invalid hash format. Expected format: ${SHA256_PREFIX}<64-char-hex>, got: ${hash}`);
	const hexPart = hash.substring(7);
	if (hexPart.length !== 64) throw new Error(`${context}: Invalid hash format. Expected 64 hex characters after ${SHA256_PREFIX}, got ${hexPart.length} characters: ${hash}`);
	if (!/^[0-9a-f]{64}$/i.test(hexPart)) throw new Error(`${context}: Invalid hash format. Hash must contain only hex characters (0-9, a-f), got: ${hash}`);
}
var YHash = class YHash {
	bytes;
	constructor(bytes) {
		if (bytes.length !== 32) throw new Error(`YHash must be exactly 32 bytes, got ${bytes.length}`);
		this.bytes = new Uint8Array(bytes);
	}
	static async fromNodes(left, right) {
		const leftBytes = left instanceof YHash ? left.bytes : new TextEncoder().encode("UNBALANCED");
		const rightBytes = right instanceof YHash ? right.bytes : new TextEncoder().encode("UNBALANCED");
		const combined = new Uint8Array(DOMAIN_SEPARATOR_FOR_NODES.length + leftBytes.length + rightBytes.length);
		const arrays = [
			DOMAIN_SEPARATOR_FOR_NODES,
			leftBytes,
			rightBytes
		];
		let offset = 0;
		for (const data of arrays) {
			combined.set(data, offset);
			offset += data.length;
		}
		const hashBuffer = await crypto.subtle.digest(HASH_ALGORITHM, combined);
		return new YHash(new Uint8Array(hashBuffer));
	}
	static async fromChunk(data) {
		return YHash.fromBytes(DOMAIN_SEPARATOR_FOR_CHUNKS, data);
	}
	static async fromHeaders(headers) {
		const headerLines = [];
		for (const [key, value] of Object.entries(headers)) headerLines.push(`${key.trim()}: ${value.trim()}\n`);
		headerLines.sort();
		return await YHash.fromBytes(DOMAIN_SEPARATOR_FOR_METADATA, new TextEncoder().encode(headerLines.join("")));
	}
	static async fromBytes(domainSeparator, data) {
		const combined = new Uint8Array(domainSeparator.length + data.length);
		combined.set(domainSeparator);
		combined.set(data, domainSeparator.length);
		const hashBuffer = await crypto.subtle.digest(HASH_ALGORITHM, combined);
		return new YHash(new Uint8Array(hashBuffer));
	}
	static fromHex(hexString) {
		const bytes = new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => Number.parseInt(byte, 16)));
		return new YHash(bytes);
	}
	toShaString() {
		return `${SHA256_PREFIX}${this.toHex()}`;
	}
	toString() {
		throw new Error("toString is not supported for YHash");
	}
	toHex() {
		return Array.from(this.bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
	}
};
function nodeToJSON(node) {
	return {
		hash: node.hash.toShaString(),
		left: node.left ? nodeToJSON(node.left) : null,
		right: node.right ? nodeToJSON(node.right) : null
	};
}
var BlobHashTree = class BlobHashTree {
	tree_type;
	chunk_hashes;
	tree;
	headers;
	constructor(chunk_hashes, tree, headers = null) {
		this.tree_type = "DSBMTWH";
		this.chunk_hashes = chunk_hashes;
		this.tree = tree;
		if (headers == null) this.headers = [];
		else if (Array.isArray(headers)) this.headers = headers;
		else this.headers = Object.entries(headers).map(([key, value]) => `${key.trim()}: ${value.trim()}`);
		this.headers.sort();
	}
	static async build(chunkHashes, headers = {}) {
		if (chunkHashes.length === 0) {
			const bytes = new TextEncoder().encode("8b8e620f084e48da0be2287fd12c5aaa4dbe14b468fd2e360f48d741fe7628a0");
			chunkHashes.push(new YHash(bytes));
		}
		let level = chunkHashes.map((hash) => ({
			hash,
			left: null,
			right: null
		}));
		while (level.length > 1) {
			const nextLevel = [];
			for (let i = 0; i < level.length; i += 2) {
				const left = level[i];
				const right = level[i + 1] || null;
				const parentHash = await YHash.fromNodes(left.hash, right ? right.hash : null);
				nextLevel.push({
					hash: parentHash,
					left,
					right
				});
			}
			level = nextLevel;
		}
		const chunksRoot = level[0];
		if (headers && Object.keys(headers).length > 0) {
			const metadataRoot = {
				hash: await YHash.fromHeaders(headers),
				left: null,
				right: null
			};
			const combinedRoot = {
				hash: await YHash.fromNodes(chunksRoot.hash, metadataRoot.hash),
				left: chunksRoot,
				right: metadataRoot
			};
			return new BlobHashTree(chunkHashes, combinedRoot, headers);
		}
		return new BlobHashTree(chunkHashes, chunksRoot, headers);
	}
	toJSON() {
		return {
			tree_type: this.tree_type,
			chunk_hashes: this.chunk_hashes.map((h) => h.toShaString()),
			tree: nodeToJSON(this.tree),
			headers: this.headers
		};
	}
};
var StorageGatewayClient = class {
	storageGatewayUrl;
	constructor(storageGatewayUrl) {
		this.storageGatewayUrl = storageGatewayUrl;
	}
	getStorageGatewayUrl() {
		return this.storageGatewayUrl;
	}
	async uploadChunk(params) {
		const blobHashString = params.blobRootHash.toShaString();
		const chunkHashString = params.chunkHash.toShaString();
		validateHashFormat(blobHashString, `uploadChunk[${params.chunkIndex}] blob_hash`);
		validateHashFormat(chunkHashString, `uploadChunk[${params.chunkIndex}] chunk_hash`);
		return await withRetry(async () => {
			const queryParams = new URLSearchParams({
				owner_id: params.owner,
				blob_hash: blobHashString,
				chunk_hash: chunkHashString,
				chunk_index: params.chunkIndex.toString(),
				bucket_name: params.bucketName,
				project_id: params.projectId
			});
			const url = `${this.storageGatewayUrl}/${GATEWAY_VERSION}/chunk/?${queryParams.toString()}`;
			const response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/octet-stream",
					"X-Caffeine-Project-ID": params.projectId
				},
				body: params.chunkData
			});
			if (!response.ok) {
				const errorText = await response.text();
				const error = /* @__PURE__ */ new Error(`Failed to upload chunk ${params.chunkIndex}: ${response.status} ${response.statusText} - ${errorText}`);
				error.response = { status: response.status };
				throw error;
			}
			return { isComplete: (await response.json()).status === "blob_complete" };
		});
	}
	async uploadBlobTree(blobHashTree, bucketName, numBlobBytes, owner, projectId, certificateBytes) {
		const treeJSON = blobHashTree.toJSON();
		validateHashFormat(treeJSON.tree.hash, "uploadBlobTree root hash");
		treeJSON.chunk_hashes.forEach((hash, index) => {
			validateHashFormat(hash, `uploadBlobTree chunk_hash[${index}]`);
		});
		return await withRetry(async () => {
			const url = `${this.storageGatewayUrl}/${GATEWAY_VERSION}/blob-tree/`;
			const requestBody = {
				blob_tree: treeJSON,
				bucket_name: bucketName,
				num_blob_bytes: numBlobBytes,
				owner,
				project_id: projectId,
				headers: blobHashTree.headers,
				auth: { OwnerEgressSignature: Array.from(certificateBytes) }
			};
			const response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"X-Caffeine-Project-ID": projectId
				},
				body: JSON.stringify(requestBody)
			});
			if (!response.ok) {
				const errorText = await response.text();
				const error = /* @__PURE__ */ new Error(`Failed to upload blob tree: ${response.status} ${response.statusText} - ${errorText}`);
				error.response = { status: response.status };
				throw error;
			}
		});
	}
};
var StorageClient = class {
	bucket;
	backendCanisterId;
	projectId;
	agent;
	storageGatewayClient;
	constructor(bucket, storageGatewayUrl, backendCanisterId, projectId, agent) {
		this.bucket = bucket;
		this.backendCanisterId = backendCanisterId;
		this.projectId = projectId;
		this.agent = agent;
		this.storageGatewayClient = new StorageGatewayClient(storageGatewayUrl);
	}
	async getCertificate(hash) {
		const args = encode$1([Text], [hash]);
		const result = await this.agent.call(this.backendCanisterId, {
			methodName: "_immutableObjectStorageCreateCertificate",
			arg: args,
			effectiveCanisterId: this.backendCanisterId
		});
		const respone = result.response.body;
		if (isV4ResponseBody(respone)) {
			const certBytes = respone.certificate;
			const decoded = Cbor.decode(certBytes);
			if (decoded.tree) {
				const requestStatusPath = [new TextEncoder().encode("request_status"), result.requestId];
				const statusLookup = lookup_path([...requestStatusPath, new TextEncoder().encode("status")], decoded.tree);
				if (statusLookup.status === LookupPathStatus.Found && new TextDecoder().decode(statusLookup.value) === "rejected") {
					const rejectCodeBytes = lookupResultToBuffer(lookup_path([...requestStatusPath, new TextEncoder().encode("reject_code")], decoded.tree));
					const rejectMessageBytes = lookupResultToBuffer(lookup_path([...requestStatusPath, new TextEncoder().encode("reject_message")], decoded.tree));
					const errorCodeBytes = lookupResultToBuffer(lookup_path([...requestStatusPath, new TextEncoder().encode("error_code")], decoded.tree));
					throw formatCertificateRejectionError({
						rejectCode: rejectCodeBytes?.[0],
						rejectMessage: rejectMessageBytes ? new TextDecoder().decode(rejectMessageBytes) : void 0,
						errorCode: errorCodeBytes ? new TextDecoder().decode(errorCodeBytes) : void 0
					});
				}
			}
			return certBytes;
		}
		throw new Error("Expected v4 response body");
	}
	async putFile(blobBytes, onProgress, contentTypeHint, filenameHint) {
		const httpHeaders = { "Content-Type": "application/json" };
		const contentType = await resolveBlobContentType(blobBytes, contentTypeHint);
		const file = new Blob([new Uint8Array(blobBytes)], { type: contentType });
		const fileHeaders = {
			"Content-Type": contentType,
			"Content-Length": file.size.toString()
		};
		const contentDisposition = formatBlobContentDisposition(filenameHint);
		if (contentDisposition) fileHeaders["Content-Disposition"] = contentDisposition;
		const { chunks, chunkHashes, blobHashTree } = await this.processFileForUpload(file, fileHeaders);
		const blobRootHash = blobHashTree.tree.hash;
		const hashString = blobRootHash.toShaString();
		const certificateBytes = await this.getCertificate(hashString);
		await this.storageGatewayClient.uploadBlobTree(blobHashTree, this.bucket, file.size, this.backendCanisterId, this.projectId, certificateBytes);
		await this.parallelUpload(chunks, chunkHashes, blobRootHash, httpHeaders, onProgress);
		return { hash: hashString };
	}
	async getDirectURL(hash) {
		if (!hash) throw new Error("Hash must not be empty");
		validateHashFormat(hash, `getDirectURL for path '${hash}'`);
		return `${this.storageGatewayClient.getStorageGatewayUrl()}/${GATEWAY_VERSION}/blob/?blob_hash=${encodeURIComponent(hash)}&owner_id=${encodeURIComponent(this.backendCanisterId)}&project_id=${encodeURIComponent(this.projectId)}`;
	}
	async processFileForUpload(file, headers) {
		const chunks = this.createFileChunks(file);
		const chunkHashes = [];
		for (let i = 0; i < chunks.length; i++) {
			const chunkData = new Uint8Array(await chunks[i].arrayBuffer());
			const hash = await YHash.fromChunk(chunkData);
			chunkHashes.push(hash);
		}
		return {
			chunks,
			chunkHashes,
			blobHashTree: await BlobHashTree.build(chunkHashes, headers)
		};
	}
	async parallelUpload(chunks, chunkHashes, blobRootHash, httpHeaders, onProgress) {
		let completedChunks = 0;
		const uploadSingleChunk = async (index) => {
			const chunkData = new Uint8Array(await chunks[index].arrayBuffer());
			const chunkHash = chunkHashes[index];
			await this.storageGatewayClient.uploadChunk({
				blobRootHash,
				chunkHash,
				chunkIndex: index,
				chunkData,
				bucketName: this.bucket,
				owner: this.backendCanisterId,
				projectId: this.projectId,
				httpHeaders
			});
			const currentCompleted = ++completedChunks;
			if (onProgress != null) onProgress(chunks.length === 0 ? 100 : Math.round(currentCompleted / chunks.length * 100));
		};
		await Promise.all(Array.from({ length: MAXIMUM_CONCURRENT_UPLOADS }, async (_, workerId) => {
			for (let i = workerId; i < chunks.length; i += MAXIMUM_CONCURRENT_UPLOADS) await uploadSingleChunk(i);
		}));
	}
	createFileChunks(file, chunkSize = 1048576) {
		const chunks = [];
		const totalChunks = Math.ceil(file.size / chunkSize);
		for (let index = 0; index < totalChunks; index++) {
			const start = index * chunkSize;
			const end = Math.min(start + chunkSize, file.size);
			const chunk = file.slice(start, end);
			chunks.push(chunk);
		}
		return chunks;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@caffeineai+core-infrastructure@2.0.1_@caffeineai+object-storage@1.1.2/node_modules/@caffeineai/core-infrastructure/dist/config.js
var DEFAULT_BUCKET_NAME = "default-bucket";
var DEFAULT_PROJECT_ID = "0000000-0000-0000-0000-00000000000";
var configCache = null;
/**
* Synchronous access to the config cached by a previous `loadConfig()` call.
* Needed by code paths that must stay inside a user-activation window (e.g.
* opening the Internet Identity popup from a click handler) and therefore
* cannot await. Returns `null` if `loadConfig()` has not completed yet.
*/
function getCachedConfig() {
	return configCache;
}
async function loadConfig() {
	if (configCache) return configCache;
	const backendCanisterId = {}.CANISTER_ID_BACKEND;
	const envBaseUrl = {}.BASE_URL || "/";
	const baseUrl = envBaseUrl.endsWith("/") ? envBaseUrl : `${envBaseUrl}/`;
	try {
		const config = await (await fetch(`${baseUrl}env.json`)).json();
		if (!backendCanisterId && config.backend_canister_id === "undefined") {
			console.error("CANISTER_ID_BACKEND is not set");
			throw new Error("CANISTER_ID_BACKEND is not set");
		}
		const runtimeStorageGatewayUrl = config.storage_gateway_url && config.storage_gateway_url !== "undefined" ? config.storage_gateway_url : void 0;
		const fullConfig = {
			backend_host: config.backend_host === "undefined" ? void 0 : config.backend_host,
			backend_canister_id: config.backend_canister_id === "undefined" ? backendCanisterId : config.backend_canister_id,
			storage_gateway_url: runtimeStorageGatewayUrl ?? "nogateway",
			bucket_name: DEFAULT_BUCKET_NAME,
			project_id: config.project_id !== "undefined" ? config.project_id : DEFAULT_PROJECT_ID,
			ii_derivation_origin: config.ii_derivation_origin === "undefined" ? void 0 : config.ii_derivation_origin
		};
		configCache = fullConfig;
		return fullConfig;
	} catch {
		if (!backendCanisterId) {
			console.error("CANISTER_ID_BACKEND is not set");
			throw new Error("CANISTER_ID_BACKEND is not set");
		}
		return {
			backend_host: void 0,
			backend_canister_id: backendCanisterId,
			storage_gateway_url: "nogateway",
			bucket_name: DEFAULT_BUCKET_NAME,
			project_id: DEFAULT_PROJECT_ID,
			ii_derivation_origin: void 0
		};
	}
}
function extractAgentErrorMessage(error) {
	const errorString = String(error);
	const match = errorString.match(/with message:\s*'([^']+)'/s);
	return match ? match[1] : errorString;
}
function processError(e) {
	if (e && typeof e === "object" && "message" in e) throw new Error(extractAgentErrorMessage(`${e.message}`));
	throw e;
}
/**
* Load the app's mock backend when `VITE_USE_MOCK=true`.
* Pass `import.meta.glob("./mocks/backend.{ts,tsx,js,jsx}")` evaluated in app source:
* Vite resolves the pattern relative to the file containing the call,
* so a glob inside this package can never see the app's files.
* Globbing (instead of a static import) keeps builds green when the mock file is absent.
*/
async function loadMockBackendFromModules(mockModules) {
	return null;
}
async function createActorWithConfig(createActor, options) {
	const { mockModules, ...resolvedOptions } = options ?? {};
	if (mockModules) {
		const mock = await loadMockBackendFromModules(mockModules);
		if (mock) return mock;
	}
	const config = await loadConfig();
	const agent = new HttpAgent({
		...resolvedOptions.agentOptions,
		host: config.backend_host
	});
	if (config.backend_host?.includes("localhost")) await agent.fetchRootKey().catch((err) => {
		console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
		console.error(err);
	});
	const actorOptions = {
		...resolvedOptions,
		agent,
		processError
	};
	const storageClient = new StorageClient(config.bucket_name, config.storage_gateway_url, config.backend_canister_id, config.project_id, agent);
	const MOTOKO_DEDUPLICATION_SENTINEL = "!caf!";
	const uploadFile = async (file) => {
		const { hash } = await storageClient.putFile(await file.getBytes(), file.onProgress, file.contentType, file.filename);
		return new TextEncoder().encode(MOTOKO_DEDUPLICATION_SENTINEL + hash);
	};
	const downloadFile = async (bytes) => {
		const hash = new TextDecoder().decode(new Uint8Array(bytes)).substring(5);
		const url = await storageClient.getDirectURL(hash);
		return ExternalBlob$1.fromURL(url);
	};
	return createActor(config.backend_canister_id, uploadFile, downloadFile, actorOptions);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set();
		this.subscribe = this.subscribe.bind(this);
	}
	subscribe(listener) {
		this.listeners.add(listener);
		this.onSubscribe();
		return () => {
			this.listeners.delete(listener);
			this.onUnsubscribe();
		};
	}
	hasListeners() {
		return this.listeners.size > 0;
	}
	onSubscribe() {}
	onUnsubscribe() {}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/focusManager.js
var FocusManager = class extends Subscribable {
	#focused;
	#cleanup;
	#setup;
	constructor() {
		super();
		this.#setup = (onFocus) => {
			if (typeof window !== "undefined" && window.addEventListener) {
				const listener = () => onFocus();
				window.addEventListener("visibilitychange", listener, false);
				return () => {
					window.removeEventListener("visibilitychange", listener);
				};
			}
		};
	}
	onSubscribe() {
		if (!this.#cleanup) this.setEventListener(this.#setup);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			this.#cleanup?.();
			this.#cleanup = void 0;
		}
	}
	setEventListener(setup) {
		this.#setup = setup;
		this.#cleanup?.();
		this.#cleanup = setup((focused) => {
			if (typeof focused === "boolean") this.setFocused(focused);
			else this.onFocus();
		});
	}
	setFocused(focused) {
		if (this.#focused !== focused) {
			this.#focused = focused;
			this.onFocus();
		}
	}
	onFocus() {
		const isFocused = this.isFocused();
		this.listeners.forEach((listener) => {
			listener(isFocused);
		});
	}
	isFocused() {
		if (typeof this.#focused === "boolean") return this.#focused;
		return globalThis.document?.visibilityState !== "hidden";
	}
};
var focusManager = new FocusManager();
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/timeoutManager.js
var defaultTimeoutProvider = {
	setTimeout: (callback, delay) => setTimeout(callback, delay),
	clearTimeout: (timeoutId) => clearTimeout(timeoutId),
	setInterval: (callback, delay) => setInterval(callback, delay),
	clearInterval: (intervalId) => clearInterval(intervalId)
};
var TimeoutManager = class {
	#provider = defaultTimeoutProvider;
	#providerCalled = false;
	setTimeoutProvider(provider) {
		this.#provider = provider;
	}
	setTimeout(callback, delay) {
		return this.#provider.setTimeout(callback, delay);
	}
	clearTimeout(timeoutId) {
		this.#provider.clearTimeout(timeoutId);
	}
	setInterval(callback, delay) {
		return this.#provider.setInterval(callback, delay);
	}
	clearInterval(intervalId) {
		this.#provider.clearInterval(intervalId);
	}
};
var timeoutManager = new TimeoutManager();
function systemSetTimeoutZero(callback) {
	setTimeout(callback, 0);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/utils.js
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {}
function functionalUpdate(updater, input) {
	return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
	return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
	return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
	return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
	return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
	const { type = "all", exact, fetchStatus, predicate, queryKey, stale } = filters;
	if (queryKey) {
		if (exact) {
			if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) return false;
		} else if (!partialMatchKey(query.queryKey, queryKey)) return false;
	}
	if (type !== "all") {
		const isActive = query.isActive();
		if (type === "active" && !isActive) return false;
		if (type === "inactive" && isActive) return false;
	}
	if (typeof stale === "boolean" && query.isStale() !== stale) return false;
	if (fetchStatus && fetchStatus !== query.state.fetchStatus) return false;
	if (predicate && !predicate(query)) return false;
	return true;
}
function matchMutation(filters, mutation) {
	const { exact, status, predicate, mutationKey } = filters;
	if (mutationKey) {
		if (!mutation.options.mutationKey) return false;
		if (exact) {
			if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) return false;
		} else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) return false;
	}
	if (status && mutation.state.status !== status) return false;
	if (predicate && !predicate(mutation)) return false;
	return true;
}
function hashQueryKeyByOptions(queryKey, options) {
	return (options?.queryKeyHashFn || hashKey)(queryKey);
}
function hashKey(queryKey) {
	return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
		result[key] = val[key];
		return result;
	}, {}) : val);
}
function partialMatchKey(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (a && b && typeof a === "object" && typeof b === "object") return Object.keys(b).every((key) => partialMatchKey(a[key], b[key]));
	return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b, depth = 0) {
	if (a === b) return a;
	if (depth > 500) return b;
	const array = isPlainArray(a) && isPlainArray(b);
	if (!array && !(isPlainObject(a) && isPlainObject(b))) return b;
	const aSize = (array ? a : Object.keys(a)).length;
	const bItems = array ? b : Object.keys(b);
	const bSize = bItems.length;
	const copy = array ? new Array(bSize) : {};
	let equalItems = 0;
	for (let i = 0; i < bSize; i++) {
		const key = array ? i : bItems[i];
		const aItem = a[key];
		const bItem = b[key];
		if (aItem === bItem) {
			copy[key] = aItem;
			if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
			continue;
		}
		if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
			copy[key] = bItem;
			continue;
		}
		const v = replaceEqualDeep(aItem, bItem, depth + 1);
		copy[key] = v;
		if (v === aItem) equalItems++;
	}
	return aSize === bSize && equalItems === aSize ? a : copy;
}
function shallowEqualObjects(a, b) {
	if (!b || Object.keys(a).length !== Object.keys(b).length) return false;
	for (const key in a) if (a[key] !== b[key]) return false;
	return true;
}
function isPlainArray(value) {
	return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
	if (!hasObjectPrototype(o)) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	const prot = ctor.prototype;
	if (!hasObjectPrototype(prot)) return false;
	if (!prot.hasOwnProperty("isPrototypeOf")) return false;
	if (Object.getPrototypeOf(o) !== Object.prototype) return false;
	return true;
}
function hasObjectPrototype(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
	return new Promise((resolve) => {
		timeoutManager.setTimeout(resolve, timeout);
	});
}
function replaceData(prevData, data, options) {
	if (typeof options.structuralSharing === "function") return options.structuralSharing(prevData, data);
	else if (options.structuralSharing !== false) return replaceEqualDeep(prevData, data);
	return data;
}
function addToEnd(items, item, max = 0) {
	const newItems = [...items, item];
	return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
	const newItems = [item, ...items];
	return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = /* @__PURE__ */ Symbol();
function ensureQueryFn(options, fetchOptions) {
	if (!options.queryFn && fetchOptions?.initialPromise) return () => fetchOptions.initialPromise;
	if (!options.queryFn || options.queryFn === skipToken) return () => Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${options.queryHash}'`));
	return options.queryFn;
}
function shouldThrowError(throwOnError, params) {
	if (typeof throwOnError === "function") return throwOnError(...params);
	return !!throwOnError;
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
	let consumed = false;
	let signal;
	Object.defineProperty(object, "signal", {
		enumerable: true,
		get: () => {
			signal ??= getSignal();
			if (consumed) return signal;
			consumed = true;
			if (signal.aborted) onCancelled();
			else signal.addEventListener("abort", onCancelled, { once: true });
			return signal;
		}
	});
	return object;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/environmentManager.js
var environmentManager = /* @__PURE__ */ (() => {
	let isServerFn = () => isServer;
	return {
		/**
		* Returns whether the current runtime should be treated as a server environment.
		*/
		isServer() {
			return isServerFn();
		},
		/**
		* Overrides the server check globally.
		*/
		setIsServer(isServerValue) {
			isServerFn = isServerValue;
		}
	};
})();
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/thenable.js
function pendingThenable() {
	let resolve;
	let reject;
	const thenable = new Promise((_resolve, _reject) => {
		resolve = _resolve;
		reject = _reject;
	});
	thenable.status = "pending";
	thenable.catch(() => {});
	function finalize(data) {
		Object.assign(thenable, data);
		delete thenable.resolve;
		delete thenable.reject;
	}
	thenable.resolve = (value) => {
		finalize({
			status: "fulfilled",
			value
		});
		resolve(value);
	};
	thenable.reject = (reason) => {
		finalize({
			status: "rejected",
			reason
		});
		reject(reason);
	};
	return thenable;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/notifyManager.js
var defaultScheduler = systemSetTimeoutZero;
function createNotifyManager() {
	let queue = [];
	let transactions = 0;
	let notifyFn = (callback) => {
		callback();
	};
	let batchNotifyFn = (callback) => {
		callback();
	};
	let scheduleFn = defaultScheduler;
	const schedule = (callback) => {
		if (transactions) queue.push(callback);
		else scheduleFn(() => {
			notifyFn(callback);
		});
	};
	const flush = () => {
		const originalQueue = queue;
		queue = [];
		if (originalQueue.length) scheduleFn(() => {
			batchNotifyFn(() => {
				originalQueue.forEach((callback) => {
					notifyFn(callback);
				});
			});
		});
	};
	return {
		batch: (callback) => {
			let result;
			transactions++;
			try {
				result = callback();
			} finally {
				transactions--;
				if (!transactions) flush();
			}
			return result;
		},
		/**
		* All calls to the wrapped function will be batched.
		*/
		batchCalls: (callback) => {
			return (...args) => {
				schedule(() => {
					callback(...args);
				});
			};
		},
		schedule,
		/**
		* Use this method to set a custom notify function.
		* This can be used to for example wrap notifications with `React.act` while running tests.
		*/
		setNotifyFunction: (fn) => {
			notifyFn = fn;
		},
		/**
		* Use this method to set a custom function to batch notifications together into a single tick.
		* By default React Query will use the batch function provided by ReactDOM or React Native.
		*/
		setBatchNotifyFunction: (fn) => {
			batchNotifyFn = fn;
		},
		setScheduler: (fn) => {
			scheduleFn = fn;
		}
	};
}
var notifyManager = createNotifyManager();
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/onlineManager.js
var OnlineManager = class extends Subscribable {
	#online = true;
	#cleanup;
	#setup;
	constructor() {
		super();
		this.#setup = (onOnline) => {
			if (typeof window !== "undefined" && window.addEventListener) {
				const onlineListener = () => onOnline(true);
				const offlineListener = () => onOnline(false);
				window.addEventListener("online", onlineListener, false);
				window.addEventListener("offline", offlineListener, false);
				return () => {
					window.removeEventListener("online", onlineListener);
					window.removeEventListener("offline", offlineListener);
				};
			}
		};
	}
	onSubscribe() {
		if (!this.#cleanup) this.setEventListener(this.#setup);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			this.#cleanup?.();
			this.#cleanup = void 0;
		}
	}
	setEventListener(setup) {
		this.#setup = setup;
		this.#cleanup?.();
		this.#cleanup = setup(this.setOnline.bind(this));
	}
	setOnline(online) {
		if (this.#online !== online) {
			this.#online = online;
			this.listeners.forEach((listener) => {
				listener(online);
			});
		}
	}
	isOnline() {
		return this.#online;
	}
};
var onlineManager = new OnlineManager();
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
	return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
	return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
	constructor(options) {
		super("CancelledError");
		this.revert = options?.revert;
		this.silent = options?.silent;
	}
};
function createRetryer(config) {
	let isRetryCancelled = false;
	let failureCount = 0;
	let continueFn;
	const thenable = pendingThenable();
	const isResolved = () => thenable.status !== "pending";
	const cancel = (cancelOptions) => {
		if (!isResolved()) {
			const error = new CancelledError(cancelOptions);
			reject(error);
			config.onCancel?.(error);
		}
	};
	const cancelRetry = () => {
		isRetryCancelled = true;
	};
	const continueRetry = () => {
		isRetryCancelled = false;
	};
	const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
	const canStart = () => canFetch(config.networkMode) && config.canRun();
	const resolve = (value) => {
		if (!isResolved()) {
			continueFn?.();
			thenable.resolve(value);
		}
	};
	const reject = (value) => {
		if (!isResolved()) {
			continueFn?.();
			thenable.reject(value);
		}
	};
	const pause = () => {
		return new Promise((continueResolve) => {
			continueFn = (value) => {
				if (isResolved() || canContinue()) continueResolve(value);
			};
			config.onPause?.();
		}).then(() => {
			continueFn = void 0;
			if (!isResolved()) config.onContinue?.();
		});
	};
	const run = () => {
		if (isResolved()) return;
		let promiseOrValue;
		const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
		try {
			promiseOrValue = initialPromise ?? config.fn();
		} catch (error) {
			promiseOrValue = Promise.reject(error);
		}
		Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
			if (isResolved()) return;
			const retry = config.retry ?? (environmentManager.isServer() ? 0 : 3);
			const retryDelay = config.retryDelay ?? defaultRetryDelay;
			const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
			const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
			if (isRetryCancelled || !shouldRetry) {
				reject(error);
				return;
			}
			failureCount++;
			config.onFail?.(failureCount, error);
			sleep(delay).then(() => {
				return canContinue() ? void 0 : pause();
			}).then(() => {
				if (isRetryCancelled) reject(error);
				else run();
			});
		});
	};
	return {
		promise: thenable,
		status: () => thenable.status,
		cancel,
		continue: () => {
			continueFn?.();
			return thenable;
		},
		cancelRetry,
		continueRetry,
		canStart,
		start: () => {
			if (canStart()) run();
			else pause().then(run);
			return thenable;
		}
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/removable.js
var Removable = class {
	#gcTimeout;
	destroy() {
		this.clearGcTimeout();
	}
	scheduleGc() {
		this.clearGcTimeout();
		if (isValidTimeout(this.gcTime)) this.#gcTimeout = timeoutManager.setTimeout(() => {
			this.optionalRemove();
		}, this.gcTime);
	}
	updateGcTime(newGcTime) {
		this.gcTime = Math.max(this.gcTime || 0, newGcTime ?? (environmentManager.isServer() ? Infinity : 3e5));
	}
	clearGcTimeout() {
		if (this.#gcTimeout) {
			timeoutManager.clearTimeout(this.#gcTimeout);
			this.#gcTimeout = void 0;
		}
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/query.js
var Query = class extends Removable {
	#initialState;
	#revertState;
	#cache;
	#client;
	#retryer;
	#defaultOptions;
	#abortSignalConsumed;
	constructor(config) {
		super();
		this.#abortSignalConsumed = false;
		this.#defaultOptions = config.defaultOptions;
		this.setOptions(config.options);
		this.observers = [];
		this.#client = config.client;
		this.#cache = this.#client.getQueryCache();
		this.queryKey = config.queryKey;
		this.queryHash = config.queryHash;
		this.#initialState = getDefaultState$1(this.options);
		this.state = config.state ?? this.#initialState;
		this.scheduleGc();
	}
	get meta() {
		return this.options.meta;
	}
	get promise() {
		return this.#retryer?.promise;
	}
	setOptions(options) {
		this.options = {
			...this.#defaultOptions,
			...options
		};
		this.updateGcTime(this.options.gcTime);
		if (this.state && this.state.data === void 0) {
			const defaultState = getDefaultState$1(this.options);
			if (defaultState.data !== void 0) {
				this.setState(successState(defaultState.data, defaultState.dataUpdatedAt));
				this.#initialState = defaultState;
			}
		}
	}
	optionalRemove() {
		if (!this.observers.length && this.state.fetchStatus === "idle") this.#cache.remove(this);
	}
	setData(newData, options) {
		const data = replaceData(this.state.data, newData, this.options);
		this.#dispatch({
			data,
			type: "success",
			dataUpdatedAt: options?.updatedAt,
			manual: options?.manual
		});
		return data;
	}
	setState(state, setStateOptions) {
		this.#dispatch({
			type: "setState",
			state,
			setStateOptions
		});
	}
	cancel(options) {
		const promise = this.#retryer?.promise;
		this.#retryer?.cancel(options);
		return promise ? promise.then(noop).catch(noop) : Promise.resolve();
	}
	destroy() {
		super.destroy();
		this.cancel({ silent: true });
	}
	get resetState() {
		return this.#initialState;
	}
	reset() {
		this.destroy();
		this.setState(this.resetState);
	}
	isActive() {
		return this.observers.some((observer) => resolveEnabled(observer.options.enabled, this) !== false);
	}
	isDisabled() {
		if (this.getObserversCount() > 0) return !this.isActive();
		return this.options.queryFn === skipToken || !this.isFetched();
	}
	isFetched() {
		return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
	}
	isStatic() {
		if (this.getObserversCount() > 0) return this.observers.some((observer) => resolveStaleTime(observer.options.staleTime, this) === "static");
		return false;
	}
	isStale() {
		if (this.getObserversCount() > 0) return this.observers.some((observer) => observer.getCurrentResult().isStale);
		return this.state.data === void 0 || this.state.isInvalidated;
	}
	isStaleByTime(staleTime = 0) {
		if (this.state.data === void 0) return true;
		if (staleTime === "static") return false;
		if (this.state.isInvalidated) return true;
		return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
	}
	onFocus() {
		this.observers.find((x) => x.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: false });
		this.#retryer?.continue();
	}
	onOnline() {
		this.observers.find((x) => x.shouldFetchOnReconnect())?.refetch({ cancelRefetch: false });
		this.#retryer?.continue();
	}
	addObserver(observer) {
		if (!this.observers.includes(observer)) {
			this.observers.push(observer);
			this.clearGcTimeout();
			this.#cache.notify({
				type: "observerAdded",
				query: this,
				observer
			});
		}
	}
	removeObserver(observer) {
		if (this.observers.includes(observer)) {
			this.observers = this.observers.filter((x) => x !== observer);
			if (!this.observers.length) {
				if (this.#retryer) {
					if (this.#abortSignalConsumed || this.#isInitialPausedFetch()) this.#retryer.cancel({ revert: true });
					else this.#retryer.cancelRetry();
				}
				this.scheduleGc();
			}
			this.#cache.notify({
				type: "observerRemoved",
				query: this,
				observer
			});
		}
	}
	getObserversCount() {
		return this.observers.length;
	}
	#isInitialPausedFetch() {
		return this.state.fetchStatus === "paused" && this.state.status === "pending";
	}
	invalidate() {
		if (!this.state.isInvalidated) this.#dispatch({ type: "invalidate" });
	}
	async fetch(options, fetchOptions) {
		if (this.state.fetchStatus !== "idle" && this.#retryer?.status() !== "rejected") {
			if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) this.cancel({ silent: true });
			else if (this.#retryer) {
				this.#retryer.continueRetry();
				return this.#retryer.promise;
			}
		}
		if (options) this.setOptions(options);
		if (!this.options.queryFn) {
			const observer = this.observers.find((x) => x.options.queryFn);
			if (observer) this.setOptions(observer.options);
		}
		const abortController = new AbortController();
		const addSignalProperty = (object) => {
			Object.defineProperty(object, "signal", {
				enumerable: true,
				get: () => {
					this.#abortSignalConsumed = true;
					return abortController.signal;
				}
			});
		};
		const fetchFn = () => {
			const queryFn = ensureQueryFn(this.options, fetchOptions);
			const createQueryFnContext = () => {
				const queryFnContext2 = {
					client: this.#client,
					queryKey: this.queryKey,
					meta: this.meta
				};
				addSignalProperty(queryFnContext2);
				return queryFnContext2;
			};
			const queryFnContext = createQueryFnContext();
			this.#abortSignalConsumed = false;
			if (this.options.persister) return this.options.persister(queryFn, queryFnContext, this);
			return queryFn(queryFnContext);
		};
		const createFetchContext = () => {
			const context2 = {
				fetchOptions,
				options: this.options,
				queryKey: this.queryKey,
				client: this.#client,
				state: this.state,
				fetchFn
			};
			addSignalProperty(context2);
			return context2;
		};
		const context = createFetchContext();
		this.options.behavior?.onFetch(context, this);
		this.#revertState = this.state;
		if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) this.#dispatch({
			type: "fetch",
			meta: context.fetchOptions?.meta
		});
		this.#retryer = createRetryer({
			initialPromise: fetchOptions?.initialPromise,
			fn: context.fetchFn,
			onCancel: (error) => {
				if (error instanceof CancelledError && error.revert) this.setState({
					...this.#revertState,
					fetchStatus: "idle"
				});
				abortController.abort();
			},
			onFail: (failureCount, error) => {
				this.#dispatch({
					type: "failed",
					failureCount,
					error
				});
			},
			onPause: () => {
				this.#dispatch({ type: "pause" });
			},
			onContinue: () => {
				this.#dispatch({ type: "continue" });
			},
			retry: context.options.retry,
			retryDelay: context.options.retryDelay,
			networkMode: context.options.networkMode,
			canRun: () => true
		});
		try {
			const data = await this.#retryer.start();
			if (data === void 0) throw new Error(`${this.queryHash} data is undefined`);
			this.setData(data);
			this.#cache.config.onSuccess?.(data, this);
			this.#cache.config.onSettled?.(data, this.state.error, this);
			return data;
		} catch (error) {
			if (error instanceof CancelledError) {
				if (error.silent) return this.#retryer.promise;
				else if (error.revert) {
					if (this.state.data === void 0) throw error;
					return this.state.data;
				}
			}
			this.#dispatch({
				type: "error",
				error
			});
			this.#cache.config.onError?.(error, this);
			this.#cache.config.onSettled?.(this.state.data, error, this);
			throw error;
		} finally {
			this.scheduleGc();
		}
	}
	#dispatch(action) {
		const reducer = (state) => {
			switch (action.type) {
				case "failed": return {
					...state,
					fetchFailureCount: action.failureCount,
					fetchFailureReason: action.error
				};
				case "pause": return {
					...state,
					fetchStatus: "paused"
				};
				case "continue": return {
					...state,
					fetchStatus: "fetching"
				};
				case "fetch": return {
					...state,
					...fetchState(state.data, this.options),
					fetchMeta: action.meta ?? null
				};
				case "success":
					const newState = {
						...state,
						...successState(action.data, action.dataUpdatedAt),
						dataUpdateCount: state.dataUpdateCount + 1,
						...!action.manual && {
							fetchStatus: "idle",
							fetchFailureCount: 0,
							fetchFailureReason: null
						}
					};
					this.#revertState = action.manual ? newState : void 0;
					return newState;
				case "error":
					const error = action.error;
					return {
						...state,
						error,
						errorUpdateCount: state.errorUpdateCount + 1,
						errorUpdatedAt: Date.now(),
						fetchFailureCount: state.fetchFailureCount + 1,
						fetchFailureReason: error,
						fetchStatus: "idle",
						status: "error",
						isInvalidated: true
					};
				case "invalidate": return {
					...state,
					isInvalidated: true
				};
				case "setState": return {
					...state,
					...action.state
				};
			}
		};
		this.state = reducer(this.state);
		notifyManager.batch(() => {
			this.observers.forEach((observer) => {
				observer.onQueryUpdate();
			});
			this.#cache.notify({
				query: this,
				type: "updated",
				action
			});
		});
	}
};
function fetchState(data, options) {
	return {
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
		...data === void 0 && {
			error: null,
			status: "pending"
		}
	};
}
function successState(data, dataUpdatedAt) {
	return {
		data,
		dataUpdatedAt: dataUpdatedAt ?? Date.now(),
		error: null,
		isInvalidated: false,
		status: "success"
	};
}
function getDefaultState$1(options) {
	const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
	const hasData = data !== void 0;
	const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
	return {
		data,
		dataUpdateCount: 0,
		dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
		error: null,
		errorUpdateCount: 0,
		errorUpdatedAt: 0,
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchMeta: null,
		isInvalidated: false,
		status: hasData ? "success" : "pending",
		fetchStatus: "idle"
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/queryObserver.js
var QueryObserver = class extends Subscribable {
	constructor(client, options) {
		super();
		this.options = options;
		this.#client = client;
		this.#selectError = null;
		this.#currentThenable = pendingThenable();
		this.bindMethods();
		this.setOptions(options);
	}
	#client;
	#currentQuery = void 0;
	#currentQueryInitialState = void 0;
	#currentResult = void 0;
	#currentResultState;
	#currentResultOptions;
	#currentThenable;
	#selectError;
	#selectFn;
	#selectResult;
	#lastQueryWithDefinedData;
	#staleTimeoutId;
	#refetchIntervalId;
	#currentRefetchInterval;
	#trackedProps = /* @__PURE__ */ new Set();
	bindMethods() {
		this.refetch = this.refetch.bind(this);
	}
	onSubscribe() {
		if (this.listeners.size === 1) {
			this.#currentQuery.addObserver(this);
			if (shouldFetchOnMount(this.#currentQuery, this.options)) this.#executeFetch();
			else this.updateResult();
			this.#updateTimers();
		}
	}
	onUnsubscribe() {
		if (!this.hasListeners()) this.destroy();
	}
	shouldFetchOnReconnect() {
		return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnReconnect);
	}
	shouldFetchOnWindowFocus() {
		return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnWindowFocus);
	}
	destroy() {
		this.listeners = /* @__PURE__ */ new Set();
		this.#clearStaleTimeout();
		this.#clearRefetchInterval();
		this.#currentQuery.removeObserver(this);
	}
	setOptions(options) {
		const prevOptions = this.options;
		const prevQuery = this.#currentQuery;
		this.options = this.#client.defaultQueryOptions(options);
		if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, this.#currentQuery) !== "boolean") throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
		this.#updateQuery();
		this.#currentQuery.setOptions(this.options);
		if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) this.#client.getQueryCache().notify({
			type: "observerOptionsUpdated",
			query: this.#currentQuery,
			observer: this
		});
		const mounted = this.hasListeners();
		if (mounted && shouldFetchOptionally(this.#currentQuery, prevQuery, this.options, prevOptions)) this.#executeFetch();
		this.updateResult();
		if (mounted && (this.#currentQuery !== prevQuery || resolveEnabled(this.options.enabled, this.#currentQuery) !== resolveEnabled(prevOptions.enabled, this.#currentQuery) || resolveStaleTime(this.options.staleTime, this.#currentQuery) !== resolveStaleTime(prevOptions.staleTime, this.#currentQuery))) this.#updateStaleTimeout();
		const nextRefetchInterval = this.#computeRefetchInterval();
		if (mounted && (this.#currentQuery !== prevQuery || resolveEnabled(this.options.enabled, this.#currentQuery) !== resolveEnabled(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) this.#updateRefetchInterval(nextRefetchInterval);
	}
	getOptimisticResult(options) {
		const query = this.#client.getQueryCache().build(this.#client, options);
		const result = this.createResult(query, options);
		if (shouldAssignObserverCurrentProperties(this, result)) {
			this.#currentResult = result;
			this.#currentResultOptions = this.options;
			this.#currentResultState = this.#currentQuery.state;
		}
		return result;
	}
	getCurrentResult() {
		return this.#currentResult;
	}
	trackResult(result, onPropTracked) {
		return new Proxy(result, { get: (target, key) => {
			this.trackProp(key);
			onPropTracked?.(key);
			if (key === "promise") {
				this.trackProp("data");
				if (!this.options.experimental_prefetchInRender && this.#currentThenable.status === "pending") this.#currentThenable.reject(/* @__PURE__ */ new Error("experimental_prefetchInRender feature flag is not enabled"));
			}
			return Reflect.get(target, key);
		} });
	}
	trackProp(key) {
		this.#trackedProps.add(key);
	}
	getCurrentQuery() {
		return this.#currentQuery;
	}
	refetch({ ...options } = {}) {
		return this.fetch({ ...options });
	}
	fetchOptimistic(options) {
		const defaultedOptions = this.#client.defaultQueryOptions(options);
		const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
		return query.fetch().then(() => this.createResult(query, defaultedOptions));
	}
	fetch(fetchOptions) {
		return this.#executeFetch({
			...fetchOptions,
			cancelRefetch: fetchOptions.cancelRefetch ?? true
		}).then(() => {
			this.updateResult();
			return this.#currentResult;
		});
	}
	#executeFetch(fetchOptions) {
		this.#updateQuery();
		let promise = this.#currentQuery.fetch(this.options, fetchOptions);
		if (!fetchOptions?.throwOnError) promise = promise.catch(noop);
		return promise;
	}
	#updateStaleTimeout() {
		this.#clearStaleTimeout();
		const staleTime = resolveStaleTime(this.options.staleTime, this.#currentQuery);
		if (environmentManager.isServer() || this.#currentResult.isStale || !isValidTimeout(staleTime)) return;
		const timeout = timeUntilStale(this.#currentResult.dataUpdatedAt, staleTime) + 1;
		this.#staleTimeoutId = timeoutManager.setTimeout(() => {
			if (!this.#currentResult.isStale) this.updateResult();
		}, timeout);
	}
	#computeRefetchInterval() {
		return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
	}
	#updateRefetchInterval(nextInterval) {
		this.#clearRefetchInterval();
		this.#currentRefetchInterval = nextInterval;
		if (environmentManager.isServer() || resolveEnabled(this.options.enabled, this.#currentQuery) === false || !isValidTimeout(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) return;
		this.#refetchIntervalId = timeoutManager.setInterval(() => {
			if (this.options.refetchIntervalInBackground || focusManager.isFocused()) this.#executeFetch();
		}, this.#currentRefetchInterval);
	}
	#updateTimers() {
		this.#updateStaleTimeout();
		this.#updateRefetchInterval(this.#computeRefetchInterval());
	}
	#clearStaleTimeout() {
		if (this.#staleTimeoutId) {
			timeoutManager.clearTimeout(this.#staleTimeoutId);
			this.#staleTimeoutId = void 0;
		}
	}
	#clearRefetchInterval() {
		if (this.#refetchIntervalId) {
			timeoutManager.clearInterval(this.#refetchIntervalId);
			this.#refetchIntervalId = void 0;
		}
	}
	createResult(query, options) {
		const prevQuery = this.#currentQuery;
		const prevOptions = this.options;
		const prevResult = this.#currentResult;
		const prevResultState = this.#currentResultState;
		const prevResultOptions = this.#currentResultOptions;
		const queryInitialState = query !== prevQuery ? query.state : this.#currentQueryInitialState;
		const { state } = query;
		let newState = { ...state };
		let isPlaceholderData = false;
		let data;
		if (options._optimisticResults) {
			const mounted = this.hasListeners();
			const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
			const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
			if (fetchOnMount || fetchOptionally) newState = {
				...newState,
				...fetchState(state.data, query.options)
			};
			if (options._optimisticResults === "isRestoring") newState.fetchStatus = "idle";
		}
		let { error, errorUpdatedAt, status } = newState;
		data = newState.data;
		let skipSelect = false;
		if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
			let placeholderData;
			if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
				placeholderData = prevResult.data;
				skipSelect = true;
			} else placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(this.#lastQueryWithDefinedData?.state.data, this.#lastQueryWithDefinedData) : options.placeholderData;
			if (placeholderData !== void 0) {
				status = "success";
				data = replaceData(prevResult?.data, placeholderData, options);
				isPlaceholderData = true;
			}
		}
		if (options.select && data !== void 0 && !skipSelect) {
			if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) data = this.#selectResult;
			else try {
				this.#selectFn = options.select;
				data = options.select(data);
				data = replaceData(prevResult?.data, data, options);
				this.#selectResult = data;
				this.#selectError = null;
			} catch (selectError) {
				this.#selectError = selectError;
			}
		}
		if (this.#selectError) {
			error = this.#selectError;
			data = this.#selectResult;
			errorUpdatedAt = Date.now();
			status = "error";
		}
		const isFetching = newState.fetchStatus === "fetching";
		const isPending = status === "pending";
		const isError = status === "error";
		const isLoading = isPending && isFetching;
		const hasData = data !== void 0;
		const nextResult = {
			status,
			fetchStatus: newState.fetchStatus,
			isPending,
			isSuccess: status === "success",
			isError,
			isInitialLoading: isLoading,
			isLoading,
			data,
			dataUpdatedAt: newState.dataUpdatedAt,
			error,
			errorUpdatedAt,
			failureCount: newState.fetchFailureCount,
			failureReason: newState.fetchFailureReason,
			errorUpdateCount: newState.errorUpdateCount,
			isFetched: query.isFetched(),
			isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
			isFetching,
			isRefetching: isFetching && !isPending,
			isLoadingError: isError && !hasData,
			isPaused: newState.fetchStatus === "paused",
			isPlaceholderData,
			isRefetchError: isError && hasData,
			isStale: isStale(query, options),
			refetch: this.refetch,
			promise: this.#currentThenable,
			isEnabled: resolveEnabled(options.enabled, query) !== false
		};
		if (this.options.experimental_prefetchInRender) {
			const hasResultData = nextResult.data !== void 0;
			const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
			const finalizeThenableIfPossible = (thenable) => {
				if (isErrorWithoutData) thenable.reject(nextResult.error);
				else if (hasResultData) thenable.resolve(nextResult.data);
			};
			const recreateThenable = () => {
				const pending = this.#currentThenable = nextResult.promise = pendingThenable();
				finalizeThenableIfPossible(pending);
			};
			const prevThenable = this.#currentThenable;
			switch (prevThenable.status) {
				case "pending":
					if (query.queryHash === prevQuery.queryHash) finalizeThenableIfPossible(prevThenable);
					break;
				case "fulfilled":
					if (isErrorWithoutData || nextResult.data !== prevThenable.value) recreateThenable();
					break;
				case "rejected": if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) recreateThenable();
			}
		}
		return nextResult;
	}
	updateResult() {
		const prevResult = this.#currentResult;
		const nextResult = this.createResult(this.#currentQuery, this.options);
		this.#currentResultState = this.#currentQuery.state;
		this.#currentResultOptions = this.options;
		if (this.#currentResultState.data !== void 0) this.#lastQueryWithDefinedData = this.#currentQuery;
		if (shallowEqualObjects(nextResult, prevResult)) return;
		this.#currentResult = nextResult;
		const shouldNotifyListeners = () => {
			if (!prevResult) return true;
			const { notifyOnChangeProps } = this.options;
			const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
			if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) return true;
			const includedProps = new Set(notifyOnChangePropsValue ?? this.#trackedProps);
			if (this.options.throwOnError) includedProps.add("error");
			return Object.keys(this.#currentResult).some((key) => {
				const typedKey = key;
				return this.#currentResult[typedKey] !== prevResult[typedKey] && includedProps.has(typedKey);
			});
		};
		this.#notify({ listeners: shouldNotifyListeners() });
	}
	#updateQuery() {
		const query = this.#client.getQueryCache().build(this.#client, this.options);
		if (query === this.#currentQuery) return;
		const prevQuery = this.#currentQuery;
		this.#currentQuery = query;
		this.#currentQueryInitialState = query.state;
		if (this.hasListeners()) {
			prevQuery?.removeObserver(this);
			query.addObserver(this);
		}
	}
	onQueryUpdate() {
		this.updateResult();
		if (this.hasListeners()) this.#updateTimers();
	}
	#notify(notifyOptions) {
		notifyManager.batch(() => {
			if (notifyOptions.listeners) this.listeners.forEach((listener) => {
				listener(this.#currentResult);
			});
			this.#client.getQueryCache().notify({
				query: this.#currentQuery,
				type: "observerResultsUpdated"
			});
		});
	}
};
function shouldLoadOnMount(query, options) {
	return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
	return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
	if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
		const value = typeof field === "function" ? field(query) : field;
		return value === "always" || value !== false && isStale(query, options);
	}
	return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
	return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
	return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
	if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) return true;
	return false;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/mutation.js
var Mutation = class extends Removable {
	#client;
	#observers;
	#mutationCache;
	#retryer;
	constructor(config) {
		super();
		this.#client = config.client;
		this.mutationId = config.mutationId;
		this.#mutationCache = config.mutationCache;
		this.#observers = [];
		this.state = config.state || getDefaultState();
		this.setOptions(config.options);
		this.scheduleGc();
	}
	setOptions(options) {
		this.options = options;
		this.updateGcTime(this.options.gcTime);
	}
	get meta() {
		return this.options.meta;
	}
	addObserver(observer) {
		if (!this.#observers.includes(observer)) {
			this.#observers.push(observer);
			this.clearGcTimeout();
			this.#mutationCache.notify({
				type: "observerAdded",
				mutation: this,
				observer
			});
		}
	}
	removeObserver(observer) {
		this.#observers = this.#observers.filter((x) => x !== observer);
		this.scheduleGc();
		this.#mutationCache.notify({
			type: "observerRemoved",
			mutation: this,
			observer
		});
	}
	optionalRemove() {
		if (!this.#observers.length) {
			if (this.state.status === "pending") this.scheduleGc();
			else this.#mutationCache.remove(this);
		}
	}
	continue() {
		return this.#retryer?.continue() ?? this.execute(this.state.variables);
	}
	async execute(variables) {
		const onContinue = () => {
			this.#dispatch({ type: "continue" });
		};
		const mutationFnContext = {
			client: this.#client,
			meta: this.options.meta,
			mutationKey: this.options.mutationKey
		};
		this.#retryer = createRetryer({
			fn: () => {
				if (!this.options.mutationFn) return Promise.reject(/* @__PURE__ */ new Error("No mutationFn found"));
				return this.options.mutationFn(variables, mutationFnContext);
			},
			onFail: (failureCount, error) => {
				this.#dispatch({
					type: "failed",
					failureCount,
					error
				});
			},
			onPause: () => {
				this.#dispatch({ type: "pause" });
			},
			onContinue,
			retry: this.options.retry ?? 0,
			retryDelay: this.options.retryDelay,
			networkMode: this.options.networkMode,
			canRun: () => this.#mutationCache.canRun(this)
		});
		const restored = this.state.status === "pending";
		const isPaused = !this.#retryer.canStart();
		try {
			if (restored) onContinue();
			else {
				this.#dispatch({
					type: "pending",
					variables,
					isPaused
				});
				if (this.#mutationCache.config.onMutate) await this.#mutationCache.config.onMutate(variables, this, mutationFnContext);
				const context = await this.options.onMutate?.(variables, mutationFnContext);
				if (context !== this.state.context) this.#dispatch({
					type: "pending",
					context,
					variables,
					isPaused
				});
			}
			const data = await this.#retryer.start();
			await this.#mutationCache.config.onSuccess?.(data, variables, this.state.context, this, mutationFnContext);
			await this.options.onSuccess?.(data, variables, this.state.context, mutationFnContext);
			await this.#mutationCache.config.onSettled?.(data, null, this.state.variables, this.state.context, this, mutationFnContext);
			await this.options.onSettled?.(data, null, variables, this.state.context, mutationFnContext);
			this.#dispatch({
				type: "success",
				data
			});
			return data;
		} catch (error) {
			try {
				await this.#mutationCache.config.onError?.(error, variables, this.state.context, this, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onError?.(error, variables, this.state.context, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.#mutationCache.config.onSettled?.(void 0, error, this.state.variables, this.state.context, this, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onSettled?.(void 0, error, variables, this.state.context, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			this.#dispatch({
				type: "error",
				error
			});
			throw error;
		} finally {
			this.#mutationCache.runNext(this);
		}
	}
	#dispatch(action) {
		const reducer = (state) => {
			switch (action.type) {
				case "failed": return {
					...state,
					failureCount: action.failureCount,
					failureReason: action.error
				};
				case "pause": return {
					...state,
					isPaused: true
				};
				case "continue": return {
					...state,
					isPaused: false
				};
				case "pending": return {
					...state,
					context: action.context,
					data: void 0,
					failureCount: 0,
					failureReason: null,
					error: null,
					isPaused: action.isPaused,
					status: "pending",
					variables: action.variables,
					submittedAt: Date.now()
				};
				case "success": return {
					...state,
					data: action.data,
					failureCount: 0,
					failureReason: null,
					error: null,
					status: "success",
					isPaused: false
				};
				case "error": return {
					...state,
					data: void 0,
					error: action.error,
					failureCount: state.failureCount + 1,
					failureReason: action.error,
					isPaused: false,
					status: "error"
				};
			}
		};
		this.state = reducer(this.state);
		notifyManager.batch(() => {
			this.#observers.forEach((observer) => {
				observer.onMutationUpdate(action);
			});
			this.#mutationCache.notify({
				mutation: this,
				type: "updated",
				action
			});
		});
	}
};
function getDefaultState() {
	return {
		context: void 0,
		data: void 0,
		error: null,
		failureCount: 0,
		failureReason: null,
		isPaused: false,
		status: "idle",
		variables: void 0,
		submittedAt: 0
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/mutationObserver.js
var MutationObserver = class extends Subscribable {
	#client;
	#currentResult = void 0;
	#currentMutation;
	#mutateOptions;
	constructor(client, options) {
		super();
		this.#client = client;
		this.setOptions(options);
		this.bindMethods();
		this.#updateResult();
	}
	bindMethods() {
		this.mutate = this.mutate.bind(this);
		this.reset = this.reset.bind(this);
	}
	setOptions(options) {
		const prevOptions = this.options;
		this.options = this.#client.defaultMutationOptions(options);
		if (!shallowEqualObjects(this.options, prevOptions)) this.#client.getMutationCache().notify({
			type: "observerOptionsUpdated",
			mutation: this.#currentMutation,
			observer: this
		});
		if (prevOptions?.mutationKey && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) this.reset();
		else if (this.#currentMutation?.state.status === "pending") this.#currentMutation.setOptions(this.options);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) this.#currentMutation?.removeObserver(this);
	}
	onMutationUpdate(action) {
		this.#updateResult();
		this.#notify(action);
	}
	getCurrentResult() {
		return this.#currentResult;
	}
	reset() {
		this.#currentMutation?.removeObserver(this);
		this.#currentMutation = void 0;
		this.#updateResult();
		this.#notify();
	}
	mutate(variables, options) {
		this.#mutateOptions = options;
		this.#currentMutation?.removeObserver(this);
		this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
		this.#currentMutation.addObserver(this);
		return this.#currentMutation.execute(variables);
	}
	#updateResult() {
		const state = this.#currentMutation?.state ?? getDefaultState();
		this.#currentResult = {
			...state,
			isPending: state.status === "pending",
			isSuccess: state.status === "success",
			isError: state.status === "error",
			isIdle: state.status === "idle",
			mutate: this.mutate,
			reset: this.reset
		};
	}
	#notify(action) {
		notifyManager.batch(() => {
			if (this.#mutateOptions && this.hasListeners()) {
				const variables = this.#currentResult.variables;
				const onMutateResult = this.#currentResult.context;
				const context = {
					client: this.#client,
					meta: this.options.meta,
					mutationKey: this.options.mutationKey
				};
				if (action?.type === "success") {
					try {
						this.#mutateOptions.onSuccess?.(action.data, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#mutateOptions.onSettled?.(action.data, null, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
				} else if (action?.type === "error") {
					try {
						this.#mutateOptions.onError?.(action.error, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#mutateOptions.onSettled?.(void 0, action.error, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
				}
			}
			this.listeners.forEach((listener) => {
				listener(this.#currentResult);
			});
		});
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/react@19.1.5/node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var assign = Object.assign;
	var emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null,
		V: null
	};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, self, source, owner, props) {
		self = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== self ? self : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, void 0, void 0, void 0, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function noop$1() {}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	function noop() {}
	exports.Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key, owner = void 0;
		if (null != config) for (propName in void 0 !== config.ref && (owner = void 0), void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, void 0, void 0, owner, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, void 0, void 0, null, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = function(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			ReactSharedInternals.T = prevTransition;
		}
	};
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, createDeps, update) {
		var dispatcher = ReactSharedInternals.H;
		if ("function" === typeof update) throw Error("useEffect CRUD overload is not enabled in this build of React.");
		return dispatcher.useEffect(create, createDeps);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.1.5";
}));
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/react@19.1.5/node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/react@19.1.5/node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/react@19.1.5/node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
}));
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+react-query@5.95.2_react@19.1.5/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var QueryClientContext = import_react.createContext(void 0);
var useQueryClient = (queryClient) => {
	const client = import_react.useContext(QueryClientContext);
	if (queryClient) return queryClient;
	if (!client) throw new Error("No QueryClient set, use QueryClientProvider to set one");
	return client;
};
var QueryClientProvider = ({ client, children }) => {
	import_react.useEffect(() => {
		client.mount();
		return () => {
			client.unmount();
		};
	}, [client]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientContext.Provider, {
		value: client,
		children
	});
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+react-query@5.95.2_react@19.1.5/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js
var IsRestoringContext = import_react.createContext(false);
var useIsRestoring = () => import_react.useContext(IsRestoringContext);
IsRestoringContext.Provider;
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+react-query@5.95.2_react@19.1.5/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js
function createValue() {
	let isReset = false;
	return {
		clearReset: () => {
			isReset = false;
		},
		reset: () => {
			isReset = true;
		},
		isReset: () => {
			return isReset;
		}
	};
}
var QueryErrorResetBoundaryContext = import_react.createContext(createValue());
var useQueryErrorResetBoundary = () => import_react.useContext(QueryErrorResetBoundaryContext);
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+react-query@5.95.2_react@19.1.5/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
	const throwOnError = query?.state.error && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
	if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
		if (!errorResetBoundary.isReset()) options.retryOnMount = false;
	}
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
	import_react.useEffect(() => {
		errorResetBoundary.clearReset();
	}, [errorResetBoundary]);
};
var getHasError = ({ result, errorResetBoundary, throwOnError, query, suspense }) => {
	return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+react-query@5.95.2_react@19.1.5/node_modules/@tanstack/react-query/build/modern/suspense.js
var ensureSuspenseTimers = (defaultedOptions) => {
	if (defaultedOptions.suspense) {
		const MIN_SUSPENSE_TIME_MS = 1e3;
		const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
		const originalStaleTime = defaultedOptions.staleTime;
		defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
		if (typeof defaultedOptions.gcTime === "number") defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, MIN_SUSPENSE_TIME_MS);
	}
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
	errorResetBoundary.clearReset();
});
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+react-query@5.95.2_react@19.1.5/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js
function useBaseQuery(options, Observer, queryClient) {
	const isRestoring = useIsRestoring();
	const errorResetBoundary = useQueryErrorResetBoundary();
	const client = useQueryClient(queryClient);
	const defaultedOptions = client.defaultQueryOptions(options);
	client.getDefaultOptions().queries?._experimental_beforeQuery?.(defaultedOptions);
	const query = client.getQueryCache().get(defaultedOptions.queryHash);
	defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
	ensureSuspenseTimers(defaultedOptions);
	ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
	useClearResetErrorBoundary(errorResetBoundary);
	const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
	const [observer] = import_react.useState(() => new Observer(client, defaultedOptions));
	const result = observer.getOptimisticResult(defaultedOptions);
	const shouldSubscribe = !isRestoring && options.subscribed !== false;
	import_react.useSyncExternalStore(import_react.useCallback((onStoreChange) => {
		const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
		observer.updateResult();
		return unsubscribe;
	}, [observer, shouldSubscribe]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
	import_react.useEffect(() => {
		observer.setOptions(defaultedOptions);
	}, [defaultedOptions, observer]);
	if (shouldSuspend(defaultedOptions, result)) throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
	if (getHasError({
		result,
		errorResetBoundary,
		throwOnError: defaultedOptions.throwOnError,
		query,
		suspense: defaultedOptions.suspense
	})) throw result.error;
	client.getDefaultOptions().queries?._experimental_afterQuery?.(defaultedOptions, result);
	if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) (isNewCacheEntry ? fetchOptimistic(defaultedOptions, observer, errorResetBoundary) : query?.promise)?.catch(noop).finally(() => {
		observer.updateResult();
	});
	return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+react-query@5.95.2_react@19.1.5/node_modules/@tanstack/react-query/build/modern/useQuery.js
function useQuery(options, queryClient) {
	return useBaseQuery(options, QueryObserver, queryClient);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+react-query@5.95.2_react@19.1.5/node_modules/@tanstack/react-query/build/modern/useMutation.js
function useMutation(options, queryClient) {
	const client = useQueryClient(queryClient);
	const [observer] = import_react.useState(() => new MutationObserver(client, options));
	import_react.useEffect(() => {
		observer.setOptions(options);
	}, [observer, options]);
	const result = import_react.useSyncExternalStore(import_react.useCallback((onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)), [observer]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
	const mutate = import_react.useCallback((variables, mutateOptions) => {
		observer.mutate(variables, mutateOptions).catch(noop);
	}, [observer]);
	if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) throw result.error;
	return {
		...result,
		mutate,
		mutateAsync: result.mutate
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/app-delegation-source.js
/**
* Thrown when the canister has no session behind the caller: revoked, expired,
* pruned, or never one at all.
*
* This is the one terminal outcome. Everything else a mint can fail with, a
* transport error or an internal canister error, leaves the session alone and is
* worth retrying, so only this type may end a session.
*/
var SessionGoneError = class extends Error {
	constructor(message = "The session behind this identity no longer exists") {
		super(message);
		this.name = "SessionGoneError";
	}
};
/**
* Thrown when the session is one this library cannot act for, however healthy it
* is.
*
* The third outcome, and the reason it is not either of the others: the session
* is neither gone nor worth retrying. Retrying returns the same answer forever,
* and reporting it as gone would retract a record for a sign-in that is alive,
* signing every tab on the domain out of it.
*/
var SessionUnsupportedError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "SessionUnsupportedError";
	}
};
/**
* Thrown when a mint answers for an account the caller was not expecting.
*
* The session is healthy and the mint succeeded; it is the pairing that is
* wrong. So it is neither gone nor retryable — asking again returns the same
* account — and the caller's own record is what has to give way.
*/
var AccountMismatchError = class extends Error {
	constructor() {
		super("The minted delegation is not for the account this origin acts as");
		this.name = "AccountMismatchError";
	}
};
/** Whether two DER-encoded keys are the same bytes. */
var sameKey = (a, b) => a.length === b.length && a.every((byte, i) => byte === b[i]);
/** The leaf of a chain: the key it authorises. */
var delegatesTo = (chain) => chain.delegations[chain.delegations.length - 1]?.delegation.pubkey;
/**
* Whether a chain's leaf authorises `keyDer` — the key that would sign with it.
*
* A chain paired with a key it does not authorise signs nothing the replica will
* accept, and fails with a signature error that points at neither half. Every
* place that holds both halves checks this.
*/
var chainAuthorisesKey = (chain, keyDer) => {
	const leaf = delegatesTo(chain);
	return leaf !== void 0 && sameKey(new Uint8Array(leaf), new Uint8Array(keyDer));
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/identity/identity/ed25519.js
function isObject(value) {
	return value !== null && typeof value === "object";
}
(class Ed25519PublicKey {
	/**
	* Construct Ed25519PublicKey from an existing PublicKey
	* @param {unknown} maybeKey - existing PublicKey, ArrayBuffer, DerEncodedPublicKey, or hex string
	* @returns {Ed25519PublicKey} Instance of Ed25519PublicKey
	*/
	static from(maybeKey) {
		if (typeof maybeKey === "string") {
			const key = hexToBytes(maybeKey);
			return this.fromRaw(key);
		}
		if (isObject(maybeKey)) {
			const key = maybeKey;
			if (isObject(key) && Object.hasOwnProperty.call(key, "__derEncodedPublicKey__")) return this.fromDer(key);
			if (ArrayBuffer.isView(key)) {
				const view = key;
				return this.fromRaw(uint8FromBufLike$1(view.buffer));
			}
			if (key instanceof ArrayBuffer) return this.fromRaw(uint8FromBufLike$1(key));
			if ("rawKey" in key && key.rawKey instanceof Uint8Array) return this.fromRaw(key.rawKey);
			if ("derKey" in key) return this.fromDer(key.derKey);
			if ("toDer" in key) return this.fromDer(key.toDer());
		}
		throw new Error("Cannot construct Ed25519PublicKey from the provided key.");
	}
	static fromRaw(rawKey) {
		return new Ed25519PublicKey(rawKey);
	}
	static fromDer(derKey) {
		return new Ed25519PublicKey(this.derDecode(derKey));
	}
	static {
		this.RAW_KEY_LENGTH = 32;
	}
	static derEncode(publicKey) {
		const key = wrapDER(publicKey, ED25519_OID);
		key.__derEncodedPublicKey__ = void 0;
		return key;
	}
	static derDecode(key) {
		const unwrapped = unwrapDER(key, ED25519_OID);
		if (unwrapped.length !== this.RAW_KEY_LENGTH) throw new Error("An Ed25519 public key must be exactly 32bytes long");
		return unwrapped;
	}
	#rawKey;
	get rawKey() {
		return this.#rawKey;
	}
	#derKey;
	get derKey() {
		return this.#derKey;
	}
	constructor(key) {
		if (key.byteLength !== Ed25519PublicKey.RAW_KEY_LENGTH) throw new Error("An Ed25519 public key must be exactly 32bytes long");
		this.#rawKey = key;
		this.#derKey = Ed25519PublicKey.derEncode(key);
	}
	toDer() {
		return this.derKey;
	}
	toRaw() {
		return this.rawKey;
	}
});
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/identity/identity/ecdsa.js
var CryptoError = class CryptoError extends Error {
	constructor(message) {
		super(message);
		this.message = message;
		Object.setPrototypeOf(this, CryptoError.prototype);
	}
};
/**
* Utility method to ensure that a subtleCrypto implementation is provided or is available in the global context
* @param subtleCrypto SubtleCrypto implementation
* @returns subleCrypto
*/
function _getEffectiveCrypto(subtleCrypto) {
	if (typeof globalThis !== "undefined" && globalThis["crypto"] && globalThis["crypto"]["subtle"]) return globalThis["crypto"]["subtle"];
	if (subtleCrypto) return subtleCrypto;
	if (typeof crypto !== "undefined" && crypto["subtle"]) return crypto.subtle;
	throw new CryptoError("Global crypto was not available and none was provided. Please inlcude a SubtleCrypto implementation. See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto");
}
/**
* An identity interface that wraps an ECDSA keypair using the P-256 named curve. Supports DER-encoding and decoding for agent calls
*/
var ECDSAKeyIdentity = class ECDSAKeyIdentity extends SignIdentity {
	/**
	* Generates a randomly generated identity for use in calls to the Internet Computer.
	* @param {CryptoKeyOptions} options optional settings
	* @param {CryptoKeyOptions['extractable']} options.extractable - whether the key should allow itself to be used. Set to false for maximum security.
	* @param {CryptoKeyOptions['keyUsages']} options.keyUsages - a list of key usages that the key can be used for
	* @param {CryptoKeyOptions['subtleCrypto']} options.subtleCrypto interface
	* @returns a {@link ECDSAKeyIdentity}
	*/
	static async generate(options) {
		const { extractable = false, keyUsages = ["sign", "verify"], subtleCrypto } = options ?? {};
		const effectiveCrypto = _getEffectiveCrypto(subtleCrypto);
		const keyPair = await effectiveCrypto.generateKey({
			name: "ECDSA",
			namedCurve: "P-256"
		}, extractable, keyUsages);
		const derKey = uint8FromBufLike$1(await effectiveCrypto.exportKey("spki", keyPair.publicKey));
		Object.assign(derKey, { __derEncodedPublicKey__: void 0 });
		return new this(keyPair, derKey, effectiveCrypto);
	}
	/**
	* generates an identity from a public and private key. Please ensure that you are generating these keys securely and protect the user's private key
	* @param keyPair a CryptoKeyPair
	* @param subtleCrypto - a SubtleCrypto interface in case one is not available globally
	* @returns an {@link ECDSAKeyIdentity}
	*/
	static async fromKeyPair(keyPair, subtleCrypto) {
		const effectiveCrypto = _getEffectiveCrypto(subtleCrypto);
		const derKey = uint8FromBufLike$1(await effectiveCrypto.exportKey("spki", keyPair.publicKey));
		Object.assign(derKey, { __derEncodedPublicKey__: void 0 });
		return new ECDSAKeyIdentity(keyPair, derKey, effectiveCrypto);
	}
	constructor(keyPair, derKey, subtleCrypto) {
		super();
		this._keyPair = keyPair;
		this._derKey = derKey;
		this._subtleCrypto = subtleCrypto;
	}
	/**
	* Return the internally-used key pair.
	* @returns a CryptoKeyPair
	*/
	getKeyPair() {
		return this._keyPair;
	}
	/**
	* Return the public key.
	* @returns an {@link PublicKey & DerCryptoKey}
	*/
	getPublicKey() {
		const derKey = this._derKey;
		const key = Object.create(this._keyPair.publicKey);
		key.toDer = function() {
			return derKey;
		};
		return key;
	}
	/**
	* Signs a blob of data, with this identity's private key.
	* @param {Uint8Array} challenge - challenge to sign with this identity's secretKey, producing a signature
	* @returns {Promise<Signature>} signature
	*/
	async sign(challenge) {
		const signature = uint8FromBufLike$1(await this._subtleCrypto.sign({
			name: "ECDSA",
			hash: { name: "SHA-256" }
		}, this._keyPair.privateKey, challenge));
		Object.assign(signature, { __signature__: void 0 });
		return signature;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/identity/identity/delegation.js
/**
* Safe wrapper around bytesToHex that handles ArrayBuffer/Uint8Array type conversion.
* Required because `@noble/hashes` v1.8+ strictly expects Uint8Array inputs.
* @param data The binary data to convert to hexadecimal string (ArrayBuffer, Uint8Array, or ArrayLike<number>)
*/
function safeBytesToHex(data) {
	if (data instanceof Uint8Array) return bytesToHex(data);
	return bytesToHex(new Uint8Array(data));
}
function _parseBlob(value) {
	if (typeof value !== "string" || value.length < 64) throw new Error("Invalid public key.");
	return hexToBytes(value);
}
/**
* A single delegation object that is signed by a private key. This is constructed by
* `DelegationChain.create()`.
*
* {@link DelegationChain}
*/
var Delegation = class {
	constructor(pubkey, expiration, targets) {
		this.pubkey = pubkey;
		this.expiration = expiration;
		this.targets = targets;
	}
	toCborValue() {
		return {
			pubkey: this.pubkey,
			expiration: this.expiration,
			...this.targets && { targets: this.targets }
		};
	}
	toJSON() {
		return {
			expiration: this.expiration.toString(16),
			pubkey: safeBytesToHex(this.pubkey),
			...this.targets && { targets: this.targets.map((p) => p.toHex()) }
		};
	}
};
/**
* Sign a single delegation object for a period of time.
* @param from The identity that lends its delegation.
* @param to The identity that receives the delegation.
* @param expiration An expiration date for this delegation.
* @param targets Limit this delegation to the target principals.
*/
async function _createSingleDelegation(from, to, expiration, targets) {
	const delegation = new Delegation(to.toDer(), BigInt(+expiration) * BigInt(1e6), targets);
	const challenge = new Uint8Array([...IC_REQUEST_AUTH_DELEGATION_DOMAIN_SEPARATOR, ...new Uint8Array(requestIdOf({ ...delegation }))]);
	return {
		delegation,
		signature: await from.sign(challenge)
	};
}
/**
* A chain of delegations. This is JSON Serializable.
* This is the object to serialize and pass to a DelegationIdentity. It does not keep any
* private keys.
*/
var DelegationChain = class DelegationChain {
	/**
	* Create a delegation chain between two (or more) keys. By default, the expiration time
	* will be very short (15 minutes).
	*
	* To build a chain of more than 2 identities, this function needs to be called multiple times,
	* passing the previous delegation chain into the options argument. For example:
	* @example
	* const rootKey = createKey();
	* const middleKey = createKey();
	* const bottomeKey = createKey();
	*
	* const rootToMiddle = await DelegationChain.create(
	*   root, middle.getPublicKey(), Date.parse('2100-01-01'),
	* );
	* const middleToBottom = await DelegationChain.create(
	*   middle, bottom.getPublicKey(), Date.parse('2100-01-01'), { previous: rootToMiddle },
	* );
	*
	* // We can now use a delegation identity that uses the delegation above:
	* const identity = DelegationIdentity.fromDelegation(bottomKey, middleToBottom);
	* @param from The identity that will delegate.
	* @param to The identity that gets delegated. It can now sign messages as if it was the
	*           identity above.
	* @param expiration The length the delegation is valid. By default, 15 minutes from calling
	*                   this function.
	* @param options A set of options for this delegation. expiration and previous
	* @param options.previous - Another DelegationChain that this chain should start with.
	* @param options.targets - targets that scope the delegation (e.g. Canister Principals)
	*/
	static async create(from, to, expiration = new Date(Date.now() + 9e5), options = {}) {
		const delegation = await _createSingleDelegation(from, to, expiration, options.targets);
		return new DelegationChain([...options.previous?.delegations || [], delegation], options.previous?.publicKey || from.getPublicKey().toDer());
	}
	/**
	* Creates a DelegationChain object from a JSON string.
	* @param json The JSON string to parse.
	*/
	static fromJSON(json) {
		const { publicKey, delegations } = typeof json === "string" ? JSON.parse(json) : json;
		if (!Array.isArray(delegations)) throw new Error("Invalid delegations.");
		const parsedDelegations = delegations.map((signedDelegation) => {
			const { delegation, signature } = signedDelegation;
			const { pubkey, expiration, targets } = delegation;
			if (targets !== void 0 && !Array.isArray(targets)) throw new Error("Invalid targets.");
			return {
				delegation: new Delegation(_parseBlob(pubkey), BigInt(`0x${expiration}`), targets && targets.map((t) => {
					if (typeof t !== "string") throw new Error("Invalid target.");
					return Principal$1.fromHex(t);
				})),
				signature: _parseBlob(signature)
			};
		});
		return new this(parsedDelegations, _parseBlob(publicKey));
	}
	/**
	* Creates a DelegationChain object from a list of delegations and a DER-encoded public key.
	* @param delegations The list of delegations.
	* @param publicKey The DER-encoded public key of the key-pair signing the first delegation.
	*/
	static fromDelegations(delegations, publicKey) {
		return new this(delegations, publicKey);
	}
	constructor(delegations, publicKey) {
		this.delegations = delegations;
		this.publicKey = publicKey;
	}
	toJSON() {
		return {
			delegations: this.delegations.map((signedDelegation) => {
				const { delegation, signature } = signedDelegation;
				const { targets } = delegation;
				return {
					delegation: {
						expiration: delegation.expiration.toString(16),
						pubkey: safeBytesToHex(delegation.pubkey),
						...targets && { targets: targets.map((t) => t.toHex()) }
					},
					signature: safeBytesToHex(signature)
				};
			}),
			publicKey: safeBytesToHex(this.publicKey)
		};
	}
};
/**
* An Identity that adds delegation to a request. Everywhere in this class, the name
* innerKey refers to the SignIdentity that is being used to sign the requests, while
* originalKey is the identity that is being borrowed. More identities can be used
* in the middle to delegate.
*/
var DelegationIdentity = class extends SignIdentity {
	/**
	* Create a delegation without having access to delegateKey.
	* @param key The key used to sign the requests.
	* @param delegation A delegation object created using `createDelegation`.
	*/
	static fromDelegation(key, delegation) {
		return new this(key, delegation);
	}
	constructor(_inner, _delegation) {
		super();
		this._inner = _inner;
		this._delegation = _delegation;
	}
	getDelegation() {
		return this._delegation;
	}
	getPublicKey() {
		return {
			derKey: this._delegation.publicKey,
			toDer: () => this._delegation.publicKey
		};
	}
	sign(blob) {
		return this._inner.sign(blob);
	}
	async transformRequest(request) {
		const { body, ...fields } = request;
		const requestId = await requestIdOf(body);
		return {
			...fields,
			body: {
				content: body,
				sender_sig: await this.sign(new Uint8Array([...IC_REQUEST_DOMAIN_SEPARATOR, ...new Uint8Array(requestId)])),
				sender_delegation: this._delegation.delegations,
				sender_pubkey: this._delegation.publicKey
			}
		};
	}
};
/**
* Analyze a DelegationChain and validate that it's valid, ie. not expired and apply to the
* scope.
* @param chain The chain to validate.
* @param checks Various checks to validate on the chain.
*/
function isDelegationValid(chain, checks) {
	for (const { delegation } of chain.delegations) if (+new Date(Number(delegation.expiration / BigInt(1e6))) <= +Date.now()) return false;
	const scopes = [];
	const maybeScope = checks?.scope;
	if (maybeScope) {
		if (Array.isArray(maybeScope)) scopes.push(...maybeScope.map((s) => typeof s === "string" ? Principal$1.fromText(s) : s));
		else scopes.push(typeof maybeScope === "string" ? Principal$1.fromText(maybeScope) : maybeScope);
	}
	for (const s of scopes) {
		const scope = s.toText();
		for (const { delegation } of chain.delegations) {
			if (delegation.targets === void 0) continue;
			let none = true;
			for (const target of delegation.targets) if (target.toText() === scope) {
				none = false;
				break;
			}
			if (none) return false;
		}
	}
	return true;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/identity/identity/attributes.js
/**
* An Identity decorator that injects `sender_info` into the request body
* before delegating to an inner identity for signing.
*
* Because `sender_info` is part of the request content, it is included in the
* representation-independent hash (`requestIdOf`) and covered by the sender's
* signature for `call` and `query` endpoints.
*
* The IC does not hash `sender_info` for `read_state` requests, so the
* decorator skips injection for that endpoint to avoid signature verification
* failures on update-call polls.
*
* @example
* ```ts
* const inner = DelegationIdentity.fromDelegation(key, chain);
* const identity = new AttributesIdentity({
*   inner,
*   attributes: { data: new Uint8Array([...]), signature: new Uint8Array([...]) },
*   signer: { canisterId: Principal.fromText('aaaaa-aa') },
* });
* const agent = HttpAgent.create({ identity });
* ```
*/
var AttributesIdentity = class {
	#inner;
	#attributes;
	#signer;
	/**
	* @param options - Configuration for the identity.
	* @param options.inner - The inner identity to delegate signing to.
	* @param options.attributes - The signed attributes to include in the request.
	* @param options.signer - The canister that signed the attributes.
	*/
	constructor(options) {
		this.#inner = options.inner;
		this.#attributes = options.attributes;
		this.#signer = options.signer;
	}
	getPrincipal() {
		return this.#inner.getPrincipal();
	}
	transformRequest(request) {
		if (request.endpoint === Endpoint.ReadState) return this.#inner.transformRequest(request);
		return this.#inner.transformRequest({
			...request,
			body: {
				...request.body,
				sender_info: {
					signer: this.#signer.canisterId.toUint8Array(),
					info: this.#attributes.data,
					sig: this.#attributes.signature
				}
			}
		});
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+core@5.4.0/node_modules/@icp-sdk/core/lib/esm/identity/identity/webauthn.js
var PubKeyCoseAlgo;
(function(PubKeyCoseAlgo) {
	PubKeyCoseAlgo[PubKeyCoseAlgo["ECDSA_WITH_SHA256"] = -7] = "ECDSA_WITH_SHA256";
})(PubKeyCoseAlgo || (PubKeyCoseAlgo = {}));
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+signer@5.6.3_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/signer/lib/esm/signer.js
var GENERIC_ERROR = 1e3;
var NETWORK_ERROR = 4e3;
var toBase64$1 = (bytes) => {
	if ("toBase64" in bytes && typeof bytes.toBase64 === "function") return bytes.toBase64();
	let binary = "";
	for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
	return globalThis.btoa(binary);
};
var fromBase64$1 = (str) => {
	if ("fromBase64" in Uint8Array && typeof Uint8Array.fromBase64 === "function") return Uint8Array.fromBase64(str);
	const binary = globalThis.atob(str);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
};
var asRecord = (value) => typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
var asString = (value) => typeof value === "string" ? value : void 0;
var asArray = (value) => Array.isArray(value) ? value : void 0;
var bytesEqual = (a, b) => a.length === b.length && a.every((byte, index) => byte === b[index]);
var toExpiration = (value) => {
	if (typeof value !== "string" || !/^[0-9]{1,20}$/.test(value)) throw new Error("Invalid delegation expiration");
	const expiration = BigInt(value);
	if (expiration >= 2n ** 64n) throw new Error("Invalid delegation expiration");
	return expiration;
};
var assertLeafKey = (delegations, publicKey) => {
	const leaf = delegations[delegations.length - 1]?.delegation.pubkey;
	if (leaf !== void 0 && bytesEqual(new Uint8Array(leaf), new Uint8Array(publicKey.toDer()))) return;
	throw new Error("Returned delegation chain does not terminate at the requested public key");
};
var assertTargetScope = (delegations, targets) => {
	if (targets === void 0) return;
	const requested = new Set(targets.map((target) => target.toText()));
	const scopedHops = delegations.map(({ delegation }) => delegation.targets).filter((hopTargets) => hopTargets !== void 0);
	if (scopedHops.length === 0) throw new Error("Returned delegation is unscoped but scoped targets were requested");
	let effective;
	for (const hop of scopedHops) {
		const hopSet = new Set(hop.map((target) => target.toText()));
		effective = effective === void 0 ? hopSet : new Set([...effective].filter((target) => hopSet.has(target)));
	}
	for (const target of effective ?? []) if (!requested.has(target)) throw new Error("Returned delegation targets are broader than requested");
};
var assertLifetime = (delegations, maxTimeToLive) => {
	const first = delegations[0];
	if (maxTimeToLive === void 0 || first === void 0) return;
	const delegationChainExpiration = delegations.reduce((earliestExpiration, { delegation }) => delegation.expiration < earliestExpiration ? delegation.expiration : earliestExpiration, first.delegation.expiration);
	const skewNs = 5n * 60n * 1000000000n;
	if (delegationChainExpiration > BigInt(Date.now()) * 1000000n + maxTimeToLive + skewNs) throw new Error("Returned delegation expires later than the requested maxTimeToLive");
};
var validateDelegationChain = (chain, params) => {
	assertLeafKey(chain.delegations, params.publicKey);
	assertTargetScope(chain.delegations, params.targets);
	assertLifetime(chain.delegations, params.maxTimeToLive);
};
/**
* Ensures a JSON-RPC request contains only valid JSON values by
* round-tripping through `JSON.stringify` / `JSON.parse`.
*
* - Properties with `undefined` values are stripped.
* - `undefined`, `NaN`, and `Infinity` inside arrays become `null`.
* - Non-serializable values such as `BigInt` will cause an error.
* @param request - The JSON-RPC request to clean.
*/
var jsonCleanTransform = (request) => JSON.parse(JSON.stringify(request));
/**
* Creates a transform that appends the ICRC-95 derivation origin to request params.
* @param derivationOrigin - The derivation origin URL to include.
* @see https://github.com/dfinity/wg-identity-authentication/blob/main/topics/icrc_95_derivationorigin.md
*/
var icrc95DerivationOriginTransform = (derivationOrigin) => {
	return (request) => ({
		...request,
		params: {
			...request.params,
			icrc95DerivationOrigin: derivationOrigin
		}
	});
};
/**
* Error thrown when a signer returns a JSON-RPC error response
* or when a transport-level failure occurs.
*/
var SignerError = class extends Error {
	/** The JSON-RPC error code. */
	code;
	/** Optional additional error data from the signer. */
	data;
	constructor(error, options) {
		super(error.message, options);
		this.code = error.code;
		this.data = error.data;
	}
};
/**
* Client for interacting with an ICRC-25 compliant signer.
*
* Signers are applications that hold private keys and can sign messages
* on behalf of a user. They communicate over a {@link Transport} using
* JSON-RPC 2.0 messages as defined by the ICRC-25 standard.
* @see https://github.com/dfinity/wg-identity-authentication/blob/main/topics/icrc_25_signer_interaction_standard.md
* @example
* ```ts
* import { Signer } from "@icp-sdk/signer";
* import { PostMessageTransport } from "@icp-sdk/signer/web";
*
* const transport = new PostMessageTransport({ url: "https://oisy.com/sign" });
* const signer = new Signer({ transport });
*
* const standards = await signer.getSupportedStandards();
* const accounts = await signer.getAccounts();
* ```
*/
var Signer = class {
	#options;
	#channel;
	#establishingChannel;
	#scheduledChannelClosure;
	#pendingRequestCount = 0;
	constructor(options) {
		const transforms = [...options.transforms ?? []];
		if (options.derivationOrigin) transforms.push(icrc95DerivationOriginTransform(options.derivationOrigin));
		transforms.push(jsonCleanTransform);
		this.#options = {
			autoCloseTransportChannel: true,
			closeTransportChannelAfter: 200,
			crypto: globalThis.crypto,
			...options,
			transforms
		};
	}
	/** The transport used to communicate with the signer. */
	get transport() {
		return this.#options.transport;
	}
	/**
	* Whether the transport channel auto-closes after a response is received.
	* Can be toggled at runtime, which is useful for multi-step flows that
	* need to await async work between requests without losing the channel.
	* Setting this to `false` also cancels any auto-close already scheduled
	* by a prior response.
	*/
	get autoCloseTransportChannel() {
		return this.#options.autoCloseTransportChannel;
	}
	set autoCloseTransportChannel(value) {
		this.#options.autoCloseTransportChannel = value;
		if (!value) clearTimeout(this.#scheduledChannelClosure);
	}
	/**
	* Opens a communication channel with the signer.
	* Reuses an existing open channel if available.
	*/
	async openChannel() {
		clearTimeout(this.#scheduledChannelClosure);
		if (this.#establishingChannel) await this.#establishingChannel;
		if (this.#channel && !this.#channel.closed) return this.#channel;
		const channel = this.#options.transport.establishChannel();
		this.#establishingChannel = channel.then(() => {}).catch(() => {});
		this.#channel = void 0;
		this.#channel = await channel.catch((error) => {
			throw new SignerError({
				code: NETWORK_ERROR,
				message: error instanceof Error ? error.message : "Network error"
			}, { cause: error });
		});
		this.#establishingChannel = void 0;
		return this.#channel;
	}
	/** Closes the current communication channel, if open. */
	async closeChannel() {
		await this.#channel?.close();
	}
	/**
	* Sends a JSON-RPC request over the transport channel.
	* @param request - The JSON-RPC request to send.
	*/
	async sendRequest(request) {
		const channel = await this.openChannel();
		const { promise, resolve, reject } = Promise.withResolvers();
		const expectsResponse = request.id !== void 0 && request.id !== null;
		if (expectsResponse) this.#pendingRequestCount++;
		let settled = false;
		const settle = () => {
			if (settled) return;
			settled = true;
			if (expectsResponse) this.#pendingRequestCount--;
		};
		const removeResponseListener = channel.addEventListener("response", (response) => {
			if (response.id !== request.id) return;
			removeResponseListener();
			removeCloseListener();
			settle();
			if ("error" in response && (typeof response.error !== "object" || response.error === null || typeof response.error.code !== "number" || typeof response.error.message !== "string")) resolve({
				jsonrpc: "2.0",
				id: response.id,
				error: {
					code: GENERIC_ERROR,
					message: "Invalid error response from signer"
				}
			});
			else resolve(response);
			if (this.#options.autoCloseTransportChannel && this.#pendingRequestCount === 0) this.#scheduledChannelClosure = setTimeout(() => {
				if (!channel.closed) channel.close();
			}, this.#options.closeTransportChannelAfter);
		});
		const removeCloseListener = channel.addEventListener("close", () => {
			removeResponseListener();
			removeCloseListener();
			settle();
			reject(new SignerError({
				code: NETWORK_ERROR,
				message: "Channel was closed before a response was received"
			}));
		});
		let transformedRequest;
		try {
			transformedRequest = this.#applyTransforms(request);
		} catch (cause) {
			removeResponseListener();
			removeCloseListener();
			settle();
			reject(new SignerError({
				code: GENERIC_ERROR,
				message: `Transform failed: ${cause instanceof Error ? cause.message : cause}`
			}, { cause }));
			return promise;
		}
		try {
			await channel.send(transformedRequest);
		} catch (error) {
			removeResponseListener();
			removeCloseListener();
			settle();
			reject(new SignerError({
				code: NETWORK_ERROR,
				message: error instanceof Error ? error.message : "Network error"
			}, { cause: error }));
		}
		return promise;
	}
	/**
	* Queries which ICRC standards the signer supports.
	* Use this to determine signer capabilities before calling other methods.
	* @see https://github.com/dfinity/wg-identity-authentication/blob/main/topics/icrc_25_signer_interaction_standard.md
	*/
	getSupportedStandards() {
		return this.#rpc({
			method: "icrc25_supported_standards",
			decode: (result) => {
				const standards = asArray(asRecord(result)?.supportedStandards);
				if (!standards) throw new Error("Expected supportedStandards array");
				return standards.map((item) => {
					const obj = asRecord(item);
					const name = asString(obj?.name);
					const url = asString(obj?.url);
					if (name === void 0 || url === void 0) throw new Error("Expected { name, url }");
					return {
						name,
						url
					};
				});
			}
		});
	}
	/**
	* Requests the signer to grant permission for the given scopes.
	* The signer may prompt the user for approval.
	* @param scopes - The permission scopes to request.
	* @returns The current state of each requested scope after the user's decision.
	*/
	requestPermissions(scopes) {
		return this.#rpc({
			method: "icrc25_request_permissions",
			params: scopes,
			encode: (scopes) => ({ scopes }),
			decode: (result) => {
				const scopes = asArray(asRecord(result)?.scopes);
				if (!scopes) throw new Error("Expected scopes array");
				return scopes.map((item) => {
					const obj = asRecord(item);
					const scope = asRecord(obj?.scope);
					const state = asString(obj?.state);
					if (!scope || typeof scope.method !== "string" || !state) throw new Error("Expected { scope: { method }, state }");
					return {
						scope,
						state
					};
				});
			}
		});
	}
	/**
	* Queries the current state of all permission scopes.
	* @returns The current permission state for each scope the signer supports.
	*/
	getPermissions() {
		return this.#rpc({
			method: "icrc25_permissions",
			decode: (result) => {
				const scopes = asArray(asRecord(result)?.scopes);
				if (!scopes) throw new Error("Expected scopes array");
				return scopes.map((item) => {
					const obj = asRecord(item);
					const scope = asRecord(obj?.scope);
					const state = asString(obj?.state);
					if (!scope || typeof scope.method !== "string" || !state) throw new Error("Expected { scope: { method }, state }");
					return {
						scope,
						state
					};
				});
			}
		});
	}
	/**
	* Requests the accounts managed by the signer.
	* Each account has an owner {@link Principal} and an optional 32-byte subaccount.
	*
	* Requires the `icrc27_accounts` permission scope.
	* @see https://github.com/dfinity/wg-identity-authentication/blob/main/topics/icrc_27_accounts.md
	*/
	getAccounts() {
		return this.#rpc({
			method: "icrc27_accounts",
			decode: (result) => {
				const accounts = asArray(asRecord(result)?.accounts);
				if (!accounts) throw new Error("Expected accounts array");
				return accounts.map((item) => {
					const obj = asRecord(item);
					const owner = asString(obj?.owner);
					const subaccount = asString(obj?.subaccount);
					if (!owner) throw new Error("Expected account.owner string");
					return {
						owner: Principal$1.fromText(owner),
						subaccount: subaccount !== void 0 ? fromBase64$1(subaccount) : void 0
					};
				});
			}
		});
	}
	/**
	* Requests a delegation chain from the signer for session-based authentication.
	* This allows the relying party to sign canister calls without requiring
	* user approval for each individual call.
	* @param params - The delegation request parameters.
	* @param params.publicKey - The session's public key to delegate to.
	* @param params.targets - Optional canister IDs to restrict the delegation to.
	*   When provided, the signer creates an account delegation; otherwise a
	*   relying party delegation.
	* @param params.maxTimeToLive - Optional maximum delegation lifetime in nanoseconds.
	* @returns A {@link DelegationChain} that can be used with `DelegationIdentity`.
	* @see https://github.com/dfinity/wg-identity-authentication/blob/main/topics/icrc_34_delegation.md
	*/
	requestDelegation(params) {
		return this.#rpc({
			method: "icrc34_delegation",
			params,
			encode: (v) => ({
				publicKey: toBase64$1(new Uint8Array(v.publicKey.toDer())),
				targets: v.targets?.map((t) => t.toText()),
				maxTimeToLive: v.maxTimeToLive !== void 0 ? String(v.maxTimeToLive) : void 0
			}),
			decode: (result) => {
				const r = asRecord(result);
				const publicKey = asString(r?.publicKey);
				const signerDelegation = asArray(r?.signerDelegation);
				if (!publicKey || !signerDelegation) throw new Error("Expected { publicKey, signerDelegation }");
				const chain = DelegationChain.fromDelegations(signerDelegation.map((item) => {
					const obj = asRecord(item);
					const del = asRecord(obj?.delegation);
					const pubkey = asString(del?.pubkey);
					const expiration = del?.expiration;
					const signature = asString(obj?.signature);
					if (!pubkey || expiration === void 0 || !signature) throw new Error("Expected delegation { pubkey, expiration, signature }");
					const targets = asArray(del?.targets);
					return {
						delegation: new Delegation(fromBase64$1(pubkey), toExpiration(expiration), targets?.map((t) => Principal$1.fromText(t))),
						signature: fromBase64$1(signature)
					};
				}), fromBase64$1(publicKey));
				validateDelegationChain(chain, params);
				return chain;
			}
		});
	}
	/**
	* Requests the signer to execute a canister call on behalf of the user.
	* The signer will prompt the user for approval before signing and
	* submitting the call to the Internet Computer.
	* @param params - The canister call parameters.
	* @param params.canisterId - The target canister.
	* @param params.sender - The principal executing the call.
	* @param params.method - The canister method to invoke.
	* @param params.arg - The Candid-encoded call arguments.
	* @param params.nonce - Optional nonce (max 32 bytes) for replay protection.
	* @returns The CBOR-encoded content map and certificate from the IC,
	*   which can be used to verify the call's execution.
	* @see https://github.com/dfinity/wg-identity-authentication/blob/main/topics/icrc_49_call_canister.md
	*/
	callCanister(params) {
		return this.#rpc({
			method: "icrc49_call_canister",
			params,
			encode: (v) => ({
				canisterId: v.canisterId.toText(),
				sender: v.sender.toText(),
				method: v.method,
				arg: toBase64$1(v.arg),
				nonce: v.nonce !== void 0 ? toBase64$1(v.nonce) : void 0
			}),
			decode: (result) => {
				const r = asRecord(result);
				const contentMap = asString(r?.contentMap);
				const certificate = asString(r?.certificate);
				if (!contentMap || !certificate) throw new Error("Expected { contentMap, certificate }");
				return {
					contentMap: fromBase64$1(contentMap),
					certificate: fromBase64$1(certificate)
				};
			}
		});
	}
	/**
	* Sends a JSON-RPC request to the signer and decodes the result.
	* Handles encoding params, validating the response, and throwing
	* {@link SignerError} on JSON-RPC errors or invalid results.
	* @param args - The RPC call configuration.
	*/
	async #rpc(args) {
		let params;
		if (args.encode) try {
			params = args.encode(args.params);
		} catch (cause) {
			throw new SignerError({
				code: GENERIC_ERROR,
				message: `Failed to encode params: ${cause instanceof Error ? cause.message : cause}`
			}, { cause });
		}
		const response = await this.sendRequest({
			id: this.#options.crypto.randomUUID(),
			jsonrpc: "2.0",
			method: args.method,
			params
		});
		if ("error" in response) throw new SignerError(response.error);
		if ("result" in response) try {
			return args.decode(response.result);
		} catch (cause) {
			throw new SignerError({
				code: GENERIC_ERROR,
				message: `Invalid result from signer: ${cause instanceof Error ? cause.message : cause}`
			}, { cause });
		}
		throw new SignerError({
			code: GENERIC_ERROR,
			message: "Response contains neither result nor error"
		});
	}
	/**
	* Applies all configured transforms to a JSON-RPC request.
	* @param request - The JSON-RPC request to transform.
	*/
	#applyTransforms(request) {
		return this.#options.transforms.reduce((req, transform) => transform(req), request);
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+signer@5.6.3_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/signer/lib/esm/transport.js
var isJsonRpcResponse = (message) => typeof message === "object" && message !== null && message.jsonrpc === "2.0" && "id" in message && (typeof message.id === "string" || typeof message.id === "number");
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+signer@5.6.3_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/signer/lib/esm/web/heartbeat/client.js
var HeartbeatClient = class {
	#options;
	#status;
	constructor(options) {
		this.#options = {
			establishTimeout: 1e4,
			pendingTimeout: 3e5,
			disconnectTimeout: 5e3,
			statusPollingRate: 300,
			window: globalThis.window,
			crypto: globalThis.crypto,
			...options
		};
		this.#establish();
	}
	#establish() {
		let pending = [];
		const create = () => {
			const id = this.#options.crypto.randomUUID();
			pending.push(id);
			return id;
		};
		const listener = this.#receiveStatusResponse((response) => {
			if ("result" in response.data && response.data.id !== null && pending.includes(response.data.id)) {
				pending = [];
				listener();
				clearInterval(interval);
				clearTimeout(timeout);
				this.#status = response.data.result;
				this.#options.onEstablish(response.origin, response.data.result);
				this.#maintain(response.origin, response.data.result);
			}
		});
		const timeout = setTimeout(() => {
			listener();
			clearInterval(interval);
			this.#options.onEstablishTimeout();
		}, this.#options.establishTimeout);
		const interval = setInterval(() => this.#sendStatusRequest(create()), this.#options.statusPollingRate);
	}
	#maintain(origin, status) {
		let timeout;
		let pending = [];
		const consume = (id) => {
			const index = pending.findIndex((entry) => entry.id === id);
			if (index > -1) pending.splice(index, 1);
			return index > -1;
		};
		const create = () => {
			const id = this.#options.crypto.randomUUID();
			const time = Date.now();
			pending = pending.filter((entry) => time - this.#options.disconnectTimeout > entry.time);
			pending.push({
				id,
				time
			});
			return id;
		};
		const resetTimeout = (status) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				listener();
				this.#options.onDisconnect();
			}, status === "pending" ? this.#options.pendingTimeout : this.#options.disconnectTimeout);
		};
		const listener = this.#receiveStatusResponse((response) => {
			if ("result" in response.data && response.data.id !== null && response.origin === origin && consume(response.data.id)) {
				resetTimeout(response.data.result);
				if (this.#status !== response.data.result) {
					this.#status = response.data.result;
					this.#options.onStatusChange(response.data.result);
				}
			}
			setTimeout(() => this.#sendStatusRequest(create()), this.#options.statusPollingRate);
		});
		resetTimeout(status);
		this.#sendStatusRequest(create());
	}
	#receiveStatusResponse(handler) {
		const listener = (event) => {
			if (event.source === this.#options.signerWindow && isJsonRpcResponse(event.data) && "result" in event.data && (event.data.result === "pending" || event.data.result === "ready")) handler(event);
		};
		this.#options.window.addEventListener("message", listener);
		return () => this.#options.window.removeEventListener("message", listener);
	}
	#sendStatusRequest(id) {
		this.#options.signerWindow.postMessage({
			jsonrpc: "2.0",
			id,
			method: "icrc29_status"
		}, "*");
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+signer@5.6.3_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/signer/lib/esm/web/postMessageTransport.js
var NON_CLICK_ESTABLISHMENT_LINK = "https://github.com/slide-computer/signer-js/blob/main/packages/signer-web/README.md#channels-must-be-established-in-a-click-handler";
/** Error thrown by {@link PostMessageTransport} for transport-level failures. */
var PostMessageTransportError = class extends Error {};
var withinClick = false;
if (globalThis.window) {
	globalThis.window.addEventListener("click", () => withinClick = true, true);
	globalThis.window.addEventListener("click", () => withinClick = false);
}
/**
* ICRC-29 post message transport for communicating with web-based signers.
*
* Opens a window to the signer's URL and establishes a communication channel
* using the ICRC-29 heartbeat protocol (`icrc29_status` polling). Messages
* are exchanged via `window.postMessage`.
* @see https://github.com/dfinity/wg-identity-authentication/blob/main/topics/icrc_29_window_post_message_transport.md
* @example
* ```ts
* const transport = new PostMessageTransport({ url: "https://oisy.com/sign" });
* const signer = new Signer({ transport });
* ```
*/
var PostMessageTransport = class {
	#options;
	constructor(options) {
		if (!(() => {
			try {
				const url = new URL(options.url);
				return url.protocol === "https:" || url.hostname === "127.0.0.1" || url.hostname.split(".").slice(-1)[0] === "localhost";
			} catch {
				return false;
			}
		})()) throw new PostMessageTransportError("Invalid signer RPC url");
		this.#options = {
			windowOpenerFeatures: "",
			window: globalThis.window,
			establishTimeout: 12e4,
			pendingTimeout: 3e5,
			disconnectTimeout: 2e3,
			statusPollingRate: 300,
			crypto: globalThis.crypto,
			manageFocus: true,
			closeOnEstablishTimeout: true,
			closeOnPendingTimeout: true,
			detectNonClickEstablishment: true,
			...options
		};
	}
	/**
	* Opens the signer window and establishes a communication channel
	* via the ICRC-29 heartbeat handshake.
	* @throws {PostMessageTransportError} If called outside a click handler
	*   (when `detectNonClickEstablishment` is enabled), if the window
	*   cannot be opened, or if the handshake times out.
	*/
	establishChannel() {
		if (this.#options.detectNonClickEstablishment && !withinClick) return Promise.reject(new PostMessageTransportError(`Signer window should not be opened outside of click handler, see: ${NON_CLICK_ESTABLISHMENT_LINK}`));
		let signerWindow;
		try {
			const result = this.#options.window.open(this.#options.url, `${new URL(this.#options.url).origin}-signer-window`, this.#options.windowOpenerFeatures);
			if (!result) return Promise.reject(new PostMessageTransportError("Signer window could not be opened"));
			signerWindow = result;
		} catch (error) {
			return Promise.reject(new PostMessageTransportError(error instanceof Error ? error.message : "Signer window could not be opened"));
		}
		return new Promise((resolve, reject) => {
			let channel;
			new HeartbeatClient({
				...this.#options,
				signerWindow,
				onEstablish: (origin, status) => {
					channel = new PostMessageChannel({
						...this.#options,
						signerOrigin: origin,
						signerWindow,
						signerStatus: status
					});
					resolve(channel);
				},
				onEstablishTimeout: () => {
					if (this.#options.closeOnEstablishTimeout) signerWindow.close();
					reject(new PostMessageTransportError("Communication channel could not be established within a reasonable time"));
				},
				onPendingTimeout: () => {
					if (this.#options.closeOnPendingTimeout) signerWindow.close();
					reject(new PostMessageTransportError("Communication channel was pending for too long"));
				},
				onDisconnect: () => channel.close(),
				onStatusChange: (status) => channel.changeStatus(status)
			});
		});
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+signer@5.6.3_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/signer/lib/esm/web/postMessageChannel.js
/**
* A {@link Channel} implementation that communicates with a signer
* via `window.postMessage`. Created by {@link PostMessageTransport}
* after the ICRC-29 heartbeat handshake completes.
*
* Messages are filtered by source window and origin to prevent
* cross-origin interference. When the signer status is `"pending"`,
* outgoing messages are queued and flushed when it becomes `"ready"`.
*/
var PostMessageChannel = class {
	#closeListeners = /* @__PURE__ */ new Set();
	#options;
	#closed = false;
	#pendingQueue = [];
	constructor(options) {
		this.#options = {
			signerStatus: "ready",
			window: globalThis.window,
			manageFocus: true,
			...options
		};
	}
	/** Whether this channel has been closed. */
	get closed() {
		return this.#closed || this.#options.signerWindow.closed;
	}
	addEventListener(...[event, listener]) {
		switch (event) {
			case "close":
				this.#closeListeners.add(listener);
				return () => {
					this.#closeListeners.delete(listener);
				};
			case "response": {
				const messageListener = (event) => {
					if (event.source !== this.#options.signerWindow || event.origin !== this.#options.signerOrigin || !isJsonRpcResponse(event.data)) return;
					listener(event.data);
				};
				this.#options.window.addEventListener("message", messageListener);
				return () => {
					this.#options.window.removeEventListener("message", messageListener);
				};
			}
		}
	}
	/**
	* Sends a JSON-RPC request to the signer. If the signer status is
	* `"pending"`, the request is queued until {@link changeStatus} is
	* called with `"ready"`.
	* @param request - The JSON-RPC request to send.
	*/
	send(request) {
		if (this.closed) return Promise.reject(new PostMessageTransportError("Communication channel is closed"));
		if (this.#options.signerStatus === "pending") {
			this.#pendingQueue.push(request);
			return Promise.resolve();
		}
		try {
			this.#options.signerWindow.postMessage(request, this.#options.signerOrigin);
			if (this.#options.manageFocus) this.#options.signerWindow.focus();
		} catch (error) {
			return Promise.reject(error);
		}
		return Promise.resolve();
	}
	/** Closes the signer window and notifies all close listeners. */
	close() {
		if (this.#closed) return Promise.resolve();
		this.#closed = true;
		this.#options.signerWindow.close();
		if (this.#options.manageFocus) this.#options.window.focus();
		for (const listener of this.#closeListeners) listener();
		return Promise.resolve();
	}
	/**
	* Updates the signer status. When transitioning to `"ready"`,
	* all queued messages are flushed to the signer window.
	* @param status - The new signer status.
	*/
	changeStatus(status) {
		this.#options.signerStatus = status;
		if (status === "ready") {
			const requests = this.#pendingQueue;
			this.#pendingQueue = [];
			requests.forEach((request) => {
				this.#options.signerWindow.postMessage(request, this.#options.signerOrigin);
			});
		}
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+signer@5.6.3_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/signer/lib/esm/web/urlChannel.js
var requestKey = (request) => JSON.stringify({
	method: request.method,
	params: request.params ?? null
});
/**
* A {@link Channel} implementation for the ICRC-167 browser URL transport,
* driving a shared {@link UrlFlow} journal.
*
* Each request either resolves from the journal (a replayed call on the return
* load) or is buffered for the next redirect. Concurrently issued requests are
* coalesced by the flow into a single JSON-RPC batch and one redirect. When the
* redirect fires the page unloads, so the caller's awaited response never
* arrives on this load — it arrives on the return load, when the calling code
* replays this request and it resolves from the journal.
*
* Callers need no explicit resume or cleanup step: a signer return continues
* the flow, and any other load starts a fresh one. Issue the same requests (and
* `memoize` steps) in the same order on every load, and route any value a
* request depends on through `memoize` so it stays stable across the redirect;
* see {@link UrlFlow} and the module README for the replay contract.
* @see https://github.com/dfinity/wg-identity-authentication/blob/main/topics/icrc_167_browser_url_transport.md
*/
var UrlChannel = class {
	#flow;
	#closeListeners = /* @__PURE__ */ new Set();
	#responseListeners = /* @__PURE__ */ new Set();
	#closed = false;
	constructor(flow) {
		this.#flow = flow;
	}
	/** Whether this channel has been closed. */
	get closed() {
		return this.#closed;
	}
	addEventListener(...[event, listener]) {
		switch (event) {
			case "close":
				this.#closeListeners.add(listener);
				return () => {
					this.#closeListeners.delete(listener);
				};
			case "response":
				this.#responseListeners.add(listener);
				return () => {
					this.#responseListeners.delete(listener);
				};
		}
	}
	/**
	* Resolves the request from the journal if the flow has already reached this
	* call, otherwise buffers it for the next redirect.
	* @param request - The JSON-RPC request to send.
	*/
	send(request) {
		if (this.#closed) return Promise.reject(/* @__PURE__ */ new Error("Communication channel is closed"));
		if (request.id === void 0 || request.id === null) return Promise.reject(/* @__PURE__ */ new Error("The URL transport requires a request id; notifications are not supported"));
		const index = this.#flow.next();
		const key = requestKey(request);
		const cached = this.#flow.get(index);
		if (cached !== void 0) {
			if (this.#flow.recordedRequestKey(index) !== key) return Promise.reject(/* @__PURE__ */ new Error("URL transport replay diverged: the request at this step differs from the one sent before the redirect. Issue the same requests in the same order on every load."));
			const response = {
				...cached,
				id: request.id ?? null
			};
			queueMicrotask(() => {
				for (const listener of this.#responseListeners) listener(response);
			});
			return Promise.resolve();
		}
		this.#flow.request(index, request, key);
		return Promise.resolve();
	}
	/** Marks the channel closed and notifies all close listeners. */
	close() {
		if (this.#closed) return Promise.resolve();
		this.#closed = true;
		for (const listener of this.#closeListeners) listener();
		return Promise.resolve();
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+signer@5.6.3_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/signer/lib/esm/web/urlFlow.js
var isLoopbackHost$1 = (hostname) => hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "[::1]" || /^127(?:\.\d{1,3}){3}$/.test(hostname);
var isSecureContextUrl = (value) => {
	try {
		const url = new URL(value);
		return url.protocol === "https:" || url.protocol === "http:" && isLoopbackHost$1(url.hostname);
	} catch {
		return false;
	}
};
var readStored = (storage, key) => {
	const raw = storage.getItem(key);
	if (raw === null) return { results: {} };
	try {
		const parsed = JSON.parse(raw);
		return {
			createdAt: parsed.createdAt,
			url: parsed.url,
			results: parsed.results ?? {},
			asyncSlots: parsed.asyncSlots,
			requestKeys: parsed.requestKeys,
			pending: parsed.pending
		};
	} catch {
		return { results: {} };
	}
};
var parseJson = (value) => {
	try {
		return JSON.parse(value);
	} catch {
		return;
	}
};
/**
* The shared journal for one URL-transport flow (one page load).
*
* A single call-order-keyed record of results is shared by memoized steps and
* signer requests, and persisted across the top-level redirect. Concurrently
* issued requests are coalesced into one JSON-RPC batch and one redirect.
*
* A load continues an existing flow only when it is a signer **return** — the
* URL carries a `message` matching the stored `pending`. In that case the
* returned responses are folded into the journal and the calling code replays
* from it (already-completed calls resolve from storage instead of navigating
* again). Any other load — a bare visit to the callback, a leftover completed
* journal, or an abandoned `pending` with no `message` — starts a **fresh**
* flow: the stored journal is ignored and overwritten by the first request. So
* navigating to the callback always starts the flow, and there is no separate
* "clear" step — a finished flow's journal is simply inert to the next one.
* (`flowTimeout` is a backstop for the storage entry.)
*/
var UrlFlow = class {
	#options;
	#results;
	#index = 0;
	#navigated = false;
	#createdAt;
	#url;
	#asyncSlots;
	#requestKeys = {};
	#buffer = [];
	#inFlight = 0;
	#flushTimer;
	constructor(options) {
		this.#options = options;
		this.#url = options.url;
		this.#asyncSlots = /* @__PURE__ */ new Set();
		const stored = readStored(options.storage, options.storageKey);
		const expired = stored.createdAt !== void 0 && options.now() - stored.createdAt > options.flowTimeout;
		if (expired) options.storage.removeItem(options.storageKey);
		const params = new URLSearchParams(options.location.hash.slice(1));
		const message = params.get("message");
		const state = params.get("state");
		if (message !== null) options.history.replaceState(null, "", options.location.pathname + options.location.search);
		if (!expired && message !== null && stored.pending !== void 0 && state === stored.pending.state) {
			this.#createdAt = stored.createdAt;
			this.#url = stored.url ?? options.url;
			this.#results = { ...stored.results };
			this.#asyncSlots = new Set(stored.asyncSlots);
			this.#requestKeys = { ...stored.requestKeys };
			const parsed = parseJson(message);
			const responses = Array.isArray(parsed) ? parsed : [parsed];
			for (const { index, id } of stored.pending.requests) {
				const match = responses.find((response) => isJsonRpcResponse(response) && response.id === id);
				if (match !== void 0) this.#results[index] = match;
			}
			this.#persist();
		} else this.#results = {};
	}
	/** Reserves the next call-order slot. */
	next() {
		return this.#index++;
	}
	/**
	* The stored result for a slot, or `undefined` if it has not completed.
	* @param index - The call-order slot to read.
	*/
	get(index) {
		return this.#results[index];
	}
	/**
	* The content fingerprint recorded for a request slot, or `undefined` if no
	* request was journaled there. Used by the channel's replay divergence guard.
	* @param index - The call-order slot to read.
	*/
	recordedRequestKey(index) {
		return this.#requestKeys[index];
	}
	/**
	* Buffers an uncached request for the next redirect.
	* @param index - The call-order slot reserved for the request.
	* @param request - The JSON-RPC request to send on the next redirect.
	* @param key - Content fingerprint recorded for the divergence guard.
	*/
	request(index, request, key) {
		this.#buffer.push({
			index,
			request
		});
		this.#requestKeys[index] = key;
		this.#scheduleFlush();
	}
	memoize(produce) {
		const index = this.next();
		const cached = this.get(index);
		if (cached !== void 0) {
			if (this.#requestKeys[index] !== void 0) throw new Error("URL transport replay diverged: a memoize step is at a slot that held a request before the redirect. Issue the same requests and memoize steps in the same order on every load.");
			return this.#asyncSlots.has(index) ? Promise.resolve(cached) : cached;
		}
		const record = (value, isAsync) => {
			this.#results[index] = value;
			if (isAsync) this.#asyncSlots.add(index);
			this.#persist();
			return value;
		};
		const release = () => {
			this.#inFlight--;
			this.#scheduleFlush();
		};
		this.#inFlight++;
		let produced;
		try {
			produced = produce();
		} catch (error) {
			release();
			throw error;
		}
		if (produced instanceof Promise) return produced.then((value) => record(value, true)).finally(release);
		try {
			return record(produced, false);
		} finally {
			release();
		}
	}
	#scheduleFlush() {
		if (this.#flushTimer !== void 0) clearTimeout(this.#flushTimer);
		this.#flushTimer = setTimeout(() => this.#flush(), 0);
	}
	#flush() {
		this.#flushTimer = void 0;
		if (this.#inFlight > 0 || this.#buffer.length === 0) return;
		this.#navigate();
	}
	#navigate() {
		if (this.#navigated) return;
		this.#navigated = true;
		const batch = this.#buffer;
		this.#buffer = [];
		const state = this.#options.crypto.randomUUID();
		this.#persist({
			state,
			requests: batch.map(({ index, request }) => ({
				index,
				id: request.id ?? null
			}))
		});
		const requests = batch.map(({ request }) => request);
		const message = JSON.stringify(requests.length === 1 ? requests[0] : requests);
		const fragment = new URLSearchParams({
			message,
			callback: this.#options.callbackUrl,
			state
		});
		if (!isSecureContextUrl(this.#url)) throw new Error("Refusing to navigate to a non-secure-context signer URL");
		this.#options.location.assign(`${this.#url}#${fragment.toString()}`);
	}
	#persist(pending) {
		this.#createdAt ??= this.#options.now();
		this.#options.storage.setItem(this.#options.storageKey, JSON.stringify({
			createdAt: this.#createdAt,
			url: this.#url,
			results: this.#results,
			asyncSlots: [...this.#asyncSlots],
			requestKeys: this.#requestKeys,
			pending
		}));
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+signer@5.6.3_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/signer/lib/esm/web/urlTransport.js
/** Error thrown by {@link UrlTransport} for transport-level failures. */
var UrlTransportError = class extends Error {};
/**
* ICRC-167 browser URL transport for communicating with web-based signers via
* top-level navigation.
*
* Unlike `PostMessageTransport`, this transport does not keep a live
* `postMessage` channel. Each request navigates the current window to the
* signer with the request in the URL hash fragment; the signer returns the
* response in the fragment of `callbackUrl`. Because a top-level redirect
* unloads the page, the transport keeps a call-order-keyed journal in
* {@link Storage} and replays it on the return load — so calling code written
* as `const x = await a(); const y = await b(x)` continues where it left off
* across the redirect.
*
* Run the calling code on the load of the flow's route: a fresh arrival and
* the signer's return both land there, so re-running it starts the flow the
* first time and replays it on the return. No resume or cleanup call is
* needed — a signer return (a `message` matching the pending) continues the
* flow; any other load starts a fresh one, ignoring a finished flow's leftover
* journal. Issue the same requests and `memoize` steps in the same order on
* every load (branch only on values recovered from earlier results), and route
* any value a request depends on — such as a nonce — through `memoize` so it
* stays stable across the redirect. See {@link UrlFlow}.
*
* The journal is namespaced by `callbackUrl` by default, so a relying party
* with several flows (each with its own callback) gets an isolated journal per
* flow without configuring storage keys. An unfinished flow's journal expires
* after `flowTimeout`, so an abandoned flow is not resumed later.
* @see https://github.com/dfinity/wg-identity-authentication/blob/main/topics/icrc_167_browser_url_transport.md
* @example
* ```ts
* const transport = new UrlTransport({
*   url: "https://id.ai/icrc-167",
*   callbackUrl: "https://relying.example.com/signer-callback",
* });
* const signer = new Signer({ transport });
*
* // On the load of the callback route (fresh arrival or signer return):
* const nonce = await transport.memoize(() => fetchNonce());
* const [attributes, delegation] = await Promise.all([
*   signer.sendRequest({ jsonrpc: "2.0", id: 1, method: "attributes", params: { nonce } }),
*   signer.requestDelegation({ publicKey, targets }),
* ]);
* finish(nonce, attributes, delegation); // runs once, on completion
* ```
*/
var UrlTransport = class {
	#flow;
	constructor(options) {
		if (!isSecureContextUrl(options.url)) throw new UrlTransportError("Invalid signer RPC url");
		let callback;
		try {
			callback = new URL(options.callbackUrl);
		} catch {
			throw new UrlTransportError("Invalid callback url");
		}
		if (callback.hash !== "") throw new UrlTransportError("Callback url must not contain a fragment");
		this.#flow = new UrlFlow({
			url: options.url,
			callbackUrl: options.callbackUrl,
			storage: options.storage ?? globalThis.sessionStorage,
			storageKey: options.storageKey ?? `icrc167:flow:${options.callbackUrl}`,
			flowTimeout: options.flowTimeout ?? 6e5,
			location: options.location ?? globalThis.location,
			history: options.history ?? globalThis.history,
			crypto: options.crypto ?? globalThis.crypto,
			now: options.now ?? (() => Date.now())
		});
	}
	/** Establishes a channel that drives this transport's shared flow journal. */
	establishChannel() {
		return Promise.resolve(new UrlChannel(this.#flow));
	}
	memoize(produce) {
		return this.#flow.memoize(produce);
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/app-lock.js
/**
* Runs `mint` while holding a named lock, where the environment has one.
*
* The lock is the library coordinating with itself rather than anything a store
* provides, so a store answers only whether another tab can read it and needs to
* know nothing about the Web Locks API.
*
* Where there is no lock — an older browser, or a store no other tab reads —
* `mint` runs straight away and every tab mints for itself. That costs calls and
* never correctness: coordination may only ever suppress a mint, never be
* required for one.
*
* `mint` is handed a signal that fires when the lock is taken away by
* {@link stealMintLock}. It is the only thing a mint can act on, because a call
* already sent cannot be recalled: the mint runs to completion and the signal is
* what tells it to throw away the result rather than store it.
* @param name - The lock to hold, or `null` to run without one.
* @param mint - The work to serialise, taking the signal described above.
*/
function withMintLock(name, mint) {
	const locks = globalThis.navigator?.locks;
	if (name === null || locks === void 0) return mint(new AbortController().signal);
	const stolen = new AbortController();
	const held = locks.request(name, () => mint(stolen.signal));
	held.catch(() => stolen.abort());
	return held;
}
/**
* Takes the lock away from whoever holds it, without waiting for them.
*
* What signing out does. Queueing would make a sign-out the user asked for wait
* on a canister call in another tab, and a mint that finished afterwards would
* write a credential into the slot the sign-out had just cleared.
* @param name - The lock to take, or `null` where none is held.
*/
async function stealMintLock(name) {
	const locks = globalThis.navigator?.locks;
	if (name === null || locks === void 0) return;
	await locks.request(name, { steal: true }, () => void 0).catch(() => void 0);
}
/**
* Takes a lock away from whoever holds it and keeps it until released.
*
* Taken rather than queued for, like {@link stealMintLock} and for the same
* reason: the newer intent is the one to honour. A user who presses sign in
* again means the second press, and an origin has one signer window, so the two
* cannot both proceed anyway. The incumbent finds out through {@link
* HeldLock.stolen} and throws its result away instead of writing it.
*
* Where there is no lock — an older browser, or a caller that passes `null`
* because nothing else could be holding one — the result never reports a steal
* and releasing does nothing. That costs coordination, never correctness:
* coordination may only ever suppress work, never be required for it.
* @param name - The lock to take, or `null` to take none.
*/
function stealLock(name) {
	const stolen = new AbortController();
	const locks = globalThis.navigator?.locks;
	if (name === null || locks === void 0) return {
		stolen: stolen.signal,
		release: () => {}
	};
	let release = () => {};
	const held = new Promise((resolve) => {
		release = resolve;
	});
	locks.request(name, { steal: true }, () => held).catch((error) => {
		if (error instanceof DOMException && error.name === "AbortError") stolen.abort();
	});
	return {
		stolen: stolen.signal,
		release: () => release()
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/base64.js
/**
* Base64 for the JSON-RPC wire, which carries bytes as strings.
*
* Uses the built-in `Uint8Array` methods where the runtime has them, since they
* are faster than a byte-at-a-time loop, and falls back where it does not.
*/
function toBase64(bytes) {
	if ("toBase64" in bytes && typeof bytes.toBase64 === "function") return bytes.toBase64();
	let binary = "";
	for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
	return globalThis.btoa(binary);
}
function fromBase64(str) {
	if ("fromBase64" in Uint8Array && typeof Uint8Array.fromBase64 === "function") return Uint8Array.fromBase64(str);
	const binary = globalThis.atob(str);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/foreground-refresh.js
/**
* Calls back when the page is shown or the window regains focus.
*
* Its own module because it is the one part of the session machinery that needs a
* DOM. `AuthClient` runs outside a browser too, so nothing else may assume these
* APIs exist: where they do not, this and {@link watchActivity} return
* `undefined` and hook nothing.
*
* A backgrounded tab has its timers throttled, so a session's scheduled refresh
* may not run and its delegation lapses while nobody is looking. Coming back to
* the tab happens a second or two before the user's next click, which is room
* enough to mint in. Whether a mint is actually due is not decided here.
* @param onForeground - Invoked when the page becomes visible or regains focus.
* @returns A function that unhooks the listeners, or `undefined` where there is
*   no DOM to hook.
*/
function watchForeground(onForeground) {
	if (typeof document === "undefined" || typeof document.addEventListener !== "function" || typeof document.removeEventListener !== "function" || typeof globalThis.addEventListener !== "function" || typeof globalThis.removeEventListener !== "function") return;
	const onVisible = () => {
		if (document.visibilityState === "visible") onForeground();
	};
	document.addEventListener("visibilitychange", onVisible);
	globalThis.addEventListener("focus", onForeground);
	globalThis.addEventListener("pageshow", onForeground);
	return () => {
		document.removeEventListener("visibilitychange", onVisible);
		globalThis.removeEventListener("focus", onForeground);
		globalThis.removeEventListener("pageshow", onForeground);
	};
}
var ACTIVITY_EVENTS = [
	"pointerdown",
	"mousedown",
	"mousemove",
	"keydown",
	"touchstart",
	"wheel"
];
/**
* Calls back when somebody is using the page.
*
* A user moving a mouse is very likely about to do something that needs a
* delegation, so this is the same claim {@link watchForeground} makes — this
* page is in front of a person right now — from the other direction. Whether a
* mint is actually due is not decided here, and the identity's pre-mint
* threshold is what keeps a resting hand from costing more than one mint per
* refresh interval.
*
* It matters beyond saving the first request a mint: a session bounded by how
* long it goes unminted would otherwise end under a user who is reading rather
* than clicking.
* @param onActivity - Invoked on any sign of use.
* @returns A function that unhooks the listeners, or `undefined` where there is
*   no DOM to hook.
*/
function watchActivity(onActivity) {
	if (typeof document === "undefined" || typeof document.addEventListener !== "function" || typeof document.removeEventListener !== "function") return;
	for (const event of ACTIVITY_EVENTS) document.addEventListener(event, onActivity, { passive: true });
	return () => {
		for (const event of ACTIVITY_EVENTS) document.removeEventListener(event, onActivity);
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/idb@7.1.1/node_modules/idb/build/wrap-idb-value.js
var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
var idbProxyableTypes;
var cursorAdvanceMethods;
function getIdbProxyableTypes() {
	return idbProxyableTypes || (idbProxyableTypes = [
		IDBDatabase,
		IDBObjectStore,
		IDBIndex,
		IDBCursor,
		IDBTransaction
	]);
}
function getCursorAdvanceMethods() {
	return cursorAdvanceMethods || (cursorAdvanceMethods = [
		IDBCursor.prototype.advance,
		IDBCursor.prototype.continue,
		IDBCursor.prototype.continuePrimaryKey
	]);
}
var cursorRequestMap = /* @__PURE__ */ new WeakMap();
var transactionDoneMap = /* @__PURE__ */ new WeakMap();
var transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
var transformCache = /* @__PURE__ */ new WeakMap();
var reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
	const promise = new Promise((resolve, reject) => {
		const unlisten = () => {
			request.removeEventListener("success", success);
			request.removeEventListener("error", error);
		};
		const success = () => {
			resolve(wrap(request.result));
			unlisten();
		};
		const error = () => {
			reject(request.error);
			unlisten();
		};
		request.addEventListener("success", success);
		request.addEventListener("error", error);
	});
	promise.then((value) => {
		if (value instanceof IDBCursor) cursorRequestMap.set(value, request);
	}).catch(() => {});
	reverseTransformCache.set(promise, request);
	return promise;
}
function cacheDonePromiseForTransaction(tx) {
	if (transactionDoneMap.has(tx)) return;
	const done = new Promise((resolve, reject) => {
		const unlisten = () => {
			tx.removeEventListener("complete", complete);
			tx.removeEventListener("error", error);
			tx.removeEventListener("abort", error);
		};
		const complete = () => {
			resolve();
			unlisten();
		};
		const error = () => {
			reject(tx.error || new DOMException("AbortError", "AbortError"));
			unlisten();
		};
		tx.addEventListener("complete", complete);
		tx.addEventListener("error", error);
		tx.addEventListener("abort", error);
	});
	transactionDoneMap.set(tx, done);
}
var idbProxyTraps = {
	get(target, prop, receiver) {
		if (target instanceof IDBTransaction) {
			if (prop === "done") return transactionDoneMap.get(target);
			if (prop === "objectStoreNames") return target.objectStoreNames || transactionStoreNamesMap.get(target);
			if (prop === "store") return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
		}
		return wrap(target[prop]);
	},
	set(target, prop, value) {
		target[prop] = value;
		return true;
	},
	has(target, prop) {
		if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) return true;
		return prop in target;
	}
};
function replaceTraps(callback) {
	idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
	if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) return function(storeNames, ...args) {
		const tx = func.call(unwrap(this), storeNames, ...args);
		transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
		return wrap(tx);
	};
	if (getCursorAdvanceMethods().includes(func)) return function(...args) {
		func.apply(unwrap(this), args);
		return wrap(cursorRequestMap.get(this));
	};
	return function(...args) {
		return wrap(func.apply(unwrap(this), args));
	};
}
function transformCachableValue(value) {
	if (typeof value === "function") return wrapFunction(value);
	if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
	if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
	return value;
}
function wrap(value) {
	if (value instanceof IDBRequest) return promisifyRequest(value);
	if (transformCache.has(value)) return transformCache.get(value);
	const newValue = transformCachableValue(value);
	if (newValue !== value) {
		transformCache.set(value, newValue);
		reverseTransformCache.set(newValue, value);
	}
	return newValue;
}
var unwrap = (value) => reverseTransformCache.get(value);
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/idb@7.1.1/node_modules/idb/build/index.js
/**
* Open a database.
*
* @param name Name of the database.
* @param version Schema version.
* @param callbacks Additional callbacks.
*/
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
	const request = indexedDB.open(name, version);
	const openPromise = wrap(request);
	if (upgrade) request.addEventListener("upgradeneeded", (event) => {
		upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
	});
	if (blocked) request.addEventListener("blocked", (event) => blocked(event.oldVersion, event.newVersion, event));
	openPromise.then((db) => {
		if (terminated) db.addEventListener("close", () => terminated());
		if (blocking) db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
	}).catch(() => {});
	return openPromise;
}
var readMethods = [
	"get",
	"getKey",
	"getAll",
	"getAllKeys",
	"count"
];
var writeMethods = [
	"put",
	"add",
	"delete",
	"clear"
];
var cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
	if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) return;
	if (cachedMethods.get(prop)) return cachedMethods.get(prop);
	const targetFuncName = prop.replace(/FromIndex$/, "");
	const useIndex = prop !== targetFuncName;
	const isWrite = writeMethods.includes(targetFuncName);
	if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) return;
	const method = async function(storeName, ...args) {
		const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
		let target = tx.store;
		if (useIndex) target = target.index(args.shift());
		return (await Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
	};
	cachedMethods.set(prop, method);
	return method;
}
replaceTraps((oldTraps) => ({
	...oldTraps,
	get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
	has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
var AUTH_DB_NAME = "auth-client-db";
var OBJECT_STORE_NAME = "ic-keyval";
var _openDbStore = async (dbName = AUTH_DB_NAME, storeName = OBJECT_STORE_NAME, version, onTerminated) => {
	return await openDB(dbName, version, {
		upgrade: (database) => {
			if (database.objectStoreNames.contains(storeName)) database.clear(storeName);
			database.createObjectStore(storeName);
		},
		terminated: onTerminated
	});
};
async function _getValue(db, storeName, key) {
	return await db.get(storeName, key);
}
async function _setValue(db, storeName, key, value) {
	return await db.put(storeName, value, key);
}
async function _removeValue(db, storeName, key) {
	return await db.delete(storeName, key);
}
/**
* Simple Key Value store
* Defaults to `'auth-client-db'` with an object store of `'ic-keyval'`
*/
var IdbKeyVal = class IdbKeyVal {
	_dbName;
	_storeName;
	_version;
	/**
	* @param {DBCreateOptions} options - DBCreateOptions
	* @param {DBCreateOptions['dbName']} options.dbName name for the indexeddb database
	* @default
	* @param {DBCreateOptions['storeName']} options.storeName name for the indexeddb Data Store
	* @default
	* @param {DBCreateOptions['version']} options.version version of the database. Increment to safely upgrade
	*/
	static async create(options) {
		const { dbName = AUTH_DB_NAME, storeName = OBJECT_STORE_NAME, version = 1 } = options ?? {};
		const keyVal = new IdbKeyVal(dbName, storeName, version);
		await keyVal._openDb();
		return keyVal;
	}
	_dbPromise = null;
	constructor(_dbName, _storeName, _version) {
		this._dbName = _dbName;
		this._storeName = _storeName;
		this._version = _version;
	}
	_openDb() {
		if (this._dbPromise === null) {
			const promise = _openDbStore(this._dbName, this._storeName, this._version, () => {
				if (this._dbPromise === promise) this._dbPromise = null;
			}).catch((error) => {
				if (this._dbPromise === promise) this._dbPromise = null;
				throw error;
			});
			this._dbPromise = promise;
		}
		return this._dbPromise;
	}
	async _withDb(action) {
		const promise = this._openDb();
		const db = await promise;
		try {
			return await action(db);
		} catch (error) {
			if ((error !== null && typeof error === "object" && "name" in error && error.name) !== "InvalidStateError") throw error;
			if (this._dbPromise === promise) this._dbPromise = null;
			return await action(await this._openDb());
		}
	}
	/**
	* Basic setter
	* @param {IDBValidKey} key string | number | Date | BufferSource | IDBValidKey[]
	* @param value value to set
	* @returns void
	*/
	async set(key, value) {
		return await this._withDb((db) => _setValue(db, this._storeName, key, value));
	}
	/**
	* Basic getter
	* Pass in a type T for type safety if you know the type the value will have if it is found
	* @param {IDBValidKey} key string | number | Date | BufferSource | IDBValidKey[]
	* @returns `Promise<T | null>`
	* @example
	* await get<string>('exampleKey') -> 'exampleValue'
	*/
	async get(key) {
		return await this._withDb(async (db) => await _getValue(db, this._storeName, key) ?? null);
	}
	/**
	* Remove a key
	* @param key {@link IDBValidKey}
	* @returns void
	*/
	async remove(key) {
		return await this._withDb((db) => _removeValue(db, this._storeName, key));
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/idb-credential-storage.js
/**
* Credentials in IndexedDB, which is what a browser offers that can hold a key
* whose private half is unreadable.
*
* A non-extractable `CryptoKeyPair` survives a structured clone, so what another
* tab reads is a handle that signs and cannot be exported — no key material is
* written anywhere.
* @see implements {@link CredentialStorage}
*/
var IdbCredentialStorage = class {
	shared = true;
	durable = true;
	#options;
	/**
	* @param options - Database name, store name and version.
	*/
	constructor(options) {
		this.#options = options ?? {};
	}
	#dbPromise = null;
	get #db() {
		if (this.#dbPromise === null) {
			const promise = IdbKeyVal.create(this.#options).catch((error) => {
				if (this.#dbPromise === promise) this.#dbPromise = null;
				throw error;
			});
			this.#dbPromise = promise;
		}
		return this.#dbPromise;
	}
	create() {
		return ECDSAKeyIdentity.generate({ extractable: false });
	}
	async get(slot) {
		const stored = await (await this.#db).get(slot);
		if (!stored) return null;
		try {
			return {
				identity: await ECDSAKeyIdentity.fromKeyPair(stored.keyPair),
				chain: stored.chain === void 0 ? void 0 : DelegationChain.fromJSON(stored.chain)
			};
		} catch {
			return null;
		}
	}
	async set(slot, credential) {
		await (await this.#db).set(slot, {
			keyPair: credential.identity.getKeyPair(),
			chain: credential.chain && JSON.stringify(credential.chain.toJSON())
		});
	}
	async remove(slot) {
		await (await this.#db).remove(slot);
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/session-delegation.js
/**
* The method Internet Identity answers with a session rather than a long-lived
* delegation. Named for its provider because a JSON-RPC method travels over a
* transport shared with other signers, unlike a canister method.
*/
var SESSION_DELEGATION_METHOD = "ii_session_delegation";
/**
* The code Internet Identity denies a `prompt: 'none'` request with.
*
* In ICRC-25's 3xxx user-action range, which is what lets a caller tell a request
* that needs a ceremony apart from a transport or protocol failure.
*/
var INTERACTION_REQUIRED_CODE = 3002;
/**
* Internet Identity had nothing to answer a silent request from.
*
* The one denial that is not a failure: it says a ceremony is needed, so the
* caller signs in interactively rather than retrying. It is also the only
* dependable evidence that a shared record is stale rather than replaced, which
* is what lets an origin retract a record it did not write.
*
* Thrown only for a request that asked not to render anything. An interactive
* sign-in that the user abandons is a different outcome and is not this.
*/
var InteractionRequiredError = class extends Error {
	/**
	* Why, where Internet Identity said: `login_required` where it holds no
	* session, `account_selection_required` where it holds more than one and the
	* request named none.
	*
	* A caller may word its prompt from this and does not have to branch on it, so
	* it is deliberately a string rather than a union — a value this library does
	* not know is not a reason to fail.
	*/
	reason;
	constructor(message, reason) {
		super(message);
		this.name = "InteractionRequiredError";
		this.reason = reason;
	}
};
var looksLikeResult = (value) => {
	const result = value;
	return typeof result?.publicKey === "string" && Array.isArray(result?.signerDelegation) && result.signerDelegation.length > 0;
};
/**
* Asks the identity provider for a session, and returns the chain it signed.
*
* The chain is restricted to the Internet Identity canister, so it is not
* something an application can call its own canisters with. It is what app
* delegations are minted from.
*/
async function requestSessionDelegation(signer, params) {
	const response = await signer.sendRequest({
		jsonrpc: "2.0",
		id: globalThis.crypto.randomUUID(),
		method: SESSION_DELEGATION_METHOD,
		params: {
			sessionPublicKey: toBase64(params.sessionPublicKey),
			...params.maxTimeToLive === void 0 ? {} : { maxTimeToLive: params.maxTimeToLive.toString() },
			...params.maxTimeToIdle === void 0 ? {} : { maxTimeToIdle: params.maxTimeToIdle.toString() },
			...params.derivationOrigin === void 0 ? {} : { icrc95DerivationOrigin: params.derivationOrigin }
		}
	});
	if ("error" in response) {
		if (response.error.code === INTERACTION_REQUIRED_CODE) {
			const data = response.error.data;
			const reason = typeof data === "object" && data !== null && "reason" in data ? String(data.reason) : void 0;
			throw new InteractionRequiredError(response.error.message, reason);
		}
		throw new Error(response.error.message);
	}
	const result = response.result;
	if (!looksLikeResult(result)) throw new Error("Invalid session response: missing publicKey, or missing or empty signerDelegation");
	return DelegationChain.fromDelegations(result.signerDelegation.map(({ delegation, signature }) => ({
		delegation: new Delegation(fromBase64(delegation.pubkey), BigInt(delegation.expiration), delegation.targets?.map((target) => Principal$1.fromText(target))),
		signature: fromBase64(signature)
	})), fromBase64(result.publicKey));
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/session-identity.js
/**
* How much life a delegation needs left to be handed to a caller. Covers a
* request's flight time, because the delegation has to still be valid when the
* replica verifies the request it was attached to.
*/
var BLOCK_MARGIN_MS = 1e4;
/**
* When a replacement is minted. Covers one mint and nothing more: minting early
* discards the rest of a delegation's life, so an active session consumes
* lifetime at `ttl / (ttl - threshold)` and every second here costs update calls
* on every active session. A refresh is scheduled for this moment rather than
* waiting for a request to arrive inside the window, which is what keeps it small.
*/
var PRE_MINT_THRESHOLD_MS = 15e3;
var expiresAtMs = (chain) => Number(chain.delegations.reduce((soonest, { delegation }) => delegation.expiration < soonest ? delegation.expiration : soonest, chain.delegations[0]?.delegation.expiration ?? 0n) / 1000000n);
var msLeftOf = (chain) => expiresAtMs(chain) - Date.now();
/** The account a chain is rooted at. */
var accountOf = (chain) => Principal$1.selfAuthenticating(new Uint8Array(chain.publicKey));
/**
* Whether a credential may be used for `expected`.
*
* Two checks at opposite ends of the chain. The leaf must be the key stored
* beside it, which is true of any whole record whoever it belongs to. And the
* root must be the account the caller names — a credential left by another
* account would otherwise decide who this identity is, and requests would go
* out as that account and succeed until its delegation expired.
*
* `expected` is absent only where the caller has no account to name, which is
* why a read that cannot check it does not adopt.
*/
var isForAccount = (held, expected) => {
	if (!chainAuthorisesKey(held.chain, held.identity.getPublicKey().toDer())) return false;
	return expected === void 0 || accountOf(held.chain).compareTo(expected) === "eq";
};
/**
* Reads what the slot holds, or `undefined` where it holds nothing usable.
*
* @param evictSpent - Whether a spent record may be removed, which only a caller
*   holding the mint lock may do. The store reaches every tab of the origin, so a
*   lock-free read that removed what it declined could delete a credential
*   another tab minted between the read and the removal.
* @param verify - Rejects a credential not rooted at the account already
*   established. Absent on the first read of all, where there is no account to
*   compare against and the first mint is what establishes one.
*/
async function readSlot({ storage, slot, evictSpent, verify }) {
	const stored = await storage.get(slot).catch(() => null);
	if (!stored?.chain) return void 0;
	if (msLeftOf(stored.chain) <= 0) {
		if (evictSpent) await storage.remove(slot).catch(() => void 0);
		return;
	}
	const credential = {
		identity: stored.identity,
		chain: stored.chain
	};
	if (verify !== void 0 && !verify(credential)) return void 0;
	return credential;
}
/**
* The one place an app credential is minted and written.
*
* Reads the slot under the lock and mints only where what it finds cannot be
* used. The lock alone would merely serialise: five tabs waking together would
* queue politely and then make five calls one after another. The read inside it
* is what turns serialising into suppressing, and it is why the floor is one mint
* per origin rather than one per tab.
*
* Shared by the first acquisition and by every rotation, so both go through the
* same lock and the same read. Having a second reader-and-writer outside the lock
* is how a load could land on top of a peer's freshly minted credential.
*/
async function acquireCredential({ storage, slot, source, lockName, verify, adopt, onGone }) {
	return withMintLock(lockName, async (stolen) => {
		const stored = await readSlot({
			storage,
			slot,
			evictSpent: true,
			verify
		});
		if (adopt && stored && msLeftOf(stored.chain) > PRE_MINT_THRESHOLD_MS) return stored;
		const identity = await storage.create();
		let chain;
		try {
			chain = await source.mint(identity.getPublicKey().toDer());
		} catch (error) {
			if (error instanceof SessionGoneError) onGone?.();
			throw error;
		}
		const credential = {
			identity,
			chain
		};
		if (verify !== void 0 && !verify(credential)) throw new AccountMismatchError();
		if (stolen.aborted) {
			onGone?.();
			throw new SessionGoneError("The session ended while this mint was in flight");
		}
		await storage.set(slot, credential).catch(() => void 0);
		return credential;
	});
}
/** Whether a session has enough left that minting against it returns something usable. */
var sessionHasLifeLeft = (sessionExpiresAtMs) => sessionExpiresAtMs - Date.now() > BLOCK_MARGIN_MS;
/** The lock a mint is serialised on, or `null` where none is worth taking. */
var lockNameFor = (storage, slot) => storage.shared ? slot : null;
/**
* An identity whose credential is short-lived and replaced under the caller.
*
* It extends {@link DelegationIdentity} so anything already accepting one accepts
* this, and what it presents is an ordinary app delegation. What differs is that
* the key and delegation it signs with are replaced as they age, which is why an
* agent can hold this object for hours: an agent keeps whatever identity it was
* given, so a snapshot of one credential would sign with it until it expired.
*
* A rotation is invisible to the holder. The principal comes from the account's
* key rather than from whatever is current, and a request is signed and its
* delegation attached in the same act, so what is already in flight carries a
* matching pair however soon the next one arrives.
*/
var SessionIdentity = class SessionIdentity extends DelegationIdentity {
	#source;
	#storage;
	#slot;
	#onSessionGone;
	#sessionExpiresAtMs;
	/** The account every credential must be rooted at, derived once. */
	#account;
	/** Reached by the base class's `sign`, so rotating does not change the object. */
	#held;
	#inFlight;
	#currentWasUsed = false;
	#scheduled;
	#reportedGone = false;
	#unsupported;
	/**
	* Builds an identity for a session, resolving the account key it needs.
	*
	* The account key cannot be worked out from the session — the session chain is
	* rooted at the session's own key, and the state carries the account's
	* principal, which is a hash of the account key rather than the key. So the
	* only two places one can come from are a credential the store already holds
	* and a mint, and a caller with neither has to wait for the mint before an
	* identity exists at all.
	*
	* That resolution goes through the same locked read-or-mint every rotation
	* uses, which is what keeps the app slot to one writer: doing it here, outside
	* the lock, is how a page load could overwrite a credential a peer tab had just
	* minted, and it would skip the read that lets this tab adopt that credential
	* instead of paying for its own.
	*
	* The identity comes back already holding what was resolved, so a caller does
	* not have to refresh it before use.
	* @param options - As the constructor takes them, less the account key.
	*/
	static async create(options) {
		if (!sessionHasLifeLeft(options.sessionExpiresAtMs)) {
			options.onSessionGone();
			throw new SessionGoneError("The session has expired");
		}
		const credential = await acquireCredential({
			storage: options.storage,
			slot: options.slot,
			source: options.source,
			lockName: lockNameFor(options.storage, options.slot),
			verify: (candidate) => isForAccount(candidate, options.expectedAccount),
			adopt: options.expectedAccount !== void 0,
			onGone: options.onSessionGone
		});
		const identity = new SessionIdentity({
			...options,
			accountKey: credential.chain.publicKey
		});
		identity.#adopt(credential);
		return identity;
	}
	constructor(options) {
		const held = {};
		super({ sign: (blob) => {
			const key = held.current?.identity;
			if (!key) throw new Error("This identity holds no delegation yet");
			return key.sign(blob);
		} }, DelegationChain.fromDelegations([], options.accountKey));
		this.#held = held;
		this.#source = options.source;
		this.#storage = options.storage;
		this.#slot = options.slot;
		this.#onSessionGone = options.onSessionGone;
		this.#sessionExpiresAtMs = options.sessionExpiresAtMs;
		this.#account = Principal$1.selfAuthenticating(new Uint8Array(options.accountKey));
	}
	getDelegation() {
		return this.#held.current?.chain ?? super.getDelegation();
	}
	async transformRequest(request) {
		const credential = await this.#usable();
		this.#currentWasUsed = true;
		return DelegationIdentity.fromDelegation(credential.identity, credential.chain).transformRequest(request);
	}
	/**
	* Says somebody is here, and mints now if one is due.
	*
	* For a caller that knows the moment is a good one, such as a page load, a tab
	* coming back to the foreground, or a pointer moving. The caller says when;
	* this still decides whether, so a credential with plenty of life left costs
	* no call.
	*
	* It is never a no-op, though: being here counts as use, exactly as signing a
	* request does, so the credential held afterwards has earned the next
	* rotation. Without that a session bounded by how long it goes unminted would
	* end under a user who is reading rather than clicking — the delegation would
	* only ever be replaced in the last {@link PRE_MINT_THRESHOLD_MS} of its life,
	* and only if a pointer happened to move inside that window.
	*/
	async refresh() {
		await this.#refreshIfDue();
		this.#currentWasUsed = true;
	}
	async #refreshIfDue() {
		const current = this.#held.current;
		if (current && this.#msLeft(current.chain) > PRE_MINT_THRESHOLD_MS) return;
		if (current === void 0) {
			const stored = await this.#readStored();
			if (stored && this.#msLeft(stored.chain) > PRE_MINT_THRESHOLD_MS) {
				this.#adopt(stored);
				return;
			}
		}
		await this.#mint().catch(() => void 0);
	}
	/** Drops the scheduled refresh. */
	dispose() {
		clearTimeout(this.#scheduled);
		this.#scheduled = void 0;
	}
	get #lockName() {
		return lockNameFor(this.#storage, this.#slot);
	}
	#isForThisSession(held) {
		return isForAccount(held, this.#account);
	}
	#msLeft(chain) {
		return expiresAtMs(chain) - Date.now();
	}
	/**
	* The stored credential, where there is one this session may use.
	*
	* Whatever another tab minted arrives this way: sharing is a read of the store
	* rather than a conversation, which works whether the other tabs are running,
	* frozen, or gone.
	*
	* Takes no lock, so it declines a spent record rather than evicting it. The
	* mint that follows evicts under the lock, per {@link readSlot}.
	*/
	#readStored() {
		return readSlot({
			storage: this.#storage,
			slot: this.#slot,
			evictSpent: false,
			verify: (candidate) => this.#isForThisSession(candidate)
		});
	}
	async #usable() {
		const current = this.#held.current;
		if (current) {
			const left = this.#msLeft(current.chain);
			if (left > PRE_MINT_THRESHOLD_MS) return current;
			if (left > BLOCK_MARGIN_MS) {
				this.#mint().catch(() => void 0);
				return current;
			}
		}
		return this.#mint();
	}
	#mint() {
		this.#inFlight ??= this.#mintOnce().finally(() => {
			this.#inFlight = void 0;
		});
		return this.#inFlight;
	}
	async #mintOnce() {
		if (this.#unsupported) throw this.#unsupported;
		if (!sessionHasLifeLeft(this.#sessionExpiresAtMs)) {
			this.#reportGone();
			throw new SessionGoneError("The session has expired");
		}
		let credential;
		try {
			credential = await acquireCredential({
				storage: this.#storage,
				slot: this.#slot,
				source: this.#source,
				lockName: this.#lockName,
				verify: (candidate) => this.#isForThisSession(candidate),
				adopt: true,
				onGone: () => this.#reportGone()
			});
		} catch (error) {
			if (error instanceof SessionUnsupportedError) {
				this.#unsupported = error;
				this.dispose();
			}
			throw error;
		}
		this.#adopt(credential);
		return credential;
	}
	#adopt(credential) {
		this.#held.current = credential;
		this.#currentWasUsed = false;
		this.#schedule(credential.chain);
	}
	#schedule(chain) {
		clearTimeout(this.#scheduled);
		const delay = this.#msLeft(chain) - PRE_MINT_THRESHOLD_MS;
		if (delay <= 0) return;
		this.#scheduled = setTimeout(() => {
			if (this.#currentWasUsed) this.#mint().catch(() => void 0);
		}, delay);
		this.#scheduled.unref?.();
	}
	#reportGone() {
		if (this.#reportedGone) return;
		this.#reportedGone = true;
		this.dispose();
		this.#onSessionGone();
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/session-minter.js
/**
* Just the three methods an app calls with a session chain. Written out rather
* than generated because this package carries no Internet Identity declarations,
* and generating them for three methods would mean carrying the whole interface.
*/
var idlFactory$1 = ({ IDL }) => {
	const SessionKey = IDL.Vec(IDL.Nat8);
	const Timestamp = IDL.Nat64;
	const AppSessionError = IDL.Variant({
		NoSuchSession: IDL.Null,
		NoSuchDelegation: IDL.Null,
		InternalCanisterError: IDL.Text
	});
	const CandidDelegation = IDL.Record({
		pubkey: SessionKey,
		expiration: Timestamp,
		targets: IDL.Opt(IDL.Vec(IDL.Principal)),
		permissions: IDL.Opt(IDL.Text)
	});
	return IDL.Service({
		app_prepare_delegation: IDL.Func([IDL.Record({ session_key: SessionKey })], [IDL.Variant({
			Ok: IDL.Record({
				user_key: SessionKey,
				expiration: Timestamp
			}),
			Err: AppSessionError
		})], []),
		app_get_delegation: IDL.Func([IDL.Record({
			session_key: SessionKey,
			expiration: Timestamp
		})], [IDL.Variant({
			Ok: IDL.Record({
				delegation: CandidDelegation,
				signature: SessionKey
			}),
			Err: AppSessionError
		})], ["query"]),
		app_revoke_session: IDL.Func([], [IDL.Variant({
			Ok: IDL.Null,
			Err: AppSessionError
		})], [])
	});
};
var isGone = (error) => "NoSuchSession" in error;
/**
* Raised when the canister signed nothing for the key and expiration asked for,
* which means the expiration was not one `app_prepare_delegation` returned.
*
* Its own error because the remedy is its own: prepare again and use what comes
* back. Signing in afresh is not it — the session is live, or the call would have
* been refused for being no session at all.
*/
var NoSuchDelegationError = class extends Error {
	constructor() {
		super("Internet Identity signed no delegation for this key and expiration");
		this.name = "NoSuchDelegationError";
	}
};
/**
* Unwraps a canister result, turning the one terminal error into
* {@link SessionGoneError}, the retryable one into
* {@link NoSuchDelegationError}, and everything else into a plain failure.
*/
var unwrapSessionResult = (result) => {
	if ("Ok" in result) return result.Ok;
	if (isGone(result.Err)) throw new SessionGoneError();
	if ("NoSuchDelegation" in result.Err) throw new NoSuchDelegationError();
	const detail = "InternalCanisterError" in result.Err ? result.Err.InternalCanisterError : "";
	throw new Error(`Internet Identity could not mint a delegation${detail === "" ? "" : `: ${detail}`}`);
};
/** Mints app delegations by asking the Internet Identity canister for one. */
var SessionMinter = class SessionMinter {
	#service;
	constructor(service) {
		this.#service = service;
	}
	static async create(options) {
		const { canisterId } = options;
		assertChainReaches(options.sessionChain, canisterId);
		const agent = await HttpAgent.create({
			...options.agentOptions,
			identity: DelegationIdentity.fromDelegation(options.sessionKey, options.sessionChain)
		});
		return new SessionMinter(Actor.createActor(idlFactory$1, {
			agent,
			canisterId
		}));
	}
	/**
	* Prepares and fetches an app delegation, once more if the fetch finds nothing
	* signed for what the prepare handed out.
	*
	* The pair is two calls, and only the first of them is an update: an expiration
	* the canister will not sign for is one this session no longer holds, and the
	* answer is to prepare again rather than to sign in again. Attempted a second
	* time and no further — a third would be pursuing something other than the race
	* this covers.
	*/
	async mint(appPublicKey) {
		try {
			return await this.#mintOnce(appPublicKey);
		} catch (error) {
			if (!(error instanceof NoSuchDelegationError)) throw error;
			return await this.#mintOnce(appPublicKey);
		}
	}
	/**
	* Ends the session at the canister.
	*
	* Idempotent at the canister: a session that is already gone is `Ok`, because
	* the caller wanted it gone and it is gone. What comes back as an error is the
	* canister failing to write, and it is raised rather than dropped — an
	* application that told a user it signed them out of their apps should be able
	* to find out that it did not. The call can also fail the way any update call
	* can, and that rejection is the caller's to decide about too.
	*/
	async revoke() {
		unwrapSessionResult(await this.#service.app_revoke_session());
	}
	async #mintOnce(appPublicKey) {
		const prepared = unwrapSessionResult(await this.#service.app_prepare_delegation({ session_key: appPublicKey }));
		const signed = unwrapSessionResult(await this.#service.app_get_delegation({
			session_key: appPublicKey,
			expiration: prepared.expiration
		}));
		return appDelegationChain(prepared.user_key, signed);
	}
};
/**
* Assembles the one-hop chain an app signs its calls with, rooted at the
* account's own key.
*/
function appDelegationChain(userKey, signed) {
	if (signed.delegation.permissions.length > 0) throw new Error("This session is read-only, which @icp-sdk/auth cannot act for yet: its delegations carry permissions that a delegation chain has no room for");
	return DelegationChain.fromDelegations([{
		delegation: new Delegation(signed.delegation.pubkey, signed.delegation.expiration, signed.delegation.targets[0]),
		signature: signed.signature
	}], userKey);
}
/**
* Refuses a chain that is not a session for `canisterId`.
*
* Targets restrict what the chain's final key may call, and the effective
* restriction is the intersection of the hops that name any: a hop with no
* targets imposes nothing, so one restricting hop is enough to confine the key.
* Internet Identity names the canister on both of its hops — on the one the
* canister signs to the provider's own key, and again on the provider's
* extension to the application's key — and the intersection is what is checked,
* so a hop that stopped naming it would still leave the chain confined by the
* other.
*
* So what is refused is a chain no hop restricts, which the session key would
* otherwise be able to sign any call with, and one whose restrictions do not
* come out as this canister alone.
*/
function assertChainReaches(chain, canisterId) {
	const restricting = chain.delegations.map(({ delegation }) => delegation.targets).filter((hopTargets) => hopTargets !== void 0);
	if (restricting.length === 0) throw new Error(`A session chain must be restricted to ${canisterId.toText()}, but no hop of this one names any canister`);
	if (restricting.some((hopTargets) => hopTargets.length === 0)) throw new Error(`A session chain must be restricted to ${canisterId.toText()}, but a hop of this one names nothing`);
	const elsewhere = restricting.flat().filter((target) => target.compareTo(canisterId) !== "eq").map((target) => target.toText());
	if (elsewhere.length > 0) throw new Error(`A session chain must be restricted to ${canisterId.toText()}, but this one also names ${[...new Set(elsewhere)].join(", ")}`);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/slots.js
/**
* Every name one client writes under, and the one thing that knows the whole set.
*
* Its own module rather than living beside the credential store or the state
* store, because it belongs to neither: the credentials and the state of a
* sign-in are named from one namespace, and a list that sat in either file would
* have to reach across to the other.
*/
/**
* The bare names, before a namespace is applied.
*
* One list, so a name cannot be added to some of the places that need it and
* missed in others. It was two lists and a hand-written mapping, and the state
* record was left out of the namespacing for exactly that reason.
*/
var SLOT_NAMES = {
	/** The session's key and the chain issued to it. */
	session: "session",
	/**
	* Where a sign-in ceremony keeps its key until it returns.
	*
	* Its own name rather than {@link SLOT_NAMES.session}, so a ceremony that is
	* cancelled or never comes back cannot take a working session with it.
	*/
	sessionPending: "session-pending",
	/** The key an application signs with, and its delegation. */
	app: "app",
	/**
	* Where a ceremony keeps the credential it minted until its session is stored.
	*
	* The store reaches every tab of the origin, so writing to the app name during
	* a ceremony — or clearing it first — would change what those tabs act with
	* before the sign-in has succeeded. This is promoted instead, once there is a
	* session behind it.
	*/
	appPending: "app-pending",
	/**
	* The record of who is signed in here and until when.
	*
	* Not a credential slot, and named here anyway: a namespace that moved the
	* credentials and left this fixed would give two clients their own keys and one
	* shared answer to who is signed in.
	*/
	state: "ic-session-state"
};
/**
* What separates a namespace from the name it prefixes.
*
* A cross-origin contract rather than a detail: a sibling subdomain reads the
* state record by name, so both sides have to agree on this byte.
*/
var NAMESPACE_SEPARATOR = ":";
/**
* The names one client writes under, prefixed where a namespace is set.
*
* Assigned in one place rather than defaulted by each store: implementations
* choosing their own is what produced three colliding slots in the arrangement
* this replaces, and one assigner cannot collide with itself. A namespace moves
* all of them at once, so an application running two clients under one origin
* separates them with one string rather than renaming some and missing others.
* @param namespace - Prefix for every name, or `undefined` for the bare ones.
*/
function slotsFor(namespace) {
	const prefix = namespace === void 0 ? "" : `${namespace}${NAMESPACE_SEPARATOR}`;
	return Object.fromEntries(Object.entries(SLOT_NAMES).map(([key, name]) => [key, `${prefix}${name}`]));
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/sso.js
var MAX_AUTHORITY_LENGTH = 255;
/**
* `localhost` / `127.0.0.1`, optionally followed by `:<port>`. IPv6 loopback
* (`[::1]`, etc.) is intentionally not handled — the identity provider doesn't
* recognise it either, and its e2e setup uses the hostname form.
*/
function isLoopbackHost(host) {
	let url;
	try {
		url = new URL(`http://${host}`);
	} catch {
		return false;
	}
	if (url.pathname !== "/" || url.search !== "" || url.hash !== "") return false;
	return url.hostname === "localhost" || url.hostname === "127.0.0.1";
}
/**
* Normalizes an SSO domain to the authority the identity provider fetches the
* discovery document from: lowercased, IDNA-encoded, host and optional port.
*
* @param domain - The organization domain.
* @returns The normalized authority.
* @throws When `domain` is not a domain with an optional port.
*/
function normalizeSsoDomain(domain) {
	const trimmed = domain.trim();
	if (trimmed.length === 0) throw new Error("ssoDomain cannot be empty");
	let url;
	try {
		url = new URL(`https://${trimmed}`);
	} catch {
		throw new Error(`ssoDomain is not a domain: ${trimmed}`);
	}
	const authority = url.host;
	if (new URL(`https://${authority}`).href !== url.href) throw new Error(`ssoDomain must be a domain and optional port, nothing else: ${trimmed}`);
	if (authority.length > MAX_AUTHORITY_LENGTH) throw new Error(`ssoDomain exceeds ${MAX_AUTHORITY_LENGTH} characters`);
	if (!authority.includes(".") && !isLoopbackHost(authority)) throw new Error(`ssoDomain is not a domain name: ${trimmed}`);
	return authority;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/state-storage.js
/**
* State in `localStorage`, so every tab of an origin agrees on it and it
* survives a reload.
*
* The two fields are written as `<principal>|<expiration>` rather than JSON,
* because an expiration is a `bigint` and JSON has no way to carry one.
* @see implements {@link StateStorage}
*/
var LocalStateStorage = class {
	#subscribers = /* @__PURE__ */ new Map();
	get(key) {
		const raw = this.#localStorage().getItem(key);
		if (raw === null) return null;
		const [principalText, expiration] = raw.split("|");
		if (principalText === void 0 || expiration === void 0) return null;
		try {
			return {
				principal: Principal$1.fromText(principalText),
				expiration: BigInt(expiration),
				held: true
			};
		} catch {
			return null;
		}
	}
	set(key, state) {
		this.#localStorage().setItem(key, `${state.principal.toText()}|${state.expiration.toString()}`);
		this.#fire(key);
	}
	remove(key) {
		this.#localStorage().removeItem(key);
		this.#fire(key);
	}
	/** The same as {@link remove}: this store publishes nothing beyond the origin. */
	discard(key) {
		this.remove(key);
	}
	/**
	* Fires when the state changes, here or in another tab of this origin.
	*
	* `localStorage` raises `storage` in every tab except the one that wrote, so
	* that event carries a change between tabs and a same-tab write is announced
	* directly. Either way the record is readable before it is announced, so a
	* listener asking who is signed in sees what it was told about.
	*/
	subscribe(key, listener) {
		let last = this.#raw(key);
		const check = () => {
			const now = this.#raw(key);
			if (now !== last) {
				last = now;
				listener();
			}
		};
		const listeners = this.#subscribers.get(key) ?? /* @__PURE__ */ new Set();
		listeners.add(check);
		this.#subscribers.set(key, listeners);
		const onStorage = (event) => {
			if (event.key === key || event.key === null) check();
		};
		globalThis.addEventListener("storage", onStorage);
		const onVisible = () => {
			if (document.visibilityState === "visible") check();
		};
		const hooked = typeof document !== "undefined";
		if (hooked) {
			document.addEventListener("visibilitychange", onVisible);
			globalThis.addEventListener("pageshow", check);
			globalThis.addEventListener("focus", check);
		}
		return () => {
			listeners.delete(check);
			globalThis.removeEventListener("storage", onStorage);
			if (hooked) {
				document.removeEventListener("visibilitychange", onVisible);
				globalThis.removeEventListener("pageshow", check);
				globalThis.removeEventListener("focus", check);
			}
		};
	}
	#fire(key) {
		for (const check of [...this.#subscribers.get(key) ?? []]) check();
	}
	#raw(key) {
		return this.#localStorage().getItem(key);
	}
	#localStorage() {
		const ls = globalThis.localStorage;
		if (!ls) throw new Error("Could not find local storage.");
		return ls;
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@icp-sdk+auth@9.0.0_@icp-sdk+core@5.4.0/node_modules/@icp-sdk/auth/dist/esm/client/auth-client.js
/**
* The lock one signer interaction at a time holds.
*
* Per origin rather than per namespace, because what cannot be shared is not
* namespaced: an origin has one signer window — `${origin}-signer-window` — and
* one redirect journal per route. Two clients in different namespaces are two
* sign-ins, and they still cannot both have the window.
*/
var CHANNEL_LOCK = "ic-auth-signer-channel";
/** The lock over one namespace's sign-in, which `signIn` and `signOut` both move. */
var signInLockFor = (stateSlot) => `${stateSlot}:sign-in`;
var IDENTITY_PROVIDER_DEFAULT = "https://id.ai/authorize";
var IDENTITY_CANISTER_DEFAULT = "rdmx6-jaaaa-aaaaa-aaadq-cai";
var OPENID_PROVIDER_URLS = {
	google: "https://accounts.google.com",
	apple: "https://appleid.apple.com",
	microsoft: "https://login.microsoftonline.com/{tid}/v2.0"
};
var DEFAULT_OPENID_SCOPE_KEYS = [
	"name",
	"email",
	"verified_email"
];
var DEFAULT_SSO_SCOPE_KEYS = ["name", "email"];
/**
* Thrown when a sign-in exists within the state store's reach but this origin
* holds no credential for it.
*
* A sibling subdomain reads the shared record on its first load and is in exactly
* this position: someone is signed in, and it has nothing to act with until it
* acquires its own. Catching this is where a silent re-issue belongs.
*/
var SessionNotHeldError = class extends Error {
	constructor(message = "A sign-in exists for this domain, but this origin holds no credential for it") {
		super(message);
		this.name = "SessionNotHeldError";
	}
};
/**
* Manages authentication and identity for Internet Computer web apps.
*
* `getStatus()`, `isAuthenticated()` and `getPrincipal()` are synchronous, so a
* page renders on them; `getIdentity()` is what an agent signs with.
*
* @example
* const authClient = new AuthClient();
*
* const identity = authClient.isAuthenticated()
*   ? await authClient.getIdentity()
*   : await authClient.signIn();
*/
/**
* Thrown when a later sign-in or sign-out took over from this one.
*
* Not a failure of the operation so much as a change of mind: an origin has one
* signer window and one sign-in, so the newer intent is the one honoured, and
* the earlier one reports this rather than writing what it had assembled. A
* caller may usually ignore it — the user is getting what they asked for second.
*/
var SupersededError = class extends Error {
	constructor(message = "A later sign-in or sign-out took over from this one") {
		super(message);
		this.name = "SupersededError";
	}
};
var AuthClient = class {
	#identity = new AnonymousIdentity();
	#credentialStorage;
	#slots;
	#canisterId;
	#unwatchForeground;
	#unwatchState;
	#unwatchActivity;
	#refreshingInForeground = false;
	#disposed = false;
	#restoreQueued = false;
	#status;
	#listeners = /* @__PURE__ */ new Set();
	#restoring = false;
	#stateStorage;
	#signer;
	#urlTransport;
	#options;
	#initPromise = null;
	#interactions = 0;
	#channelLock;
	constructor(options = {}) {
		this.#options = options;
		this.#credentialStorage = options.credentialStorage ?? new IdbCredentialStorage();
		this.#slots = slotsFor(options.namespace);
		this.#stateStorage = options.stateStorage ?? new LocalStateStorage();
		if (typeof options.identityProvider === "string" || options.identityProvider instanceof URL) throw new TypeError("identityProvider is now an object: pass { authorizeUrl, canisterId } — the URL a ceremony is rendered at, and the canister that mints");
		const provider = options.identityProvider ?? {
			authorizeUrl: IDENTITY_PROVIDER_DEFAULT,
			canisterId: IDENTITY_CANISTER_DEFAULT
		};
		if (provider.authorizeUrl === void 0 || provider.canisterId === void 0) throw new TypeError("identityProvider names authorizeUrl and canisterId together, or neither: nothing about the canister is derived from the URL");
		this.#canisterId = Principal$1.from(provider.canisterId);
		const identityProviderUrl = new URL(provider.authorizeUrl.toString());
		if (!options.disableBrowserActivity) {
			const refresh = () => {
				this.#refreshInForeground();
			};
			this.#unwatchForeground = watchForeground(refresh);
			this.#unwatchActivity = watchActivity(refresh);
		}
		this.#status = this.#readStatus();
		this.#unwatchState = this.#stateStorage.subscribe(this.#slots.state, () => {
			this.#status = this.#readStatus();
			for (const listener of [...this.#listeners]) listener();
			if (this.#interactions > 0 || this.#restoring || this.#disposed) return;
			this.#restoreAgain();
		});
		if (options.openIdProvider !== void 0 && options.ssoDomain !== void 0) throw new Error("openIdProvider and ssoDomain are mutually exclusive");
		if (options.openIdProvider) identityProviderUrl.searchParams.set("openid", OPENID_PROVIDER_URLS[options.openIdProvider]);
		if (options.ssoDomain !== void 0) {
			identityProviderUrl.searchParams.set("sso", normalizeSsoDomain(options.ssoDomain));
			if (options.derivationOrigin !== void 0) identityProviderUrl.searchParams.set("derivationOrigin", options.derivationOrigin.toString());
		}
		if (options.prompt) identityProviderUrl.searchParams.set("prompt", options.prompt);
		if (options.hint) identityProviderUrl.searchParams.set("hint", options.hint.toText());
		if (options.resumable ?? this.#stateStorage.resumable ?? false) identityProviderUrl.searchParams.set("resumable", "true");
		const transport = options.transport === "redirect" ? new UrlTransport({
			url: identityProviderUrl.toString(),
			callbackUrl: `${globalThis.location.origin}${globalThis.location.pathname}`
		}) : new PostMessageTransport({
			url: identityProviderUrl.toString(),
			windowOpenerFeatures: options.windowOpenerFeatures
		});
		this.#urlTransport = transport instanceof UrlTransport ? transport : void 0;
		this.#signer = new Signer({
			transport,
			derivationOrigin: this.memoize(() => options.derivationOrigin?.toString())
		});
		this.#init();
	}
	/**
	* Returns the current identity, restoring a previous session if available.
	*/
	async getIdentity() {
		await this.#init();
		const live = this.#readStatus().state;
		if ((live === "signed-in" || live === "signed-in-elsewhere") && !this.#disposed && this.#identity instanceof AnonymousIdentity) throw new SessionNotHeldError();
		return this.#identity;
	}
	/**
	* Checks whether the user has an active, non-expired session.
	*/
	isAuthenticated() {
		return this.getStatus().state === "signed-in";
	}
	/**
	* Who this origin can act as, or `undefined` where it cannot act.
	*
	* The same question {@link isAuthenticated} answers, returning who rather than
	* whether — so the two never disagree. Synchronous, and read from the state
	* rather than from whatever material happens to be held, so a page renders on
	* it without opening a store and without waiting for a mint. That is the
	* difference from `(await getIdentity()).getPrincipal()`, which is asynchronous
	* and, on a load with no delegation worth adopting, waits for one to be minted.
	*
	* A principal here means calls made as it will be accepted, so an expired
	* record answers `undefined` even though it still names an account, and so does
	* a record naming an account this origin holds nothing for. Returning one
	* anyway would have an application acting on a session that has ended: the
	* check most reach for is `if (getPrincipal())`, and it has to mean what it
	* looks like it means.
	*
	* {@link getStatus} is where those cases are readable, and it carries the
	* account principal in each of them — so nothing is lost by this being narrow,
	* and an application wanting to say whose session ended asks there.
	*/
	getPrincipal() {
		const status = this.getStatus();
		return status.state === "signed-in" ? status.principal : void 0;
	}
	/**
	* Who is signed in for this origin right now.
	*
	* Synchronous, so a page can render on it without opening a store.
	*/
	getStatus() {
		if (this.#status.state !== "signed-out" && Date.now() >= this.#status.expiresAtMs) {
			if (this.#status.state !== "expired") {
				const { principal, expiresAtMs } = this.#status;
				this.#status = {
					state: "expired",
					principal,
					expiresAtMs
				};
			}
		}
		return this.#status;
	}
	/** Reads the record and builds the answer `getStatus` hands out. */
	#readStatus() {
		const record = this.#stateStorage.get(this.#slots.state);
		if (record === null) return { state: "signed-out" };
		const { principal } = record;
		const expiresAtMs = Number(record.expiration / 1000000n);
		if (Date.now() >= expiresAtMs) return {
			state: "expired",
			principal,
			expiresAtMs
		};
		return record.held ? {
			state: "signed-in",
			principal,
			expiresAtMs
		} : {
			state: "signed-in-elsewhere",
			principal,
			expiresAtMs
		};
	}
	/**
	* Watches who is signed in here, and returns a function that stops watching.
	*
	* `getStatus()` and the predicates beside it are snapshots, so an application
	* rendering on them needs to be told when to read again. The record changes
	* for reasons that are nothing to do with this client — another tab signing
	* out, a sibling subdomain publishing a sign-in, a peer client on this page
	* re-issuing silently — and this is how those arrive.
	*
	* Fired once the record is readable, so a listener asking who is signed in
	* sees what it was told about. It says that something changed and not what: a
	* listener reads the answer it wants, which for most is `getStatus()`.
	*
	* What it does not cover is the identity being replaced under an application
	* that holds one — an app delegation rotating is deliberately invisible, and
	* nothing about who is signed in has changed when it does.
	* @param listener - Called after the record changes.
	* @returns A function that unregisters it.
	*/
	subscribe(listener) {
		this.#listeners.add(listener);
		return () => {
			this.#listeners.delete(listener);
		};
	}
	/**
	* Releases what this client hooked: the browser listeners, the state
	* subscription, and the refresh the identity has scheduled. Call it when
	* discarding a client, so nothing it registered outlives it.
	*/
	dispose() {
		this.#disposed = true;
		if (this.#identity instanceof SessionIdentity) this.#identity.dispose();
		if (this.#interactions > 0) this.#signer.closeChannel().catch(() => void 0);
		this.#channelLock?.release();
		this.#channelLock = void 0;
		this.#unwatchForeground?.();
		this.#unwatchForeground = void 0;
		this.#unwatchActivity?.();
		this.#unwatchActivity = void 0;
		this.#unwatchState?.();
		this.#unwatchState = void 0;
	}
	/**
	* Opens the identity provider, requests a delegation, and returns the authenticated identity.
	*
	* @param options - Sign-in options.
	* @param options.maxTimeToLive - Maximum lifetime of the delegation in nanoseconds.
	* @param options.targets - Restrict the delegation to specific canisters.
	* @returns The authenticated identity.
	* @throws When authentication fails.
	*
	* @example
	* try {
	*   const identity = await authClient.signIn();
	* } catch (error) {
	*   console.error('Sign-in failed:', error);
	* }
	*/
	/**
	* Records that an interaction is under way, without asking the browser for
	* anything.
	*
	* Separate from taking the lock because of when each may happen: the count has
	* to be up before the first await, and a lock may only be asked for once the
	* signer window is open.
	*/
	/**
	* Installs the identity this client acts with, releasing the one it replaces.
	*
	* A {@link SessionIdentity} holds a scheduled refresh, so dropping the
	* reference without disposing leaves a timer that can still mint — into a slot
	* this client may no longer be the writer of, for a session it may no longer
	* hold. Every assignment goes through here so that no path can forget, which
	* matters most for the paths that give up rather than the ones that succeed:
	* those are the paths written to stop acting.
	*/
	#installIdentity(next) {
		const previous = this.#identity;
		if (previous !== next && previous instanceof SessionIdentity) previous.dispose();
		this.#identity = next;
	}
	#beginInteraction() {
		this.#interactions += 1;
	}
	/**
	* Opens the signer channel and takes the lock that makes this the only
	* interaction on it.
	*
	* One method because the order is the whole point. A popup may only be opened
	* from the task the click started, so nothing may be asked of the browser
	* before `openChannel` — two lock requests in front of it were enough for
	* Chromium to refuse the window — and the lock has to be taken as soon as it
	* is open. Two callers doing that by hand is one place too many for the order
	* to come out backwards.
	*/
	async #openSignerChannel() {
		await this.#signer.openChannel();
		if (this.#channelLock === void 0) {
			const lock = stealLock(CHANNEL_LOCK);
			lock.stolen.addEventListener("abort", () => {
				this.#signer.closeChannel().catch(() => void 0);
			}, { once: true });
			this.#channelLock = lock;
		}
	}
	#endInteraction() {
		this.#interactions -= 1;
		if (this.#interactions === 0) {
			this.#channelLock?.release();
			this.#channelLock = void 0;
		}
	}
	/**
	* Refuses to go on where this operation is no longer the current one.
	*
	* Asked after the calls have returned and before anything shared is written,
	* which is where `acquireCredential` asks it for a mint and for the same
	* reason: a call already sent cannot be recalled, so the only thing left to
	* decide is whether to keep its result.
	*/
	#assertCurrent(signInLock) {
		if (this.#disposed) throw new SupersededError("This client was disposed while signing in");
		if (this.#channelLock?.stolen.aborted === true) throw new SupersededError("Another signer interaction took the channel");
		if (signInLock.stolen.aborted) throw new SupersededError();
	}
	async signIn(options) {
		this.#beginInteraction();
		try {
			return await this.#runSignIn(options);
		} finally {
			this.#endInteraction();
		}
	}
	async #runSignIn(options) {
		const raw = options?.returnTo;
		const returnTo = raw === void 0 ? void 0 : this.memoize(() => sameOriginTarget(raw)?.href ?? null);
		const sessionKeyPromise = this.#urlTransport ? this.#ensureSessionKeyForRedirectFlow(this.#urlTransport) : this.#ensureSessionKeyForWindowFlow().then((key) => ({ key }));
		sessionKeyPromise.catch(() => void 0);
		await this.#openSignerChannel();
		const signInLock = stealLock(signInLockFor(this.#slots.state));
		const guarded = async (write) => {
			this.#assertCurrent(signInLock);
			await write();
		};
		try {
			await this.#init();
			const { key, pending } = await sessionKeyPromise;
			if (!("sign" in key)) throw new Error("A session needs a key that can sign");
			const sessionChain = await requestSessionDelegation(this.#signer, {
				sessionPublicKey: key.getPublicKey().toDer(),
				maxTimeToLive: options?.maxTimeToLive,
				maxTimeToIdle: options?.maxTimeToIdle,
				derivationOrigin: this.#options.derivationOrigin?.toString()
			});
			if (!chainAuthorisesKey(sessionChain, key.getPublicKey().toDer())) throw new Error("The session chain does not delegate to the key it was requested for");
			const minter = await this.#minterFor(key, sessionChain);
			const appKey = await this.#credentialStorage.create();
			const appChain = await minter.mint(appKey.getPublicKey().toDer());
			await guarded(() => this.#credentialStorage.set(this.#slots.appPending, {
				identity: appKey,
				chain: appChain
			}));
			await guarded(() => this.#persistSession(key, sessionChain, appChain.publicKey));
			await guarded(() => this.#promoteAppCredential(appKey, appChain));
			await guarded(async () => {
				this.#installIdentity(await this.#openSession(key, sessionChain, minter));
			});
			if (pending) try {
				await this.#credentialStorage.remove(this.#slots.sessionPending);
			} catch {}
			const target = await returnTo;
			if (typeof target === "string") location.replace(target);
			return this.#identity;
		} finally {
			signInLock.release();
		}
	}
	#ensureSessionKeyForWindowFlow() {
		return this.#credentialStorage.create();
	}
	async #ensureSessionKeyForRedirectFlow(transport) {
		if (!this.#credentialStorage.durable) throw new Error("A redirect sign-in needs a credential store that survives the navigation, and this one does not. Use a durable store or the window transport.");
		let acquired = null;
		const startedWith = await transport.memoize(async () => {
			const stored = await this.#credentialStorage.get(this.#slots.sessionPending);
			if (stored !== null) acquired = stored.identity;
			else {
				acquired = await this.#credentialStorage.create();
				await this.#credentialStorage.set(this.#slots.sessionPending, { identity: acquired });
			}
			return publicKeyOf(acquired);
		});
		const key = acquired ?? (await this.#credentialStorage.get(this.#slots.sessionPending))?.identity ?? null;
		if (key === null || publicKeyOf(key) !== startedWith) throw new Error("This sign-in was superseded by another one in this browser");
		return {
			key,
			pending: true
		};
	}
	/**
	* Requests signed identity attributes from the identity provider.
	*
	* The `nonce` is a callback that produces the 32-byte nonce (typically
	* fetched from the RP canister), returning a promise resolving to it. It is a
	* callback rather than a value so the redirect flow can journal the nonce and
	* reuse the exact same bytes when the flow replays on the return load,
	* instead of fetching a fresh single-use nonce that the signer never signed
	* against.
	*
	* In 'window' mode the callback lets the identity provider window open while the
	* nonce is still resolving, avoiding a perceived delay before the user sees
	* the prompt; auto-close of the signer transport channel is temporarily
	* disabled while awaiting so the window cannot be closed out from under the
	* pending flow.
	*
	* @param params - Request parameters.
	* @param params.keys - Attribute keys to request (e.g. `['email', 'name']`).
	* @param params.nonce - Produces the 32-byte nonce issued by the RP canister,
	*   as a promise resolving to it.
	* @returns Signed attribute data and signature.
	* @throws When the identity provider returns an error or an invalid response.
	*/
	async requestAttributes(params) {
		this.#beginInteraction();
		try {
			return await this.#runRequestAttributes(params);
		} finally {
			this.#endInteraction();
		}
	}
	async #runRequestAttributes(params) {
		const nonceBytes = this.#urlTransport ? fromBase64(await this.#urlTransport.memoize(async () => toBase64(await params.nonce()))) : await this.#resolveNonce(params.nonce);
		const response = await this.#signer.sendRequest({
			jsonrpc: "2.0",
			id: globalThis.crypto.randomUUID(),
			method: "ii-icrc3-attributes",
			params: {
				keys: params.keys,
				nonce: toBase64(nonceBytes)
			}
		});
		if ("error" in response) throw new Error(response.error.message);
		const result = response.result;
		if (typeof result?.data !== "string" || typeof result?.signature !== "string") throw new Error("Invalid response: missing data or signature");
		try {
			return {
				data: fromBase64(result.data),
				signature: fromBase64(result.signature)
			};
		} catch (cause) {
			throw new Error("Invalid response: data or signature is not valid base64", { cause });
		}
	}
	memoize(produce) {
		if (this.#urlTransport) return this.#urlTransport.memoize(produce);
		return produce();
	}
	/**
	* Clears the stored session and resets the client to an anonymous state.
	*
	* @param options - Sign-out options.
	* @param options.returnTo - URL to navigate to after sign-out.
	*/
	async signOut(options = {}) {
		await this.#init();
		const signOutLock = stealLock(signInLockFor(this.#slots.state));
		const session = await this.#credentialStorage.get(this.#slots.session).catch(() => null);
		await stealMintLock(this.#credentialStorage.shared ? this.#slots.app : null);
		const revoked = session?.chain === void 0 || !("sign" in session.identity) ? Promise.resolve(void 0) : this.#revoke(session.identity, session.chain).then(() => void 0, (error) => error);
		const cleared = this.#endSession();
		this.#installIdentity(new AnonymousIdentity());
		const [revokeFailure] = await Promise.all([revoked, cleared]);
		signOutLock.release();
		if (revokeFailure !== void 0) throw revokeFailure;
		if (options.returnTo !== void 0) {
			const target = sameOriginTarget(options.returnTo);
			if (target !== void 0) window.location.assign(target.href);
		}
	}
	async #resolveNonce(nonce) {
		const value = nonce();
		await this.#openSignerChannel();
		const previousAutoClose = this.#signer.autoCloseTransportChannel;
		this.#signer.autoCloseTransportChannel = false;
		try {
			return await value;
		} finally {
			this.#signer.autoCloseTransportChannel = previousAutoClose;
		}
	}
	/**
	* Mints ahead of the next request when the page comes back, if one is due.
	*
	* Silent by design: this is not a request anyone is waiting on, so a failure
	* leaves what is held in place for the next one to retry.
	*/
	async #refreshInForeground() {
		if (this.#interactions > 0 || this.#refreshingInForeground) return;
		this.#refreshingInForeground = true;
		try {
			await this.#refreshIfDue();
		} finally {
			this.#refreshingInForeground = false;
		}
	}
	async #refreshIfDue() {
		if (!await this.#init().then(() => true, () => false)) return;
		if (this.#interactions > 0) return;
		const identity = this.#identity;
		if (identity instanceof SessionIdentity) await identity.refresh().catch(() => void 0);
	}
	/** Ends the session at the canister, so nothing more can be minted from it. */
	async #revoke(key, sessionChain) {
		await (await SessionMinter.create({
			sessionKey: key,
			sessionChain,
			canisterId: this.#canisterId,
			agentOptions: this.#options.agentOptions
		})).revoke();
	}
	/**
	* Moves what a ceremony minted into the slot every tab acts with.
	*
	* Overwrites rather than clearing and re-filling, so there is no moment where
	* the origin holds nothing — and what it replaces is a credential rooted at
	* whatever account the previous session belonged to.
	*/
	async #promoteAppCredential(identity, chain) {
		await this.#credentialStorage.set(this.#slots.app, {
			identity,
			chain
		});
		await this.#credentialStorage.remove(this.#slots.appPending).catch(() => void 0);
	}
	#minterFor(key, sessionChain) {
		return SessionMinter.create({
			sessionKey: key,
			sessionChain,
			canisterId: this.#canisterId,
			agentOptions: this.#options.agentOptions
		});
	}
	/**
	* Builds the identity an application acts with, from a session it holds.
	*
	* Little more than a constructor call: the identity resolves the account key it
	* needs, so this passes the session's own shape and the slot to use and nothing
	* more.
	* @param key - The session key, which signs the mints.
	* @param sessionChain - The chain that authorises it, and whose earliest
	*   delegation bounds how long anything can be minted.
	* @param source - A minter already built for this session, where the caller has
	*   one. A sign-in does; a page load does not.
	*/
	async #openSession(key, sessionChain, source) {
		const minter = source ?? await this.#minterFor(key, sessionChain);
		const held = this.#stateStorage.get(this.#slots.state);
		let opening = source !== void 0;
		const identity = await SessionIdentity.create({
			sessionExpiresAtMs: earliestExpiryMs(sessionChain),
			source: minter,
			storage: this.#credentialStorage,
			slot: this.#slots.app,
			expectedAccount: held?.principal,
			onSessionGone: () => {
				this.#endOrDrop(held, !opening).catch(() => void 0);
				this.#installIdentity(new AnonymousIdentity());
			}
		});
		opening = false;
		return identity;
	}
	/**
	* Ends the sign-in, or only this origin's claim on it.
	*
	* A refused mint says the session this origin held is dead, and a domain has
	* one: it cannot be revived, only replaced. So if the record still names what
	* this origin was operating under — same account, same expiry — it names a
	* session nobody can use, and it is published as over. If it has moved on in
	* either respect, someone else owns the sign-in now and this origin converges
	* to them rather than retracting what they published.
	* @param held - The record as it stood when the session was opened.
	* @param ended - Whether a session that was in use has ended, as opposed to a
	*   ceremony's session being refused before it was ever usable. The first is
	*   published as expired; the second leaves nothing behind.
	*/
	async #endOrDrop(held, ended) {
		const now = this.#stateStorage.get(this.#slots.state);
		if (!(held !== null && now !== null && now.principal.compareTo(held.principal) === "eq" && now.expiration === held.expiration)) {
			await this.#dropSession();
			return;
		}
		await (ended ? this.#expireSession(now.principal) : this.#endSession());
	}
	/**
	* Publishes the sign-in as over, rather than as never having happened.
	*
	* A session that ran out or was revoked ended on its own, and an application
	* says so differently: "your session ended, sign back in" names the account it
	* ended for, which a removed record cannot. Every tab and sibling reads
	* `expired` from it for the same reason. Signing out removes the record
	* instead — that is the user asking to leave, not a session running its
	* course.
	* @param principal - The account whose session ended.
	*/
	async #expireSession(principal) {
		this.#stateStorage.set(this.#slots.state, {
			principal,
			expiration: BigInt(Date.now()) * 1000000n
		});
		await this.#clearCredentials();
	}
	/**
	* Restores again, because the record changed under this client.
	*
	* Queued behind whatever restore is in flight rather than replacing it: two
	* restores reading one store would both install an identity, and the order
	* they finished in would decide which. A failure is forgotten the same way
	* {@link AuthClient.#init} forgets one, so the next call tries again.
	*/
	#restoreAgain() {
		if (this.#restoreQueued) return;
		this.#restoreQueued = true;
		const promise = (this.#initPromise ?? Promise.resolve()).catch(() => void 0).then(() => {
			this.#restoreQueued = false;
			return this.#restore();
		}).catch((error) => {
			this.#restoreQueued = false;
			if (this.#initPromise === promise) this.#initPromise = null;
			throw error;
		});
		this.#initPromise = promise;
		promise.catch(() => void 0);
	}
	#init() {
		if (!this.#initPromise) {
			const promise = this.#restore().catch((error) => {
				if (this.#initPromise === promise) this.#initPromise = null;
				throw error;
			});
			this.#initPromise = promise;
		}
		return this.#initPromise;
	}
	async #restore() {
		this.#restoring = true;
		try {
			await this.#hydrate();
		} finally {
			this.#restoring = false;
		}
	}
	async #hydrate() {
		const restored = await this.#restoreSession();
		const key = restored?.identity;
		const chain = restored?.chain;
		if (!key || !chain) {
			if (this.#readStatus().state === "signed-in") await this.#dropSession();
			this.#installIdentity(new AnonymousIdentity());
			return;
		}
		if (this.#stateStorage.get(this.#slots.state) === null) {
			await this.#endSession();
			return;
		}
		if (!("sign" in key)) {
			this.#installIdentity(new AnonymousIdentity());
			return;
		}
		let identity;
		try {
			identity = await this.#openSession(key, chain);
		} catch (error) {
			if (!(error instanceof AccountMismatchError)) throw error;
			await this.#dropSession();
			this.#installIdentity(new AnonymousIdentity());
			return;
		}
		if (this.#disposed) {
			identity.dispose();
			return;
		}
		const state = this.#stateStorage.get(this.#slots.state);
		if (state === null || state.principal.toText() !== identity.getPrincipal().toText()) {
			identity.dispose();
			this.#installIdentity(new AnonymousIdentity());
			await this.#dropSession();
			return;
		}
		this.#installIdentity(identity);
	}
	/**
	* Stores the session as one record and records the state it puts this origin
	* in, so {@link isAuthenticated} can answer without reading it back.
	*/
	async #persistSession(identity, chain, accountKey) {
		await this.#credentialStorage.set(this.#slots.session, {
			identity,
			chain
		});
		let earliest = null;
		for (const { delegation } of chain.delegations) if (earliest === null || delegation.expiration < earliest) earliest = delegation.expiration;
		if (earliest !== null) this.#stateStorage.set(this.#slots.state, {
			principal: Principal$1.selfAuthenticating(new Uint8Array(accountKey)),
			expiration: earliest
		});
	}
	/**
	* Loads the stored session. Returns `null` and ends the sign-in where the
	* delegation has expired or the record cannot be read.
	*/
	async #restoreSession() {
		const credential = await this.#credentialStorage.get(this.#slots.session);
		if (credential === null) return null;
		if (credential.chain === void 0 || !isDelegationValid(credential.chain)) {
			await this.#clearCredentials();
			return null;
		}
		return credential;
	}
	/**
	* Ends the sign-in: what a user pressing sign out asks for.
	*
	* Retracts the state, including anything the store publishes beyond this
	* origin, because a sibling reading a shared record must stop seeing one.
	*/
	async #endSession() {
		this.#stateStorage.remove(this.#slots.state);
		await this.#clearCredentials();
	}
	/**
	* Drops this origin's claim on a sign-in without retracting what is published.
	*
	* What finding out does, which is a different act. An origin whose chain turns
	* out to be dead cannot tell a revoked session from one a sibling replaced by
	* signing in — and in the second case the shared record was written by that
	* sibling a moment ago, so retracting it would tell it that the session it just
	* obtained is gone.
	*/
	async #dropSession() {
		this.#stateStorage.discard(this.#slots.state);
		await this.#clearCredentials();
	}
	async #clearCredentials() {
		const failed = (await Promise.allSettled([this.#credentialStorage.remove(this.#slots.session), this.#credentialStorage.remove(this.#slots.app)])).find((outcome) => outcome.status === "rejected");
		if (failed !== void 0) throw failed.reason;
	}
};
/** The moment a chain stops being usable: its earliest delegation's expiry. */
function earliestExpiryMs(chain) {
	let earliest = null;
	for (const { delegation } of chain.delegations) if (earliest === null || delegation.expiration < earliest) earliest = delegation.expiration;
	return earliest === null ? 0 : Number(earliest / 1000000n);
}
/** A key's public half as text, for comparing two keys without holding both. */
function publicKeyOf(key) {
	return toBase64(new Uint8Array(key.getPublicKey().toDer()));
}
/**
* The `returnTo` as a URL this origin may navigate to, or `undefined`.
*
* Same-origin and `http(s)` only. Anything else is ignored rather than refused,
* because a `returnTo` is a convenience and failing a sign-in or a sign-out over
* one would be worse than landing on the page the caller started from. Returning
* the parsed URL rather than a boolean is what lets callers navigate to
* `target.href` instead of to the raw value they were handed.
*/
function sameOriginTarget(returnTo) {
	let target;
	try {
		target = new URL(returnTo, window.location.href);
	} catch {
		return;
	}
	if ((target.protocol === "https:" || target.protocol === "http:") && target.origin === window.location.origin) return target;
}
function scopedKeys(params) {
	if (params.openIdProvider !== void 0 && params.ssoDomain !== void 0) throw new Error("openIdProvider and ssoDomain are mutually exclusive");
	if (params.ssoDomain !== void 0) {
		const domain = normalizeSsoDomain(params.ssoDomain);
		return (params.keys ?? DEFAULT_SSO_SCOPE_KEYS).map((key) => `sso:${domain}:${key}`);
	}
	if (params.openIdProvider === void 0) throw new Error("scopedKeys requires either openIdProvider or ssoDomain");
	const provider = OPENID_PROVIDER_URLS[params.openIdProvider];
	return (params.keys ?? DEFAULT_OPENID_SCOPE_KEYS).map((key) => `openid:${provider}:${key}`);
}
var DEFAULT_ATTRIBUTE_KEYS = ["verified_email"];
/**
* II's authorize URL is used verbatim. Origin-only overrides (e.g.
* `http://localhost:5173`) must open `/authorize`, not the II home page.
*/
function normalizeAuthorizeUrl(value) {
	const url = new URL(value.toString());
	url.pathname = "/authorize";
	return url.toString();
}
/**
* Caffeine injects `II_URL` / `II_CANISTER_ID`. Apps must not set
* `identityProvider` — omit the AuthClient option when those env vars are
* unset (mainnet II is the default).
*/
function resolveIdentityProvider(options) {
	if (!options?.envUrl) return;
	return {
		authorizeUrl: normalizeAuthorizeUrl(options.envUrl),
		canisterId: options.envCanisterId ?? "rdmx6-jaaaa-aaaaa-aaadq-cai"
	};
}
/**
* Point the agent that mints delegations at II's own origin. Left unset, the
* agent derives its host from the page, which on a local origin such as
* `http://<canister-id>.localhost:8000` is a replica that does not run II.
* A caller-supplied `host` wins.
*/
function resolveAgentOptions(agentOptions, envUrl) {
	return {
		...agentOptions,
		host: agentOptions?.host ?? new URL(envUrl || "https://id.ai").origin
	};
}
/**
* Pick the attribute keys to request from II for a sign-in variant. Explicit
* keys from `withAttributes` always win; otherwise the keys are scoped to the
* sign-in variant so the user grants access in a single step.
*/
function resolveAttributeKeys(attrs, loginOptions) {
	if (attrs.keys) return attrs.keys;
	const ssoDomain = loginOptions?.ssoDomain?.trim();
	if (ssoDomain) return [...scopedKeys({ ssoDomain })];
	if (loginOptions?.provider) return [...scopedKeys({ openIdProvider: loginOptions.provider })];
	return DEFAULT_ATTRIBUTE_KEYS;
}
/**
* Map a storage-backed session snapshot onto the hook's loginStatus.
*
* Interactive login (`logging-in`) stays in progress until the session is
* signed-in (success) or the login path reports an error. A restored or
* other-tab sign-in is `idle` + authenticated, not `success`.
*/
function nextLoginStatus(sessionState, previous) {
	if (sessionState === "signed-in") {
		if (previous === "logging-in" || previous === "success") return "success";
		return "idle";
	}
	if (sessionState === "expired") {
		if (previous === "logging-in" || previous === "loginError") return previous;
		return "expired";
	}
	if (previous === "logging-in" || previous === "loginError") return previous;
	return "idle";
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@caffeineai+core-infrastructure@2.0.1_@caffeineai+object-storage@1.1.2/node_modules/@caffeineai/core-infrastructure/dist/hooks/useInternetIdentity.js
var iiAttributesIDL = ({ IDL: I }) => I.Service({
	_internet_identity_sign_in_start: I.Func([], [I.Vec(I.Nat8)], []),
	_internet_identity_sign_in_finish: I.Func([], [I.Variant({
		ok: I.Null,
		err: I.Record({})
	})], []),
	_initialize_access_control: I.Func([], [], [])
});
var II_SIGNER_CANISTER_ID = "rdmx6-jaaaa-aaaaa-aaadq-cai";
var InternetIdentityReactContext = (0, import_react.createContext)(void 0);
/**
* Single constructor for every `AuthClient` — the shared client built at
* provider initialization and the per-login clients for the one-click and
* SSO variants (`openIdProvider` and `ssoDomain` are constructor-only
* options on `@icp-sdk/auth`, so variants need their own client).
* Sign-in state lives in storage, so a variant sign-in is still restored by
* the shared client on reload and cleared by `clear()`.
*
* Deliberately synchronous: the signer window must be opened inside the
* click's user-activation frame, so no awaits are allowed between the click
* and `signIn()`. Callers that may run before the config cache is populated
* (provider initialization) must `await loadConfig()` first; the login path
* reads the cache, which is populated by then.
*/
function buildAuthClient(config, loginOptions, createOptions) {
	const { identityProvider: _callerIdentityProvider, openIdProvider: _openIdProvider, ssoDomain: _ssoDomain, ...rest } = {
		derivationOrigin: config?.ii_derivation_origin,
		...createOptions
	};
	const identityProvider = resolveIdentityProvider({
		envUrl: "https://id.ai/authorize",
		envCanisterId: "rdmx6-jaaaa-aaaaa-aaadq-cai"
	});
	const managed = {
		...rest,
		agentOptions: resolveAgentOptions(rest.agentOptions, "https://id.ai/authorize"),
		...identityProvider ? { identityProvider } : {}
	};
	const ssoDomain = loginOptions?.ssoDomain?.trim();
	if (ssoDomain) return new AuthClient({
		...managed,
		ssoDomain
	});
	if (loginOptions?.provider) return new AuthClient({
		...managed,
		openIdProvider: loginOptions.provider
	});
	return new AuthClient(managed);
}
/**
* Create an inline actor for the two IdentityAttributes mixin methods.
* Uses the same `backend_canister_id` and `backend_host` as the rest of the app.
*/
async function createIIAttributesActor(identity) {
	const config = await loadConfig();
	const agent = new HttpAgent({
		host: config.backend_host,
		identity
	});
	if (config.backend_host?.includes("localhost")) await agent.fetchRootKey().catch(() => {});
	return Actor.createActor(iiAttributesIDL, {
		agent,
		canisterId: config.backend_canister_id
	});
}
function assertProviderPresent(context) {
	if (!context) throw new Error("InternetIdentityProvider is not present. Wrap your component tree with it.");
}
/**
* Hook to access the internet identity as well as loginStatus along with
* login and clear functions.
*/
var useInternetIdentity = () => {
	const context = (0, import_react.useContext)(InternetIdentityReactContext);
	assertProviderPresent(context);
	return context;
};
/**
* The InternetIdentityProvider component makes the saved identity available
* after page reloads. It also allows you to configure default options
* for AuthClient and login.
*
*
* @example
* ```tsx
* <InternetIdentityProvider>
*   <App />
* </InternetIdentityProvider>
* ```
*
* Attribute verification is enabled by default (`verified_email` from Internet Identity).
* Pass `withAttributes={false}` to use plain sign-in only, or override keys explicitly:
* ```tsx
* <InternetIdentityProvider withAttributes={{ keys: ['email', 'verified_email'] }}>
*   <App />
* </InternetIdentityProvider>
* ```
*/
function InternetIdentityProvider({ children, createOptions, withAttributes = {} }) {
	const [authClient, setAuthClient] = (0, import_react.useState)(void 0);
	const [identity, setIdentity] = (0, import_react.useState)(void 0);
	const [loginStatus, setStatus] = (0, import_react.useState)("initializing");
	const [loginError, setError] = (0, import_react.useState)(void 0);
	const withAttributesRef = (0, import_react.useRef)(withAttributes);
	withAttributesRef.current = withAttributes;
	const createOptionsRef = (0, import_react.useRef)(createOptions);
	createOptionsRef.current = createOptions;
	const setErrorMessage = (0, import_react.useCallback)((message) => {
		setStatus("loginError");
		setError(new Error(message));
	}, []);
	const handleLoginSuccess = (0, import_react.useCallback)(async (client) => {
		const latestIdentity = await client.getIdentity();
		if (!latestIdentity) {
			setErrorMessage("Identity not found after successful login");
			return;
		}
		setIdentity(latestIdentity);
		setStatus("success");
		setError(void 0);
	}, [setErrorMessage]);
	const handleLoginError = (0, import_react.useCallback)((maybeError) => {
		setErrorMessage(maybeError ?? "Login failed");
	}, [setErrorMessage]);
	const login = (0, import_react.useCallback)((loginOptions) => {
		if (!authClient) {
			setErrorMessage("AuthClient is not initialized yet, make sure to call `login` on user interaction e.g. click.");
			return;
		}
		if (authClient.isAuthenticated()) {
			setErrorMessage("User is already authenticated");
			return;
		}
		if (loginOptions?.ssoDomain !== void 0 && !loginOptions.ssoDomain.trim()) {
			setErrorMessage("ssoDomain must be a non-empty domain such as \"acme.com\"");
			return;
		}
		setStatus("logging-in");
		const attrs = withAttributesRef.current;
		let variantClient;
		const disposeVariant = () => {
			variantClient?.dispose();
			variantClient = void 0;
		};
		const startSignIn = (client) => {
			if (attrs !== false) {
				const signInPromise = client.signIn();
				const attributesPromise = client.requestAttributes({
					keys: resolveAttributeKeys(attrs, loginOptions),
					nonce: () => createIIAttributesActor().then((actor) => actor._internet_identity_sign_in_start())
				});
				Promise.all([signInPromise, attributesPromise]).then(async ([plainIdentity, { data, signature }]) => {
					const actor = await createIIAttributesActor(plainIdentity);
					if (!data || data.length === 0) {
						await handleLoginSuccess(client);
						await actor._initialize_access_control();
						return;
					}
					const signerCanisterId = Principal$1.fromText(II_SIGNER_CANISTER_ID);
					const finishActor = await createIIAttributesActor(new AttributesIdentity({
						inner: plainIdentity,
						attributes: {
							data,
							signature
						},
						signer: { canisterId: signerCanisterId }
					}));
					try {
						await finishActor._internet_identity_sign_in_finish();
					} catch (error) {
						console.error(error);
					}
					await handleLoginSuccess(client);
				}).catch((unknownError) => {
					handleLoginError(unknownError instanceof Error ? unknownError.message : void 0);
				}).finally(disposeVariant);
			} else client.signIn().then(async (plainIdentity) => {
				await (await createIIAttributesActor(plainIdentity))._initialize_access_control();
				await handleLoginSuccess(client);
			}).catch((unknownError) => {
				handleLoginError(unknownError instanceof Error ? unknownError.message : void 0);
			}).finally(disposeVariant);
		};
		if (Boolean(loginOptions?.ssoDomain?.trim() || loginOptions?.provider)) try {
			variantClient = buildAuthClient(getCachedConfig(), loginOptions ?? {}, createOptionsRef.current);
			startSignIn(variantClient);
		} catch (unknownError) {
			disposeVariant();
			handleLoginError(unknownError instanceof Error ? unknownError.message : void 0);
		}
		else startSignIn(authClient);
	}, [
		authClient,
		handleLoginError,
		handleLoginSuccess,
		setErrorMessage
	]);
	const clear = (0, import_react.useCallback)(() => {
		if (!authClient) {
			setErrorMessage("Auth client not initialized");
			return;
		}
		authClient.signOut().then(() => {
			setIdentity(void 0);
			setStatus("idle");
			setError(void 0);
		}).catch((unknownError) => {
			setStatus("loginError");
			setError(unknownError instanceof Error ? unknownError : /* @__PURE__ */ new Error("Logout failed"));
		});
	}, [authClient, setErrorMessage]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		let client;
		let unsubscribe;
		(async () => {
			try {
				setStatus("initializing");
				const config = await loadConfig();
				if (cancelled) return;
				client = buildAuthClient(config, void 0, createOptions);
				setAuthClient(client);
				const applyStatus = async () => {
					if (!client || cancelled) return;
					const session = client.getStatus();
					if (session.state === "signed-in") {
						try {
							const loadedIdentity = await client.getIdentity();
							if (cancelled) return;
							setIdentity(loadedIdentity);
							setStatus((previous) => nextLoginStatus(session.state, previous));
							setError(void 0);
						} catch (unknownError) {
							if (cancelled) return;
							setIdentity(void 0);
							setStatus("loginError");
							setError(unknownError instanceof Error ? unknownError : /* @__PURE__ */ new Error("Failed to load identity"));
						}
						return;
					}
					setIdentity(void 0);
					setStatus((previous) => nextLoginStatus(session.state, previous));
				};
				unsubscribe = client.subscribe(() => {
					applyStatus();
				});
				await applyStatus();
			} catch (unknownError) {
				if (cancelled) return;
				setIdentity(void 0);
				setStatus("loginError");
				setError(unknownError instanceof Error ? unknownError : /* @__PURE__ */ new Error("Initialization failed"));
			}
		})();
		return () => {
			cancelled = true;
			unsubscribe?.();
			client?.dispose();
			setAuthClient(void 0);
		};
	}, [createOptions]);
	const value = (0, import_react.useMemo)(() => ({
		identity,
		login,
		clear,
		loginStatus,
		isInitializing: loginStatus === "initializing",
		isLoginIdle: loginStatus === "idle",
		isLoggingIn: loginStatus === "logging-in",
		isLoginSuccess: loginStatus === "success",
		isLoginError: loginStatus === "loginError",
		isSessionExpired: loginStatus === "expired",
		isAuthenticated: !!identity && !identity.getPrincipal().isAnonymous(),
		loginError
	}), [
		identity,
		login,
		clear,
		loginStatus,
		loginError
	]);
	return (0, import_react.createElement)(InternetIdentityReactContext.Provider, {
		value,
		children
	});
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@caffeineai+core-infrastructure@2.0.1_@caffeineai+object-storage@1.1.2/node_modules/@caffeineai/core-infrastructure/dist/hooks/useActor.js
var ACTOR_QUERY_KEY = "actor";
function useActor(createActor, options) {
	const { identity, isAuthenticated } = useInternetIdentity();
	const queryClient = useQueryClient();
	const mockModules = options?.mockModules;
	const actorQuery = useQuery({
		queryKey: [ACTOR_QUERY_KEY, identity?.getPrincipal().toString()],
		queryFn: async () => {
			if (!isAuthenticated) return await createActorWithConfig(createActor, { mockModules });
			return await createActorWithConfig(createActor, {
				agentOptions: { identity },
				mockModules
			});
		},
		staleTime: Number.POSITIVE_INFINITY,
		enabled: true
	});
	(0, import_react.useEffect)(() => {
		if (actorQuery.data) {
			queryClient.invalidateQueries({ predicate: (query) => {
				return !query.queryKey.includes(ACTOR_QUERY_KEY);
			} });
			queryClient.refetchQueries({ predicate: (query) => {
				return !query.queryKey.includes(ACTOR_QUERY_KEY);
			} });
		}
	}, [actorQuery.data, queryClient]);
	return {
		actor: actorQuery.data || null,
		isFetching: actorQuery.isFetching
	};
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/lucide-react@0.511.0_react@19.1.5/node_modules/lucide-react/dist/esm/shared/src/utils.js
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/lucide-react@0.511.0_react@19.1.5/node_modules/lucide-react/dist/esm/defaultAttributes.js
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/lucide-react@0.511.0_react@19.1.5/node_modules/lucide-react/dist/esm/Icon.js
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => (0, import_react.createElement)("svg", {
	ref,
	...defaultAttributes,
	width: size,
	height: size,
	stroke: color,
	strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
	className: mergeClasses("lucide", className),
	...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
	...rest
}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]));
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/lucide-react@0.511.0_react@19.1.5/node_modules/lucide-react/dist/esm/createLucideIcon.js
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
//#endregion
//#region src/declarations/backend.did.js
var _ImmutableObjectStorageCreateCertificateResult = Record({
	"method": Text,
	"blob_hash": Text
});
var _ImmutableObjectStorageRefillInformation = Record({ "proposed_top_up_amount": Opt(Nat) });
var _ImmutableObjectStorageRefillResult = Record({
	"success": Opt(Bool),
	"topped_up_amount": Opt(Nat)
});
var Result__1 = Variant$1({
	"ok": Null,
	"err": Variant$1({
		"FrontendOriginsNotConfigured": Null,
		"MixedSsoSources": Record({
			"otherKeys": Vec(Text),
			"ssoKeys": Vec(Text)
		}),
		"Stale": Record({ "ageNs": Nat }),
		"MalformedCandid": Null,
		"AmbiguousAttribute": Record({
			"field": Text,
			"sources": Vec(Text)
		}),
		"NoAttributes": Null,
		"UnknownNonce": Null,
		"UntrustedSsoSource": Record({ "domain": Text }),
		"MissingField": Text,
		"FrontendOriginMismatch": Record({
			"got": Text,
			"expected": Vec(Text)
		})
	})
});
var UserRole = Variant$1({
	"admin": Null,
	"user": Null,
	"guest": Null
});
var Id = Nat;
var CatalogueError = Variant$1({
	"ok": Null,
	"duplicateSku": Text,
	"invalidInput": Text,
	"notFound": Null,
	"unauthorized": Null
});
var InviteStatus = Variant$1({
	"revoked": Null,
	"expired": Null,
	"valid": Null,
	"invalid": Null,
	"usedUp": Null
});
var ExternalBlob = Vec(Nat8);
var Brand = Record({
	"id": Id,
	"logo": Opt(ExternalBlob),
	"name": Text,
	"slug": Text,
	"description": Opt(Text)
});
var Subcategory = Record({
	"id": Id,
	"categoryId": Id,
	"order": Nat,
	"name": Text,
	"slug": Text
});
var Category = Record({
	"id": Id,
	"order": Nat,
	"name": Text,
	"slug": Text,
	"description": Opt(Text),
	"subcategories": Vec(Subcategory)
});
var Collection = Record({
	"id": Id,
	"productIds": Vec(Id),
	"order": Nat,
	"name": Text,
	"slug": Text,
	"description": Opt(Text)
});
var Time = Int;
var Specification = Record({
	"value": Text,
	"name": Text
});
var PublishState$1 = Variant$1({
	"published": Null,
	"draft": Null,
	"archived": Null
});
var Timestamp = Int;
var Availability$1 = Variant$1({
	"inStock": Null,
	"outOfStock": Null,
	"madeToOrder": Null
});
var Variant = Record({
	"sku": Opt(Text),
	"value": Text,
	"name": Text,
	"availability": Opt(Availability$1)
});
var ProductImage = Record({
	"id": Id,
	"order": Nat,
	"blob": ExternalBlob,
	"filename": Text,
	"altText": Opt(Text)
});
var Product = Record({
	"id": Id,
	"sku": Text,
	"categoryId": Id,
	"specifications": Vec(Specification),
	"publishState": PublishState$1,
	"name": Text,
	"createdAt": Timestamp,
	"isNewArrival": Bool,
	"showOnHomepage": Bool,
	"variants": Vec(Variant),
	"availability": Availability$1,
	"updatedAt": Timestamp,
	"shortDescription": Text,
	"isFeatured": Bool,
	"isBestseller": Bool,
	"brandId": Opt(Id),
	"subcategoryId": Opt(Id),
	"price": Opt(Nat),
	"isTrending": Bool,
	"longDescription": Text,
	"images": Vec(ProductImage)
});
var Result = Record({
	"hasMore": Bool,
	"rows": Vec(Vec(Record({
		"value": Variant$1({
			"int": Int,
			"nat": Nat,
			"float": Float64,
			"bool": Bool,
			"null": Null,
			"text": Text
		}),
		"name": Text
	})))
});
var ProductSort$1 = Variant$1({
	"nameDesc": Null,
	"newest": Null,
	"nameAsc": Null,
	"priceDesc": Null,
	"priceAsc": Null
});
var ProductFilter = Record({
	"categoryId": Opt(Id),
	"publishState": Opt(PublishState$1),
	"page": Opt(Nat),
	"sort": Opt(ProductSort$1),
	"pageSize": Opt(Nat),
	"search": Opt(Text),
	"brandId": Opt(Id),
	"subcategoryId": Opt(Id)
});
var ProductPage = Record({
	"total": Nat,
	"page": Nat,
	"pageSize": Nat,
	"products": Vec(Product)
});
var ApprovalStatus = Variant$1({
	"pending": Null,
	"approved": Null,
	"rejected": Null
});
var UserApprovalInfo = Record({
	"status": ApprovalStatus,
	"principal": Principal
});
var HomepageSections = Record({
	"featured": Vec(Product),
	"bestsellers": Vec(Product),
	"featuredCollections": Vec(Collection),
	"trending": Vec(Product),
	"newArrivals": Vec(Product)
});
var Redemption = Record({
	"at": Time,
	"user": Principal
});
var InviteInfo = Record({
	"expiresAt": Opt(Time),
	"revoked": Bool,
	"code": Text,
	"name": Text,
	"createdAt": Time,
	"createdBy": Principal,
	"redemptions": Vec(Redemption),
	"maxUses": Opt(Nat)
});
var RedeemResult = Variant$1({
	"revoked": Null,
	"expired": Null,
	"invalid": Null,
	"usedUp": Null,
	"blocked": Null,
	"joined": Null,
	"alreadyMember": Null
});
var Enquiry = Record({
	"contact": Text,
	"name": Text,
	"message": Text
});
var EnquiryResult = Variant$1({
	"ok": Null,
	"err": Text
});
Service({
	"_immutableObjectStorageBlobsAreLive": Func([Vec(Vec(Nat8))], [Vec(Bool)], ["query"]),
	"_immutableObjectStorageBlobsToDelete": Func([], [Vec(Vec(Nat8))], ["query"]),
	"_immutableObjectStorageConfirmBlobDeletion": Func([Vec(Vec(Nat8))], [], []),
	"_immutableObjectStorageCreateCertificate": Func([Text], [_ImmutableObjectStorageCreateCertificateResult], []),
	"_immutableObjectStorageRefillCashier": Func([Opt(_ImmutableObjectStorageRefillInformation)], [_ImmutableObjectStorageRefillResult], []),
	"_immutableObjectStorageUpdateGatewayPrincipals": Func([], [], []),
	"_initialize_access_control": Func([], [], []),
	"_internet_identity_sign_in_finish": Func([], [Result__1], []),
	"_internet_identity_sign_in_start": Func([], [Vec(Nat8)], []),
	"assignCallerUserRole": Func([Principal, UserRole], [], []),
	"assignProductToCollection": Func([Id, Id], [CatalogueError], []),
	"checkInvite": Func([Text], [InviteStatus], ["query"]),
	"createBrand": Func([Brand], [CatalogueError], []),
	"createCategory": Func([Category], [CatalogueError], []),
	"createCollection": Func([Collection], [CatalogueError], []),
	"createInvite": Func([
		Text,
		Opt(Nat),
		Opt(Time)
	], [Text], []),
	"createProduct": Func([Product], [CatalogueError], []),
	"createSubcategory": Func([Subcategory], [CatalogueError], []),
	"deleteBrand": Func([Id], [CatalogueError], []),
	"deleteCategory": Func([Id], [CatalogueError], []),
	"deleteCollection": Func([Id], [CatalogueError], []),
	"deleteProduct": Func([Id], [CatalogueError], []),
	"deleteSubcategory": Func([Id], [CatalogueError], []),
	"duplicateProduct": Func([Id], [CatalogueError], []),
	"execute": Func([Text], [Result], ["query"]),
	"getApiDoc": Func([], [Text], ["query"]),
	"getCallerUserRole": Func([], [UserRole], ["query"]),
	"getPublishedProduct": Func([Id], [Opt(Product)], ["query"]),
	"isCallerAdmin": Func([], [Bool], ["query"]),
	"isCallerApproved": Func([], [Bool], ["query"]),
	"listAllProducts": Func([ProductFilter], [Opt(ProductPage)], ["query"]),
	"listApprovals": Func([], [Vec(UserApprovalInfo)], ["query"]),
	"listBrands": Func([], [Vec(Brand)], ["query"]),
	"listCategories": Func([], [Vec(Category)], ["query"]),
	"listCollections": Func([], [Vec(Collection)], ["query"]),
	"listHomepageSections": Func([], [HomepageSections], ["query"]),
	"listInvites": Func([], [Vec(InviteInfo)], ["query"]),
	"listPublishedProducts": Func([ProductFilter], [ProductPage], ["query"]),
	"redeemInvite": Func([Text], [RedeemResult], []),
	"removeApproval": Func([Principal], [], []),
	"removeProductFromCollection": Func([Id, Id], [CatalogueError], []),
	"reorderProductImages": Func([Id, Vec(Id)], [CatalogueError], []),
	"requestApproval": Func([], [], []),
	"revokeInvite": Func([Text], [], []),
	"schema": Func([], [Text], ["query"]),
	"setApproval": Func([Principal, ApprovalStatus], [], []),
	"setProductFlag": Func([
		Id,
		Text,
		Bool
	], [CatalogueError], []),
	"setPublishState": Func([Id, PublishState$1], [CatalogueError], []),
	"submitEnquiry": Func([Enquiry], [EnquiryResult], []),
	"updateBrand": Func([Brand], [CatalogueError], []),
	"updateCategory": Func([Category], [CatalogueError], []),
	"updateCollection": Func([Collection], [CatalogueError], []),
	"updateProduct": Func([Product], [CatalogueError], []),
	"updateSubcategory": Func([Subcategory], [CatalogueError], [])
});
var idlFactory = ({ IDL }) => {
	const _ImmutableObjectStorageCreateCertificateResult = IDL.Record({
		"method": IDL.Text,
		"blob_hash": IDL.Text
	});
	const _ImmutableObjectStorageRefillInformation = IDL.Record({ "proposed_top_up_amount": IDL.Opt(IDL.Nat) });
	const _ImmutableObjectStorageRefillResult = IDL.Record({
		"success": IDL.Opt(IDL.Bool),
		"topped_up_amount": IDL.Opt(IDL.Nat)
	});
	const Error = IDL.Variant({
		"FrontendOriginsNotConfigured": IDL.Null,
		"MixedSsoSources": IDL.Record({
			"otherKeys": IDL.Vec(IDL.Text),
			"ssoKeys": IDL.Vec(IDL.Text)
		}),
		"Stale": IDL.Record({ "ageNs": IDL.Nat }),
		"MalformedCandid": IDL.Null,
		"AmbiguousAttribute": IDL.Record({
			"field": IDL.Text,
			"sources": IDL.Vec(IDL.Text)
		}),
		"NoAttributes": IDL.Null,
		"UnknownNonce": IDL.Null,
		"UntrustedSsoSource": IDL.Record({ "domain": IDL.Text }),
		"MissingField": IDL.Text,
		"FrontendOriginMismatch": IDL.Record({
			"got": IDL.Text,
			"expected": IDL.Vec(IDL.Text)
		})
	});
	const Result__1 = IDL.Variant({
		"ok": IDL.Null,
		"err": Error
	});
	const UserRole = IDL.Variant({
		"admin": IDL.Null,
		"user": IDL.Null,
		"guest": IDL.Null
	});
	const Id = IDL.Nat;
	const CatalogueError = IDL.Variant({
		"ok": IDL.Null,
		"duplicateSku": IDL.Text,
		"invalidInput": IDL.Text,
		"notFound": IDL.Null,
		"unauthorized": IDL.Null
	});
	const InviteStatus = IDL.Variant({
		"revoked": IDL.Null,
		"expired": IDL.Null,
		"valid": IDL.Null,
		"invalid": IDL.Null,
		"usedUp": IDL.Null
	});
	const ExternalBlob = IDL.Vec(IDL.Nat8);
	const Brand = IDL.Record({
		"id": Id,
		"logo": IDL.Opt(ExternalBlob),
		"name": IDL.Text,
		"slug": IDL.Text,
		"description": IDL.Opt(IDL.Text)
	});
	const Subcategory = IDL.Record({
		"id": Id,
		"categoryId": Id,
		"order": IDL.Nat,
		"name": IDL.Text,
		"slug": IDL.Text
	});
	const Category = IDL.Record({
		"id": Id,
		"order": IDL.Nat,
		"name": IDL.Text,
		"slug": IDL.Text,
		"description": IDL.Opt(IDL.Text),
		"subcategories": IDL.Vec(Subcategory)
	});
	const Collection = IDL.Record({
		"id": Id,
		"productIds": IDL.Vec(Id),
		"order": IDL.Nat,
		"name": IDL.Text,
		"slug": IDL.Text,
		"description": IDL.Opt(IDL.Text)
	});
	const Time = IDL.Int;
	const Specification = IDL.Record({
		"value": IDL.Text,
		"name": IDL.Text
	});
	const PublishState = IDL.Variant({
		"published": IDL.Null,
		"draft": IDL.Null,
		"archived": IDL.Null
	});
	const Timestamp = IDL.Int;
	const Availability = IDL.Variant({
		"inStock": IDL.Null,
		"outOfStock": IDL.Null,
		"madeToOrder": IDL.Null
	});
	const Variant = IDL.Record({
		"sku": IDL.Opt(IDL.Text),
		"value": IDL.Text,
		"name": IDL.Text,
		"availability": IDL.Opt(Availability)
	});
	const ProductImage = IDL.Record({
		"id": Id,
		"order": IDL.Nat,
		"blob": ExternalBlob,
		"filename": IDL.Text,
		"altText": IDL.Opt(IDL.Text)
	});
	const Product = IDL.Record({
		"id": Id,
		"sku": IDL.Text,
		"categoryId": Id,
		"specifications": IDL.Vec(Specification),
		"publishState": PublishState,
		"name": IDL.Text,
		"createdAt": Timestamp,
		"isNewArrival": IDL.Bool,
		"showOnHomepage": IDL.Bool,
		"variants": IDL.Vec(Variant),
		"availability": Availability,
		"updatedAt": Timestamp,
		"shortDescription": IDL.Text,
		"isFeatured": IDL.Bool,
		"isBestseller": IDL.Bool,
		"brandId": IDL.Opt(Id),
		"subcategoryId": IDL.Opt(Id),
		"price": IDL.Opt(IDL.Nat),
		"isTrending": IDL.Bool,
		"longDescription": IDL.Text,
		"images": IDL.Vec(ProductImage)
	});
	const Value = IDL.Variant({
		"int": IDL.Int,
		"nat": IDL.Nat,
		"float": IDL.Float64,
		"bool": IDL.Bool,
		"null": IDL.Null,
		"text": IDL.Text
	});
	const Cell = IDL.Record({
		"value": Value,
		"name": IDL.Text
	});
	const Result = IDL.Record({
		"hasMore": IDL.Bool,
		"rows": IDL.Vec(IDL.Vec(Cell))
	});
	const ProductSort = IDL.Variant({
		"nameDesc": IDL.Null,
		"newest": IDL.Null,
		"nameAsc": IDL.Null,
		"priceDesc": IDL.Null,
		"priceAsc": IDL.Null
	});
	const ProductFilter = IDL.Record({
		"categoryId": IDL.Opt(Id),
		"publishState": IDL.Opt(PublishState),
		"page": IDL.Opt(IDL.Nat),
		"sort": IDL.Opt(ProductSort),
		"pageSize": IDL.Opt(IDL.Nat),
		"search": IDL.Opt(IDL.Text),
		"brandId": IDL.Opt(Id),
		"subcategoryId": IDL.Opt(Id)
	});
	const ProductPage = IDL.Record({
		"total": IDL.Nat,
		"page": IDL.Nat,
		"pageSize": IDL.Nat,
		"products": IDL.Vec(Product)
	});
	const ApprovalStatus = IDL.Variant({
		"pending": IDL.Null,
		"approved": IDL.Null,
		"rejected": IDL.Null
	});
	const UserApprovalInfo = IDL.Record({
		"status": ApprovalStatus,
		"principal": IDL.Principal
	});
	const HomepageSections = IDL.Record({
		"featured": IDL.Vec(Product),
		"bestsellers": IDL.Vec(Product),
		"featuredCollections": IDL.Vec(Collection),
		"trending": IDL.Vec(Product),
		"newArrivals": IDL.Vec(Product)
	});
	const Redemption = IDL.Record({
		"at": Time,
		"user": IDL.Principal
	});
	const InviteInfo = IDL.Record({
		"expiresAt": IDL.Opt(Time),
		"revoked": IDL.Bool,
		"code": IDL.Text,
		"name": IDL.Text,
		"createdAt": Time,
		"createdBy": IDL.Principal,
		"redemptions": IDL.Vec(Redemption),
		"maxUses": IDL.Opt(IDL.Nat)
	});
	const RedeemResult = IDL.Variant({
		"revoked": IDL.Null,
		"expired": IDL.Null,
		"invalid": IDL.Null,
		"usedUp": IDL.Null,
		"blocked": IDL.Null,
		"joined": IDL.Null,
		"alreadyMember": IDL.Null
	});
	const Enquiry = IDL.Record({
		"contact": IDL.Text,
		"name": IDL.Text,
		"message": IDL.Text
	});
	const EnquiryResult = IDL.Variant({
		"ok": IDL.Null,
		"err": IDL.Text
	});
	return IDL.Service({
		"_immutableObjectStorageBlobsAreLive": IDL.Func([IDL.Vec(IDL.Vec(IDL.Nat8))], [IDL.Vec(IDL.Bool)], ["query"]),
		"_immutableObjectStorageBlobsToDelete": IDL.Func([], [IDL.Vec(IDL.Vec(IDL.Nat8))], ["query"]),
		"_immutableObjectStorageConfirmBlobDeletion": IDL.Func([IDL.Vec(IDL.Vec(IDL.Nat8))], [], []),
		"_immutableObjectStorageCreateCertificate": IDL.Func([IDL.Text], [_ImmutableObjectStorageCreateCertificateResult], []),
		"_immutableObjectStorageRefillCashier": IDL.Func([IDL.Opt(_ImmutableObjectStorageRefillInformation)], [_ImmutableObjectStorageRefillResult], []),
		"_immutableObjectStorageUpdateGatewayPrincipals": IDL.Func([], [], []),
		"_initialize_access_control": IDL.Func([], [], []),
		"_internet_identity_sign_in_finish": IDL.Func([], [Result__1], []),
		"_internet_identity_sign_in_start": IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
		"assignCallerUserRole": IDL.Func([IDL.Principal, UserRole], [], []),
		"assignProductToCollection": IDL.Func([Id, Id], [CatalogueError], []),
		"checkInvite": IDL.Func([IDL.Text], [InviteStatus], ["query"]),
		"createBrand": IDL.Func([Brand], [CatalogueError], []),
		"createCategory": IDL.Func([Category], [CatalogueError], []),
		"createCollection": IDL.Func([Collection], [CatalogueError], []),
		"createInvite": IDL.Func([
			IDL.Text,
			IDL.Opt(IDL.Nat),
			IDL.Opt(Time)
		], [IDL.Text], []),
		"createProduct": IDL.Func([Product], [CatalogueError], []),
		"createSubcategory": IDL.Func([Subcategory], [CatalogueError], []),
		"deleteBrand": IDL.Func([Id], [CatalogueError], []),
		"deleteCategory": IDL.Func([Id], [CatalogueError], []),
		"deleteCollection": IDL.Func([Id], [CatalogueError], []),
		"deleteProduct": IDL.Func([Id], [CatalogueError], []),
		"deleteSubcategory": IDL.Func([Id], [CatalogueError], []),
		"duplicateProduct": IDL.Func([Id], [CatalogueError], []),
		"execute": IDL.Func([IDL.Text], [Result], ["query"]),
		"getApiDoc": IDL.Func([], [IDL.Text], ["query"]),
		"getCallerUserRole": IDL.Func([], [UserRole], ["query"]),
		"getPublishedProduct": IDL.Func([Id], [IDL.Opt(Product)], ["query"]),
		"isCallerAdmin": IDL.Func([], [IDL.Bool], ["query"]),
		"isCallerApproved": IDL.Func([], [IDL.Bool], ["query"]),
		"listAllProducts": IDL.Func([ProductFilter], [IDL.Opt(ProductPage)], ["query"]),
		"listApprovals": IDL.Func([], [IDL.Vec(UserApprovalInfo)], ["query"]),
		"listBrands": IDL.Func([], [IDL.Vec(Brand)], ["query"]),
		"listCategories": IDL.Func([], [IDL.Vec(Category)], ["query"]),
		"listCollections": IDL.Func([], [IDL.Vec(Collection)], ["query"]),
		"listHomepageSections": IDL.Func([], [HomepageSections], ["query"]),
		"listInvites": IDL.Func([], [IDL.Vec(InviteInfo)], ["query"]),
		"listPublishedProducts": IDL.Func([ProductFilter], [ProductPage], ["query"]),
		"redeemInvite": IDL.Func([IDL.Text], [RedeemResult], []),
		"removeApproval": IDL.Func([IDL.Principal], [], []),
		"removeProductFromCollection": IDL.Func([Id, Id], [CatalogueError], []),
		"reorderProductImages": IDL.Func([Id, IDL.Vec(Id)], [CatalogueError], []),
		"requestApproval": IDL.Func([], [], []),
		"revokeInvite": IDL.Func([IDL.Text], [], []),
		"schema": IDL.Func([], [IDL.Text], ["query"]),
		"setApproval": IDL.Func([IDL.Principal, ApprovalStatus], [], []),
		"setProductFlag": IDL.Func([
			Id,
			IDL.Text,
			IDL.Bool
		], [CatalogueError], []),
		"setPublishState": IDL.Func([Id, PublishState], [CatalogueError], []),
		"submitEnquiry": IDL.Func([Enquiry], [EnquiryResult], []),
		"updateBrand": IDL.Func([Brand], [CatalogueError], []),
		"updateCategory": IDL.Func([Category], [CatalogueError], []),
		"updateCollection": IDL.Func([Collection], [CatalogueError], []),
		"updateProduct": IDL.Func([Product], [CatalogueError], []),
		"updateSubcategory": IDL.Func([Subcategory], [CatalogueError], [])
	});
};
//#endregion
//#region src/backend.ts
function candid_some(value) {
	return [value];
}
function candid_none() {
	return [];
}
function record_opt_to_undefined(arg) {
	return arg == null ? void 0 : arg;
}
var Availability = /* @__PURE__ */ function(Availability) {
	Availability["inStock"] = "inStock";
	Availability["outOfStock"] = "outOfStock";
	Availability["madeToOrder"] = "madeToOrder";
	return Availability;
}({});
var ProductSort = /* @__PURE__ */ function(ProductSort) {
	ProductSort["nameDesc"] = "nameDesc";
	ProductSort["newest"] = "newest";
	ProductSort["nameAsc"] = "nameAsc";
	ProductSort["priceDesc"] = "priceDesc";
	ProductSort["priceAsc"] = "priceAsc";
	return ProductSort;
}({});
var PublishState = /* @__PURE__ */ function(PublishState) {
	PublishState["published"] = "published";
	PublishState["draft"] = "draft";
	PublishState["archived"] = "archived";
	return PublishState;
}({});
var Backend = class {
	actor;
	_uploadFile;
	_downloadFile;
	processError;
	constructor(actor, _uploadFile, _downloadFile, processError) {
		this.actor = actor;
		this._uploadFile = _uploadFile;
		this._downloadFile = _downloadFile;
		this.processError = processError;
	}
	async _immutableObjectStorageBlobsAreLive(arg0) {
		if (this.processError) try {
			return await this.actor._immutableObjectStorageBlobsAreLive(arg0);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor._immutableObjectStorageBlobsAreLive(arg0);
	}
	async _immutableObjectStorageBlobsToDelete() {
		if (this.processError) try {
			return await this.actor._immutableObjectStorageBlobsToDelete();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor._immutableObjectStorageBlobsToDelete();
	}
	async _immutableObjectStorageConfirmBlobDeletion(arg0) {
		if (this.processError) try {
			return await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
	}
	async _immutableObjectStorageCreateCertificate(arg0) {
		if (this.processError) try {
			return await this.actor._immutableObjectStorageCreateCertificate(arg0);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor._immutableObjectStorageCreateCertificate(arg0);
	}
	async _immutableObjectStorageRefillCashier(arg0) {
		if (this.processError) try {
			const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
			return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
			return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
		}
	}
	async _immutableObjectStorageUpdateGatewayPrincipals() {
		if (this.processError) try {
			return await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
	}
	async _initialize_access_control() {
		if (this.processError) try {
			return await this.actor._initialize_access_control();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor._initialize_access_control();
	}
	async _internet_identity_sign_in_finish() {
		if (this.processError) try {
			const result = await this.actor._internet_identity_sign_in_finish();
			return from_candid_Result__1_n8(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor._internet_identity_sign_in_finish();
			return from_candid_Result__1_n8(this._uploadFile, this._downloadFile, result);
		}
	}
	async _internet_identity_sign_in_start() {
		if (this.processError) try {
			return await this.actor._internet_identity_sign_in_start();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor._internet_identity_sign_in_start();
	}
	async assignCallerUserRole(arg0, arg1) {
		if (this.processError) try {
			return await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n12(this._uploadFile, this._downloadFile, arg1));
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n12(this._uploadFile, this._downloadFile, arg1));
	}
	async assignProductToCollection(arg0, arg1) {
		if (this.processError) try {
			const result = await this.actor.assignProductToCollection(arg0, arg1);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.assignProductToCollection(arg0, arg1);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async checkInvite(arg0) {
		if (this.processError) try {
			const result = await this.actor.checkInvite(arg0);
			return from_candid_InviteStatus_n15(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.checkInvite(arg0);
			return from_candid_InviteStatus_n15(this._uploadFile, this._downloadFile, result);
		}
	}
	async createBrand(arg0) {
		if (this.processError) try {
			const result = await this.actor.createBrand(await to_candid_Brand_n16(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.createBrand(await to_candid_Brand_n16(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async createCategory(arg0) {
		if (this.processError) try {
			const result = await this.actor.createCategory(to_candid_Category_n19(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.createCategory(to_candid_Category_n19(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async createCollection(arg0) {
		if (this.processError) try {
			const result = await this.actor.createCollection(to_candid_Collection_n21(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.createCollection(to_candid_Collection_n21(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async createInvite(arg0, arg1, arg2) {
		if (this.processError) try {
			return await this.actor.createInvite(arg0, to_candid_opt_n23(this._uploadFile, this._downloadFile, arg1), to_candid_opt_n24(this._uploadFile, this._downloadFile, arg2));
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.createInvite(arg0, to_candid_opt_n23(this._uploadFile, this._downloadFile, arg1), to_candid_opt_n24(this._uploadFile, this._downloadFile, arg2));
	}
	async createProduct(arg0) {
		if (this.processError) try {
			const result = await this.actor.createProduct(await to_candid_Product_n25(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.createProduct(await to_candid_Product_n25(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async createSubcategory(arg0) {
		if (this.processError) try {
			const result = await this.actor.createSubcategory(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.createSubcategory(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async deleteBrand(arg0) {
		if (this.processError) try {
			const result = await this.actor.deleteBrand(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.deleteBrand(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async deleteCategory(arg0) {
		if (this.processError) try {
			const result = await this.actor.deleteCategory(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.deleteCategory(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async deleteCollection(arg0) {
		if (this.processError) try {
			const result = await this.actor.deleteCollection(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.deleteCollection(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async deleteProduct(arg0) {
		if (this.processError) try {
			const result = await this.actor.deleteProduct(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.deleteProduct(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async deleteSubcategory(arg0) {
		if (this.processError) try {
			const result = await this.actor.deleteSubcategory(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.deleteSubcategory(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async duplicateProduct(arg0) {
		if (this.processError) try {
			const result = await this.actor.duplicateProduct(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.duplicateProduct(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async execute(arg0) {
		if (this.processError) try {
			const result = await this.actor.execute(arg0);
			return from_candid_Result_n35(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.execute(arg0);
			return from_candid_Result_n35(this._uploadFile, this._downloadFile, result);
		}
	}
	async getApiDoc() {
		if (this.processError) try {
			return await this.actor.getApiDoc();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.getApiDoc();
	}
	async getCallerUserRole() {
		if (this.processError) try {
			const result = await this.actor.getCallerUserRole();
			return from_candid_UserRole_n43(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.getCallerUserRole();
			return from_candid_UserRole_n43(this._uploadFile, this._downloadFile, result);
		}
	}
	async getPublishedProduct(arg0) {
		if (this.processError) try {
			const result = await this.actor.getPublishedProduct(arg0);
			return from_candid_opt_n44(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.getPublishedProduct(arg0);
			return from_candid_opt_n44(this._uploadFile, this._downloadFile, result);
		}
	}
	async isCallerAdmin() {
		if (this.processError) try {
			return await this.actor.isCallerAdmin();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.isCallerAdmin();
	}
	async isCallerApproved() {
		if (this.processError) try {
			return await this.actor.isCallerApproved();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.isCallerApproved();
	}
	async listAllProducts(arg0) {
		if (this.processError) try {
			const result = await this.actor.listAllProducts(to_candid_ProductFilter_n59(this._uploadFile, this._downloadFile, arg0));
			return from_candid_opt_n62(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listAllProducts(to_candid_ProductFilter_n59(this._uploadFile, this._downloadFile, arg0));
			return from_candid_opt_n62(this._uploadFile, this._downloadFile, result);
		}
	}
	async listApprovals() {
		if (this.processError) try {
			const result = await this.actor.listApprovals();
			return from_candid_vec_n66(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listApprovals();
			return from_candid_vec_n66(this._uploadFile, this._downloadFile, result);
		}
	}
	async listBrands() {
		if (this.processError) try {
			const result = await this.actor.listBrands();
			return from_candid_vec_n70(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listBrands();
			return from_candid_vec_n70(this._uploadFile, this._downloadFile, result);
		}
	}
	async listCategories() {
		if (this.processError) try {
			const result = await this.actor.listCategories();
			return from_candid_vec_n74(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listCategories();
			return from_candid_vec_n74(this._uploadFile, this._downloadFile, result);
		}
	}
	async listCollections() {
		if (this.processError) try {
			const result = await this.actor.listCollections();
			return from_candid_vec_n77(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listCollections();
			return from_candid_vec_n77(this._uploadFile, this._downloadFile, result);
		}
	}
	async listHomepageSections() {
		if (this.processError) try {
			const result = await this.actor.listHomepageSections();
			return from_candid_HomepageSections_n80(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listHomepageSections();
			return from_candid_HomepageSections_n80(this._uploadFile, this._downloadFile, result);
		}
	}
	async listInvites() {
		if (this.processError) try {
			const result = await this.actor.listInvites();
			return from_candid_vec_n82(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listInvites();
			return from_candid_vec_n82(this._uploadFile, this._downloadFile, result);
		}
	}
	async listPublishedProducts(arg0) {
		if (this.processError) try {
			const result = await this.actor.listPublishedProducts(to_candid_ProductFilter_n59(this._uploadFile, this._downloadFile, arg0));
			return from_candid_ProductPage_n63(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listPublishedProducts(to_candid_ProductFilter_n59(this._uploadFile, this._downloadFile, arg0));
			return from_candid_ProductPage_n63(this._uploadFile, this._downloadFile, result);
		}
	}
	async redeemInvite(arg0) {
		if (this.processError) try {
			const result = await this.actor.redeemInvite(arg0);
			return from_candid_RedeemResult_n86(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.redeemInvite(arg0);
			return from_candid_RedeemResult_n86(this._uploadFile, this._downloadFile, result);
		}
	}
	async removeApproval(arg0) {
		if (this.processError) try {
			return await this.actor.removeApproval(arg0);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.removeApproval(arg0);
	}
	async removeProductFromCollection(arg0, arg1) {
		if (this.processError) try {
			const result = await this.actor.removeProductFromCollection(arg0, arg1);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.removeProductFromCollection(arg0, arg1);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async reorderProductImages(arg0, arg1) {
		if (this.processError) try {
			const result = await this.actor.reorderProductImages(arg0, arg1);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.reorderProductImages(arg0, arg1);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async requestApproval() {
		if (this.processError) try {
			return await this.actor.requestApproval();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.requestApproval();
	}
	async revokeInvite(arg0) {
		if (this.processError) try {
			return await this.actor.revokeInvite(arg0);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.revokeInvite(arg0);
	}
	async schema() {
		if (this.processError) try {
			return await this.actor.schema();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.schema();
	}
	async setApproval(arg0, arg1) {
		if (this.processError) try {
			return await this.actor.setApproval(arg0, to_candid_ApprovalStatus_n87(this._uploadFile, this._downloadFile, arg1));
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.setApproval(arg0, to_candid_ApprovalStatus_n87(this._uploadFile, this._downloadFile, arg1));
	}
	async setProductFlag(arg0, arg1, arg2) {
		if (this.processError) try {
			const result = await this.actor.setProductFlag(arg0, arg1, arg2);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.setProductFlag(arg0, arg1, arg2);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async setPublishState(arg0, arg1) {
		if (this.processError) try {
			const result = await this.actor.setPublishState(arg0, to_candid_PublishState_n27(this._uploadFile, this._downloadFile, arg1));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.setPublishState(arg0, to_candid_PublishState_n27(this._uploadFile, this._downloadFile, arg1));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async submitEnquiry(arg0) {
		if (this.processError) try {
			const result = await this.actor.submitEnquiry(arg0);
			return from_candid_EnquiryResult_n88(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.submitEnquiry(arg0);
			return from_candid_EnquiryResult_n88(this._uploadFile, this._downloadFile, result);
		}
	}
	async updateBrand(arg0) {
		if (this.processError) try {
			const result = await this.actor.updateBrand(await to_candid_Brand_n16(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.updateBrand(await to_candid_Brand_n16(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async updateCategory(arg0) {
		if (this.processError) try {
			const result = await this.actor.updateCategory(to_candid_Category_n19(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.updateCategory(to_candid_Category_n19(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async updateCollection(arg0) {
		if (this.processError) try {
			const result = await this.actor.updateCollection(to_candid_Collection_n21(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.updateCollection(to_candid_Collection_n21(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async updateProduct(arg0) {
		if (this.processError) try {
			const result = await this.actor.updateProduct(await to_candid_Product_n25(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.updateProduct(await to_candid_Product_n25(this._uploadFile, this._downloadFile, arg0));
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
	async updateSubcategory(arg0) {
		if (this.processError) try {
			const result = await this.actor.updateSubcategory(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.updateSubcategory(arg0);
			return from_candid_CatalogueError_n13(this._uploadFile, this._downloadFile, result);
		}
	}
};
function from_candid_ApprovalStatus_n69(_uploadFile, _downloadFile, value) {
	return "pending" in value ? "pending" : "approved" in value ? "approved" : "rejected" in value ? "rejected" : value;
}
function from_candid_Availability_n53(_uploadFile, _downloadFile, value) {
	return "inStock" in value ? "inStock" : "outOfStock" in value ? "outOfStock" : "madeToOrder" in value ? "madeToOrder" : value;
}
async function from_candid_Brand_n71(_uploadFile, _downloadFile, value) {
	return await from_candid_record_n72(_uploadFile, _downloadFile, value);
}
function from_candid_CatalogueError_n13(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n14(_uploadFile, _downloadFile, value);
}
function from_candid_Category_n75(_uploadFile, _downloadFile, value) {
	return from_candid_record_n76(_uploadFile, _downloadFile, value);
}
function from_candid_Cell_n39(_uploadFile, _downloadFile, value) {
	return from_candid_record_n40(_uploadFile, _downloadFile, value);
}
function from_candid_Collection_n78(_uploadFile, _downloadFile, value) {
	return from_candid_record_n79(_uploadFile, _downloadFile, value);
}
function from_candid_EnquiryResult_n88(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n89(_uploadFile, _downloadFile, value);
}
function from_candid_Error_n10(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n11(_uploadFile, _downloadFile, value);
}
async function from_candid_ExternalBlob_n58(_uploadFile, _downloadFile, value) {
	return await _downloadFile(value);
}
async function from_candid_HomepageSections_n80(_uploadFile, _downloadFile, value) {
	return await from_candid_record_n81(_uploadFile, _downloadFile, value);
}
function from_candid_InviteInfo_n83(_uploadFile, _downloadFile, value) {
	return from_candid_record_n84(_uploadFile, _downloadFile, value);
}
function from_candid_InviteStatus_n15(_uploadFile, _downloadFile, value) {
	return "revoked" in value ? "revoked" : "expired" in value ? "expired" : "valid" in value ? "valid" : "invalid" in value ? "invalid" : "usedUp" in value ? "usedUp" : value;
}
async function from_candid_ProductImage_n56(_uploadFile, _downloadFile, value) {
	return await from_candid_record_n57(_uploadFile, _downloadFile, value);
}
async function from_candid_ProductPage_n63(_uploadFile, _downloadFile, value) {
	return await from_candid_record_n64(_uploadFile, _downloadFile, value);
}
async function from_candid_Product_n45(_uploadFile, _downloadFile, value) {
	return await from_candid_record_n46(_uploadFile, _downloadFile, value);
}
function from_candid_PublishState_n47(_uploadFile, _downloadFile, value) {
	return "published" in value ? "published" : "draft" in value ? "draft" : "archived" in value ? "archived" : value;
}
function from_candid_RedeemResult_n86(_uploadFile, _downloadFile, value) {
	return "revoked" in value ? "revoked" : "expired" in value ? "expired" : "invalid" in value ? "invalid" : "usedUp" in value ? "usedUp" : "blocked" in value ? "blocked" : "joined" in value ? "joined" : "alreadyMember" in value ? "alreadyMember" : value;
}
function from_candid_Result__1_n8(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n9(_uploadFile, _downloadFile, value);
}
function from_candid_Result_n35(_uploadFile, _downloadFile, value) {
	return from_candid_record_n36(_uploadFile, _downloadFile, value);
}
function from_candid_UserApprovalInfo_n67(_uploadFile, _downloadFile, value) {
	return from_candid_record_n68(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n43(_uploadFile, _downloadFile, value) {
	return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
function from_candid_Value_n41(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n42(_uploadFile, _downloadFile, value);
}
function from_candid_Variant_n49(_uploadFile, _downloadFile, value) {
	return from_candid_record_n50(_uploadFile, _downloadFile, value);
}
function from_candid__ImmutableObjectStorageRefillResult_n4(_uploadFile, _downloadFile, value) {
	return from_candid_record_n5(_uploadFile, _downloadFile, value);
}
async function from_candid_opt_n44(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : await from_candid_Product_n45(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n51(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : value[0];
}
function from_candid_opt_n52(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : from_candid_Availability_n53(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n54(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : value[0];
}
function from_candid_opt_n6(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : value[0];
}
async function from_candid_opt_n62(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : await from_candid_ProductPage_n63(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : value[0];
}
async function from_candid_opt_n73(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : await from_candid_ExternalBlob_n58(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n85(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : value[0];
}
function from_candid_record_n36(_uploadFile, _downloadFile, value) {
	return {
		hasMore: value.hasMore,
		rows: from_candid_vec_n37(_uploadFile, _downloadFile, value.rows)
	};
}
function from_candid_record_n40(_uploadFile, _downloadFile, value) {
	return {
		value: from_candid_Value_n41(_uploadFile, _downloadFile, value.value),
		name: value.name
	};
}
async function from_candid_record_n46(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		sku: value.sku,
		categoryId: value.categoryId,
		specifications: value.specifications,
		publishState: from_candid_PublishState_n47(_uploadFile, _downloadFile, value.publishState),
		name: value.name,
		createdAt: value.createdAt,
		isNewArrival: value.isNewArrival,
		showOnHomepage: value.showOnHomepage,
		variants: from_candid_vec_n48(_uploadFile, _downloadFile, value.variants),
		availability: from_candid_Availability_n53(_uploadFile, _downloadFile, value.availability),
		updatedAt: value.updatedAt,
		shortDescription: value.shortDescription,
		isFeatured: value.isFeatured,
		isBestseller: value.isBestseller,
		brandId: record_opt_to_undefined(from_candid_opt_n54(_uploadFile, _downloadFile, value.brandId)),
		subcategoryId: record_opt_to_undefined(from_candid_opt_n54(_uploadFile, _downloadFile, value.subcategoryId)),
		price: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.price)),
		isTrending: value.isTrending,
		longDescription: value.longDescription,
		images: await from_candid_vec_n55(_uploadFile, _downloadFile, value.images)
	};
}
function from_candid_record_n5(_uploadFile, _downloadFile, value) {
	return {
		success: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.success)),
		topped_up_amount: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.topped_up_amount))
	};
}
function from_candid_record_n50(_uploadFile, _downloadFile, value) {
	return {
		sku: record_opt_to_undefined(from_candid_opt_n51(_uploadFile, _downloadFile, value.sku)),
		value: value.value,
		name: value.name,
		availability: record_opt_to_undefined(from_candid_opt_n52(_uploadFile, _downloadFile, value.availability))
	};
}
async function from_candid_record_n57(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		order: value.order,
		blob: await from_candid_ExternalBlob_n58(_uploadFile, _downloadFile, value.blob),
		filename: value.filename,
		altText: record_opt_to_undefined(from_candid_opt_n51(_uploadFile, _downloadFile, value.altText))
	};
}
async function from_candid_record_n64(_uploadFile, _downloadFile, value) {
	return {
		total: value.total,
		page: value.page,
		pageSize: value.pageSize,
		products: await from_candid_vec_n65(_uploadFile, _downloadFile, value.products)
	};
}
function from_candid_record_n68(_uploadFile, _downloadFile, value) {
	return {
		status: from_candid_ApprovalStatus_n69(_uploadFile, _downloadFile, value.status),
		principal: value.principal
	};
}
async function from_candid_record_n72(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		logo: record_opt_to_undefined(await from_candid_opt_n73(_uploadFile, _downloadFile, value.logo)),
		name: value.name,
		slug: value.slug,
		description: record_opt_to_undefined(from_candid_opt_n51(_uploadFile, _downloadFile, value.description))
	};
}
function from_candid_record_n76(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		order: value.order,
		name: value.name,
		slug: value.slug,
		description: record_opt_to_undefined(from_candid_opt_n51(_uploadFile, _downloadFile, value.description)),
		subcategories: value.subcategories
	};
}
function from_candid_record_n79(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		productIds: value.productIds,
		order: value.order,
		name: value.name,
		slug: value.slug,
		description: record_opt_to_undefined(from_candid_opt_n51(_uploadFile, _downloadFile, value.description))
	};
}
async function from_candid_record_n81(_uploadFile, _downloadFile, value) {
	return {
		featured: await from_candid_vec_n65(_uploadFile, _downloadFile, value.featured),
		bestsellers: await from_candid_vec_n65(_uploadFile, _downloadFile, value.bestsellers),
		featuredCollections: from_candid_vec_n77(_uploadFile, _downloadFile, value.featuredCollections),
		trending: await from_candid_vec_n65(_uploadFile, _downloadFile, value.trending),
		newArrivals: await from_candid_vec_n65(_uploadFile, _downloadFile, value.newArrivals)
	};
}
function from_candid_record_n84(_uploadFile, _downloadFile, value) {
	return {
		expiresAt: record_opt_to_undefined(from_candid_opt_n85(_uploadFile, _downloadFile, value.expiresAt)),
		revoked: value.revoked,
		code: value.code,
		name: value.name,
		createdAt: value.createdAt,
		createdBy: value.createdBy,
		redemptions: value.redemptions,
		maxUses: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.maxUses))
	};
}
function from_candid_variant_n11(_uploadFile, _downloadFile, value) {
	return "FrontendOriginsNotConfigured" in value ? {
		__kind__: "FrontendOriginsNotConfigured",
		FrontendOriginsNotConfigured: value.FrontendOriginsNotConfigured
	} : "MixedSsoSources" in value ? {
		__kind__: "MixedSsoSources",
		MixedSsoSources: value.MixedSsoSources
	} : "Stale" in value ? {
		__kind__: "Stale",
		Stale: value.Stale
	} : "MalformedCandid" in value ? {
		__kind__: "MalformedCandid",
		MalformedCandid: value.MalformedCandid
	} : "AmbiguousAttribute" in value ? {
		__kind__: "AmbiguousAttribute",
		AmbiguousAttribute: value.AmbiguousAttribute
	} : "NoAttributes" in value ? {
		__kind__: "NoAttributes",
		NoAttributes: value.NoAttributes
	} : "UnknownNonce" in value ? {
		__kind__: "UnknownNonce",
		UnknownNonce: value.UnknownNonce
	} : "UntrustedSsoSource" in value ? {
		__kind__: "UntrustedSsoSource",
		UntrustedSsoSource: value.UntrustedSsoSource
	} : "MissingField" in value ? {
		__kind__: "MissingField",
		MissingField: value.MissingField
	} : "FrontendOriginMismatch" in value ? {
		__kind__: "FrontendOriginMismatch",
		FrontendOriginMismatch: value.FrontendOriginMismatch
	} : value;
}
function from_candid_variant_n14(_uploadFile, _downloadFile, value) {
	return "ok" in value ? {
		__kind__: "ok",
		ok: value.ok
	} : "duplicateSku" in value ? {
		__kind__: "duplicateSku",
		duplicateSku: value.duplicateSku
	} : "invalidInput" in value ? {
		__kind__: "invalidInput",
		invalidInput: value.invalidInput
	} : "notFound" in value ? {
		__kind__: "notFound",
		notFound: value.notFound
	} : "unauthorized" in value ? {
		__kind__: "unauthorized",
		unauthorized: value.unauthorized
	} : value;
}
function from_candid_variant_n42(_uploadFile, _downloadFile, value) {
	return "int" in value ? {
		__kind__: "int",
		int: value.int
	} : "nat" in value ? {
		__kind__: "nat",
		nat: value.nat
	} : "float" in value ? {
		__kind__: "float",
		float: value.float
	} : "bool" in value ? {
		__kind__: "bool",
		bool: value.bool
	} : "null" in value ? {
		__kind__: "null",
		null: value.null
	} : "text" in value ? {
		__kind__: "text",
		text: value.text
	} : value;
}
function from_candid_variant_n89(_uploadFile, _downloadFile, value) {
	return "ok" in value ? {
		__kind__: "ok",
		ok: value.ok
	} : "err" in value ? {
		__kind__: "err",
		err: value.err
	} : value;
}
function from_candid_variant_n9(_uploadFile, _downloadFile, value) {
	return "ok" in value ? {
		__kind__: "ok",
		ok: value.ok
	} : "err" in value ? {
		__kind__: "err",
		err: from_candid_Error_n10(_uploadFile, _downloadFile, value.err)
	} : value;
}
function from_candid_vec_n37(_uploadFile, _downloadFile, value) {
	return value.map((x) => from_candid_vec_n38(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n38(_uploadFile, _downloadFile, value) {
	return value.map((x) => from_candid_Cell_n39(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n48(_uploadFile, _downloadFile, value) {
	return value.map((x) => from_candid_Variant_n49(_uploadFile, _downloadFile, x));
}
async function from_candid_vec_n55(_uploadFile, _downloadFile, value) {
	return await Promise.all(value.map(async (x) => await from_candid_ProductImage_n56(_uploadFile, _downloadFile, x)));
}
async function from_candid_vec_n65(_uploadFile, _downloadFile, value) {
	return await Promise.all(value.map(async (x) => await from_candid_Product_n45(_uploadFile, _downloadFile, x)));
}
function from_candid_vec_n66(_uploadFile, _downloadFile, value) {
	return value.map((x) => from_candid_UserApprovalInfo_n67(_uploadFile, _downloadFile, x));
}
async function from_candid_vec_n70(_uploadFile, _downloadFile, value) {
	return await Promise.all(value.map(async (x) => await from_candid_Brand_n71(_uploadFile, _downloadFile, x)));
}
function from_candid_vec_n74(_uploadFile, _downloadFile, value) {
	return value.map((x) => from_candid_Category_n75(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n77(_uploadFile, _downloadFile, value) {
	return value.map((x) => from_candid_Collection_n78(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n82(_uploadFile, _downloadFile, value) {
	return value.map((x) => from_candid_InviteInfo_n83(_uploadFile, _downloadFile, x));
}
function to_candid_ApprovalStatus_n87(_uploadFile, _downloadFile, value) {
	return value == "pending" ? { pending: null } : value == "approved" ? { approved: null } : value == "rejected" ? { rejected: null } : value;
}
function to_candid_Availability_n31(_uploadFile, _downloadFile, value) {
	return value == "inStock" ? { inStock: null } : value == "outOfStock" ? { outOfStock: null } : value == "madeToOrder" ? { madeToOrder: null } : value;
}
async function to_candid_Brand_n16(_uploadFile, _downloadFile, value) {
	return await to_candid_record_n17(_uploadFile, _downloadFile, value);
}
function to_candid_Category_n19(_uploadFile, _downloadFile, value) {
	return to_candid_record_n20(_uploadFile, _downloadFile, value);
}
function to_candid_Collection_n21(_uploadFile, _downloadFile, value) {
	return to_candid_record_n22(_uploadFile, _downloadFile, value);
}
async function to_candid_ExternalBlob_n18(_uploadFile, _downloadFile, value) {
	return await _uploadFile(value);
}
function to_candid_ProductFilter_n59(_uploadFile, _downloadFile, value) {
	return to_candid_record_n60(_uploadFile, _downloadFile, value);
}
async function to_candid_ProductImage_n33(_uploadFile, _downloadFile, value) {
	return await to_candid_record_n34(_uploadFile, _downloadFile, value);
}
function to_candid_ProductSort_n61(_uploadFile, _downloadFile, value) {
	return value == "nameDesc" ? { nameDesc: null } : value == "newest" ? { newest: null } : value == "nameAsc" ? { nameAsc: null } : value == "priceDesc" ? { priceDesc: null } : value == "priceAsc" ? { priceAsc: null } : value;
}
async function to_candid_Product_n25(_uploadFile, _downloadFile, value) {
	return await to_candid_record_n26(_uploadFile, _downloadFile, value);
}
function to_candid_PublishState_n27(_uploadFile, _downloadFile, value) {
	return value == "published" ? { published: null } : value == "draft" ? { draft: null } : value == "archived" ? { archived: null } : value;
}
function to_candid_UserRole_n12(_uploadFile, _downloadFile, value) {
	return value == "admin" ? { admin: null } : value == "user" ? { user: null } : value == "guest" ? { guest: null } : value;
}
function to_candid_Variant_n29(_uploadFile, _downloadFile, value) {
	return to_candid_record_n30(_uploadFile, _downloadFile, value);
}
function to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value) {
	return to_candid_record_n3(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n1(_uploadFile, _downloadFile, value) {
	return value === null ? candid_none() : candid_some(to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value));
}
function to_candid_opt_n23(_uploadFile, _downloadFile, value) {
	return value === null ? candid_none() : candid_some(value);
}
function to_candid_opt_n24(_uploadFile, _downloadFile, value) {
	return value === null ? candid_none() : candid_some(value);
}
async function to_candid_record_n17(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		logo: value.logo ? candid_some(await to_candid_ExternalBlob_n18(_uploadFile, _downloadFile, value.logo)) : candid_none(),
		name: value.name,
		slug: value.slug,
		description: value.description ? candid_some(value.description) : candid_none()
	};
}
function to_candid_record_n20(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		order: value.order,
		name: value.name,
		slug: value.slug,
		description: value.description ? candid_some(value.description) : candid_none(),
		subcategories: value.subcategories
	};
}
function to_candid_record_n22(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		productIds: value.productIds,
		order: value.order,
		name: value.name,
		slug: value.slug,
		description: value.description ? candid_some(value.description) : candid_none()
	};
}
async function to_candid_record_n26(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		sku: value.sku,
		categoryId: value.categoryId,
		specifications: value.specifications,
		publishState: to_candid_PublishState_n27(_uploadFile, _downloadFile, value.publishState),
		name: value.name,
		createdAt: value.createdAt,
		isNewArrival: value.isNewArrival,
		showOnHomepage: value.showOnHomepage,
		variants: to_candid_vec_n28(_uploadFile, _downloadFile, value.variants),
		availability: to_candid_Availability_n31(_uploadFile, _downloadFile, value.availability),
		updatedAt: value.updatedAt,
		shortDescription: value.shortDescription,
		isFeatured: value.isFeatured,
		isBestseller: value.isBestseller,
		brandId: value.brandId ? candid_some(value.brandId) : candid_none(),
		subcategoryId: value.subcategoryId ? candid_some(value.subcategoryId) : candid_none(),
		price: value.price ? candid_some(value.price) : candid_none(),
		isTrending: value.isTrending,
		longDescription: value.longDescription,
		images: await to_candid_vec_n32(_uploadFile, _downloadFile, value.images)
	};
}
function to_candid_record_n3(_uploadFile, _downloadFile, value) {
	return { proposed_top_up_amount: value.proposed_top_up_amount ? candid_some(value.proposed_top_up_amount) : candid_none() };
}
function to_candid_record_n30(_uploadFile, _downloadFile, value) {
	return {
		sku: value.sku ? candid_some(value.sku) : candid_none(),
		value: value.value,
		name: value.name,
		availability: value.availability ? candid_some(to_candid_Availability_n31(_uploadFile, _downloadFile, value.availability)) : candid_none()
	};
}
async function to_candid_record_n34(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		order: value.order,
		blob: await to_candid_ExternalBlob_n18(_uploadFile, _downloadFile, value.blob),
		filename: value.filename,
		altText: value.altText ? candid_some(value.altText) : candid_none()
	};
}
function to_candid_record_n60(_uploadFile, _downloadFile, value) {
	return {
		categoryId: value.categoryId ? candid_some(value.categoryId) : candid_none(),
		publishState: value.publishState ? candid_some(to_candid_PublishState_n27(_uploadFile, _downloadFile, value.publishState)) : candid_none(),
		page: value.page ? candid_some(value.page) : candid_none(),
		sort: value.sort ? candid_some(to_candid_ProductSort_n61(_uploadFile, _downloadFile, value.sort)) : candid_none(),
		pageSize: value.pageSize ? candid_some(value.pageSize) : candid_none(),
		search: value.search ? candid_some(value.search) : candid_none(),
		brandId: value.brandId ? candid_some(value.brandId) : candid_none(),
		subcategoryId: value.subcategoryId ? candid_some(value.subcategoryId) : candid_none()
	};
}
function to_candid_vec_n28(_uploadFile, _downloadFile, value) {
	return value.map((x) => to_candid_Variant_n29(_uploadFile, _downloadFile, x));
}
async function to_candid_vec_n32(_uploadFile, _downloadFile, value) {
	return await Promise.all(value.map(async (x) => await to_candid_ProductImage_n33(_uploadFile, _downloadFile, x)));
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
	const agent = options.agent || HttpAgent.createSync({ ...options.agentOptions });
	if (options.agent && options.agentOptions) console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
	return new Backend(Actor.createActor(idlFactory, {
		agent,
		canisterId,
		...options.actorOptions
	}), _uploadFile, _downloadFile, options.processError);
}
//#endregion
//#region src/hooks/useCatalogue.ts
var catalogueKeys = {
	products: (filter) => ["products", filter],
	allProducts: (filter) => ["allProducts", filter],
	product: (id) => ["product", id.toString()],
	categories: ["categories"],
	brands: ["brands"],
	collections: ["collections"],
	homepage: ["homepage"]
};
function usePublishedProducts(filter) {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: catalogueKeys.products(filter),
		queryFn: async () => {
			if (!actor) return {
				products: [],
				total: 0n,
				page: 0n,
				pageSize: 0n
			};
			return actor.listPublishedProducts(filter);
		},
		enabled: !!actor && !isFetching
	});
}
function usePublishedProduct(id) {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: catalogueKeys.product(id ?? 0n),
		queryFn: async () => {
			if (!actor || id === void 0) return null;
			return actor.getPublishedProduct(id);
		},
		enabled: !!actor && !isFetching && id !== void 0
	});
}
/**
* Owner-only read of every product regardless of publish state. Accepts a
* search term, an optional publish-state filter and paging through the shared
* `ProductFilter`. Returns `null` when the caller is not the owner.
*/
function useAllProducts(filter) {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: catalogueKeys.allProducts(filter),
		queryFn: async () => {
			if (!actor) return null;
			return actor.listAllProducts(filter);
		},
		enabled: !!actor && !isFetching
	});
}
function useCategories() {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: catalogueKeys.categories,
		queryFn: async () => {
			if (!actor) return [];
			return actor.listCategories();
		},
		enabled: !!actor && !isFetching
	});
}
function useBrands() {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: catalogueKeys.brands,
		queryFn: async () => {
			if (!actor) return [];
			return actor.listBrands();
		},
		enabled: !!actor && !isFetching
	});
}
function useCollections() {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: catalogueKeys.collections,
		queryFn: async () => {
			if (!actor) return [];
			return actor.listCollections();
		},
		enabled: !!actor && !isFetching
	});
}
function useHomepageSections() {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: catalogueKeys.homepage,
		queryFn: async () => {
			if (!actor) return {
				trending: [],
				newArrivals: [],
				bestsellers: [],
				featured: [],
				featuredCollections: []
			};
			return actor.listHomepageSections();
		},
		enabled: !!actor && !isFetching
	});
}
function useCreateProduct() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (product) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.createProduct(product);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["allProducts"] });
			queryClient.invalidateQueries({ queryKey: ["homepage"] });
		}
	});
}
function useUpdateProduct() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (product) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.updateProduct(product);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["allProducts"] });
			queryClient.invalidateQueries({ queryKey: ["product"] });
			queryClient.invalidateQueries({ queryKey: ["homepage"] });
		}
	});
}
function useDuplicateProduct() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.duplicateProduct(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["allProducts"] });
		}
	});
}
function useDeleteProduct() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.deleteProduct(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["allProducts"] });
			queryClient.invalidateQueries({ queryKey: ["homepage"] });
		}
	});
}
function useSetPublishState() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, state }) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.setPublishState(id, state);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["allProducts"] });
			queryClient.invalidateQueries({ queryKey: ["homepage"] });
		}
	});
}
function useSetProductFlag() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, flag, value }) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.setProductFlag(id, flag, value);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["homepage"] });
		}
	});
}
function useReorderProductImages() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ productId, imageIds }) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.reorderProductImages(productId, imageIds);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["product"] });
		}
	});
}
function useCreateCategory() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (category) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.createCategory(category);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.categories });
		}
	});
}
function useUpdateCategory() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (category) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.updateCategory(category);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.categories });
		}
	});
}
function useDeleteCategory() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.deleteCategory(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.categories });
		}
	});
}
function useCreateSubcategory() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (subcategory) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.createSubcategory(subcategory);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.categories });
		}
	});
}
function useUpdateSubcategory() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (subcategory) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.updateSubcategory(subcategory);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.categories });
		}
	});
}
function useDeleteSubcategory() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.deleteSubcategory(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.categories });
		}
	});
}
function useCreateBrand() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (brand) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.createBrand(brand);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.brands });
		}
	});
}
function useUpdateBrand() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (brand) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.updateBrand(brand);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.brands });
		}
	});
}
function useDeleteBrand() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.deleteBrand(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.brands });
		}
	});
}
function useCreateCollection() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (collection) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.createCollection(collection);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.collections });
			queryClient.invalidateQueries({ queryKey: catalogueKeys.homepage });
		}
	});
}
function useUpdateCollection() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (collection) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.updateCollection(collection);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.collections });
			queryClient.invalidateQueries({ queryKey: catalogueKeys.homepage });
		}
	});
}
function useDeleteCollection() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.deleteCollection(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.collections });
			queryClient.invalidateQueries({ queryKey: catalogueKeys.homepage });
		}
	});
}
function useAssignProductToCollection() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ collectionId, productId }) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.assignProductToCollection(collectionId, productId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.collections });
			queryClient.invalidateQueries({ queryKey: catalogueKeys.homepage });
		}
	});
}
function useRemoveProductFromCollection() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ collectionId, productId }) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.removeProductFromCollection(collectionId, productId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: catalogueKeys.collections });
			queryClient.invalidateQueries({ queryKey: catalogueKeys.homepage });
		}
	});
}
function useSubmitEnquiry() {
	const { actor } = useActor(createActor);
	return useMutation({ mutationFn: async (enquiry) => {
		if (!actor) throw new Error("Backend is not ready");
		return actor.submitEnquiry(enquiry);
	} });
}
function useIsCallerAdmin() {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: ["isCallerAdmin"],
		queryFn: async () => {
			if (!actor) return false;
			return actor.isCallerAdmin();
		},
		enabled: !!actor && !isFetching
	});
}
//#endregion
//#region src/lib/seo.ts
var SITE_NAME = "Mathrushree Enterprises";
function setMetaTag(attr, key, content) {
	let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
	if (!tag) {
		tag = document.createElement("meta");
		tag.setAttribute(attr, key);
		document.head.appendChild(tag);
	}
	tag.setAttribute("content", content);
}
/**
* Set the document title and description for a page, keeping the
* social-sharing meta tags consistent with the visible page metadata.
*/
function useSeo(title, description) {
	(0, import_react.useEffect)(() => {
		const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
		document.title = fullTitle;
		setMetaTag("name", "description", description);
		setMetaTag("property", "og:title", fullTitle);
		setMetaTag("property", "og:description", description);
		setMetaTag("name", "twitter:title", fullTitle);
		setMetaTag("name", "twitter:description", description);
	}, [title, description]);
}
//#endregion
export { matchQuery as $, useUpdateProduct as A, require_react as B, useReorderProductImages as C, useUpdateBrand as D, useSubmitEnquiry as E, createLucideIcon as F, addConsumeAwareSignal as G, Query as H, InternetIdentityProvider as I, ensureQueryFn as J, addToEnd as K, useInternetIdentity as L, Availability as M, ProductSort as N, useUpdateCategory as O, PublishState as P, matchMutation as Q, QueryClientProvider as R, useRemoveProductFromCollection as S, useSetPublishState as T, onlineManager as U, Mutation as V, notifyManager as W, hashKey as X, functionalUpdate as Y, hashQueryKeyByOptions as Z, useDuplicateProduct as _, useCategories as a, Subscribable as at, usePublishedProduct as b, useCreateCategory as c, __toESM as ct, useCreateSubcategory as d, noop as et, useDeleteBrand as f, useDeleteSubcategory as g, useDeleteProduct as h, useBrands as i, focusManager as it, useUpdateSubcategory as j, useUpdateCollection as k, useCreateCollection as l, useDeleteCollection as m, useAllProducts as n, resolveStaleTime as nt, useCollections as o, ExternalBlob$1 as ot, useDeleteCategory as p, addToStart as q, useAssignProductToCollection as r, skipToken as rt, useCreateBrand as s, __commonJSMin as st, useSeo as t, partialMatchKey as tt, useCreateProduct as u, useHomepageSections as v, useSetProductFlag as w, usePublishedProducts as x, useIsCallerAdmin as y, require_jsx_runtime as z };
