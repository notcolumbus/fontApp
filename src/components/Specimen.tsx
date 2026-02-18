import { AnimatePresence, motion } from 'framer-motion'
import type { FontDefinition } from '../data/fonts'

type SpecimenProps = {
  font: FontDefinition
  fontFamily: string
  isReady: boolean
}

export const Specimen = ({ font, fontFamily, isReady }: SpecimenProps) => {
  const specimenMotion = {
    initial: { opacity: 0, filter: 'blur(8px)', y: -20 },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      filter: 'blur(8px)',
      y: 20,
      transition: { duration: 0.25, ease: 'easeIn' },
    },
  } as const

  return (
    <motion.main
      className="flex min-h-screen items-center justify-center px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
    >
      <AnimatePresence mode="wait">
        {isReady ? (
          <motion.div
            key={font.id}
            className="space-y-4 md:space-y-6"
            style={{ fontFamily }}
            initial={specimenMotion.initial}
            animate={specimenMotion.animate}
            exit={specimenMotion.exit}
          >
            <h1 className="text-5xl font-bold tracking-tight text-zinc-50 sm:text-6xl md:text-7xl lg:text-8xl">
              Good design is obvious.
            </h1>
            <p className="text-xl text-zinc-200 sm:text-xl md:text-2xl">Great design is transparent.</p>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className="font-mono text-xs tracking-[0.24em] text-zinc-600 uppercase"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            Loading type specimen...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  )
}
