// Driver for the site-generator-speed entry. The harness runs `node main.ts`
// (Node 22.18+ type stripping): it reads every case from
// $MAKEFUN_INPUT_DIR/cases.json (or /input/cases.json), answers each one alone
// with run() from solve.js, and writes $MAKEFUN_OUTPUT_DIR/answers.json
// (or /output/answers.json) as a JSON array in the cases' order.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

// Keep V8's incremental marking off for the whole run, as the house baseline does.
setFlagsFromString('--no-incremental-marking');

const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as {
  run: (input: unknown) => unknown;
};

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases = JSON.parse(readFileSync(join(inputDir, 'cases.json'), 'utf8')) as {
  id: string;
  input: unknown;
}[];

const answers: unknown[] = [];
for (const c of cases) answers.push(run(c.input));

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'answers.json'), JSON.stringify(answers));
