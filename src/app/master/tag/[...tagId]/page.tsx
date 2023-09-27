import React from 'react'

export default function TagDetail({params}: {params: {tagId: string}}) {
  return (
    <div>detail :  {params.tagId[0]}</div>
  )
}
