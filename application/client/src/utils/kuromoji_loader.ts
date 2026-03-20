import kuromoji, { type Tokenizer, type IpadicFeatures } from "kuromoji";

let cachedTokenizer: Tokenizer<IpadicFeatures> | null = null;
let pendingPromise: Promise<Tokenizer<IpadicFeatures>> | null = null;

export function buildTokenizer(): Promise<Tokenizer<IpadicFeatures>> {
  if (cachedTokenizer) return Promise.resolve(cachedTokenizer);
  if (pendingPromise) return pendingPromise;

  pendingPromise = new Promise<Tokenizer<IpadicFeatures>>((resolve, reject) => {
    kuromoji.builder({ dicPath: "/dicts" }).build((err, tokenizer) => {
      if (err) {
        pendingPromise = null;
        reject(err);
      } else {
        cachedTokenizer = tokenizer;
        resolve(tokenizer);
      }
    });
  });

  return pendingPromise;
}
