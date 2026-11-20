/**
 * True when a content field holds real copy: not empty, and not a [bracketed] brief that is still waiting for
 * copy. Pages render a block only when its text is filled, so a brief in app/data never reaches the site, and
 * replacing the brief with the real text makes the block appear by itself. PLAN.md lists what each brief needs.
 */
export const filled = (s?: string | null): s is string => !!s && !/^\s*\[[\s\S]*\]\s*$/.test(s)
