import CallList from '@/components/community/CallList'
import React from 'react'

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-black">
    <h1 className="text-3xl font-bold">Previous Meeting</h1>
    <CallList type="ended" />
  </section>
  )
}

export default PreviousPage