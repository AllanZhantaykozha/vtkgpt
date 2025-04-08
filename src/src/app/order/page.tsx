import OrderCard from "@/shared/components/cards/order-card";
import { Search } from "@/shared/components/search/search";
import { Wrapper } from "@/shared/wrapper/wrapper";
import React from "react";

const Page = () => {
  return (
    <Wrapper className="grid gap-10 py-5">
      <Search />
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
        <OrderCard status="pending" />
        <OrderCard status="rejected" />
        <OrderCard status="pending" />
        <OrderCard status="accepted" />
        <OrderCard status="rejected" />
        <OrderCard status="accepted" />
      </div>
    </Wrapper>
  );
};

export default Page;
