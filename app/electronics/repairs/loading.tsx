import { ListPageSkeleton } from "@/app/components/list-page-skeleton";

export default function Loading() {
  return <ListPageSkeleton showSearch chipCount={8} rowCount={6} />;
}
