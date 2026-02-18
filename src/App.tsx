import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BottomBar } from './components/BottomBar'
import { Specimen } from './components/Specimen'
import { TopBar } from './components/TopBar'
import { fonts, getFontFamily } from './data/fonts'
import { useFontLoader } from './hooks/useFontLoader'

const buildShuffleOrder = (length: number, avoidFirst?: number) => {
  const indices = Array.from({ length }, (_, index) => index)

  for (let i = indices.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[randomIndex]] = [indices[randomIndex], indices[i]]
  }

  if (
    typeof avoidFirst === 'number' &&
    indices.length > 1 &&
    indices[0] === avoidFirst
  ) {
    const swapIndex = 1 + Math.floor(Math.random() * (indices.length - 1))
    ;[indices[0], indices[swapIndex]] = [indices[swapIndex], indices[0]]
  }

  return indices
}

function App() {
  const { loadFont } = useFontLoader()
  const [order, setOrder] = useState<number[]>(() => buildShuffleOrder(fonts.length))
  const [position, setPosition] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<number | null>(null)
  const initialFontIdRef = useRef(order[0])

  const currentFont = fonts[order[position]]
  const fontFamily = useMemo(() => getFontFamily(currentFont), [currentFont])
  const installCommand = `npx fontpick add ${currentFont.id}`

  const switchTo = useCallback(
    async (nextPosition: number, nextOrder: number[] = order) => {
      const nextFont = fonts[nextOrder[nextPosition]]
      setIsTransitioning(true)

      try {
        await loadFont(nextFont)
      } catch (error) {
        // Keep the flow moving even if a stylesheet fails to load.
        console.error(error)
      } finally {
        setOrder(nextOrder)
        setPosition(nextPosition)
        setIsTransitioning(false)
        setIsReady(true)
      }
    },
    [loadFont, order],
  )

  const goToNextFont = useCallback(async () => {
    if (isTransitioning || !isReady) {
      return
    }

    if (position < order.length - 1) {
      await switchTo(position + 1)
      return
    }

    const nextOrder = buildShuffleOrder(fonts.length, order[position])
    await switchTo(0, nextOrder)
  }, [isTransitioning, isReady, position, order, switchTo])

  const goToPreviousFont = useCallback(async () => {
    if (isTransitioning || !isReady || position === 0) {
      return
    }

    await switchTo(position - 1)
  }, [isTransitioning, isReady, position, switchTo])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)

      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current)
      }

      copyTimerRef.current = window.setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch (error) {
      console.error('Clipboard copy failed:', error)
    }
  }, [installCommand])

  useEffect(() => {
    const initialFont = fonts[initialFontIdRef.current]
    let isMounted = true

    void loadFont(initialFont)
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        if (isMounted) {
          setIsReady(true)
        }
      })

    return () => {
      isMounted = false
    }
  }, [loadFont])

  useEffect(() => {
    setCopied(false)
  }, [currentFont.id])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }

      if (event.code === 'Space') {
        event.preventDefault()
        void goToNextFont()
        return
      }

      if (event.code === 'ArrowRight') {
        event.preventDefault()
        void goToNextFont()
        return
      }

      if (event.code === 'ArrowLeft') {
        event.preventDefault()
        void goToPreviousFont()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [goToNextFont, goToPreviousFont])

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-50 cursor-default">
      <TopBar />
      <Specimen font={currentFont} fontFamily={fontFamily} isReady={isReady} />
      <BottomBar
        font={currentFont}
        fontFamily={fontFamily}
        current={position + 1}
        total={fonts.length}
        command={installCommand}
        copied={copied}
        onCopy={() => void handleCopy()}
        onShuffle={() => void goToNextFont()}
      />
    </div>
  )
}

export default App
