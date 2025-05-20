import { TableBuilder } from '@/components/common/Table/TableBuilder'
import React from 'react'

const Members: React.FC =() => {
  return (
    <div className='space-y-6'>
      <TableBuilder data={[]}
      itemsPerPage={10}/>
    </div>
  )
}

export default Members