// The screen guides (components/dev/FoldGuides.vue): ?folds in the address turns them on for this tab, so they
// stay on while you click around and reload; ?folds=off turns them off. Visitors never see them.
const KEY = 'cwcpt-folds'

export function foldsWanted(): boolean {
  const q = new URLSearchParams(location.search).get('folds')
  try {
    if (q === 'off') sessionStorage.removeItem(KEY)
    else if (q !== null) sessionStorage.setItem(KEY, '1')
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return q !== null && q !== 'off'
  }
}
