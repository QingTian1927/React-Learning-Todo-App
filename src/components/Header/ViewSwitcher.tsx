import type { ViewMode } from '../../types/ViewMode'

type ViewSwitcherProps = {
  viewMode?: ViewMode
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>

  showAll: boolean
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ViewSwitcher({ viewMode = 'grid', setViewMode, showAll, setShowAll }: ViewSwitcherProps) {
  const inactiveStyling = 'hover:bg-pastel-white hover:text-pastel-turquoise cursor-pointer'
  const activeStyling = 'bg-pastel-white text-pastel-gray-dark cursor-default'

  function handleChangeView(value: ViewMode) {
    setViewMode(value)
  }

  function handleShowAll() {
    setShowAll((prev) => !prev)
  }

  return (
    <div className='flex flex-wrap items-stretch gap-2'>
      <div className='bg-pastel-turquoise text-pastel-white flex h-full w-max items-stretch rounded-full text-lg'>
        <button
          onClick={() => {
            handleChangeView('grid')
          }}
          className={'rounded-s-full px-5 py-2 ' + (viewMode === 'grid' ? activeStyling : inactiveStyling)}
        >
          <i className='bi bi-grid-fill'></i>
        </button>
        <button
          onClick={() => {
            handleChangeView('list')
          }}
          className={'rounded-e-full px-5 py-2 ' + (viewMode === 'list' ? activeStyling : inactiveStyling)}
        >
          <i className='bi bi-layers-fill'></i>
        </button>
      </div>

      {viewMode === 'list' && (
        <button
          onClick={handleShowAll}
          className='bg-pastel-white text-pastel-gray-dark hover:bg-pastel-turquoise hover:text-pastel-white cursor-pointer rounded-full px-3.5 py-1 text-lg'
        >
          {showAll ? <i className='bi bi-chevron-double-up'></i> : <i className='bi bi-chevron-double-down'></i>}
        </button>
      )}
    </div>
  )
}
