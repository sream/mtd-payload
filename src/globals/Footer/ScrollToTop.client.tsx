'use client'

import Image from 'next/image'

export const ScrollToTop = () => {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button type="button" className="group inline-flex flex-col items-center" onClick={scrollToTop}>
      <Image src="/icons/rounded/arrow-up.svg" alt="Nach oben scrollen" width={24} height={24} />
      <span className="text-white group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
        Zurück nach oben
      </span>
    </button>
  )
}
