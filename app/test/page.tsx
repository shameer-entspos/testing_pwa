import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const TestPage = () => {
  return (
    <div className="bg-background p-10 text-center text-3xl">
      <Button variant={'outline'}>
        <Link href="/">Back</Link>
      </Button>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
      perferendis veniam eius quas minus, recusandae dolore corrupti delectus
      doloremque assumenda distinctio accusamus, ipsum repudiandae voluptas
      neque ducimus laborum nisi architecto? Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Magnam rem tenetur error rerum tempora eius
      provident id iure odio, in, deserunt suscipit fuga doloribus odit. Eaque
      praesentium commodi temporibus cumque. Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Magnam rem tenetur error rerum tempora eius
      provident id iure odio, in, deserunt suscipit fuga doloribus odit. Eaque
      praesentium commodi temporibus cumque.Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Magnam rem tenetur error rerum tempora eius
      provident id iure odio, in, deserunt suscipit fuga doloribus odit. Eaque
      praesentium commodi temporibus cumque.
    </div>
  )
}

export default TestPage
