import * as DialogPrimitive from '@radix-ui/react-dialog'

import React, { Fragment, useEffect, useRef, useState } from 'react'

import { CalendarIcon } from '@radix-ui/react-icons'
import { Transition } from '@headlessui/react'
import { useRouter } from 'next/router'

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface CommandMenuProps {
  id?: number
  label?: string
}

interface Props {
  buttonOpen: boolean
  setButtonOpen: (open: boolean) => void
  all: CommandMenuProps[]
  date: number
  setDate: (date: number) => void
}

export default function CommandMenu({
  buttonOpen,
  setButtonOpen,
  all,
  date,
  setDate
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const [cursor, setCursor] = useState(0)

  const [cursorMoved, setCursorMoved] = useState(false)

  const [Results, setResults] = useState('')
  const SearchResults = all
    .sort((a, b) => b.id - a.id)
    .filter((item) => item.label.toLowerCase().includes(Results.toLowerCase()))

  const itemsRef = useRef([])

  const handleChange = (e) => {
    setResults(e.target.value)
    setCursor(0)
  }

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, SearchResults.length)
  }, [SearchResults])

  useEffect(() => {
    setIsOpen(buttonOpen)
  }, [buttonOpen, setButtonOpen])

  useEffect(() => {
    const navigated = (e) => {
      // up
      if (e.keyCode === 38 && isOpen) {
        setCursor((cursor) =>
          cursor === 0 ? SearchResults.length - 1 : cursor - 1
        )
        setCursorMoved(true)
        itemsRef.current[
          cursor === 0 ? SearchResults.length - 1 : cursor - 1
        ].scrollIntoView(
          cursor === 0
            ? { behaviour: 'smooth' }
            : {
                block: 'nearest',
                inline: 'nearest',
                behavior: 'smooth'
              }
        )
        // down
      } else if (e.keyCode === 40 && isOpen) {
        setCursor((cursor) =>
          cursor + 1 > SearchResults.length - 1 ? 0 : cursor + 1
        )
        setCursorMoved(true)
        itemsRef.current[
          cursor + 1 > SearchResults.length - 1 ? 0 : cursor + 1
        ].scrollIntoView(
          cursor + 1 > SearchResults.length - 1
            ? {
                behavior: 'smooth'
              }
            : {
                block: 'nearest',
                inline: 'nearest',
                behavior: 'smooth'
              }
        )
      }
    }

    window.addEventListener('keydown', navigated)
    return () => {
      window.removeEventListener('keydown', navigated)
    }
  })

  useEffect(() => {
    const clickedCmdk = (e) => {
      let charCode = String.fromCharCode(e.which).toLowerCase()
      if (e.metaKey && charCode === 'k') {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }

    window.addEventListener('keydown', clickedCmdk)
    return () => {
      window.removeEventListener('keydown', clickedCmdk)
    }
  }, [isOpen])

  useEffect(() => {
    const clickedEnter = (e) => {
      if (e.keyCode === 13 && isOpen && SearchResults.length > 0) {
        setDate(SearchResults[cursor].id)
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', clickedEnter)
    return () => {
      window.removeEventListener('keydown', clickedEnter)
    }
  }, [SearchResults, cursor, isOpen, router, setDate])

  useEffect(() => {
    setCursor(0)
    setButtonOpen(isOpen)
    setResults('')
    setCursorMoved(false)
  }, [isOpen, setButtonOpen])

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-white/80 dark:bg-black/80"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            forceMount
            className={cn(
              'fixed z-50',
              'w-[95vw]  md:w-full max-w-2xl md:-ml-2 rounded-md shadow-lg',
              'mycenter',
              'myblur border border-black dark:border-gray-100 dark:border-opacity-20 border-opacity-20 ',
              'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <DialogPrimitive.Title className="w-full p-4 border-b border-black dark:border-gray-100 dark:border-opacity-20 border-opacity-20 ">
              <input
                value={Results}
                className="w-full text-gray-900 placeholder-gray-500 bg-transparent outline-none dark:placeholder-gray-500 dark:text-gray-100"
                aria-label="Change date"
                type="text"
                onChange={(e) => {
                  handleChange(e)
                }}
                placeholder={
                  !cursorMoved
                    ? 'Change date...'
                    : `${SearchResults.length && SearchResults[cursor].label}`
                }
              />
            </DialogPrimitive.Title>
            <div className="px-3 py-2 max-h-[32vh] overflow-y-auto text-gray-600 dark:text-gray-400">
              <ul>
                {!SearchResults.length && <p>No results found.</p>}

                {SearchResults.map((item, index) => (
                  <li
                    key={index}
                    className={cn(
                      'flex items-center p-3 justify-between focus:outline-none rounded-md cursor-pointer',
                      cursor === index
                        ? 'bg-gray-200 dark:bg-gray-700 dark:bg-opacity-80 text-black dark:text-white'
                        : ''
                    )}
                    onClick={() => {
                      setDate(SearchResults[cursor].id)
                      setIsOpen(false)
                    }}
                    ref={(el) => {
                      itemsRef.current[index] = el
                    }}
                    onMouseOver={() => {
                      setCursor(index)
                      setCursorMoved(true)
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div>
                        <CalendarIcon width={20} height={20} />
                      </div>
                      <div>{item.label}</div>
                    </div>

                    <div
                      className={cn(
                        cursor === index
                          ? 'dark:text-gray-400 text-gray-600'
                          : 'text-transparent dark:text-transparent'
                      )}
                    >
                      Change date
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Root>
  )
}
