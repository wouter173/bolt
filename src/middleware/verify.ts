import nacl from 'tweetnacl';

export default async (req: Request, body: string): Promise<Response | null> => {
	if (req.method !== 'POST') return new Response('Invalid method', { status: 401 });

	const signature = req.headers.get('X-Signature-Ed25519')!;
	const timestamp = req.headers.get('X-Signature-Timestamp');

	const isVerified = nacl.sign.detached.verify(
		Buffer.from(`${timestamp}${body}`),
		Buffer.from(signature, 'hex'),
		Buffer.from(PUBLIC_KEY, 'hex'),
	);

	if (!isVerified) return new Response('Invalid request signature', { status: 401 });
	return null;
};
