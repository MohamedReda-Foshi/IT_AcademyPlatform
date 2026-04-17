import Link from 'next/link'
import Button from './components/Button'

export default function NotFound() {
  return <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col p-10'>
        <h1>Not found - 404!</h1>
        <div>
                <Link href="/"><Button button="Go back to Home" w='' type='button'/></Link>
            
        </div>
      </div>
  </div>
}