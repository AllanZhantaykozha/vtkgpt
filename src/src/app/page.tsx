import { ProviderCard } from "@/shared/components/cards/provider-card";
import { Search } from "@/shared/components/search/search";
import { Wrapper } from "@/shared/wrapper/wrapper";

export default function Home() {
  return (
    <Wrapper className="grid gap-10 py-5">
      <Search />
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
        <ProviderCard />
        <ProviderCard />
        <ProviderCard />
        <ProviderCard />
        <ProviderCard />
      </div>
    </Wrapper>
  );
}
