import { ListPageSkeleton } from "@/app/components/list-page-skeleton";

export default function Loading() {
  return <ListPageSkeleton showSearch={false} chipCount={3} rowCount={7} />;
}
