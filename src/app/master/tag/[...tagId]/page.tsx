import React from 'react'

export default function TagDetail({params}: {params: {tagId: string}}) {
  return (
    <div>Tag {params.tagId[2]}</div>
  )
}
