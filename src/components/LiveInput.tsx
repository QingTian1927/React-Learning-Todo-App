import { useState } from 'react'

export default function LiveInput() {
  const [text, setText] = useState<string>('')

  function handleTextInput(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }

  return (
    <div>
      <input type='text' onInput={handleTextInput} name='textinput' id='textinput' />
      <p>Text: {text}</p>
      <p>Text is {text.length <= 0 ? 'empty' : 'not empty'}</p>
    </div>
  )
}
