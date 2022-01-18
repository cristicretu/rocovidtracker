import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

import CommandMenu from '@components/CommandMenu'
import Footer from '@components/Footer'
import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/dist/client/router'

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Container(props) {
  const router = useRouter()
  const { children, ...customMeta } = props

  const meta = {
    title: 'Romania Covid Tracker',
    description: 'Tracker for Covid-19 Cases in Romania',
    image:
      'https://cdn.discordapp.com/attachments/797485737272541250/895635691160092672/Twitter_header_-_1-2.png',
    type: 'website',
    ...customMeta
  }

  return (
    <div className="min-h-screen font-sans text-gray-800 bg dark:text-gray-200 capsize">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://covid.cretu.dev${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://covid.cretu.dev${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Cristian Crețu" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@cristicrtu" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:creator" content="@cristicrtu" />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>

      <div className="flex flex-col justify-center px-4 py-2 motion-reduce:transition-none motion-reduce:transform-none">
        <main className="flex flex-col justify-center max-w-2xl mx-auto text-gray-800 dark:text-gray-200 mt-14 sm:mt-16 md:mt-20 lg:mt-24">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  )
}
