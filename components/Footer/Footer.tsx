import ExternalLink from '@components/ExternalLink'
import React from 'react'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full max-w-2xl px-2 mx-auto sm:px-2 md:px-0 ">
      <hr className="w-full mb-8 border-gray-200 border-1 dark:border-gray-800" />

      <p className="px-8 mt-2 text-xs text-center text-gray-700 dark:text-gray-300 text-opacity-90">
        Created with &hearts; by{' '}
        <ExternalLink href="https://twitter.com/cristicrtu">
          Cristian Crețu
        </ExternalLink>
        . Deployed with{' '}
        <ExternalLink href="https://vercel.com"> ▲ Vercel</ExternalLink>
      </p>

      <p className="px-8 mt-2 text-xs text-center text-gray-700 dark:text-gray-300 text-opacity-90">
        Data provided by{' '}
        <ExternalLink href="http://www.geo-spatial.org">
          Geo-Spatial.org
        </ExternalLink>
      </p>
    </footer>
  )
}
