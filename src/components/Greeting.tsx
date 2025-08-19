type GreetingProps = {
  name: string
}

export default function Greeting({ name }: GreetingProps) {
  return <p className='text-5xl'>Hello, {name}</p>
}
