// Snapshot of the incident-time artifact selector.
export function select(items, prNumber, asOf) {
  return items.filter(x => x.name === 'forecast-' + prNumber && x.created_at <= asOf)
    .sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id - a.id)[0];
}
