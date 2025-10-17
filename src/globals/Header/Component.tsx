import type { Header } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { MobileNav } from '@/components/MobileNav'
import { Button } from '@/components/ui/button'
import { ResolveLink } from '@/components/Link'

export async function Header() {
  const { logo, menu, contactLink }: Header = await getCachedGlobal('header', 1)()

  return (
    /* eslint-disable @next/next/no-img-element */
    <header className="shadow-block sticky top-0 z-10 bg-white">
      <div className="block-container">
        <div className="flex h-17.5 items-center justify-between lg:h-25">
          {logo && typeof logo === 'object' && (
            <Link href="/">
              <img
                className="h-10 lg:h-13.5"
                src={logo.url || ''}
                alt={logo.alt}
                loading="eager"
                fetchPriority="high"
              />
            </Link>
          )}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-x-14">
              {menu.map(({ link }, index) => (
                <li key={index}>
                  <ResolveLink
                    className="text-base/none uppercase hover:underline hover:decoration-2 hover:underline-offset-4"
                    {...link}
                  />
                </li>
              ))}
              <li>
                <Button asChild>
                  <ResolveLink {...contactLink.link} />
                </Button>
              </li>
            </ul>
          </nav>
          <MobileNav menu={menu} contactLink={contactLink} />
        </div>
      </div>
    </header>
  )
}
