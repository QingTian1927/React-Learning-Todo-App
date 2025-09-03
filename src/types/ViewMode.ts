export const availableViewModes = ['grid', 'list'] as const
export type ViewMode = (typeof availableViewModes)[number]
