import CallList from '@/components/community/CallList'
import React from 'react'

const RecordingsPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-black">
    <h1 className="text-3xl font-bold">Recordings</h1>
    <CallList type="recordings" />
  </section>
  )
}

export default RecordingsPage