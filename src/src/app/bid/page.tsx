import BidCard from "@/shared/components/cards/bid-card";
import { Search } from "@/shared/components/search/search";
import { cn } from "@/shared/lib/utils";
import { Wrapper } from "@/shared/wrapper/wrapper";
import React from "react";

interface Props {
  className?: string;
}

const Bid: React.FC<Props> = ({ className }) => {
  return (
    <Wrapper className="grid gap-10 py-5">
      <Search />
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
        <BidCard status="pending" />
        <BidCard status="rejected" />
        <BidCard status="pending" />
        <BidCard status="accepted" />
        <BidCard status="rejected" />
        <BidCard status="accepted" />
      </div>
    </Wrapper>
  );
};

export default Bid;
