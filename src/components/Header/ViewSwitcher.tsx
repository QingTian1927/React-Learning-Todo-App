import type { ViewMode } from '../../types/ViewMode'

type ViewSwitcherProps = {
  viewMode?: ViewMode
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
}

export default function ViewSwitcher({ viewMode = 'grid', setViewMode }: ViewSwitcherProps) {
  const inactiveStyling = 'hover:bg-pastel-white hover:text-pastel-turquoise cursor-pointer'
  const activeStyling = 'bg-pastel-white text-pastel-gray-dark cursor-default'

  function handleChangeView(value: ViewMode) {
    setViewMode(value)
  }

  return (
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
  )
}
