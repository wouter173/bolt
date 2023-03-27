import nacl from 'tweetnacl';

export default async (req: Request): Promise<Response | null> => {
	if (req.method !== 'POST') return new Response('Invalid method', { status: 401 });

	const signature = req.headers.get('x-signature-ed25519')!;
	const timestamp = req.headers.get('x-signature-timestamp')!;
	const body = await req.clone().arrayBuffer();

	const isVerified = verifyKey(body, signature, timestamp, PUBLIC_KEY); //nacl.sign.detached.verify(Buffer.from(`${timestamp}${body}`), Buffer.from(signature, 'hex'), Buffer.from(PUBLIC_KEY, 'hex'));

	if (!isVerified) return new Response('Invalid request signature', { status: 401 });
	return null;
};

function valueToUint8Array(value: Uint8Array | ArrayBuffer | string, format?: string): Uint8Array {
	if (value == null) {
		return new Uint8Array();
	}
	if (typeof value === 'string') {
		if (format === 'hex') {
			const matches = value.match(/.{1,2}/g);
			if (matches == null) {
				throw new Error('Value is not a valid hex string');
			}
			const hexVal = matches.map((byte: string) => parseInt(byte, 16));
			return new Uint8Array(hexVal);
		} else {
			return new TextEncoder().encode(value);
		}
	}
	if (value instanceof ArrayBuffer) {
		return new Uint8Array(value);
	}
	if (value instanceof Uint8Array) {
		return value;
	}
	throw new Error('Unrecognized value type, must be one of: string, Buffer, ArrayBuffer, Uint8Array');
}

function concatUint8Arrays(arr1: Uint8Array, arr2: Uint8Array): Uint8Array {
	const merged = new Uint8Array(arr1.length + arr2.length);
	merged.set(arr1);
	merged.set(arr2, arr1.length);
	return merged;
}

function verifyKey(
	rawBody: Uint8Array | ArrayBuffer | string,
	signature: Uint8Array | ArrayBuffer | string,
	timestamp: Uint8Array | ArrayBuffer | string,
	clientPublicKey: Uint8Array | ArrayBuffer | string,
): boolean {
	try {
		const timestampData = valueToUint8Array(timestamp);
		const bodyData = valueToUint8Array(rawBody);
		const message = concatUint8Arrays(timestampData, bodyData);

		const signatureData = valueToUint8Array(signature, 'hex');
		const publicKeyData = valueToUint8Array(clientPublicKey, 'hex');
		return nacl.sign.detached.verify(message, signatureData, publicKeyData);
	} catch (ex) {
		console.error('[discord-interactions]: Invalid verifyKey parameters', ex);
		return false;
	}
}
