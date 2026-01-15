import React from 'react'
// import CardT from '../components/CardT'
import CardT from "../components/Cardt"

function page() {
  return (
    <div className='py-20'>
      <div className='flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
          <div><h1 className='text-4xl font-bold pb-8'>Books</h1></div>
          <div className='flex flex-row gap-9'>

            <CardT
              books="The C Programming Language"
              category="Programming"
              imageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/The_C_Programming_Language%2C_First_Edition_Cover.svg"
              altImg="C Programming Book Cover"
              auth="Brian W. Kernighan and Dennis M. Ritchie"
              href='https://www.cimat.mx/ciencia_para_jovenes/bachillerato/libros/%5BKernighan-Ritchie%5DThe_C_Programming_Language.pdf'
            />
            <CardT
              books="Operating System Concepts"
              category="Programming"
              imageUrl="https://www.amazon.com/Operating-System-Concepts-Abraham-Silberschatz/dp/1118063333"
              altImg="Operating System Concepts"
              auth=" Peter Baer Galvin, Greg Gagne, Abraham Silberschatz"
              href='https://os.ecci.ucr.ac.cr/slides/Abraham-Silberschatz-Operating-System-Concepts-10th-2018.pdf'
            />
            <CardT
              books="The C Programming Language"
              category="Programming"
              imageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/The_C_Programming_Language%2C_First_Edition_Cover.svg"
              altImg="C Programming Book Cover"
              auth="Brian W. Kernighan and Dennis M. Ritchie"
              href='https://www.cimat.mx/ciencia_para_jovenes/bachillerato/libros/%5BKernighan-Ritchie%5DThe_C_Programming_Language.pdf'
            />



          </div>
          <div className='flex flex-row p-11 gap-9'>
                      <CardT
              books="The C Programming Language"
              category="Programming"
              imageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/The_C_Programming_Language%2C_First_Edition_Cover.svg"
              altImg="C Programming Book Cover"
              auth="Brian W. Kernighan and Dennis M. Ritchie"
              href='https://www.cimat.mx/ciencia_para_jovenes/bachillerato/libros/%5BKernighan-Ritchie%5DThe_C_Programming_Language.pdf'
            />
            <CardT
              books="The C Programming Language"
              category="Programming"
              imageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/The_C_Programming_Language%2C_First_Edition_Cover.svg"
              altImg="C Programming Book Cover"
              auth="Brian W. Kernighan and Dennis M. Ritchie"
              href='https://www.cimat.mx/ciencia_para_jovenes/bachillerato/libros/%5BKernighan-Ritchie%5DThe_C_Programming_Language.pdf'
            />
            <CardT
              books="The C Programming Language"
              category="Programming"
              imageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/The_C_Programming_Language%2C_First_Edition_Cover.svg"
              altImg="C Programming Book Cover"
              auth="Brian W. Kernighan and Dennis M. Ritchie"
              href='https://www.cimat.mx/ciencia_para_jovenes/bachillerato/libros/%5BKernighan-Ritchie%5DThe_C_Programming_Language.pdf'
            />

          </div>


        </div>
      </div>
    </div>
  )
}

export default page