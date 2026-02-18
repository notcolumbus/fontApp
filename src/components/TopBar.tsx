import { motion } from 'framer-motion'

export const TopBar = () => {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-30 px-4 py-4 sm:px-8 sm:py-6"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between text-xs tracking-[0.22em] text-zinc-500 uppercase font-mono">
        <span className="text-zinc-400 lowercase">fontpick</span>
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            className="cursor-default rounded-full px-3 py-1 text-zinc-500 transition-colors hover:bg-zinc-800/70 hover:text-zinc-300"
          >
            Browse
          </button>
          <button
            type="button"
            className="cursor-default rounded-full px-3 py-1 text-zinc-500 transition-colors hover:bg-zinc-800/70 hover:text-zinc-300"
          >
            GitHub
          </button>
        </nav>
      </div>
    </motion.header>
  )
}
