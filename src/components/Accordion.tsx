import { useState } from 'react'

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='flex flex-col gap-2'>
      <Panel
        title='Hallo'
        description='Hallo ich bin milch'
        isActive={activeIndex === 0}
        onShow={() => {
          setActiveIndex(0)
        }}
      />

      <Panel
        title='Salvete'
        description='Salvete lac sum'
        isActive={activeIndex === 1}
        onShow={() => {
          setActiveIndex(1)
        }}
      />
    </div>
  )
}

type PanelProps = {
  title: string
  description: string
  isActive: boolean
  onShow: () => void
}

function Panel({ title, description, isActive, onShow }: PanelProps) {
  return (
    <div className='border'>
      <h3>{title}</h3>
      <div></div>
      {isActive && <p>{description}</p>}
      {!isActive && (
        <button className='border p-2' onClick={onShow}>
          Show
        </button>
      )}
    </div>
  )
}
