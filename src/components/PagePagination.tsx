import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArticleResponse } from "../app/lib/articles";
import { useMemo } from "react";


interface PagePaginationProps {
     currentPage : ArticleResponse['page']
     totalItem : ArticleResponse['total']
}

export default function PagePagination({currentPage, totalItem} : PagePaginationProps){
    console.log("curr :", currentPage, " total : ", totalItem)
    const totalPage =  Math.ceil( 13 / 10)
    console.log("jumlah halaman : ", totalPage)
    return (
        <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {
            Array.from({length : totalPage}, (_,i) => (
                <PaginationItem>
                    <PaginationLink isActive={i+1 === 1 ? true : false}>{i+1}</PaginationLink>
                </PaginationItem>
            ))
        }
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    )
}