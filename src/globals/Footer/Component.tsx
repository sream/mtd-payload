import type { Footer } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ResolveLink } from '@/components/Link'
import { ScrollToTop } from './ScrollToTop.client'
import { TextWithBreaks } from '@/components/ui/text-with-breaks'
import Image from 'next/image'

export async function Footer() {
  const { logo, company, socials, menu }: Footer = await getCachedGlobal('footer', 1)()

  /* eslint-disable @next/next/no-img-element */
  return (
    <footer className="bg-brand shadow-block rounded-t">
      <div className="block-container">
        <div className="py-13 lg:py-20">
          <div className="flex flex-col gap-y-15">
            <div className="flex flex-col gap-y-10 lg:grid lg:grid-cols-12 lg:gap-x-5">
              <div className="col-span-3">
                <div className="flex justify-center lg:justify-start">
                  {logo && typeof logo === 'object' && (
                    <img
                      className="h-45"
                      src={logo.url || ''}
                      alt={logo.alt}
                      loading="eager"
                      fetchPriority="high"
                    />
                  )}
                </div>
              </div>
              <div className="col-span-6">
                <address className="text-center text-white not-italic lg:text-left">
                  <div className="flex flex-col gap-y-5">
                    <div>
                      <div>
                        <TextWithBreaks text={company.name} />
                      </div>
                      <div>{company.street}</div>
                      <div>{company.city}</div>
                    </div>
                    <div>
                      {company.contactInfo.map(({ label, link }, index) => (
                        <div key={index}>
                          {label}{' '}
                          <ResolveLink
                            className="hover:underline hover:decoration-2 hover:underline-offset-4"
                            {...link}
                          />
                          {company.contactInfo.length !== index && <br />}
                        </div>
                      ))}
                    </div>
                  </div>
                </address>
              </div>
              <div className="col-span-1">
                <div className="flex justify-center gap-x-4 gap-y-4.5 lg:flex-col">
                  {socials.map(({ platform, url }, index) => (
                    <a key={index} target="_blank" href={url}>
                      <Image
                        src={`/icons/socials/${platform}.svg`}
                        width={24}
                        height={24}
                        alt={platform}
                      />
                    </a>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <nav>
                  <ul className="flex flex-col gap-y-4">
                    {menu.map(({ link }, index) => (
                      <li key={index} className="text-center lg:text-left">
                        <ResolveLink
                          className="text-white hover:underline hover:decoration-2 hover:underline-offset-4"
                          {...link}
                        />
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="flex justify-center">
              <ScrollToTop />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
