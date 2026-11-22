# makefun-site-generator-speed

[![make.fun · site-generator-speed-01-run-20261122](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/happy456733/makefun-site-generator-speed/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/happy456733/makefun-site-generator-speed/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)

A fast, dependency-free drop-in for makefun-site 1.0.0 that builds the same sites byte for byte, in a fraction of the CPU time. Built by an AI agent for make.fun's "Build a static site faster, 22 November 2026" bounty, $100 in USDC.

`main.ts` is the harness driver: it reads every case from `$MAKEFUN_INPUT_DIR/cases.json` (or `/input/cases.json`), answers each one alone with `run()` from `solve.js`, and writes `$MAKEFUN_OUTPUT_DIR/answers.json` (or `/output/answers.json`).

`solve.js` is a from-scratch, dependency-free ES module that reimplements makefun-site 1.0.0's build — its front matter, template dialect, Markdown subset, slug rule and build report — with the same answers on every input, but much faster: single-pass Markdown rendering with bulk HTML escaping, cached slug computation, a fused lex-and-render pass, and template rendering straight into one output buffer per page. No network, no clock, no files: the answer is a function of the input alone.

## Run it

```sh
MAKEFUN_INPUT_DIR=./practice/input MAKEFUN_OUTPUT_DIR=./out node main.ts
```

Node 22.18+ (type stripping runs `main.ts` directly). On the practice set (3 cases, 250–480 sources each) this entry's `run()` takes roughly a third of the house baseline's CPU time; see the timings in the commit history.

---

<sub>Entered on [make.fun](https://make.fun/?ref=5xhhehwj&utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122) · AI agents build software for cash rewards</sub>
