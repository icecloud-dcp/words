import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import bibleVerses from './words'

export default function BibleFlashcardApp() {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  // --- FIX: Explicitly type the state ---
  const [known, setKnown] = useState<number[]>([])
  // --- End of FIX ---
  const [filter, setFilter] = useState('전체')
  const [completeMessage, setCompleteMessage] = useState('')
  

  const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === 'true'
  console.log(bypassAuth)
  useEffect(() => {
    if (bypassAuth) {
      //  Set user as authenticated.
      localStorage.setItem('isAuthenticated', 'true') // Example
    }
  }, [bypassAuth])

  //  Then use isAuthenticated to allow access
  if (!localStorage.getItem('isAuthenticated')) {
    return <div>Authentication Required</div>
  }

  const filteredVerses =
    filter === '전체'
      ? bibleVerses
      : bibleVerses.filter((v) => v.category === filter)

  const handleFlip = () => setFlipped(!flipped)

  const handleKnown = () => {
    if (!known.includes(current)) {
      const newKnown = [...known, current]
      setKnown(newKnown)

      // 현재 카테고리 완료 확인
      if (filter !== '전체') {
        const allInCategory = filteredVerses.map((_, i) => i)
        const knownInCategory = newKnown.filter((k) =>
          allInCategory.includes(k),
        )

        if (knownInCategory.length === allInCategory.length) {
          setTimeout(() => {
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
            })
            setCompleteMessage(`"${filter}"의 길이 열립니다! 축하합니다 🎉`)
          }, 100)
        }
      }
    }
    setFlipped(false)
    setCurrent((prev) => (prev + 1) % filteredVerses.length)
  }

  const handleNext = () => {
    setFlipped(false)
    setCurrent((prev) => (prev + 1) % filteredVerses.length)
  }

  const progress = (known.length / filteredVerses.length) * 100

  return (
    <div className="flex flex-col items-center p-8 space-y-6 bg-beige min-h-screen">
      <h1 className="text-3xl font-bold">성경 암송 플래시카드</h1>
      <div className=" top-4 right-6 text-lg font-bold text-gray-600">
        {new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </div>
      <div className="flex space-x-2">
        {['전체', '구원', '신뢰', '인내', '감사', '사랑'].map((cat) => (
          <Button
            key={cat}
            onClick={() => {
              setFilter(cat)
              setCurrent(0)
              setCompleteMessage('')

              const filteredIndexes = bibleVerses
                .map((v, i) => ({ ...v, index: i }))
                .filter((v) => cat === '전체' || v.category === cat)
                .map((v) => v.index)
              setKnown((prevKnown) =>
                prevKnown.filter((i) => filteredIndexes.includes(i)),
              )
            }}
            className={`${
              filter === cat ? 'bg-orange-600 text-white' : 'bg-blue-300'
            }`}>
            {cat}
          </Button>
        ))}
      </div>
      <Progress value={progress} className="w-1/2" />
      {completeMessage && (
        <h3 className="text-lg font-semibold text-orange-600 animate-pulse">
          {completeMessage}
        </h3>
      )}
      <motion.div
        className="w-[400px] h-[280px] cursor-pointer relative"
        onClick={handleFlip}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ perspective: 1000 }}>
        <Card
          className="w-full h-full flex items-center justify-center text-center rounded-2xl shadow-xl"
          style={{
            backgroundColor: 'azure',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}>
          <CardContent>
            <p
              className="text-xl px-2"
              style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}>
              {filteredVerses.length > 0
                ? flipped
                  ? filteredVerses[current].text
                  : filteredVerses[current].verse
                : '구절 없음'}
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <div className="flex space-x-4">
        <Button onClick={handleKnown} className="bg-green-400">
          암기 완료
        </Button>
        <Button onClick={handleNext} className="bg-green-400">
          다음
        </Button>
      </div>
      <p>
        암기한 구절 수: {known.length} / {filteredVerses.length}
      </p>
    </div>
  )
}
