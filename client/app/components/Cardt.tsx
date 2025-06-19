'use client';

import { Card, CardHeader, CardBody } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";

interface CardtProps {
  auth: string;
  books: string;
  category: string;
  imageUrl: string;
  altimg: string;
  href: string; 
}

export default function Cardt({
  auth,
  books,
  category,
  imageUrl,
  altimg,
  href,
}: CardtProps) {


  return (
    <Card
      className="w-64 cursor-pointer rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all duration-200 active:scale-[0.98]"
    >
      <CardHeader className="px-3 py-2 bg-gray-800 text-white rounded-t-lg flex-col">
        <h4 className="text-xs font-semibold truncate">{books}</h4>
        <p className="text-xs text-gray-300 truncate">{category}</p>
        <p className="text-xs text-gray-400">{auth}</p>
      </CardHeader>
      <Link href={href}>
      <CardBody className="p-3">
        <Image
          alt={altimg}
          src={imageUrl}
          width={240}
          height={140}
          className="object-cover rounded-md"
          />

      </CardBody>
          </Link>
    </Card>
  );
}
