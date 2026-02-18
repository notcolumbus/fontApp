import { AnimatePresence, motion } from 'framer-motion'
import type { FontDefinition } from '../data/fonts'

type BottomBarProps = {
  font: FontDefinition
  fontFamily: string
  current: number
  total: number
  command: string
  copied: boolean
  onCopy: () => void
  onShuffle: () => void
}

const tagGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const

const tagItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
} as const

export const BottomBar = ({
  font,
  fontFamily,
  current,
  total,
  command,
  copied,
  onCopy,
  onShuffle,
}: BottomBarProps) => {
  return (
    <>
      <motion.button
        type="button"
        onClick={onShuffle}
        className="fixed bottom-28 left-1/2 z-30 inline-flex -translate-x-1/2 cursor-pointer items-center gap-2 rounded-full bg-zinc-900/85 px-5 py-2 font-mono text-xs tracking-[0.18em] text-zinc-200 uppercase transition-colors hover:bg-zinc-800 sm:bottom-32"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.4 }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            d="M12 4v16M4 12h16M6.8 6.8l10.4 10.4M17.2 6.8 6.8 17.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <span>Shuffle</span>
        <span className="hidden text-zinc-500 sm:inline">Space to shuffle</span>
      </motion.button>

      <motion.footer
        className="fixed inset-x-0 bottom-0 z-20 px-3 pb-3 sm:px-8 sm:pb-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.3 }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-2xl bg-zinc-950/70 px-4 py-3 sm:flex-row sm:items-end sm:justify-between sm:px-5 sm:py-4">
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={font.id}
                className="space-y-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <p className="truncate text-sm text-zinc-100 sm:text-base" style={{ fontFamily }}>
                  {font.name}
                </p>
                <motion.div
                  className="flex flex-wrap items-center gap-1.5"
                  variants={tagGroupVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {font.tags.map((tag) => (
                    <motion.span
                      key={`${font.id}-${tag}`}
                      variants={tagItemVariants}
                      className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <span className="max-w-full truncate rounded-lg bg-zinc-900/85 px-2 py-1 font-mono text-xs text-zinc-400">
              {command}
            </span>
            <motion.button
              type="button"
              onClick={onCopy}
              className={`inline-flex cursor-default items-center gap-1.5 rounded-full bg-zinc-900/90 px-3 py-1.5 font-mono text-xs transition-colors ${
                copied ? 'text-lime-400' : 'text-zinc-300'
              }`}
              animate={{ scale: copied ? 1.06 : 1 }}
              transition={{ type: 'spring', stiffness: 340, damping: 16 }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                <path
                  d="M9 9.5h8.5A1.5 1.5 0 0 1 19 11v8.5a1.5 1.5 0 0 1-1.5 1.5H9A1.5 1.5 0 0 1 7.5 19.5V11A1.5 1.5 0 0 1 9 9.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M5 14V5.5A1.5 1.5 0 0 1 6.5 4h8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </motion.button>
            <span className="font-mono text-xs text-zinc-500 tabular-nums">
              {current} / {total}
            </span>
          </div>
        </div>
      </motion.footer>
    </>
  )
}
