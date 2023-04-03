export {};

declare global {
	const PUBLIC_KEY: string;
	const SCORE: KVNamespace;
	const MOTD: KVNamespace;

	const OPENAI_APIKEY: string;
	const OVERRIDE: string;
	const S3_BUCKET: string;
	const TOKEN: string;
}
