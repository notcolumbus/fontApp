export type FontDefinition = {
  id: string
  name: string
  url: string
  tags: string[]
}

export const fonts: FontDefinition[] = [
  {
    id: 'inter',
    name: 'Inter',
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
    tags: ['clean', 'technical', 'ui'],
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
    tags: ['editorial', 'elegant', 'serif'],
  },
  {
    id: 'dm-sans',
    name: 'DM Sans',
    url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap',
    tags: ['friendly', 'modern', 'ui'],
  },
  {
    id: 'fraunces',
    name: 'Fraunces',
    url: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700&display=swap',
    tags: ['editorial', 'warm', 'serif'],
  },
  {
    id: 'outfit',
    name: 'Outfit',
    url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap',
    tags: ['clean', 'geometric', 'modern'],
  },
  {
    id: 'bricolage',
    name: 'Bricolage Grotesque',
    url: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap',
    tags: ['expressive', 'display', 'bold'],
  },
  {
    id: 'dm-mono',
    name: 'DM Mono',
    url: 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap',
    tags: ['mono', 'technical', 'code'],
  },
  {
    id: 'cabinet',
    name: 'Cabinet Grotesk',
    url: 'https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;700&display=swap',
    tags: ['modern', 'editorial', 'neutral'],
  },
]

const monoFallback =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
const serifFallback = 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
const sansFallback = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'

export const getFontFamily = (font: FontDefinition) => {
  const isMono = font.tags.includes('mono') || font.tags.includes('code')
  const isSerif = font.tags.includes('serif')

  if (isMono) {
    return `"${font.name}", ${monoFallback}`
  }

  if (isSerif) {
    return `"${font.name}", ${serifFallback}`
  }

  return `"${font.name}", ${sansFallback}`
}
