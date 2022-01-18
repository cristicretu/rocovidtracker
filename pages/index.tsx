import { format, formatISO, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'

import Card from '@components/Card'
import CommandMenu from '@components/CommandMenu'
import Container from '@components/Container'
import cx from 'classnames'

const fetcher = async (url) => await fetch(url).then((res) => res.json())

export default function Home(props) {
  const [open, setOpen] = useState(false)

  const data = props.formattedData

  const all = Object.keys(data)
    .map((key) => {
      return {
        id: parseInt(key),
        label: format(
          parseISO((data[key]['Data'] + 'T00:00:00.000Z') as string),
          'MMMM dd, yyyy'
        )
      }
    })
    .splice(data.length - 10, data.length - 1)

  const [date, setDate] = useState(all[all.length - 1].id)

  // const newCases = formattedData['Cazuri']
  // const newDeaths = formattedData['Morti pe zi']
  // const newRecovered = formattedData['Vindecati pe zi']
  // const newTests = formattedData['Nr de teste pe zi']

  // const allCases = formattedData['Total']
  // const allDeaths = formattedData['Morti']
  // const allRecovered = formattedData['Vindecati']
  // const allTest = formattedData['Nr de teste']

  // const ATI = formattedData['Terapie intensiva']

  // const date = formattedData['Data'] // yyyy-mm-dd

  return (
    <Container>
      <div className="mx-auto">
        <CommandMenu
          buttonOpen={open}
          setButtonOpen={setOpen}
          date={date}
          setDate={setDate}
          all={all}
        />
        <button
          aria-label="Command Menu"
          type="button"
          className={cx(
            'justify-center block px-3 py-2 text-2xl font-extralight rounded-md select-none',
            'text-gray-900 bg-white hover:bg-gray-50 dark:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700',
            'border border-gray-300 dark:border-gray-600',
            'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
          )}
          onClick={() => {
            setOpen(true)
          }}
        >
          ⌘
        </button>
      </div>
      <div className="flex flex-col items-center justify-center py-6 ">
        <h1 className="mx-auto text-xl font-semibold">
          Covid-19 Cases in Romania
        </h1>
        <p className="mb-4">
          Use the above button to filter through days, or press CMD + K.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Card
            name="Infected"
            value={data[date]['Total']}
            newCases={data[date]['Cazuri']}
          />
          <Card
            name="Recovered"
            value={data[date]['Vindecati']}
            newCases={data[date]['Vindecati pe zi']}
          />
          <Card
            name="Deceased"
            value={data[date]['Morti']}
            newCases={data[date]['Morti pe zi']}
          />
          <Card
            name="Tested"
            value={data[date]['Nr de teste']}
            newCases={data[date]['Nr de teste pe zi']}
          />
          {/* <Card
            name="Intensive Care Units"
            value={data[date]['Terapie intensiva']}
          /> */}
        </div>
        <p className="">
          updated in{' '}
          {format(
            parseISO((data[date]['Data'] + 'T00:00:00.000Z') as string),
            'MMMM dd, yyyy'
          )}
        </p>
      </div>
    </Container>
  )
}

export async function getStaticProps() {
  const res = await fetch(
    'https://covid19.geo-spatial.org/api/dashboard/getDailyCases'
  )
  const data = await res.json()

  const formattedData = data.data['data']

  return {
    props: {
      formattedData
    },
    revalidate: 1
  }
}
