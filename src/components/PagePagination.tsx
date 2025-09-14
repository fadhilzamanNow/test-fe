import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArticleResponse } from "../app/lib/articles";
import { useMemo } from "react";


interface PagePaginationProps {
     currentPage : ArticleResponse['page']
     totalItem : ArticleResponse['total']
     handleCurrentPage : (a : number) => void
}

export default function PagePagination({currentPage, totalItem, handleCurrentPage} : PagePaginationProps){
    console.log("curr :", currentPage, " total : ", totalItem)
    const totalPage = useMemo(() => {
        console.log("total page : ",Math.ceil( totalItem / 10))
        return totalItem > 0 ? Math.ceil( totalItem / 10) : 1
    },[totalItem])
    console.log("jumlah halaman : ", totalPage)
    return (
        <Pagination>
      <PaginationContent>
        <PaginationItem onClick={() => {
            if(currentPage > 1){
                 handleCurrentPage(currentPage - 1)
            }
        }} >
          <PaginationPrevious />
        </PaginationItem>
        {
            Array.from({length : totalPage}, (_,i) => (
                <PaginationItem key={i+1} onClick={() => handleCurrentPage(i+1)}>
                    <PaginationLink isActive={i+1 === currentPage ? true : false}>{i+1}</PaginationLink>
                </PaginationItem>
            ))
        }
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
          <PaginationItem onClick={() => {
            if(currentPage < totalPage){
                 handleCurrentPage(currentPage + 1)
            }
        }} >
          <PaginationNext  />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    )
}