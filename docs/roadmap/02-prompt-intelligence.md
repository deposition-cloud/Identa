# Phase 2 — Prompt Intelligence 🔜

## Goal

Replace static style descriptions with LLM-generated prompts. The image model
is only as good as the prompt it receives — an LLM that *reasons about the
project* before writing the image prompt will produce dramatically better logos.

## Deliverables

### 2a — LLM Prompt Generation (MVP)

Add a pre-generation step: an LLM reads the repo name, description, and any
available metadata, then writes a detailed image prompt tailored to that
specific project.

- New server utility or API step that calls a text LLM (e.g.
  `anthropic/claude-sonnet` or `google/gemini-2.5-flash`) before the image model
- Prompt includes: project domain analysis, colour theory reasoning, symbol
  selection rationale, composition instructions
- The generated prompt replaces the current static template in
  `generate-logos.post.ts`

### 2b — Prompt Diversity Strategy

Ensure each generation explores a genuinely different creative direction, not
just adjective swaps.

- LLM receives history of previous prompts for this session and is instructed to
  diverge
- Diversity dimensions: symbolism, colour palette, composition, abstraction
  level, cultural reference
- Optional: MECE-style upfront exploration — generate N diverse *concepts*
  first, then render the most promising ones

### 2c — LangGraph Agent Graph (Optional Upgrade)

If prompt quality plateaus or we need stateful evaluation loops, introduce
LangGraph.js to orchestrate a multi-step agent:

```
Analyze repo → Generate prompt → Render image → Evaluate quality → Refine or accept
```

- Enables memory across sessions (remember what the user liked)
- Human-in-the-loop branching (user picks direction, agent refines)
- Automatic retry with modified prompt if evaluation scores low

### 2d — Prompt/Result Logging

Log prompts and results to enable quality iteration and future fine-tuning.

- Store prompt text, model params, generated image hash, and user feedback
- Lightweight — JSON log file or SQLite initially, not a full analytics stack

## Acceptance Criteria

- [ ] Generated logos show noticeably more project-relevant imagery than Phase 1
- [ ] Two consecutive generations for the same repo produce meaningfully
      different concepts (not just colour/angle variations)
- [ ] Prompt text is visible in dev tools or a debug panel for inspection
- [ ] Generation latency stays under 15 seconds end-to-end

## Open Questions

- Which text LLM gives the best prompt-writing quality per dollar?
- Should the prompt-generation step run client-side (streaming) or server-side?
- When does the complexity justify introducing LangGraph vs. a simple chain?
